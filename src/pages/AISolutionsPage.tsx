import { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { NoiseTexture } from '@/components/effects';
import { BentoServiceCard } from '@/components/services/BentoServiceCard';
import { serviceCategories } from '@/data/servicesData';
import solutionsBgTexture from '@/assets/solutions-bg-texture.png';

const CALENDLY_URL = 'https://calendly.com/alchemylabs-work/30min';
const easing = [0.22, 1, 0.36, 1] as const;
const openCalendly = () => {
  (window as any).Calendly?.initPopupWidget({ url: CALENDLY_URL });
};

// Combine AI Advisory + Campaign & Creative + Systems & Growth
const aiServices = [
  ...serviceCategories[0].services, // AI Advisory
  ...serviceCategories[1].services, // Campaign & Creative
  ...serviceCategories[3].services, // Systems & Growth
];

const TextureBg = memo(() => (
  <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
    <img
      src={solutionsBgTexture}
      alt=""
      loading="eager"
      className="absolute inset-0 w-full h-full object-cover opacity-[0.25]"
    />
    <div className="absolute inset-0 bg-background/75" />
    <NoiseTexture opacity={0.03} />
  </div>
));
TextureBg.displayName = 'TextureBg';

export const AISolutionsPage = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="AI Product Studio — Alchemy Labs"
      description="AI Advisory, Campaign Sprints, Cinematic Films, Content Engines. Studio-grade output at machine velocity."
    />
    <Navigation />
    <TextureBg />

    <div className="relative z-10">
      {/* Hero */}
      <section className="relative min-h-[75vh] flex items-end pb-16 sm:pb-24 pt-28 sm:pt-36 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-alchemy-red/8 rounded-full blur-[180px]"
            animate={{ x: [0, 25, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none select-none">
          <span className="font-display text-[250px] sm:text-[400px] md:text-[500px] text-porcelain/[0.02] leading-none">01</span>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
            <Link to="/solutions" className="inline-flex items-center gap-2 text-sm text-porcelain/45 hover:text-alchemy-red transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-body">Back to Solutions</span>
            </Link>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
            className="font-mono text-xs text-alchemy-red/70 tracking-[0.25em] uppercase mb-3"
          >
            Pillar 01 · AI Product Studio
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8, ease: easing }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-porcelain mb-5"
          >
            <span className="italic text-alchemy-red">Intelligence</span>
            <br />Meets Craft
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }}
            className="font-body text-base sm:text-lg text-porcelain/45 max-w-2xl font-light leading-relaxed"
          >
            High-speed creative output. Studio-grade finish. From AI audits to cinematic campaigns and content infrastructure.
          </motion.p>
        </div>
      </section>

      {/* Bento Services Grid */}
      <section className="relative py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }} className="mb-10"
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-porcelain">
              The <span className="italic text-alchemy-red">Services</span>
            </h2>
            <p className="font-body text-sm text-porcelain/40 mt-2 font-light">{aiServices.length} services · Click to expand details</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {aiServices.map((service, i) => (
              <BentoServiceCard
                key={service.id}
                service={service}
                index={i}
                featured={i === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-12 text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easing }}
            className="font-display text-3xl sm:text-4xl md:text-5xl italic text-porcelain mb-5"
          >
            Ready to <span className="text-alchemy-red">build</span>?
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <button type="button" onClick={openCalendly}
              className="gradient-border-glow-btn inline-flex items-center gap-3 px-8 py-4 rounded-xl font-body text-base text-porcelain hover:text-white transition-all duration-300"
            >
              Book a Sprint Call
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>

    <Footer />
  </div>
);

export default AISolutionsPage;
