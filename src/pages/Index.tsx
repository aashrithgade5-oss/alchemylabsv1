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
import { VisualBreadcrumbs } from '@/components/VisualBreadcrumbs';
import { HomepageScrollMap } from '@/components/HomepageScrollMap';

const Index = () => {
  return (
    <div className="relative grain-overlay">
      <ParallaxBackground />
      <ScrollProgress />
      <Navigation />
      <VisualBreadcrumbs />
      <HomepageScrollMap />
      <main className="relative z-10">
        <Hero />
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
};

export default Index;
