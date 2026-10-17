import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiMail, FiMapPin, FiCopy, FiCheck, FiCpu, FiShield, FiDatabase } from 'react-icons/fi';
import SectionShell from '../../components/SectionShell/SectionShell.jsx';
import ContactForm from './ContactForm.jsx';
import RequestResponsePanel from './RequestResponsePanel.jsx';
import Port from '../../components/primitives/Port.jsx';
import { profile } from '../../data/profile.js';
import styles from './Contact.module.css';

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();

  // Coordinated lifecycle state for form and inspector panel
  const [lifecycleState, setLifecycleState] = useState('idle');
  const [requestPayload, setRequestPayload] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [isWaking, setIsWaking] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(null);

  // Email copy state
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (profile.email) {
      navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <SectionShell
      id="response"
      nodeNumber="08"
      nodeLabel="RESPONSE"
      title="Contact & Transmission"
      subtitle="Establish a connection. Messages are validated by Express and stored directly in MongoDB Atlas."
    >
      <div className={styles.container}>
        {/* Left Column: Authoritative Contact Info & Architecture Specs */}
        <motion.div
          className={styles.infoCol}
          initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className={styles.introCard}>
            <div className={styles.cardHeader}>
              <span className={styles.metaLabel}>COMMUNICATION PIPELINE</span>
              <Port active className={styles.signalPort} />
            </div>

            <h3 className={styles.infoHeading}>
              Let&apos;s build intelligent systems together.
            </h3>
            <p className={styles.infoDesc}>
              Whether you are discussing engineering roles, distributed architecture, API integration, or academic research collaboration, my transmission channel is open.
            </p>

            {/* Authoritative Verified Email Only */}
            {profile.email && (
              <div className={styles.channelRow}>
                <div className={styles.channelMeta}>
                  <div className={styles.channelIcon}>
                    <FiMail />
                  </div>
                  <div className={styles.channelDetails}>
                    <span className={styles.channelLabel}>PRIMARY INBOX</span>
                    <a
                      href={`mailto:${profile.email}`}
                      className={styles.channelLink}
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={styles.copyBtn}
                  aria-label="Copy email address"
                  title="Copy email to clipboard"
                >
                  {copied ? <FiCheck className={styles.copiedIcon} /> : <FiCopy />}
                  <span className={styles.copyText}>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            )}

            {/* Location & Timezone */}
            {profile.location && (
              <div className={styles.channelRow}>
                <div className={styles.channelMeta}>
                  <div className={styles.channelIcon}>
                    <FiMapPin />
                  </div>
                  <div className={styles.channelDetails}>
                    <span className={styles.channelLabel}>LOCATION</span>
                    <span className={styles.channelValue}>
                      {profile.location} · UTC+5:30 (IST)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Engineering Pipeline Specs */}
          <div className={styles.specsCard}>
            <div className={styles.cardHeader}>
              <span className={styles.metaLabel}>BACKEND ARCHITECTURE</span>
            </div>
            <ul className={styles.specList}>
              <li className={styles.specItem}>
                <FiCpu className={styles.specIcon} />
                <div>
                  <strong>Express REST Gateway</strong>
                  <p>Handles incoming JSON with 10KB payload boundary and strict CORS headers.</p>
                </div>
              </li>
              <li className={styles.specItem}>
                <FiShield className={styles.specIcon} />
                <div>
                  <strong>Zod & Rate Limiting</strong>
                  <p>Client input sanitization with 5-req/15m throttle and honeypot filtering.</p>
                </div>
              </li>
              <li className={styles.specItem}>
                <FiDatabase className={styles.specIcon} />
                <div>
                  <strong>MongoDB Atlas Cluster</strong>
                  <p>Persisted Mongoose message schema with UTC timestamp indexing.</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Right Column: Interactive Form & Real-time Request Inspector */}
        <motion.div
          className={styles.formCol}
          initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {/* Contact Form */}
          <ContactForm
            onStateChange={setLifecycleState}
            onRequestPayload={setRequestPayload}
            onResponseResult={setResponseResult}
            onWakingChange={setIsWaking}
            onElapsed={setElapsedMs}
          />

          {/* Real Request/Response Visualization Panel */}
          <RequestResponsePanel
            lifecycleState={lifecycleState}
            requestPayload={requestPayload}
            responseResult={responseResult}
            isWaking={isWaking}
            elapsedMs={elapsedMs}
          />
        </motion.div>
      </div>
    </SectionShell>
  );
}
