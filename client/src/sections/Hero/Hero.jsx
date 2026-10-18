import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../../data/profile.js';
import Typewriter from '../../components/Typewriter/Typewriter.jsx';
import DownloadCvButton from '../../components/DownloadCvButton/DownloadCvButton.jsx';
import Button from '../../components/primitives/Button.jsx';
import Port from '../../components/primitives/Port.jsx';
import styles from './Hero.module.css';

// Entrance sequence variants matching DESIGN_AND_MOTION section 5
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.2, 0.8, 0.2, 1],
    },
  },
};

const nameRevealVariants = {
  hidden: { opacity: 0, y: 32, clipPath: 'inset(100% 0% 0% 0%)' },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: 0.5,
      ease: [0.2, 0.8, 0.2, 1],
    },
  },
};

export default function Hero() {
  return (
    <section id="client" className={styles.heroSection} aria-label="Hero Introduction">
      {/* Background Gradient Mesh & Faint Grid */}
      <div className={styles.gridBackdrop} aria-hidden="true" />

      <motion.div
        className={styles.heroContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 1. Node Label */}
        <motion.div className={styles.nodeMeta} variants={itemVariants}>
          <Port active className={styles.metaPort} />
          <span className="mono-label">01 / CLIENT NODE</span>
        </motion.div>

        {/* 2. Name with line reveal */}
        <div className={styles.nameMask}>
          <motion.h1 className={styles.heroName} variants={nameRevealVariants}>
            {profile.name}
          </motion.h1>
        </div>

        {/* 3. Designation */}
        <motion.div className={styles.designationWrapper} variants={itemVariants}>
          <span className={styles.designationBadge}>{profile.designation}</span>
        </motion.div>

        {/* 4. Headline + Typewriter */}
        <motion.div className={styles.headlineRow} variants={itemVariants}>
          <span className={styles.headlineLead}>{profile.headline}</span>
          <Typewriter phrases={profile.rotatingPhrases} className={styles.typewriter} />
        </motion.div>

        {/* 5. Support line */}
        <motion.p className={styles.supportLine} variants={itemVariants}>
          {profile.supportLine}
        </motion.p>

        {/* 6. CTAs */}
        <motion.div className={styles.ctaRow} variants={itemVariants}>
          <Button variant="primary" href="#services" size="lg" className={styles.primaryCta}>
            View Projects
          </Button>
          <DownloadCvButton className={styles.cvCta} />
        </motion.div>
      </motion.div>
    </section>
  );
}
