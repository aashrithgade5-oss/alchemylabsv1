import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Layers, Target, ChevronRight } from 'lucide-react';
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
    route: '/solutions/ai',
    number: '01',
    services: aiServices,
    gradient: 'from-alchemy-red/20 to-transparent',
  },
  {
    id: 'branding',
    title: 'Branding Solutions',
    subtitle: 'The Identity System',
    description: 'Identity infrastructure. Narrative precision. Visual inevitability.',
    icon: Layers,
    route: '/solutions/branding',
    number: '02',
    services: brandingServices,
    gradient: 'from-deep-crimson/20 to-transparent',
  },
  {
    id: 'consultation',
    title: 'Consultation',
    subtitle: 'The Strategic Insight',
    description: 'Clarity with a plan. Simulation, not theory.',
    icon: Target,
    route: '/solutions/consultation',
    number: '03',
    services: consultationServices,
    gradient: 'from-crimson-bright/20 to-transparent',
  },
];

export const SolutionsHub = () => {
  const navigate = useNavigate();
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background grain-overlay">
      <Navigation />
      
      {/* Hero Section - Minimal */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-alchemy-red/5 rounded-full blur-[200px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-px bg-alchemy-red" />
              <span className="font-mono text-xs text-alchemy-red tracking-label uppercase">
                Our Solutions
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-display text-porcelain mb-8"
            >
              Three pillars.
              <br />
              <span className="italic text-alchemy-red">Infinite possibilities.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-lg md:text-xl text-porcelain/50 max-w-xl font-light leading-relaxed"
            >
              Every brand challenge requires a different instrument. 
              Choose yours.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Pillars - Full Width Cards */}
      <section className="relative py-12">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="space-y-4">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              const isHovered = hoveredPillar === pillar.id;
              
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHoveredPillar(pillar.id)}
                  onMouseLeave={() => setHoveredPillar(null)}
                  className="group relative"
                >
                  <Link
                    to={pillar.route}
                    className="block relative rounded-2xl overflow-hidden"
                  >
                    {/* Background gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    
                    {/* Content */}
                    <div className="relative glass-deep rounded-2xl p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-8 group-hover:border-alchemy-red/20 transition-colors duration-300">
                      {/* Number */}
                      <div className="flex-shrink-0">
                        <span className="font-display text-6xl md:text-8xl italic text-porcelain/5 group-hover:text-alchemy-red/10 transition-colors duration-500">
                          {pillar.number}
                        </span>
                      </div>
                      
                      {/* Icon & Title */}
                      <div className="flex items-center gap-6 flex-1">
                        <motion.div
                          className="w-16 h-16 rounded-2xl glass-red flex items-center justify-center flex-shrink-0"
                          animate={{ scale: isHovered ? 1.1 : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon className="w-7 h-7 text-alchemy-red" />
                        </motion.div>
                        
                        <div className="flex-1">
                          <h3 className="font-display text-3xl md:text-4xl italic text-porcelain group-hover:text-alchemy-red transition-colors duration-300 mb-1">
                            {pillar.title}
                          </h3>
                          <p className="font-mono text-xs text-alchemy-red/60 tracking-label uppercase">
                            {pillar.subtitle}
                          </p>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <div className="flex-1 md:max-w-md">
                        <p className="font-body text-base text-porcelain/50 font-light">
                          {pillar.description}
                        </p>
                      </div>
                      
                      {/* Services count & Arrow */}
                      <div className="flex items-center gap-6 flex-shrink-0">
                        <div className="text-right hidden md:block">
                          <span className="font-display text-2xl italic text-porcelain">
                            {pillar.services.length}
                          </span>
                          <p className="font-mono text-[10px] text-porcelain/40 tracking-label uppercase">
                            Services
                          </p>
                        </div>
                        
                        <motion.div
                          className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:bg-alchemy-red/20 transition-colors duration-300"
                          animate={{ x: isHovered ? 5 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronRight className="w-5 h-5 text-porcelain/60 group-hover:text-alchemy-red transition-colors" />
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Access Services Grid */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="w-12 h-px bg-alchemy-red/50" />
            <span className="font-mono text-xs text-porcelain/40 tracking-label uppercase">Popular Services</span>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...aiServices.slice(0, 2), ...brandingServices.slice(0, 1), ...consultationServices.slice(0, 1)].map((service, i) => {
              const ServiceIcon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link
                    to={`/services/${service.slug}`}
                    className="block p-6 rounded-2xl glass group hover:border-alchemy-red/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-alchemy-red/10 flex items-center justify-center mb-4 group-hover:bg-alchemy-red/20 transition-colors">
                      <ServiceIcon className="w-5 h-5 text-alchemy-red" />
                    </div>
                    <h4 className="font-display text-xl italic text-porcelain group-hover:text-alchemy-red transition-colors mb-2">
                      {service.title}
                    </h4>
                    <p className="font-body text-sm text-porcelain/40 font-light line-clamp-2">
                      {service.description.slice(0, 80)}...
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-alchemy-red font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Learn more</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Sprint CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-alchemy-red/10 rounded-full blur-[150px]" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl italic text-porcelain mb-6">
              Ready to start?
            </h2>
            
            <p className="font-body text-lg text-porcelain/50 font-light leading-relaxed max-w-xl mx-auto mb-10">
              Book a Strategy Sprint—3-5 days of intensive collaboration 
              delivering systems ready to deploy.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton 
                onClick={() => navigate('/book-sprint')}
                className="glass-cta-primary"
              >
                Book a Sprint
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              
              <Link
                to="/contact"
                className="font-body text-sm text-porcelain/50 hover:text-alchemy-red transition-colors px-6 py-4 no-glow"
              >
                or get in touch →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SolutionsHub;
