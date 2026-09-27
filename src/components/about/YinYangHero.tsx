'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { getImageProps } from 'next/image';
import { ABOUT_HERO_LOOP, ABOUT_HERO_TALL, ABOUT_HERO_WIDE } from '@lib/hf';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Art-directed hero (Patches-3): two founders facing the furnace. Phones get
// the vertical frame, desktops the wide one, via <picture> so each device
// downloads exactly one image. The old 14.8MB video at 18% opacity (read as
// an empty black hero) and the particle canvas are gone.
function HeroMedia() {
  const common = { alt: '', sizes: '100vw', quality: 80, priority: true } as const;
  const {
    props: { srcSet: wide },
  } = getImageProps({ ...common, src: ABOUT_HERO_WIDE, width: 2688, height: 1152 });
  const {
    props: { srcSet: tall, ...rest },
  } = getImageProps({ ...common, src: ABOUT_HERO_TALL, width: 1520, height: 2688 });
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={wide} />
      <source media="(max-width: 767px)" srcSet={tall} />
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img {...rest} className="absolute inset-0 h-full w-full object-cover object-[50%_35%] md:object-[70%_50%]" />
    </picture>
  );
}

export const YinYangHero = memo(() => {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [loopReady, setLoopReady] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [0, 0.7]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');
    setDesktop(mq.matches);
  }, []);

  return (
    <section ref={sectionRef} className="relative flex h-[100svh] min-h-[560px] flex-col justify-end overflow-hidden bg-void">
      <m.div className="absolute inset-0" style={reduced ? undefined : { scale: mediaScale }}>
        <HeroMedia />
        {desktop && ABOUT_HERO_LOOP && (
          <video
            src={ABOUT_HERO_LOOP}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            onCanPlay={() => setLoopReady(true)}
            className="absolute inset-0 h-full w-full object-cover object-[70%_50%] transition-opacity duration-1000"
            style={{ opacity: loopReady ? 1 : 0 }}
          />
        )}
      </m.div>

      {/* legibility: void from the text side, feathered top and bottom */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-void/40 md:bg-gradient-to-r md:from-void/85 md:via-void/30 md:to-transparent" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-void/80 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />
      <m.div aria-hidden className="absolute inset-0 bg-void" style={reduced ? { opacity: 0 } : { opacity: fade }} />

      <m.div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-32 sm:pb-28 md:px-12"
        style={reduced ? undefined : { y: textY }}
      >
        <m.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="font-mono text-[10px] tracking-[0.3em] text-bone/70 md:text-[11px]"
        >
          ABOUT · TWO FOUNDERS · MUMBAI
        </m.p>
        {/* the page's single <h1>: Inter bold glass, ONE Playfair word */}
        <m.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease }}
          className="mt-6 max-w-3xl font-headline text-[clamp(2.6rem,7vw,6rem)] font-bold leading-[1.02] tracking-[-0.04em] text-bone [text-wrap:balance]"
        >
          <span className="glass-type">Architects of </span>
          <span className="font-playfair font-normal italic tracking-normal">meaning</span>
          <span className="glass-type">.</span>
        </m.h1>
        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-bone/75 md:text-xl"
        >
          Two founders. One conviction. Discipline in the system, AI in the execution.
        </m.p>
      </m.div>

      <div aria-hidden className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono text-[9px] tracking-[0.3em] text-bone/40">SCROLL</span>
        <span className="relative block h-10 w-px overflow-hidden bg-bone/10">
          <m.span
            className="absolute inset-x-0 top-0 h-4 bg-ember"
            animate={reduced ? undefined : { y: [-16, 40] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </div>
    </section>
  );
});

YinYangHero.displayName = 'YinYangHero';
