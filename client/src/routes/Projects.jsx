import { useState, useMemo, useEffect, useRef } from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard/ProjectCard';
import useReducedMotion from '../hooks/useReducedMotion';
import styles from './Projects.module.css';

/**
 * Projects Route: Selected Software Architectures & Applications
 * Features interactive filter chips, arch-topped cards with pointer-following light,
 * and column height staggering.
 */
export default function Projects() {
  const sectionRef = useRef(null);
  const [selectedTag, setSelectedTag] = useState('All');
  const prefersReducedMotion = useReducedMotion();

  const [isRevealed, setIsRevealed] = useState(
    prefersReducedMotion || typeof IntersectionObserver === 'undefined'
  );

  // Once-only entrance reveal with failsafe
  useEffect(() => {
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') return;

    const el = sectionRef.current;
    if (!el) return;

    let revealed = false;
    const failsafe = setTimeout(() => {
      if (!revealed) {
        revealed = true;
        setIsRevealed(true);
      }
    }, 2000);

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
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, [prefersReducedMotion]);

  // Extract unique technology tags across all projects
  const filterTags = useMemo(() => {
    const tags = new Set();
    projects.forEach((proj) => {
      (proj.stack || []).forEach((t) => tags.add(t));
    });
    return ['All', ...Array.from(tags).sort()];
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (selectedTag === 'All') return projects;
    return projects.filter((p) => (p.stack || []).includes(selectedTag));
  }, [selectedTag]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      data-tone="surface"
      className={styles.projectsSection}
      aria-labelledby="projects-heading"
    >
      <div className={styles.innerContainer}>
        {/* Editorial Section Header */}
        <header
          className={`${styles.pageHeader} ${
            isRevealed ? styles.revealed : styles.hidden
          }`}
        >
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span>03 / Works &amp; Architectures</span>
          </div>

          <h1 id="projects-heading" className={styles.title}>
            Projects
          </h1>

          <p className={styles.subtitle}>
            Selected software architectures, backend services, and interactive web
            applications engineered with depth and precision.
          </p>
        </header>

        {/* Filter Chips Bar */}
        <div
          className={`${styles.filterBar} ${
            isRevealed ? styles.revealed : styles.hidden
          }`}
        >
          <div
            className={styles.filterGroup}
            role="toolbar"
            aria-label="Filter projects by technology stack"
          >
            {filterTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`${styles.filterChip} ${
                  selectedTag === tag ? styles.filterChipActive : ''
                }`}
                onClick={() => setSelectedTag(tag)}
                aria-pressed={selectedTag === tag}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Screen Reader Result Announcement */}
          <div aria-live="polite" className={styles.resultAnnouncement}>
            Showing {filteredProjects.length}{' '}
            {filteredProjects.length === 1 ? 'project' : 'projects'}
            {selectedTag !== 'All' ? ` filtered by ${selectedTag}` : ''}.
          </div>
        </div>

        {/* Projects Grid */}
        <div
          className={`${styles.gridContainer} ${
            isRevealed ? styles.revealed : styles.hidden
          }`}
        >
          {filteredProjects.length > 0 ? (
            <div
              className={styles.projectsGrid}
              role="list"
              aria-label="Projects list"
            >
              {filteredProjects.map((project, index) => (
                <div key={project.id} className={styles.gridItem} role="listitem">
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>
                No projects found matching the filter &ldquo;{selectedTag}&rdquo;.
              </p>
              <button
                type="button"
                className={styles.resetButton}
                onClick={() => setSelectedTag('All')}
              >
                View all projects
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
