import { useEffect, useState } from 'react';

/**
 * useToneColor detects the data-tone of the element currently beneath the sticky header.
 * This allows the header to adapt its contrast (e.g. when scrolling over a deep section
 * while in light theme).
 */
export function useToneColor() {
  const [tone, setTone] = useState('surface');

  useEffect(() => {
    let rafId = null;

    const checkTone = () => {
      // Sample element below the header (center x, ~35px y)
      const x = Math.min(Math.max(window.innerWidth / 2, 20), window.innerWidth - 20);
      const y = 35;
      const el = document.elementFromPoint(x, y);
      if (el) {
        const toneEl = el.closest('[data-tone]');
        if (toneEl) {
          const currentTone = toneEl.getAttribute('data-tone');
          if (currentTone && currentTone !== tone) {
            setTone(currentTone);
          }
        } else {
          setTone('surface');
        }
      }
    };

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkTone);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    checkTone();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [tone]);

  return tone;
}

export default useToneColor;
