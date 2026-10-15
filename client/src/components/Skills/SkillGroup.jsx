import { SkillBar } from './SkillBar';
import styles from './SkillGroup.module.css';

export function SkillGroup({ layer, isActive = false, sectionRef }) {
  const headingId = `layer-heading-${layer.id}`;

  return (
    <section
      ref={sectionRef}
      id={layer.id}
      aria-labelledby={headingId}
      className={styles.groupContainer}
      data-active-group={isActive ? 'true' : 'false'}
    >
      <div className={styles.groupHeader}>
        <div className={styles.layerTagRow}>
          <span className={styles.layerNumber}>Layer {layer.layerIndex}</span>
          <div className={styles.layerDivider} aria-hidden="true" />
          <span className={styles.layerCategory}>{layer.category}</span>
        </div>

        <h3 id={headingId} className={styles.groupTitle}>
          {layer.layerName}
        </h3>

        {layer.description && (
          <p className={styles.groupDescription}>{layer.description}</p>
        )}
      </div>

      <div className={styles.skillsGrid}>
        {(layer.items || []).map((item) => (
          <SkillBar
            key={item.id}
            id={item.id}
            name={item.name}
            percent={item.percent}
            level={item.level}
            iconId={item.iconId}
            description={item.description}
            confirmed={item.confirmed}
          />
        ))}
      </div>
    </section>
  );
}

export default SkillGroup;
