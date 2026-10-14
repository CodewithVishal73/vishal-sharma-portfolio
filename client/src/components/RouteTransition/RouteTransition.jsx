import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';
import styles from './RouteTransition.module.css';

export function RouteTransition({ children }) {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [announcement, setAnnouncement] = useState('');
  const [isWiping, setIsWiping] = useState(false);
  const wipePanelRef = useRef(null);

  // Focus the new h1 after transition and announce title
  const focusHeadingAndAnnounce = () => {
    // Scroll to top
    window.scrollTo(0, 0);

    setTimeout(() => {
      const heading = document.querySelector('main h1');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
        setAnnouncement(heading.textContent || document.title);
      } else {
        setAnnouncement(document.title);
      }
    }, 50);
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      focusHeadingAndAnnounce();
      return;
    }

    setIsWiping(true);
    // At midpoint (450ms), scroll to top
    const midTimer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 450);

    // At end (900ms), finish transition
    const endTimer = setTimeout(() => {
      setIsWiping(false);
      focusHeadingAndAnnounce();
    }, 900);

    return () => {
      clearTimeout(midTimer);
      clearTimeout(endTimer);
    };
  }, [location.pathname, prefersReducedMotion]);

  return (
    <div className={styles.transitionWrapper}>
      {/* Screen reader live announcement */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="visually-hidden"
      >
        {announcement}
      </div>

      {/* Reduced motion crossfade or normal view */}
      {prefersReducedMotion ? (
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          style={{ width: '100%' }}
        >
          {children}
        </motion.div>
      ) : (
        <>
          <div style={{ width: '100%' }}>{children}</div>

          {/* Wipe Overlay Panel */}
          <AnimatePresence>
            {isWiping && (
              <motion.div
                ref={wipePanelRef}
                className={styles.wipePanel}
                style={{ pointerEvents: 'all' }}
                initial={{ y: '100%' }}
                animate={{
                  y: ['100%', '0%', '0%', '-100%'],
                  transition: {
                    duration: 0.9,
                    times: [0, 0.48, 0.52, 1],
                    ease: [0.76, 0, 0.24, 1],
                  },
                }}
                exit={{ y: '-100%' }}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default RouteTransition;
