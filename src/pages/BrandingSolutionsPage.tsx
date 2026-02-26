import { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { NoiseTexture } from '@/components/effects';
import { SequentianBackground } from '@/components/SequentianBackground';
import { BentoServiceCard } from '@/components/services/BentoServiceCard';
import { serviceCategories } from '@/data/servicesData';

const CALENDLY_URL = 'https://calendly.com/alchemylabs-work/30min';
const EASE = [0.22, 1, 0.36, 1] as const;
const openCalendly = () => {
  (window as any).Calendly?.initPopupWidget({ url: CALENDLY_URL });
};

const brandServices = serviceCategories[2].services;

export const BrandingSolutionsPage = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Brand Systems — Alchemy Labs"
      description="Brand World, Identity Systems, Narrative Architecture, Branding 360. Identity infrastructure that feels inevitable."
    />
    <Navigation />

    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
      <div className="absolute inset-0" style={{ background: '#060606' }} />
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse 55% 45% at 60% 40%, rgba(200,57,43,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 45% 35% at 30% 65%, rgba(139,0,0,0.05) 0%, transparent 55%)
        `,
      }} />
      <NoiseTexture opacity={0.03} />
    </div>

    <div className="relative z-10">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-end pb-16 sm:pb-24 pt-28 sm:pt-36 overflow-hidden">
        <SequentianBackground variant={5} opacity={0.2} parallax scaleEnd={1.08} glow={false} />

        <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none select-none">
          <span className="font-display text-[250px] sm:text-[400px] md:text-[500px] text-porcelain/[0.02] leading-none">02</span>
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
            Pillar 02 · Brand Systems
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-porcelain mb-5"
          >
            <span className="italic text-alchemy-red">Identity</span>
            <br />Meets System
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }}
            className="font-body text-base sm:text-lg text-porcelain/45 max-w-2xl font-light leading-relaxed"
          >
            Identity infrastructure. Narrative precision. Visual inevitability.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }} className="mb-10"
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-porcelain">
              The <span className="italic text-alchemy-red">Services</span>
            </h2>
            <p className="font-body text-sm text-porcelain/40 mt-2 font-light">{brandServices.length} services · Click to expand details</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {brandServices.map((service, i) => (
              <BentoServiceCard key={service.id} service={service} index={i} featured={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial quote */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <SequentianBackground variant={2} opacity={0.15} parallax scaleEnd={1.05} glow={false} />
        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 md:px-12 text-center">
          <div className="w-16 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-alchemy-red/30 to-transparent" />
          <blockquote className="font-display text-xl sm:text-2xl md:text-3xl italic text-porcelain/70 leading-[1.4] mb-6">
            "A brand without a system is just a <span className="text-alchemy-red">logo on repeat.</span>"
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-12 text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-3xl sm:text-4xl md:text-5xl italic text-porcelain mb-5"
          >
            Ready to <span className="text-alchemy-red">transform</span>?
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <button type="button" onClick={openCalendly}
              className="gradient-border-glow-btn inline-flex items-center gap-3 px-8 py-4 rounded-xl font-body text-base text-porcelain hover:text-white transition-all duration-300"
            >
              Book a Brand Sprint
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="font-mono text-[10px] text-porcelain/25 tracking-wider mt-4">Free first call · 24h response · NDA on request</p>
          </motion.div>
        </div>
      </section>
    </div>

    <Footer />
  </div>
);

export default BrandingSolutionsPage;
