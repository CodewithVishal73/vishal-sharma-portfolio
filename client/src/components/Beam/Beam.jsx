import { useEffect, useRef, useState } from 'react';
import styles from './Beam.module.css';

export function Beam() {
  const fillRef = useRef(null);
  const headRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let rafId = null;

    const updateScrollProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;

      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${progress})`;
      }
      if (headRef.current) {
        headRef.current.style.top = `${progress * 100}%`;
      }
      setIsActive(progress > 0.005);
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className={styles.beamContainer}
      aria-hidden="true"
      data-active={isActive ? 'true' : 'false'}
    >
      <div className={styles.beamTrack} />
      <div ref={fillRef} className={styles.beamFill} style={{ transform: 'scaleY(0)' }} />
      <div ref={headRef} className={styles.beamHead} style={{ top: '0%' }} />
    </div>
  );
}

export default Beam;
