import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Solutions } from '@/components/Solutions';
import { CaseStudies } from '@/components/CaseStudies';
import { Manifesto } from '@/components/Manifesto';
import { EditorialSection } from '@/components/EditorialSection';
import { ProcessSection } from '@/components/ProcessSection';
import { FAQSection } from '@/components/FAQSection';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ParallaxBackground } from '@/components/ParallaxBackground';
import { FloatingCTA } from '@/components/FloatingCTA';
import { memo } from 'react';

const Index = memo(() => {
  return (
    <div className="relative">
      <ParallaxBackground />
      <ScrollProgress />
      <Navigation />
      <FloatingCTA />
      <main className="relative z-10">
        <Hero />
        <Solutions />
        <CaseStudies />
        <Manifesto />
        <EditorialSection />
        <ProcessSection />
        <FAQSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
});

Index.displayName = 'Index';

export default Index;
