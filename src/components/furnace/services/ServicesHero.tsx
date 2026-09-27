'use client';

import { useRef, useState } from 'react';
import { getImageProps } from 'next/image';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { MagneticCTA } from '../MagneticCTA';
import { InViewVideo } from './SvcMedia';
import { SVC_HERO } from './mediaRegistry';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

// Headline words rise in one by one (transform + opacity only).
const lead = ['Brand', 'work', 'built', 'to'];

/**
 * Full-bleed hero: molten ember glass poured onto black stone. Desktop (md+)
 * gets the 6s seamless loop over its own first frame; phones get the 9:16
 * still composed for a tall screen; reduced motion never mounts the video.
 * The pour lives right of centre / top; the headline owns the dark lower-left,
 * with a text-scoped vignette behind it for legibility over the glow.
 */
const common = { alt: '', sizes: '100vw', priority: true } as const;
const { props: wideProps } = getImageProps({ ...common, src: SVC_HERO.wide, width: 2688, height: 1520, quality: 75 });
const { props: tallProps } = getImageProps({ ...common, src: SVC_HERO.tall, width: 1520, height: 2688, quality: 75 });

// Optimized 1920w frame of the still for the <video> poster attribute.
const posterUrl = `/_next/image?url=${encodeURIComponent(SVC_HERO.wide)}&w=1920&q=75`;

export function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '10%']);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '-12%']);

  return (
    <section ref={sectionRef} className="relative flex min-h-[92svh] items-end overflow-hidden bg-void">
      <div aria-hidden className="absolute inset-0">
        <m.div
          className="absolute inset-0 will-change-transform"
          style={{ y: bgY }}
          initial={reduced ? false : { scale: 1.12 }}
          animate={{ scale: 1.06 }}
          transition={{ duration: 1.8, ease }}
        >
          {/* art-directed <picture>: phones get the tall composition, md+ the
              wide one; only the matching source is downloaded */}
          <picture>
            <source media="(min-width: 768px)" srcSet={wideProps.srcSet} sizes="100vw" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...tallProps}
              className="absolute inset-0 h-full w-full object-cover [object-position:60%_30%] md:[object-position:70%_50%]"
            />
          </picture>
          <InViewVideo
            src={SVC_HERO.loop}
            poster={posterUrl}
            minWidth={768}
            onPlaying={() => setPlaying(true)}
            className={`absolute inset-0 hidden h-full w-full object-cover transition-opacity duration-1000 md:block ${
              playing ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ objectPosition: '70% 50%' }}
          />
        </m.div>
        {/* floor fade into the page + a left-side falloff for the copy column */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,9,8,0.35) 0%, rgba(10,9,8,0.05) 30%, rgba(10,9,8,0.55) 72%, rgba(10,9,8,1) 100%)',
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{ background: 'linear-gradient(to right, rgba(10,9,8,0.7) 0%, rgba(10,9,8,0.2) 45%, transparent 65%)' }}
        />
      </div>

      <m.div
        style={{ y: copyY }}
        className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-40 md:px-12 md:pb-24 md:pt-48 lg:px-16"
      >
        {/* text-scoped vignette: sits between the media and the copy */}
        <div aria-hidden className="text-vignette pointer-events-none absolute -inset-x-6 -inset-y-10 md:-inset-x-10 md:right-1/3" />
        <div className="relative">
          <m.p {...fade(0.05)} className="font-mono text-[10px] tracking-[0.3em] text-bone/70 md:text-[11px]">
            SERVICES · AI CREATIVE · BRAND SYSTEMS · ADVISORY
          </m.p>
          <h1 className="mt-7 max-w-4xl font-headline text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-[1.02] tracking-[-0.04em] text-bone [text-wrap:balance]">
            {lead.map((w, i) => (
              <m.span
                key={w}
                className="inline-block"
                initial={reduced ? false : { opacity: 0, y: '0.4em' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.07, ease }}
              >
                <span className="glass-type">{w}</span>
                {' '}
              </m.span>
            ))}
            <m.span
              className="inline-block"
              initial={reduced ? false : { opacity: 0, y: '0.4em' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 + lead.length * 0.07, ease }}
            >
              <span className="font-playfair font-normal italic">compound</span>
              <span className="glass-type">.</span>
            </m.span>
          </h1>
          <m.p
            {...fade(0.55)}
            className="mt-6 max-w-2xl text-base leading-relaxed text-bone/80 md:text-lg [text-wrap:pretty]"
          >
            Three pillars, one standard: AI creative, brand systems and advisory, scoped per project.
            Or start small with one of five focused offers.
          </m.p>
          <m.div {...fade(0.7)} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticCTA href="/contact" variant="ember">
              Book a call
            </MagneticCTA>
            <MagneticCTA href="#the-five" variant="ghost">
              See the focused offers
            </MagneticCTA>
          </m.div>
        </div>
      </m.div>

      {/* scroll cue: a single ember hairline that breathes (transform only) */}
      <div aria-hidden className="pointer-events-none absolute bottom-6 left-1/2 hidden h-10 w-px -translate-x-1/2 overflow-hidden bg-bone/10 md:block">
        {!reduced && (
          <m.span
            className="absolute inset-x-0 top-0 block h-1/2 bg-ember"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
          />
        )}
      </div>
    </section>
  );
}
