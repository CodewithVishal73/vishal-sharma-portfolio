import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';
import styles from './SkillsStack3D.module.css';

/**
 * Plane 1 (Bottom): Foundation Layer (Languages & Core Systems)
 */
function FoundationPlaneSvg({ isActive }) {
  return (
    <svg viewBox="0 0 280 180" className={styles.planeSvg} fill="none">
      <rect x="2" y="2" width="276" height="176" className={styles.planeSurface} />

      {/* Grid structure */}
      <path
        d="M20 40h240M20 80h240M20 120h240M20 160h240M60 20v140M120 20v140M180 20v140M240 20v140"
        className={styles.schematicLine}
        strokeDasharray="2 3"
      />

      {/* Memory & Register blocks */}
      <rect x="30" y="30" width="34" height="22" rx="2" className={styles.schematicLineAccent} />
      <rect x="74" y="30" width="34" height="22" rx="2" className={styles.schematicLineAccent} />
      <rect x="118" y="30" width="34" height="22" rx="2" className={styles.schematicLineAccent} />
      <rect x="162" y="30" width="34" height="22" rx="2" className={styles.schematicLineAccent} />

      {/* Foundation symbols / terminal glyphs */}
      <path d="M40 70l6 6-6 6M52 82h12" className={styles.schematicLineAccent} />
      <path d="M130 65v30M115 80h30" className={styles.schematicLineAccent} />
      <circle cx="210" cy="80" r="14" className={styles.schematicLineAccent} strokeDasharray="3 3" />

      {/* Table rows schematic */}
      <rect x="30" y="105" width="220" height="14" rx="2" className={styles.schematicLine} />
      <rect x="30" y="125" width="220" height="14" rx="2" className={styles.schematicLine} />
      <rect x="30" y="145" width="220" height="14" rx="2" className={styles.schematicLine} />

      {/* Technical Labels */}
      <text x="26" y="18" className={styles.schematicText}>
        LAYER 01 // FOUNDATION (LANGUAGES & DATA CORE)
      </text>
      <text x="210" y="18" className={styles.schematicText}>
        [0x00_INIT]
      </text>

      {isActive && (
        <circle cx="16" cy="15" r="3.5" className={styles.activeBeacon} />
      )}
    </svg>
  );
}

/**
 * Plane 2 (Middle): Service Layer (Backend & Databases)
 */
function ServicePlaneSvg({ isActive }) {
  return (
    <svg viewBox="0 0 280 180" className={styles.planeSvg} fill="none">
      <rect x="2" y="2" width="276" height="176" className={styles.planeSurface} />

      {/* REST API & Node pathways */}
      <path
        d="M40 90h50l30-40h60l30 40h40M120 50l30 40M120 130l30-40M90 90l30 40h60"
        className={isActive ? styles.schematicLineAccent : styles.schematicLine}
        strokeWidth="1.6"
      />

      {/* Microservice & Database nodes */}
      <circle cx="40" cy="90" r="10" className={styles.schematicLineAccent} />
      <circle cx="120" cy="50" r="12" className={styles.schematicLineAccent} />
      <circle cx="180" cy="50" r="10" className={styles.schematicLineAccent} />
      <circle cx="150" cy="90" r="14" className={styles.schematicLineAccent} />
      <circle cx="120" cy="130" r="10" className={styles.schematicLineAccent} />
      <circle cx="180" cy="130" r="12" className={styles.schematicLineAccent} />
      <circle cx="240" cy="90" r="10" className={styles.schematicLineAccent} />

      {/* Database cylinder glyph */}
      <ellipse cx="230" cy="40" rx="14" ry="5" className={styles.schematicLineAccent} />
      <path d="M216 40v12c0 2.76 6.27 5 14 5s14-2.24 14-5V40" className={styles.schematicLineAccent} />

      {/* Token badge */}
      <rect x="36" y="132" width="36" height="18" rx="3" className={styles.schematicLineAccent} />
      <text x="42" y="145" className={styles.schematicText}>
        JWT
      </text>

      {/* Technical Labels */}
      <text x="26" y="18" className={styles.schematicText}>
        LAYER 02 // SERVICE (APIS & DISTRIBUTED RUNTIMES)
      </text>
      <text x="210" y="18" className={styles.schematicText}>
        [REST_200]
      </text>

      {isActive && (
        <circle cx="16" cy="15" r="3.5" className={styles.activeBeacon} />
      )}
    </svg>
  );
}

/**
 * Plane 3 (Top): Interface Layer (Frontend, UI & Tools)
 */
