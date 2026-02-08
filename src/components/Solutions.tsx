import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Layers, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useState, memo } from 'react';

const pillars = [
  {
    id: 'ai',
    title: 'AI Product Studio',
    subtitle: 'Fast (24h build)',
    description: 'Studio-grade media and systems—built for speed, finished with taste.',
    icon: Sparkles,
    route: '/solutions/ai',
    number: '01',
    gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
    deliverables: ['Landing + flow', 'Visual system', 'Live deploy'],
    trust: 'Production in hours, not weeks',
  },
  {
    id: 'branding',
    title: 'Brand Systems',
    subtitle: 'Foundation',
    description: 'Identity infrastructure. Narrative precision. Visual inevitability.',
    icon: Layers,
    route: '/solutions/branding',
    number: '02',
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    deliverables: ['Identity kit', 'Narrative', 'Launch-ready assets'],
    trust: 'Brands that feel inevitable',
  },
  {
    id: 'consultation',
    title: 'Advisory',
    subtitle: 'Clarity',
    description: 'Clarity with a plan. Simulation, not theory.',
    icon: Target,
    route: '/solutions/consultation',
    number: '03',
    gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
    deliverables: ['Diagnosis', 'Roadmap', 'Next 7 days plan'],
    trust: 'Strategy you can execute today',
  },
];

const toggleOptions = [
  { id: 'ai', label: 'Fast (24h build)' },
  { id: 'branding', label: 'Foundation' },
  { id: 'consultation', label: 'Clarity' },
];

// 3D Tilt Card Component
const TiltCard = memo(({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);
  
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
});

TiltCard.displayName = 'TiltCard';

export const Solutions = memo(() => {
  const [activeToggle, setActiveToggle] = useState<string | null>(null);

  const scrollToContact = (service: string) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Note: In a real implementation, you'd also set the service dropdown
    }
  };

  return (
    <section id="solutions" className="relative py-32 overflow-hidden section-gradient">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-alchemy-red/5 blur-[100px]"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-deep-crimson/5 blur-[80px]"
          animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <motion.p 
            className="font-mono text-xs text-alchemy-red tracking-[0.25em] uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Our Services
          </motion.p>
          <motion.h2 
            className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-[-0.02em] text-porcelain mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="block">Three <span className="italic text-alchemy-red">Pillars</span></span>
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

        {/* Pick Your Speed Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div 
            className="inline-flex items-center gap-1 p-1.5 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <span className="font-mono text-[10px] text-porcelain/40 tracking-wider uppercase px-3">
              Pick Your Speed:
            </span>
            {toggleOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveToggle(activeToggle === option.id ? null : option.id)}
                className={`px-4 py-2 rounded-full font-body text-sm transition-all duration-300 ${
                  activeToggle === option.id 
                    ? 'bg-alchemy-red/25 text-porcelain border border-alchemy-red/50 shadow-[0_0_15px_rgba(220,38,38,0.2)]' 
                    : 'text-porcelain/50 hover:text-porcelain'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Pillar Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            const isHighlighted = activeToggle === pillar.id;
            const isDimmed = activeToggle && activeToggle !== pillar.id;
            
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`transition-all duration-300 ${isDimmed ? 'opacity-50 scale-[0.98]' : ''}`}
              >
                <TiltCard>
                  <div
                    className={`group glass-deep rounded-3xl p-8 md:p-10 h-full transition-all duration-500 relative overflow-hidden ${
                      isHighlighted ? 'border-alchemy-red/40 shadow-[0_0_40px_rgba(220,38,38,0.15)]' : ''
                    }`}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      transform: isHighlighted ? 'scale(1.02)' : undefined,
                    }}
                  >
                    {/* Gradient background */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} transition-opacity duration-500 ${
                        isHighlighted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                      style={{ transform: 'translateZ(-10px)' }}
                    />
                    {/* Inner glow on hover */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-alchemy-red/0 via-alchemy-red/[0.03] to-alchemy-red/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Background number */}
                    <span 
                      className="absolute -top-6 -right-2 font-display text-[120px] text-porcelain/[0.02] leading-none pointer-events-none"
                      style={{ transform: 'translateZ(-20px)' }}
                    >
                      {pillar.number}
                    </span>

                    {/* Content */}
                    <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
                      {/* Icon */}
                      <div className="mb-5">
                        <div className="w-12 h-12 rounded-xl glass-red flex items-center justify-center group-hover:shadow-[0_0_25px_rgba(220,38,38,0.25)] transition-shadow duration-500">
                          <Icon className="w-5 h-5 text-alchemy-red" />
                        </div>
                      </div>

                      {/* Text */}
                      <div className="mb-5">
                        <p className="font-mono text-[10px] text-alchemy-red/70 tracking-[0.15em] uppercase mb-2">
                          Pillar {pillar.number} · {pillar.subtitle}
                        </p>
                        <h3 className="font-display text-2xl italic text-porcelain mb-2 group-hover:text-alchemy-red transition-colors duration-300">
                          {pillar.title}
                        </h3>
                      </div>

                      <p className="font-body text-sm text-porcelain/50 font-light leading-relaxed mb-5">
                        {pillar.description}
                      </p>

                      {/* Trust line */}
                      <p className="font-mono text-[10px] text-porcelain/30 uppercase tracking-wider mb-4">
                        {pillar.trust}
                      </p>

                      {/* Deliverables */}
                      <div className="mb-6 pt-4 border-t border-porcelain/5">
                        <p className="font-mono text-[9px] text-alchemy-red/60 uppercase tracking-wider mb-2">
                          Deliverables
                        </p>
                        <ul className="space-y-1.5">
                          {pillar.deliverables.map((item, j) => (
                            <li key={j} className="flex items-center gap-2 text-xs text-porcelain/50 font-light">
                              <span className="w-1 h-1 rounded-full bg-alchemy-red/60" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <button
                        onClick={() => scrollToContact(pillar.id)}
                        className="flex items-center gap-2 text-porcelain/60 group-hover:text-alchemy-red transition-colors duration-300"
                      >
                        <span className="font-body text-sm">Start this sprint</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/book-sprint"
            className="inline-flex items-center gap-3 glass-cta-primary group relative overflow-hidden"
          >
            <span className="relative z-10 font-body">Book a Free 15-Min Consult</span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
});

Solutions.displayName = 'Solutions';
