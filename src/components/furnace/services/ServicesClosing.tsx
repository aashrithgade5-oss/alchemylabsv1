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
      <AmbientVideo
        src="/media/samurai-silhouette-2.mp4"
        poster="/media/samurai-silhouette-2-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div aria-hidden className="absolute inset-0 bg-void/50" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-void to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-void to-transparent" />
      <div className="relative mx-auto flex min-h-[70svh] max-w-4xl flex-col items-center justify-center px-6 py-32 text-center">
        <m.p
          initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8, ease }}
          className="font-playfair text-[clamp(2rem,4vw,3.5rem)] italic leading-[1.1] text-bone"
        >
          Scope it in one conversation.
        </m.p>
        <m.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="mt-12"
        >
          <MagneticCTA href="/contact" variant="ember">
            Begin
          </MagneticCTA>
        </m.div>
      </div>
    </section>
  );
}
