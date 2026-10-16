import React from 'react';
import { motion } from 'framer-motion';
import Port from '../primitives/Port.jsx';
import styles from './SectionShell.module.css';

export default function SectionShell({
  id,
  nodeNumber,
  nodeLabel,
  title,
  subtitle,
  children,
  className = '',
}) {
  return (
    <section id={id} className={`${styles.section} ${className}`} aria-labelledby={`${id}-title`}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.42, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className={styles.nodeMeta}>
          <Port active className={styles.metaPort} />
          <span className={styles.nodeTag}>
            {nodeNumber} / {nodeLabel}
          </span>
        </div>

        {title && (
          <h2 id={`${id}-title`} className={styles.title}>
            {title}
          </h2>
        )}

        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </motion.div>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.42, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
