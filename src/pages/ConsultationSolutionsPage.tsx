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

const consultingServices = serviceCategories[4].services; // Consulting

const TextureBg = memo(() => (
  <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
    <img src={solutionsBgTexture} alt="" loading="eager" className="absolute inset-0 w-full h-full object-cover opacity-[0.25]" />
    <div className="absolute inset-0 bg-background/75" />
    <NoiseTexture opacity={0.03} />
  </div>
));
TextureBg.displayName = 'TextureBg';

export const ConsultationSolutionsPage = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Advisory — Alchemy Labs"
      description="Precision Audit, Strategy Build, Full System Simulation. Clarity with a plan — simulation, not theory."
    />
    <Navigation />
    <TextureBg />

    <div className="relative z-10">
      {/* Hero */}
      <section className="relative min-h-[75vh] flex items-end pb-16 sm:pb-24 pt-28 sm:pt-36 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-1/3 right-1/3 w-[450px] h-[450px] bg-alchemy-red/5 rounded-full blur-[150px]"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none select-none">
          <span className="font-display text-[250px] sm:text-[400px] md:text-[500px] text-porcelain/[0.02] leading-none">03</span>
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
            Pillar 03 · Advisory
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8, ease: easing }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-porcelain mb-5"
          >
            <span className="italic text-alchemy-red">Clarity</span>
            <br />With a Plan
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }}
            className="font-body text-base sm:text-lg text-porcelain/45 max-w-2xl font-light leading-relaxed"
          >
            Simulation, not theory. You leave with systems, not slides.
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
              Choose Your <span className="italic text-alchemy-red">Depth</span>
            </h2>
            <p className="font-body text-sm text-porcelain/40 mt-2 font-light">{consultingServices.length} tiers · Click to expand details</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {consultingServices.map((service, i) => (
              <BentoServiceCard key={service.id} service={service} index={i} />
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
            Ready for <span className="text-alchemy-red">clarity</span>?
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <button type="button" onClick={openCalendly}
              className="gradient-border-glow-btn inline-flex items-center gap-3 px-8 py-4 rounded-xl font-body text-base text-porcelain hover:text-white transition-all duration-300"
            >
              Book a Consultation
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>

    <Footer />
  </div>
);

export default ConsultationSolutionsPage;
