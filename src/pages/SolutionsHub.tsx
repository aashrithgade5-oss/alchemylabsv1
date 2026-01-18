import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Layers, Target, ChevronDown } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { MagneticButton } from '@/components/MagneticButton';
import { aiServices, brandingServices, consultationServices } from '@/data/services';

const pillars = [
  {
    id: 'ai',
    title: 'AI Solutions',
    subtitle: 'The Intelligence Engine',
    description: 'Studio-grade media and systems—built for speed, finished with taste.',
    icon: Sparkles,
    color: 'hsl(356 94% 45%)',
    route: '/solutions/ai',
    number: '01',
    services: aiServices,
  },
  {
    id: 'branding',
    title: 'Branding Solutions',
    subtitle: 'The Identity System',
    description: 'Identity infrastructure. Narrative precision. Visual inevitability.',
    icon: Layers,
    color: 'hsl(354 85% 26%)',
    route: '/solutions/branding',
    number: '02',
    services: brandingServices,
  },
  {
    id: 'consultation',
    title: 'Consultation',
    subtitle: 'The Strategic Insight',
    description: 'Clarity with a plan. Simulation, not theory.',
    icon: Target,
    color: 'hsl(354 85% 15%)',
    route: '/solutions/consultation',
    number: '03',
    services: consultationServices,
  },
];

const sprintSteps = [
  { title: '3-5 Days', description: 'Intensive collaboration' },
  { title: 'Delivered Systems', description: 'Ready to deploy' },
  { title: 'No Fluff', description: 'Pure signal execution' },
];

export const SolutionsHub = () => {
  const navigate = useNavigate();
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);

  const togglePillar = (id: string) => {
    setExpandedPillar(expandedPillar === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background grain-overlay">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden section-gradient">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-alchemy-red/8 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-alchemy-red/5 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center pt-32">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-6"
          >
            Three Pillars
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-display tracking-display text-porcelain mb-8"
          >
            Choose Your
            <br />
            <span className="italic text-alchemy-red">Instrument</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg md:text-xl text-porcelain/50 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Every brand challenge requires a different approach.
            <br className="hidden md:block" />
            Click a pillar to explore services.
          </motion.p>
        </div>
      </section>
      
      {/* Collapsible Pillar Cards */}
      <section className="relative py-32 overflow-hidden section-gradient">
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          <div className="space-y-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              const isExpanded = expandedPillar === pillar.id;
              
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-deep rounded-3xl overflow-hidden"
                >
                  {/* Pillar Header - Clickable */}
                  <button
                    onClick={() => togglePillar(pillar.id)}
                    className="w-full p-8 md:p-10 flex items-center justify-between gap-6 text-left group"
                  >
                    <div className="flex items-center gap-6">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl glass-red flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-alchemy-red" />
                      </div>
                      
                      {/* Text */}
                      <div>
                        <h3 className="font-display text-2xl md:text-3xl italic text-porcelain group-hover:text-alchemy-red transition-colors duration-300">
                          {pillar.title}
                        </h3>
                        <p className="font-mono text-xs text-alchemy-red/70 tracking-label uppercase mt-1">
                          {pillar.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    {/* Expand indicator */}
                    <div className="flex items-center gap-4">
                      <span className="hidden md:block font-body text-sm text-porcelain/40">
                        {pillar.services.length} services
                      </span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-10 h-10 rounded-full glass flex items-center justify-center"
                      >
                        <ChevronDown className="w-5 h-5 text-porcelain/60" />
                      </motion.div>
                    </div>
                  </button>
                  
                  {/* Expanded Services */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 md:px-10 pb-8 md:pb-10 pt-2 border-t border-porcelain/5">
                          <p className="font-body text-base text-porcelain/50 font-light mb-8">
                            {pillar.description}
                          </p>
                          
                          <div className="grid sm:grid-cols-2 gap-4">
                            {pillar.services.map((service, j) => {
                              const ServiceIcon = service.icon;
                              return (
                                <motion.div
                                  key={service.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: j * 0.05 }}
                                >
                                  <Link
                                    to={`/services/${service.slug}`}
                                    className="block p-5 rounded-xl bg-porcelain/[0.03] border border-porcelain/5 hover:border-alchemy-red/30 hover:bg-porcelain/[0.05] transition-all duration-300 group/service interactive-hover"
                                  >
                                    <div className="flex items-start gap-4">
                                      <div className="w-10 h-10 rounded-lg bg-alchemy-red/10 flex items-center justify-center flex-shrink-0">
                                        <ServiceIcon className="w-5 h-5 text-alchemy-red" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h4 className="font-display text-lg italic text-porcelain group-hover/service:text-alchemy-red transition-colors">
                                          {service.title}
                                        </h4>
                                        <p className="font-mono text-[10px] text-porcelain/40 tracking-wider uppercase mt-1">
                                          {'meta' in service ? service.meta : ('duration' in service ? service.duration : '')}
                                        </p>
                                      </div>
                                      <ArrowRight className="w-4 h-4 text-porcelain/30 group-hover/service:text-alchemy-red group-hover/service:translate-x-1 transition-all flex-shrink-0 mt-1" />
                                    </div>
                                  </Link>
                                </motion.div>
                              );
                            })}
                          </div>
                          
                          {/* View All Link */}
                          <div className="mt-6 text-center">
                            <Link
                              to={pillar.route}
                              className="inline-flex items-center gap-2 font-body text-sm text-alchemy-red hover:text-alchemy-red/80 transition-colors no-glow"
                            >
                              View all {pillar.title}
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Sprint Definition */}
      <section className="relative py-32 overflow-hidden section-gradient">
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-deep rounded-3xl p-10 md:p-16 text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl italic text-porcelain mb-6">
              What is a Sprint?
            </h2>
            
            <p className="font-body text-lg text-porcelain/50 font-light leading-relaxed max-w-2xl mx-auto mb-12">
              A Sprint is an intensive, time-boxed engagement where we solve
              your specific challenge with precision and velocity. You get
              delivered systems, not theoretical strategy.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {sprintSteps.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <h4 className="font-display text-xl italic text-alchemy-red mb-2">
                    {item.title}
                  </h4>
                  <p className="font-body text-sm text-porcelain/50">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <MagneticButton 
              onClick={() => navigate('/book-sprint')}
              className="glass-cta-primary"
            >
              Book a Sprint
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SolutionsHub;
