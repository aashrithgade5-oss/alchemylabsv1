import { memo, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { YinYangHero } from '@/components/about/YinYangHero';
import { FounderCircles } from '@/components/about/FounderCircles';
import { PhilosophySection } from '@/components/about/PhilosophySection';
import { LazySection, SectionSkeleton } from '@/components/LazySection';

const AboutProcessSection = lazy(async () => {
  const module = await import('@/components/about/ProcessSection');
  return { default: module.AboutProcessSection };
});
const PrinciplesSection = lazy(async () => {
  const module = await import('@/components/about/PrinciplesSection');
  return { default: module.PrinciplesSection };
});
const WhoWeServe = lazy(async () => {
  const module = await import('@/components/about/WhoWeServe');
  return { default: module.WhoWeServe };
});
const FoundersCTA = lazy(async () => {
  const module = await import('@/components/about/FoundersCTA');
  return { default: module.FoundersCTA };
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
      className="w-1 h-1 rounded-full bg-alchemy-red/30"
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
      <SEOHead 
        title="About Us - Alchemy Labs | Brand Architecture & AI-Native Strategy"
        description="Meet the founders behind Alchemy Labs. We architect meaning, systems, and inevitability for brands that think long-term."
      />
      <Navigation />
      
      <YinYangHero />

      <SectionDivider />

      <RevealSection direction="up">
        <FounderCircles />
      </RevealSection>

      <SectionDivider />

      <RevealSection direction="left" delay={0.05}>
        <PhilosophySection />
      </RevealSection>

      <SectionDivider />

      <LazySection minHeight="500px" skeleton={<SectionSkeleton variant="default" />}>
        <Suspense fallback={<SectionSkeleton variant="default" />}>
          <RevealSection direction="right" delay={0.05}>
            <AboutProcessSection />
          </RevealSection>
        </Suspense>
      </LazySection>

      <SectionDivider />

      <LazySection minHeight="350px" skeleton={<SectionSkeleton variant="grid" />}>
        <Suspense fallback={<SectionSkeleton variant="grid" />}>
          <RevealSection direction="up">
            <PrinciplesSection />
          </RevealSection>
        </Suspense>
      </LazySection>

      <SectionDivider />

      <LazySection minHeight="300px" skeleton={<SectionSkeleton variant="text" />}>
        <Suspense fallback={<SectionSkeleton variant="text" />}>
          <RevealSection direction="left">
            <WhoWeServe />
          </RevealSection>
        </Suspense>
      </LazySection>

      <LazySection minHeight="350px" skeleton={<SectionSkeleton variant="default" />}>
        <Suspense fallback={<SectionSkeleton variant="default" />}>
          <RevealSection direction="up" delay={0.05}>
            <FoundersCTA />
          </RevealSection>
        </Suspense>
      </LazySection>

      <Footer />
    </div>
  );
});

About.displayName = 'About';

export default About;
