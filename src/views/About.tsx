'use client';

import { lazy, Suspense } from 'react';
import { AboutHero } from '@/components/about/AboutHero';
import { FounderCircles } from '@/components/about/FounderCircles';

const AboutStory = lazy(async () => {
  const module = await import('@/components/about/AboutStory');
  return { default: module.AboutStory };
});

export default function About() {
  return (
    <main className="relative min-h-screen bg-void font-sans">
      <AboutHero />
      <FounderCircles />
      <Suspense fallback={null}>
        <AboutStory />
      </Suspense>
    </main>
  );
}
