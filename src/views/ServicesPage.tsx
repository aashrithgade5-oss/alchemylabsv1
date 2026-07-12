'use client';

import { lazy, Suspense } from 'react';
import { ServicesHero } from '@/components/furnace/services/ServicesHero';
import { PillarSection } from '@/components/furnace/services/PillarSection';
import { pillars } from '@/components/furnace/services/pillars';

const FiveGrid = lazy(() =>
  import('@/components/furnace/services/FiveGrid').then((m) => ({ default: m.FiveGrid })),
);
const FAQ = lazy(() =>
  import('@/components/furnace/services/FAQ').then((m) => ({ default: m.FAQ })),
);

export default function ServicesPage() {
  return (
    <main className="bg-void font-sans">
      <ServicesHero />
      {pillars.map((pillar, i) => (
        <PillarSection key={pillar.slug} pillar={pillar} index={i} />
      ))}
      <Suspense fallback={null}>
        <FiveGrid />
        <FAQ />
      </Suspense>
    </main>
  );
}
