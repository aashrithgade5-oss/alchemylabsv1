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
      {/* Phase 6 (Landing_Page_Patches.pdf): split-frames-1.webp was
          1600x896/19KB, flagged under-res for full bleed since FO4 P6.
          split-frames-2.png (2912x1632, same visual family, native res) was
          sitting completely unused in public/media — real replacement, not
          an upscale. split-frames-3.png is the OTHER native-res sibling,
          already spoken for by services/pillars.ts. */}
      <Image
        src="/media/split-frames-2.png"
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
        <m.h2
          initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8, ease }}
          className="whitespace-nowrap text-center font-playfair text-[clamp(0.85rem,4vw,3.5rem)] italic leading-[1.15] text-bone"
        >
          For founders who can tell the difference.
        </m.h2>
      </div>
    </section>
  );
}
