import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Animated typing effect cycling through a list of words.
 * When the user prefers reduced motion, the first word is shown statically.
 */
export function useTypingWords(words, { typeSpeed = 90, deleteSpeed = 45, pause = 1600 } = {}) {
  const reducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(words[0] ?? '');

  useEffect(() => {
    if (reducedMotion || words.length === 0) {
      setDisplay(words[0] ?? '');
      return;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const word = words[wordIndex];
      charIndex += deleting ? -1 : 1;
      setDisplay(word.slice(0, charIndex));

      let delay = deleting ? deleteSpeed : typeSpeed;
      if (!deleting && charIndex === word.length) {
        delay = pause; // hold full word
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 300; // brief pause before next word
      }
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timer);
  }, [words, typeSpeed, deleteSpeed, pause, reducedMotion]);

  return display;
}
