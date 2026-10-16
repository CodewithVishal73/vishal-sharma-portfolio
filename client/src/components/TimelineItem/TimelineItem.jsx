import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';
import { FiGitCommit, FiGitBranch, FiCalendar, FiMapPin } from 'react-icons/fi';
import styles from './TimelineItem.module.css';

export default function TimelineItem({ entry, isLeft = false, index = 0 }) {
  const shouldReduceMotion = useReducedMotion();

  const isEducation = entry.type === 'education';
  const OrgIcon = isEducation ? FaGraduationCap : FiGitCommit;

  const rowClasses = [
    styles.itemRow,
    isLeft ? styles.leftRow : styles.rightRow,
  ].join(' ');

  return (
    <div className={rowClasses}>
      {/* Node Dot on central Git spine */}
      <div className={styles.nodeWrapper}>
        <motion.div
          className={styles.nodeDot}
          initial={{ scale: shouldReduceMotion ? 1 : 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.4,
            delay: shouldReduceMotion ? 0 : index * 0.1,
            ease: [0.2, 0.8, 0.2, 1],
          }}
        >
          <span className={styles.nodeInner} aria-hidden="true" />
        </motion.div>
      </div>

      {/* Milestone Card */}
      <motion.div
        className={styles.cardWrapper}
        initial={{
          opacity: shouldReduceMotion ? 1 : 0,
          x: shouldReduceMotion ? 0 : isLeft ? -28 : 28,
        }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.5,
          delay: shouldReduceMotion ? 0 : index * 0.15,
          ease: [0.2, 0.8, 0.2, 1],
        }}
      >
        <article className={styles.card} tabIndex={0} aria-labelledby={`timeline-title-${entry.id}`}>
          {/* Port indicator on card edge */}
          <span className={styles.port} aria-hidden="true" />

          {/* Header with Git-ref pill and Date */}
          <div className={styles.header}>
            <span className={styles.gitRefTag}>
              <FiGitBranch aria-hidden="true" size={12} />
              <span>{entry.gitRef}</span>
              <span style={{ color: 'var(--ink-faint)' }}>({entry.commitHash})</span>
            </span>

            <span className={styles.dateBadge}>
              <FiCalendar aria-hidden="true" size={12} />
              <span>
                {entry.startDate} — {entry.endDate}
              </span>
            </span>
          </div>

          {/* Title Area */}
          <div className={styles.titleArea}>
            <h3 id={`timeline-title-${entry.id}`} className={styles.title}>
              {entry.title}
            </h3>

            <div className={styles.orgRow}>
              <OrgIcon aria-hidden="true" size={14} color="var(--signal)" />
              <span>{entry.organization}</span>
              {entry.location && (
                <>
                  <span style={{ color: 'var(--line-strong)' }}>·</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--ink-faint)' }}>
                    <FiMapPin aria-hidden="true" size={11} style={{ marginRight: 3 }} />
                    {entry.location}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Concise description */}
          <p className={styles.description}>{entry.description}</p>

          {/* Core Milestones / Highlights */}
          {entry.highlights && entry.highlights.length > 0 && (
            <ul className={styles.highlightsList} aria-label="Key Coursework & Engineering Highlights">
              {entry.highlights.map((highlight, idx) => (
                <li key={idx} className={styles.highlightItem}>
                  <span className={styles.highlightBullet}>›</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}
        </article>
      </motion.div>
    </div>
  );
}
