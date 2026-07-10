'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const GLYPHS = '#/\\|<>+=·01';

interface DecodeTextProps {
  text: string;
  className?: string;
  /** Total settle time in ms. */
  duration?: number;
  delay?: number;
}

// DM Mono decode: characters resolve left to right from a scramble.
// Reduced motion renders the final string immediately.
export function DecodeText({ text, className = '', duration = 900, delay = 0 }: DecodeTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(text);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isInView || started) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setStarted(true);

    let frame: number;
    let start: number | null = null;

    const timer = setTimeout(() => {
      const tick = (now: number) => {
        if (start === null) start = now;
        const progress = Math.min((now - start) / duration, 1);
        const settled = Math.floor(progress * text.length);
        let out = text.slice(0, settled);
        for (let i = settled; i < text.length; i++) {
          const ch = text[i];
          out += ch === ' ' || ch === '·' ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setDisplay(out);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [isInView, started, text, duration, delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display}
    </span>
  );
}
