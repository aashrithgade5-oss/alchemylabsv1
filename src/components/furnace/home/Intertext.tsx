'use client';

import { useRef, type ReactNode } from 'react';
import {
  m,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Meteors } from '../Meteors';
import { EmberField } from '@/components/fx/EmberField';

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
  // compact beats arrive sooner: less dead void between moments
  const inAt = compact ? [0.04, 0.26, 0.64, 0.9] : [0.12, 0.38, 0.62, 0.88];
  const opacity = useTransform(scrollYProgress, inAt, [0, 1, 1, 0]);
  const blurPx = useTransform(scrollYProgress, inAt, [12, 0, 0, 12]);
  const y = useTransform(scrollYProgress, [0, 1], [56, -56]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <section
      ref={ref}
      className={`relative flex items-center justify-center overflow-hidden px-6 ${compact ? 'min-h-[38svh]' : 'min-h-[70svh]'}`}
    >
      {/* Patches-6: liquid metal moving behind the line (was a static ember
          edge), radial-masked so it pools under the type and never boxes */}
      <EmberField preset="metal" mask="radial" opacity={0.75} />
      {/* R-7b: meteors live on pull-quote moments only (never heroes/CTAs) */}
      <Meteors />
      <m.div
        style={reduced ? undefined : { opacity, filter, y }}
        className="max-w-4xl text-center"
      >
        {eyebrow && (
          <p className="font-mono text-[10px] tracking-[0.35em] text-ash">{eyebrow}</p>
        )}
        {/* Inter Bold lines; the ONE emphasis word per line is an <em> —
            styled here as lowercase Playfair italic regular (emphasis law) */}
        <p className="mt-8 font-headline text-[clamp(2rem,4.4vw,3.75rem)] font-bold leading-[1.12] tracking-[-0.035em] text-bone [&_em]:font-playfair [&_em]:font-normal [&_em]:italic [&_em]:tracking-normal">
          {children}
        </p>
      </m.div>
    </section>
  );
}
