import React from 'react';
import styles from './Port.module.css';

export default function Port({ active = false, className = '' }) {
  return (
    <span
      className={`${styles.port} ${active ? styles.active : ''} ${className}`}
      aria-hidden="true"
    />
  );
}
