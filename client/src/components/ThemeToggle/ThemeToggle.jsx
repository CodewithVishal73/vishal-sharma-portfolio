import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../hooks/useTheme.js';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${styles.toggle} ${className || ''}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className={styles.iconWrapper}>
        {isDark ? (
          <FiSun className={styles.icon} aria-hidden="true" />
        ) : (
          <FiMoon className={styles.icon} aria-hidden="true" />
        )}
      </span>
      <span className={styles.label}>{isDark ? 'LIGHT' : 'DARK'}</span>
    </button>
  );
}
