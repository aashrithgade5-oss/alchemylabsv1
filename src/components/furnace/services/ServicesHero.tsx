'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { MagneticCTA } from '../MagneticCTA';
import { InViewVideo } from './SvcMedia';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

/**
 * Full-bleed hero, restored to the original light-bar film (owner, Patches-4):
 * loop over its poster (poster always renders, so a missing mp4 degrades
 * cleanly), darkened for legibility, gentle transform-only parallax, plus a
 * slow ember breath on the floor. Reduced motion: poster only, no parallax.
 */
export function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '12%']);

  return (
    <section ref={sectionRef} className="relative flex min-h-[88svh] items-end overflow-hidden bg-void">
      <div aria-hidden className="absolute inset-0">
        <m.div className="absolute inset-0 will-change-transform" style={{ y: bgY, scale: 1.08 }}>
          <Image
            src="/media/svc/services-hero.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {!reduced && (
            <InViewVideo src="/media/svc/services-hero.mp4" poster="/media/svc/services-hero.webp" className="absolute inset-0 h-full w-full object-cover" />
          )}
        </m.div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,9,8,0.55) 0%, rgba(10,9,8,0.45) 35%, rgba(10,9,8,0.8) 75%, rgba(10,9,8,1) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(70% 60% at 20% 70%, rgba(10,9,8,0.55) 0%, transparent 70%)' }}
        />
        <div className="svc-breath absolute inset-x-0 bottom-0 h-1/2" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-40 md:px-12 md:pb-24 md:pt-48 lg:px-16">
        <m.p {...fade(0.05)} className="font-mono text-[10px] tracking-[0.3em] text-bone/70 md:text-[11px]">
          SERVICES · AI CREATIVE · BRAND SYSTEMS · ADVISORY
        </m.p>
        <m.h1
          {...fade(0.15)}
          className="mt-7 max-w-4xl font-headline text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-[1.02] tracking-[-0.04em] text-bone [text-wrap:balance]"
        >
          <span className="glass-type">Brand work built to </span>
          <span className="font-playfair font-normal italic">compound</span>
          <span className="glass-type">.</span>
        </m.h1>
        <m.p
          {...fade(0.35)}
          className="mt-6 max-w-2xl text-base leading-relaxed text-bone/80 md:text-lg [text-wrap:pretty]"
        >
          AI creative, brand systems and advisory, each scoped to the brief in front of us.
          Or begin with one of five focused offers.
        </m.p>
        <m.div {...fade(0.5)} className="mt-10 flex flex-wrap items-center gap-4">
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
