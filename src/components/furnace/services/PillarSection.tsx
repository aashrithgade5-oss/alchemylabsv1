'use client';

import { m } from 'framer-motion';
import { MagneticCTA } from '../MagneticCTA';
import type { Pillar } from './pillars';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * One pillar: an oversized numeral cropped by the section edge, DM Mono tag
 * row, and the offer stack. Numeral side alternates per pillar so the page
 * reads as a staggered column, not a repeated template.
 */
export function PillarSection({ pillar, index }: { pillar: Pillar; index: number }) {
  const numeralRight = index % 2 === 1;

  return (
    <section className="relative overflow-hidden bg-void">
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-10 select-none font-sans text-[16rem] font-bold leading-none text-carbon-2 md:-top-16 md:text-[26rem] ${
          numeralRight ? '-right-6 md:-right-10' : '-left-6 md:-left-10'
        }`}
      >
        {pillar.numeral}
      </span>

      <div
        className={`relative mx-auto flex max-w-6xl flex-col px-6 py-24 md:px-12 md:py-32 lg:px-16 ${
          numeralRight ? '' : 'items-end text-left md:pl-40'
        }`}
      >
        <div className="w-full max-w-2xl">
          <p className="font-mono text-[10px] tracking-[0.3em] text-ash">{pillar.tag}</p>
          <m.h2
            initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease }}
            className="mt-5 font-sans text-4xl font-bold text-bone md:text-6xl"
          >
            {pillar.title}
          </m.h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ash">{pillar.description}</p>

          <ul className="mt-12 flex flex-col">
            {pillar.offers.map((offer, i) => (
              <m.li
                key={offer.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.06, ease }}
                className="group border-t border-line py-7 first:border-t-0"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-sans text-xl font-bold text-bone transition-colors duration-300 group-hover:text-ember md:text-2xl">
                    {offer.name}
                  </h3>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-ash">
                    {offer.timeline}
                  </span>
                </div>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-ash">{offer.line}</p>
              </m.li>
            ))}
          </ul>

          <div className="mt-10">
            <MagneticCTA href={`/contact?pillar=${pillar.slug}`} variant="ghost">
              Book the sprint
            </MagneticCTA>
          </div>
        </div>
      </div>
    </section>
  );
}
