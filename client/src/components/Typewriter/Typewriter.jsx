import useTypewriter from '../../hooks/useTypewriter';
import styles from './Typewriter.module.css';

export function Typewriter({
  prefix = '',
  words = [],
  roles = [],
  className = '',
}) {
  const wordList = words && words.length > 0 ? words : roles;
  const { displayText, currentRole, isReducedMotion } = useTypewriter(wordList);

  const fullText = prefix ? `${prefix} ${currentRole}` : currentRole;

  return (
    <div
      className={`${styles.typewriterContainer} ${className}`}
      aria-label={fullText}
    >
      {prefix && <span className={styles.prefix}>{prefix}&nbsp;</span>}
      <span className={styles.rotatingWord} aria-hidden="true">
        {displayText}
      </span>
      {!isReducedMotion && <span className={styles.caret} aria-hidden="true" />}
      <span className="visually-hidden">{fullText}</span>
    </div>
  );
}

export default Typewriter;
