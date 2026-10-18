import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionShell from '../../components/SectionShell/SectionShell.jsx';
import Port from '../../components/primitives/Port.jsx';
import { getSectionById } from '../../data/sections.js';
import styles from './Intelligence.module.css';

export default function Intelligence() {
  const shouldReduceMotion = useReducedMotion();
  const sectionMeta = getSectionById('intelligence');

  return (
    <SectionShell
      id="intelligence"
      nodeNumber={sectionMeta.num}
      nodeLabel={sectionMeta.nodeLabel}
      title="Intelligent Systems Integration"
      subtitle="I am interested in building software architectures where intelligent capabilities solve real user problems through clear system boundaries."
    >
      <div className={styles.container}>
        {/* The 3-stage visual pipeline: Application -> Intelligence -> Useful Output */}
        <div className={styles.pipeline} role="region" aria-label="Conceptual intelligence pipeline">
          {/* 1. Left: Application Window with irregular/unstructured input lines */}
          <motion.div
            className={styles.stageCard}
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>APPLICATION</span>
              <Port active className={styles.headerPort} />
            </div>

            <div className={styles.windowGlyph} aria-hidden="true">
              <div className={styles.windowBar}>
                <span className={styles.windowDot} />
                <span className={styles.windowDot} />
                <span className={styles.windowDot} />
              </div>
              <div className={styles.unstructuredBody}>
                <span className={`${styles.rawLine} ${styles.line1}`} />
                <span className={`${styles.rawLine} ${styles.line2}`} />
                <span className={`${styles.rawLine} ${styles.line3}`} />
                <span className={`${styles.rawLine} ${styles.line4}`} />
              </div>
            </div>

            <p className={styles.stageDesc}>Raw data, search inputs, and domain queries</p>
          </motion.div>

          {/* Connector 1 */}
          <div className={styles.connector} aria-hidden="true">
            <svg className={styles.arrowSvg} viewBox="0 0 60 20" preserveAspectRatio="none">
              <line x1="0" y1="10" x2="52" y2="10" className={styles.arrowLine} />
              <polygon points="50,6 58,10 50,14" className={styles.arrowHead} />
            </svg>
            {!shouldReduceMotion && (
              <motion.div
                className={styles.pulseDot}
                initial={{ left: '0%', opacity: 0 }}
                whileInView={{ left: '100%', opacity: [0, 1, 1, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: 0.2, ease: 'easeInOut' }}
              />
            )}
          </div>

          {/* 2. Centre: Intelligence layer (mint node cluster) */}
          <motion.div
            className={`${styles.stageCard} ${styles.centerCard}`}
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>INTELLIGENCE LAYER</span>
              <Port active className={styles.headerPort} />
            </div>

            {/* 6-node interconnected cluster mark */}
            <div className={styles.clusterWrapper} aria-hidden="true">
              <svg className={styles.clusterSvg} viewBox="0 0 160 90">
                {/* Connecting lines */}
                <line x1="30" y1="45" x2="65" y2="25" className={styles.clusterLink} />
                <line x1="30" y1="45" x2="65" y2="65" className={styles.clusterLink} />
                <line x1="65" y1="25" x2="100" y2="35" className={styles.clusterLink} />
                <line x1="65" y1="65" x2="100" y2="55" className={styles.clusterLink} />
                <line x1="65" y1="25" x2="65" y2="65" className={styles.clusterLink} />
                <line x1="100" y1="35" x2="100" y2="55" className={styles.clusterLink} />
                <line x1="100" y1="35" x2="135" y2="45" className={styles.clusterLink} />
                <line x1="100" y1="55" x2="135" y2="45" className={styles.clusterLink} />

                {/* Nodes */}
                <circle cx="30" cy="45" r="4.5" className={styles.clusterNode} />
                <circle cx="65" cy="25" r="4" className={styles.clusterNode} />
                <circle cx="65" cy="65" r="4" className={styles.clusterNode} />
                <circle cx="100" cy="35" r="5" className={`${styles.clusterNode} ${styles.primaryNode}`} />
                <circle cx="100" cy="55" r="4" className={styles.clusterNode} />
                <circle cx="135" cy="45" r="4.5" className={styles.clusterNode} />
              </svg>
            </div>

            <p className={styles.stageDesc}>Context framing, semantic analysis & parsing</p>
          </motion.div>

          {/* Connector 2 */}
          <div className={styles.connector} aria-hidden="true">
            <svg className={styles.arrowSvg} viewBox="0 0 60 20" preserveAspectRatio="none">
              <line x1="0" y1="10" x2="52" y2="10" className={styles.arrowLine} />
              <polygon points="50,6 58,10 50,14" className={styles.arrowHead} />
            </svg>
            {!shouldReduceMotion && (
              <motion.div
                className={styles.pulseDot}
                initial={{ left: '0%', opacity: 0 }}
                whileInView={{ left: '100%', opacity: [0, 1, 1, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: 0.6, ease: 'easeInOut' }}
              />
            )}
          </div>

          {/* 3. Right: Useful output (neat structured rows) */}
          <motion.div
            className={styles.stageCard}
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>USEFUL OUTPUT</span>
              <Port active className={styles.headerPort} />
            </div>

            <div className={styles.outputRows} aria-hidden="true">
              <div className={styles.outputRow}>
                <span className={styles.checkDot}>✓</span>
                <span className={styles.rowText}>Categorized catalog keywords</span>
              </div>
              <div className={styles.outputRow}>
                <span className={styles.checkDot}>✓</span>
                <span className={styles.rowText}>Actionable ranking insights</span>
              </div>
              <div className={styles.outputRow}>
                <span className={styles.checkDot}>✓</span>
                <span className={styles.rowText}>Validated payload response</span>
              </div>
            </div>

            <p className={styles.stageDesc}>Structured results integrated into workflows</p>
          </motion.div>
        </div>

        {/* Sole single disclaimer caption required by specification */}
        <p className={styles.caption}>Illustrative concept, not a live system.</p>
      </div>
    </SectionShell>
  );
}
