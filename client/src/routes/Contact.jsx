import styles from './Placeholder.module.css';

export default function Contact() {
  return (
    <section data-tone="deep" style={{ width: '100%' }}>
      <div className={styles.pageSection}>
        <span className={styles.toneBadge}>Data Tone: Deep</span>
        <h1 className={styles.heading}>Send a request.</h1>
        <p className={styles.description}>
          Roles, collaborations, or technical conversation.
        </p>
      </div>
    </section>
  );
}
