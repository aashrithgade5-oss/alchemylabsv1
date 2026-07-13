'use client';

import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { DecodeText } from '../DecodeText';
import { KineticHeadline, useScrollVelocitySkew } from '../KineticHeadline';
import { MagneticCTA } from '../MagneticCTA';
import { CapacityTag } from '../CapacityTag';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const skew = useScrollVelocitySkew(0.6);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // The video runs at full opacity the whole way; only the scrim deepens.
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const exitScrim = useTransform(scrollYProgress, [0, 0.85], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const chromeOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-void">
      {/* Video, alive at rest */}
      <m.div className="absolute inset-0" style={reduced ? undefined : { scale: videoScale }}>
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
      </m.div>

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

      {/* Scroll-exit fade toward void */}
      <m.div aria-hidden className="absolute inset-0 bg-void" style={{ opacity: reduced ? 0 : exitScrim }} />

      {/* Content, full center */}
      <m.div
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-24 pt-32 text-center md:px-12"
        style={reduced ? undefined : { y: headlineY, skewY: skew }}
      >
        {/* Scroll fade lives on the wrapper so it never fights the entrance animation */}
        <m.div style={reduced ? undefined : { opacity: chromeOpacity }}>
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-[10px] tracking-[0.3em] text-bone/70 md:text-[11px]"
          >
            <DecodeText text="ALCHEMY LABS · AI-NATIVE BRAND STUDIO · MUMBAI" delay={300} />
          </m.p>
        </m.div>

        <div className="relative mt-8">
          {/* text-scoped vignette: contrast floor between footage and glyphs */}
          <div aria-hidden className="text-vignette absolute -inset-x-20 -inset-y-12 z-0" />
          {/* boxless refractive halo: the video bends behind the glyphs */}
          <div aria-hidden className="glass-halo absolute -inset-x-10 -inset-y-6 z-0" />
          <KineticHeadline
            text="Taste is the moat."
            className="relative z-10 font-fraunces text-[clamp(3rem,7vw,7rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-bone"
            wordClassName="glass-type"
            delay={0.35}
          />
        </div>

        <m.p
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 1.1, ease }}
          className="mt-8 max-w-xl text-lg font-light leading-relaxed text-bone/70 [text-wrap:balance] md:text-xl"
        >
          AI throughput under human judgment. Brand systems and campaign film for founders who can
          tell the difference.
        </m.p>

        <m.div style={reduced ? undefined : { opacity: chromeOpacity }}>
          <m.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease }}
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
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-10"
          >
            <CapacityTag />
          </m.div>
        </m.div>
      </m.div>
    </section>
  );
}
