import useTypewriter from '../../hooks/useTypewriter';
import styles from './Typewriter.module.css';

export function Typewriter({ roles = [], className = '' }) {
  const { displayText, currentRole, isReducedMotion } = useTypewriter(roles);

  return (
    <div
      className={`${styles.typewriterContainer} ${className}`}
      aria-label={`Current focus: ${currentRole}`}
    >
      <span aria-hidden="true">{displayText}</span>
      {!isReducedMotion && <span className={styles.caret} aria-hidden="true" />}
      <span className="visually-hidden">{currentRole}</span>
    </div>
  );
}

export default Typewriter;
