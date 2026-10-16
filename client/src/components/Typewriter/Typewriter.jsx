import React from 'react';
import { useTypewriter } from '../../hooks/useTypewriter.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';
import styles from './Typewriter.module.css';

export default function Typewriter({ phrases = [], className = '' }) {
  const currentText = useTypewriter(phrases);
  const prefersReducedMotion = useReducedMotion();
  const allPhrasesText = phrases.join(', ');

  return (
    <span
      className={`${styles.container} ${className}`}
      aria-label={allPhrasesText}
    >
      <span aria-hidden="true" className={styles.text}>
        {currentText}
      </span>
      {!prefersReducedMotion && (
        <span aria-hidden="true" className={styles.cursor}>
          |
        </span>
      )}
    </span>
  );
}
