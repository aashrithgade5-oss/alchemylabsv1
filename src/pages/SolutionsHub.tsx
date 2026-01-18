import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Layers, Target } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { MagneticButton } from '@/components/MagneticButton';
import { CustomCursor } from '@/components/CustomCursor';

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
  },
];

const sprintSteps = [
  { title: '3-5 Days', description: 'Intensive collaboration' },
  { title: 'Delivered Systems', description: 'Ready to deploy' },
  { title: 'No Fluff', description: 'Pure signal execution' },
];

export const SolutionsHub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background grain-overlay">
      <CustomCursor />
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
            We've engineered three.
          </motion.p>
        </div>
      </section>
      
      {/* Pillar Cards */}
      <section className="relative py-32 overflow-hidden section-gradient">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-8">
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
                    className="group block relative h-full"
                    data-cursor="view"
                  >
                    {/* Glass card */}
                    <div className="glass-deep rounded-3xl p-8 md:p-10 h-full transition-all duration-500 group-hover:border-alchemy-red/30 relative overflow-hidden">
                      {/* Background number */}
                      <span className="absolute -top-8 -right-4 font-display text-[180px] text-porcelain/[0.02] leading-none pointer-events-none">
                        {pillar.number}
                      </span>
                      
                      {/* Hover glow */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
                        style={{
                          background: `radial-gradient(circle at 50% 100%, ${pillar.color.replace(')', ' / 0.15)')}, transparent 60%)`,
                        }}
                      />
                      
                      {/* Content */}
                      <div className="relative z-10">
                        {/* Icon */}
                        <div className="mb-8">
                          <div className="w-16 h-16 rounded-2xl glass-red flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <Icon className="w-7 h-7 text-alchemy-red" />
                          </div>
                        </div>
                        
                        {/* Text */}
                        <div className="mb-8">
                          <h3 className="font-display text-2xl md:text-3xl italic text-porcelain mb-2 group-hover:text-alchemy-red transition-colors duration-300">
                            {pillar.title}
                          </h3>
                          <p className="font-mono text-xs text-alchemy-red/70 tracking-label uppercase mb-4">
                            {pillar.subtitle}
                          </p>
                          <p className="font-body text-base text-porcelain/50 font-light leading-relaxed">
                            {pillar.description}
                          </p>
                        </div>
                        
                        {/* CTA */}
                        <div className="flex items-center gap-2 text-porcelain/60 group-hover:text-alchemy-red transition-colors duration-300">
                          <span className="font-body text-sm">Explore</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
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
