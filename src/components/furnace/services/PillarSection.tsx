'use client';

import Image from 'next/image';
import Link from 'next/link';
import { m } from 'framer-motion';
import { MagneticCTA } from '../MagneticCTA';
import { offerSlug, type Pillar } from './pillars';
import { PillarLoop } from './SvcMedia';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// One kanji numeral per pillar — the section's single Japanese motif. Sits in
// the label row (in flow), so it can never collide with the heading or media.
const kanji = ['壱', '弐', '参'];

// Inter Bold sentence case + one lowercase Playfair emphasis word.
const heads: Record<Pillar['slug'], [string, string]> = {
  ai: ['AI creative', 'studio'],
  brand: ['Brand', 'systems'],
  advisory: ['Clear', 'advisory'],
};

const ctas: Record<Pillar['slug'], string> = {
  ai: 'Start an AI creative project',
  brand: 'Start a brand system',
  advisory: 'Start an advisory engagement',
};

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease },
};

/**
 * One pillar, two clean columns on lg+: copy + offer list, and the media in
 * its own column (sticky, alternating side). Below lg the media stacks above
 * the copy. Nothing is absolutely positioned over content.
 */
export function PillarSection({ pillar, index }: { pillar: Pillar; index: number }) {
  const mediaLeft = index % 2 === 1;
  const [lead, em] = heads[pillar.slug];

  return (
    <section id={`pillar-${index + 1}`} className="relative scroll-mt-24 overflow-hidden">
      {/* ember wash, pure background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(48rem 36rem at ${mediaLeft ? '0%' : '100%'} 30%, rgba(255,77,28,0.11) 0%, rgba(178,34,20,0.05) 45%, transparent 72%)`,
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 md:px-12 md:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16 lg:px-16 xl:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
        {/* media: own column, never overlaps the copy */}
        <m.div
          {...reveal}
          className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line sm:aspect-[16/9] lg:sticky lg:top-28 lg:aspect-[4/5] lg:self-start ${
            mediaLeft ? 'lg:order-first' : 'lg:order-last'
          }`}
        >
          <Image
            src={pillar.still}
            alt=""
            fill
            sizes="(min-width: 1280px) 24rem, (min-width: 1024px) 22rem, 100vw"
            className="object-cover"
          />
          <PillarLoop slug={pillar.slug} className="absolute inset-0 h-full w-full object-cover" />
          <div aria-hidden className="absolute inset-0 bg-void/25" />
        </m.div>

        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] tracking-[0.3em] text-ash">
            <span className="text-ember">{pillar.numeral}</span>
            <span aria-hidden className="font-sans text-2xl leading-none tracking-normal text-ember/70">
              {kanji[index % kanji.length]}
            </span>
            <span>{pillar.tag}</span>
          </p>
          <m.h2
            {...reveal}
            className="mt-5 font-headline text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-bone [text-wrap:balance]"
          >
            <span className="glass-type">{lead} </span>
            <span className="font-playfair font-normal italic">{em}</span>
          </m.h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ash [text-wrap:pretty]">
            {pillar.description}
          </p>

          {/* solid glass: no backdrop-filter re-rasterising while scrolling */}
          <m.ul {...reveal} className="glass-solid mt-8 flex flex-col rounded-2xl px-5 md:px-8">
            {pillar.offers.map((offer) => (
              <li key={offer.name} className="group relative border-t border-line py-5 first:border-t-0">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h3 className="min-w-0 font-sans text-lg font-bold text-bone transition-colors duration-300 group-hover:text-ember md:text-2xl [text-wrap:balance]">
                    {/* whole row is the tap target via the stretched link */}
                    <Link
                      href={`/services/studio/${offerSlug(offer.name)}`}
                      className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-lg focus-visible:after:ring-2 focus-visible:after:ring-ember"
                    >
                      {offer.name}
                      <span aria-hidden className="ml-2 inline-block text-ember transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </h3>
                  <span className="shrink-0 whitespace-nowrap font-mono text-[10px] tracking-[0.25em] text-ash">
                    {offer.timeline}
                  </span>
                </div>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-ash [text-wrap:pretty]">{offer.line}</p>
              </li>
            ))}
          </m.ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticCTA href={`/contact?pillar=${pillar.slug}`} variant="ember">
              {ctas[pillar.slug]}
            </MagneticCTA>
          </div>
        </div>
      </div>
    </section>
  );
}
