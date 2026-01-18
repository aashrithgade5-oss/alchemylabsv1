import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { aiServices, brandingServices, consultationServices } from '@/data/services';
import { ServiceCard } from './ServiceCard';
import { ConsultationCard } from './ConsultationCard';

export const Solutions = () => {
  return (
    <section id="solutions" className="relative py-32 overflow-hidden section-gradient">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* PILLAR 01: AI SOLUTIONS */}
        <div className="mb-32">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <div className="flex items-center gap-6 mb-6">
              <span className="font-display text-7xl md:text-9xl text-porcelain/5 leading-none">
                01
              </span>
              <div>
                <p className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-2">
                  Pillar 01
                </p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-display tracking-display">
                  <span className="italic text-alchemy-red">AI</span>
                  <span className="text-porcelain/80"> Solutions</span>
                </h2>
                <p className="font-body text-base text-porcelain/50 mt-2 font-light">
                  The Intelligence Engine
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {aiServices.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <a href="#contact" className="glass-cta-primary inline-flex items-center gap-2">
              <span className="font-body">Book an AI Sprint</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="font-body text-sm text-porcelain/40 mt-3">
              3-Day Intensive → Delivered Systems
            </p>
          </motion.div>
        </div>
        
        {/* PILLAR 02: BRANDING SOLUTIONS */}
        <div className="mb-32">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <div className="flex items-center gap-6 mb-6">
              <span className="font-display text-7xl md:text-9xl text-porcelain/5 leading-none">
                02
              </span>
              <div>
                <p className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-2">
                  Pillar 02
                </p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-display tracking-display">
                  <span className="italic text-alchemy-red">Branding</span>
                  <span className="text-porcelain/80"> Solutions</span>
                </h2>
                <p className="font-body text-base text-porcelain/50 mt-2 font-light">
                  The Identity System
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {brandingServices.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <a href="#contact" className="glass-cta-primary inline-flex items-center gap-2">
              <span className="font-body">Book a Brand Sprint</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="font-body text-sm text-porcelain/40 mt-3">
              2-Week Intensive → Complete Identity
            </p>
          </motion.div>
        </div>
        
        {/* PILLAR 03: CONSULTATION SOLUTIONS */}
        <div>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <div className="flex items-center gap-6 mb-6">
              <span className="font-display text-7xl md:text-9xl text-porcelain/5 leading-none">
                03
              </span>
              <div>
                <p className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-2">
                  Pillar 03
                </p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-display tracking-display">
                  <span className="italic text-alchemy-red">Consultation</span>
                  <span className="text-porcelain/80"> Solutions</span>
                </h2>
                <p className="font-body text-base text-porcelain/50 mt-2 font-light">
                  The Strategic Insight
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Consultation Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {consultationServices.map((service, i) => (
              <ConsultationCard key={service.id} service={service} index={i} />
            ))}
          </div>
          
          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-body text-sm text-center text-porcelain/40 font-light"
          >
            All sessions include pre-work, live collaboration, and post-session support.
          </motion.p>
        </div>
      </div>
    </section>
  );
};
