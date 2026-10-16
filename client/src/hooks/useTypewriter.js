import { useState, useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion.js';

export function useTypewriter(
  phrases = [],
  typingSpeed = 55,
  holdTime = 1600,
  deletingSpeed = 30
) {
  const prefersReducedMotion = useReducedMotion();
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // If reduced motion is requested, render the first phrase statically
    if (prefersReducedMotion) {
      if (phrases && phrases.length > 0) {
        setText(phrases[0]);
      }
      return;
    }

    if (!phrases || phrases.length === 0) return;
    const currentPhrase = phrases[phraseIndex % phrases.length];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentPhrase.substring(0, text.length + 1));
          if (text.length + 1 === currentPhrase.length) {
            setTimeout(() => setIsDeleting(true), holdTime);
          }
        } else {
          setText(currentPhrase.substring(0, text.length - 1));
          if (text.length - 1 === 0) {
            setIsDeleting(false);
            setPhraseIndex((prev) => prev + 1);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [
    text,
    isDeleting,
    phraseIndex,
    phrases,
    typingSpeed,
    holdTime,
    deletingSpeed,
    prefersReducedMotion,
  ]);

  return text;
}
