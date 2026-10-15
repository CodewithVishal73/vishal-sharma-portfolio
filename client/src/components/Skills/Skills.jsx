import { useState, useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';
import { skills } from '../../data/skills';
import { SkillGroup } from './SkillGroup';
import { SkillsStack3D } from './SkillsStack3D';
import { SkillsErrorBoundary } from './SkillsErrorBoundary';
import useReducedMotion from '../../hooks/useReducedMotion';
import styles from './Skills.module.css';

export function Skills() {
  const sectionRef = useRef(null);
  const [activeLayerId, setActiveLayerId] = useState(
    skills.layers[0]?.id || 'languages-foundations'
  );
  const [isSectionRevealed, setIsSectionRevealed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Scroll tracking across the whole skills section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  // Entrance reveal with 2-second failsafe
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsSectionRevealed(true);
      return;
    }

    const element = sectionRef.current;
    if (!element) return;

    let revealed = false;
    const failsafe = setTimeout(() => {
      if (!revealed) {
        revealed = true;
        setIsSectionRevealed(true);
      }
    }, 2000);

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting && !revealed) {
            revealed = true;
            setIsSectionRevealed(true);
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
      setIsSectionRevealed(true);
      clearTimeout(failsafe);
    }
  }, [prefersReducedMotion]);

  // Observer to track which skill group is currently in view
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const groupObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const layerId = entry.target.getAttribute('id');
            if (layerId) {
              setActiveLayerId(layerId);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0.1,
      }
    );

    skills.layers.forEach((layer) => {
      const el = document.getElementById(layer.id);
      if (el) groupObserver.observe(el);
    });

    return () => groupObserver.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      data-tone="mid"
      className={styles.skillsSection}
      aria-label="Technical Skills and Architectural Layers"
    >
      <div className={styles.innerContainer}>
        {/* Section Header */}
        <header
          className={`${styles.sectionHeader} ${styles.revealElement} ${
            isSectionRevealed ? styles.revealed : ''
          }`}
        >
          <div className={styles.sectionEyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span>02 / Architecture & Skills</span>
          </div>

          <h2 className={styles.sectionTitle}>
            The Spatial Layer Stack
          </h2>

          <p className={styles.sectionSubtitle}>
            A full-stack software system is not a flat list of keywords. It is a spatial hierarchy
            of foundational runtimes, resilient server services, and responsive client interfaces.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className={styles.layoutGrid}>
          {/* Left Column: 3D Stack Visualization (Sticky Desktop / Inline Mobile) */}
          <div className={styles.stackColumn}>
            <SkillsErrorBoundary>
              <SkillsStack3D
                scrollProgress={scrollYProgress}
                activeLayer={activeLayerId}
              />
            </SkillsErrorBoundary>
          </div>

          {/* Right Column: Accessible HTML Skill Groups */}
          <div className={styles.contentColumn}>
            {skills.layers.map((layer) => (
              <SkillGroup
                key={layer.id}
                layer={layer}
                isActive={activeLayerId === layer.id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
