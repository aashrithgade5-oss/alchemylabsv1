import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import { ParallaxBackground } from '@/components/ParallaxBackground';
import { FloatingCTA } from '@/components/FloatingCTA';
import { SequentianBackground } from '@/components/SequentianBackground';
import { memo, lazy, Suspense } from 'react';
import { motion, useScroll } from 'framer-motion';

// Lazy-load below-fold sections for faster initial paint
const Solutions = lazy(() => import('@/components/Solutions').then(m => ({ default: m.Solutions })));
const CaseStudies = lazy(() => import('@/components/CaseStudies').then(m => ({ default: m.CaseStudies })));
const Manifesto = lazy(() => import('@/components/Manifesto').then(m => ({ default: m.Manifesto })));
const EditorialSection = lazy(() => import('@/components/EditorialSection').then(m => ({ default: m.EditorialSection })));
const ProcessSection = lazy(() => import('@/components/ProcessSection').then(m => ({ default: m.ProcessSection })));
const FAQSection = lazy(() => import('@/components/FAQSection').then(m => ({ default: m.FAQSection })));
const Contact = lazy(() => import('@/components/Contact').then(m => ({ default: m.Contact })));

// Enhanced reveal wrapper with blur + scale + directional stagger
const RevealSection = memo(({ 
  children, 
  className = '', 
  direction = 'up',
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string; 
  direction?: 'up' | 'left' | 'right';
  delay?: number;
}) => {
  const xMap = { up: 0, left: -32, right: 32 };
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: direction === 'up' ? 40 : 20, 
        x: xMap[direction],
        scale: 0.97,
        filter: 'blur(8px)',
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        x: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.22, 1, 0.36, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});
RevealSection.displayName = 'RevealSection';

// Enhanced section divider with animated center scale
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

const Index = memo(() => {
  return (
    <div className="relative">
      <ParallaxBackground />
      <Navigation />
      <FloatingCTA />
      <main className="relative z-10">
        <Hero />
        
        <Suspense fallback={null}>
          <RevealSection className="content-lazy" direction="up" delay={0}>
            <Solutions />
          </RevealSection>
        </Suspense>
        
        <SectionDivider />
        
        <Suspense fallback={null}>
          <RevealSection className="content-lazy" direction="left" delay={0.05}>
            <CaseStudies />
          </RevealSection>
        </Suspense>
        
        <SectionDivider />
        
        <Suspense fallback={null}>
          <div className="relative">
            <SequentianBackground variant={4} opacity={0.35} parallax scaleEnd={1.1} glow={false} />
            <RevealSection className="content-lazy" direction="up" delay={0}>
              <Manifesto />
            </RevealSection>
          </div>
        </Suspense>
        
        <SectionDivider />
        
        <Suspense fallback={null}>
          <RevealSection className="content-lazy" direction="right" delay={0.05}>
            <EditorialSection />
          </RevealSection>
        </Suspense>
        
        <Suspense fallback={null}>
          <RevealSection className="content-lazy" direction="left" delay={0}>
            <ProcessSection />
          </RevealSection>
        </Suspense>
        
        <Suspense fallback={null}>
          <div className="relative">
            <SequentianBackground variant={2} opacity={0.3} parallax scaleEnd={1.08} glow={false} />
            <RevealSection className="content-lazy" direction="up" delay={0.05}>
              <FAQSection />
            </RevealSection>
          </div>
        </Suspense>
        
        <Suspense fallback={null}>
          <RevealSection className="content-lazy" direction="up" delay={0}>
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
