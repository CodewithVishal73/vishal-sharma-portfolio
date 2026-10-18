import React from 'react';
import styles from './ArchitectureMini.module.css';

export default function ArchitectureMini({ architecture, className = '' }) {
  if (!architecture || !architecture.nodes) return null;

  const { title, description, type, nodes, edges } = architecture;
  const isPlanned = type === 'planned';

  return (
    <div
      className={`${styles.container} ${className}`}
      role="region"
      aria-label={`Architecture diagram: ${title} - ${description}`}
    >
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <span className={styles.title}>{title}</span>
        </div>
        <span
          className={`${styles.typeBadge} ${
            isPlanned ? styles.typePlanned : styles.typeImplemented
          }`}
        >
          {isPlanned ? 'Planned Architecture' : 'Verified System'}
        </span>
      </div>

      <div className={styles.diagramWrapper}>
        <div className={styles.flowGrid}>
          {nodes.map((node, index) => {
            const edge = edges && edges[index];
            const hasNext = index < nodes.length - 1;

            return (
              <React.Fragment key={node.id || index}>
                {/* Architecture Node */}
                <div className={styles.nodeCard}>
                  <div className={styles.nodeHeader}>
                    <span className={styles.nodeLayer}>{node.layer}</span>
                  </div>
                  <h4 className={styles.nodeLabel}>{node.label}</h4>
                  <div className={styles.nodeDivider} />
                  {node.detail && (
                    <p className={styles.nodeDetail}>{node.detail}</p>
                  )}
                </div>

                {/* Connector between nodes */}
                {hasNext && (
                  <div className={styles.connector} aria-hidden="true">
                    {edge?.label && (
                      <span className={styles.edgeBadge} title={edge.label}>
                        {edge.label}
                      </span>
                    )}
                    {/* Horizontal Connector Line for Desktop */}
                    <div className={styles.arrowTrackHorizontal}>
                      <svg
                        className={styles.arrowSvg}
                        viewBox="0 0 48 10"
                        preserveAspectRatio="none"
                        fill="none"
                      >
                        <line
                          x1="0"
                          y1="5"
                          x2="40"
                          y2="5"
                          className={styles.arrowLine}
                        />
                        <polygon
                          points="40,2 47,5 40,8"
                          className={styles.arrowHead}
                        />
                      </svg>
                    </div>
                    {/* Vertical Connector Line for Mobile / Narrow Containers */}
                    <div className={styles.arrowTrackVertical}>
                      <svg
                        className={styles.arrowSvgVert}
                        viewBox="0 0 10 24"
                        preserveAspectRatio="none"
                        fill="none"
                      >
                        <line
                          x1="5"
                          y1="0"
                          x2="5"
                          y2="18"
                          className={styles.arrowLine}
                        />
                        <polygon
                          points="2,18 5,23 8,18"
                          className={styles.arrowHead}
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
