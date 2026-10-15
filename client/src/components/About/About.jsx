import { useState, useEffect, useRef } from 'react';
import { profile } from '../../data/profile';
import { Portrait } from '../Portrait/Portrait';
import useReducedMotion from '../../hooks/useReducedMotion';
import styles from './About.module.css';

export function About() {
  const sectionRef = useRef(null);
  const portraitRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const [isSectionRevealed, setIsSectionRevealed] = useState(false);
  const [isPortraitRevealed, setIsPortraitRevealed] = useState(false);

  // Entrance animations with 2-second failsafe
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsSectionRevealed(true);
      setIsPortraitRevealed(true);
      return;
    }

    const sectionEl = sectionRef.current;
    const portraitEl = portraitRef.current;

    let hasRevealedSection = false;
    let hasRevealedPortrait = false;

    // 2-second failsafe: guarantee visibility even if observer fails
    const failsafe = setTimeout(() => {
      if (!hasRevealedSection) setIsSectionRevealed(true);
      if (!hasRevealedPortrait) setIsPortraitRevealed(true);
    }, 2000);

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target === sectionEl && entry.isIntersecting && !hasRevealedSection) {
              hasRevealedSection = true;
              setIsSectionRevealed(true);
            }
            if (entry.target === portraitEl && entry.isIntersecting && !hasRevealedPortrait) {
              hasRevealedPortrait = true;
              setIsPortraitRevealed(true);
            }
          });
        },
        { threshold: 0.15 }
      );

      if (sectionEl) observer.observe(sectionEl);
      if (portraitEl) observer.observe(portraitEl);

      return () => {
        observer.disconnect();
        clearTimeout(failsafe);
      };
    } else {
      setIsSectionRevealed(true);
      setIsPortraitRevealed(true);
      clearTimeout(failsafe);
    }
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      data-tone="deep"
      className={styles.aboutSection}
      aria-label="About Vishal Sharma"
    >
      <div className={styles.innerContainer}>
        <div className={styles.editorialGrid}>
          {/* Left Column: Asymmetric Narrative & Hairline Metadata */}
          <div
            className={`${styles.narrativeColumn} ${styles.revealItem} ${
              isSectionRevealed ? styles.revealItemRevealed : ''
            }`}
          >
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              <span>01 / Profile & Direction</span>
            </div>

            {/* Editorial Statement */}
            <blockquote className={styles.statement}>
              <span className={styles.statementQuote} aria-hidden="true">&ldquo;</span>
              {profile.statement}
              <span className={styles.statementQuote} aria-hidden="true">&rdquo;</span>
            </blockquote>

            {/* Professional Biography */}
            <p className={styles.biography}>
              {profile.bio}
            </p>

            {/* Hairline Definition List */}
            <dl className={styles.definitionList} aria-label="Personal Information">
              <div className={styles.definitionRow}>
                <dt className={styles.definitionTerm}>Location</dt>
                <dd className={styles.definitionValue}>{profile.location}</dd>
              </div>

              <div className={styles.definitionRow}>
                <dt className={styles.definitionTerm}>Status</dt>
                <dd className={styles.definitionValue}>{profile.status}</dd>
              </div>

              <div className={styles.definitionRow}>
                <dt className={styles.definitionTerm}>Graduation</dt>
                <dd className={styles.definitionValue}>{profile.graduation}</dd>
              </div>
            </dl>
          </div>

          {/* Right Column: Illuminated Doorway Portrait */}
          <div ref={portraitRef} className={styles.portraitColumn}>
            {/* Ambient light spill */}
            <div className={styles.ambientPortalLight} aria-hidden="true" />

            {/* Doorway Frame with Arch Top & Clip-Path Reveal */}
            <div className={styles.doorwayFrame}>
              <div className={styles.doorwayThreshold} aria-hidden="true" />

              <div
                className={`${styles.doorwayClipReveal} ${
                  isPortraitRevealed ? styles.doorwayRevealed : ''
                }`}
              >
                <Portrait
                  priority={false}
                  config={{
                    focalX: 52,
                    focalY: 36,
                    mobileFocalX: 50,
                    mobileFocalY: 32,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
