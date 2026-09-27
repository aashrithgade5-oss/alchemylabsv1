'use client';

import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { memo, lazy, Suspense, useRef, useState } from 'react';
import { BlueprintGrid, NoiseTexture } from '@/components/effects';
import { useIsMobile } from '@/hooks/use-mobile';
import { ABOUT_HERO_POSTER, ABOUT_HERO_VIDEO } from '@lib/hf';

const LazyNeuralBackground = lazy(() =>
  import('@/components/NeuralBackground').then((mod) => ({ default: mod.NeuralBackground })),
);

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ClipReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <span className="block overflow-hidden pb-[0.08em]">
    <m.span
      className="block"
      initial={{ y: '110%', opacity: 0 }}
      animate={{ y: '0%', opacity: 1 }}
      transition={{ duration: 1.1, delay, ease }}
    >
      {children}
    </m.span>
  </span>
);

/**
 * About hero, restored to the original film (owner, Patches-4): the dim
 * founders loop under a vignette, ember aurora, particle field and grain.
 * Re-encoded 14.8MB -> 4.1MB H.264 with a poster so it opens instantly;
 * recoloured from the legacy red to ember and set in the locked type law.
 */
export const YinYangHero = memo(() => {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.5], [isMobile ? 0.26 : 0.24, 0.04]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.5]);

  return (
    <section ref={sectionRef} className="relative flex h-[100svh] flex-col justify-end overflow-hidden bg-void">
      <m.div aria-hidden className="absolute inset-0" style={{ scale: isMobile || reduced ? 1 : videoScale, opacity: videoOpacity }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ABOUT_HERO_POSTER} alt="" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        {!reduced && (
          <video
            src={ABOUT_HERO_VIDEO}
            poster={ABOUT_HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={() => setVideoReady(true)}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: videoReady ? 1 : 0, transition: 'opacity 1.2s' }}
          />
        )}
      </m.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(10,9,8,0.6) 70%, rgba(10,9,8,0.92) 100%)' }}
      />

      {/* ember aurora: a slow, blurred conic sweep (desktop only) */}
      {!isMobile && !reduced && (
        <div aria-hidden className="about-aurora pointer-events-none absolute inset-0" />
      )}

      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-void/90 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-void to-transparent" />
      <m.div aria-hidden className="pointer-events-none absolute inset-0 bg-void" style={{ opacity: overlayOpacity }} />

      {!isMobile && !reduced && (
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-20">
          <Suspense fallback={null}>
            <LazyNeuralBackground />
          </Suspense>
        </div>
      )}

      <BlueprintGrid opacity={0.015} />
      <NoiseTexture opacity={0.025} />

      <m.div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 sm:pb-32" style={{ y: isMobile ? 0 : textY }}>
        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-ember/30 bg-ember/10 px-4 py-2 shadow-[0_0_25px_rgba(255,77,28,0.1)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_10px_rgba(255,77,28,0.8)]" aria-hidden />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/80 sm:text-xs">Meet the founders</span>
        </m.p>

        <h1 className="mb-6 font-headline tracking-[-0.035em]">
          <ClipReveal delay={0.4}>
            <span className="block text-2xl font-light text-bone/80 sm:text-3xl md:text-4xl lg:text-5xl">Architects of</span>
          </ClipReveal>
          <ClipReveal delay={0.55}>
            <span className="block text-[clamp(2.6rem,7.5vw,6.25rem)] font-bold leading-[1.02]">
              <span className="font-playfair font-normal italic text-bone [text-shadow:0_0_40px_rgba(255,77,28,0.35)]">meaning</span>
              <span className="glass-type">, and the</span>
            </span>
          </ClipReveal>
          <ClipReveal delay={0.7}>
            <span className="glass-type block text-[clamp(2.6rem,7.5vw,6.25rem)] font-bold leading-[1.02]">systems behind it.</span>
          </ClipReveal>
        </h1>

        <m.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease }}
          className="max-w-xl text-base leading-relaxed text-bone/55 sm:text-lg [text-wrap:pretty]"
        >
          Two founders, one studio in Mumbai. We decide what is worth making, then build it with care and the best tools we can find.
        </m.p>
      </m.div>

      <m.div
        aria-hidden
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-bone/25">Scroll</span>
        <span className="relative block h-10 w-px bg-gradient-to-b from-bone/[0.12] to-transparent">
          <span className="scroll-cue-dot absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ember shadow-[0_0_8px_rgba(255,77,28,0.8)]" />
        </span>
      </m.div>
    </section>
  );
});

YinYangHero.displayName = 'YinYangHero';
