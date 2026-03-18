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
    accentColor: 'rgba(139,92,246,0.6)',
    glowColor: 'rgba(139,92,246,0.15)',
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
    accentColor: 'rgba(220,38,38,0.6)',
    glowColor: 'rgba(220,38,38,0.15)',
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
    accentColor: 'rgba(244,63,94,0.6)',
    glowColor: 'rgba(244,63,94,0.15)',
    deliverables: ['Diagnosis', 'Roadmap', 'Next 7 days plan'],
    trust: 'Strategy you can execute today',
  },
];

// Interactive 3D Tilt Card
const TiltCard = memo(({ children, className = '', accentColor }: { children: React.ReactNode; className?: string; accentColor: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1200,
      }}
    >
      {/* Dynamic cursor-following glow */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none z-0"
          style={{
            background: `radial-gradient(400px circle at ${glowX}% ${glowY}%, ${accentColor}, transparent 60%)`,
            opacity: 0.4,
          }}
        />
      )}
      {children}
    </motion.div>
  );
});
TiltCard.displayName = 'TiltCard';

export const Solutions = memo(() => {
  const [activeToggle, setActiveToggle] = useState<string | null>(null);

  return (
    <section id="solutions" className="relative py-32 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full blur-[140px]"
          style={{ background: 'rgba(220,38,38,0.06)' }}
          animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: 'rgba(139,92,246,0.04)' }}
          animate={{ x: [0, -30, 0], y: [0, -40, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header — dramatic reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.p 
            className="font-mono text-xs text-alchemy-red tracking-[0.3em] uppercase mb-5"
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Our Services
          </motion.p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-[-0.02em] text-porcelain mb-6">
            <span className="block">
              Three{' '}
              <motion.span 
                className="italic text-alchemy-red inline-block"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                style={{ textShadow: '0 0 40px rgba(220,38,38,0.3)' }}
              >
                Pillars
              </motion.span>
            </span>
          </h2>
          <p className="font-body text-base md:text-lg text-porcelain/50 max-w-xl mx-auto font-light">
            Every brand challenge requires a different approach. We've engineered three.
          </p>
        </motion.div>

        {/* Pick Your Speed Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center mb-14"
        >
          <div 
            className="inline-flex items-center gap-1 p-1.5 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            }}
          >
            <span className="font-mono text-[10px] text-porcelain/40 tracking-wider uppercase px-3">
              Pick Your Speed:
            </span>
            {pillars.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveToggle(activeToggle === p.id ? null : p.id)}
                className={`px-4 py-2 rounded-full font-body text-sm transition-all duration-300 ${
                  activeToggle === p.id 
                    ? 'bg-alchemy-red/25 text-porcelain border border-alchemy-red/50 shadow-[0_0_20px_rgba(220,38,38,0.25)]' 
                    : 'text-porcelain/50 hover:text-porcelain'
                }`}
              >
                {p.subtitle}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Pillar Cards — 3D interactive */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            const isHighlighted = activeToggle === pillar.id;
            const isDimmed = activeToggle && activeToggle !== pillar.id;
            
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`transition-all duration-500 ${isDimmed ? 'opacity-40 scale-[0.96] blur-[1px]' : ''}`}
              >
                <TiltCard accentColor={pillar.accentColor}>
                  <div
                    className={`group rounded-3xl p-8 md:p-10 h-full relative overflow-hidden transition-all duration-500 ${
                      isHighlighted ? 'shadow-[0_0_60px_rgba(220,38,38,0.2)]' : ''
                    }`}
                    style={{ 
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                      border: isHighlighted 
                        ? '1px solid rgba(220,38,38,0.4)' 
                        : '1px solid rgba(255,255,255,0.07)',
                      backdropFilter: 'blur(20px)',
                      transform: isHighlighted ? 'scale(1.02)' : undefined,
                    }}
                  >
                    {/* Animated border glow on hover */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: `linear-gradient(145deg, ${pillar.glowColor} 0%, transparent 50%)`,
                      }}
                    />

                    {/* Shimmer sweep */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
                        }}
                      />
                    </div>

                    {/* Specular top edge */}
                    <div className="absolute inset-x-0 top-0 h-px pointer-events-none"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 50%, transparent)' }}
                    />

                    {/* Background number — large ghost */}
                    <span className="absolute -top-4 -right-1 font-display text-[100px] leading-none pointer-events-none select-none"
                      style={{ 
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 80%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {pillar.number}
                    </span>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon with animated glow ring */}
                      <div className="mb-6">
                        <div className="relative w-14 h-14">
                          <motion.div 
                            className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              background: `conic-gradient(from 0deg, ${pillar.accentColor}, transparent, ${pillar.accentColor})`,
                              filter: 'blur(4px)',
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                          />
                          <div className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:shadow-lg"
                            style={{
                              background: 'linear-gradient(135deg, rgba(220,38,38,0.15) 0%, rgba(220,38,38,0.05) 100%)',
                              border: '1px solid rgba(220,38,38,0.25)',
                            }}
                          >
                            <Icon className="w-6 h-6 text-alchemy-red" />
                          </div>
                        </div>
                      </div>

                      {/* Text */}
                      <div className="mb-5">
                        <p className="font-mono text-[10px] text-alchemy-red/70 tracking-[0.2em] uppercase mb-2">
                          Pillar {pillar.number} · {pillar.subtitle}
                        </p>
                        <h3 className="font-display text-2xl italic text-porcelain mb-2 group-hover:text-alchemy-red transition-colors duration-300">
                          {pillar.title}
                        </h3>
                      </div>

                      <p className="font-body text-sm text-porcelain/50 font-light leading-relaxed mb-5">
                        {pillar.description}
                      </p>

                      <p className="font-mono text-[10px] text-porcelain/30 uppercase tracking-wider mb-4">
                        {pillar.trust}
                      </p>

                      {/* Deliverables */}
                      <div className="mb-6 pt-4 border-t border-porcelain/[0.06]">
                        <p className="font-mono text-[9px] text-alchemy-red/60 uppercase tracking-wider mb-2">
                          Deliverables
                        </p>
                        <ul className="space-y-1.5">
                          {pillar.deliverables.map((item, j) => (
                            <li key={j} className="flex items-center gap-2 text-xs text-porcelain/50 font-light">
                              <span className="w-1.5 h-1.5 rounded-full bg-alchemy-red/60" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <Link
                        to={pillar.route}
                        className="inline-flex items-center gap-2 text-porcelain/60 group-hover:text-alchemy-red transition-colors duration-300"
                      >
                        <span className="font-body text-sm">Start this sprint</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
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
