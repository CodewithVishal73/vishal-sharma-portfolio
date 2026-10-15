import { useState, useEffect, useRef } from 'react';
import { skillsHeader, skillGroups } from '../../data/skills';
import { SkillGroup } from './SkillGroup';
import { SkillsErrorBoundary } from './SkillsErrorBoundary';
import useReducedMotion from '../../hooks/useReducedMotion';
import styles from './Skills.module.css';

/**
 * Skills Section: The Stack
 * Visual technology cards organized into 4 core software engineering groups.
 * No arbitrary percentages, proficiency levels, progress bars, or tooltips.
 */
export function Skills() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [isHeaderRevealed, setIsHeaderRevealed] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const element = sectionRef.current;
    if (!element) return;

    let revealed = false;
    const failsafe = setTimeout(() => {
      if (!revealed) {
        revealed = true;
        setIsHeaderRevealed(true);
      }
    }, 2000);

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting && !revealed) {
            revealed = true;
            setIsHeaderRevealed(true);
            observer.disconnect();
            clearTimeout(failsafe);
          }
        },
        { threshold: 0.08 }
      );

      observer.observe(element);
      return () => {
        observer.disconnect();
        clearTimeout(failsafe);
      };
    } else {
      setIsHeaderRevealed(true);
      clearTimeout(failsafe);
    }
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      data-tone="mid"
      className={styles.skillsSection}
      aria-label="Technical Skills and Technology Stack"
    >
      <div className={styles.innerContainer}>
        {/* Editorial Section Header */}
        <header
          className={`${styles.sectionHeader} ${
            isHeaderRevealed ? styles.headerRevealed : styles.headerHidden
          }`}
        >
          <div className={styles.sectionEyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span>{skillsHeader.eyebrow}</span>
          </div>

          <h2 className={styles.sectionTitle}>
            {skillsHeader.title}
          </h2>

          <p className={styles.sectionSubtitle}>
            {skillsHeader.subtitle}
          </p>
        </header>

        {/* 4 Skill Groups with Fine-Line Technical Connectors */}
        <SkillsErrorBoundary>
          <div className={styles.groupsContainer}>
            {skillGroups.map((group, index) => (
              <div key={group.id} className={styles.groupWrapper}>
                {index > 0 && (
                  <div className={styles.groupSeparator} aria-hidden="true">
                    <span className={styles.separatorLine} />
                    <span className={styles.separatorDot} />
                    <span className={styles.separatorLine} />
                  </div>
                )}
                <SkillGroup group={group} />
              </div>
            ))}
          </div>
        </SkillsErrorBoundary>
      </div>
    </section>
  );
}

export default Skills;
