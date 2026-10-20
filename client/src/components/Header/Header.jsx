import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiDownload, FiChevronDown, FiFileText } from 'react-icons/fi';
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx';
import Button from '../primitives/Button.jsx';
import Port from '../primitives/Port.jsx';
import { buildApiUrl } from '../../lib/api.js';
import { SECTIONS } from '../../data/sections.js';
import styles from './Header.module.css';

const NAV_ITEMS = SECTIONS.map((s) => ({
  id: s.id,
  label: s.navLabel,
  path: s.path,
  alias: s.alias,
}));

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cvMenuOpen, setCvMenuOpen] = useState(false);
  const cvMenuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cvMenuRef.current && !cvMenuRef.current.contains(e.target)) {
        setCvMenuOpen(false);
      }
    };
    if (cvMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cvMenuOpen]);

  const isNavActive = (item) => {
    if (item.path === '/') {
      return location.pathname === '/' || location.pathname === '/client';
    }
    return (
      location.pathname === item.path ||
      location.pathname === item.alias ||
      location.pathname.startsWith(item.path + '/')
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo} aria-label="VS - Vishal Sharma Home">
          <span className={styles.logoMark}>VS</span>
          <Port active className={styles.logoPort} />
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => {
              const isActive = isNavActive(item);
              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`${styles.navLink} ${isActive ? styles.navActive : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <ThemeToggle />

          {/* CV Download with PDF & DOCX options */}
          <div className={styles.cvWrapper} ref={cvMenuRef}>
            <button
              type="button"
              className={styles.cvBtn}
              onClick={() => setCvMenuOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={cvMenuOpen}
              aria-label="Download CV options (PDF or DOCX)"
            >
              <FiDownload aria-hidden="true" />
              <span>CV</span>
              <FiChevronDown
                aria-hidden="true"
                style={{
                  transform: cvMenuOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                  fontSize: '12px',
                }}
              />
            </button>

            {cvMenuOpen && (
              <div className={styles.cvDropdown} role="menu">
                <a
                  href={buildApiUrl('/api/cv/pdf')}
                  download="Vishal_Sharma_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  className={styles.cvDropdownItem}
                  onClick={() => setCvMenuOpen(false)}
                >
                  <FiFileText aria-hidden="true" />
                  <span>PDF Document</span>
                  <span className={styles.cvBadge}>PDF</span>
                </a>
                <a
                  href={buildApiUrl('/api/cv/docx')}
                  download="Vishal_Sharma_CV.docx"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  className={styles.cvDropdownItem}
                  onClick={() => setCvMenuOpen(false)}
                >
                  <FiFileText aria-hidden="true" />
                  <span>Word Document</span>
                  <span className={styles.cvBadge}>DOCX</span>
                </a>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Sheet */}
      {mobileMenuOpen && (
        <div className={styles.mobileSheet}>
          <nav aria-label="Mobile Navigation">
            <ul className={styles.mobileList}>
              {NAV_ITEMS.map((item) => {
                const isActive = isNavActive(item);
                return (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`${styles.mobileLink} ${isActive ? styles.mobileActive : ''}`}
                    >
                      <Port active={isActive} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mobile CV Options */}
            <div className={styles.mobileCvSection}>
              <span className={styles.mobileCvHeading}>VERIFIED CV</span>
              <div className={styles.mobileCvLinks}>
                <a
                  href={buildApiUrl('/api/cv/pdf')}
                  download="Vishal_Sharma_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileCvBtn}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FiDownload aria-hidden="true" />
                  <span>Download PDF</span>
                </a>
                <a
                  href={buildApiUrl('/api/cv/docx')}
                  download="Vishal_Sharma_CV.docx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileCvBtn}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FiDownload aria-hidden="true" />
                  <span>Download DOCX</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
