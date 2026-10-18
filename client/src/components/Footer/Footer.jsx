import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
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
    { href: '#services', label: 'Projects' },
    { href: '#history', label: 'Timeline' },
    { href: '#proof', label: 'Credentials' },
    { href: '#response', label: 'Contact' },
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      url: profile.social?.github || 'https://github.com/CodewithVishal73',
      icon: FaGithub,
      ariaLabel: "Visit Vishal's GitHub profile",
      title: 'GitHub (CodewithVishal73)',
    },
    {
      name: 'LinkedIn',
      url: profile.social?.linkedin || 'https://linkedin.com/in/vishalsh1',
      icon: FaLinkedin,
      ariaLabel: "Visit Vishal's LinkedIn profile",
      title: 'LinkedIn (vishalsh1)',
    },
    {
      name: 'LeetCode',
      url: profile.social?.leetcode || 'https://leetcode.com/u/Vishal_cd/',
      icon: SiLeetcode,
      ariaLabel: "Visit Vishal's LeetCode profile",
      title: 'LeetCode (Vishal_cd)',
    },
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
              © {currentYear} {profile.name || 'Vishal Sharma'}.
            </p>
            {profile.location && (
              <span className={styles.locationTag}>
                {profile.location} · Available for Engineering Opportunities
              </span>
            )}
          </div>

          {/* Social Profiles */}
          <div className={styles.socialGroup} aria-label="Social and coding profiles">
            {socialLinks.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={item.ariaLabel}
                  title={item.title}
                >
                  <IconComponent size={19} aria-hidden="true" />
                  <span className={styles.srOnly}>{item.name}</span>
                </a>
              );
            })}
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
