import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiLayers, FiCpu, FiDatabase, FiServer, FiUser, FiArrowRight, FiCheckCircle, FiInfo } from 'react-icons/fi';
import SectionShell from '../../components/SectionShell/SectionShell.jsx';
import {
  intelligenceCopy,
  intelligenceNodes,
  intelligenceScenarios,
} from '../../data/intelligence.js';
import styles from './Intelligence.module.css';

const NODE_ICONS = {
  'user-app': FiUser,
  'app-logic': FiServer,
  'api-layer': FiLayers,
  'ai-service': FiCpu,
  'db-context': FiDatabase,
};

export default function Intelligence() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedScenarioId, setSelectedScenarioId] = useState('augment-app');
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const containerRef = useRef(null);
  const nodeRefs = useRef({});
  const [svgEdges, setSvgEdges] = useState([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const activeScenario =
    intelligenceScenarios.find((s) => s.id === selectedScenarioId) ||
    intelligenceScenarios[0];

  const activeNode = selectedNodeId
    ? intelligenceNodes.find((n) => n.id === selectedNodeId)
    : null;

  // Calculate SVG connection coordinates for desktop grid layout
  const updateEdgeCoordinates = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    setContainerSize({ width: containerRect.width, height: containerRect.height });

    // Only compute SVG edges on desktop (≥ 768px)
    if (window.innerWidth < 768) {
      setSvgEdges([]);
      return;
    }

    const edges = [];
    const sequence = activeScenario.flowSequence || [];

    sequence.forEach((seq, idx) => {
      const fromEl = nodeRefs.current[seq.from];
      const toEl = nodeRefs.current[seq.to];

      if (fromEl && toEl) {
        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();

        const fromCenter = {
          x: fromRect.left - containerRect.left + fromRect.width / 2,
          y: fromRect.top - containerRect.top + fromRect.height / 2,
        };
        const toCenter = {
          x: toRect.left - containerRect.left + toRect.width / 2,
          y: toRect.top - containerRect.top + toRect.height / 2,
        };

        let start = { ...fromCenter };
        let end = { ...toCenter };

        // Calculate perimeter docking points based on relative geometry
        const dx = toCenter.x - fromCenter.x;
        const dy = toCenter.y - fromCenter.y;

        if (Math.abs(dx) > Math.abs(dy)) {
          // Horizontal flow
          if (dx > 0) {
            start.x = fromRect.right - containerRect.left;
            end.x = toRect.left - containerRect.left - 4;
          } else {
            start.x = fromRect.left - containerRect.left;
            end.x = toRect.right - containerRect.left + 4;
          }
        } else {
          // Vertical flow
          if (dy > 0) {
            start.y = fromRect.bottom - containerRect.top;
            end.y = toRect.top - containerRect.top - 4;
          } else {
            start.y = fromRect.top - containerRect.top;
            end.y = toRect.bottom - containerRect.top + 4;
          }
        }

        // Generate curved path for non-linear return connections
        let pathD = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
        if (Math.abs(dx) > 100 && Math.abs(dy) > 40) {
          const midX = (start.x + end.x) / 2;
          const midY = (start.y + end.y) / 2;
          pathD = `M ${start.x} ${start.y} Q ${midX} ${start.y} ${end.x} ${end.y}`;
        }

        edges.push({
          id: `${seq.from}-${seq.to}-${idx}`,
          label: seq.label,
          pathD,
          startX: start.x,
          startY: start.y,
          endX: end.x,
          endY: end.y,
        });
      }
    });

    setSvgEdges(edges);
  }, [activeScenario]);

  useEffect(() => {
    updateEdgeCoordinates();

    const handleResize = () => updateEdgeCoordinates();
    window.addEventListener('resize', handleResize);

    const observer = new ResizeObserver(() => updateEdgeCoordinates());
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [updateEdgeCoordinates]);

  // Keyboard navigation between scenario tabs
  const handleScenarioKeyDown = (e, index) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % intelligenceScenarios.length;
      setSelectedScenarioId(intelligenceScenarios[nextIndex].id);
      setSelectedNodeId(null);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex =
        (index - 1 + intelligenceScenarios.length) % intelligenceScenarios.length;
      setSelectedScenarioId(intelligenceScenarios[prevIndex].id);
      setSelectedNodeId(null);
    }
  };

  return (
    <SectionShell
      id="intelligence"
      nodeNumber="04"
      nodeLabel="INTELLIGENCE"
      title={intelligenceCopy.heading}
      subtitle={intelligenceCopy.subheading}
    >
      <div className={styles.sectionContainer}>
        {/* Scenario Selectors */}
        <div className={styles.scenarioBar} role="tablist" aria-label="Architecture scenarios">
          <span className={styles.scenarioBarLabel}>SCENARIO SELECTOR:</span>
          <div className={styles.scenarioButtonsGroup}>
            {intelligenceScenarios.map((scenario, idx) => {
              const isSelected = selectedScenarioId === scenario.id;
              return (
                <button
                  key={scenario.id}
                  id={`tab-${scenario.id}`}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls="intelligence-diagram-panel"
                  tabIndex={isSelected ? 0 : -1}
                  className={`${styles.scenarioButton} ${
                    isSelected ? styles.scenarioButtonActive : ''
                  }`}
                  onClick={() => {
                    setSelectedScenarioId(scenario.id);
                    setSelectedNodeId(null);
                  }}
                  onKeyDown={(e) => handleScenarioKeyDown(e, idx)}
                >
                  <span className={styles.scenarioNum}>{scenario.number} //</span>
                  <span className={styles.scenarioTitle}>{scenario.title}</span>
                  <span className={styles.scenarioBadge}>{scenario.tier}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Diagram Area */}
        <div
          id="intelligence-diagram-panel"
          role="tabpanel"
          aria-labelledby={`tab-${activeScenario.id}`}
          className={styles.diagramWrapper}
        >
          <div className={styles.diagramHeader}>
            <div className={styles.diagramHeaderLeft}>
              <span className={styles.layerLabel}>LAYER TOPOLOGY:</span>
              <h3 className={styles.layerTitle}>Intelligent Systems Layer</h3>
            </div>
            <div className={styles.activeScenarioIndicator}>
              <span className={styles.indicatorDot} aria-hidden="true" />
              <span>Active Path: {activeScenario.title}</span>
            </div>
          </div>

          {/* Desktop & Mobile Nodes Layout Container */}
          <div ref={containerRef} className={styles.nodesContainer}>
            {/* Desktop Dynamic SVG Overlay */}
            <svg
              className={styles.svgOverlay}
              width={containerSize.width}
              height={containerSize.height}
              aria-hidden="true"
            >
              <defs>
                <marker
                  id="arrow-mint"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--signal)" />
                </marker>
              </defs>

              {svgEdges.map((edge) => (
                <g key={edge.id}>
                  {/* Base path glow */}
                  <path
                    d={edge.pathD}
                    className={styles.edgeGlow}
                    fill="none"
                  />
                  {/* Active line */}
                  <path
                    d={edge.pathD}
                    className={styles.edgeLine}
                    fill="none"
                    markerEnd="url(#arrow-mint)"
                  />
                  {/* Travelling signal packet (disabled under reduced motion) */}
                  {!shouldReduceMotion && (
                    <circle r="3.5" className={styles.signalPacket}>
                      <animateMotion
                        path={edge.pathD}
                        dur="2.4s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              ))}
            </svg>

            {/* Grid of 5 Nodes (Buttons) */}
            <div className={styles.nodesGrid}>
              {intelligenceNodes.map((node, index) => {
                const IconComponent = NODE_ICONS[node.id] || FiLayers;
                const isInActivePath = activeScenario.pathNodes.includes(node.id);
                const isSelected = selectedNodeId === node.id;

                return (
                  <React.Fragment key={node.id}>
                    {/* Node Button */}
                    <button
                      ref={(el) => (nodeRefs.current[node.id] = el)}
                      type="button"
                      className={`${styles.nodeButton} ${styles[`gridSlot_${node.id}`]} ${
                        isInActivePath ? styles.nodeInPath : ''
                      } ${isSelected ? styles.nodeSelected : ''}`}
                      onClick={() => setSelectedNodeId(isSelected ? null : node.id)}
                      aria-pressed={isSelected}
                      aria-label={`${node.number} ${node.name}. Status: ${node.tier}. Role: ${node.role}. Click for details.`}
                    >
                      <div className={styles.nodeHeaderRow}>
                        <span className={styles.nodeIndex}>{node.number}</span>
                        <span
                          className={`${styles.nodeTierBadge} ${
                            styles[`tier_${node.statusVariant}`]
                          }`}
                        >
                          {node.tier}
                        </span>
                      </div>

                      <div className={styles.nodeBody}>
                        <div className={styles.iconCircle}>
                          <IconComponent className={styles.nodeIcon} aria-hidden="true" />
                        </div>
                        <span className={styles.nodeName}>{node.name}</span>
                        <span className={styles.nodeRole}>{node.role}</span>
                      </div>

                      {/* Small port dot */}
                      <span className={styles.nodePort} aria-hidden="true" />
                    </button>

                    {/* Mobile Arrow Connector (rendered between vertical stack items on < 768px) */}
                    {index < intelligenceNodes.length - 1 && (
                      <div
                        className={`${styles.mobileConnector} ${
                          isInActivePath ? styles.mobileConnectorActive : ''
                        }`}
                        aria-hidden="true"
                      >
                        <span className={styles.connectorLine} />
                        <span className={styles.connectorArrow}>▼</span>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Stable Detail Panel (aria-live polite) */}
          <div
            className={styles.detailPanel}
            role="region"
            aria-live="polite"
            aria-atomic="true"
            aria-label="Intelligence layer component details"
          >
            {activeNode ? (
              /* Node Detail View */
              <div className={styles.detailContent}>
                <div className={styles.detailHeader}>
                  <div className={styles.detailTitleGroup}>
                    <span className={styles.detailTypeLabel}>NODE SPECIFICATION //</span>
                    <h4 className={styles.detailName}>
                      {activeNode.number}. {activeNode.name}
                    </h4>
                  </div>
                  <span
                    className={`${styles.detailBadge} ${
                      styles[`tier_${activeNode.statusVariant}`]
                    }`}
                  >
                    {activeNode.tier}
                  </span>
                </div>

                <p className={styles.detailDescription}>{activeNode.description}</p>

                <div className={styles.detailMetaGrid}>
                  <div className={styles.detailMetaItem}>
                    <span className={styles.metaLabel}>ARCHITECTURAL ROLE:</span>
                    <span className={styles.metaValue}>{activeNode.role}</span>
                  </div>
                  <div className={styles.detailMetaItem}>
                    <span className={styles.metaLabel}>EVIDENCE SOURCE:</span>
                    <span className={styles.metaValue}>{activeNode.source}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.resetDetailBtn}
                  onClick={() => setSelectedNodeId(null)}
                >
                  <span>Return to Scenario Overview</span>
                  <FiArrowRight aria-hidden="true" />
                </button>
              </div>
            ) : (
              /* Scenario Detail View */
              <div className={styles.detailContent}>
                <div className={styles.detailHeader}>
                  <div className={styles.detailTitleGroup}>
                    <span className={styles.detailTypeLabel}>ACTIVE WORKFLOW SCENARIO //</span>
                    <h4 className={styles.detailName}>
                      {activeScenario.number}. {activeScenario.title}
                    </h4>
                  </div>
                  <span
                    className={`${styles.detailBadge} ${
                      styles[`tier_${activeScenario.statusVariant}`]
                    }`}
                  >
                    {activeScenario.tier}
                  </span>
                </div>

                <p className={styles.detailDescription}>{activeScenario.description}</p>

                {/* Step-by-step sequence in current scenario */}
                <div className={styles.sequenceSection}>
                  <span className={styles.sequenceTitle}>DATA FLOW SEQUENCE:</span>
                  <ol className={styles.sequenceList}>
                    {activeScenario.flowSequence.map((step, idx) => (
                      <li key={idx} className={styles.sequenceItem}>
                        <span className={styles.seqIndex}>0{idx + 1}</span>
                        <span className={styles.seqText}>{step.label}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className={styles.detailMetaGrid}>
                  <div className={styles.detailMetaItem}>
                    <span className={styles.metaLabel}>ENGINEERING TAKEAWAY:</span>
                    <span className={styles.metaValue}>{activeScenario.takeaway}</span>
                  </div>
                  <div className={styles.detailMetaItem}>
                    <span className={styles.metaLabel}>EVIDENCE CONTEXT:</span>
                    <span className={styles.metaValue}>{activeScenario.source}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Evidence Tiers Legend & Mandatory Caption */}
          <footer className={styles.diagramFooter}>
            <div className={styles.legend}>
              <span className={styles.legendHeading}>EVIDENCE TIERS:</span>
              <div className={styles.legendItems}>
                <div className={styles.legendItem}>
                  <span className={`${styles.legendDot} ${styles.tier_ok}`} aria-hidden="true" />
                  <span>Implemented & verified</span>
                </div>
                <div className={styles.legendItem}>
                  <span
                    className={`${styles.legendDot} ${styles.tier_signal}`}
                    aria-hidden="true"
                  />
                  <span>Demonstrated in a project</span>
                </div>
                <div className={styles.legendItem}>
                  <span
                    className={`${styles.legendDot} ${styles.tier_default}`}
                    aria-hidden="true"
                  />
                  <span>Conceptual / planned</span>
                </div>
              </div>
            </div>

            <p className={styles.captionNotice}>
              <FiInfo className={styles.captionIcon} aria-hidden="true" />
              <span>{intelligenceCopy.caption}</span>
            </p>
          </footer>
        </div>
      </div>
    </SectionShell>
  );
}
