'use client';

import { lazy, Suspense } from 'react';
import { ServicesHero } from '@/components/furnace/services/ServicesHero';
import { PillarSection } from '@/components/furnace/services/PillarSection';
import { pillars } from '@/components/furnace/services/pillars';
import { HomeAtmosphere } from '@/components/furnace/home/HomeAtmosphere';

const FiveGrid = lazy(() =>
  import('@/components/furnace/services/FiveGrid').then((m) => ({ default: m.FiveGrid })),
);
// C-P20: the same infinite offer marquee used on the landing page, placed
// directly after the hero so the first scroll lands on the offering list.
const TheFive = lazy(() =>
  import('@/components/furnace/home/TheFive').then((m) => ({ default: m.TheFive })),
);
const FAQ = lazy(() =>
  import('@/components/furnace/services/FAQ').then((m) => ({ default: m.FAQ })),
);
const ServicesClosing = lazy(() =>
  import('@/components/furnace/services/ServicesClosing').then((m) => ({
    default: m.ServicesClosing,
  })),
);
// C-P24: the page's editorial soul beat — same scroll-bound pull-quote
// primitive (with meteors) the homepage uses.
const Intertext = lazy(() =>
  import('@/components/furnace/home/Intertext').then((m) => ({ default: m.Intertext })),
);

export default function ServicesPage() {
  return (
    <main className="relative font-sans">
      <HomeAtmosphere />
      <ServicesHero />
      <Suspense fallback={null}>
        <TheFive />
      </Suspense>
      {pillars.map((pillar, i) => (
        <PillarSection key={pillar.slug} pillar={pillar} index={i} />
      ))}
      <Suspense fallback={null}>
        <Intertext eyebrow="THE STANDARD" compact>
          <span className="block">Three instruments.</span>
          <span className="block">One hand behind them.</span>
        </Intertext>
        <FiveGrid />
        <FAQ />
        <ServicesClosing />
      </Suspense>
    </main>
  );
}
