import { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SEOHead, generateOrganizationSchema } from '@/components/SEOHead';
import { CategoryHeader } from '@/components/services/CategoryHeader';
import { NewServiceCard } from '@/components/services/NewServiceCard';
import { serviceCategories } from '@/data/servicesData';
import { NoiseTexture } from '@/components/effects';

const CALENDLY_URL = 'https://calendly.com/alchemylabs-work/30min';
const easing = [0.22, 1, 0.36, 1] as const;

const openCalendly = () => {
  (window as any).Calendly?.initPopupWidget({ url: CALENDLY_URL });
};

// ── HERO ──
const HeroSection = memo(() => (
  <section className="relative min-h-[85vh] flex items-end pb-16 sm:pb-24 pt-28 sm:pt-36 overflow-hidden">
    {/* Animated gradient bg */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-alchemy-red/8 rounded-full blur-[160px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <NoiseTexture opacity={0.03} />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12 w-full">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easing }}
        className="mb-8"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-alchemy-red/20 bg-alchemy-red/5 backdrop-blur-sm">
          <div className="w-1.5 h-1.5 bg-alchemy-red rounded-full animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-alchemy-red/80">
            Services
          </span>
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: easing }}
        className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] text-porcelain mb-6 text-balance"
      >
        Built for brands that
        <br />
        <span className="italic text-alchemy-red">refuse to move slowly.</span>
      </motion.h1>

      {/* Sub */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: easing }}
        className="font-body text-base sm:text-lg md:text-xl text-porcelain/50 max-w-2xl font-light leading-relaxed mb-10"
      >
        Every engagement is a precision instrument — designed around your business model,
        calibrated to your moment, and built to compound.
      </motion.p>

      {/* Value props */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-wrap gap-3 sm:gap-4 mb-16"
      >
        {['AI-Native', 'Founder-First', 'Outcome-Engineered'].map((tag) => (
          <span key={tag} className="font-mono text-[10px] sm:text-xs tracking-[0.15em] uppercase text-porcelain/40 border border-porcelain/10 rounded-full px-4 py-1.5">
            {tag}
          </span>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="flex items-center gap-3 text-porcelain/30"
      >
        <span className="font-mono text-[10px] tracking-wider uppercase">Explore Services</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </div>
  </section>
));
HeroSection.displayName = 'HeroSection';

// ── SERVICE SECTION ──
const ServiceSection = memo(({ categoryIndex }: { categoryIndex: number }) => {
  const category = serviceCategories[categoryIndex];
  const isSingle = category.services.length === 1;

  return (
    <section className="relative py-16 sm:py-24 md:py-32">
      {/* Subtle gradient accent per section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle, hsl(var(--alchemy-red)), transparent)',
            top: '20%',
            left: categoryIndex % 2 === 0 ? '10%' : '60%',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <CategoryHeader
          number={category.number}
          title={category.title}
          subtitle={category.subtitle}
          description={category.description}
        />

        <div
          className={
            isSingle
              ? 'max-w-2xl'
              : category.services.length === 2
              ? 'grid grid-cols-1 lg:grid-cols-2 gap-6'
              : category.services.length === 4
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          }
        >
          {category.services.map((service, i) => (
            <NewServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
});
ServiceSection.displayName = 'ServiceSection';

// ── FINAL CTA ──
const FinalCTA = memo(() => (
  <section className="relative py-24 sm:py-32 md:py-40 overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-alchemy-red/6 rounded-full blur-[200px]" />
    </div>

    <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 md:px-12 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: easing }}
        className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-porcelain mb-6 leading-tight"
      >
        We don't work with
        <br />
        <span className="text-alchemy-red">everyone.</span>
        <br />
        We work with the
        <br />
        <span className="text-porcelain/60">right ones.</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: easing }}
        className="font-body text-base sm:text-lg text-porcelain/45 font-light max-w-xl mx-auto mb-8 leading-relaxed"
      >
        Alchemy Labs is built for founders and operators who take their positioning seriously —
        who understand that the right creative is never an accident.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease: easing }}
      >
        <button
          type="button"
          onClick={openCalendly}
          className="gradient-border-glow-btn inline-flex items-center gap-3 px-8 py-4 rounded-xl font-body text-base text-porcelain transition-all duration-300 hover:text-white"
        >
          Book a Sprint Call
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-3 mt-6"
      >
        <span className="font-mono text-[10px] text-porcelain/35 tracking-wider">NDA available</span>
        <span className="text-porcelain/15">·</span>
        <span className="font-mono text-[10px] text-porcelain/35 tracking-wider">24h reply</span>
        <span className="text-porcelain/15">·</span>
        <span className="font-mono text-[10px] text-porcelain/35 tracking-wider">Free first call</span>
      </motion.div>
    </div>
  </section>
));
FinalCTA.displayName = 'FinalCTA';

// ── PAGE ──
export const SolutionsHub = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Services — Alchemy Labs"
      description="AI Advisory, Campaign & Creative, Brand Systems, Growth Infrastructure, and Strategic Consulting. Built for brands that refuse to move slowly."
      structuredData={generateOrganizationSchema()}
    />
    <Navigation />
    <HeroSection />
    {serviceCategories.map((_, i) => (
      <ServiceSection key={i} categoryIndex={i} />
    ))}
    <FinalCTA />
    <Footer />
  </div>
);

export default SolutionsHub;
