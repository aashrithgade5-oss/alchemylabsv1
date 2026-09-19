'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { KineticHeadline } from '../KineticHeadline';
import { GlassPanel } from '../GlassPanel';
import { MagneticCTA } from '../MagneticCTA';
import { HomeAtmosphere } from '../home/HomeAtmosphere';
import { SvcImage } from './SvcMedia';
import { findOffer, processByPillar } from './offerDetails';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const kanji: Record<string, string> = { ai: '壱', brand: '弐', advisory: '参' };

// Inter Bold section line with exactly one Playfair italic emphasis word.
function SectionTitle({ lead, em, tail = '' }: { lead: string; em: string; tail?: string }) {
  return (
    <h2 className="font-headline text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em] text-bone">
      <span className="glass-type">{lead} </span>
      <span className="font-playfair font-normal italic lowercase">{em}</span>
      {tail && <span className="glass-type">{tail}</span>}
    </h2>
  );
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function OfferDetailView({ slug }: { slug: string }) {
  const entry = findOffer(slug);
  if (!entry) return null;
  const { offer, pillar, detail } = entry;
  const steps = processByPillar[pillar.slug];
  const index = Number(pillar.numeral);

  return (
    <main className="relative overflow-x-clip font-sans">
      <HomeAtmosphere />

      {/* hero: same ember wash + kanji watermark as the pillar sections */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(48rem 36rem at 0% 30%, rgba(255,77,28,0.13) 0%, rgba(178,34,20,0.06) 45%, transparent 72%)',
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -left-4 top-16 select-none font-sans text-[9rem] leading-none text-ember/[0.15] md:text-[16rem]"
        >
          {kanji[pillar.slug]}
        </span>

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-32 md:px-12 md:pt-40 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:px-16">
          <div>
            <Link
              href={`/services#pillar-${index}`}
              className="inline-flex min-h-[44px] items-center font-mono text-[10px] tracking-[0.3em] text-ash transition-colors hover:text-bone"
            >
              ← {pillar.numeral} · {pillar.title.toUpperCase()}
            </Link>
            <KineticHeadline
              as="h1"
              text={offer.name}
              className="mt-4 font-headline text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-bone"
              wordClassName="glass-type"
              delay={0.15}
            />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-bone/75 md:text-lg">{offer.line}</p>
            <p className="mt-6 font-mono text-[10px] tracking-[0.25em] text-ash">
              TYPICAL TIMELINE · {offer.timeline} · SCOPED PER PROJECT
            </p>
            <div className="mt-8">
              <MagneticCTA href={`/contact?pillar=${pillar.slug}`} variant="ember">
                Start a conversation
              </MagneticCTA>
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line sm:aspect-[16/10] lg:aspect-[4/5]">
            <SvcImage
              src={`/media/svc/${slug}.webp`}
              alt={`${offer.name}: visual direction from the ${pillar.title} pillar`}
              fill
              priority
              sizes="(min-width: 1024px) 26rem, 100vw"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-void/20" />
          </div>
        </div>
      </section>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 md:gap-24 md:px-12 lg:px-16">
        <Reveal className="grid gap-8 md:grid-cols-2">
          <div>
            <SectionTitle lead="What it" em="is" />
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ash">{detail.what}</p>
          </div>
          <div>
            <SectionTitle lead="What you" em="get" />
            <GlassPanel className="mt-5 px-6 py-2">
              <ul>
                {detail.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 border-t border-line py-4 text-sm leading-relaxed text-bone first:border-t-0">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ember" />
                    {d}
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </div>
        </Reveal>

        <Reveal>
          <SectionTitle lead="How it" em="runs" />
          <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t border-line pt-5">
                <p className="font-mono text-[10px] tracking-[0.25em] text-ember">0{i + 1}</p>
                <h3 className="mt-3 font-sans text-lg font-bold text-bone">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 font-mono text-[10px] tracking-[0.25em] text-ash">
            TYPICAL TIMELINE · {offer.timeline} · CONFIRMED IN WRITING BEFORE WORK STARTS
          </p>
        </Reveal>

        <Reveal className="grid gap-5 md:grid-cols-2">
          <GlassPanel className="p-7">
            <h2 className="font-headline text-2xl font-bold text-bone">
              Who it&rsquo;s <span className="font-playfair font-normal italic">for</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ash">{detail.forWho}</p>
          </GlassPanel>
          <GlassPanel className="p-7">
            <h2 className="font-headline text-2xl font-bold text-bone">
              Who it&rsquo;s <span className="font-playfair font-normal italic">not</span> for
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ash">{detail.notFor}</p>
          </GlassPanel>
        </Reveal>

        <Reveal className="max-w-3xl">
          <SectionTitle lead="Before you" em="ask" />
          <div className="mt-8">
            {detail.faqs.map((f) => (
              <details key={f.q} className="group border-t border-line last:border-b">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-sans text-lg font-bold text-bone transition-colors group-hover:text-ember">{f.q}</h3>
                  <span aria-hidden className="font-mono text-lg text-ash transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-ash">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>

        <Reveal className="flex flex-col items-start gap-6 border-t border-line pt-12 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md font-headline text-2xl font-bold text-bone">
            Scope it in one <span className="font-playfair font-normal italic">conversation</span>.
          </p>
          <div className="flex flex-wrap gap-4">
            <MagneticCTA href={`/contact?pillar=${pillar.slug}`} variant="ember">
              Start a conversation
            </MagneticCTA>
            <MagneticCTA href={`/services#pillar-${index}`} variant="ghost">
              All {pillar.title} offers
            </MagneticCTA>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
