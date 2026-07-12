'use client';

import { lazy, Suspense } from 'react';
import { Hero } from '@/components/furnace/home/Hero';
import { Loader } from '@/components/furnace/home/Loader';
import { HomeAtmosphere } from '@/components/furnace/home/HomeAtmosphere';
import { ScrollScrub } from '@/components/furnace/fx/ScrollScrub';

// Kinetic quote beat: eyebrow + the signature per-word scroll reveal, big.
function ScrubBeat({ eyebrow, text }: { eyebrow: string; text: string }) {
  return (
    <section className="relative flex min-h-[70svh] flex-col items-center justify-center px-6">
      <p className="font-mono text-[10px] tracking-[0.35em] text-ash">{eyebrow}</p>
      <ScrollScrub
        text={text}
        className="mt-8 max-w-5xl text-center font-sans text-5xl font-bold leading-[1.05] tracking-tight text-bone md:text-7xl lg:text-8xl"
      />
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

export default function HomePage() {
  return (
    <main className="relative font-sans">
      <HomeAtmosphere />
      <Loader />
      <Hero />
      <Suspense fallback={null}>
        <TurnSequence />
        <Intertext eyebrow="THE PRACTICE">
          <span className="block">Generation is cheap.</span>
          <span className="block">Judgment is not.</span>
        </Intertext>
        <Pillars />
        <StillBreak />
        <ScrubBeat eyebrow="THE PROOF" text="Every frame here survived the eye." />
        <FeaturedWork />
        <Intertext eyebrow="THE OFFER">
          <span className="block">No estimates.</span>
          <span className="block">No discovery calls.</span>
          <span className="block">A price on the wall.</span>
        </Intertext>
        <TheFive />
        <ScrubBeat eyebrow="THE STANDARD" text="One studio. One bar. No exceptions." />
        <StudioMotion />
        <ClosingBand />
      </Suspense>
    </main>
  );
}
