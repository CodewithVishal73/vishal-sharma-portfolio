import { useState, useEffect, useCallback } from 'react';
import { getStoredTheme, applyTheme } from '../lib/theme.js';

export function useTheme() {
  const [theme, setTheme] = useState(getStoredTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(
    (event) => {
      const nextTheme = theme === 'light' ? 'dark' : 'light';

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // View Transitions API circular reveal animation
      if (
        !prefersReducedMotion &&
        typeof document !== 'undefined' &&
        typeof document.startViewTransition === 'function'
      ) {
        let x = window.innerWidth - 60;
        let y = 32;

        if (event && (event.clientX || event.clientY)) {
          x = event.clientX;
          y = event.clientY;
        }

        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
          setTheme(nextTheme);
          applyTheme(nextTheme);
        });

        transition.ready
          .then(() => {
            document.documentElement.animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${endRadius}px at ${x}px ${y}px)`,
                ],
              },
              {
                duration: 420,
                easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
                pseudoElement: '::view-transition-new(root)',
              }
            );
          })
          .catch(() => {
            setTheme(nextTheme);
            applyTheme(nextTheme);
          });
      } else {
        // Fallback crossfade / instant update
        setTheme(nextTheme);
        applyTheme(nextTheme);
      }
    },
    [theme]
  );

  return { theme, toggleTheme, setTheme };
}
