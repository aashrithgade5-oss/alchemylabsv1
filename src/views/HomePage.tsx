'use client';

import { lazy, Suspense } from 'react';
import { Hero } from '@/components/furnace/home/Hero';
import { Loader } from '@/components/furnace/home/Loader';
import { HomeAtmosphere } from '@/components/furnace/home/HomeAtmosphere';

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
        <FeaturedWork />
        <Intertext eyebrow="THE OFFER">
          <span className="block">No estimates.</span>
          <span className="block">No discovery calls.</span>
          <span className="block">A price on the wall.</span>
        </Intertext>
        <TheFive />
        <StudioMotion />
        <ClosingBand />
      </Suspense>
    </main>
  );
}
