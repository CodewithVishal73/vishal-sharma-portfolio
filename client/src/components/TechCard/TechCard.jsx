import React, { forwardRef, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TechIcon } from './iconMap.jsx';
import styles from './TechCard.module.css';

const TechCard = forwardRef(function TechCard(
  {
    skill,
    delay = 0,
    isHovered = false,
    isRelated = false,
    isDimmed = false,
    onHover,
    onLeave,
    onClick,
  },
  forwardedRef
) {
  const cardRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Combine forwarded ref and internal ref
  const handleRef = (el) => {
    cardRef.current = el;
    if (typeof forwardedRef === 'function') {
      forwardedRef(el);
    } else if (forwardedRef) {
      forwardedRef.current = el;
    }
  };

  // Evidence ratio: 0.35 for working knowledge, up to 1.0 for multi-project usage
  const evidenceRatio =
    skill.projectCount > 0 ? Math.min(1, 0.45 + skill.projectCount * 0.18) : 0.35;

  const cardClasses = [
    styles.card,
    isHovered ? styles.active : '',
    isRelated ? styles.related : '',
    isDimmed ? styles.dimmed : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleMouseEnter = () => {
    if (onHover) onHover(skill);
  };

  const handleMouseLeave = () => {
    if (onLeave) onLeave(skill);
  };

  const handleFocus = () => {
    if (onHover) onHover(skill);
  };

  const handleBlur = () => {
    if (onLeave) onLeave(skill);
  };

  const handleClick = () => {
    if (onClick) {
      onClick(skill);
    } else if (onHover) {
      onHover(skill);
    }
  };

  return (
    <div
      ref={handleRef}
      tabIndex={0}
      role="button"
      aria-label={`${skill.name} - ${
        skill.evidenceType === 'project'
          ? `Used in ${skill.usedIn.join(', ')}`
          : 'Working knowledge'
      }`}
      className={cardClasses}
      style={{ '--brand-color': skill.brandColor }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Port indicator on left edge (lights up on relation / hover) */}
      <span
        className={`${styles.port} ${isHovered || isRelated ? styles.portActive : ''}`}
        aria-hidden="true"
      />

      {/* Card Header with Authentic Mark and Name */}
      <div className={styles.cardHeader}>
        <div
          className={`${styles.iconWrapper} ${isHovered || isRelated ? styles.iconActive : ''}`}
        >
          <TechIcon id={skill.id} size={28} />
        </div>
        <div className={styles.nameWrapper}>
          <span className={styles.name}>{skill.name}</span>
          {skill.sub && <span className={styles.subLabel}>{skill.sub}</span>}
        </div>
      </div>

      {/* Evidence Tag: Used in <projects> OR Working knowledge (No scores, no percentages) */}
      <div className={styles.evidenceRow}>
        {skill.evidenceType === 'project' ? (
          <span className={styles.usedInBadge}>
            Used in: <strong>{skill.usedIn.join(', ')}</strong>
          </span>
        ) : (
          <span className={styles.knowledgeBadge}>Working knowledge</span>
        )}
      </div>

      {/* Animated Evidence Breadth Meter Bar (Visual progression without numbers) */}
      <div
        role="meter"
        aria-label={`${skill.name} application breadth`}
        aria-valuenow={evidenceRatio}
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuetext={
          skill.evidenceType === 'project'
            ? `Demonstrated across ${skill.usedIn.length} project(s)`
            : 'Working knowledge'
        }
        className={styles.meterTrack}
      >
        <motion.div
          className={styles.meterBar}
          initial={{ scaleX: shouldReduceMotion ? evidenceRatio : 0 }}
          whileInView={{ scaleX: evidenceRatio }}
          viewport={{ once: true }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.65,
            ease: [0.2, 0.8, 0.2, 1],
            delay: shouldReduceMotion ? 0 : delay,
          }}
        />
      </div>
    </div>
  );
});

export default TechCard;
