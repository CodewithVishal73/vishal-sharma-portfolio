import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  FiGlobe,
  FiLayers,
  FiDatabase,
  FiCpu,
  FiActivity,
  FiCheckCircle,
  FiAlertCircle,
  FiPlay,
  FiPause,
} from 'react-icons/fi';
import {
  SiReact,
  SiSpringboot,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiApachemaven,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import { pingApi } from '../../lib/api.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';
import Button from '../primitives/Button.jsx';
import Badge from '../primitives/Badge.jsx';
import {
  ARCHITECTURE_META,
  ARCHITECTURE_PATHS,
  ARCHITECTURE_NODES,
  ARCHITECTURE_LEGEND,
} from '../../data/architecture.js';
import styles from './SystemMap.module.css';

// SVG coordinate maps and continuous racetrack paths
const SVG_VIEWBOX = '0 0 940 370';

const PATH_DATA = {
  java: 'M 80 155 L 235 155 C 320 155, 345 80, 435 80 L 645 80 L 855 80 L 645 80 L 435 80 C 345 80, 320 155, 235 155 L 80 155 Z',
  node: 'M 80 155 L 235 155 C 320 155, 345 215, 435 215 L 645 215 L 855 215 L 645 215 L 435 215 C 345 215, 320 155, 235 155 L 80 155 Z',
  ai: 'M 80 155 L 235 155 C 320 155, 345 215, 435 215 L 645 215 L 645 310 L 645 215 L 435 215 C 345 215, 320 155, 235 155 L 80 155 Z',
};

const PATH_KEYS = ['node', 'java', 'ai'];

export default function SystemMap() {
  const containerRef = useRef(null);
  const activeTrackRef = useRef(null);
  const animationFrameId = useRef(null);
  const autoTimerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Container width detection for responsive layout modes
  const [containerWidth, setContainerWidth] = useState(800);

  // Single source of truth in React state for Auto rotation
  const [selectedPathId, setSelectedPathId] = useState('node');
  const [autoPlay, setAutoPlay] = useState(!prefersReducedMotion);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [isCardIntersecting, setIsCardIntersecting] = useState(true);

  // Packet animation state
  const [packetCoord, setPacketCoord] = useState({ x: 80, y: 155 });
  const [activeNodeId, setActiveNodeId] = useState(null);

  // Real API ping state (strictly for the real portfolio backend)
  // Status: 'idle' | 'pinging' | 'success' | 'error' | 'waking'
  const [pingStatus, setPingStatus] = useState('idle');
  const [pingData, setPingData] = useState(null);
  const [pingErrorMsg, setPingErrorMsg] = useState(null);

  const activePath = ARCHITECTURE_PATHS[selectedPathId] || ARCHITECTURE_PATHS.node;

  // 1. Container width observation via ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 2. Tab visibility & Intersection observation for pause controls
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const observer = new IntersectionObserver(([entry]) => {
      setIsCardIntersecting(entry.isIntersecting);
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();
    };
  }, []);

  // 3. Strict single-owner timer for Auto rotation
  useEffect(() => {
    // Clear any active timer immediately
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }

    // Do not set timer if autoPlay is paused, user is interacting, tab is hidden, off-screen, or reduced motion
    if (!autoPlay || isInteracting || !isTabVisible || !isCardIntersecting || prefersReducedMotion) {
      return;
    }

    // Single timer instance
    autoTimerRef.current = setTimeout(() => {
      setSelectedPathId((current) => {
        const idx = PATH_KEYS.indexOf(current);
        const nextIdx = (idx + 1) % PATH_KEYS.length;
        return PATH_KEYS[nextIdx];
      });
    }, 7200);

    return () => {
      if (autoTimerRef.current) {
        clearTimeout(autoTimerRef.current);
        autoTimerRef.current = null;
      }
    };
  }, [autoPlay, selectedPathId, isInteracting, isTabVisible, isCardIntersecting, prefersReducedMotion]);

  // 4. Single rAF animation loop for the traveling packet
  useEffect(() => {
    if (prefersReducedMotion || containerWidth < 480) {
      setPacketCoord({ x: 80, y: 155 });
      setActiveNodeId(null);
      return;
    }

    let progress = 0;
    const speed = 0.0022;

    const step = () => {
      if (isTabVisible && isCardIntersecting && activeTrackRef.current) {
        progress = (progress + speed) % 1;
        const totalLen = activeTrackRef.current.getTotalLength();
        const pt = activeTrackRef.current.getPointAtLength(progress * totalLen);
        setPacketCoord({ x: pt.x, y: pt.y });

        // Node proximity detection to trigger pulse highlight
        let hitId = null;
        Object.values(ARCHITECTURE_NODES).forEach((node) => {
          const dist = Math.hypot(node.x - pt.x, node.y - pt.y);
          if (dist < 34) {
            hitId = node.id;
          }
        });
        setActiveNodeId(hitId);
      }
      animationFrameId.current = requestAnimationFrame(step);
    };

    animationFrameId.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [selectedPathId, prefersReducedMotion, containerWidth, isTabVisible, isCardIntersecting]);

  // 5. Real Ping API handler (calls portfolio's /api/health)
  const handlePing = async () => {
    setPingStatus('pinging');
    setPingErrorMsg(null);
    setPingData(null);

    const startTime = performance.now();

    try {
      const data = await pingApi();
      const elapsed = Math.round(performance.now() - startTime);

      if (data.ok && data.status === 'up') {
        setPingStatus('success');
        setPingData({
          statusCode: data.status ? 200 : 500,
          latency: data.latency || elapsed,
          db: data.db, // 'connected' or 'disconnected'
          uptime: data.uptime,
          ts: data.ts,
          isColdStart: elapsed > 2500,
        });
      } else {
        const isWaking = elapsed > 3000;
        setPingStatus(isWaking ? 'waking' : 'error');
        setPingErrorMsg(
          data.error?.message ||
            (isWaking
              ? 'Server instance is spinning up (cold start), retrying…'
              : `HTTP error ${data.status || 500}`)
        );
      }
    } catch (err) {
      setPingStatus('error');
      setPingErrorMsg(err.message || 'Network connection failed');
    }
  };

  // Keyboard navigation for selector radiogroup
  const handleSelectorKeyDown = (e, targetPathId) => {
    const currentIndex = PATH_KEYS.indexOf(targetPathId);
    let nextIndex = currentIndex;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % PATH_KEYS.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + PATH_KEYS.length) % PATH_KEYS.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = PATH_KEYS.length - 1;
    }

    if (nextIndex !== currentIndex) {
      const nextPath = PATH_KEYS[nextIndex];
      setSelectedPathId(nextPath);
      setAutoPlay(false);
      const nextBtn = document.getElementById(`arch-tab-${nextPath}`);
      if (nextBtn) nextBtn.focus();
    }
  };

  const isNarrow = containerWidth < 480;

  return (
    <div
      className={styles.systemMapCard}
      ref={containerRef}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocus={() => setIsInteracting(true)}
      onBlur={() => setIsInteracting(false)}
      role="group"
      aria-label="Multi-stack architecture map showing illustrative backend systems and real telemetry"
    >
      {/* Screen reader only step-by-step description */}
      <div className={styles.srOnly}>
        <h4>Current Active Architecture Flow: {activePath.label}</h4>
        <ol>
          {activePath.nodes.map((nId, idx) => {
            const node = ARCHITECTURE_NODES[nId];
            return (
              <li key={nId}>
                Step {idx + 1}: {node?.label} ({node?.sub}) - {node?.category} [{node?.archKind}]
              </li>
            );
          })}
        </ol>
      </div>

      {/* Card Header */}
      <header className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.liveIndicator}>
            <span className={styles.liveDot} />
            <span className="mono-label">SYSTEM ARCHITECTURE</span>
          </div>
          <Badge variant="signal">{ARCHITECTURE_META.badge}</Badge>
        </div>

        {/* Real Ping API button (always tests portfolio's own backend) */}
        <Button
          variant="secondary"
          size="sm"
          onClick={handlePing}
          disabled={pingStatus === 'pinging'}
          className={styles.pingBtn}
          aria-label="Ping live portfolio backend API health endpoint"
        >
          <FiActivity
            className={`${styles.pingIcon} ${pingStatus === 'pinging' ? styles.spin : ''}`}
          />
          <span>{pingStatus === 'pinging' ? 'Pinging…' : 'Ping Backend'}</span>
        </Button>
      </header>

      {/* Map Body: Desktop/Medium SVG Layout OR Narrow Stacked Layout */}
      {!isNarrow ? (
        <div className={styles.svgWrapper}>
          <svg
            viewBox={SVG_VIEWBOX}
            className={styles.svgCanvas}
            aria-hidden="true"
          >
            <defs>
              <filter id="hero-packet-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Static Background Circuit Guides for All Branches */}
            {/* Trunk: Browser -> React */}
            <path
              d="M 116 155 L 198 155"
              className={styles.circuitLine}
              stroke="var(--line)"
              strokeWidth="1.5"
            />

            {/* Fork to Java */}
            <path
              d="M 272 155 C 330 155, 345 80, 396 80"
              className={`${styles.circuitLine} ${
                selectedPathId === 'java' ? styles.branchActive : styles.branchDimmed
              }`}
              stroke="var(--line)"
              strokeWidth="1.5"
            />
            <path
              d="M 474 80 L 606 80"
              className={`${styles.circuitLine} ${
                selectedPathId === 'java' ? styles.branchActive : styles.branchDimmed
              }`}
              stroke="var(--line)"
              strokeWidth="1.5"
            />
            <path
              d="M 684 80 L 816 80"
              className={`${styles.circuitLine} ${
                selectedPathId === 'java' ? styles.branchActive : styles.branchDimmed
              }`}
              stroke="var(--line)"
              strokeWidth="1.5"
            />

            {/* Fork to Node */}
            <path
              d="M 272 155 C 330 155, 345 215, 396 215"
              className={`${styles.circuitLine} ${
                selectedPathId === 'node' ? styles.branchActive : styles.branchDimmed
              }`}
              stroke="var(--line)"
              strokeWidth="1.5"
            />
            <path
              d="M 474 215 L 606 215"
              className={`${styles.circuitLine} ${
                selectedPathId === 'node' ? styles.branchActive : styles.branchDimmed
              }`}
              stroke="var(--line)"
              strokeWidth="1.5"
            />
            <path
              d="M 684 215 L 816 215"
              className={`${styles.circuitLine} ${
                selectedPathId === 'node' ? styles.branchActive : styles.branchDimmed
              }`}
              stroke="var(--line)"
              strokeWidth="1.5"
            />

            {/* Optional AI Integration Branch (Dashed connector from Node backend) */}
            <path
              d="M 645 248 L 645 282"
              className={`${styles.circuitLine} ${styles.circuitDashed} ${
                selectedPathId === 'ai' ? styles.branchActive : styles.branchDimmed
              }`}
              stroke="var(--line)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Hidden Track for rAF Packet Following Active Path */}
            <path
              ref={activeTrackRef}
              d={PATH_DATA[selectedPathId]}
              fill="none"
              stroke="transparent"
            />

            {/* Active Highlight Line with directional glow */}
            <path
              d={PATH_DATA[selectedPathId]}
              className={styles.activeTrackGlow}
              fill="none"
            />
            <path
              d={PATH_DATA[selectedPathId]}
              className={styles.activeTrackStroke}
              fill="none"
            />

            {/* Active Traveling Packet (rAF animated, paused on reduced motion) */}
            {!prefersReducedMotion && (
              <circle
                cx={packetCoord.x}
                cy={packetCoord.y}
                r="5.5"
                className={styles.packetDot}
                filter="url(#hero-packet-glow)"
              />
            )}

            {/* Branch Header Watermarks */}
            <text x="350" y="46" className={styles.branchHeaderLabel}>
              BRANCH A: JAVA / SPRING BOOT ECOSYSTEM [SELLERLENSIQ]
            </text>
            <text x="350" y="278" className={styles.branchHeaderLabel}>
              BRANCH B: NODE.JS / EXPRESS [THIS SITE RUNTIME]
            </text>

            {/* RENDER ALL SYSTEM NODES */}
            {Object.values(ARCHITECTURE_NODES).map((node) => {
              const isTrunk = node.kind === 'trunk';
              const isSelectedBranch =
                isTrunk ||
                (selectedPathId === 'java' && node.kind === 'java') ||
                (selectedPathId === 'node' && node.kind === 'node') ||
                (selectedPathId === 'ai' && (node.kind === 'node' || node.kind === 'ai'));

              const isHit = activeNodeId === node.id;

              return (
                <g
                  key={node.id}
                  className={`${styles.nodeGroup} ${
                    isSelectedBranch ? styles.nodeBranchActive : styles.nodeBranchDimmed
                  } ${isHit ? styles.nodeHit : ''}`}
                  transform={`translate(${node.x}, ${node.y})`}
                >
                  {/* Outer Pulse Ring */}
                  <circle
                    r="32"
                    className={styles.nodePulseRing}
                    fill="none"
                    stroke={isHit ? 'var(--signal)' : 'transparent'}
                    strokeWidth="1.5"
                  />

                  {/* Node Background Tile */}
                  <rect
                    x="-36"
                    y="-28"
                    width="72"
                    height="56"
                    rx="12"
                    className={styles.nodeTile}
                  />

                  {/* Maven Badge on Spring Boot Node */}
                  {node.buildBadge && (
                    <g transform="translate(18, -26)">
                      <rect
                        x="-10"
                        y="-8"
                        width="44"
                        height="16"
                        rx="4"
                        className={styles.miniBadgeBg}
                      />
                      <foreignObject x="-8" y="-7" width="40" height="14">
                        <div className={styles.miniBadgeContent}>
                          <SiApachemaven className={styles.miniBadgeIcon} />
                          <span>Maven</span>
                        </div>
                      </foreignObject>
                    </g>
                  )}

                  {/* This Site Tag on Node/Express */}
                  {node.siteBadge && (
                    <g transform="translate(16, -26)">
                      <rect
                        x="-10"
                        y="-8"
                        width="50"
                        height="16"
                        rx="4"
                        className={styles.siteBadgeBg}
                      />
                      <text x="15" y="4" className={styles.siteBadgeText} textAnchor="middle">
                        This site
                      </text>
                    </g>
                  )}

                  {/* Optional Integration Tag on AI */}
                  {node.tag && (
                    <g transform="translate(0, 40)">
                      <text x="0" y="0" className={styles.aiTagText} textAnchor="middle">
                        Optional integration pattern
                      </text>
                    </g>
                  )}

                  {/* Node Icon Container */}
                  <foreignObject x="-24" y="-20" width="48" height="24">
                    <div className={styles.iconFlex}>
                      {node.id === 'browser' && <FiGlobe className={styles.nodeIcon} />}
                      {node.id === 'react' && <SiReact className={styles.nodeIcon} />}
                      {node.id === 'api-java' && <FiLayers className={styles.nodeIcon} />}
                      {node.id === 'api-node' && <FiLayers className={styles.nodeIcon} />}
                      {node.id === 'backend-java' && (
                        <div className={styles.dualIconRow}>
                          <SiSpringboot className={styles.nodeIcon} />
                          <FaJava className={styles.nodeIcon} />
                        </div>
                      )}
                      {node.id === 'backend-node' && (
                        <div className={styles.dualIconRow}>
                          <SiNodedotjs className={styles.nodeIcon} />
                          <SiExpress className={styles.nodeIcon} />
                        </div>
                      )}
                      {node.id === 'db-node' && <SiMongodb className={styles.nodeIcon} />}
                      {node.id === 'db-java' && (
                        <div className={styles.dualIconRow}>
                          <SiPostgresql className={styles.nodeIcon} />
                          <SiMysql className={styles.nodeIcon} />
                        </div>
                      )}
                      {node.id === 'ai-service' && <FiCpu className={styles.nodeIcon} />}
                    </div>
                  </foreignObject>

                  {/* Node Title */}
                  <text y="14" className={styles.nodeTitle} textAnchor="middle">
                    {node.label}
                  </text>

                  {/* Node Subtitle */}
                  <text y="24" className={styles.nodeSub} textAnchor="middle">
                    {node.sub}
                  </text>

                  {/* Relational DB Chips (PostgreSQL | MySQL) */}
                  {node.chips && (
                    <g transform="translate(0, 38)">
                      <text x="0" y="0" className={styles.chipsLabel} textAnchor="middle">
                        PostgreSQL · MySQL
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      ) : (
        /* Narrow Viewport (< 480px) Stacked Vertical Architecture */
        <div className={styles.narrowStack}>
          {/* Trunk */}
          <div className={styles.narrowNodeCard}>
            <FiGlobe className={styles.narrowIcon} />
            <div className={styles.narrowNodeInfo}>
              <span className={styles.narrowNodeName}>BROWSER</span>
              <span className={styles.narrowNodeSub}>Client UI / User</span>
            </div>
            <span className={styles.narrowTrunkTag}>Client</span>
          </div>

          <div className={styles.narrowArrow} aria-hidden="true">
            <span className={styles.arrowStem} />
            <span className={styles.arrowHead}>▼</span>
          </div>

          <div className={styles.narrowNodeCard}>
            <SiReact className={styles.narrowIcon} />
            <div className={styles.narrowNodeInfo}>
              <span className={styles.narrowNodeName}>REACT SPA</span>
              <span className={styles.narrowNodeSub}>Client Router & State</span>
            </div>
            <span className={styles.narrowTrunkTag}>Frontend</span>
          </div>

          {/* Fork Indicator */}
          <div className={styles.narrowForkHeader}>
            <span className={styles.forkLead}>BRANCH FORK →</span>
            <span className={styles.forkActiveName}>{activePath.label}</span>
          </div>

          {/* Active Branch Chain Nodes */}
          {activePath.nodes.slice(2).map((nId, idx) => {
            const node = ARCHITECTURE_NODES[nId];
            return (
              <React.Fragment key={nId}>
                <div className={styles.narrowArrow} aria-hidden="true">
                  <span className={styles.arrowStem} />
                  <span className={styles.arrowHead}>▼</span>
                </div>

                <div
                  className={`${styles.narrowNodeCard} ${
                    node.siteBadge ? styles.narrowSiteCard : ''
                  }`}
                >
                  <div className={styles.narrowIconWrap}>
                    {node.id === 'api-java' && <FiLayers className={styles.narrowIcon} />}
                    {node.id === 'api-node' && <FiLayers className={styles.narrowIcon} />}
                    {node.id === 'backend-java' && <SiSpringboot className={styles.narrowIcon} />}
                    {node.id === 'backend-node' && <SiNodedotjs className={styles.narrowIcon} />}
                    {node.id === 'db-node' && <SiMongodb className={styles.narrowIcon} />}
                    {node.id === 'db-java' && <FiDatabase className={styles.narrowIcon} />}
                    {node.id === 'ai-service' && <FiCpu className={styles.narrowIcon} />}
                  </div>

                  <div className={styles.narrowNodeInfo}>
                    <div className={styles.narrowTitleRow}>
                      <span className={styles.narrowNodeName}>{node.label}</span>
                      {node.siteBadge && (
                        <span className={styles.narrowSiteBadge}>{node.siteBadge}</span>
                      )}
                      {node.buildBadge && (
                        <span className={styles.narrowBuildBadge}>{node.buildBadge}</span>
                      )}
                    </div>
                    <span className={styles.narrowNodeSub}>{node.sub}</span>
                    {node.chips && (
                      <span className={styles.narrowChipsLine}>
                        Options: {node.chips.join(' · ')}
                      </span>
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Architecture Legend (Three kinds of architecture) */}
      <div className={styles.legendBar} aria-label="Architecture classification legend">
        <span className={styles.legendTitle}>CLASSIFICATION:</span>
        {ARCHITECTURE_LEGEND.map((item) => (
          <div key={item.kind} className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles[`legend_${item.kind}`]}`} />
            <span className={styles.legendTag}>{item.tag}</span>
            <span className={styles.legendText}>({item.label})</span>
          </div>
        ))}
      </div>

      {/* Segmented Architecture Selector & Auto Play/Pause */}
      <div className={styles.selectorBar}>
        <div
          role="radiogroup"
          aria-label="Architecture path selector"
          className={styles.segmentedGroup}
        >
          {PATH_KEYS.map((pKey) => {
            const item = ARCHITECTURE_PATHS[pKey];
            const isSelected = selectedPathId === pKey;
            return (
              <button
                key={pKey}
                id={`arch-tab-${pKey}`}
                type="button"
                role="radio"
                aria-checked={isSelected}
                tabIndex={isSelected ? 0 : -1}
                className={`${styles.segmentBtn} ${isSelected ? styles.segmentBtnActive : ''}`}
                onClick={() => {
                  setSelectedPathId(pKey);
                  setAutoPlay(false);
                }}
                onKeyDown={(e) => handleSelectorKeyDown(e, pKey)}
              >
                <span className={styles.segmentIndicator} aria-hidden="true" />
                <span className={styles.segmentLabel}>{item.shortLabel}</span>
                <span
                  className={`${styles.segmentTag} ${
                    item.kind === 'actual'
                      ? styles.tagReal
                      : item.kind === 'project'
                      ? styles.tagProject
                      : styles.tagIllustrative
                  }`}
                >
                  {item.statusTag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Auto Play / Pause Toggle Button */}
        <button
          type="button"
          aria-pressed={autoPlay}
          className={`${styles.autoToggleBtn} ${autoPlay ? styles.autoActive : ''}`}
          onClick={() => setAutoPlay((prev) => !prev)}
          aria-label={autoPlay ? 'Pause automatic path rotation' : 'Resume automatic path rotation'}
          title={
            autoPlay
              ? 'Auto rotation active (Click to pause)'
              : 'Paused (Click to resume auto rotation)'
          }
        >
          {autoPlay ? <FiPause size={13} /> : <FiPlay size={13} />}
          <span>{autoPlay ? 'Auto: Playing' : 'Auto: Paused'}</span>
        </button>
      </div>

      {/* Dynamic Accessible Caption Line below Selector */}
      <div className={styles.captionArea} aria-live="polite" aria-atomic="true">
        <span className={styles.captionPrefix}>ACTIVE PATH //</span>
        <span className={styles.captionText}>{activePath.caption}</span>
      </div>

      {/* Real Ping Telemetry Status Banner (Strictly for Node.js / Express path) */}
      <div
        className={`${styles.telemetryBanner} ${
          pingStatus === 'success'
            ? styles.telemetrySuccess
            : pingStatus === 'error'
            ? styles.telemetryError
            : pingStatus === 'waking'
            ? styles.telemetryWaking
            : styles.telemetryIdle
        }`}
        role="status"
        aria-live="polite"
      >
        {pingStatus === 'idle' && (
          <>
            <FiActivity className={styles.bannerIcon} />
            <div className={styles.bannerText}>
              <strong>Telemetry inactive:</strong> Click "Ping Backend" to execute a live roundtrip
              verification against this portfolio's Express &amp; MongoDB Atlas service.
            </div>
          </>
        )}

        {pingStatus === 'pinging' && (
          <>
            <FiActivity className={`${styles.bannerIcon} ${styles.spin}`} />
            <div className={styles.bannerText}>
              <strong>Calling /api/health:</strong> Measuring roundtrip network latency and MongoDB
              connection state…
            </div>
          </>
        )}

        {pingStatus === 'success' && pingData && (
          <>
            <FiCheckCircle className={styles.bannerIcon} />
            <div className={styles.bannerText}>
              <strong>Portfolio API:</strong> 200 OK · Roundtrip Latency:{' '}
              <strong>{pingData.latency} ms</strong>
              {pingData.isColdStart ? ' (Cold-start)' : ''} · Database:{' '}
              <strong>{pingData.db === 'connected' ? 'Connected (Atlas)' : 'Disconnected'}</strong> ·
              Uptime: {pingData.uptime}s
            </div>
          </>
        )}

        {pingStatus === 'waking' && (
          <>
            <FiAlertCircle className={styles.bannerIcon} />
            <div className={styles.bannerText}>
              <strong>Instance Waking:</strong> Free-tier service instance is waking from sleep.
              Latency exceeds 3s. Retrying connection…
            </div>
          </>
        )}

        {pingStatus === 'error' && (
          <>
            <FiAlertCircle className={styles.bannerIcon} />
            <div className={styles.bannerText}>
              <strong>Portfolio API Offline / Error:</strong> {pingErrorMsg}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
