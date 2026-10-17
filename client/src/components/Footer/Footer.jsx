import React from 'react';
import Port from '../primitives/Port.jsx';
import { API_BASE_URL } from '../../lib/api.js';
import { profile } from '../../data/profile.js';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Internal navigation links matching SectionShell IDs
  const navLinks = [
    { href: '#client', label: 'Top' },
    { href: '#identity', label: 'About' },
    { href: '#stack', label: 'Skills' },
    { href: '#intelligence', label: 'Intelligence' },
    { href: '#services', label: 'Projects' },
    { href: '#history', label: 'Timeline' },
    { href: '#proof', label: 'Credentials' },
    { href: '#response', label: 'Contact' },
  ];

  return (
    <footer className={styles.footer} aria-label="Site footer">
      <div className={styles.container}>
        {/* Engineering-inspired 200 OK design sign-off */}
        <div className={styles.topRow}>
          <div className={styles.nodeStatus}>
            <Port active className={styles.statusPort} />
            <span className={styles.nodeLabel}>200 OK · TRANSMISSION COMPLETE</span>
          </div>

          {/* Internal Section Navigation */}
          <nav className={styles.nav} aria-label="Footer navigation">
            {navLinks.map((item, index) => (
              <React.Fragment key={item.href}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
                {index < navLinks.length - 1 && (
                  <span className={styles.divider} aria-hidden="true">·</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Bottom Details Row */}
        <div className={styles.bottomRow}>
          <div className={styles.metaInfo}>
            <p className={styles.copyright}>
              © {currentYear} {profile.name || 'Vishal Sharma'}. Engineered with React, Express, and MongoDB Atlas.
            </p>
            {profile.location && (
              <span className={styles.locationTag}>
                {profile.location} · Available for Engineering Opportunities
              </span>
            )}
          </div>

          <div className={styles.actions}>
            {/* Functional Verified CV Downloads */}
            <a
              href={`${API_BASE_URL}/api/cv/pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.docLink}
              title="Download CV in PDF format"
            >
              CV (PDF)
            </a>
            <span className={styles.divider} aria-hidden="true">·</span>
            <a
              href={`${API_BASE_URL}/api/cv/docx`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.docLink}
              title="Download CV in Word DOCX format"
            >
              CV (DOCX)
            </a>

            {/* Public mail link if non-empty */}
            {profile.email && (
              <>
                <span className={styles.divider} aria-hidden="true">·</span>
                <a
                  href={`mailto:${profile.email}`}
                  className={styles.docLink}
                  title="Send email via mail client"
                >
                  Direct Email
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
