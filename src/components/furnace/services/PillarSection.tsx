'use client';

import Image from 'next/image';
import Link from 'next/link';
import { m } from 'framer-motion';
import { MagneticCTA } from '../MagneticCTA';
import { GlassPanel } from '../GlassPanel';
import { GlassFluted } from '../GlassFluted';
import { ScrollScrub } from '../fx/ScrollScrub';
import { SmoothReveal } from '../fx/SmoothReveal';
import { useTilt } from '@/hooks/useTilt';
import { offerSlug, type Pillar } from './pillars';
import { PillarLoop } from './SvcMedia';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// One kanji numeral per pillar — the section's single Japanese motif.
// C-P20: watermark opacity raised 0.07→0.15 (was near-invisible; should
// read as a deliberate texture layer).
const kanji = ['壱', '弐', '参'];

// C-P20: per-pillar accent for the still's hover glow (palette only).
const accents = ['#FF4D1C', '#FFA028', '#EDE6DD'];

// C-P20: cursor 3D-tilt wrapper for the pillar still, same recipe as the
// landing bento cards (useTilt + perspective), with a per-category glow.
function TiltStill({ accent, children }: { accent: string; children: React.ReactNode }) {
  const tilt = useTilt();
  return (
    <div style={{ perspective: 1200 }}>
      <m.div
        onPointerMove={tilt.onMove}
        onPointerLeave={tilt.onLeave}
        style={
          {
            rotateX: tilt.rotateX,
            rotateY: tilt.rotateY,
            transformStyle: 'preserve-3d',
            '--pillar-glow': `0 0 60px ${accent}38`,
          } as React.ComponentProps<typeof m.div>['style']
        }
        className="relative aspect-[3/4] w-[18rem] overflow-hidden rounded-2xl border border-line transition-shadow duration-500 hover:shadow-[var(--pillar-glow)] xl:w-[22rem]"
      >
        {children}
      </m.div>
    </div>
  );
}

/**
 * One pillar: an oversized numeral cropped by the section edge over its
 * kanji counterpart, mono tag row, and the offer stack in glass. Numeral
 * side alternates per pillar so the page reads as a staggered column.
 */
export function PillarSection({ pillar, index }: { pillar: Pillar; index: number }) {
  const numeralRight = index % 2 === 1;
  const edge = numeralRight ? '-right-6 md:-right-10' : '-left-6 md:-left-10';

  return (
    <section id={`pillar-${index + 1}`} className="relative scroll-mt-24 overflow-hidden">
      {/* C-P24: the Japanese red was reading too faint — a directional ember
          wash bleeds from the numeral side so every pillar sits in red air */}
      <div
        aria-hidden
        className="absolute inset-y-0 w-2/3"
        style={{
          [numeralRight ? 'right' : 'left']: 0,
          background: `radial-gradient(48rem 36rem at ${numeralRight ? '100%' : '0%'} 40%, rgba(255,77,28,0.13) 0%, rgba(178,34,20,0.06) 45%, transparent 72%)`,
        }}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute top-6 select-none font-sans text-[10rem] leading-none text-ember/[0.15] md:top-2 md:text-[18rem] ${edge}`}
      >
        {kanji[index % kanji.length]}
      </span>
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-10 select-none font-sans text-[16rem] font-black leading-none text-carbon-2 md:-top-16 md:text-[26rem] ${edge}`}
      >
        {pillar.numeral}
      </span>

      <div
        className={`relative mx-auto flex max-w-6xl flex-col px-6 py-16 md:px-12 md:py-20 lg:px-16 ${
          numeralRight ? '' : 'items-end text-left lg:pl-40'
        }`}
      >
        <div
          className={`grid w-full items-center gap-12 ${
            numeralRight
              ? 'lg:grid-cols-[auto_minmax(0,1fr)]'
              : 'lg:grid-cols-[minmax(0,1fr)_auto]'
          }`}
        >
        <div className={`w-full max-w-2xl ${numeralRight ? 'lg:order-last' : ''}`}>
          {/* below lg the tilt still is hidden: same still + loop as a short banner */}
          <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-line lg:hidden">
            <Image src={pillar.still} alt="" fill sizes="(min-width: 768px) 42rem, 100vw" className="object-cover" />
            <PillarLoop slug={pillar.slug} className="absolute inset-0 h-full w-full object-cover" />
            <div aria-hidden className="absolute inset-0 bg-void/30" />
          </div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-ash">{pillar.tag}</p>
          <ScrollScrub
            text={pillar.title}
            className="mt-5 font-headline text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.05] tracking-[-0.03em] text-bone"
            wordClassName="glass-type"
          />
          <p className="mt-5 max-w-md text-base leading-relaxed text-ash">{pillar.description}</p>

          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease }}
            className="relative z-10 mt-8"
          >
            {/* GlassFluted: Phase-2 Paper Shaders prototype, this call site only */}
            <GlassPanel className="px-5 py-1 md:px-8">
              <GlassFluted />
              <ul className="flex flex-col">
                {pillar.offers.map((offer) => (
                  <li key={offer.name} className="group relative border-t border-line py-5 first:border-t-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="font-sans text-lg font-bold text-bone transition-colors duration-300 group-hover:text-ember md:text-2xl">
                        {/* whole row is the tap target via the stretched link */}
                        <Link
                          href={`/services/studio/${offerSlug(offer.name)}`}
                          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-lg focus-visible:after:ring-2 focus-visible:after:ring-ember"
                        >
                          {offer.name}
                          <span aria-hidden className="ml-2 inline-block text-ember transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </Link>
                      </h3>
                      <span className="font-mono text-[10px] tracking-[0.25em] text-ash">
                        {offer.timeline}
                      </span>
                    </div>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-ash">{offer.line}</p>
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </m.div>

          <div className="mt-8">
            <MagneticCTA href={`/contact?pillar=${pillar.slug}`} variant="ghost">
              Book the sprint
            </MagneticCTA>
          </div>
        </div>

        {/* cinematic still, opposite the numeral — C-P20: cursor 3D-tilt
            (same treatment as the landing service boxes) + category glow.
            C-P24 overlapping bento: the still rides INTO the offer stack's
            column (negative margin, higher z, slight counter-rotation) so
            the two read as one overlapped composition, not two columns. */}
        <SmoothReveal
          className={`relative z-20 hidden lg:block ${
            numeralRight
              ? 'lg:-mr-16 lg:rotate-[1.5deg] xl:-mr-24'
              : 'lg:-ml-16 lg:rotate-[-1.5deg] xl:-ml-24'
          }`}
        >
          <TiltStill accent={accents[index % accents.length]}>
            <Image
              src={pillar.still}
              alt=""
              fill
              quality={90}
              sizes="(min-width: 1280px) 22rem, 18rem"
              className="object-cover"
            />
            {/* pillar loop rides over the still; on 404 it unmounts and the still remains */}
            <PillarLoop slug={pillar.slug} className="absolute inset-0 h-full w-full object-cover" />
            <div aria-hidden className="absolute inset-0 bg-void/30" />
          </TiltStill>
        </SmoothReveal>
        </div>
      </div>
    </section>
  );
}
