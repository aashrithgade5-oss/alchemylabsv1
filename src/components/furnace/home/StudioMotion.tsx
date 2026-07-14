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
    <section className="relative overflow-hidden">
      <AmbientVideo
        src="/media/red-slats-tall.mp4"
        poster="/media/red-slats-tall-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div aria-hidden className="absolute inset-0 bg-void/45" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-void to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-void to-transparent" />
      <div className="relative mx-auto flex min-h-[70svh] max-w-4xl flex-col items-center justify-center px-6 py-32 text-center">
        <div aria-hidden className="glass-halo absolute -inset-x-12 -inset-y-8 z-0" />
        <ScrollScrub
          text="The forge never cools."
          className="relative z-10 justify-center font-headline text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.05] tracking-[-0.03em] text-bone"
          wordClassName="glass-type"
        />
      </div>
    </section>
  );
}
