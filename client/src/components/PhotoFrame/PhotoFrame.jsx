import React, { useState } from 'react';
import Port from '../primitives/Port.jsx';
import styles from './PhotoFrame.module.css';

export default function PhotoFrame({ className = '' }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className={`${styles.frameWrapper} ${className}`}>
      <div className={styles.frame}>
        {/* Top Port indicator */}
        <div className={styles.portIndicator}>
          <Port active className={styles.framePort} />
          <span className="mono-label">PORT : 02</span>
        </div>

        {/* Scan line effect */}
        <div className={styles.scanLine} aria-hidden="true" />

        {/* Real photo if available */}
        {!imgError && (
          <img
            src="/photo/vishal.webp"
            alt="Vishal Sharma portrait"
            className={`${styles.photo} ${imgLoaded ? styles.photoVisible : ''}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}

        {/* Graceful Placeholder (initials "VS", no fake photos) */}
        {(!imgLoaded || imgError) && (
          <div className={styles.placeholder} aria-label="Portrait placeholder for Vishal Sharma">
            <div className={styles.monogram}>VS</div>
            <div className={styles.placeholderMeta}>
              <span className={styles.metaTitle}>VISHAL SHARMA</span>
              <span className={styles.metaSub}>B.Tech CSE · JKLU</span>
            </div>
            <div className={styles.cornerMarker} aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  );
}
