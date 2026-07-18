'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { GlassPanel } from '../GlassPanel';
import { AmbientVideo } from './AmbientVideo';
import { useTilt } from '@/hooks/useTilt';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Phase 5 (Landing_Page_Patches.pdf): the brief asked for Porsche/IKEA
// video and a Rituals/Dior photo — neither Porsche nor IKEA footage exists
// anywhere in this repo or its git history (searched exhaustively). Ash
// confirmed the real, honest media already sits in the repo from the
// portfolio case studies: Aether Rituals (concept AI campaign, genuinely
// unused video) for the studio tile, and the Dior concept campaign still
// (used elsewhere only inside the FROZEN Aashrith file — reusing the asset
// PATH here doesn't touch that file) for the brand-systems tile.
// C-P13/P15 media de-dup (all paths on the consolidated /media root):
// 01 keeps Aether Rituals (correct fit), 02 swaps Dior→Genesis (Dior was a
// repeat of the proof carousel), 03 drops the landing hero-video reuse for
// the previously-unused red-cloak-water loop.
const pillars = [
  {
    index: '01',
    tag: 'AI CREATIVE STUDIO',
    line: 'Campaign film and imagery from an AI pipeline, directed by hand.',
    media: {
      type: 'video' as const,
      src: '/media/aether-rituals-preview.mp4',
      poster: '/media/aether-rituals-preview-poster.jpg',
    },
  },
  {
    index: '02',
    tag: 'BRAND SYSTEMS',
    line: 'Identity built to survive contact with the market.',
    media: { type: 'image' as const, src: '/media/genesis-bento.png' },
  },
  {
    index: '03',
    tag: 'ADVISORY',
    line: 'Straight answers on where your brand goes next.',
    media: {
      type: 'video' as const,
      src: '/media/red-cloak-water.mp4',
      poster: '/media/red-cloak-water-poster.jpg',
    },
  },
];

function PillarCard({ pillar, i }: { pillar: (typeof pillars)[number]; i: number }) {
  const tilt = useTilt();
  return (
    <m.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: i * 0.12, ease }}
      className={i === 0 ? 'md:col-span-2 md:row-span-2' : ''}
      style={{ perspective: 1200 }}
    >
      <m.div
        onPointerMove={tilt.onMove}
        onPointerLeave={tilt.onLeave}
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
      >
        {/* refract stays anchor-card-only (FO3 P2 decision, unchanged) —
            the new red-glow hover is additive, not a replacement for it */}
        <GlassPanel
          refract={i === 0}
          className="group h-full transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(255,77,28,0.22)]"
        >
          {pillar.media.type === 'video' ? (
            <AmbientVideo
              src={pillar.media.src}
              poster={pillar.media.poster}
              className="absolute inset-0 h-full w-full object-cover opacity-25"
            />
          ) : (
            <Image
              src={pillar.media.src}
              alt=""
              fill
              quality={90}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="absolute inset-0 object-cover opacity-25"
            />
          )}
          <div className="relative flex h-full flex-col justify-between p-7 md:p-9">
            <span
              aria-hidden
              className={`font-sans font-black leading-none tracking-tight text-bone/15 transition-colors duration-500 group-hover:text-ember/30 ${
                i === 0 ? 'text-8xl md:text-9xl' : 'text-6xl md:text-7xl'
              }`}
            >
              {pillar.index}
            </span>
            <div className="mt-8 max-w-xl">
              <h3 className="font-mono text-xs tracking-[0.25em] text-bone">{pillar.tag}</h3>
              <p className="mt-3 text-base leading-relaxed text-ash md:text-lg">{pillar.line}</p>
            </div>
          </div>
        </GlassPanel>
      </m.div>
    </m.div>
  );
}

// Asymmetric bento: the studio pillar anchors a 2x2 cell, the other two
// stack beside it. Every card carries real media — no empty boxes — under
// glass with a cursor-tilt + ember-glow hover.
export function Pillars() {
  return (
    <section className="relative overflow-hidden">
      {/* Phase 5 (Landing_Page_Patches.pdf): "pitch black in the background
          with no bleeding image" — full-bleed ambient loop behind the whole
          section instead of flat void. Genuinely unused asset (verified no
          other reference in the repo), dimmed + feathered top/bottom so it
          never fights the card media or the eyebrow label above it. */}
      <div aria-hidden className="absolute inset-0">
        {/* C-P13 playback fix: the raw autoPlay+preload="none" video never
            started (no play() call, autoplay ignored on deferred loads).
            AmbientVideo's in-view play()/pause() gating is the working
            pattern — poster generated for it this session. */}
        <AmbientVideo
          src="/media/about-hero-red-curves.mp4"
          poster="/media/about-hero-red-curves-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,9,8,0.75) 0%, rgba(10,9,8,0.4) 20%, rgba(10,9,8,0.4) 80%, rgba(10,9,8,0.85) 100%)',
          }}
        />
      </div>
      {/* condensed from pt-8/pb-24 md:pt-12/pb-32 — Phase 5: "spacing of
          this entire section is so atrociously done" */}
      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-4 md:px-12 md:pb-20 md:pt-6 lg:px-16">
        <p className="font-mono text-[10px] tracking-[0.3em] text-ash">WHAT WE DO</p>

        {/* C-P13 rebalance: fixed equal row tracks replace auto-rows-fr (the
            anchor's min-h fought the fr rows and read lopsided) — anchor =
            2 rows + gap, side cards exactly one row each. */}
        <div className="mt-10 grid gap-4 md:auto-rows-[13.5rem] md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.index} pillar={pillar} i={i} />
          ))}
        </div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10"
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
