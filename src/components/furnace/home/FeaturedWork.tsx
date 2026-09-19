'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { featuredEntries } from '@lib/portfolio';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Phase 7 (Landing_Page_Patches.pdf): "rather than it being a selectable
// carousel that can be moved from Aether Rituals to then Next, having
// Genesis, then Next, having Oakley Showcase, and then Dior" — real,
// honest entries (lib/portfolio.ts, all featured:true, no placeholders).
// One slide's content — rendered twice during a transition (static outgoing
// underlay + animated incoming) so the backdrop never cuts to black.
function SlideInner({ entry }: { entry: (typeof featuredEntries)[number] }) {
  return (
    <>
      <Link href="/work" className="group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-bone/[0.08]">
        <Image
          src={entry.visuals[0] ?? entry.image}
          alt={entry.title}
          fill
          sizes="(min-width: 768px) 60vw, 100vw"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
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
        <h3 className="type-scroll mt-5 text-[clamp(2.25rem,4vw,3.5rem)] text-bone">{entry.title}</h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-ash">{entry.summary}</p>
        <Link
          href="/work"
          className="group mt-8 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-bone/70 transition-colors duration-300 hover:text-bone"
        >
          SEE THE WORK
          <ArrowUpRight className="h-3.5 w-3.5 text-ember transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </>
  );
}

export function FeaturedWork() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  if (featuredEntries.length === 0) return null;

  const entry = featuredEntries[index];
  const go = (delta: number) => {
    setDirection(delta);
    setPrevIndex(index);
    setIndex((v) => (v + delta + featuredEntries.length) % featuredEntries.length);
  };

  return (
    <section className="relative bg-gradient-to-b from-transparent via-carbon to-transparent">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20 lg:px-16">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] tracking-[0.3em] text-ash">SELECTED WORK</p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous work"
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-bone/70 transition-colors duration-300 hover:border-ember/60 hover:text-bone"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next work"
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-bone/70 transition-colors duration-300 hover:border-ember/60 hover:text-bone"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* No AnimatePresence/exit animation: mode="wait" (exit-before-enter)
            risks the next entry never rendering if the exit animation stalls
            (backgrounded/automated-tab rAF suspension — the exact quirk
            logged in HANDOFF's prior sessions). Keying a plain m.div instead
            — React remounts on key change, so the entrance animation always
            replays independent of any previous element's fade-out. */}
        {/* C-P15 black-flash fix: the outgoing slide stays painted as a
            static underlay while the keyed incoming slide fades in over it —
            the backdrop never cuts to void between slides. Still no
            AnimatePresence (the rAF-suspension rationale above stands). */}
        <div className="relative mt-10">
          {prevIndex !== null && prevIndex !== index && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 grid gap-10 md:grid-cols-[1.7fr_1fr] md:items-end md:gap-14"
            >
              <SlideInner entry={featuredEntries[prevIndex]} />
            </div>
          )}
          <m.div
            key={entry.id}
            initial={{ opacity: 0, x: direction > 0 ? 32 : -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            className="relative grid gap-10 md:grid-cols-[1.7fr_1fr] md:items-end md:gap-14"
          >
            <SlideInner entry={entry} />
          </m.div>
        </div>

        <div className="mt-8 flex items-center gap-2">
          {featuredEntries.map((e, i) => (
            <button
              key={e.id}
              type="button"
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setPrevIndex(index);
                setIndex(i);
              }}
              aria-label={`Show ${e.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-ember' : 'w-1.5 bg-bone/20 hover:bg-bone/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
