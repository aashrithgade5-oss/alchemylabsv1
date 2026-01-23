import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Solutions } from '@/components/Solutions';
import { CaseStudies } from '@/components/CaseStudies';
import { Manifesto } from '@/components/Manifesto';
import { EditorialSection } from '@/components/EditorialSection';
import { Journal } from '@/components/Journal';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ParallaxBackground } from '@/components/ParallaxBackground';
import { HomepageScrollMap } from '@/components/HomepageScrollMap';
import { PerformanceMetrics } from '@/components/PerformanceMetrics';
import { memo } from 'react';

// Removed VisualBreadcrumbs - duplicate of HomepageScrollMap functionality

const Index = memo(() => {
  return (
    <div className="relative">
      <ParallaxBackground />
      <ScrollProgress />
      <Navigation />
      <HomepageScrollMap />
      <main className="relative z-10">
        <Hero />
        <PerformanceMetrics />
        <Solutions />
        <CaseStudies />
        <Manifesto />
        <EditorialSection />
        <Journal />
        <Contact />
      </main>
      <Footer />
    </div>
  );
});

Index.displayName = 'Index';

export default Index;
