import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile } from '../../data/profile';
import { Portrait } from '../Portrait/Portrait';
import { Typewriter } from '../Typewriter/Typewriter';
import useReducedMotion from '../../hooks/useReducedMotion';
import styles from './HeroRunway.module.css';

const SESSION_KEY = 'descent_hero_opened';

/**
 * Returns resting aperture geometry [top, right, bottom, left] based on viewport width
 * >= 1280px: 0 / 12% / 0 / 58%
 * 1024-1279px: 0 / 8% / 0 / 54%
 * 768-1023px: 0 / 6% / 8svh / 40%
 * < 768px: 0 / 0 / 30svh / 12%
 */
function getRestingGeometry(width) {
  if (width >= 1280) {
    return { top: 0, right: 12, bottom: 0, left: 58, bottomUnit: '%' };
  } else if (width >= 1024) {
    return { top: 0, right: 8, bottom: 0, left: 54, bottomUnit: '%' };
  } else if (width >= 768) {
    return { top: 0, right: 6, bottom: 8, left: 40, bottomUnit: 'svh' };
  } else {
    return { top: 0, right: 0, bottom: 30, left: 12, bottomUnit: 'svh' };
  }
}

export function HeroRunway() {
  const runwayRef = useRef(null);
  const stageRef = useRef(null);
  const apertureRef = useRef(null);
  const lightRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Viewport tracking for responsive geometry
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );

  const restingGeom = useMemo(() => getRestingGeometry(windowWidth), [windowWidth]);

  // Opening sequence states
  const [openingState, setOpeningState] = useState({
    hairlineDrawn: false,
    hairlineDone: false,
    apertureOpened: false,
    lightOn: false,
    vishalVisible: false,
    sharmaVisible: false,
    metaVisible: false,
  });

  // Pointer light & portrait parallax offset state
  const [focalOffset, setFocalOffset] = useState({ x: 0, y: 0 });
  const isFinePointer = useRef(true);

  // Framer Motion scroll tracking across runway (170svh total)
  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ['start start', 'end start'],
  });

  // Calculate fall-through clip-path expansion:
  // p 0 to 0.15: resting geometry
  // p 0.15 to 0.8: expands to inset(0% 0% 0% 0%)
  // p 0.8 to 1.0: remains inset(0% 0% 0% 0%)
  const clipProgress = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 0, 1, 1]);

  // Content drift & fade over p 0.2 to 0.7
  const apertureY = useTransform(scrollYProgress, [0.2, 0.7], ['0%', '-8%']);
  const apertureOpacity = useTransform(scrollYProgress, [0.2, 0.7], [1, 0]);

  // Meta controls fade over p 0.15 to 0.45
  const metaOpacity = useTransform(scrollYProgress, [0.15, 0.45], [1, 0]);

  // Name fades up and out over p 0.75 to 1.0
  const nameOpacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const nameY = useTransform(scrollYProgress, [0.75, 1], ['0px', '-35px']);

  // Dynamic clip-path string derived from clipProgress
  const [clipPathString, setClipPathString] = useState('');

  useEffect(() => {
    const unsubscribe = clipProgress.on('change', (v) => {
      if (prefersReducedMotion) {
        // In reduced motion, stay at resting geometry or static 100svh
        setClipPathString(
          `inset(${restingGeom.top}% ${restingGeom.right}% ${restingGeom.bottom}${restingGeom.bottomUnit} ${restingGeom.left}%)`
        );
        return;
      }
      const top = restingGeom.top * (1 - v);
      const right = restingGeom.right * (1 - v);
      const bottom = restingGeom.bottom * (1 - v);
      const left = restingGeom.left * (1 - v);
      setClipPathString(
        `inset(${top.toFixed(2)}% ${right.toFixed(2)}% ${bottom.toFixed(2)}${restingGeom.bottomUnit} ${left.toFixed(2)}%)`
      );
    });

    // Initialize current value
    const v = clipProgress.get();
    const top = restingGeom.top * (1 - v);
    const right = restingGeom.right * (1 - v);
    const bottom = restingGeom.bottom * (1 - v);
    const left = restingGeom.left * (1 - v);
    setClipPathString(
      `inset(${top.toFixed(2)}% ${right.toFixed(2)}% ${bottom.toFixed(2)}${restingGeom.bottomUnit} ${left.toFixed(2)}%)`
    );

    return () => unsubscribe();
  }, [clipProgress, restingGeom, prefersReducedMotion]);

  // Viewport resize listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // OPENING SEQUENCE
  useEffect(() => {
    if (prefersReducedMotion) {
      setOpeningState({
        hairlineDrawn: true,
        hairlineDone: true,
        apertureOpened: true,
        lightOn: true,
        vishalVisible: true,
        sharmaVisible: true,
        metaVisible: true,
      });
      return;
    }

    const hasOpened = Boolean(sessionStorage.getItem(SESSION_KEY));
    const timers = [];

    if (hasOpened) {
      // Shortened 400ms sequence for returning visits
      timers.push(
        setTimeout(() => {
          setOpeningState({
            hairlineDrawn: true,
            hairlineDone: true,
            apertureOpened: true,
            lightOn: true,
            vishalVisible: true,
            sharmaVisible: true,
            metaVisible: true,
          });
        }, 400)
      );
    } else {
      // Full orchestrator sequence <= 1.8s
      // t=0 hairline draws
      setOpeningState((s) => ({ ...s, hairlineDrawn: true }));

      // t=500ms aperture opens
      timers.push(
        setTimeout(() => {
          setOpeningState((s) => ({ ...s, apertureOpened: true }));
        }, 500)
      );

      // t=600ms hairline fades out
      timers.push(
        setTimeout(() => {
          setOpeningState((s) => ({ ...s, hairlineDone: true }));
        }, 600)
      );

      // t=650ms "Vishal" rises
      timers.push(
        setTimeout(() => {
          setOpeningState((s) => ({ ...s, vishalVisible: true }));
        }, 650)
      );

      // t=700ms light switches on
      timers.push(
        setTimeout(() => {
          setOpeningState((s) => ({ ...s, lightOn: true }));
        }, 700)
      );

      // t=760ms "Sharma" rises (+110ms after Vishal)
      timers.push(
        setTimeout(() => {
          setOpeningState((s) => ({ ...s, sharmaVisible: true }));
        }, 760)
      );

      // t=1100ms typewriter line & CTAs rise in
      timers.push(
        setTimeout(() => {
          setOpeningState((s) => ({ ...s, metaVisible: true }));
          sessionStorage.setItem(SESSION_KEY, 'true');
        }, 1100)
      );
    }

    return () => timers.forEach(clearTimeout);
  }, [prefersReducedMotion]);

  // POINTER LIGHT & LERP LOOP
  useEffect(() => {
    isFinePointer.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer.current || prefersReducedMotion) return;

    let targetX = 0.35;
    let targetY = 0.35;
    let curX = 0.35;
    let curY = 0.35;
    let isInside = false;
    let rafId = null;
    let isVisible = true;

    // Handle visibility changes to pause loop
    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const onPointerMove = (e) => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      isInside = true;
      targetX = (e.clientX - rect.left) / rect.width;
      targetY = (e.clientY - rect.top) / rect.height;
    };

    const onPointerLeave = () => {
      isInside = false;
      // Ease back to upper-left default position
      targetX = 0.35;
      targetY = 0.3;
    };

    const updateLoop = () => {
      if (isVisible) {
        curX += (targetX - curX) * 0.12;
        curY += (targetY - curY) * 0.12;

        if (lightRef.current) {
          lightRef.current.style.left = `${curX * 100}%`;
          lightRef.current.style.top = `${curY * 100}%`;
        }

        // Shift portrait +/-10px opposite to pointer
        const offsetX = (curX - 0.5) * -20;
        const offsetY = (curY - 0.5) * -20;
        setFocalOffset({ x: offsetX * 0.25, y: offsetY * 0.25 });
      }

      rafId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    rafId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  // Touch fallback: Light position shifts with scroll progress
  useEffect(() => {
    if (isFinePointer.current || prefersReducedMotion) return;
    const unsub = scrollYProgress.on('change', (p) => {
      if (lightRef.current) {
        lightRef.current.style.left = '50%';
        lightRef.current.style.top = `${30 + p * 40}%`;
      }
    });
    return () => unsub();
  }, [scrollYProgress, prefersReducedMotion]);

  // Opening clip calculation for aperture transition
  const apertureClip = openingState.apertureOpened
    ? clipPathString
    : 'inset(0% 50% 0% 50%)'; // Starts as hairline slit at center

  return (
    <section
      ref={runwayRef}
      className={styles.runwayContainer}
      aria-label="Hero Runway"
      style={{
        height: prefersReducedMotion ? '100svh' : '170svh',
      }}
    >
      <div ref={stageRef} className={styles.stickyStage}>
        {/* Layer A: Surface background */}
        <div className={styles.surfaceBackdrop} />

        {/* Initial Signal Hairline (t=0 to 600ms) */}
        {!openingState.hairlineDone && !prefersReducedMotion && (
          <motion.div
            className={styles.openingHairline}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        )}

        {/* Layer B: Deep Backdrop expanding via clip-path */}
        <div
          ref={apertureRef}
          className={styles.deepBackdrop}
          style={{
            clipPath: apertureClip,
            transition: openingState.apertureOpened
              ? 'none'
              : 'clip-path 0.9s cubic-bezier(0.76, 0, 0.24, 1)',
          }}
        >
          {/* Layer C: Aperture Content */}
          <motion.div
            className={styles.apertureContent}
            style={{
              y: prefersReducedMotion ? 0 : apertureY,
              opacity: prefersReducedMotion ? 1 : apertureOpacity,
            }}
          >
            {/* Ambient light wedge & light switch */}
            <div
              className={styles.ambientLightWedge}
              style={{
                opacity: openingState.lightOn ? 1 : 0.2,
                transition: 'opacity 1.1s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />

            {/* Pointer-following warm radial light */}
            <div ref={lightRef} className={styles.pointerGlow} />

            {/* Reusable Portrait with focal offset */}
            <div
              style={{
                width: 'clamp(280px, 32vw, 480px)',
                height: 'clamp(350px, 40vw, 600px)',
                position: 'relative',
                zIndex: 4,
              }}
            >
              <Portrait priority focalOffset={focalOffset} />
            </div>

            <div className={styles.apertureVignette} />
          </motion.div>
        </div>

        {/* Layer D: Hero Name <h1> with blend-mode difference */}
        <div className={styles.nameLayerWrapper}>
          <motion.h1
            className={styles.heroHeading}
            style={{
              opacity: prefersReducedMotion ? 1 : nameOpacity,
              y: prefersReducedMotion ? 0 : nameY,
            }}
          >
            <span className={styles.nameFirstMask}>
              <span
                className={styles.nameFirst}
                style={{
                  transform: openingState.vishalVisible ? 'translateY(0)' : 'translateY(105%)',
                  transition: prefersReducedMotion
                    ? 'none'
                    : 'transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {profile.shortName || 'Vishal'}
              </span>
            </span>

            <span className={styles.nameLastMask}>
              <span
                className={styles.nameLast}
                style={{
                  transform: openingState.sharmaVisible ? 'translateY(0)' : 'translateY(105%)',
                  transition: prefersReducedMotion
                    ? 'none'
                    : 'transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                Sharma
              </span>
            </span>
          </motion.h1>
        </div>

        {/* Layer E: Information, Typewriter, CTAs & Scroll Cue */}
        <div className={styles.metaLayerWrapper}>
          <motion.div
            className={styles.metaContent}
            style={{
              opacity: prefersReducedMotion ? 1 : metaOpacity,
              transform: openingState.metaVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: prefersReducedMotion
                ? 'none'
                : 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s ease-out',
            }}
          >
            <div className={styles.designation}>
              {profile.designation || 'BTech Computer Science · JK Lakshmipat University'}
            </div>

            <Typewriter roles={profile.typewriterRoles} />

            <div className={styles.ctaRow}>
              {/* Primary "Download CV" */}
              <a
                href={profile.cv?.pdf || '/cv/Vishal_Sharma_CV.pdf'}
                download="Vishal_Sharma_CV.pdf"
                className={styles.primaryCta}
                aria-label="Download Vishal Sharma CV in PDF format"
              >
                Download CV
              </a>

              {/* Text link "Word (.docx)" */}
              <a
                href={profile.cv?.docx || '/cv/Vishal_Sharma_CV.docx'}
                download="Vishal_Sharma_CV.docx"
                className={styles.wordLink}
                aria-label="Download CV in Word DOCX format"
              >
                Word (.docx)
              </a>

              {/* Secondary "View projects" */}
              <Link to="/projects" className={styles.secondaryCta}>
                View projects
              </Link>
            </div>
          </motion.div>

          {/* Scroll cue: vertical hairline + "Descend" */}
          <div className={styles.scrollCue} aria-hidden="true">
            <div className={styles.scrollCueHairline} />
            <span className={styles.scrollCueText}>Descend</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroRunway;
