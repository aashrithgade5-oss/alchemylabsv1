'use client';

import { useRef, type ReactNode } from 'react';
import {
  m,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

/**
 * Scroll-bound editorial interlude: the line sharpens out of a blur as it
 * enters the reader's focus band, holds, then dissolves as the next moment
 * arrives. Linked to scroll position (not a one-shot), so it tracks
 * scrubbing in both directions.
 */
export function Intertext({ eyebrow, children }: { eyebrow?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0.12, 0.38, 0.62, 0.88], [0, 1, 1, 0]);
  const blurPx = useTransform(scrollYProgress, [0.12, 0.38, 0.62, 0.88], [14, 0, 0, 14]);
  const y = useTransform(scrollYProgress, [0, 1], [56, -56]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <section ref={ref} className="relative flex min-h-[75svh] items-center justify-center px-6">
      <m.div
        style={reduced ? undefined : { opacity, filter, y }}
        className="max-w-3xl text-center"
      >
        {eyebrow && (
          <p className="font-mono text-[10px] tracking-[0.35em] text-ash">{eyebrow}</p>
        )}
        <p className="mt-6 font-playfair text-3xl italic leading-[1.3] text-bone md:text-5xl">
          {children}
        </p>
      </m.div>
    </section>
  );
}
