'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { featuredEntries } from '@lib/portfolio';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Honest entries from lib/portfolio.ts (all labelled CONCEPT there).
// All images live stacked in ONE fixed-ratio frame and crossfade by opacity,
// so the backdrop never cuts to black AND nothing from the previous slide
// lingers (the old outgoing-underlay rendered its text too, which stacked
// every past title/summary on top of each other). Titles are real type
// (Inter Bold) instead of per-brand text-mark PNGs, for one typographic voice.
export function FeaturedWork() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  if (featuredEntries.length === 0) return null;

  const entry = featuredEntries[index];
  const show = (i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex((i + featuredEntries.length) % featuredEntries.length);
  };

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20 lg:px-16">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] tracking-[0.3em] text-ash">SELECTED WORK</p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => show(index - 1)}
              aria-label="Previous work"
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-bone/70 transition-colors duration-300 hover:border-ember/60 hover:text-bone"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => show(index + 1)}
              aria-label="Next work"
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-bone/70 transition-colors duration-300 hover:border-ember/60 hover:text-bone"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.5fr_1fr] md:items-end md:gap-14">
          <Link
            href="/work"
            aria-label={`See ${entry.title}`}
            className="group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-carbon"
          >
            {featuredEntries.map((e, i) => (
              <m.div
                key={e.id}
                aria-hidden={i !== index}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: i === index ? 1 : 0, scale: i === index ? 1 : 1.03 }}
                transition={{ duration: 0.9, ease }}
              >
                <Image
                  src={e.visuals[0] ?? e.image}
                  alt={i === index ? e.title : ''}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                />
              </m.div>
            ))}
          </Link>

          <m.div
            key={entry.id}
            initial={{ opacity: 0, x: direction > 0 ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            aria-live="polite"
          >
            <p className="font-mono text-[10px] tracking-[0.25em] text-ember">
              {entry.label} · {entry.discipline}
            </p>
            <h3 className="mt-4 font-headline text-[clamp(2rem,3.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.035em] text-bone [text-wrap:balance]">
              {entry.title}
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ash [text-wrap:pretty]">{entry.summary}</p>
            <Link
              href="/work"
              className="group mt-8 inline-flex min-h-11 items-center gap-2 font-mono text-xs tracking-[0.2em] text-bone/70 transition-colors duration-300 hover:text-bone"
            >
              SEE THE WORK
              <ArrowUpRight className="h-3.5 w-3.5 text-ember transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </m.div>
        </div>

        <div className="mt-8 flex items-center gap-1">
          {featuredEntries.map((e, i) => (
            <button
              key={e.id}
              type="button"
              onClick={() => show(i)}
              aria-label={`Show ${e.title}`}
              aria-current={i === index}
              className="grid h-11 place-items-center px-1"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-6 bg-ember' : 'w-1.5 bg-bone/25 hover:bg-bone/50'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
