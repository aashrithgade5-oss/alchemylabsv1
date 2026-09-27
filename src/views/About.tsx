'use client';

import { memo, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { YinYangHero } from '@/components/about/YinYangHero';
import { FounderCircles } from '@/components/about/FounderCircles';
import { LazySection, SectionSkeleton } from '@/components/LazySection';

// C-P24 About overhaul: everything below FounderCircles is the new furnace
// story (AboutStory) — Philosophy/Process/Principles/WhoWeServe/FoundersCTA
// are retired (files kept on disk, no longer imported). BottomCTA closes
// the page site-wide.
const AboutStory = lazy(async () => {
  const module = await import('@/components/about/AboutStory');
  return { default: module.AboutStory };
});

const RevealSection = memo(({ children, direction = 'up', delay = 0 }: { children: React.ReactNode; direction?: 'up' | 'left' | 'right'; delay?: number }) => {
  const xMap = { up: 0, left: -32, right: 32 };
  return (
    <motion.div
      initial={{ opacity: 0, y: direction === 'up' ? 40 : 20, x: xMap[direction], scale: 0.97, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
});
RevealSection.displayName = 'RevealSection';

const SectionDivider = memo(() => (
  <div className="w-full max-w-6xl mx-auto py-4 flex items-center justify-center gap-3">
    <motion.div
      className="flex-1 h-px"
      style={{ background: 'linear-gradient(to right, transparent, rgba(250,250,249,0.06))' }}
      initial={{ scaleX: 0, originX: 1 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    />
    <motion.div
      className="w-1 h-1 rounded-full bg-ember/40"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.3 }}
    />
    <motion.div
      className="flex-1 h-px"
      style={{ background: 'linear-gradient(to left, transparent, rgba(250,250,249,0.06))' }}
      initial={{ scaleX: 0, originX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    />
  </div>
));
SectionDivider.displayName = 'SectionDivider';

const About = memo(() => {
  return (
    <div className="min-h-screen bg-background">

      <YinYangHero />

      <SectionDivider />

      <RevealSection direction="up">
        <FounderCircles />
      </RevealSection>

      <SectionDivider />

      <LazySection minHeight="900px" skeleton={<SectionSkeleton variant="default" />}>
        <Suspense fallback={<SectionSkeleton variant="default" />}>
          <AboutStory />
        </Suspense>
      </LazySection>
    </div>
  );
});

About.displayName = 'About';

export default About;
