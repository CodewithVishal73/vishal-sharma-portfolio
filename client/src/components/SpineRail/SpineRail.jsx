import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { SECTIONS } from '../../data/sections.js';
import styles from './SpineRail.module.css';

const NODES = SECTIONS.map((s) => ({
  id: s.id,
  num: s.num,
  label: s.nodeLabel,
  path: s.path,
  alias: s.alias,
}));

export default function SpineRail() {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const activeIndex = NODES.findIndex((node) => {
    if (node.path === '/') {
      return location.pathname === '/' || location.pathname === '/client';
    }
    return (
      location.pathname === node.path ||
      location.pathname === node.alias ||
      location.pathname.startsWith(node.path + '/')
    );
  });
  const currentActiveIndex = activeIndex >= 0 ? activeIndex : 0;

  return (
    <>
      {/* Mobile Top Progress Bar (< 1024px) */}
      <motion.div
        className={styles.mobileProgress}
        style={{ scaleX: scaleY, transformOrigin: '0%' }}
        aria-hidden="true"
      />

      {/* Desktop Fixed Left Rail (>= 1024px) */}
      <aside className={styles.desktopRail} aria-label="System Pipeline Spine">
        <div className={styles.railTrack}>
          {/* Inactive background track line */}
          <div className={styles.guideLine} />

          {/* Active drawn signal line based on pipeline position */}
          <motion.div
            className={styles.activeLine}
            style={{
              scaleY: (currentActiveIndex + 1) / NODES.length,
              transformOrigin: 'top',
              transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />

          {/* Node markers along the rail */}
          {NODES.map((node, i) => {
            const isPassed = currentActiveIndex >= i;
            const isCurrent = currentActiveIndex === i;
            const topPct = (i / (NODES.length - 1)) * 88 + 6;

            return (
              <Link
                key={node.id}
                to={node.path}
                className={`${styles.nodeItem} ${isPassed ? styles.nodePassed : ''} ${isCurrent ? styles.nodeCurrent : ''}`}
                style={{ top: `${topPct}%` }}
                aria-label={`Navigate to node ${node.num} ${node.label}`}
              >
                <span className={styles.nodeDot} />
                <span className={styles.nodeLabel}>{node.num}</span>
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}
