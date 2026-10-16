import React from 'react';
import Port from '../primitives/Port.jsx';
import styles from './SkillPanel.module.css';

export default function SkillPanel({
  title,
  nodeLabel,
  description,
  children,
  className = '',
}) {
  return (
    <article className={`${styles.panel} ${className}`}>
      <header className={styles.header}>
        <div className={styles.headerInfo}>
          {nodeLabel && <span className={styles.nodeLabel}>{nodeLabel}</span>}
          <h3 className={styles.title}>{title}</h3>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        <Port active />
      </header>

      <div className={styles.content}>{children}</div>
    </article>
  );
}

export function SkillSubSection({ heading, children }) {
  return (
    <div className={styles.subSection}>
      <h4 className={styles.subHeading}>
        <span className={styles.subLine} aria-hidden="true" />
        <span>{heading}</span>
      </h4>
      <div className={styles.cardsGrid}>{children}</div>
    </div>
  );
}
