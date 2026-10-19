import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCode, FiLayers, FiAward, FiClock, FiMail, FiUser } from 'react-icons/fi';
import Hero from '../sections/Hero/Hero.jsx';
import Port from '../components/primitives/Port.jsx';
import Button from '../components/primitives/Button.jsx';
import ProjectCard from '../components/ProjectCard/ProjectCard.jsx';
import { projects } from '../data/projects.js';
import { SECTIONS } from '../data/sections.js';
import styles from './Home.module.css';

const NODE_ICONS = {
  identity: FiUser,
  stack: FiCode,
  services: FiLayers,
  history: FiClock,
  proof: FiAward,
  response: FiMail,
};

export default function Home() {
  useEffect(() => {
    document.title = 'Vishal Sharma | Full-Stack Developer & System Builder';
    window.scrollTo(0, 0);
  }, []);

  // Filter out node 01 (client/hero) to display pipeline directory
  const pipelineNodes = SECTIONS.filter((s) => s.id !== 'client');
  // Featured projects preview (first 2 projects)
  const featuredProjects = projects.slice(0, 2);

  return (
    <div className={styles.homeContainer}>
      {/* 01 / CLIENT — HERO NODE */}
      <Hero />

      {/* PIPELINE ARCHITECTURE DIRECTORY */}
      <section className={styles.directorySection} aria-label="System Architecture Pipeline">
        <div className={styles.sectionHeader}>
          <div className={styles.headerMeta}>
            <Port active />
            <span className="mono-label">PIPELINE ROUTING TABLE · 6 ACTIVE NODES</span>
          </div>
          <h2 className={styles.sectionTitle}>System Architecture Directory</h2>
          <p className={styles.sectionSubtitle}>
            Select any pipeline node below or use the navigation bar to access dedicated system modules.
          </p>
        </div>

        <div className={styles.nodesGrid}>
          {pipelineNodes.map((node, index) => {
            const Icon = NODE_ICONS[node.id] || FiLayers;
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <Link to={node.path} className={styles.nodeCard}>
                  <div className={styles.cardTop}>
                    <span className={styles.nodeTag}>NODE {node.num} / {node.nodeLabel}</span>
                    <Icon className={styles.nodeIcon} aria-hidden="true" />
                  </div>
                  <h3 className={styles.cardHeading}>{node.navLabel}</h3>
                  <p className={styles.cardDescription}>{node.desc}</p>
                  <div className={styles.cardAction}>
                    <span className={styles.actionText}>Access Page</span>
                    <FiArrowRight className={styles.arrowIcon} aria-hidden="true" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FEATURED PROJECTS HIGHLIGHT */}
      <section className={styles.featuredSection} aria-label="Featured Systems Preview">
        <div className={styles.sectionHeader}>
          <div className={styles.headerMeta}>
            <Port active />
            <span className="mono-label">SERVICES · HIGHLIGHTED SYSTEMS</span>
          </div>
          <div className={styles.headerFlex}>
            <div>
              <h2 className={styles.sectionTitle}>Featured Architectures</h2>
              <p className={styles.sectionSubtitle}>
                Production systems and full-stack software built with verifiable architectures.
              </p>
            </div>
            <Link to="/projects" className={styles.exploreAllBtn}>
              <Button variant="secondary" size="md">
                <span>View All Projects ({projects.length})</span>
                <FiArrowRight aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.previewGrid}>
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className={styles.ctaBottom}>
          <Link to="/projects">
            <Button variant="primary" size="lg">
              <span>Explore All Projects & Verified Systems</span>
              <FiArrowRight aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
