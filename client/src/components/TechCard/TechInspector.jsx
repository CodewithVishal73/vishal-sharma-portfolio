import React from 'react';
import { TechIcon } from './iconMap.jsx';
import styles from './TechInspector.module.css';

export default function TechInspector({ activeSkill, onClear, onSelectSkill }) {
  if (!activeSkill) {
    return (
      <div
        className={styles.inspectorEmpty}
        role="region"
        aria-live="polite"
        aria-label="Skill details inspector"
      >
        <span className={styles.emptyPrompt}>
          <span className={styles.terminalPrompt}>// INSPECTOR:</span> Select, hover, or focus any
          technology card above to verify its evidence, architecture role, and connected systems. Press{' '}
          <kbd className={styles.kbd}>Esc</kbd> to clear.
        </span>
      </div>
    );
  }

  const isProject = activeSkill.evidenceType === 'project';

  return (
    <div
      className={styles.inspector}
      role="region"
      aria-live="polite"
      aria-label={`${activeSkill.name} verification details`}
    >
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <TechIcon id={activeSkill.id} size={22} className={styles.icon} />
          <div>
            <h4 className={styles.name}>{activeSkill.name}</h4>
            <span className={styles.sub}>{activeSkill.sub}</span>
          </div>
        </div>

        <div className={styles.badgeGroup}>
          <span
            className={`${styles.tierBadge} ${
              isProject ? styles.tierVerified : styles.tierKnowledge
            }`}
          >
            {isProject ? 'Verified in projects' : 'Working knowledge'}
          </span>
          <button
            type="button"
            className={styles.clearBtn}
            onClick={onClear}
            aria-label="Clear active skill selection (Esc)"
            title="Clear selection (Esc)"
          >
            Clear (Esc)
          </button>
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.context}>{activeSkill.context}</p>

        {isProject && activeSkill.usedIn?.length > 0 && (
          <div className={styles.evidenceLine}>
            <span className={styles.evidenceLabel}>EVIDENCE IN:</span>
            <div className={styles.pills}>
              {activeSkill.usedIn.map((p) => (
                <span key={p} className={styles.projectPill}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeSkill.relations?.length > 0 && (
          <div className={styles.relationsLine}>
            <span className={styles.relationsLabel}>SYSTEM RELATIONS:</span>
            <div className={styles.relationsPills}>
              {activeSkill.relations.map((relId) => (
                <button
                  key={relId}
                  type="button"
                  className={styles.relationBtn}
                  onClick={() => onSelectSkill && onSelectSkill(relId)}
                  title={`Inspect ${relId}`}
                >
                  {relId}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
