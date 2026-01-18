import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Solutions } from '@/components/Solutions';
import { CaseStudies } from '@/components/CaseStudies';
import { Manifesto } from '@/components/Manifesto';
import { EditorialSection } from '@/components/EditorialSection';
import { Journal } from '@/components/Journal';
import { Contact } from '@/components/Contact';
import { Testimonials } from '@/components/Testimonials';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ParallaxBackground } from '@/components/ParallaxBackground';
import { VisualBreadcrumbs } from '@/components/VisualBreadcrumbs';
import { CustomCursor } from '@/components/CustomCursor';
import { SplineScene } from '@/components/SplineScene';

const Index = () => {
  return (
    <div className="relative grain-overlay">
      <CustomCursor />
      <ParallaxBackground />
      <ScrollProgress />
      <Navigation />
      <VisualBreadcrumbs />
      <main className="relative z-10">
        <Hero />
        <Solutions />
        <CaseStudies />
        <Testimonials />
        <Manifesto />
        <EditorialSection />
        <Journal />
        
        {/* Spline 3D Section before Contact */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-alchemy-red/5 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
            <div className="h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden glass-deep">
              <SplineScene url="https://prod.spline.design/rHY5fa80CqYojQlneGB1Vr8X/scene.splinecode" />
            </div>
          </div>
        </section>
        
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