function InterfacePlaneSvg({ isActive }) {
  return (
    <svg viewBox="0 0 280 180" className={styles.planeSvg} fill="none">
      <rect x="2" y="2" width="276" height="176" className={styles.planeSurface} />

      {/* UI Window / Browser frame */}
      <rect x="24" y="28" width="232" height="128" rx="6" className={styles.schematicLineAccent} />
      <path d="M24 46h232" className={styles.schematicLine} />
      <circle cx="34" cy="37" r="2.5" className={styles.schematicLineAccent} />
      <circle cx="42" cy="37" r="2.5" className={styles.schematicLine} />
      <circle cx="50" cy="37" r="2.5" className={styles.schematicLine} />

      {/* Responsive layout columns */}
      <rect x="34" y="56" width="60" height="88" rx="3" className={styles.schematicLine} />
      <rect x="104" y="56" width="140" height="40" rx="3" className={styles.schematicLine} />
      <rect x="104" y="104" width="66" height="40" rx="3" className={styles.schematicLineAccent} />
      <rect x="178" y="104" width="66" height="40" rx="3" className={styles.schematicLine} />

      {/* Cursor symbol */}
      <path d="M85 95l8 20 5-2 3 7 4-2-3-7 6-2-23-14z" className={styles.schematicLineAccent} />

      {/* Technical Labels */}
      <text x="26" y="18" className={styles.schematicText}>
        LAYER 03 // INTERFACE (VIEWPORTS & COMPONENT GRAPH)
      </text>
      <text x="215" y="18" className={styles.schematicText}>
        [DOM_TREE]
      </text>

      {isActive && (
        <circle cx="16" cy="15" r="3.5" className={styles.activeBeacon} />
      )}
    </svg>
  );
}

export function SkillsStack3D({
  scrollProgress,
  activeLayer = 'languages-foundations',
  className = '',
}) {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [isFinePointer, setIsFinePointer] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  });

  // Motion values for fine-pointer spring tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  // Spring tilt values in degrees (+/- 4deg max)
  const tiltRotateX = useTransform(springY, [-1, 1], [4, -4]);
  const tiltRotateZ = useTransform(springX, [-1, 1], [-4, 4]);

  // Scroll-linked Z-positions for the 3 planes
  // Stage A: Collapsed (close together)
  // Stage B: Mid-scroll (separating)
  // Stage C: Exploded (clearly separated)
  const zPlane1 = 0;
  const rawZPlane2 = useTransform(
    scrollProgress,
    [0, 0.45, 0.95],
    [24, 75, 140]
  );
  const rawZPlane3 = useTransform(
    scrollProgress,
    [0, 0.45, 0.95],
    [48, 150, 280]
  );

  // Reduced motion static fallback values
  const zPlane2 = prefersReducedMotion ? 75 : rawZPlane2;
  const zPlane3 = prefersReducedMotion ? 150 : rawZPlane3;

  // Active layer mapping
  const isPlane1Active =
    activeLayer === 'languages-foundations' || activeLayer === 'foundation';
  const isPlane2Active =
    activeLayer === 'backend-databases' || activeLayer === 'service';
  const isPlane3Active =
    activeLayer === 'frontend-tools' || activeLayer === 'interface';

  const activeLayerTitle = useMemo(() => {
    if (isPlane1Active) return '01 / Languages & Foundations';
    if (isPlane2Active) return '02 / Backend & Databases';
    return '03 / Frontend, Tools & Engineering';
  }, [isPlane1Active, isPlane2Active]);

  // Fine-pointer detection & listener
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const onMediaChange = (e) => setIsFinePointer(e.matches);
    media.addEventListener('change', onMediaChange);

    return () => media.removeEventListener('change', onMediaChange);
  }, []);

  const handlePointerMove = (e) => {
    if (!isFinePointer || prefersReducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    mouseX.set(Math.max(-1, Math.min(1, normX)));
    mouseY.set(Math.max(-1, Math.min(1, normY)));
  };

  const handlePointerLeave = () => {
    if (!isFinePointer || prefersReducedMotion) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.stackStickyWrapper} ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-hidden="true"
    >
      <div className={styles.stackPerspectiveStage}>
        <motion.div
          className={styles.isometricTransformRig}
          style={{
            transformStyle: 'preserve-3d',
            rotateX: prefersReducedMotion ? 58 : 58,
            rotateZ: prefersReducedMotion ? -32 : -32,
            x: isFinePointer && !prefersReducedMotion ? tiltRotateZ : 0,
            y: isFinePointer && !prefersReducedMotion ? tiltRotateX : 0,
          }}
        >
          {/* Plane 1: Foundation (Bottom) */}
          <motion.div
            className={`${styles.plane3DLayer} ${
              isPlane1Active ? styles.planeActive : styles.planeInactive
            }`}
            style={{
              transform: `translateZ(${zPlane1}px)`,
            }}
          >
            <FoundationPlaneSvg isActive={isPlane1Active} />
          </motion.div>

          {/* Plane 2: Service (Middle) */}
          <motion.div
            className={`${styles.plane3DLayer} ${
              isPlane2Active ? styles.planeActive : styles.planeInactive
            }`}
            style={{
              z: zPlane2,
            }}
          >
            <ServicePlaneSvg isActive={isPlane2Active} />
          </motion.div>

          {/* Plane 3: Interface (Top) */}
          <motion.div
            className={`${styles.plane3DLayer} ${
              isPlane3Active ? styles.planeActive : styles.planeInactive
            }`}
            style={{
              z: zPlane3,
            }}
          >
            <InterfacePlaneSvg isActive={isPlane3Active} />
          </motion.div>
        </motion.div>
      </div>

      {/* Active layer status badge */}
      <div className={styles.stackMetaBar}>
        <div className={styles.activeIndicatorDot} />
        <span>Active Plane:</span>
        <span className={styles.activeLayerLabel}>{activeLayerTitle}</span>
      </div>
    </div>
  );
}

export default SkillsStack3D;
