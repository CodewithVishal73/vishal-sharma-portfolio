import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiCheckCircle, FiAlertTriangle, FiAlertCircle, FiClock, FiDatabase, FiServer, FiSend, FiTerminal } from 'react-icons/fi';
import styles from './RequestResponsePanel.module.css';

/**
 * Masks an email for safe visualization without leaking PII in inspector
 */
function maskEmail(email) {
  if (!email || typeof email !== 'string') return '';
  const parts = email.split('@');
  if (parts.length !== 2) return '***@***';
  const name = parts[0];
  const domain = parts[1];
  const maskedName = name.length <= 2 
    ? `${name[0]}*` 
    : `${name.slice(0, 2)}${'*'.repeat(Math.max(1, name.length - 2))}`;
  return `${maskedName}@${domain}`;
}

export default function RequestResponsePanel({
  lifecycleState = 'idle',
  requestPayload = null,
  responseResult = null,
  isWaking = false,
  elapsedMs = null,
}) {
  const shouldReduceMotion = useReducedMotion();

  const isSending = lifecycleState === 'sending' || lifecycleState === 'waking';
  const isSuccess = lifecycleState === 'success';
  const isError = ['fieldError', 'rateLimited', 'networkError', 'serverError'].includes(lifecycleState);

  // Pipeline stages
  const stages = [
    { id: 'client', label: 'Client UI', icon: FiTerminal },
    { id: 'gateway', label: 'Express API', icon: FiServer },
    { id: 'database', label: 'MongoDB Atlas', icon: FiDatabase },
  ];

  const getStageStatus = (stageId) => {
    if (lifecycleState === 'idle') return 'idle';
    if (isSending) {
      if (stageId === 'client') return 'passed';
      if (stageId === 'gateway') return 'active';
      if (stageId === 'database') return isWaking ? 'waiting' : 'active';
    }
    if (isSuccess) return 'passed';
    if (isError) {
      if (stageId === 'client') return 'passed';
      if (lifecycleState === 'fieldError' || lifecycleState === 'rateLimited') {
        return stageId === 'gateway' ? 'failed' : 'idle';
      }
      return stageId === 'gateway' || stageId === 'database' ? 'failed' : 'idle';
    }
    return 'idle';
  };

  const getStatusBadge = () => {
    switch (lifecycleState) {
      case 'idle':
        return { text: 'STANDBY', type: 'idle' };
      case 'validating':
        return { text: 'VALIDATING', type: 'busy' };
      case 'sending':
        return { text: 'DISPATCHING', type: 'busy' };
      case 'waking':
        return { text: 'WAKING SERVER', type: 'warn' };
      case 'success':
        return { text: `201 CREATED${elapsedMs ? ` · ${elapsedMs}ms` : ''}`, type: 'ok' };
      case 'fieldError':
        return { text: '400 BAD REQUEST', type: 'err' };
      case 'rateLimited':
        return { text: '429 RATE LIMITED', type: 'err' };
      case 'networkError':
        return { text: 'NETWORK FAILURE', type: 'err' };
      case 'serverError':
        return { text: '500 SERVER ERROR', type: 'err' };
      default:
        return { text: 'STANDBY', type: 'idle' };
    }
  };

  const badge = getStatusBadge();

  return (
    <div className={styles.panel} aria-label="Request lifecycle monitor">
      {/* Header bar */}
      <div className={styles.header}>
        <div className={styles.endpoint}>
          <span className={styles.method}>POST</span>
          <span className={styles.path}>/api/contact</span>
        </div>
        <div className={`${styles.badge} ${styles[badge.type]}`}>
          <span className={styles.badgeDot} />
          <span>{badge.text}</span>
        </div>
      </div>

      {/* Visual Pipeline */}
      <div className={styles.pipeline}>
        {stages.map((stage, idx) => {
          const status = getStageStatus(stage.id);
          const Icon = stage.icon;
          return (
            <React.Fragment key={stage.id}>
              <div className={`${styles.node} ${styles[status]}`}>
                <div className={styles.nodeIconWrap}>
                  <Icon className={styles.nodeIcon} />
                  {status === 'active' && !shouldReduceMotion && (
                    <motion.div
                      className={styles.nodePulse}
                      animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </div>
                <span className={styles.nodeLabel}>{stage.label}</span>
              </div>
              {idx < stages.length - 1 && (
                <div className={`${styles.track} ${styles[status]}`}>
                  {status === 'active' && !shouldReduceMotion && (
                    <motion.div
                      className={styles.packet}
                      animate={{ x: ['0%', '100%'] }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Server cold-start / waking notice (>2.5s) */}
      {isWaking && (
        <div className={styles.wakingNotice} role="alert">
          <FiClock className={styles.noticeIcon} />
          <span>Connecting to the server… this may take a moment.</span>
        </div>
      )}

      {/* Telemetry tabs / inspector */}
      <div className={styles.inspector}>
        {/* Request Details */}
        <div className={styles.block}>
          <div className={styles.blockHeader}>
            <span className={styles.blockTitle}>REQUEST PAYLOAD</span>
            <span className={styles.blockSub}>SANITIZED INSPECTOR</span>
          </div>
          <div className={styles.codeView}>
            {requestPayload ? (
              <pre className={styles.json}>
{JSON.stringify(
  {
    name: requestPayload.name,
    email: maskEmail(requestPayload.email),
    message: `${requestPayload.message?.slice(0, 36) || ''}${requestPayload.message?.length > 36 ? '…' : ''} (${requestPayload.message?.length || 0} chars)`,
    userAgent: 'masked_client_agent',
  },
  null,
  2
)}
              </pre>
            ) : (
              <span className={styles.muted}>Awaiting form submission...</span>
            )}
          </div>
        </div>

        {/* Response Details */}
        <div className={styles.block}>
          <div className={styles.blockHeader}>
            <span className={styles.blockTitle}>DATABASE & HTTP RESPONSE</span>
            <span className={styles.blockSub}>ACTUAL SERVER OUTPUT</span>
          </div>
          <div className={styles.codeView}>
            {isSuccess && responseResult ? (
              <div className={styles.successBlock}>
                <div className={styles.resultRow}>
                  <FiCheckCircle className={styles.okIcon} />
                  <span className={styles.okText}>Document persisted to MongoDB Atlas</span>
                </div>
                <pre className={styles.json}>
{JSON.stringify(
  {
    ok: true,
    status: 201,
    id: responseResult.id,
    createdAt: responseResult.createdAt,
    collection: 'messages',
  },
  null,
  2
)}
                </pre>
              </div>
            ) : isError && responseResult ? (
              <div className={styles.errorBlock}>
                <div className={styles.resultRow}>
                  {lifecycleState === 'rateLimited' ? (
                    <FiAlertTriangle className={styles.errIcon} />
                  ) : (
                    <FiAlertCircle className={styles.errIcon} />
                  )}
                  <span className={styles.errText}>
                    {responseResult.error?.message || 'Request failed'}
                  </span>
                </div>
                <pre className={styles.jsonErr}>
{JSON.stringify(
  {
    ok: false,
    status: responseResult.status || 'NO_RESPONSE',
    code: responseResult.error?.code || 'ERROR',
    fields: responseResult.error?.fields || undefined,
  },
  null,
  2
)}
                </pre>
              </div>
            ) : isSending ? (
              <div className={styles.pendingBlock}>
                <div className={styles.spinner} />
                <span>Waiting for MongoDB Atlas persistence confirmation...</span>
              </div>
            ) : (
              <span className={styles.muted}>Ready for transmission</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
