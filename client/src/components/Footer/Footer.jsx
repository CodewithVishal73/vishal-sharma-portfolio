import { Link } from 'react-router-dom';
import { profile } from '../../data/profile';
import styles from './Footer.module.css';

const CURRENT_YEAR = new Date().getFullYear();

/**
 * Global Footer: Deliberate, premium conclusion to the portfolio.
 * Connects all routes with semantic navigation, verified social channels,
 * and dynamic copyright.
 */
export function Footer() {
  const currentYear = CURRENT_YEAR;

  // Filter only real, non-empty social links
  const socialLinks = [];

  if (profile?.links?.github) {
    socialLinks.push({
      label: 'GitHub',
      href: profile.links.github,
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
    });
  }

  if (profile?.links?.linkedin) {
    socialLinks.push({
      label: 'LinkedIn',
      href: profile.links.linkedin,
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    });
  }

  if (profile?.email) {
    socialLinks.push({
      label: 'Email',
      href: `mailto:${profile.email}`,
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    });
  }

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Projects', to: '/projects' },
    { label: 'Journey', to: '/journey' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <footer className={styles.footerWrapper} role="contentinfo">
      <div className={styles.innerContainer}>
        {/* Top Section: Brand + Navigation + Channels */}
        <div className={styles.topSection}>
          {/* Brand & Positioning */}
          <div className={styles.brandColumn}>
            <Link to="/" className={styles.wordmark} aria-label="Vishal Sharma — Home">
              {profile?.name || 'Vishal Sharma'}
            </Link>
            <p className={styles.positioning}>
              Software engineering, backend systems, and modern web experiences.
            </p>
            <span className={styles.academicTag}>
              BTech Computer Science · JK Lakshmipat University, Jaipur
            </span>
          </div>

          {/* Navigation Directory */}
          <nav className={styles.navColumn} aria-label="Footer Navigation">
            <h3 className={styles.columnTitle}>Navigation</h3>
            <ul className={styles.linkList}>
              {navLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={styles.footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Direct Verification & Channels */}
          <div className={styles.channelsColumn}>
            <h3 className={styles.columnTitle}>Credentials</h3>
            <ul className={styles.linkList}>
              <li>
                <a
                  href={profile?.cv?.pdf || '/cv/Vishal_Sharma_CV.pdf'}
                  download="Vishal_Sharma_CV.pdf"
                  className={styles.footerLink}
                >
                  Download CV (PDF) &darr;
                </a>
              </li>
              <li>
                <a
                  href={profile?.cv?.docx || '/cv/Vishal_Sharma_CV.docx'}
                  download="Vishal_Sharma_CV.docx"
                  className={styles.footerLink}
                >
                  Download CV (Word) &darr;
                </a>
              </li>
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Closing Thought */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {currentYear} {profile?.name || 'Vishal Sharma'}. All rights reserved.
          </p>

          <div className={styles.bottomMeta}>
            <span className={styles.closingThought}>
              Designed with intent. Built with code.
            </span>
            <button
              type="button"
              onClick={handleScrollToTop}
              className={styles.backToTopButton}
              aria-label="Back to top of page"
            >
              <span>Back to top</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
