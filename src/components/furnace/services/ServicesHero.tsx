'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { m, useScroll, useTransform } from 'framer-motion';
import { KineticHeadline } from '../KineticHeadline';

// Phase 3 (Landing_Page_Patches.pdf): real precedent for the full-bleed
// "animated" services hero is commit 24ed763 (pre-Next.js SolutionsHub.tsx)
// — copy verbatim match ("Three Pillars." / "Every brand challenge demands
// a different instrument..."). Correction to the brief: that background was
// never a video file, it's this static texture with scroll-driven parallax
// (scale + y), which is what reads as "animated". Asset was already sitting
// unused at this exact path — no new asset needed.
export function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-void">
      <div aria-hidden className="absolute inset-0">
        <m.div className="absolute inset-0" style={{ scale: bgScale, y: bgY }}>
          {/* C-P20 imagery pass: precision-engineering read replaces the old
              texture (none of the prior services imagery was approved) */}
          <Image
            src="/media/space-shuttle.png"
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center opacity-[0.28]"
          />
        </m.div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,9,8,0.35) 0%, rgba(10,9,8,0.55) 55%, rgba(10,9,8,1) 100%)',
          }}
        />
        {/* C-P24: the Japanese red, present from the first frame */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 55% at 82% 18%, rgba(255,77,28,0.17) 0%, rgba(178,34,20,0.07) 45%, transparent 72%)',
          }}
        />
      </div>
      {/* pb reduced from pb-20/28: the first PillarSection's own pt-24/32
          stacked on top of that measured a 240px dead gap before its
          content (FO4 W3.6 spacing audit) */}
      <div className="relative mx-auto max-w-6xl px-6 pb-6 pt-40 md:px-12 md:pb-8 md:pt-48 lg:px-16">
        <p className="font-mono text-[10px] tracking-[0.3em] text-bone/70 md:text-[11px]">
          SERVICES · SCOPED PER PROJECT
        </p>
        <KineticHeadline
          text="Three pillars."
          className="mt-7 max-w-4xl font-headline text-[clamp(2.75rem,7vw,7rem)] font-bold leading-[1.02] tracking-[-0.04em] text-bone"
          wordClassName="glass-type"
          delay={0.15}
        />
        <m.p
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-bone/75 md:text-lg"
        >
          Every brand challenge demands a different instrument. We&rsquo;ve engineered three —
          each built to compound.
        </m.p>
        <m.p
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 max-w-xl text-sm leading-relaxed text-bone/60 md:text-base"
        >
          Every engagement is scoped per project and held to one standard. Printed prices live on
          the five fixed offers below.
        </m.p>
      </div>
    </section>
  );
}
