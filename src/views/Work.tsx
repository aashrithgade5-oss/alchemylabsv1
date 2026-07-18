'use client';

import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { portfolio } from '@lib/portfolio';
import { GlassPanel } from '@/components/furnace/GlassPanel';
import { KineticHeadline } from '@/components/furnace/KineticHeadline';
import { ClosingBand } from '@/components/furnace/home/ClosingBand';
import { AmbientVideo } from '@/components/furnace/home/AmbientVideo';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// White-on-black text marks (mix-blend-screen), same set FeaturedWork uses.
// AI Media Gen has no mark yet — falls back to the plain h3 below.
const textMarks: Record<string, string> = {
  'aether-rituals': '/media/aether-rituals-text.png',
  genesis: '/media/genesis-text.png',
  'oakley-concept': '/media/oakley-text.png',
};

function WorkTile({ entry, large }: { entry: (typeof portfolio)[number]; large: boolean }) {
  return (
    <GlassPanel className={`group h-full ${large ? 'md:min-h-[28rem]' : ''}`}>
      <Image
        src={entry.visuals[0] ?? entry.image}
        alt=""
        fill
        className="object-cover opacity-40 transition-opacity duration-500 group-hover:opacity-55"
      />
      <div className="relative flex h-full flex-col justify-end p-8 md:p-10">
        <p className="font-mono text-[10px] tracking-[0.25em] text-ember">
          {entry.label} · {entry.discipline}
        </p>
        {textMarks[entry.id] ? (
          <Image
            src={textMarks[entry.id]}
            alt={entry.title}
            width={800}
            height={200}
            className={`mt-4 h-auto mix-blend-screen ${large ? 'w-64 md:w-80' : 'w-44 md:w-52'}`}
          />
        ) : (
          <h3
            className={`mt-4 font-headline font-black text-bone ${large ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}
          >
            {entry.title}
          </h3>
        )}
        <p className={`mt-3 max-w-md leading-relaxed text-ash ${large ? 'text-base md:text-lg' : 'text-sm'}`}>
          {entry.summary}
        </p>
      </div>
    </GlassPanel>
  );
}

export default function Work() {
  const [featured, ...rest] = portfolio;
  const heroRef = useRef<HTMLElement>(null);
  // Same parallax recipe as ServicesHero — that page is the reference
  // pattern for full-bleed heroes; only the asset differs (unused
  // compressed loop red-slats-wide.mp4, 3.9MB + poster).
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end end'] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <main className="relative font-sans">
      <section ref={heroRef} className="relative min-h-[70vh] overflow-hidden bg-void">
        <div aria-hidden className="absolute inset-0">
          <m.div className="absolute inset-0" style={{ scale: bgScale, y: bgY }}>
            <AmbientVideo
              src="/media/red-slats-wide.mp4"
              poster="/media/red-slats-wide-poster.jpg"
              className="h-full w-full object-cover object-center opacity-[0.28]"
            />
          </m.div>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(10,9,8,0.35) 0%, rgba(10,9,8,0.55) 55%, rgba(10,9,8,1) 100%)',
            }}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-40 md:px-12 md:pb-20 md:pt-48 lg:px-16">
          <p className="font-mono text-[10px] tracking-[0.3em] text-bone/70 md:text-[11px]">
            SELECTED WORK
          </p>
          <KineticHeadline
            as="h1"
            text="Proof over polish."
            className="mt-7 max-w-4xl font-headline text-[clamp(3rem,7vw,7rem)] font-black leading-[1.02] tracking-[-0.04em] text-bone"
            wordClassName="glass-type"
            delay={0.15}
          />
          <m.p
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.5, ease }}
            className="mt-6 max-w-xl font-playfair text-xl italic text-bone/75 md:text-2xl"
          >
            The work speaks in befores and afters.
          </m.p>
        </div>
      </section>

      {/* Bento: 4 entries, 4 cells — no filler tiles. Aether Rituals (the
          only featured entry) anchors a 2x2 cell, same asymmetric pattern
          as the homepage's Pillars section. */}
      <section className="relative px-6 pb-24 md:px-12 md:pb-32">
        <div className="mx-auto grid max-w-6xl gap-4 md:auto-rows-fr md:grid-cols-3">
          {featured && (
            <m.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease }}
              className="md:col-span-2 md:row-span-2"
            >
              <WorkTile entry={featured} large />
            </m.div>
          )}
          {rest.map((entry, i) => (
            <m.div
              key={entry.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease }}
            >
              <WorkTile entry={entry} large={false} />
            </m.div>
          ))}
        </div>
      </section>

      {/* C-P12: the orphaned client-logo strip is replaced with the work
          pedagogy, in copy voice. */}
      <section className="relative border-t border-line px-6 py-20 md:px-12">
        <m.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease }}
          className="mx-auto max-w-6xl"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-ash">THE PEDAGOGY</p>
          <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-bone/75 md:text-xl">
            Most studios sell hours. We sell judgment. Every engagement here runs through the same
            discipline: generate wide, cut without mercy, keep the one frame that carries the
            brand. We build systems, not one-offs, so each identity, campaign, and film compounds
            instead of expiring. The work above survived that cut. If it looks restrained, that is
            the point. Restraint is what volume can never buy.
          </p>
        </m.div>
      </section>

      {/* C-P17: identical full-bleed marquee CTA block as the homepage close */}
      <ClosingBand />
    </main>
  );
}
