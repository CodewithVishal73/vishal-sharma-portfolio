import { useState, useEffect, useRef, useId } from 'react';
import { TechIcon } from './TechIcon';
import useReducedMotion from '../../hooks/useReducedMotion';
import styles from './SkillBar.module.css';

export function SkillBar({
  id,
  name,
  percent = 50,
  level = 'Intermediate',
  iconId,
  description = '',
  confirmed = false,
}) {
  const tooltipId = useId();
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // IntersectionObserver to animate fill once
  useEffect(() => {
    if (prefersReducedMotion) return;

    const element = trackRef.current;
    if (!element) return;

    let hasTriggered = false;

    // 2-second failsafe to guarantee visibility
    const failsafeTimer = setTimeout(() => {
      if (!hasTriggered) {
        hasTriggered = true;
        setIsVisible(true);
      }
    }, 2000);

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting && !hasTriggered) {
            hasTriggered = true;
            setIsVisible(true);
            observer.disconnect();
            clearTimeout(failsafeTimer);
          }
        },
        { threshold: 0.15 }
      );

      observer.observe(element);
      return () => {
        observer.disconnect();
        clearTimeout(failsafeTimer);
      };
    } else {
      setIsVisible(true);
      clearTimeout(failsafeTimer);
    }
  }, [prefersReducedMotion]);

  const scaleValue = isVisible || prefersReducedMotion ? percent / 100 : 0;
  const accessibleName = `${name} proficiency: ${level} (${percent}%), ${confirmed ? 'confirmed' : 'self-assessed'}`;

  // Handle touch tap for mobile tooltip toggle
  const handleTouchToggle = (e) => {
    // Only toggle if clicked directly
    if (e.pointerType === 'touch') {
      setShowTooltip((prev) => !prev);
    }
  };

  return (
    <div
      className={styles.skillBarWrapper}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onPointerDown={handleTouchToggle}
    >
      <div className={styles.skillHeader}>
        <div className={styles.techIdentity}>
          <div className={styles.iconWrapper}>
            <TechIcon iconId={iconId || id} size={18} />
          </div>
          <span className={styles.skillName}>{name}</span>
        </div>

        <div className={styles.levelIndicator}>
          <span className={styles.levelLabel}>{level}</span>
          <span className={styles.percentLabel}>{percent}%</span>
        </div>
      </div>

      {/* Accessible progressbar track with keyboard support */}
      <div
        ref={trackRef}
        role="progressbar"
        tabIndex={0}
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={accessibleName}
        aria-describedby={tooltipId}
        className={styles.trackContainer}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
      >
        <div
          ref={barRef}
          className={styles.fillBar}
          style={{
            transform: `scaleX(${scaleValue})`,
            transition: prefersReducedMotion ? 'none' : undefined,
          }}
        />
      </div>

      {/* Floating tooltip accessible on hover & focus */}
      <div
        id={tooltipId}
        role="tooltip"
        className={`${styles.tooltip} ${showTooltip ? styles.tooltipVisible : ''}`}
        aria-hidden={!showTooltip}
      >
        <div className={styles.tooltipTitle}>
          <span>{name}</span>
          <span className={styles.tooltipBadge}>{level} ({percent}%)</span>
        </div>
        {description && <p className={styles.tooltipDesc}>{description}</p>}
        <div className={styles.tooltipArrow} aria-hidden="true" />
      </div>
    </div>
  );
}

export default SkillBar;
