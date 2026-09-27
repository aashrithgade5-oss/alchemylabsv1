'use client';

import { m } from 'framer-motion';
import { AmbientVideo } from '../home/AmbientVideo';
import { MagneticCTA } from '../MagneticCTA';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Closing band: the turning samurai loops dim under one editorial line and
 * the single contact CTA. Same feathered-video pattern as StudioMotion.
 */
export function ServicesClosing() {
  return (
    <section className="relative overflow-hidden">
      {/* C-P20: unique studio-reel footage (compressed this session from
          ai-media-gen-2.mov) replaces the samurai loop */}
      <AmbientVideo
        src="/media/ai-media-gen-2.mp4"
        poster="/media/ai-media-gen-2-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div aria-hidden className="absolute inset-0 bg-void/50" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-void to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-void to-transparent" />
      <div className="relative mx-auto flex min-h-[70svh] max-w-4xl flex-col items-center justify-center px-6 py-32 text-center">
        <m.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8, ease }}
          className="font-headline text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-bone"
        >
          <span className="glass-type">Scope it in one </span>
          <span className="font-playfair font-normal italic">conversation</span>
          <span className="glass-type">.</span>
        </m.p>
        <m.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticCTA href="/contact" variant="ember">
            Book a call
          </MagneticCTA>
          <MagneticCTA href="#the-five" variant="ghost">
            See the focused offers
          </MagneticCTA>
        </m.div>
      </div>
    </section>
  );
}
