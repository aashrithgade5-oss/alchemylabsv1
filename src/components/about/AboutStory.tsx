'use client';

import { m } from 'framer-motion';
import { Intertext } from '@/components/furnace/home/Intertext';
import { AmbientVideo } from '@/components/furnace/home/AmbientVideo';
import { ScrollScrub } from '@/components/furnace/fx/ScrollScrub';
import { GlassPanel } from '@/components/furnace/GlassPanel';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// C-P24 About overhaul: everything below the founder cards is rebuilt in
// the furnace language — the premise (pull-quote with meteors), the origin
// story over the samurai loop, the three-move discipline in kanji glass
// rows, and the meaning of the name. Hero + FounderCircles untouched.
const MOVES = [
  {
    numeral: '01',
    kanji: '読',
    name: 'DECODE',
    line: 'We read the brand before we touch it. What it owns, what it owes, what it must never say.',
  },
  {
    numeral: '02',
    kanji: '型',
    name: 'ARCHITECT',
    line: 'Systems before assets. One spine of type, color, and voice that every future piece must obey.',
  },
  {
    numeral: '03',
    kanji: '刃',
    name: 'EXECUTE',
    line: 'Anyone can make a thousand images. Choosing one is the job. That one carries our name.',
  },
];

const reveal = {
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-80px' },
};

export function AboutStory() {
  return (
    <div className="relative font-sans">
      {/* THE PREMISE — the page's editorial hinge */}
      <Intertext eyebrow="THE PREMISE" compact>
        <span className="block">Machines multiplied creation.</span>
        <span className="block">They could not multiply care.</span>
      </Intertext>

      {/* THE STORY — origin, over the turning samurai */}
      <section className="relative overflow-hidden">
        <AmbientVideo
          src="/media/samurai-silhouette-2.mp4"
          poster="/media/samurai-silhouette-2-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div aria-hidden className="absolute inset-0 bg-void/55" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-void to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 py-28 md:px-12 md:py-36 lg:px-16">
          <p className="font-mono text-[10px] tracking-[0.3em] text-ash">THE STORY</p>
          <ScrollScrub
            text="Born in the flood."
            className="mt-5 font-headline text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[1.05] tracking-[-0.03em] text-bone"
            wordClassName="glass-type"
          />
          <m.p
            {...reveal}
            transition={{ duration: 0.9, ease }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-bone/75 md:text-lg"
          >
            Alchemy Labs began the year generation became free. Every feed filled overnight.
            Every brand could suddenly make everything, and almost all of it looked the same. We
            took the opposite bet: when output is infinite, judgment is the only scarce material
            left.
          </m.p>
          <m.p
            {...reveal}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="mt-8 font-playfair text-2xl italic text-bone/85 md:text-3xl"
          >
            So we built a studio shaped like a furnace.
          </m.p>
          <m.p
            {...reveal}
            transition={{ duration: 0.9, delay: 0.25, ease }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-bone/75 md:text-lg"
          >
            Volume goes in. Heat is applied. One deliberate thing comes out, and it ships.
          </m.p>
        </div>
      </section>

      {/* THE DISCIPLINE — three moves in kanji glass rows */}
      <section className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32 lg:px-16">
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-2/3"
          style={{
            background:
              'radial-gradient(48rem 36rem at 0% 50%, rgba(255,77,28,0.11) 0%, transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <p className="font-mono text-[10px] tracking-[0.3em] text-ash">THE DISCIPLINE</p>
          <ScrollScrub
            text="Three moves. Every time."
            className="mt-5 font-headline text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.1] tracking-[-0.03em] text-bone"
            wordClassName="glass-type"
          />
          <div className="mt-14 flex flex-col gap-5">
            {MOVES.map((move, i) => (
              <m.div
                key={move.numeral}
                {...reveal}
                transition={{ duration: 0.9, delay: i * 0.12, ease }}
              >
                <GlassPanel className="relative overflow-hidden">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-8 right-2 select-none font-sans text-[9rem] leading-none text-ember/[0.14] md:-top-14 md:text-[14rem]"
                  >
                    {move.kanji}
                  </span>
                  <div className="relative flex flex-col gap-3 p-8 md:flex-row md:items-baseline md:gap-10 md:p-10">
                    <span className="font-mono text-xs tracking-[0.3em] text-ember">
                      {move.numeral}
                    </span>
                    <h3 className="font-headline text-2xl font-black tracking-tight text-bone md:w-56 md:text-3xl">
                      {move.name}
                    </h3>
                    <p className="max-w-xl text-sm leading-relaxed text-ash md:text-base">
                      {move.line}
                    </p>
                  </div>
                </GlassPanel>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* THE NAME — why Alchemy */}
      <section className="relative overflow-hidden px-6 py-28 text-center md:py-36">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(50% 45% at 50% 55%, rgba(255,77,28,0.12) 0%, rgba(178,34,20,0.05) 50%, transparent 75%)',
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <p className="font-mono text-[10px] tracking-[0.3em] text-ash">THE NAME</p>
          <ScrollScrub
            text="Alchemy was never about gold."
            className="mt-5 justify-center font-headline text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.1] tracking-[-0.03em] text-bone"
            wordClassName="glass-type"
          />
          <m.p
            {...reveal}
            transition={{ duration: 0.9, ease }}
            className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-bone/75 md:text-lg"
          >
            It was about transformation under pressure. Base material goes in, something rarer
            comes out, and the process refuses to be rushed. That is the entire practice: your
            brand as it stands, transmuted into the brand it was supposed to be.
          </m.p>
          <m.p
            {...reveal}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="mt-10 font-playfair text-xl italic text-bone/70 md:text-2xl"
          >
            The rest is heat and judgment.
          </m.p>
        </div>
      </section>
    </div>
  );
}
