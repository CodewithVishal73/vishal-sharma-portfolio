import { HeroRunway } from '../components/HeroRunway/HeroRunway';
import styles from './Placeholder.module.css';

export default function Home() {
  return (
    <>
      {/* 170svh Hero Runway with 100svh sticky stage and fall-through aperture */}
      <HeroRunway />

      {/* Immediate post-runway section with data-tone="deep" for seamless landing */}
      <section data-tone="deep" style={{ width: '100%', minHeight: '80svh' }}>
        <div className={styles.pageSection}>
          <span className={styles.toneBadge}>Data Tone: Deep (Fall-Through Landing)</span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--font-size-statement)',
              lineHeight: 'var(--line-height-statement)',
              color: 'var(--fg)',
              marginBottom: 'var(--space-4)',
            }}
          >
            The Descent Begins
          </h2>
          <p className={styles.description}>
            The aperture doorway has opened to full width. The journey into the software architecture continues below.
          </p>
        </div>
      </section>
    </>
  );
}
