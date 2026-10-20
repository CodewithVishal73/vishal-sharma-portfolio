import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiArrowRight,
  FiGithub,
  FiExternalLink,
  FiLayers,
  FiCode,
  FiAlertCircle,
  FiLock,
  FiClock,
} from 'react-icons/fi';
import Button from '../components/primitives/Button.jsx';
import ArchitectureMini from '../components/ArchitectureMini/ArchitectureMini.jsx';
import ProjectTechBadge from '../components/ProjectTechBadge/ProjectTechBadge.jsx';
import NotFound from './NotFound.jsx';
import { getProjectBySlug, getAdjacentProjects } from '../data/projects.js';
import styles from './ProjectDetail.module.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug);

  const handleTechClick = (tech) => {
    navigate(`/projects?tag=${encodeURIComponent(tech)}`);
  };

  // If slug is unconfirmed or unknown, render NotFound
  if (!project) {
    return <NotFound />;
  }

  const { prev, next } = getAdjacentProjects(slug);

  const statusLabel =
    project.status === 'concept' || project.stage === 'Concept'
      ? 'Concept'
      : project.status === 'working'
      ? 'Working'
      : project.stage && project.stage.toLowerCase() !== 'in progress'
      ? project.stage
      : null;

  return (
    <motion.div
      className={styles.pageContainer}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* Back navigation */}
      <div>
        <Link to="/projects" className={styles.backLink}>
          <Button variant="ghost" size="sm">
            <FiArrowLeft aria-hidden="true" />
            <span>Back to All Projects</span>
          </Button>
        </Link>
      </div>

      {/* Header Card */}
      <section className={styles.headerCard} aria-labelledby="project-hero-title">
        <span className={styles.port} aria-hidden="true" />

        <div className={styles.metaRow}>
          <span className={styles.category}>{project.category}</span>
          <div className={styles.metaRight}>
            {project.internshipChip && (
              <span className={styles.stageBadge} style={{ color: 'var(--signal)', borderColor: 'var(--signal)' }}>
                {project.internshipChip}
              </span>
            )}
            {project.year && <span className={styles.yearBadge}>{project.year}</span>}
            {statusLabel && <span className={styles.stageBadge}>{statusLabel}</span>}
          </div>
        </div>

        <div className={styles.titleArea}>
          <h1 id="project-hero-title" className={styles.projectName}>
            {project.name}
          </h1>
          {project.subtitle && (
            <span className={styles.projectSubtitle}>{project.subtitle}</span>
          )}
        </div>

        <p className={styles.summaryText}>{project.summary}</p>
      </section>

      {/* Problem & What I Built / Planned Grid */}
      <div className={styles.gridTwoCol}>
        {/* The Problem */}
        <section className={styles.sectionCard} aria-labelledby="section-problem-title">
          <header className={styles.sectionHeader}>
            <FiAlertCircle size={16} color="var(--signal)" aria-hidden="true" />
            <h2 id="section-problem-title" className={styles.sectionTitle}>
              The Problem
            </h2>
          </header>
          <p className={styles.problemText}>{project.problem}</p>
        </section>

        {/* What I Built (if present) */}
        {project.built && project.built.length > 0 && (
          <section className={styles.sectionCard} aria-labelledby="section-built-title">
            <header className={styles.sectionHeader}>
              <FiCode size={16} color="var(--signal)" aria-hidden="true" />
              <h2 id="section-built-title" className={styles.sectionTitle}>
                Implemented Capabilities
              </h2>
            </header>
            <ul className={styles.bulletList}>
              {project.built.map((bullet, idx) => (
                <li key={idx} className={styles.bulletItem}>
                  <span className={styles.bulletMarker}>0{idx + 1} //</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Planned Direction & Integrations (Visually separated for concept stage) */}
        {project.planned && project.planned.length > 0 && (
          <section className={styles.sectionCard} aria-labelledby="section-planned-title">
            <header className={styles.sectionHeader}>
              <FiLayers size={16} color="var(--signal)" aria-hidden="true" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h2 id="section-planned-title" className={styles.sectionTitle}>
                  Planned Direction
                </h2>
                <span className={styles.plannedChip}>Not Shipped</span>
              </div>
            </header>
            <ul className={styles.bulletList}>
              {project.planned.map((bullet, idx) => (
                <li key={idx} className={styles.bulletItem}>
                  <span className={styles.bulletMarker} style={{ color: 'var(--ink-2)' }}>P0{idx + 1} //</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Architecture Deep Dive */}
      <section className={styles.archCard} aria-labelledby="section-arch-title">
        <header className={styles.sectionHeader}>
          <FiLayers size={16} color="var(--signal)" aria-hidden="true" />
          <h2 id="section-arch-title" className={styles.sectionTitle}>
            System Topology & Data Flow
          </h2>
        </header>

        {/* Scalable SVG visualization */}
        <ArchitectureMini architecture={project.architecture} />

        {/* 3-layer structural breakdown cards */}
        <div className={styles.layerCardsGrid}>
          {project.architecture.nodes.map((node) => (
            <div key={node.id} className={styles.layerCard}>
              <span className={styles.layerTag}>{node.layer}</span>
              <h3 className={styles.layerName}>{node.label}</h3>
              <p className={styles.layerDetail}>{node.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section className={styles.stackCard} aria-labelledby="section-stack-title">
        <header className={styles.sectionHeader}>
          <h2 id="section-stack-title" className={styles.sectionTitle}>
            Verified Technology Stack
          </h2>
        </header>
        <div className={styles.stackBadgesRow}>
          {project.stack.map((tech) => (
            <ProjectTechBadge
              key={tech}
              tech={tech}
              size={16}
              onClick={handleTechClick}
            />
          ))}
        </div>
      </section>

      {/* Actions and External Links */}
      <section className={styles.actionsCard} aria-label="Project actions and source code links">
        <div className={styles.actionsGroup}>
          {project.github ? (
            <Button
              variant="secondary"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} GitHub repository`}
            >
              <FiGithub aria-hidden="true" />
              <span>GitHub Repository</span>
            </Button>
          ) : (
            <span className={styles.honestBadge} title="Source repository is private / not publicly hosted">
              <FiLock aria-hidden="true" className={styles.honestIcon} />
              <span>Repository private</span>
            </span>
          )}

          {project.live ? (
            <Button
              variant="primary"
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} live deployment`}
            >
              <FiExternalLink aria-hidden="true" />
              <span>Live Demonstration</span>
            </Button>
          ) : (
            <span className={styles.honestBadge} title="No public live demonstration is deployed yet">
              <FiClock aria-hidden="true" className={styles.honestIcon} />
              <span>No public demo yet</span>
            </span>
          )}
        </div>
      </section>

      {/* Previous / Next Project Navigation */}
      <nav className={styles.navRow} aria-label="Adjacent project navigation">
        {prev && (
          <Link to={`/projects/${prev.slug}`} className={styles.navCard}>
            <span className={styles.navDirection}>
              <FiArrowLeft aria-hidden="true" />
              <span>Previous Project</span>
            </span>
            <h4 className={styles.navProjectTitle}>{prev.name}</h4>
            <p className={styles.navProjectSummary}>{prev.summary}</p>
          </Link>
        )}

        {next && (
          <Link
            to={`/projects/${next.slug}`}
            className={styles.navCard}
            style={{ textAlign: 'right' }}
          >
            <span className={styles.navDirection} style={{ justifyContent: 'flex-end' }}>
              <span>Next Project</span>
              <FiArrowRight aria-hidden="true" />
            </span>
            <h4 className={styles.navProjectTitle}>{next.name}</h4>
            <p className={styles.navProjectSummary}>{next.summary}</p>
          </Link>
        )}
      </nav>
    </motion.div>
  );
}
