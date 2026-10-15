import { useState, useEffect, useRef, useMemo } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';
import styles from './HeroBackdrop.module.css';

/**
 * Checks if the user has requested data saving via Network Information API
 */
function checkSaveData() {
  if (typeof navigator !== 'undefined' && navigator.connection) {
    return navigator.connection.saveData === true;
  }
  return false;
}

/**
 * HeroBackdrop
 *
 * Implements Task H1b: Hero Video Backdrop
 * - Video inside the aperture content layer, behind Portrait
 * - Responsive <source> elements (portrait max-aspect-ratio 1/1 first, WebM before MP4)
 * - Fallbacks: reduced motion, saveData, or autoplay rejection -> peak poster <img> only
 * - Pauses video when hero is off-screen or tab is hidden without React state updates
 * - Readability gradient overlays ensuring >= 4.5:1 contrast in both themes
 * - Restrained entrance coordinated with the aperture opening sequence
 */
export function HeroBackdrop({ lightOn = false, className = '' }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [autoplayFailed, setAutoplayFailed] = useState(false);

  // Check saveData connection mode
  const isSaveDataActive = useMemo(() => checkSaveData(), []);

  // Determine whether to use the static peak poster fallback
  const useFallback = prefersReducedMotion || isSaveDataActive || autoplayFailed;

  // Track aspect ratio for video start-poster
  const [isPortraitAspect, setIsPortraitAspect] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(max-aspect-ratio: 1/1)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(max-aspect-ratio: 1/1)');
    const handler = (e) => setIsPortraitAspect(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Autoplay attempt with rejection catch
  useEffect(() => {
    if (useFallback) return;
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay rejection: switch to peak poster fallback
        setAutoplayFailed(true);
      });
    }
  }, [useFallback]);

  // Performance: Pause video when off-screen or tab is hidden
  // CRITICAL: No React state updates for decorative playback!
  useEffect(() => {
    if (useFallback) return;
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video) return;

    let isIntersecting = true;
    let isDocVisible = !document.hidden;

    const syncPlayback = () => {
      if (isIntersecting && isDocVisible) {
        video.play()?.catch(() => {});
      } else {
        video.pause();
      }
    };

    const handleVisibility = () => {
      isDocVisible = !document.hidden;
      syncPlayback();
    };

    document.addEventListener('visibilitychange', handleVisibility);

    let observer;
    if (typeof IntersectionObserver !== 'undefined' && container) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isIntersecting = entry.isIntersecting;
            syncPlayback();
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      if (observer) observer.disconnect();
    };
  }, [useFallback]);

  // Restrained entrance opacity: coordinates with aperture opening light
  const entranceOpacity = prefersReducedMotion ? 1 : lightOn ? 1 : 0.15;

  return (
    <div
      ref={containerRef}
      className={`${styles.backdropWrapper} ${className}`}
      style={{
        opacity: entranceOpacity,
      }}
      aria-hidden="true"
    >
      {useFallback ? (
        /* Fallback: Render ONLY peak poster as <img> (no video downloaded) */
        <picture className={styles.posterPicture}>
          <source
            media="(max-aspect-ratio: 1/1)"
            srcSet="/media/hero-system-portrait-poster-peak.webp"
            type="image/webp"
          />
          <img
            src="/media/hero-system-landscape-poster-peak.webp"
            alt=""
            aria-hidden="true"
            className={styles.backdropMedia}
            width={isPortraitAspect ? '540' : '1280'}
            height={isPortraitAspect ? '960' : '720'}
            loading="eager"
            decoding="async"
          />
        </picture>
      ) : (
        /* Video playback with responsive source cascade */
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          poster={
            isPortraitAspect
              ? '/media/hero-system-portrait-poster-start.webp'
              : '/media/hero-system-landscape-poster-start.webp'
          }
          className={styles.video}
          width={isPortraitAspect ? '540' : '1280'}
          height={isPortraitAspect ? '960' : '720'}
        >
          {/* Portrait sources first with max-aspect-ratio: 1/1; WebM before MP4 */}
          <source
            src="/media/hero-system-portrait.webm"
            type="video/webm"
            media="(max-aspect-ratio: 1/1)"
          />
          <source
            src="/media/hero-system-portrait.mp4"
            type="video/mp4"
            media="(max-aspect-ratio: 1/1)"
          />

          {/* Landscape sources; WebM before MP4 */}
          <source src="/media/hero-system-landscape.webm" type="video/webm" />
          <source src="/media/hero-system-landscape.mp4" type="video/mp4" />
        </video>
      )}

      {/* Readability & Depth Gradient Overlays (ensures >= 4.5:1 contrast across text zones) */}
      <div className={styles.overlayDirectional} aria-hidden="true" />
      <div className={styles.overlayBottomScrim} aria-hidden="true" />
      <div className={styles.overlayVignette} aria-hidden="true" />
    </div>
  );
}

export default HeroBackdrop;
