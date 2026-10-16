import React from 'react';
import SectionShell from '../../components/SectionShell/SectionShell.jsx';
import ProjectCard from '../../components/ProjectCard/ProjectCard.jsx';
import { projects } from '../../data/projects.js';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <SectionShell
      id="services"
      nodeNumber="04"
      nodeLabel="SERVICES"
      title="Featured Projects"
      subtitle="Engineering systems, intelligent point-of-sale platforms, and full-stack service architectures."
    >
      <div className={styles.container}>
        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
