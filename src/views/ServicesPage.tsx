'use client';

import { lazy, Suspense } from 'react';
import { ServicesHero } from '@/components/furnace/services/ServicesHero';
import { PillarSection } from '@/components/furnace/services/PillarSection';
import { pillars } from '@/components/furnace/services/pillars';
import { HomeAtmosphere } from '@/components/furnace/home/HomeAtmosphere';

// Below-fold sections split out of the first chunk.
const TheFive = lazy(() =>
  import('@/components/furnace/home/TheFive').then((m) => ({ default: m.TheFive })),
);
const EngagementSteps = lazy(() =>
  import('@/components/furnace/services/EngagementSteps').then((m) => ({ default: m.EngagementSteps })),
);
const FAQ = lazy(() =>
  import('@/components/furnace/services/FAQ').then((m) => ({ default: m.FAQ })),
);
const ServicesClosing = lazy(() =>
  import('@/components/furnace/services/ServicesClosing').then((m) => ({
    default: m.ServicesClosing,
  })),
);

// Page-wide word-break law: balanced headings, pretty body copy.
const wrap = '[&_h1]:[text-wrap:balance] [&_h2]:[text-wrap:balance] [&_h3]:[text-wrap:balance] [&_p]:[text-wrap:pretty]';

// Order: promise -> fixed-price offers -> pillars -> process -> FAQ -> close.
// (FiveGrid dropped here: it duplicated TheFive's offers and its #the-five id.)
export default function ServicesPage() {
  return (
    <main className={`relative overflow-x-clip font-sans ${wrap}`}>
      <HomeAtmosphere />
      <ServicesHero />
      <Suspense fallback={null}>
        <TheFive />
      </Suspense>
      {pillars.map((pillar, i) => (
        <PillarSection key={pillar.slug} pillar={pillar} index={i} />
      ))}
      <Suspense fallback={null}>
        <EngagementSteps />
        <FAQ />
        <ServicesClosing />
      </Suspense>
    </main>
  );
}
