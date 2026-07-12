'use client';

import { m } from 'framer-motion';
import { AmbientVideo } from './AmbientVideo';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * A single held breath before the close: the red slats loop, dimmed to a
 * glow, under one line of type.
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
      <div className="relative mx-auto flex min-h-[70svh] max-w-4xl items-center justify-center px-6 py-32 text-center">
        <m.p
          initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 1.1, ease }}
          className="font-playfair text-4xl italic leading-tight text-bone md:text-6xl"
        >
          The forge never cools.
        </m.p>
      </div>
    </section>
  );
}
