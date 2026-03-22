import { motion, useInView, useScroll, useTransform, animate } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Sparkles, Layers, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroVideo from '@/assets/hero-video.mp4';
import { MagneticButton } from './MagneticButton';
import { useRef, useState, useEffect, memo, lazy, Suspense } from 'react';

const NeuralBackground = lazy(() => 
  import('./NeuralBackground').then(m => ({ default: m.NeuralBackground }))
);

const servicePillars = [
  { label: 'AI Creative Studio', icon: Sparkles },
  { label: 'Branding Systems', icon: Layers },
  { label: 'Advisory', icon: Target },
];

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Staggered text reveal with clip-path wipe
const TextRevealLine = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: '0%', opacity: 1 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  </div>
);

// Animated counter for stats
const AnimatedNumber = ({ value, suffix = '', delay = 0 }: { value: string; suffix?: string; delay?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (!isInView || !ref.current) return;
    const num = parseInt(value);
    if (isNaN(num)) {
      ref.current.textContent = value + suffix;
      return;
    }
    const controls = animate(0, num, {
      duration: 2,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [isInView, value, suffix, delay]);
  
  return <span ref={ref}>0{suffix}</span>;
};

export const Hero = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: '-50px' });
  const [isMobile, setIsMobile] = useState(true);
  const [showParticles, setShowParticles] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.2]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.06, 0.01]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const pillarsY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.6]);

  useEffect(() => {
    setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    
    if (!isMobile) {
      const timer = setTimeout(() => setShowParticles(true), 300);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', checkMobile);
      };
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  return (
    <section 
      id="hero" 
      ref={sectionRef} 
      className="relative min-h-[100svh] flex flex-col overflow-hidden bg-alchemy-black"
    >
      {/* ═══ Background Layers ═══ */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-[hsl(240,5%,3%)]" />
        
        {/* Parallax video */}
        <motion.div
          className="absolute inset-0"
          style={!prefersReduced ? { scale: videoScale, opacity: videoOpacity } : undefined}
        >
          <video
            autoPlay loop muted playsInline preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover ${prefersReduced ? 'opacity-[0.15]' : ''}`}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </motion.div>
        
        {/* Deep vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(8,8,10,0.55) 50%, rgba(8,8,10,0.95) 100%)',
        }} />
        
        {/* Aurora — smooth rotating glow */}
        {!prefersReduced && (
          <div 
            className="absolute inset-0 pointer-events-none aurora-bg"
            style={{ opacity: 0.7 }}
          />
        )}

        {/* Atmospheric side glows */}
        <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(220,38,38,0.07) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(220,38,38,0.05) 0%, transparent 70%)' }} />
        
        {/* Technical grid — desktop only */}
        {!isMobile && (
          <div className="absolute inset-0 opacity-[0.018]" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }} />
        )}

        {/* Scroll fade */}
        <motion.div className="absolute inset-0 bg-black pointer-events-none" style={{ opacity: overlayOpacity }} />
      </div>

      {/* Neural particles — desktop */}
      {showParticles && (
        <div className="absolute inset-0 z-[2] opacity-25 pointer-events-none">
          <Suspense fallback={null}>
            <NeuralBackground isMobile={false} />
          </Suspense>
        </div>
      )}

      {/* ═══ Main Content ═══ */}
      <div
        ref={contentRef}
        className="relative z-10 flex-1 flex flex-col justify-center items-center w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 pt-28 pb-36 md:pt-32 md:pb-44"
      >
        <motion.div 
          className="flex flex-col items-center text-center w-full"
          style={!prefersReduced ? { y: headlineY } : undefined}
        >
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
            animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
            className="mb-10 md:mb-12"
          >
            <span 
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
              style={{
                background: 'rgba(220, 38, 38, 0.08)',
                border: '1px solid rgba(220, 38, 38, 0.25)',
                boxShadow: '0 0 20px rgba(220,38,38,0.1)',
              }}
            >
              <motion.span
                className="w-1.5 h-1.5 bg-alchemy-red rounded-full"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ boxShadow: '0 0 8px rgba(220,38,38,0.7)' }}
              />
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-porcelain/80">
                AI-Powered Creative Studio
              </span>
            </span>
          </motion.div>

          {/* ═══ HEADLINE — Clean, Powerful ═══ */}
          <div className="mb-8 md:mb-10">
            {isInView && (
              <h1 className="flex flex-col sm:flex-row items-center justify-center gap-x-5 gap-y-1">
                <TextRevealLine delay={0.25}>
                  <span 
                    className="font-body font-black text-[3.2rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] leading-[0.9] tracking-[0.04em] uppercase text-porcelain"
                    style={{ 
                      textShadow: '0 2px 60px rgba(220,38,38,0.12)',
                    }}
                  >
                    ALCHEMY
                  </span>
                </TextRevealLine>
                <div className="flex items-baseline gap-3 sm:gap-4">
                  <TextRevealLine delay={0.4}>
                    <span className="font-body font-extralight text-lg sm:text-xl md:text-2xl lg:text-3xl text-porcelain/25 tracking-wide">in</span>
                  </TextRevealLine>
                  <TextRevealLine delay={0.5}>
                    <span 
                      className="font-display italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] hero-fluid-text"
                    >
                      Motion
                    </span>
                  </TextRevealLine>
                </div>
              </h1>
            )}
          </div>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.7, delay: 0.7, ease: easeOut }}
            className="max-w-2xl mx-auto mb-10 md:mb-12"
          >
            <p className="font-body text-base sm:text-lg md:text-xl leading-[1.75] text-porcelain/45 font-light tracking-wide">
              We build brands that move faster, look sharper,{' '}
              <br className="hidden sm:block" />
              and feel{' '}
              <motion.span 
                className="font-display italic text-alchemy-red inline-block"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.0, ease: easeOut }}
                style={{ textShadow: '0 0 25px rgba(220,38,38,0.35)' }}
              >
                inevitable.
              </motion.span>
            </p>
          </motion.div>

          {/* Service Pillars */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 md:mb-14"
            style={!prefersReduced ? { y: pillarsY } : undefined}
          >
            {servicePillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 24, scale: 0.85 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.85 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-full cursor-default group/pillar"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(12px)',
                  }}
                  whileHover={{ 
                    scale: 1.06,
                    y: -2,
                    borderColor: 'rgba(220,38,38,0.3)',
                    boxShadow: '0 8px 25px rgba(220,38,38,0.12)',
                  }}
                >
                  <Icon className="w-3.5 h-3.5 text-alchemy-red/70 group-hover/pillar:text-alchemy-red transition-colors" />
                  <span className="font-body text-[11px] sm:text-xs text-porcelain/50 group-hover/pillar:text-porcelain/80 transition-colors tracking-wide">{pillar.label}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.15, ease: easeOut }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-6"
          >
            <Link to="/book-sprint">
              <MagneticButton className="glass-cta-primary group relative overflow-hidden">
                <span className="relative z-10 font-body font-medium text-sm sm:text-base tracking-wide">Start Your Project</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticButton>
            </Link>

            <a
              href="#process"
              className="group inline-flex items-center gap-2 px-5 py-3 font-body text-sm text-porcelain/40 hover:text-porcelain/70 transition-colors duration-300"
            >
              <span className="tracking-wide">See How It Works</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-alchemy-red/50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.35, ease: easeOut }}
            className="flex items-center gap-8 sm:gap-10 mt-3"
          >
            {[
              { value: '50', suffix: '+', label: 'Projects' },
              { value: '24', suffix: 'h', label: 'Turnaround' },
              { value: '100', suffix: '%', label: 'Satisfaction' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="font-display text-lg sm:text-xl italic text-alchemy-red">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} delay={1.4 + i * 0.15} />
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] text-porcelain/25 tracking-[0.15em] uppercase">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Trust microtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.7 }}
            className="font-mono text-[8px] sm:text-[9px] text-porcelain/20 tracking-[0.15em] mt-5"
          >
            Free first call · 24h response · NDA on request
          </motion.p>
        </motion.div>
      </div>

      {/* ═══ Scroll Indicator ═══ */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-8 sm:pb-10">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.6 }}
            className="flex flex-col items-center gap-3"
          >
            <span className="font-mono text-[8px] sm:text-[9px] text-porcelain/15 uppercase tracking-[0.25em]">
              Scroll to explore
            </span>
            <div className="relative w-px h-10">
              <div className="absolute inset-0 bg-gradient-to-b from-porcelain/10 to-transparent" />
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-alchemy-red"
                animate={{ y: [0, 32, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ boxShadow: '0 0 8px rgba(220,38,38,0.7)' }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Corner accents — desktop */}
      {!isMobile && (
        <>
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 1.5, duration: 0.5, ease: easeOut }}
            className="absolute top-10 left-10 w-10 h-10 border-l border-t border-porcelain/[0.06] pointer-events-none" />
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 1.6, duration: 0.5, ease: easeOut }}
            className="absolute top-10 right-10 w-10 h-10 border-r border-t border-porcelain/[0.06] pointer-events-none" />
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 1.7, duration: 0.5, ease: easeOut }}
            className="absolute bottom-10 left-10 w-10 h-10 border-l border-b border-porcelain/[0.06] pointer-events-none" />
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 1.8, duration: 0.5, ease: easeOut }}
            className="absolute bottom-10 right-10 w-10 h-10 border-r border-b border-porcelain/[0.06] pointer-events-none" />
        </>
      )}
    </section>
  );
});

Hero.displayName = 'Hero';
