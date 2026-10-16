import React, { forwardRef, useRef, useState, useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TechIcon } from './iconMap.jsx';
import TechTooltip from './TechTooltip.jsx';
import { LEVEL_MAP } from '../../data/skills.js';
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
  },
  forwardedRef
) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const cardRef = useRef(null);
  const tooltipId = useId();
  const shouldReduceMotion = useReducedMotion();

  const levelInfo = LEVEL_MAP[skill.level] || LEVEL_MAP.working;
  const levelValue = levelInfo.value;

  // Combine forwarded ref and internal ref
  const handleRef = (el) => {
    cardRef.current = el;
    if (typeof forwardedRef === 'function') {
      forwardedRef(el);
    } else if (forwardedRef) {
      forwardedRef.current = el;
    }
  };

  const cardClasses = [
    styles.card,
    isRelated ? styles.related : '',
    isDimmed ? styles.dimmed : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleMouseEnter = () => {
    setIsTooltipOpen(true);
    if (onHover) onHover(skill.id);
  };

  const handleMouseLeave = () => {
    setIsTooltipOpen(false);
    if (onLeave) onLeave(skill.id);
  };

  const handleFocus = () => {
    setIsTooltipOpen(true);
    if (onHover) onHover(skill.id);
  };

  const handleBlur = () => {
    setIsTooltipOpen(false);
    if (onLeave) onLeave(skill.id);
  };

  const handleClick = () => {
    // Tap to toggle on mobile / touch
    setIsTooltipOpen((prev) => !prev);
    if (!isTooltipOpen && onHover) {
      onHover(skill.id);
    } else if (isTooltipOpen && onLeave) {
      onLeave(skill.id);
    }
  };

  const handleDismissTooltip = () => {
    setIsTooltipOpen(false);
    if (onLeave) onLeave(skill.id);
  };

  return (
    <div
      ref={handleRef}
      tabIndex={0}
      role="group"
      aria-label={`${skill.name} - ${levelInfo.label}`}
      aria-describedby={isTooltipOpen ? tooltipId : undefined}
      className={cardClasses}
      style={{ '--brand-color': skill.brandColor }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
    >
      {/* Port indicator on left edge (lights up on view/hover/relation) */}
      <span
        className={`${styles.port} ${isHovered || isRelated ? styles.portActive : ''}`}
        aria-hidden="true"
      />

      {/* Card Header with Icon and Name */}
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

      {/* Slim animated meter bar (scaleX, staggered, once, no percentage rendered) */}
      <div
        role="meter"
        aria-label={`${skill.name} proficiency level`}
        aria-valuenow={levelValue}
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuetext={levelInfo.label}
        className={styles.meterTrack}
      >
        <motion.div
          className={styles.meterBar}
          initial={{ scaleX: shouldReduceMotion ? levelValue : 0 }}
          whileInView={{ scaleX: levelValue }}
          viewport={{ once: true }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.7,
            ease: [0.2, 0.8, 0.2, 1],
            delay: shouldReduceMotion ? 0 : delay,
          }}
        />
      </div>

      {/* Accessible anti-clipping tooltip */}
      {isTooltipOpen && (
        <TechTooltip
          id={tooltipId}
          skill={skill}
          cardElement={cardRef.current}
          onDismiss={handleDismissTooltip}
        />
      )}
    </div>
  );
});

export default TechCard;
