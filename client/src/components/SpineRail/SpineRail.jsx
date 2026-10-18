import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { SECTIONS } from '../../data/sections.js';
import styles from './SpineRail.module.css';

const NODES = SECTIONS.map((s) => ({ id: s.id, num: s.num, label: s.nodeLabel }));


export default function SpineRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const [activeNodeIndex, setActiveNodeIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = NODES.length - 1; i >= 0; i--) {
        const el = document.getElementById(NODES[i].id);
        if (el && scrollPos >= el.offsetTop) {
          setActiveNodeIndex(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

          {/* Active drawn signal line */}
          <motion.div
            className={styles.activeLine}
            style={{ scaleY, transformOrigin: 'top' }}
          />

          {/* Node markers along the rail */}
          {NODES.map((node, i) => {
            const isPassed = activeNodeIndex >= i;
            const topPct = (i / (NODES.length - 1)) * 88 + 6;

            return (
              <a
                key={node.id}
                href={`#${node.id}`}
                className={`${styles.nodeItem} ${isPassed ? styles.nodePassed : ''}`}
                style={{ top: `${topPct}%` }}
                aria-label={`Jump to node ${node.num} ${node.label}`}
              >
                <span className={styles.nodeDot} />
                <span className={styles.nodeLabel}>{node.num}</span>
              </a>
            );
          })}
        </div>
      </aside>
    </>
  );
}
