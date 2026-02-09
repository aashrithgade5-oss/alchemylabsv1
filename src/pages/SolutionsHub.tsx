import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Layers, Target, ChevronRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { MagneticButton } from '@/components/MagneticButton';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SEOHead, generateOrganizationSchema } from '@/components/SEOHead';
import { aiServices, brandingServices, consultationServices } from '@/data/services';
import { ScrollReveal, StaggerReveal } from '@/components/ScrollReveal';
import { SpotlightContainer, SpotlightItem } from '@/components/SpotlightGrid';
import { BlueprintGrid, NoiseTexture } from '@/components/effects';
import { SequentianBackground } from '@/components/SequentianBackground';

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
      <SEOHead 
        title="Solutions"
        description="Three pillars of service: AI Solutions, Branding, and Strategic Consultation. Choose the right approach for your brand challenge."
        structuredData={generateOrganizationSchema()}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-end pb-16 sm:pb-20 pt-24 sm:pt-32 overflow-hidden">
        {/* Sequentian Silk Fold hero background */}
        <SequentianBackground variant={1} opacity={0.55} parallax scaleEnd={1.2} blur={1} />

        <div className="absolute inset-0 pointer-events-none">
          <BlueprintGrid opacity={0.04} />
          <NoiseTexture opacity={0.03} />
        </div>

        {/* Corner brackets */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-alchemy-red/20" />
          <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-alchemy-red/20" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-alchemy-red/20" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-alchemy-red/20" />
        </div>

        {/* Technical labels */}
        <div className="absolute top-12 left-28 font-mono text-[10px] text-alchemy-red/30 hidden lg:flex items-center gap-2">
          <div className="w-1 h-1 bg-alchemy-red animate-pulse" />
          <span>SOLUTIONS.MODULE</span>
        </div>
        <div className="absolute bottom-12 right-28 font-mono text-[10px] text-porcelain/20 hidden lg:block">
          SYSTEM.v2.1
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12 w-full">
          <Breadcrumbs className="mb-8" />
          
          <ScrollReveal>
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-alchemy-red/20 bg-alchemy-red/5 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 bg-alchemy-red rounded-full animate-pulse" />
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-alchemy-red/80">
                    Our Framework
                  </span>
                </span>
              </motion.div>
              
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-display text-porcelain mb-4 sm:mb-6 text-balance">
                Three{' '}
                <span className="italic text-alchemy-red">pillars.</span>
                <br />
                <span className="font-body font-light text-porcelain/70">One{' '}<span className="font-display italic">system.</span></span>
              </h1>
              
              <p className="font-body text-lg md:text-xl text-porcelain/50 max-w-2xl font-light leading-relaxed mb-12">
                Strategic solutions engineered for brands that refuse to settle for noise.
                Each pillar designed to compound, not just campaign.
              </p>

              <div className="flex flex-wrap gap-8 lg:gap-12">
                {[
                  { label: 'Delivery Speed', value: '4-6 Weeks' },
                  { label: 'Success Rate', value: '98%' },
                  { label: 'Client Satisfaction', value: '5.0' },
                ].map((stat, i) => (
                  <div key={i} className="text-left">
                    <div className="font-display text-2xl lg:text-3xl font-bold bg-gradient-to-r from-alchemy-red to-alchemy-pink bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-porcelain/40">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Pillars */}
      <section className="relative py-8 sm:py-12">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-12 relative z-10">
          <SpotlightContainer className="space-y-3 sm:space-y-4">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              const isHovered = hoveredPillar === pillar.id;
              
              return (
                <SpotlightItem key={pillar.id} id={pillar.id}>
                  <ScrollReveal delay={i * 0.1}>
                    <motion.div
                      onMouseEnter={() => setHoveredPillar(pillar.id)}
                      onMouseLeave={() => setHoveredPillar(null)}
                      className="group relative"
                      initial={{ rotateX: 2, opacity: 0 }}
                      whileInView={{ rotateX: 0, opacity: 1 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                      style={{ perspective: 1000 }}
                    >
                      <Link
                        to={pillar.route}
                        className="block relative rounded-2xl overflow-hidden"
                      >
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                        />
                        
                        <div className="relative glass-deep rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-5 sm:gap-8 group-hover:border-alchemy-red/20 transition-colors duration-300">
                          <div className="flex-shrink-0 hidden sm:block">
                            <span className="font-display text-5xl sm:text-6xl md:text-8xl italic text-porcelain/5 group-hover:text-alchemy-red/10 transition-colors duration-500">
                              {pillar.number}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4 sm:gap-6 flex-1">
                            <motion.div
                              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl glass-red flex items-center justify-center flex-shrink-0"
                              animate={{ scale: isHovered ? 1.1 : 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-alchemy-red" />
                            </motion.div>
                            
                            <div className="flex-1">
                              <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl italic text-porcelain group-hover:text-alchemy-red transition-colors duration-300 mb-1 text-balance">
                                {pillar.title}
                              </h3>
                              <p className="font-mono text-[10px] sm:text-xs text-alchemy-red/60 tracking-label uppercase">
                                {pillar.subtitle}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex-1 md:max-w-md hidden sm:block">
                            <p className="font-body text-sm md:text-base text-porcelain/50 font-light">
                              {pillar.description}
                            </p>
                          </div>
                          
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
                  </ScrollReveal>
                </SpotlightItem>
              );
            })}
          </SpotlightContainer>
        </div>
      </section>

      {/* Quick Access Services Grid */}
      <section className="relative py-16 sm:py-20 md:py-24 luxury-margin">
        {/* Sequentian Soft Nebula background */}
        <SequentianBackground variant={2} opacity={0.45} parallax scaleEnd={1.1} />
        
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
              <div className="w-8 sm:w-12 h-px bg-alchemy-red/50" />
              <span className="font-mono text-[10px] sm:text-xs text-porcelain/40 tracking-label uppercase">Popular Services</span>
            </div>
          </ScrollReveal>

          <SpotlightContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[...aiServices.slice(0, 2), ...brandingServices.slice(0, 1), ...consultationServices.slice(0, 1)].map((service, i) => {
              const ServiceIcon = service.icon;
              return (
                <SpotlightItem key={service.id} id={service.id}>
                  <ScrollReveal delay={i * 0.1}>
                    <Link
                      to={`/services/${service.slug}`}
                      className="block p-4 sm:p-6 rounded-xl sm:rounded-2xl glass group hover:border-alchemy-red/30 transition-all duration-300 h-full"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-alchemy-red/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-alchemy-red/20 transition-colors">
                        <ServiceIcon className="w-4 h-4 sm:w-5 sm:h-5 text-alchemy-red" />
                      </div>
                      <h4 className="font-display text-base sm:text-lg md:text-xl italic text-porcelain group-hover:text-alchemy-red transition-colors mb-1 sm:mb-2 text-balance line-clamp-2">
                        {service.title}
                      </h4>
                      <p className="font-body text-xs sm:text-sm text-porcelain/40 font-light line-clamp-2 hidden sm:block">
                        {service.description.slice(0, 80)}...
                      </p>
                      <div className="flex items-center gap-2 mt-4 text-alchemy-red font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Learn more</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </Link>
                  </ScrollReveal>
                </SpotlightItem>
              );
            })}
          </SpotlightContainer>
        </div>
      </section>
      
      {/* Sprint CTA */}
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden luxury-margin">
        {/* Sequentian Crimson Cloud background */}
        <SequentianBackground variant={4} opacity={0.5} parallax scaleEnd={1.2} />
        
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-porcelain mb-4 sm:mb-6 text-balance">
                Ready to start?
              </h2>
              
              <p className="font-body text-base sm:text-lg text-porcelain/50 font-light leading-relaxed max-w-xl mx-auto mb-6 sm:mb-8 px-2">
                Book a Strategy Sprint—3-5 days of intensive collaboration 
                delivering systems ready to deploy.
              </p>

              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="font-mono text-[10px] text-porcelain/45 tracking-wider">NDA available</span>
                <span className="text-porcelain/20">·</span>
                <span className="font-mono text-[10px] text-porcelain/45 tracking-wider">24h reply</span>
                <span className="text-porcelain/20">·</span>
                <span className="font-mono text-[10px] text-porcelain/45 tracking-wider">Free first call</span>
              </div>
              
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
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SolutionsHub;
