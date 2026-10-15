import { useState, useEffect, useRef } from 'react';
import { SkillCard } from './SkillCard';
import useReducedMotion from '../../hooks/useReducedMotion';
import styles from './SkillGroup.module.css';

/**
 * SkillGroup: Renders a semantic category of technology cards with staggered reveal.
 */
export function SkillGroup({ group }) {
  const groupRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [isRevealed, setIsRevealed] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const element = groupRef.current;
    if (!element) return;

    let revealed = false;
    // Failsafe: guarantee visibility even if IntersectionObserver fails or stalls
    const failsafe = setTimeout(() => {
      if (!revealed) {
        revealed = true;
        setIsRevealed(true);
      }
    }, 2000);

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting && !revealed) {
            revealed = true;
            setIsRevealed(true);
            observer.disconnect();
            clearTimeout(failsafe);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(element);
      return () => {
        observer.disconnect();
        clearTimeout(failsafe);
      };
    } else {
      setIsRevealed(true);
      clearTimeout(failsafe);
    }
  }, [prefersReducedMotion]);

  const headingId = `group-heading-${group.id}`;

  return (
    <section
      ref={groupRef}
      id={group.id}
      aria-labelledby={headingId}
      className={`${styles.groupContainer} ${
        isRevealed ? styles.groupRevealed : styles.groupHidden
      }`}
    >
      <header className={styles.groupHeader}>
        <div className={styles.tagRow}>
          <span className={styles.groupNumber}>{group.number}</span>
          <div className={styles.tagDivider} aria-hidden="true" />
          <span className={styles.categoryName}>{group.category}</span>
        </div>

        <h3 id={headingId} className={styles.groupTitle}>
          {group.title}
        </h3>

        {group.description && (
          <p className={styles.groupDescription}>{group.description}</p>
        )}
      </header>

      <ul className={styles.cardsGrid} role="list" aria-label={`${group.title} technologies`}>
        {(group.skills || []).map((skill, index) => (
          <li
            key={skill.id}
            className={styles.cardItem}
            style={{ '--item-stagger': `${index * 40}ms` }}
          >
            <SkillCard
              id={skill.id}
              name={skill.name}
              iconId={skill.iconId}
              context={skill.context}
              index={index}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SkillGroup;
