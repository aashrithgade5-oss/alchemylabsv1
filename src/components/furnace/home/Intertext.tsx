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
export function Intertext({
  eyebrow,
  children,
  compact = false,
}: {
  eyebrow?: string;
  children: ReactNode;
  /** Phase 5 (Landing_Page_Patches.pdf): "so much blank space" — this
      instance feeds directly into Pillars right after, so it gets the
      shorter stage instead of the standard 70svh breathing room. */
  compact?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // blur floor 12: the one scrub signature (matches fx/ScrollScrub)
  const opacity = useTransform(scrollYProgress, [0.08, 0.3, 0.7, 0.92], [0, 1, 1, 0]);
  const blurPx = useTransform(scrollYProgress, [0.08, 0.3, 0.7, 0.92], [12, 0, 0, 12]);
  const y = useTransform(scrollYProgress, [0, 1], [56, -56]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <section
      ref={ref}
      className={`relative flex items-center justify-center overflow-hidden px-6 ${compact ? 'min-h-[38svh]' : 'min-h-[70svh]'}`}
    >
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
        <p className="type-scroll mt-8 text-[clamp(2.25rem,4.6vw,4rem)] italic leading-[1.15] text-bone">
          {children}
        </p>
      </m.div>
    </section>
  );
}
