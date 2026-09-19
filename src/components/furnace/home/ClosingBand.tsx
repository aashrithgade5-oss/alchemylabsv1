'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { KineticHeadline } from '../KineticHeadline';
import { MagneticCTA } from '../MagneticCTA';
import { TextHoverEffect } from '@/components/ui/text-hover-effect';
import { ThreeDMarquee } from '../ThreeDMarquee';
import { useTilt } from '@/hooks/useTilt';

const WORDS = ['IDENTITY', 'CAMPAIGNS', 'FILM', 'STRATEGY'];

// Closing value-proposition strip: one anchor phrase, one cycling word.
function WordSwitcher() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, [reduced]);

  if (reduced) {
    return (
      <p className="font-mono text-[11px] tracking-[0.3em] text-ash">
        WE BUILD {WORDS.join(' · ')}
      </p>
    );
  }

  return (
    <p className="flex items-baseline justify-center gap-3 font-mono text-[11px] tracking-[0.3em] text-ash">
      WE BUILD
      <span className="relative inline-flex w-28 justify-start text-bone">
        <AnimatePresence mode="wait">
          <m.span
            key={WORDS[i]}
            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {WORDS[i]}
          </m.span>
        </AnimatePresence>
      </span>
    </p>
  );
}

// Phase 10 (Landing_Page_Patches.pdf): "Begin button should be a magnetic
// 3D button" — layers a cursor-tilt (useTilt, shared with Pillars) on top
// of MagneticCTA's own 2D magnetic pull, no GSAP.
function TiltCTA({ children }: { children: React.ReactNode }) {
  const tilt = useTilt(10);
  return (
    <div style={{ perspective: 800 }}>
      <m.div
        onPointerMove={tilt.onMove}
        onPointerLeave={tilt.onLeave}
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
      >
        {children}
      </m.div>
    </div>
  );
}

export function ClosingBand() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-void">
      {/* C-P17: full-bleed closing CTA with the infinite 3D marquee as the
          visual background layer (replaces the blurred footer-bg photo).
          Dim + gradient + ember radial keep the centered text sovereign.
          This same block now closes the Work page too. */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 opacity-50">
          <ThreeDMarquee background />
        </div>
        <div className="absolute inset-0 bg-void/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-void/70" />
        <div className="absolute bottom-0 left-1/2 h-[60%] w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,77,28,0.14)_0%,transparent_70%)]" />
      </div>
      <div className="relative mx-auto flex min-h-[92svh] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center md:py-32">
        {/* Phase 10: logo beside the wordmark, one line (was stacked) */}
        <m.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-row items-center gap-3"
        >
          <Image src="/assets/alchemy-minimal-logo.png" alt="" width={36} height={36} />
          <Image
            src="/media/wordmark-crop.png"
            alt="Alchemy Labs"
            width={252}
            height={52}
            className="h-auto w-32 mix-blend-screen md:w-40"
          />
        </m.div>
        <KineticHeadline
          as="h2"
          text="Bring us the brand as it stands."
          className="font-headline text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.05] tracking-[-0.03em] text-bone"
          wordClassName="glass-type"
        />
        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 font-playfair text-xl italic text-bone/70 md:text-2xl"
        >
          We will tell you what it needs.
        </m.p>
        <m.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-12"
        >
          <TiltCTA>
            <MagneticCTA href="/contact" variant="ember">
              Begin
            </MagneticCTA>
          </TiltCTA>
        </m.div>

        {/* Phase 10: divider line between the CTA and the giant wordmark
            block, which now anchors directly against it (was mt-14 gap +
            a separate small WordSwitcher line above a smaller mark). */}
        <div aria-hidden className="mt-14 h-px w-24 bg-line" />

        {/* Phase 10: giant ALCHEMY wordmark enlarged further, WordSwitcher
            centered ON TOP of it instead of sitting as its own line above. */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative mt-2 h-52 w-full max-w-5xl md:h-80"
        >
          <TextHoverEffect text="ALCHEMY" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <WordSwitcher />
          </div>
        </m.div>
      </div>
    </section>
  );
}
