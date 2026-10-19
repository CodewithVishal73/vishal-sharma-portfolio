import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiHome } from 'react-icons/fi';
import Port from '../primitives/Port.jsx';
import styles from './NodeNav.module.css';

export default function NodeNav({ prev, next, currentNum, currentLabel }) {
  return (
    <nav className={styles.navContainer} aria-label="Pipeline Node Navigation">
      <div className={styles.divider}>
        <span className={styles.dividerLine} />
        <span className={styles.nodeStatus}>
          <Port active className={styles.port} />
          <span>NODE {currentNum} · {currentLabel}</span>
        </span>
        <span className={styles.dividerLine} />
      </div>

      <div className={styles.controlsRow}>
        {/* Previous Node Link */}
        {prev ? (
          <Link to={prev.path} className={styles.navCard} aria-label={`Go to previous node: ${prev.title}`}>
            <FiArrowLeft className={styles.icon} aria-hidden="true" />
            <div className={styles.textGroup}>
              <span className={styles.subLabel}>PREV NODE · {prev.num}</span>
              <span className={styles.mainLabel}>{prev.navLabel}</span>
            </div>
          </Link>
        ) : (
          <Link to="/" className={styles.navCard} aria-label="Return to Client Node / Home">
            <FiHome className={styles.icon} aria-hidden="true" />
            <div className={styles.textGroup}>
              <span className={styles.subLabel}>ROOT</span>
              <span className={styles.mainLabel}>Home</span>
            </div>
          </Link>
        )}

        {/* Center Root Link */}
        <Link to="/" className={styles.centerLink} aria-label="Pipeline Home">
          <FiHome size={14} aria-hidden="true" />
          <span>OVERVIEW</span>
        </Link>

        {/* Next Node Link */}
        {next ? (
          <Link to={next.path} className={`${styles.navCard} ${styles.navCardRight}`} aria-label={`Go to next node: ${next.title}`}>
            <div className={`${styles.textGroup} ${styles.textGroupRight}`}>
              <span className={styles.subLabel}>NEXT NODE · {next.num}</span>
              <span className={styles.mainLabel}>{next.navLabel}</span>
            </div>
            <FiArrowRight className={styles.icon} aria-hidden="true" />
          </Link>
        ) : (
          <Link to="/" className={`${styles.navCard} ${styles.navCardRight}`} aria-label="Cycle to Client Node / Home">
            <div className={`${styles.textGroup} ${styles.textGroupRight}`}>
              <span className={styles.subLabel}>CYCLE TO ROOT</span>
              <span className={styles.mainLabel}>01 / Client</span>
            </div>
            <FiArrowRight className={styles.icon} aria-hidden="true" />
          </Link>
        )}
      </div>
    </nav>
  );
}
