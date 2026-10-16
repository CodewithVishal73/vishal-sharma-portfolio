import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import SectionShell from '../../components/SectionShell/SectionShell.jsx';
import CertCard from '../../components/CertCard/CertCard.jsx';
import { certifications } from '../../data/certifications.js';
import styles from './Certifications.module.css';

export default function Certifications() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionShell
      id="proof"
      nodeNumber="06"
      nodeLabel="PROOF"
      title="Certifications & Credentials"
      subtitle="Verified professional programs, technical enterprise specializations, and AI coursework."
    >
      <div className={styles.container}>
        {/* Grid of Verified CertCards */}
        <div className={styles.certsGrid}>
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{
                opacity: shouldReduceMotion ? 1 : 0,
                y: shouldReduceMotion ? 0 : 20,
              }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.45,
                delay: shouldReduceMotion ? 0 : index * 0.08,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              style={{ display: 'flex' }}
            >
              <CertCard cert={cert} />
            </motion.div>
          ))}
        </div>

        {/* Honest, designed achievements & hackathons status */}
        <div className={styles.achievementsSection}>
          <div className={styles.achievementInfo}>
            <h4 className={styles.achievementTitle}>
              <FiAward size={18} color="var(--signal)" aria-hidden="true" />
              <span>Competitive Milestones & Hackathons</span>
            </h4>
            <p className={styles.achievementDesc}>
              Hackathon participation and algorithmic contest entries are ongoing. Official rankings, awards, and verified submissions will be published here upon adjudication.
            </p>
          </div>

          <span className={styles.statusPill}>● In Active Competition</span>
        </div>
      </div>
    </SectionShell>
  );
}
