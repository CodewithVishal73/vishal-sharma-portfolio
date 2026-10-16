import React from 'react';
import Port from '../primitives/Port.jsx';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.nodeStatus}>
          <Port active className={styles.statusPort} />
          <span className={styles.nodeLabel}>200 OK · REQUEST COMPLETE</span>
        </div>

        <div className={styles.info}>
          <p className={styles.copyright}>
            © {year} Vishal Sharma. Built with React, Express, and MongoDB.
          </p>
          <div className={styles.links}>
            <a
              href="http://localhost:5000/api/cv/pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              CV (PDF)
            </a>
            <span className={styles.divider}>·</span>
            <a
              href="http://localhost:5000/api/cv/docx"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              CV (DOCX)
            </a>
            <span className={styles.divider}>·</span>
            <a href="#client" className={styles.link}>
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
