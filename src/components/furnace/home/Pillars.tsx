'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AmbientVideo } from './AmbientVideo';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const pillars = [
  {
    index: '01',
    title: 'AI Creative Studio',
    line: 'Campaign film and imagery from an AI pipeline, directed by hand.',
    src: '/media/aether-rituals-preview.mp4',
    poster: '/media/aether-rituals-preview-poster.jpg',
  },
  {
    index: '02',
    title: 'Brand Systems',
    line: 'Identity built to survive contact with the market.',
    src: '/media/red-slats-wide.mp4',
    poster: '/media/red-slats-wide-poster.jpg',
  },
  {
    index: '03',
    title: 'Advisory',
    line: 'Straight answers on where your brand goes next.',
    src: '/media/red-cloak-water.mp4',
    poster: '/media/red-cloak-water-poster.jpg',
  },
];

// Editorial index: hairline rows, Playfair titles, footage that opens on
// hover (desktop) and sits as a quiet strip on touch.
export function Pillars() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-32 lg:px-16">
        <div className="flex items-end justify-between">
          <p className="font-mono text-[10px] tracking-[0.3em] text-ash">WHAT WE DO</p>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-bone/60 transition-colors duration-300 hover:text-bone"
          >
            ALL SERVICES
            <ArrowUpRight className="h-3.5 w-3.5 text-ember transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className="mt-10 border-t border-line">
          {pillars.map((p, i) => (
            <m.li
              key={p.index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: i * 0.08, ease }}
              className="border-b border-line"
            >
              <Link
                href={`/services#pillar-${i + 1}`}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 py-8 outline-none focus-visible:bg-bone/[0.03] md:grid-cols-[4rem_1fr_16rem_auto] md:gap-x-8 md:py-10"
              >
                <span className="font-mono text-[11px] tracking-[0.2em] text-ash transition-colors duration-500 group-hover:text-ember">
                  {p.index}
                </span>
                <span>
                  <span className="type-scroll block text-[clamp(1.75rem,3.6vw,3rem)] text-bone transition-transform duration-700 ease-out group-hover:translate-x-2">
                    {p.title}
                  </span>
                  <span className="mt-2 block max-w-md text-sm leading-relaxed text-ash md:text-[15px]">
                    {p.line}
                  </span>
                </span>
                <span className="relative col-span-3 row-start-2 mt-6 block aspect-[16/7] overflow-hidden rounded-2xl md:col-span-1 md:row-start-auto md:mt-0 md:aspect-[4/3] md:[clip-path:inset(12%_18%_12%_18%_round_16px)] md:transition-[clip-path] md:duration-700 md:ease-out md:group-hover:[clip-path:inset(0%_0%_0%_0%_round_16px)]">
                  <AmbientVideo
                    src={p.src}
                    poster={p.poster}
                    className="absolute inset-0 h-full w-full object-cover opacity-80 transition-[opacity,transform] duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="hidden h-5 w-5 text-bone/40 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ember md:block"
                />
              </Link>
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
