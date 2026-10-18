import React from 'react';
import { TechIcon } from './iconMap.jsx';
import { LEVEL_MAP } from '../../data/skills.js';
import styles from './TechCard.module.css';

export default function TechCard({ skill, onSelectSkill, className = '' }) {
  const levelInfo = LEVEL_MAP[skill.level] || LEVEL_MAP.working;

  const levelTagClass =
    skill.level === 'core'
      ? styles.levelTagCore
      : skill.level === 'familiar'
        ? styles.levelTagFamiliar
        : styles.levelTagWorking;

  const handleClick = (e) => {
    if (onSelectSkill) {
      e?.preventDefault();
      onSelectSkill(skill.name);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  };

  const hasProjects = skill.evidenceType === 'project' && skill.usedIn?.length > 0;

  return (
    <div
      tabIndex={0}
      role={onSelectSkill ? 'button' : 'article'}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`${skill.name} (${levelInfo.label} proficiency) - Click to view projects using ${skill.name}`}
      className={`${styles.card} ${onSelectSkill ? styles.clickableCard : ''} ${className}`}
      style={{ '--brand-color': skill.brandColor }}
      title={`Click to view projects using ${skill.name}`}
    >
      {/* Top Bar with Icon on left and Qualitative Level Tag on right */}
      <div className={styles.cardTop}>
        <div className={styles.iconWrapper}>
          <TechIcon id={skill.id} size={26} />
        </div>
        <span className={`${styles.levelTag} ${levelTagClass}`}>
          {levelInfo.label}
        </span>
      </div>

      {/* Card Title & Subcategory */}
      <div className={styles.nameWrapper}>
        <span className={styles.name} title={skill.name}>{skill.name}</span>
        {skill.sub && <span className={styles.subLabel}>{skill.sub}</span>}
      </div>

      {/* Evidence Tag: Used in <projects> OR Foundational */}
      <div className={styles.evidenceRow}>
        {hasProjects ? (
          <span
            className={styles.usedInBadge}
            title={`Used in: ${skill.usedIn.join(', ')} (Click to view)`}
          >
            Used in: <strong>{skill.usedIn.join(', ')}</strong>
            <span className={styles.actionHint} aria-hidden="true">→</span>
          </span>
        ) : (
          <span className={styles.knowledgeBadge}>Foundational</span>
        )}
      </div>
    </div>
  );
}
