import { profile } from '../../data/profile';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const links = [];

  if (profile?.links?.github) {
    links.push({ label: 'GitHub', href: profile.links.github });
  }
  if (profile?.links?.linkedin) {
    links.push({ label: 'LinkedIn', href: profile.links.linkedin });
  }
  if (profile?.email) {
    links.push({ label: 'Email', href: `mailto:${profile.email}` });
  }

  return (
    <footer className={styles.footerWrapper} role="contentinfo">
      <div className={styles.footerInner}>
        <p className={styles.copyright}>
          &copy; {currentYear} {profile?.name || 'Vishal Sharma'}. All rights reserved.
        </p>

        {links.length > 0 && (
          <ul className={styles.socialLinks}>
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
}

export default Footer;
