'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const pillars = [
  {
    index: '01',
    tag: 'AI CREATIVE STUDIO',
    line: 'Campaign film and imagery from an AI pipeline, directed by hand.',
  },
  {
    index: '02',
    tag: 'BRAND SYSTEMS',
    line: 'Identity built to survive contact with the market.',
  },
  {
    index: '03',
    tag: 'ADVISORY',
    line: 'Straight answers on where your brand goes next.',
  },
];

// Asymmetric bento: the studio pillar anchors a 2x2 cell, the other two
// stack beside it.
export function Pillars() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-32 lg:px-16">
        <p className="font-mono text-[10px] tracking-[0.3em] text-ash">WHAT WE DO</p>

        <div className="mt-12 grid gap-4 md:auto-rows-fr md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <m.div
              key={pillar.index}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: i * 0.12, ease }}
              className={`liquid-glass group flex flex-col justify-between rounded-2xl p-8 transition-colors duration-500 hover:border-ember/40 md:p-10 ${
                i === 0 ? 'md:col-span-2 md:row-span-2 md:min-h-[28rem]' : ''
              }`}
            >
              <span
                aria-hidden
                className={`font-sans font-bold leading-none tracking-tight text-carbon-2 transition-colors duration-500 group-hover:text-ember/25 ${
                  i === 0 ? 'text-7xl md:text-9xl' : 'text-6xl md:text-7xl'
                }`}
              >
                {pillar.index}
              </span>
              <div className="mt-10 max-w-xl">
                <h3 className="font-mono text-xs tracking-[0.25em] text-bone">{pillar.tag}</h3>
                <p className="mt-3 text-base leading-relaxed text-ash md:text-lg">{pillar.line}</p>
              </div>
            </m.div>
          ))}
        </div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-bone/70 transition-colors duration-300 hover:text-bone"
          >
            ALL SERVICES
            <ArrowUpRight className="h-3.5 w-3.5 text-ember transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </m.div>
      </div>
    </section>
  );
}
