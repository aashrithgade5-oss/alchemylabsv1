'use client';

import { lazy, Suspense } from 'react';
import { Hero } from '@/components/furnace/home/Hero';
import { Loader } from '@/components/furnace/home/Loader';
import { HomeAtmosphere } from '@/components/furnace/home/HomeAtmosphere';
import { ScrollScrub } from '@/components/furnace/fx/ScrollScrub';

// Kinetic quote beat: eyebrow + the signature per-word scroll reveal, big.
function ScrubBeat({
  eyebrow,
  text,
  compact = false,
}: {
  eyebrow: string;
  text: string | string[];
  /** Phase 7 (Landing_Page_Patches.pdf): "extremely large spacing" —
      THE PROOF feeds directly into the Work carousel right after. */
  compact?: boolean;
}) {
  return (
    <section
      className={`relative flex flex-col items-center justify-center px-6 ${compact ? 'min-h-[42svh]' : 'min-h-[70svh]'}`}
    >
      <p className="font-mono text-[10px] tracking-[0.35em] text-ash">{eyebrow}</p>
      <div className="relative mt-8">
        {/* boxless refractive halo behind the type */}
        <div aria-hidden className="glass-halo absolute -inset-x-12 -inset-y-8 z-0" />
        <ScrollScrub
          text={text}
          className="relative z-10 max-w-5xl justify-center text-center font-headline text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.05] tracking-[-0.03em] text-bone"
          wordClassName="glass-type"
        />
      </div>
    </section>
  );
}

// Below-fold sections load after first paint; keeps homepage First Load JS
// under the 150kB budget.
const TurnSequence = lazy(() =>
  import('@/components/furnace/home/TurnSequence').then((m) => ({ default: m.TurnSequence })),
);
const Intertext = lazy(() =>
  import('@/components/furnace/home/Intertext').then((m) => ({ default: m.Intertext })),
);
const StillBreak = lazy(() =>
  import('@/components/furnace/home/StillBreak').then((m) => ({ default: m.StillBreak })),
);
const Pillars = lazy(() =>
  import('@/components/furnace/home/Pillars').then((m) => ({ default: m.Pillars })),
);
const FeaturedWork = lazy(() =>
  import('@/components/furnace/home/FeaturedWork').then((m) => ({ default: m.FeaturedWork })),
);
const TheFive = lazy(() =>
  import('@/components/furnace/home/TheFive').then((m) => ({ default: m.TheFive })),
);
const StudioMotion = lazy(() =>
  import('@/components/furnace/home/StudioMotion').then((m) => ({ default: m.StudioMotion })),
);
const ClosingBand = lazy(() =>
  import('@/components/furnace/home/ClosingBand').then((m) => ({ default: m.ClosingBand })),
);
const ThreeDMarquee = lazy(() =>
  import('@/components/furnace/ThreeDMarquee').then((m) => ({ default: m.ThreeDMarquee })),
);

export default function HomePage() {
  return (
    <main className="relative font-sans">
      <HomeAtmosphere />
      <Loader />
      <Hero />
      <Suspense fallback={null}>
        <TurnSequence />
        <Intertext eyebrow="THE PRACTICE" compact>
          <span className="block">A thousand drafts.</span>
          <span className="block">One that ships.</span>
        </Intertext>
        <Pillars />
        <StillBreak />
        <ScrubBeat eyebrow="THE PROOF" text="Every frame here survived the eye." compact />
        <FeaturedWork />
        <Intertext eyebrow="THE OFFER" compact>
          <span className="block">No estimates.</span>
          <span className="block">No discovery calls.</span>
          <span className="block">A price on the wall.</span>
        </Intertext>
        <TheFive />
        <ScrubBeat eyebrow="THE STANDARD" text={['One studio.', 'One bar.', 'No exceptions.']} compact />
        <StudioMotion />
        <ThreeDMarquee />
        <ClosingBand />
      </Suspense>
    </main>
  );
}
