'use client';

import Image from 'next/image';
import { m } from 'framer-motion';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Full-bleed cinematic still: the split-frame image runs edge to edge and
 * the editorial line sits across the center seam.
 */
export function StillBreak() {
  return (
    <section id="for-founders" className="section-feather relative h-[85svh] overflow-hidden">
      {/* C-P15: the split-frames composition's hard center seam read as a
          glitch/artifact behind the line (user report). Replaced with
          b2-bomber-2 (2912x1632 native → 2560w webp, no upscale) — unique
          on the site, and the stealth-precision tone matches "founders who
          can tell the difference". */}
      <Image
        src="/media/b2-bomber-2.webp"
        alt=""
        fill
        quality={90}
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-void/40" />
      {/* feathered boundaries: the still emerges from the field, no hard cut */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-void to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-void to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        {/* Patches-6: editorial pairing. Inter Bold carries the line, the ONE
            emphasis word is Playfair italic regular (emphasis relock); the
            mono rule above it gives the line an editorial masthead. */}
        <m.div
          initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col items-center text-center"
        >
          <p className="flex items-center gap-4 font-mono text-[10px] tracking-[0.35em] text-bone/60">
            <span aria-hidden className="h-px w-10 bg-bone/30" />
            WHO WE WORK WITH
            <span aria-hidden className="h-px w-10 bg-bone/30" />
          </p>
          <p className="mt-7 max-w-5xl font-headline text-[clamp(2.25rem,5.6vw,5.25rem)] font-bold leading-[1.02] tracking-[-0.045em] text-bone [text-wrap:balance]">
            <span className="glass-type">For founders who can tell the </span>
            <span className="font-playfair font-normal italic tracking-[-0.01em] text-bone">difference.</span>
          </p>
        </m.div>
      </div>
    </section>
  );
}
