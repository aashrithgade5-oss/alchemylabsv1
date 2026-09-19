'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import { portfolio } from '@lib/portfolio';
import { AmbientVideo } from '@/components/furnace/home/AmbientVideo';
import { ScrollScrub } from '@/components/furnace/fx/ScrollScrub';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

function WorkTile({ entry, large }: { entry: (typeof portfolio)[number]; large: boolean }) {
  return (
    <article className="group">
      <div
        className={`relative overflow-hidden rounded-2xl border border-bone/[0.08] bg-carbon ${
          large ? 'aspect-[16/9]' : 'aspect-[4/3]'
        }`}
      >
        {entry.video ? (
          <AmbientVideo
            src={entry.video.src}
            poster={entry.video.poster}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <Image
            src={entry.visuals[0] ?? entry.image}
            alt={`${entry.title} — ${entry.label.toLowerCase()} work`}
            fill
            sizes={large ? '(min-width: 1024px) 1100px, 100vw' : '(min-width: 768px) 50vw, 100vw'}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="mt-5 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
        <h2 className={`type-scroll text-bone ${large ? 'text-[clamp(2rem,3.6vw,3rem)]' : 'text-[1.75rem]'}`}>
          {entry.title}
        </h2>
        <p className="shrink-0 font-mono text-[10px] tracking-[0.25em] text-ember">
          {entry.label} · {entry.discipline}
        </p>
      </div>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ash md:text-[15px]">{entry.summary}</p>
    </article>
  );
}

export default function Work() {
  const [featured, ...rest] = portfolio;

  return (
    <main className="relative font-sans">
      <section className="relative overflow-hidden bg-void">
        <div aria-hidden className="absolute inset-0">
          <Image
            src="/media/red-glow-box.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-void/60 to-void" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-40 md:px-12 md:pb-24 md:pt-52 lg:px-16">
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="font-mono text-[10px] tracking-[0.3em] text-bone/60 md:text-[11px]"
          >
            SELECTED WORK · CONCEPTS &amp; SELF-INITIATED
          </m.p>
          <m.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease }}
            className="type-display glass-type mt-7 max-w-4xl text-[clamp(3rem,7vw,6.5rem)]"
          >
            Proof over polish.
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease }}
            className="mt-6 max-w-xl font-playfair text-xl italic text-bone/70 md:text-2xl"
          >
            Concept work, built end to end, to show the standard before you commit to it.
          </m.p>
        </div>
      </section>

      <section className="relative px-6 pb-28 md:px-12 md:pb-36 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-20">
          {featured && (
            <m.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease }}
              className="md:col-span-2"
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
              transition={{ duration: 1, delay: (i % 2) * 0.1, ease }}
            >
              <WorkTile entry={entry} large={false} />
            </m.div>
          ))}
        </div>
      </section>

      <section className="relative border-t border-line px-6 py-24 md:px-12 md:py-32 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[10px] tracking-[0.3em] text-ash">THE PEDAGOGY</p>
          <ScrollScrub
            text="Most studios sell hours. We sell judgment."
            className="type-scroll mt-8 max-w-4xl text-[clamp(2rem,4.2vw,3.5rem)] text-bone"
            wordClassName="glass-type"
          />
          <p className="mt-8 max-w-2xl text-base font-light leading-relaxed text-bone/65 md:text-lg">
            Every engagement runs through the same discipline: generate wide, cut without mercy,
            keep the one frame that carries the brand. We build systems, not one-offs, so each
            identity, campaign, and film compounds instead of expiring. If it looks restrained,
            that is the point.
          </p>
        </div>
      </section>
    </main>
  );
}
