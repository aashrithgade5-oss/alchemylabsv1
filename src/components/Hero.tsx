import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, animate } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Sparkles, Layers, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroVideo from '@/assets/hero-video.mp4';
import { MagneticButton } from './MagneticButton';
import { useRef, useState, useEffect, memo, lazy, Suspense, useMemo } from 'react';

const NeuralBackground = lazy(() => 
  import('./NeuralBackground').then(m => ({ default: m.NeuralBackground }))
);

const servicePillars = [
  { label: 'AI Creative Studio', icon: Sparkles },
  { label: 'Branding Systems', icon: Layers },
  { label: 'Advisory', icon: Target },
];

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Staggered text reveal for dramatic entrance
const TextRevealLine = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: '110%', rotateX: -80 }}
      animate={{ y: '0%', rotateX: 0 }}
      transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: 'bottom center', perspective: 600 }}
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

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.25]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.18, 0.08, 0.02]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const pillarsY = useTransform(scrollYProgress, [0, 1], [0, -40]);
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
      {/* Background layers */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-[hsl(240,5%,3%)]" />
        
        {/* Parallax video — more visible */}
        <motion.div
          className="absolute inset-0"
          style={!prefersReduced ? { scale: videoScale, opacity: videoOpacity } : undefined}
        >
          <video
            autoPlay loop muted playsInline preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover ${prefersReduced ? 'opacity-[0.18]' : ''}`}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </motion.div>
        
        {/* Heavy vignette for depth */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(8,8,10,0.5) 50%, rgba(8,8,10,0.95) 100%)',
        }} />
        
        {/* Animated aurora — VISIBLE */}
        {!prefersReduced && (
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                'conic-gradient(from 0deg at 50% 40%, rgba(220,38,38,0) 0deg, rgba(220,38,38,0.18) 60deg, rgba(220,38,38,0) 120deg, rgba(220,38,38,0.12) 200deg, rgba(220,38,38,0) 280deg, rgba(220,38,38,0.15) 340deg, rgba(220,38,38,0) 360deg)',
                'conic-gradient(from 120deg at 50% 40%, rgba(220,38,38,0) 0deg, rgba(220,38,38,0.15) 60deg, rgba(220,38,38,0) 120deg, rgba(220,38,38,0.18) 200deg, rgba(220,38,38,0) 280deg, rgba(220,38,38,0.12) 340deg, rgba(220,38,38,0) 360deg)',
                'conic-gradient(from 240deg at 50% 40%, rgba(220,38,38,0) 0deg, rgba(220,38,38,0.12) 60deg, rgba(220,38,38,0) 120deg, rgba(220,38,38,0.15) 200deg, rgba(220,38,38,0) 280deg, rgba(220,38,38,0.18) 340deg, rgba(220,38,38,0) 360deg)',
                'conic-gradient(from 360deg at 50% 40%, rgba(220,38,38,0) 0deg, rgba(220,38,38,0.18) 60deg, rgba(220,38,38,0) 120deg, rgba(220,38,38,0.12) 200deg, rgba(220,38,38,0) 280deg, rgba(220,38,38,0.15) 340deg, rgba(220,38,38,0) 360deg)',
              ],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            style={{ filter: 'blur(60px)' }}
          />
        )}

        {/* Side accent glows */}
        <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(220,38,38,0.08) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(220,38,38,0.06) 0%, transparent 70%)' }} />
        
        {/* Tech grid */}
        {!isMobile && (
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }} />
        )}

        {/* Scroll fade overlay */}
        <motion.div className="absolute inset-0 bg-black pointer-events-none" style={{ opacity: overlayOpacity }} />
      </div>

      {showParticles && (
        <div className="absolute inset-0 z-[2] opacity-30 pointer-events-none">
          <Suspense fallback={null}>
            <NeuralBackground isMobile={false} />
          </Suspense>
        </div>
      )}

      {/* Main Content — cinematic staggered reveal */}
      <div
        ref={contentRef}
        className="relative z-10 flex-1 flex flex-col justify-center items-center w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-40 md:pt-28 md:pb-44"
      >
        <motion.div 
          className="flex flex-col items-center text-center w-full"
          style={!prefersReduced ? { y: headlineY } : undefined}
        >
          {/* Eyebrow — drops in */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
            className="mb-8 md:mb-10"
          >
            <span 
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
              style={{
                background: 'rgba(220, 38, 38, 0.12)',
                border: '1px solid rgba(220, 38, 38, 0.35)',
                boxShadow: '0 0 30px rgba(220,38,38,0.15), inset 0 0 20px rgba(220,38,38,0.05)',
              }}
            >
              <motion.span
                className="w-2 h-2 bg-alchemy-red rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ boxShadow: '0 0 12px rgba(220,38,38,0.8)' }}
              />
              <span className="font-mono text-[9px] sm:text-[11px] tracking-[0.2em] uppercase text-porcelain/90">
                AI-Powered Creative Studio
              </span>
            </span>
          </motion.div>

          {/* Headline — dramatic text reveal with 3D flip-in */}
          <div className="mb-6 md:mb-8">
            {isInView && (
              <h1 className="flex items-baseline justify-center gap-3 sm:gap-4 md:gap-5 flex-wrap">
                <TextRevealLine delay={0.3}>
                  <span 
                    className="font-body font-black text-[2.8rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] leading-[0.95] tracking-[0.06em] uppercase"
                    style={{ 
                      background: 'linear-gradient(180deg, hsl(40,33%,98%) 0%, hsl(40,33%,80%) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: 'none',
                      filter: 'drop-shadow(0 4px 60px rgba(220,38,38,0.15))',
                    }}
                  >
                    ALCHEMY
                  </span>
                </TextRevealLine>
                <TextRevealLine delay={0.4}>
                  <span className="font-body font-light text-lg sm:text-2xl md:text-3xl text-porcelain/30">in</span>
                </TextRevealLine>
                <TextRevealLine delay={0.5}>
                  <span 
                    className="font-display italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] hero-fluid-text"
                    style={{ 
                      filter: 'drop-shadow(0 0 40px rgba(220,38,38,0.5)) drop-shadow(0 0 100px rgba(220,38,38,0.2))',
                    }}
                  >
                    Motion
                  </span>
                </TextRevealLine>
              </h1>
            )}
          </div>

          {/* Subheadline — fade + slide */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.7, delay: 0.7, ease: easeOut }}
            className="max-w-2xl mx-auto mb-8 md:mb-10"
          >
            <p className="font-body text-base sm:text-lg md:text-xl lg:text-2xl leading-[1.7] text-porcelain/55 font-light">
              We build brands that move faster, look sharper,{' '}
              <br className="hidden sm:block" />
              and feel{' '}
              <motion.span 
                className="font-display italic text-alchemy-red inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.0, ease: easeOut }}
                style={{ textShadow: '0 0 30px rgba(220,38,38,0.4)' }}
              >
                inevitable.
              </motion.span>
            </p>
          </motion.div>

          {/* Service Pillars — staggered bounce-in */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 md:mb-12"
            style={!prefersReduced ? { y: pillarsY } : undefined}
          >
            {servicePillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full cursor-default group/pillar"
                  style={{
                    background: 'rgba(220,38,38,0.06)',
                    border: '1px solid rgba(220,38,38,0.15)',
                    backdropFilter: 'blur(12px)',
                  }}
                  whileHover={{ 
                    scale: 1.08,
                    y: -3,
                    boxShadow: '0 8px 30px rgba(220,38,38,0.2), 0 0 0 1px rgba(220,38,38,0.4)',
                  }}
                >
                  <Icon className="w-3.5 h-3.5 text-alchemy-red group-hover/pillar:drop-shadow-[0_0_8px_rgba(220,38,38,0.6)] transition-all" />
                  <span className="font-body text-[11px] sm:text-xs text-porcelain/60 group-hover/pillar:text-porcelain transition-colors">{pillar.label}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTAs — dramatic entrance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.2, ease: easeOut }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mb-4"
          >
            <Link to="/book-sprint">
              <MagneticButton className="glass-cta-primary group relative overflow-hidden">
                <span className="relative z-10 font-body font-medium text-sm sm:text-base">Start Your Project</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticButton>
            </Link>

            <a
              href="#process"
              className="group inline-flex items-center gap-2 px-5 py-3 font-body text-sm text-porcelain/50 hover:text-porcelain transition-colors duration-300"
            >
              <span>See How It Works</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-alchemy-red/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* Stats bar — visible proof */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.4, ease: easeOut }}
            className="flex items-center gap-6 sm:gap-8 mt-2"
          >
            {[
              { value: '50', suffix: '+', label: 'Projects' },
              { value: '24', suffix: 'h', label: 'Turnaround' },
              { value: '100', suffix: '%', label: 'Satisfaction' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="font-display text-lg sm:text-xl italic text-alchemy-red">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} delay={1.5 + i * 0.15} />
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] text-porcelain/30 tracking-wider uppercase mt-0.5">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Microtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.8 }}
            className="font-mono text-[8px] sm:text-[10px] text-porcelain/25 tracking-wider mt-4"
          >
            Free first call · 24h response · NDA on request
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom — Scroll Indicator */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-8 sm:pb-10">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.6 }}
            className="flex flex-col items-center gap-3"
          >
            <span className="font-mono text-[8px] sm:text-[9px] text-porcelain/20 uppercase tracking-[0.25em]">
              Scroll to explore
            </span>
            <div className="relative w-px h-12">
              <div className="absolute inset-0 bg-gradient-to-b from-porcelain/[0.15] to-transparent" />
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-alchemy-red"
                animate={{ y: [0, 40, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ boxShadow: '0 0 10px rgba(220,38,38,0.8), 0 0 30px rgba(220,38,38,0.3)' }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Corner accents — desktop */}
      {!isMobile && (
        <>
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 1.5, duration: 0.5, ease: easeOut }}
            className="absolute top-10 left-10 w-12 h-12 border-l border-t border-alchemy-red/[0.15] pointer-events-none" />
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 1.6, duration: 0.5, ease: easeOut }}
            className="absolute top-10 right-10 w-12 h-12 border-r border-t border-alchemy-red/[0.15] pointer-events-none" />
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 1.7, duration: 0.5, ease: easeOut }}
            className="absolute bottom-10 left-10 w-12 h-12 border-l border-b border-alchemy-red/[0.15] pointer-events-none" />
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 1.8, duration: 0.5, ease: easeOut }}
            className="absolute bottom-10 right-10 w-12 h-12 border-r border-b border-alchemy-red/[0.15] pointer-events-none" />
        </>
      )}
    </section>
  );
});

Hero.displayName = 'Hero';
