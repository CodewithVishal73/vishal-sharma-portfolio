import styles from './Placeholder.module.css';

export default function Journey() {
  return (
    <section data-tone="mid" style={{ width: '100%' }}>
      <div className={styles.pageSection}>
        <span className={styles.toneBadge}>Data Tone: Mid</span>
        <h1 className={styles.heading}>Journey</h1>
        <p className={styles.description}>
          Academic milestones, engineering education, and continuous technical growth.
        </p>
      </div>
    </section>
  );
}
