import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import SectionShell from '../../components/SectionShell/SectionShell.jsx';
import ProjectCard from '../../components/ProjectCard/ProjectCard.jsx';
import ProjectFilter, { ProjectEmptyState } from '../../components/ProjectFilter/ProjectFilter.jsx';
import { projects, getAllProjectTags } from '../../data/projects.js';
import styles from './Projects.module.css';

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const shouldReduceMotion = useReducedMotion();

  // All dynamically extracted tags
  const tags = useMemo(() => getAllProjectTags(), []);

  // Synchronized state with URL search params
  const rawTag = searchParams.get('tag') || searchParams.get('filter') || 'All';
  const activeTag = useMemo(() => {
    // Graceful fallback if invalid query param
    const match = tags.find((t) => t.toLowerCase() === rawTag.toLowerCase());
    return match || 'All';
  }, [tags, rawTag]);

  const rawSort = searchParams.get('sort') || 'newest';
  const sortBy = rawSort === 'az' ? 'az' : 'newest';

  // Handlers to update URL query parameters
  const handleSelectTag = (tag) => {
    const nextParams = new URLSearchParams(searchParams);
    if (tag === 'All') {
      nextParams.delete('tag');
      nextParams.delete('filter');
    } else {
      nextParams.set('tag', tag);
      nextParams.delete('filter');
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleSelectSort = (sort) => {
    const nextParams = new URLSearchParams(searchParams);
    if (sort === 'newest') {
      nextParams.delete('sort');
    } else {
      nextParams.set('sort', sort);
    }
    setSearchParams(nextParams, { replace: true });
  };

  // Filter and sort computation
  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects];

    // Filter by tag
    if (activeTag !== 'All') {
      result = result.filter((p) =>
        p.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase())
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return (b.year || 0) - (a.year || 0);
      }
      if (sortBy === 'az') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return result;
  }, [activeTag, sortBy]);

  return (
    <SectionShell
      id="services"
      nodeNumber="04"
      nodeLabel="SERVICES"
      title="Featured Projects"
      subtitle="Engineering systems, intelligent point-of-sale platforms, and full-stack service architectures."
    >
      <div className={styles.container}>
        {/* Dynamic Project Filter & Sort Bar */}
        <ProjectFilter
          tags={tags}
          activeTag={activeTag}
          onSelectTag={handleSelectTag}
          sortBy={sortBy}
          onSelectSort={handleSelectSort}
          totalCount={projects.length}
          filteredCount={filteredAndSortedProjects.length}
        />

        {/* Projects Grid or Empty State */}
        {filteredAndSortedProjects.length === 0 ? (
          <ProjectEmptyState
            activeTag={activeTag}
            onClear={() => handleSelectTag('All')}
          />
        ) : (
          <div className={styles.projectsGrid}>
            <AnimatePresence mode="popLayout">
              {filteredAndSortedProjects.map((project) => (
                <motion.div
                  key={project.slug}
                  layout={!shouldReduceMotion}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: 'easeOut' }}
                  style={{ display: 'flex' }}
                >
                  <ProjectCard
                    project={project}
                    style={{ flex: 1, width: '100%' }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </SectionShell>
  );
}
