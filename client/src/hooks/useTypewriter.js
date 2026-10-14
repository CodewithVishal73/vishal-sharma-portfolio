import { useState, useEffect } from 'react';
import useReducedMotion from './useReducedMotion';

/**
 * useTypewriter cycles through roles with typing and deleting phases.
 * Respects prefers-reduced-motion by returning the first role statically.
 */
export function useTypewriter(roles = [], typingSpeed = 65, deletingSpeed = 35, pauseDuration = 1800) {
  const prefersReducedMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!roles || roles.length === 0) return;
    if (prefersReducedMotion) {
      setDisplayText(roles[0]);
      return;
    }

    const currentFullRole = roles[roleIndex];
    let timeoutId;

    if (!isDeleting) {
      // Typing phase
      if (displayText.length < currentFullRole.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentFullRole.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Full word typed, pause before deleting
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentFullRole.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        // Word cleared, move to next role
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [roles, roleIndex, displayText, isDeleting, typingSpeed, deletingSpeed, pauseDuration, prefersReducedMotion]);

  const currentRole = roles && roles.length > 0 ? roles[roleIndex] : '';

  return {
    displayText: prefersReducedMotion ? roles[0] : displayText,
    currentRole,
    isReducedMotion: prefersReducedMotion,
  };
}

export default useTypewriter;
