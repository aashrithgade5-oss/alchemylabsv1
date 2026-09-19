'use client';

import { AmbientVideo } from './AmbientVideo';
import { ScrollScrub } from '../fx/ScrollScrub';

/**
 * A single held breath before the close: the red slats loop, dimmed to a
 * glow, under one line of type. Same scroll-scrubbed reveal as THE STANDARD
 * (FO4 W3.4) — the per-word blur-in kinetic signature, not a static fade.
 */
export function StudioMotion() {
  return (
    <section className="section-feather relative overflow-hidden">
      <AmbientVideo
        src="/media/red-slats-tall.mp4"
        poster="/media/red-slats-tall-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div aria-hidden className="absolute inset-0 bg-void/45" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-void to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-void to-transparent" />
      {/* Phase 9: condensed from min-h-[70svh] py-32 — "extremely large
          spacing... needs to be spaced even less". */}
      <div className="relative mx-auto flex min-h-[42svh] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center md:py-20">
        <div aria-hidden className="glass-halo absolute -inset-x-12 -inset-y-8 z-0" />
        {/* font-sans (Inter), not font-headline font-black — thinner
            weight per the brief. glass-type-thin: a true backdrop-filter
            text-mask was attempted and confirmed (via computed styles) to
            render fully invisible in Chrome — see index.css for the
            verification notes — so this uses the proven opaque glass-type
            mechanism at a lighter, higher-key value instead. */}
        {/* C-P16 descender fix: bg-clip:text renders glyph parts OUTSIDE the
            span's box as transparent — at leading-[1.05] the "g" descender
            fell below the line box and read as clipped. 1.25 contains it. */}
        <ScrollScrub
          text="The forge never cools."
          className="relative z-10 justify-center font-sans text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.25] tracking-[-0.03em] text-bone"
          wordClassName="glass-type-thin"
        />
      </div>
    </section>
  );
}
