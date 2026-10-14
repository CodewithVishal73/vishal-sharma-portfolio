import styles from './Placeholder.module.css';

export default function Projects() {
  return (
    <section data-tone="surface" style={{ width: '100%' }}>
      <div className={styles.pageSection}>
        <span className={styles.toneBadge}>Data Tone: Surface</span>
        <h1 className={styles.heading}>Projects</h1>
        <p className={styles.description}>
          Selected systems, backend architectures, and web applications.
        </p>
      </div>
    </section>
  );
}
