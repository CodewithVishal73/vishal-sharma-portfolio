import React, { forwardRef, useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TechIcon } from './iconMap.jsx';
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
    onClick,
    children, // for tooltip rendering
  },
  ref
) {
  const shouldReduceMotion = useReducedMotion();
  const meterId = useId();

  const levelInfo = LEVEL_MAP[skill.level] || LEVEL_MAP.working;
  const levelValue = levelInfo.value;

  const cardClasses = [
    styles.card,
    isRelated ? styles.related : '',
    isDimmed ? styles.dimmed : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleMouseEnter = () => {
    if (onHover) onHover(skill.id);
  };

  const handleMouseLeave = () => {
    if (onLeave) onLeave(skill.id);
  };

  const handleFocus = () => {
    if (onHover) onHover(skill.id);
  };

  const handleBlur = () => {
    if (onLeave) onLeave(skill.id);
  };

  return (
    <div
      ref={ref}
      tabIndex={0}
      role="group"
      aria-label={`${skill.name} - ${levelInfo.label}`}
      className={cardClasses}
      style={{ '--brand-color': skill.brandColor }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={onClick}
    >
      {/* Port indicator on left edge */}
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
        id={meterId}
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

      {/* Tooltip or relations slot */}
      {children}
    </div>
  );
});

export default TechCard;
