'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { portfolio } from '@lib/portfolio';
import { GlassPanel } from '@/components/furnace/GlassPanel';
import { evaBrandCollaborations } from '@/data/foundersData';

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

  return (
    <main className="relative font-sans">
      <section className="relative px-6 pb-16 pt-40 md:px-12 md:pt-48">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[10px] tracking-[0.3em] text-ash">SELECTED WORK</p>
          <m.h1
            initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease }}
            className="mx-auto mt-6 font-headline text-[clamp(2.5rem,6vw,5rem)] font-black leading-[1.05] tracking-[-0.03em] text-bone"
          >
            Proof over polish.
          </m.h1>
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-5 font-fraunces text-xl italic text-bone/75 md:text-2xl"
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

      {/* Prior-craft strip: real collaborations from before the studio,
          not studio client work — labeled as such, not blended in above. */}
      <section className="relative border-t border-line px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[10px] tracking-[0.3em] text-ash">Craft before the company.</p>
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
            {evaBrandCollaborations.map((c) => (
              <span key={c.name} className="font-mono text-sm tracking-[0.1em] text-bone/60">
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-28 text-center md:px-12">
        <Link
          href="/contact"
          className="font-mono text-xs tracking-[0.2em] text-bone/70 transition-colors duration-300 hover:text-bone"
        >
          START A PROJECT →
        </Link>
      </section>
    </main>
  );
}
