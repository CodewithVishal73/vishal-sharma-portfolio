import { useRef, useState, useEffect } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';
import styles from './ProjectCard.module.css';

/**
 * ProjectCard: Signature arch-topped card with interactive warm pointer light.
 * Represents projects with honest metadata, tech stack badges, and verified links.
 */
export function ProjectCard({ project, index = 0 }) {
  const cardRef = useRef(null);
  const [pointerPos, setPointerPos] = useState({ x: 50, y: 30, opacity: 0 });
  const prefersReducedMotion = useReducedMotion();
  const isDev = import.meta.env.DEV;

  // Handle fine-pointer light following
  useEffect(() => {
    if (prefersReducedMotion) return;

    const el = cardRef.current;
    if (!el) return;

    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    const handlePointerMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setPointerPos({ x, y, opacity: 1 });
    };

    const handlePointerLeave = () => {
      setPointerPos((prev) => ({ ...prev, opacity: 0 }));
    };

    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [prefersReducedMotion]);

  const hasGithub = Boolean(project.github);
  const hasLive = Boolean(project.live);

  return (
    <article
      ref={cardRef}
      id={`project-${project.id}`}
      className={styles.card}
      style={{
        '--card-stagger': `${index * 60}ms`,
        '--pointer-x': `${pointerPos.x}%`,
        '--pointer-y': `${pointerPos.y}%`,
        '--light-opacity': pointerPos.opacity,
      }}
    >
      {/* Arch-topped Light Shell */}
      <div className={styles.archFrame}>
        {/* Pointer-following warm light */}
        <div className={styles.pointerLight} aria-hidden="true" />

        {/* Tile / Preview Area */}
        <div className={styles.tileArea}>
          {project.screenshot ? (
            <img
              src={project.screenshot}
              alt={`Screenshot preview of ${project.name}`}
              className={styles.tileImage}
              loading="lazy"
            />
          ) : (
            <div className={styles.gradientTile} aria-hidden="true">
              <span className={styles.tileInitial}>
                {project.name ? project.name.charAt(0) : 'P'}
              </span>
            </div>
          )}

          {/* Development Placeholder indicator per Owner Fact rules */}
          {isDev && project.placeholder && (
            <span className={styles.placeholderTag}>PLACEHOLDER</span>
          )}
        </div>

        {/* Content Body */}
        <div className={styles.cardBody}>
          <h3 className={styles.projectTitle}>{project.name}</h3>

          <p className={styles.projectDescription}>{project.description}</p>

          {/* Tech Stack Outlined Pills */}
          <div
            className={styles.stackBadges}
            role="list"
            aria-label={`Tech stack for ${project.name}`}
          >
            {(project.stack || []).map((tech) => (
              <span key={tech} className={styles.techPill} role="listitem">
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links (Hide button only when URL is empty) */}
          {(hasGithub || hasLive) && (
            <div className={styles.actionsRow}>
              {hasGithub && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionButton}
                  aria-label={`View ${project.name} source code on GitHub`}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  <span>Source Code</span>
                </a>
              )}

              {hasLive && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
                  aria-label={`Open live demonstration of ${project.name}`}
                >
                  <span>Live Demo</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
