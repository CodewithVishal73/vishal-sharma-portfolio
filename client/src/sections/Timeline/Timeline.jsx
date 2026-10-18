import React, { useRef } from 'react';
import { motion, useScroll, useReducedMotion } from 'framer-motion';
import SectionShell from '../../components/SectionShell/SectionShell.jsx';
import TimelineItem from '../../components/TimelineItem/TimelineItem.jsx';
import { timeline } from '../../data/timeline.js';
import styles from '../../components/TimelineItem/TimelineItem.module.css';

export default function Timeline() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll progress for drawing the central Git line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 75%'],
  });

  return (
    <SectionShell
      id="history"
      nodeNumber="07"
      nodeLabel="HISTORY"
      title="Education & Engineering Timeline"
      subtitle="Git-graph-inspired progression of academic credentials and applied software engineering milestones."
    >
      <div ref={containerRef} className={styles.timelineContainer}>
        {/* Continuous Git spine track & animated progress line */}
        <div className={styles.spineTrack}>
          <motion.div
            className={styles.spineProgress}
            style={{
              scaleY: shouldReduceMotion ? 1 : scrollYProgress,
            }}
          />
        </div>

        {/* Alternating Timeline Items */}
        {timeline.map((entry, index) => (
          <TimelineItem
            key={entry.id}
            entry={entry}
            index={index}
            isLeft={index % 2 === 0}
          />
        ))}
      </div>
    </SectionShell>
  );
}
