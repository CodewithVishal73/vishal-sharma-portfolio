import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import useToneColor from '../../hooks/useToneColor';
import styles from './Header.module.css';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleBtnRef = useRef(null);
  const overlayRef = useRef(null);
  const tone = useToneColor();
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll lock, escape key, and focus management for mobile menu
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';

      // Focus first focusable link in overlay
      const focusable = overlayRef.current?.querySelectorAll('a, button');
      if (focusable && focusable.length > 0) {
        focusable[0].focus();
      }

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setMenuOpen(false);
          toggleBtnRef.current?.focus();
        } else if (e.key === 'Tab') {
          if (!focusable || focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const handleCloseMenu = () => {
    setMenuOpen(false);
    toggleBtnRef.current?.focus();
  };

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Projects', to: '/projects' },
    { label: 'Journey', to: '/journey' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <header className={styles.headerWrapper} data-header-tone={tone}>
      <div className={styles.headerInner}>
        {/* Wordmark */}
        <Link to="/" className={styles.wordmark} aria-label="Vishal Sharma — Home">
          Vishal Sharma
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <ul className={styles.navLinksList}>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={styles.navLink}
                  aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>

        {/* Mobile Hamburger & Actions */}
        <div className={styles.headerActions}>
          <button
            ref={toggleBtnRef}
            type="button"
            className={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-overlay-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Overlay */}
      <div
        id="mobile-overlay-menu"
        ref={overlayRef}
        className={styles.mobileOverlay}
        data-open={menuOpen ? 'true' : 'false'}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileHeader}>
          <span className={styles.wordmark}>Vishal Sharma</span>
          <button
            type="button"
            className={styles.menuToggle}
            onClick={handleCloseMenu}
            aria-label="Close navigation menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile Navigation" style={{ flex: 1, display: 'flex' }}>
          <ul className={styles.mobileNavLinks}>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={styles.mobileNavLink}
                  onClick={() => setMenuOpen(false)}
                  aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.mobileFooter}>
          <span style={{ fontSize: '0.875rem', opacity: 0.7 }}>Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
