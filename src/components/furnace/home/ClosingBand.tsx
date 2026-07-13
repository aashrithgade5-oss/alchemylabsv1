'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { AmbientVideo } from './AmbientVideo';
import { KineticHeadline } from '../KineticHeadline';
import { MagneticCTA } from '../MagneticCTA';

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

export function ClosingBand() {
  return (
    <section className="relative overflow-hidden">
      <AmbientVideo
        src="/media/red-cloak-water.mp4"
        poster="/media/red-cloak-water-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div aria-hidden className="absolute inset-0 bg-void/55" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-28 text-center md:py-40">
        {/* wordmark lockup: white-on-black mark, screened over the film */}
        <m.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-col items-center gap-5"
        >
          <Image src="/assets/alchemy-minimal-logo.png" alt="" width={44} height={44} />
          <Image
            src="/media/wordmark-crop.png"
            alt="Alchemy Labs"
            width={252}
            height={52}
            className="h-auto w-40 mix-blend-screen md:w-48"
          />
        </m.div>
        <KineticHeadline
          as="h2"
          text="Bring us the brand as it stands."
          className="font-fraunces text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-bone"
          wordClassName="glass-type"
        />
        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 font-fraunces text-xl italic text-bone/70 md:text-2xl"
        >
          We will tell you what it needs.
        </m.p>
        <m.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12"
        >
          <MagneticCTA href="/contact" variant="ember">
            Begin
          </MagneticCTA>
        </m.div>
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-14"
        >
          <WordSwitcher />
        </m.div>
      </div>
    </section>
  );
}
