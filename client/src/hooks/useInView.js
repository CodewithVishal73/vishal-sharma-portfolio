import { useState, useEffect, useRef } from 'react';

export function useInView(options = { threshold: 0.1, once: true }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (options.once) {
          observer.unobserve(element);
        }
      } else if (!options.once) {
        setInView(false);
      }
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}
