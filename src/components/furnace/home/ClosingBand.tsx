'use client';

import Image from 'next/image';
import { m } from 'framer-motion';
import { MagneticCTA } from '../MagneticCTA';
import { ScrollScrub } from '../fx/ScrollScrub';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ClosingBand() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-void">
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/media/obsidian-fold-2.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
      </div>

      <div className="relative mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-center px-6 py-28 md:px-12 lg:px-16">
        <p className="font-mono text-[10px] tracking-[0.3em] text-ash">BEGIN</p>
        <ScrollScrub
          text={['Bring us the brand', 'as it stands.']}
          className="type-scroll mt-8 max-w-3xl text-[clamp(2.5rem,6vw,5.5rem)] text-bone"
          wordClassName="glass-type"
        />
        <m.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="mt-6 font-playfair text-xl italic text-bone/65 md:text-2xl"
        >
          We will tell you what it needs.
        </m.p>
        <m.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35, ease }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <MagneticCTA href="/contact" variant="ember">
            Begin the sprint
          </MagneticCTA>
          <a
            href="mailto:alchemylabs.work@gmail.com"
            className="inline-flex min-h-11 items-center font-mono text-[11px] tracking-[0.2em] text-bone/60 underline-offset-8 transition-colors hover:text-bone hover:underline"
          >
            ALCHEMYLABS.WORK@GMAIL.COM
          </a>
        </m.div>
      </div>
    </section>
  );
}
