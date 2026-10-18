import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiExternalLink, FiArrowRight, FiLock, FiClock } from 'react-icons/fi';
import Button from '../primitives/Button.jsx';
import ArchitectureMini from '../ArchitectureMini/ArchitectureMini.jsx';
import ProjectTechBadge from '../ProjectTechBadge/ProjectTechBadge.jsx';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project, onSelectTag, className = '' }) {
  const cardRef = useRef(null);

  // Pointer-tracking glow driven directly through CSS variables (no React state updates)
  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const statusLabel =
    project.status === 'in-progress'
      ? null
      : project.status === 'working'
      ? 'Working'
      : project.status === 'concept'
      ? 'Concept'
      : project.stage && project.stage.toLowerCase() !== 'in progress'
      ? project.stage
      : null;

  return (
    <article
      ref={cardRef}
      className={`${styles.card} ${className}`}
      onPointerMove={handlePointerMove}
      tabIndex={0}
      aria-labelledby={`project-title-${project.slug}`}
    >
      {/* Port indicator on left edge (spine motif) */}
      <span className={styles.port} aria-hidden="true" />

      {/* Header with Project Name & Stage */}
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h3 id={`project-title-${project.slug}`} className={styles.name}>
            {project.name}
          </h3>
          {project.subtitle && (
            <span className={styles.subtitle}>{project.subtitle}</span>
          )}
        </div>
        <div className={styles.stageBadgesGroup}>
          {project.internshipChip && (
            <span className={styles.internshipChip}>{project.internshipChip}</span>
          )}
          {statusLabel && <span className={styles.stageBadge}>{statusLabel}</span>}
        </div>
      </header>

      {/* One-sentence summary */}
      <p className={styles.summary}>{project.summary}</p>

      {/* Custom SVG ArchitectureMini Diagram */}
      <ArchitectureMini architecture={project.architecture} />

      {/* Technology Stack Badges with recognizable icons */}
      <div className={styles.stackSection}>
        <span className={styles.stackLabel}>Verified Stack</span>
        <div className={styles.stackRow}>
          {project.stack.map((tech) => (
            <ProjectTechBadge
              key={tech}
              tech={tech}
              onClick={onSelectTag ? () => onSelectTag(tech) : undefined}
            />
          ))}
        </div>
      </div>

      {/* Project Tags */}
      <div className={styles.tagsRow}>
        {project.tags.map((tag) => (
          onSelectTag ? (
            <button
              key={tag}
              type="button"
              className={styles.tagBtn}
              onClick={() => onSelectTag(tag)}
              title={`Filter projects by #${tag}`}
            >
              #{tag}
            </button>
          ) : (
            <span key={tag} className={styles.tag}>
              #{tag}
            </span>
          )
        ))}
      </div>

      {/* Actions footer */}
      <footer className={styles.actions}>
        <div className={styles.linkGroup}>
          {project.github ? (
            <Button
              variant="secondary"
              size="sm"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} GitHub repository`}
            >
              <FiGithub aria-hidden="true" />
              <span>Repository</span>
            </Button>
          ) : (
            <span className={styles.honestBadge} title="Repository is private / not publicly hosted">
              <FiLock aria-hidden="true" className={styles.honestIcon} />
              <span>Repository private</span>
            </span>
          )}

          {project.live ? (
            <Button
              variant="secondary"
              size="sm"
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} live deployment`}
            >
              <FiExternalLink aria-hidden="true" />
              <span>Live demo</span>
            </Button>
          ) : (
            <span className={styles.honestBadge} title="No public demo is currently deployed">
              <FiClock aria-hidden="true" className={styles.honestIcon} />
              <span>No public demo yet</span>
            </span>
          )}
        </div>

        {/* Working navigation action to open project detail page */}
        <Link
          to={`/projects/${project.slug}`}
          className={styles.viewDetailsBtn}
          tabIndex={-1}
        >
          <Button variant="primary" size="sm">
            <span>Architecture & Details</span>
            <FiArrowRight aria-hidden="true" />
          </Button>
        </Link>
      </footer>
    </article>
  );
}
