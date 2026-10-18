import React, { useState, useEffect, useRef } from 'react';
import portraitImage from '../../assets/profile-portrait.png';
import styles from './PhotoFrame.module.css';

export default function PhotoFrame({ className = '' }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setImgLoaded(true);
    }
  }, []);

  return (
    <div className={`${styles.frameWrapper} ${className}`}>
      <div className={styles.frame}>
        {/* Real photo from local assets */}
        {!imgError && (
          <img
            ref={imgRef}
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

        {/* Subtle bottom-right mint-green corner accent */}
        <div className={styles.cornerMarker} aria-hidden="true" />
      </div>
    </div>
  );
}

