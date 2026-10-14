import styles from './Placeholder.module.css';

export default function Home() {
  return (
    <section data-tone="surface" style={{ width: '100%' }}>
      <div className={styles.pageSection}>
        <span className={styles.toneBadge}>Data Tone: Surface</span>
        <h1 className={styles.heading}>Vishal Sharma</h1>
        <p className={styles.description}>
          Computer Science Undergraduate · Backend &amp; API Design · Full-Stack Development
        </p>
      </div>
    </section>
  );
}
