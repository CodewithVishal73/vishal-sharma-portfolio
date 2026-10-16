import React, { useEffect, useState, useRef } from 'react';
import { LEVEL_MAP } from '../../data/skills.js';
import styles from './TechTooltip.module.css';

export default function TechTooltip({
  id,
  skill,
  cardElement,
  onDismiss,
}) {
  const [placement, setPlacement] = useState({
    vertical: 'top',
    horizontal: 'center',
  });
  const tooltipRef = useRef(null);

  const levelInfo = LEVEL_MAP[skill.level] || LEVEL_MAP.working;

  // Anti-clipping positioning calculation
  useEffect(() => {
    if (!cardElement) return;

    const checkBounds = () => {
      const rect = cardElement.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      // Vertical clearance: if card is near the top of viewport, flip to bottom
      const vertical = rect.top < 130 ? 'bottom' : 'top';

      // Horizontal clearance
      let horizontal = 'center';
      if (rect.left < 140) {
        horizontal = 'left';
      } else if (viewportWidth - rect.right < 140) {
        horizontal = 'right';
      }

      setPlacement({ vertical, horizontal });
    };

    checkBounds();
    window.addEventListener('resize', checkBounds, { passive: true });
    window.addEventListener('scroll', checkBounds, { passive: true });
    return () => {
      window.removeEventListener('resize', checkBounds);
      window.removeEventListener('scroll', checkBounds);
    };
  }, [cardElement]);

  // Esc key listener to dismiss
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (onDismiss) onDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onDismiss]);

  const classes = [
    styles.tooltip,
    placement.vertical === 'bottom' ? styles.posBottom : styles.posTop,
    placement.horizontal === 'left' ? styles.alignLeft : '',
    placement.horizontal === 'right' ? styles.alignRight : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={tooltipRef}
      id={id}
      role="tooltip"
      className={classes}
      aria-hidden="false"
    >
      <div className={styles.tooltipHeader}>
        <span className={styles.levelBadge}>
          <span className={styles.levelDot} aria-hidden="true" />
          {levelInfo.label}
        </span>
        <span className={styles.escHint}>esc to dismiss</span>
      </div>

      <p className={styles.evidence}>{skill.evidence}</p>

      {skill.relations && skill.relations.length > 0 && (
        <div className={styles.relatedRow}>
          <span className={styles.relatedLabel}>Related:</span>
          {skill.relations.map((relId) => (
            <span key={relId} className={styles.relatedTag}>
              {relId}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
