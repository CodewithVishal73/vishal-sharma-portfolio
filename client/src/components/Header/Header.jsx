import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx';
import Button from '../primitives/Button.jsx';
import Port from '../primitives/Port.jsx';
import { SECTIONS } from '../../data/sections.js';
import styles from './Header.module.css';

const NAV_ITEMS = SECTIONS.map((s) => ({ id: s.id, label: s.navLabel }));


export default function Header() {
  const [activeSection, setActiveSection] = useState('client');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scrollspy to highlight active nav item on scroll
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo} aria-label="Vishal Sharma - Home">
          <span className={styles.logoMark}>VS</span>
          <Port active className={styles.logoPort} />
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id && location.pathname === '/';
              return (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={(e) => {
                      if (location.pathname === '/') {
                        e.preventDefault();
                        handleNavClick(item.id);
                      }
                    }}
                    className={`${styles.navLink} ${isActive ? styles.navActive : ''}`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <ThemeToggle />
          <Button
            variant="secondary"
            size="sm"
            href="http://localhost:5000/api/cv/pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cvBtn}
          >
            <FiDownload aria-hidden="true" />
            <span>CV</span>
          </Button>

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
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={(e) => {
                      if (location.pathname === '/') {
                        e.preventDefault();
                        handleNavClick(item.id);
                      } else {
                        setMobileMenuOpen(false);
                      }
                    }}
                    className={`${styles.mobileLink} ${activeSection === item.id ? styles.mobileActive : ''}`}
                  >
                    <Port active={activeSection === item.id} />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
