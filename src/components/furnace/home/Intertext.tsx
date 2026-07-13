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
    <section ref={ref} className="relative flex min-h-[70svh] items-center justify-center overflow-hidden px-6">
      {/* ember vignette bleeding one edge so the moment never sits on flat void */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-1/2"
        style={{
          background:
            'radial-gradient(46rem 32rem at 100% 50%, rgba(178,34,20,0.12) 0%, transparent 70%)',
        }}
      />
      <m.div
        style={reduced ? undefined : { opacity, filter, y }}
        className="max-w-4xl text-center"
      >
        {eyebrow && (
          <p className="font-mono text-[10px] tracking-[0.35em] text-ash">{eyebrow}</p>
        )}
        <p className="mt-8 font-fraunces text-[clamp(2rem,4vw,3.5rem)] italic leading-[1.25] text-bone">
          {children}
        </p>
      </m.div>
    </section>
  );
}
