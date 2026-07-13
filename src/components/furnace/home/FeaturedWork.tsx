'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { featuredEntries } from '@lib/portfolio';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Project text marks (white on black), screened over the carbon field.
const textMarks: Record<string, string> = {
  'aether-rituals': '/media/aether-rituals-text.png',
  genesis: '/media/genesis-text.png',
  'oakley-concept': '/media/oakley-text.png',
};

// Renders nothing until an entry in lib/portfolio.ts carries featured: true.
export function FeaturedWork() {
  if (featuredEntries.length === 0) return null;

  return (
    <section className="relative bg-gradient-to-b from-transparent via-carbon to-transparent">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-32 lg:px-16">
        <p className="font-mono text-[10px] tracking-[0.3em] text-ash">SELECTED WORK</p>

        {featuredEntries.map((entry) => (
          <m.div
            key={entry.id}
            // no filter here: a leftover blur(0px) isolates the stacking
            // context and kills the text mark's mix-blend-screen
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease }}
            className="mt-12 grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end"
          >
            <Link href="/work" className="group relative block overflow-hidden border border-line">
              <Image
                src={entry.visuals[0] ?? entry.image}
                alt={entry.title}
                width={1200}
                height={800}
                className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-void/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            </Link>

            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-ember">
                {entry.label} · {entry.discipline}
              </p>
              {textMarks[entry.id] ? (
                <h3 className="mt-5">
                  <Image
                    src={textMarks[entry.id]}
                    alt={entry.title}
                    width={800}
                    height={200}
                    className="h-auto w-64 mix-blend-screen md:w-80"
                  />
                </h3>
              ) : (
                <h3 className="mt-4 font-sans text-3xl font-bold text-bone md:text-4xl">
                  {entry.title}
                </h3>
              )}
              <p className="mt-4 max-w-md text-base leading-relaxed text-ash">{entry.summary}</p>
              <Link
                href="/work"
                className="group mt-8 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-bone/70 transition-colors duration-300 hover:text-bone"
              >
                SEE THE WORK
                <ArrowUpRight className="h-3.5 w-3.5 text-ember transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </m.div>
        ))}
      </div>
    </section>
  );
}
