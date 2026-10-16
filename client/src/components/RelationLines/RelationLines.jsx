import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import styles from './RelationLines.module.css';

export default function RelationLines({
  activeSkillId,
  relatedSkillIds = [],
  cardRefs,
  containerRef,
}) {
  const [paths, setPaths] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const updateCoordinates = useCallback(() => {
    if (!containerRef?.current || !activeSkillId || relatedSkillIds.length === 0) {
      setPaths([]);
      return;
    }

    // Only render on desktop (>=1024px)
    if (window.innerWidth < 1024) {
      setPaths([]);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const activeEl = cardRefs.current[activeSkillId];
    if (!activeEl) {
      setPaths([]);
      return;
    }

    const activeRect = activeEl.getBoundingClientRect();
    const startX = activeRect.left + activeRect.width / 2 - containerRect.left;
    const startY = activeRect.top + activeRect.height / 2 - containerRect.top;

    const newPaths = [];

    relatedSkillIds.forEach((relId) => {
      const targetEl = cardRefs.current[relId];
      if (!targetEl) return;

      const targetRect = targetEl.getBoundingClientRect();
      const endX = targetRect.left + targetRect.width / 2 - containerRect.left;
      const endY = targetRect.top + targetRect.height / 2 - containerRect.top;

      // Calculate smooth cubic bezier path
      const dx = endX - startX;
      const dy = endY - startY;
      const cp1x = startX + dx * 0.5;
      const cp1y = startY;
      const cp2x = startX + dx * 0.5;
      const cp2y = endY;

      const d = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
      newPaths.push({ id: `${activeSkillId}-${relId}`, d, startX, startY, endX, endY });
    });

    setPaths(newPaths);
  }, [activeSkillId, relatedSkillIds, cardRefs, containerRef]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      updateCoordinates();
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', updateCoordinates, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateCoordinates);
    };
  }, [updateCoordinates]);

  useEffect(() => {
    updateCoordinates();
  }, [activeSkillId, relatedSkillIds, updateCoordinates]);

  if (!isDesktop || paths.length === 0) {
    return null;
  }

  return (
    <svg className={styles.svgOverlay} aria-hidden="true">
      <AnimatePresence>
        {paths.map((p) => (
          <g key={p.id}>
            <motion.path
              d={p.d}
              className={styles.connectorLine}
              initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.85 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: 'easeOut' }}
            />
            <circle cx={p.startX} cy={p.startY} r="3" className={styles.connectorDot} />
            <circle cx={p.endX} cy={p.endY} r="3" className={styles.connectorDot} />
          </g>
        ))}
      </AnimatePresence>
    </svg>
  );
}
