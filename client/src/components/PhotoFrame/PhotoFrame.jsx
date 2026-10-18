import React, { useState } from 'react';
import Port from '../primitives/Port.jsx';
import portraitImage from '../../assets/profile-portrait.png';
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
          <span className={styles.portLabel}>PORT : 02</span>
        </div>

        {/* Scan line effect */}
        <div className={styles.scanLine} aria-hidden="true" />

        {/* Real photo from local assets */}
        {!imgError && (
          <img
            src={portraitImage}
            alt="Portrait of Vishal Sharma"
            width={320}
            height={427}
            loading="eager"
            decoding="async"
            className={`${styles.photo} ${imgLoaded ? styles.photoVisible : ''}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}

        {/* Graceful Placeholder if image fails */}
        {imgError && (
          <div className={styles.placeholder} aria-label="Portrait placeholder for Vishal Sharma">
            <div className={styles.monogram}>VS</div>
          </div>
        )}

        {/* Identity card metadata & labels */}
        <div className={styles.cardFooter}>
          <span className={styles.metaTitle}>VISHAL SHARMA</span>
          <span className={styles.metaSub}>B.Tech CSE · JKLU</span>
        </div>

        {/* Corner marker */}
        <div className={styles.cornerMarker} aria-hidden="true" />
      </div>
    </div>
  );
}

