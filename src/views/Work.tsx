'use client';

import { lazy, Suspense, useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { portfolio } from '@lib/portfolio';
import { GlassPanel } from '@/components/furnace/GlassPanel';
import { KineticHeadline } from '@/components/furnace/KineticHeadline';
// Lazy like the homepage: ClosingBand drags TextHoverEffect + the marquee
// into First Load otherwise (/work 134→159kB when imported statically).
const ClosingBand = lazy(() =>
  import('@/components/furnace/home/ClosingBand').then((mod) => ({ default: mod.ClosingBand })),
);
import { AmbientVideo } from '@/components/furnace/home/AmbientVideo';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

function WorkTile({ entry, large }: { entry: (typeof portfolio)[number]; large: boolean }) {
  return (
    <GlassPanel className={`group h-full ${large ? 'md:min-h-[28rem]' : ''}`}>
      {entry.video ? (
        <AmbientVideo
          src={entry.video.src}
          poster={entry.video.poster}
          className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity duration-700 group-hover:opacity-90"
        />
      ) : (
        <Image
          src={entry.visuals[0] ?? entry.image}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover opacity-70 transition-opacity duration-700 group-hover:opacity-90"
        />
      )}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent" />
      <div className="relative flex h-full min-h-[18rem] flex-col justify-end p-8 md:p-10">
        <p className="font-mono text-[10px] tracking-[0.25em] text-ember">
          {entry.label} · {entry.discipline}
        </p>
        <h2
          className={`mt-4 font-headline font-bold leading-[1.05] tracking-[-0.035em] text-bone [text-wrap:balance] ${large ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'}`}
        >
          {entry.title}
        </h2>
        <p className={`mt-3 max-w-md leading-relaxed text-bone/70 [text-wrap:pretty] ${large ? 'text-base md:text-lg' : 'text-sm'}`}>
          {entry.summary}
        </p>
      </div>
    </GlassPanel>
  );
}

export default function Work() {
  const [featured, ...rest] = portfolio;
  const heroRef = useRef<HTMLElement>(null);
  // C-P18: hero video replaced with the Solutions-page "moving lights"
  // treatment — scroll parallax (scale + y) over a static glow texture,
  // plus a slow drifting glow layer. Unique asset (red-glow-box.webp);
  // red-slats-wide.mp4 moves down to the bento backdrop.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end end'] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <main className="relative font-sans">
      <section ref={heroRef} className="relative min-h-[70vh] overflow-hidden bg-void">
        <div aria-hidden className="absolute inset-0">
          <m.div className="absolute inset-0" style={{ scale: bgScale, y: bgY }}>
            <Image
              src="/media/mb-samurai-glass-walk.webp"
              alt=""
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover object-[70%_50%] opacity-[0.55]"
            />
          </m.div>
          {/* the "lights moving" pass: an oversized copy drifting slowly
              sideways under the parallax layer's blend */}
          <m.div
            className="absolute -inset-x-[20%] inset-y-0 mix-blend-screen"
            animate={{ x: ['-4%', '4%'] }}
            transition={{ duration: 22, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
          >
            <Image
              src="/media/mb-samurai-glass-walk.webp"
              alt=""
              fill
              quality={75}
              sizes="140vw"
              className="object-cover object-center opacity-[0.14] blur-[2px]"
            />
          </m.div>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(10,9,8,0.35) 0%, rgba(10,9,8,0.55) 55%, rgba(10,9,8,1) 100%)',
            }}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-40 md:px-12 md:pb-20 md:pt-48 lg:px-16">
          <p className="font-mono text-[10px] tracking-[0.3em] text-bone/70 md:text-[11px]">
            SELECTED WORK
          </p>
          <KineticHeadline
            as="h1"
            text="Proof over polish."
            className="mt-7 max-w-4xl font-headline text-[clamp(3rem,7vw,7rem)] font-bold leading-[1.02] tracking-[-0.045em] text-bone"
            wordClassName="glass-type"
            delay={0.15}
          />
          <m.p
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.5, ease }}
            className="mt-6 max-w-xl font-playfair text-xl italic text-bone/75 md:text-2xl"
          >
            The work speaks in befores and afters.
          </m.p>
        </div>
      </section>

      {/* C-P18 bento: 6 entries (Porsche showreel added as the 6th) —
          featured 2x2 anchor + five singles fill a clean 3x3. The flat void
          behind the grid gains the red-slats loop, dimmed and feathered,
          matching the depth treatment elsewhere on the rebuilt pages. */}
      <section className="relative overflow-hidden px-6 pb-24 md:px-12 md:pb-32">
        <div aria-hidden className="section-feather absolute inset-0">
          <AmbientVideo
            src="/media/red-slats-wide.mp4"
            poster="/media/red-slats-wide-poster.jpg"
            className="h-full w-full object-cover opacity-[0.08]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(10,9,8,0.95) 0%, rgba(10,9,8,0.55) 25%, rgba(10,9,8,0.55) 75%, rgba(10,9,8,0.95) 100%)',
            }}
          />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-4 md:auto-rows-fr md:grid-cols-3">
          {featured && (
            <m.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease }}
              className="md:col-span-2 md:row-span-2"
            >
              <WorkTile entry={featured} large />
            </m.div>
          )}
          {rest.map((entry, i) => (
            <m.div
              key={entry.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease }}
            >
              <WorkTile entry={entry} large={false} />
            </m.div>
          ))}
        </div>
      </section>

      {/* C-P12: the orphaned client-logo strip is replaced with the work
          pedagogy, in copy voice. */}
      <section className="relative overflow-hidden border-t border-line px-6 py-28 md:px-12 md:py-36">
        {/* "keep the one frame": one still figure in a blurred crowd */}
        <div aria-hidden className="section-feather absolute inset-0">
          <Image
            src="/media/mb-the-one-who-stays.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void via-void/55 to-void" />
          <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-transparent to-transparent" />
        </div>
        <m.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease }}
          className="relative mx-auto max-w-6xl"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-ash">THE PEDAGOGY</p>
          <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-bone/75 md:text-xl">
            Most studios sell hours. We sell judgment. Every engagement here runs through the same
            discipline: generate wide, cut without mercy, keep the one frame that carries the
            brand. We build systems, not one-offs, so each identity, campaign, and film compounds
            instead of expiring. The work above survived that cut. If it looks restrained, that is
            the point. Restraint is what volume can never buy.
          </p>
          <Link
            href="/services"
            className="mt-8 inline-flex min-h-[44px] items-center font-mono text-[10px] tracking-[0.3em] text-ash transition-colors duration-300 hover:text-bone"
          >
            HOW WE WORK →
          </Link>
        </m.div>
      </section>

      {/* C-P17: identical full-bleed marquee CTA block as the homepage close */}
      <Suspense fallback={null}>
        <ClosingBand />
      </Suspense>
    </main>
  );
}
