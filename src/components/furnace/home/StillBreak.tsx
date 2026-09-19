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
    <section className="relative h-[85svh] overflow-hidden">
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
        <m.p
          initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8, ease }}
          className="text-center font-playfair text-[clamp(1.75rem,4vw,3.5rem)] italic leading-[1.15] text-bone [text-wrap:balance] sm:whitespace-nowrap"
        >
          For founders who can tell the difference.
        </m.p>
      </div>
    </section>
  );
}
