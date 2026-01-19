import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Layers, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const pillars = [
  {
    id: 'ai',
    title: 'AI Solutions',
    subtitle: 'The Intelligence Engine',
    description: 'Studio-grade media and systems—built for speed, finished with taste.',
    icon: Sparkles,
    route: '/solutions/ai',
    number: '01',
    gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
  },
  {
    id: 'branding',
    title: 'Branding Solutions',
    subtitle: 'The Identity System',
    description: 'Identity infrastructure. Narrative precision. Visual inevitability.',
    icon: Layers,
    route: '/solutions/branding',
    number: '02',
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
  },
  {
    id: 'consultation',
    title: 'Consultation',
    subtitle: 'The Strategic Insight',
    description: 'Clarity with a plan. Simulation, not theory.',
    icon: Target,
    route: '/solutions/consultation',
    number: '03',
    gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
  },
];

// 3D Tilt Card Component
const TiltCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      {children}
    </motion.div>
  );
};

export const Solutions = () => {
  return (
    <section id="solutions" className="relative py-32 overflow-hidden section-gradient">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-alchemy-red/5 blur-[100px]"
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-deep-crimson/5 blur-[80px]"
          animate={{ 
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <motion.p 
            className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Our Services
          </motion.p>
          <motion.h2 
            className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-display tracking-display text-porcelain mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Three <span className="italic bg-gradient-to-r from-alchemy-red to-deep-crimson bg-clip-text text-transparent">Pillars</span>
          </motion.h2>
          <motion.p 
            className="font-body text-base md:text-lg text-porcelain/50 max-w-xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Every brand challenge requires a different approach. We've engineered three.
          </motion.p>
        </motion.div>

        {/* Bento-style Pillar Cards with 3D effect */}
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
                <TiltCard>
                  <Link
                    to={pillar.route}
                    data-cursor-view
                    className="group block glass-deep rounded-3xl p-8 md:p-10 h-full hover:border-alchemy-red/30 transition-all duration-500 relative overflow-hidden"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Animated gradient background */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                      style={{ transform: 'translateZ(-10px)' }}
                    />

                    {/* Background number */}
                    <span 
                      className="absolute -top-6 -right-2 font-display text-[140px] text-porcelain/[0.02] leading-none pointer-events-none"
                      style={{ transform: 'translateZ(-20px)' }}
                    >
                      {pillar.number}
                    </span>

                    {/* Hover glow */}
                    <motion.div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
                      style={{
                        background: 'radial-gradient(ellipse at 50% 50%, rgba(225, 6, 19, 0.15) 0%, transparent 70%)',
                        transform: 'translateZ(-5px)',
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
                      {/* Icon */}
                      <motion.div 
                        className="mb-6"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <div className="w-14 h-14 rounded-xl glass-red flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(225,6,19,0.3)] transition-shadow duration-500">
                          <Icon className="w-6 h-6 text-alchemy-red" />
                        </div>
                      </motion.div>

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
                      <motion.div 
                        className="flex items-center gap-2 text-porcelain/60 group-hover:text-alchemy-red transition-colors duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <span className="font-body text-sm">Explore Services</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.div>
                    </div>

                    {/* Border glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        border: '1px solid rgba(225, 6, 19, 0.3)',
                        boxShadow: 'inset 0 0 30px rgba(225, 6, 19, 0.1)',
                      }}
                    />
                  </Link>
                </TiltCard>
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
            className="inline-flex items-center gap-3 glass-cta-primary group relative overflow-hidden"
          >
            <span className="relative z-10 font-body">View All Solutions</span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
