'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  m,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { DecodeText } from '../DecodeText';
import { KineticHeadline, useScrollVelocitySkew } from '../KineticHeadline';
import { MagneticCTA } from '../MagneticCTA';
import { CapacityTag } from '../CapacityTag';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// The cycling centerpiece: each phrase carries its own metallic gradient
// variation — all in the brushed-metal family, floor luminance high enough
// to read over the darkest and brightest points of the samurai footage.
const BUILDS: { word: string; gradient: string }[] = [
  { word: 'STRATEGY', gradient: 'linear-gradient(180deg, #b8b8bd 0%, #f4f2ee 55%, #cfcdc9 100%)' },
  { word: 'BRAND SYSTEMS', gradient: 'linear-gradient(180deg, #c9bfae 0%, #f6efe2 55%, #d8cdbb 100%)' },
  { word: 'IDENTITY', gradient: 'linear-gradient(180deg, #b3b9c4 0%, #eef2f7 55%, #c5ccd8 100%)' },
  { word: 'CAMPAIGNS', gradient: 'linear-gradient(180deg, #d0a89a 0%, #ffe9de 55%, #d9b3a4 100%)' },
  { word: 'FILM', gradient: 'linear-gradient(180deg, #c8c4bc 0%, #faf7f2 55%, #d4d0c8 100%)' },
];

// Large central "WE BUILD ___" switcher. Text sits directly over the scene —
// no solid backing; the hero's text-vignette carries the contrast floor.
function WeBuild() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % BUILDS.length), 2400);
    return () => clearInterval(t);
  }, [reduced]);

  const clipStyle = (gradient: string) => ({
    backgroundImage: gradient,
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    color: 'transparent',
  });

  return (
    <div
      aria-label={`We build ${BUILDS.map((b) => b.word.toLowerCase()).join(', ')}`}
      className="flex flex-wrap items-baseline justify-center gap-x-[0.45em] font-sans text-[clamp(1.75rem,4vw,3.75rem)] font-black leading-none tracking-[-0.02em]"
    >
      <span aria-hidden className="glass-type">WE BUILD</span>
      {reduced ? (
        <span aria-hidden style={clipStyle(BUILDS[1].gradient)}>{BUILDS[1].word}</span>
      ) : (
        <span aria-hidden className="relative inline-flex whitespace-nowrap">
          <AnimatePresence mode="wait">
            <m.span
              key={BUILDS[i].word}
              initial={{ opacity: 0, y: '35%', filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: '0%', filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: '-30%', filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease }}
              style={clipStyle(BUILDS[i].gradient)}
              className="inline-block will-change-transform"
            >
              {BUILDS[i].word}
            </m.span>
          </AnimatePresence>
        </span>
      )}
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const skew = useScrollVelocitySkew(0.6);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Cinematic mask reveal: the footage opens from a narrow ellipse slit to
  // full bleed across the first ~55% of the section's scroll travel.
  const maskRx = useTransform(scrollYProgress, [0, 0.55], [18, 125]);
  const maskRy = useTransform(scrollYProgress, [0, 0.55], [26, 125]);
  const clipPath = useMotionTemplate`ellipse(${maskRx}% ${maskRy}% at 50% 55%)`;

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.12]);
  const exitScrim = useTransform(scrollYProgress, [0.72, 0.96], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const chromeOpacity = useTransform(scrollYProgress, [0.55, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className={`relative bg-void ${reduced ? 'min-h-[100svh]' : 'h-[180svh]'}`}
    >
      <div
        className={`flex flex-col overflow-hidden ${
          reduced ? 'relative min-h-[100svh]' : 'sticky top-0 h-[100svh]'
        }`}
      >
        {/* Video behind the slit: emerges on scroll, never sits flat from load */}
        <m.div
          className="absolute inset-0"
          style={reduced ? undefined : { clipPath, scale: videoScale }}
        >
          <video
            autoPlay={!reduced}
            loop
            muted
            playsInline
            preload="metadata"
            poster="/media/samurai-silhouette-1-poster.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/media/samurai-silhouette-1.mp4" type="video/mp4" />
          </video>
          {/* Quiet vignette: the red field recedes, the centered text wins */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 120% 90% at 50% 50%, rgba(10,9,8,0.34) 0%, rgba(10,9,8,0.6) 78%, rgba(10,9,8,0.78) 100%),
                linear-gradient(to top, rgba(10,9,8,0.5) 0%, transparent 30%)
              `,
            }}
          />
        </m.div>

        {/* Scroll-exit fade toward void */}
        <m.div aria-hidden className="absolute inset-0 bg-void" style={{ opacity: reduced ? 0 : exitScrim }} />

        {/* Content, full center */}
        <m.div
          className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-20 pt-28 text-center md:px-12"
          style={reduced ? undefined : { y: headlineY, skewY: skew }}
        >
          {/* Scroll fade lives on the wrapper so it never fights the entrance animation */}
          <m.div style={reduced ? undefined : { opacity: chromeOpacity }}>
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-mono text-[10px] tracking-[0.3em] text-bone/80 md:text-[11px]"
            >
              <DecodeText text="ALCHEMY LABS · AI-NATIVE BRAND STUDIO · MUMBAI" delay={300} />
            </m.p>
          </m.div>

          <div className="relative mt-8">
            {/* text-scoped vignette: contrast floor between footage and glyphs */}
            <div aria-hidden className="text-vignette absolute -inset-x-20 -inset-y-14 z-0" />
            {/* boxless refractive halo: the video bends behind the glyphs */}
            <div aria-hidden className="glass-halo absolute -inset-x-10 -inset-y-6 z-0" />
            <KineticHeadline
              text="Taste is the moat."
              className="relative z-10 font-sans text-[clamp(3rem,8vw,8rem)] font-black leading-[1.02] tracking-[-0.04em] text-bone"
              wordClassName="glass-type"
              delay={0.35}
            />
            <m.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.9, ease }}
              className="relative z-10 mt-6"
            >
              <WeBuild />
            </m.div>
          </div>

          <m.p
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 1.15, ease }}
            className="mt-8 max-w-xl text-lg font-light leading-relaxed text-bone/80 [text-wrap:balance] md:text-xl"
          >
            AI throughput under human judgment. Brand systems and campaign film for founders who
            can tell the difference.
          </m.p>

          <m.div style={reduced ? undefined : { opacity: chromeOpacity }}>
            <m.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.35, ease }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5"
            >
              <MagneticCTA href="/work" variant="ember">
                See the work
              </MagneticCTA>
              <MagneticCTA href="/contact" variant="ghost">
                Begin
              </MagneticCTA>
            </m.div>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.6 }}
              className="mt-10"
            >
              <CapacityTag />
            </m.div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
