import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ParallaxBackground } from '@/components/ParallaxBackground';
import { FloatingCTA } from '@/components/FloatingCTA';
import { SequentianBackground } from '@/components/SequentianBackground';
import { memo, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

// Lazy-load below-fold sections for faster initial paint
const Solutions = lazy(() => import('@/components/Solutions').then(m => ({ default: m.Solutions })));
const CaseStudies = lazy(() => import('@/components/CaseStudies').then(m => ({ default: m.CaseStudies })));
const Manifesto = lazy(() => import('@/components/Manifesto').then(m => ({ default: m.Manifesto })));
const EditorialSection = lazy(() => import('@/components/EditorialSection').then(m => ({ default: m.EditorialSection })));
const ProcessSection = lazy(() => import('@/components/ProcessSection').then(m => ({ default: m.ProcessSection })));
const FAQSection = lazy(() => import('@/components/FAQSection').then(m => ({ default: m.FAQSection })));
const Contact = lazy(() => import('@/components/Contact').then(m => ({ default: m.Contact })));

// Reusable reveal wrapper
const RevealSection = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// Section divider
const SectionDivider = () => (
  <div className="w-full max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-porcelain/8 to-transparent" />
);

const Index = memo(() => {
  return (
    <div className="relative">
      <ParallaxBackground />
      <ScrollProgress />
      <Navigation />
      <FloatingCTA />
      <main className="relative z-10">
        <Hero />
        
        <Suspense fallback={null}>
          <RevealSection className="content-lazy">
            <Solutions />
          </RevealSection>
        </Suspense>
        
        <SectionDivider />
        
        <Suspense fallback={null}>
          <RevealSection className="content-lazy">
            <CaseStudies />
          </RevealSection>
        </Suspense>
        
        <SectionDivider />
        
        <Suspense fallback={null}>
          <div className="relative">
            <SequentianBackground variant={4} opacity={0.35} parallax scaleEnd={1.1} glow={false} />
            <RevealSection className="content-lazy">
              <Manifesto />
            </RevealSection>
          </div>
        </Suspense>
        
        <SectionDivider />
        
        <Suspense fallback={null}>
          <RevealSection className="content-lazy">
            <EditorialSection />
          </RevealSection>
        </Suspense>
        
        <Suspense fallback={null}>
          <RevealSection className="content-lazy">
            <ProcessSection />
          </RevealSection>
        </Suspense>
        
        <Suspense fallback={null}>
          <div className="relative">
            <SequentianBackground variant={2} opacity={0.3} parallax scaleEnd={1.08} glow={false} />
            <RevealSection className="content-lazy">
              <FAQSection />
            </RevealSection>
          </div>
        </Suspense>
        
        <Suspense fallback={null}>
          <RevealSection className="content-lazy">
            <Contact />
          </RevealSection>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
});

Index.displayName = 'Index';

export default Index;
