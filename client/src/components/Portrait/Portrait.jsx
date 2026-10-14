import { portraitConfig as defaultConfig } from '../../config/portrait.config';
import styles from './Portrait.module.css';

export function Portrait({
  config = defaultConfig,
  priority = false,
  className = '',
  style = {},
  focalOffset = { x: 0, y: 0 },
}) {
  const cfg = { ...defaultConfig, ...config };
  const hasPhoto = Boolean(cfg.src);

  // Compute focal positions with interactive offset
  const desktopPosition = `${cfg.focalX + focalOffset.x}% ${cfg.focalY + focalOffset.y}%`;
  const mobilePosition = `${cfg.mobileFocalX + focalOffset.x}% ${cfg.mobileFocalY + focalOffset.y}%`;

  return (
    <div
      className={`${styles.portraitContainer} ${className}`}
      style={style}
      aria-hidden={!hasPhoto}
    >
      {hasPhoto ? (
        <div className={styles.photoWrapper}>
          <picture>
            <source
              type="image/webp"
              srcSet={`
                /images/portrait/portrait-800.webp 800w,
                /images/portrait/portrait-1200.webp 1200w,
                /images/portrait/portrait-1600.webp 1600w
              `}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
            />
            <img
              src={cfg.src}
              alt={cfg.alt || 'Vishal Sharma'}
              width={cfg.width || 1600}
              height={cfg.height || 2000}
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : 'auto'}
              className={styles.portraitImg}
              style={{
                objectPosition:
                  typeof window !== 'undefined' && window.innerWidth < 768
                    ? mobilePosition
                    : desktopPosition,
              }}
            />
          </picture>
          <div className={styles.warmMultiplyOverlay} aria-hidden="true" />
          <div className={styles.edgeFeatherMask} aria-hidden="true" />
        </div>
      ) : (
        /* Lit Doorway Aperture Placeholder with VS Monogram */
        <div className={styles.placeholderBox}>
          <div className={styles.lightWedge} aria-hidden="true" />
          <div className={styles.placeholderVignette} aria-hidden="true" />
          <span className={styles.monogram} aria-hidden="true">
            VS
          </span>
        </div>
      )}
    </div>
  );
}

export default Portrait;
