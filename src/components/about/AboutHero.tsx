'use client';

import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const typeY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden bg-void">
      <m.div aria-hidden className="absolute inset-0" style={reduced ? undefined : { y, scale }}>
        <video
          autoPlay={!reduced}
          loop
          muted
          playsInline
          preload="metadata"
          poster="/media/samurai-silhouette-1-poster.jpg"
          className="h-full w-full object-cover"
        >
          <source src="/media/samurai-silhouette-1.mp4" type="video/mp4" />
        </video>
      </m.div>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, #0A0908 0%, rgba(10,9,8,0.55) 45%, rgba(10,9,8,0.35) 100%), radial-gradient(ellipse 80% 70% at 50% 40%, transparent 0%, rgba(10,9,8,0.7) 100%)',
        }}
      />
      <m.div
        className="relative mx-auto w-full max-w-6xl px-6 pb-20 md:px-12 md:pb-28 lg:px-16"
        style={reduced ? undefined : { y: typeY }}
      >
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-mono text-[10px] tracking-[0.3em] text-bone/60 md:text-[11px]"
        >
          ABOUT · TWO FOUNDERS · MUMBAI
        </m.p>
        <m.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
          className="type-display glass-type mt-7 max-w-4xl text-[clamp(3rem,7vw,6.5rem)]"
        >
          Discipline in the system.
        </m.h1>
        <m.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease }}
          className="mt-6 max-w-xl font-playfair text-xl italic text-bone/70 md:text-2xl"
        >
          AI in the execution. Judgment in every frame that leaves the studio.
        </m.p>
      </m.div>
    </section>
  );
}
