import React, { useId } from 'react';
import styles from './ArchitectureMini.module.css';

export default function ArchitectureMini({ architecture, className = '' }) {
  const markerId = useId();
  if (!architecture || !architecture.nodes) return null;

  const { title, description, type, nodes, edges } = architecture;
  const isPlanned = type === 'planned';

  // Standard 3-column topology coordinates
  const nodeLayout = [
    { x: 10, y: 15, width: 110, height: 90 },
    { x: 145, y: 15, width: 110, height: 90 },
    { x: 280, y: 15, width: 110, height: 90 },
  ];

  return (
    <div
      className={`${styles.container} ${className}`}
      role="img"
      aria-label={`Architecture diagram: ${description}`}
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

      <div className={styles.svgWrapper}>
        <svg
          viewBox="0 0 400 120"
          className={styles.svg}
          aria-hidden="true"
        >
          <defs>
            <marker
              id={markerId}
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--signal)" />
            </marker>
          </defs>

          {/* Edges connecting nodes */}
          {edges && edges.length >= 2 && (
            <>
              {/* Edge 1: Node 0 -> Node 1 */}
              <g>
                <path
                  d="M 120 60 L 143 60"
                  className={`${styles.edgePath} ${styles.edgePathActive}`}
                  markerEnd={`url(#${markerId})`}
                />
                {edges[0]?.label && (
                  <text x="132" y="50" className={styles.edgeLabel}>
                    {edges[0].label}
                  </text>
                )}
              </g>

              {/* Edge 2: Node 1 -> Node 2 */}
              <g>
                <path
                  d="M 255 60 L 278 60"
                  className={`${styles.edgePath} ${styles.edgePathActive}`}
                  markerEnd={`url(#${markerId})`}
                />
                {edges[1]?.label && (
                  <text x="267" y="50" className={styles.edgeLabel}>
                    {edges[1].label}
                  </text>
                )}
              </g>
            </>
          )}

          {/* Nodes */}
          {nodes.map((node, index) => {
            const layout = nodeLayout[index] || {
              x: 10 + index * 135,
              y: 15,
              width: 110,
              height: 90,
            };

            return (
              <g key={node.id || index}>
                {/* Node Box */}
                <rect
                  x={layout.x}
                  y={layout.y}
                  width={layout.width}
                  height={layout.height}
                  rx="8"
                  className={styles.nodeRect}
                />

                {/* Layer Tag */}
                <text
                  x={layout.x + 8}
                  y={layout.y + 18}
                  className={styles.nodeLayer}
                >
                  {node.layer}
                </text>

                {/* Node Label / Main Name */}
                <text
                  x={layout.x + 8}
                  y={layout.y + 36}
                  className={styles.nodeTitle}
                >
                  {node.label}
                </text>

                {/* Separator Line */}
                <line
                  x1={layout.x + 8}
                  y1={layout.y + 45}
                  x2={layout.x + layout.width - 8}
                  y2={layout.y + 45}
                  stroke="var(--line)"
                  strokeWidth="1"
                />

                {/* Detail text lines */}
                {node.detail && (
                  <foreignObject
                    x={layout.x + 8}
                    y={layout.y + 50}
                    width={layout.width - 16}
                    height={34}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: '8.5px',
                        fontFamily: 'var(--font-mono)',
                        lineHeight: '1.25',
                        color: 'var(--ink-muted)',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {node.detail}
                    </p>
                  </foreignObject>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
