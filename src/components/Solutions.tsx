import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Layers, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const pillars = [
  {
    id: 'ai',
    title: 'AI Solutions',
    subtitle: 'The Intelligence Engine',
    description: 'Studio-grade media and systems—built for speed, finished with taste.',
    icon: Sparkles,
    route: '/solutions/ai',
    number: '01',
  },
  {
    id: 'branding',
    title: 'Branding Solutions',
    subtitle: 'The Identity System',
    description: 'Identity infrastructure. Narrative precision. Visual inevitability.',
    icon: Layers,
    route: '/solutions/branding',
    number: '02',
  },
  {
    id: 'consultation',
    title: 'Consultation',
    subtitle: 'The Strategic Insight',
    description: 'Clarity with a plan. Simulation, not theory.',
    icon: Target,
    route: '/solutions/consultation',
    number: '03',
  },
];

export const Solutions = () => {
  return (
    <section id="solutions" className="relative py-32 overflow-hidden section-gradient">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4">
            Our Services
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-display tracking-display text-porcelain mb-6">
            Three <span className="italic text-alchemy-red">Pillars</span>
          </h2>
          <p className="font-body text-base text-porcelain/50 max-w-xl mx-auto font-light">
            Every brand challenge requires a different approach. We've engineered three.
          </p>
        </motion.div>

        {/* Pillar Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={pillar.route}
                  className="group block glass-deep rounded-3xl p-8 md:p-10 h-full hover:border-alchemy-red/30 transition-all duration-500 relative overflow-hidden interactive-hover"
                >
                  {/* Background number */}
                  <span className="absolute -top-6 -right-2 font-display text-[140px] text-porcelain/[0.02] leading-none pointer-events-none">
                    {pillar.number}
                  </span>

                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl bg-gradient-to-t from-alchemy-red/10 to-transparent" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="w-14 h-14 rounded-xl glass-red flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-6 h-6 text-alchemy-red" />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="mb-6">
                      <p className="font-mono text-[10px] text-alchemy-red/70 tracking-label uppercase mb-2">
                        Pillar {pillar.number}
                      </p>
                      <h3 className="font-display text-2xl md:text-3xl italic text-porcelain mb-2 group-hover:text-alchemy-red transition-colors duration-300">
                        {pillar.title}
                      </h3>
                      <p className="font-body text-sm text-porcelain/40 font-light">
                        {pillar.subtitle}
                      </p>
                    </div>

                    <p className="font-body text-base text-porcelain/50 font-light leading-relaxed mb-6">
                      {pillar.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-porcelain/60 group-hover:text-alchemy-red transition-colors duration-300">
                      <span className="font-body text-sm">Explore Services</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Solutions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/solutions"
            className="inline-flex items-center gap-3 glass-cta-primary group"
          >
            <span className="font-body">View All Solutions</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
