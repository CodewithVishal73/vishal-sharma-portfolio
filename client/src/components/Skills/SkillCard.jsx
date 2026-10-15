import { TechIcon } from './TechIcon';
import styles from './SkillCard.module.css';

/**
 * SkillCard: Visual, interactive technology card.
 *
 * Focuses purely on recognizable technology identity and contextual engineering role.
 * Contains NO arbitrary percentages, proficiency levels, progress bars, or tooltips.
 */
export function SkillCard({
  id,
  name,
  iconId,
  context,
  index = 0,
}) {
  return (
    <article
      id={`skill-${id}`}
      className={styles.card}
      tabIndex={0}
      aria-label={`${name}${context ? `: ${context}` : ''}`}
      style={{ '--card-stagger-index': index }}
    >
      <div className={styles.cardInner}>
        <div className={styles.iconContainer}>
          <TechIcon
            iconId={iconId}
            size={26}
            className={styles.icon}
            ariaHidden={true}
          />
        </div>

        <div className={styles.content}>
          <h4 className={styles.name}>{name}</h4>
          {context && (
            <span className={styles.context}>{context}</span>
          )}
        </div>
      </div>

      <div className={styles.hoverGlint} aria-hidden="true" />
    </article>
  );
}

export default SkillCard;
