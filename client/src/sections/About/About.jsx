import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../../data/profile.js';
import PhotoFrame from '../../components/PhotoFrame/PhotoFrame.jsx';
import SectionShell from '../../components/SectionShell/SectionShell.jsx';
import Chip from '../../components/primitives/Chip.jsx';
import Badge from '../../components/primitives/Badge.jsx';
import styles from './About.module.css';

export default function About() {
  return (
    <SectionShell
      id="identity"
      nodeNumber="02"
      nodeLabel="IDENTITY"
      title="About Vishal"
      subtitle="System developer, backend engineer, and current Computer Science student"
    >
      <div className={styles.aboutGrid}>
        {/* Left Column: PhotoFrame */}
        <motion.div
          className={styles.photoCol}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <PhotoFrame />
        </motion.div>

        {/* Right Column: Bio & Verified Status Payload */}
        <motion.div
          className={styles.infoCol}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className={styles.metaHeader}>
            <span className="mono-label">IDENTITY PAYLOAD · 200 OK</span>
            <Badge variant="signal">STATUS: CURRENT STUDENT</Badge>
          </div>

          <h3 className={styles.headingBio}>
            Engineering reliable software from database persistence to client interfaces.
          </h3>

          {/* Verified Bio (≤ 60 words, strictly verified facts) */}
          <p className={styles.bioText}>{profile.bio}</p>

          {/* Status Chips */}
          <div className={styles.chipsRow}>
            <Chip active>Location: {profile.location}</Chip>
            <Chip active>Status: {profile.status}</Chip>
            <Chip active>Focus: {profile.focus}</Chip>
          </div>

          {/* Structured Payload Card tying into "The Request" metaphor */}
          <div className={styles.payloadCard}>
            <div className={styles.payloadHeader}>
              <span className="mono-label">IDENTITY.JSON</span>
              <span className={styles.statusOk}>● VALIDATED</span>
            </div>
            <pre className={styles.jsonPayload}>
              <code>{JSON.stringify(
                {
                  name: profile.name,
                  institution: 'JK Lakshmipat University, Jaipur',
                  degree: 'B.Tech Computer Science & Engineering',
                  graduation: 2028,
                  coreAreas: [
                    'Backend & API Design',
                    'Database Engineering',
                    'Practical AI Integration',
                  ],
                },
                null,
                2
              )}</code>
            </pre>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
