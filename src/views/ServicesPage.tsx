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
        <FiveGrid />
        <FAQ />
        <ServicesClosing />
      </Suspense>
    </main>
  );
}
