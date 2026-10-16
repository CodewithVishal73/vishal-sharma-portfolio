import React, { useState, useEffect, useRef } from 'react';
import { FiGlobe, FiActivity, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { SiReact, SiExpress, SiMongodb } from 'react-icons/si';
import { pingApi } from '../../lib/api.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';
import Button from '../primitives/Button.jsx';
import Badge from '../primitives/Badge.jsx';
import styles from './SystemMap.module.css';

const NODES = [
  { id: 'browser', label: 'BROWSER', sub: 'Client / User', x: 85, y: 105, Icon: FiGlobe },
  { id: 'react', label: 'REACT', sub: 'SPA & Router', x: 255, y: 105, Icon: SiReact },
  { id: 'express', label: 'EXPRESS', sub: 'REST API', x: 425, y: 105, Icon: SiExpress },
  { id: 'mongodb', label: 'MONGODB', sub: 'Atlas Database', x: 595, y: 105, Icon: SiMongodb },
];

export default function SystemMap() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const animationFrameId = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Active packet coordinate
  const [packetCoord, setPacketCoord] = useState({ x: 85, y: 105 });
  const [activeNode, setActiveNode] = useState(null);

  // Ping API state
  const [pinging, setPinging] = useState(false);
  const [pingResult, setPingResult] = useState(null);
  const [pingError, setPingError] = useState(null);

  // 1. Packet animation loop using single rAF (paused when off-screen or tab hidden)
  useEffect(() => {
    if (prefersReducedMotion) {
      setPacketCoord({ x: 85, y: 105 });
      return;
    }

    let isVisible = true;
    let isIntersecting = true;
    let progress = 0;
    const speed = 0.0018; // ambient speed

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleVisibility = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const step = () => {
      if (isVisible && isIntersecting && pathRef.current) {
        progress = (progress + speed) % 1;
        const pathLength = pathRef.current.getTotalLength();
        const pt = pathRef.current.getPointAtLength(progress * pathLength);
        setPacketCoord({ x: pt.x, y: pt.y });

        // Node pulse detection
        if (progress > 0.02 && progress < 0.06) setActiveNode('browser');
        else if (progress > 0.16 && progress < 0.20) setActiveNode('react');
        else if (progress > 0.30 && progress < 0.34) setActiveNode('express');
        else if (progress > 0.44 && progress < 0.48) setActiveNode('mongodb');
        else setActiveNode(null);
      }
      animationFrameId.current = requestAnimationFrame(step);
    };

    animationFrameId.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [prefersReducedMotion]);

  // 2. Ping API function
  const handlePing = async () => {
    setPinging(true);
    setPingError(null);
    setPingResult(null);

    try {
      const data = await pingApi();
      if (data.ok) {
        setPingResult(data);
      } else {
        setPingError(data.error?.message || 'Server waking up, retrying…');
      }
    } catch {
      setPingError('Server waking up, retrying…');
    } finally {
      setPinging(false);
    }
  };

  // SVG closed racetrack path
  // (85, 105) -> (595, 105) -> arc down to (595, 185) -> (85, 185) -> arc up to (85, 105)
  const pathD =
    'M 85 105 L 595 105 A 40 40 0 0 1 595 185 L 85 185 A 40 40 0 0 1 85 105 Z';

  return (
    <div className={styles.systemMapCard} ref={containerRef}>
      {/* Header bar */}
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.liveIndicator}>
            <span className={styles.liveDot} />
            <span className="mono-label">LIVE SYSTEM TELEMETRY</span>
          </div>
          <Badge variant="signal">METAPHOR: THE REQUEST</Badge>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handlePing}
          disabled={pinging}
          className={styles.pingBtn}
          aria-label="Ping live backend API health endpoint"
        >
          <FiActivity className={`${styles.pingIcon} ${pinging ? styles.spin : ''}`} />
          <span>{pinging ? 'Pinging API…' : 'Ping API'}</span>
        </Button>
      </div>

      {/* SVG Architecture Map */}
      <div className={styles.svgWrapper}>
        <svg
          viewBox="0 0 680 250"
          className={styles.svgCanvas}
          aria-label="Interactive architecture map showing Request path: Browser to React to Express to MongoDB"
          role="img"
        >
          <defs>
            {/* Signal Glow Filter */}
            <filter id="packet-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="track-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--line)" />
              <stop offset="50%" stopColor="var(--signal)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--line)" />
            </linearGradient>
          </defs>

          {/* Background Guide Line */}
          <path
            ref={pathRef}
            d={pathD}
            className={styles.circuitTrack}
            fill="none"
            stroke="var(--line)"
            strokeWidth="2"
            strokeDasharray="4 6"
          />

          {/* Directional Flow Arrows */}
          <text x="340" y="94" className={styles.flowLabel} textAnchor="middle">
            HTTP REQUEST →
          </text>
          <text x="340" y="198" className={styles.flowLabel} textAnchor="middle">
            ← 200 OK / 201 CREATED RESPONSE
          </text>

          {/* Dynamic Traveling Packet */}
          {!prefersReducedMotion && (
            <circle
              cx={packetCoord.x}
              cy={packetCoord.y}
              r="6"
              className={styles.packetDot}
              filter="url(#packet-glow)"
            />
          )}

          {/* System Nodes */}
          {NODES.map((node) => {
            const isHit = activeNode === node.id;
            const Icon = node.Icon;

            return (
              <g
                key={node.id}
                className={`${styles.nodeGroup} ${isHit ? styles.nodeHit : ''}`}
                transform={`translate(${node.x}, ${node.y})`}
              >
                {/* Outer Pulse Ring */}
                <circle
                  r="30"
                  className={styles.nodePulseRing}
                  fill="none"
                  stroke={isHit ? 'var(--signal)' : 'transparent'}
                  strokeWidth="1.5"
                />

                {/* Node Tile Background */}
                <rect
                  x="-24"
                  y="-24"
                  width="48"
                  height="48"
                  rx="12"
                  className={styles.nodeTile}
                />

                {/* Node Icon */}
                <foreignObject x="-14" y="-14" width="28" height="28">
                  <div className={styles.iconContainer}>
                    <Icon className={styles.nodeIcon} />
                  </div>
                </foreignObject>

                {/* Node Name */}
                <text y="40" className={styles.nodeTitle} textAnchor="middle">
                  {node.label}
                </text>
                {/* Node Subtitle */}
                <text y="52" className={styles.nodeSub} textAnchor="middle">
                  {node.sub}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Ping Telemetry Status Banner */}
      {(pingResult || pingError) && (
        <div
          className={`${styles.telemetryBanner} ${pingError ? styles.telemetryError : styles.telemetrySuccess}`}
          role="status"
          aria-live="polite"
        >
          {pingResult ? (
            <>
              <FiCheckCircle className={styles.bannerIcon} />
              <div className={styles.bannerText}>
                <strong>200 OK</strong> · Latency: <strong>{pingResult.latency} ms</strong> · Database: <strong>{pingResult.db}</strong> · Uptime: {pingResult.uptime}s
              </div>
            </>
          ) : (
            <>
              <FiAlertCircle className={styles.bannerIcon} />
              <div className={styles.bannerText}>
                <strong>Backend Pending</strong>: {pingError}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
