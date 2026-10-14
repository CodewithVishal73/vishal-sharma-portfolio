import { Link } from 'react-router-dom';
import styles from './Placeholder.module.css';

export default function NotFound() {
  return (
    <section data-tone="surface" style={{ width: '100%' }}>
      <div className={styles.pageSection}>
        <span className={styles.toneBadge}>404 Not Found</span>
        <h1 className={styles.heading}>Layer Not Found</h1>
        <p className={styles.description} style={{ marginBottom: 'var(--space-6)' }}>
          The requested path does not exist in this architecture.
        </p>
        <Link
          to="/"
          style={{
            color: 'var(--accent)',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: 'var(--min-touch-target)',
          }}
        >
          &larr; Return to surface
        </Link>
      </div>
    </section>
  );
}
