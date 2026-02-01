import { memo, lazy, Suspense } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { YinYangHero } from '@/components/about/YinYangHero';
import { PhilosophySection } from '@/components/about/PhilosophySection';
import { LazySection, SectionSkeleton } from '@/components/LazySection';

// Lazy load below-the-fold sections
const AboutProcessSection = lazy(() => import('@/components/about/ProcessSection').then(m => ({ default: m.AboutProcessSection })));
const PrinciplesSection = lazy(() => import('@/components/about/PrinciplesSection').then(m => ({ default: m.PrinciplesSection })));
const WhoWeServe = lazy(() => import('@/components/about/WhoWeServe').then(m => ({ default: m.WhoWeServe })));
const FoundersCTA = lazy(() => import('@/components/about/FoundersCTA').then(m => ({ default: m.FoundersCTA })));

const About = memo(() => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="About Us - Alchemy Labs | Brand Architecture & AI-Native Strategy"
        description="Meet the founders behind Alchemy Labs. We architect meaning, systems, and inevitability for brands that think long-term."
      />
      <Navigation />
      
      {/* SECTION 1 — Dynamic Yin Yang Founder Introduction */}
      <YinYangHero />

      {/* SECTION 2 — Philosophy (Elevated from existing "Why Alchemy Labs") */}
      <PhilosophySection />

      {/* SECTION 3 — How We Work (Lazy loaded) */}
      <LazySection minHeight="500px" skeleton={<SectionSkeleton variant="default" />}>
        <Suspense fallback={<SectionSkeleton variant="default" />}>
          <AboutProcessSection />
        </Suspense>
      </LazySection>

      {/* SECTION 4 — Core Principles (Lazy loaded) */}
      <LazySection minHeight="350px" skeleton={<SectionSkeleton variant="grid" />}>
        <Suspense fallback={<SectionSkeleton variant="grid" />}>
          <PrinciplesSection />
        </Suspense>
      </LazySection>

      {/* SECTION 5 — Who We Serve (Lazy loaded) */}
      <LazySection minHeight="300px" skeleton={<SectionSkeleton variant="text" />}>
        <Suspense fallback={<SectionSkeleton variant="text" />}>
          <WhoWeServe />
        </Suspense>
      </LazySection>

      {/* SECTION 6 — Final CTA (Lazy loaded) */}
      <LazySection minHeight="350px" skeleton={<SectionSkeleton variant="default" />}>
        <Suspense fallback={<SectionSkeleton variant="default" />}>
          <FoundersCTA />
        </Suspense>
      </LazySection>

      <Footer />
    </div>
  );
});

About.displayName = 'About';

export default About;
