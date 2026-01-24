import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroVideo from '@/assets/hero-video.mp4';
import { MagneticButton } from './MagneticButton';
import { useRef, useState, useEffect, memo } from 'react';
import { NeuralBackground } from './NeuralBackground';

const proofPoints = [
  'Founder-led delivery',
  '24h first build',
  'Unlimited iterations',
];

const stats = [
  { number: '∞', label: 'Iterations' },
  { number: '24h', label: 'To Live' },
  { number: '1:1', label: 'Access' },
];

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const Hero = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: '-50px' });
  const [isMobile, setIsMobile] = useState(false);
  
  // Parallax scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5], [0.015, 0]);
  const particleOpacity = useTransform(scrollYProgress, [0, 0.6], [0.45, 0]);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section 
      id="hero" 
      ref={sectionRef} 
      className="relative min-h-[100svh] flex flex-col overflow-hidden bg-alchemy-black"
    >
      {/* Video/Gradient Background with Parallax */}
      <motion.div className="absolute inset-0 z-[1]" style={{ y: bgY }}>
        {/* Mobile: Static gradient background */}
        {isMobile ? (
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 50% 30%, rgba(220, 38, 38, 0.15) 0%, transparent 55%),
                radial-gradient(ellipse at 30% 70%, rgba(220, 38, 38, 0.1) 0%, transparent 45%),
                radial-gradient(ellipse at 70% 50%, rgba(220, 38, 38, 0.08) 0%, transparent 40%),
                linear-gradient(180deg, hsl(240 5% 4%) 0%, hsl(240 5% 3%) 100%)
              `,
            }}
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover scale-110 opacity-[0.15]"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}
        
        {/* Vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 10, 0.7) 50%, rgba(10, 10, 10, 0.95) 100%),
              linear-gradient(to bottom, rgba(10, 10, 10, 0.5) 0%, transparent 20%, transparent 80%, rgba(10, 10, 10, 0.98) 100%)
            `,
          }}
        />
        
        {/* Red accent glow */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(220, 38, 38, 0.06) 0%, transparent 50%)',
          }}
        />
        
        {/* Subtle grid with parallax fade */}
        <motion.div 
          className="absolute inset-0"
          style={{
            opacity: gridOpacity,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </motion.div>

      {/* Neural Particles - Desktop only with parallax */}
      {!isMobile && (
        <motion.div 
          className="absolute inset-0 z-[2]"
          style={{ opacity: particleOpacity }}
        >
          <NeuralBackground />
        </motion.div>
      )}

      {/* Main Content - Centered in middle of viewport */}
      <div
        ref={contentRef}
        className="relative z-10 flex-1 flex flex-col justify-center items-center w-full max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-32 md:pt-28 md:pb-36"
      >
        <div className="flex flex-col items-center text-center">
          
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
            className="mb-5 md:mb-7"
          >
            <span 
              className="inline-block px-4 py-2 rounded-full"
              style={{
                background: 'rgba(220, 38, 38, 0.08)',
                border: '1px solid rgba(220, 38, 38, 0.2)',
              }}
            >
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.12em] uppercase text-porcelain/70">
                AI-Powered Creative Studio
              </span>
            </span>
          </motion.div>

          {/* Main Headline - Larger on desktop */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: easeOut }}
            className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.05] tracking-[-0.02em] mb-4 md:mb-5"
          >
            <span className="inline-block font-body font-bold text-porcelain tracking-[0.05em] uppercase">
              ALCHEMY
            </span>
            <span className="inline-block text-porcelain/25 mx-2 sm:mx-3 font-body font-light text-[0.4em]">
              in
            </span>
            <span 
              className="inline-block font-display italic"
              style={{
                background: 'linear-gradient(135deg, hsl(356 94% 52%) 0%, hsl(356 94% 42%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 25px rgba(220, 38, 38, 0.35))',
              }}
            >
              Motion
            </span>
          </motion.h1>

          {/* Subheadline - Larger */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25, ease: easeOut }}
            className="text-sm sm:text-lg md:text-xl lg:text-2xl leading-[1.5] max-w-xl mx-auto mb-6 md:mb-8"
          >
            <span className="block font-body font-medium text-porcelain/75">
              Ship production-ready products
            </span>
            <span className="block font-body text-porcelain/50">
              while competitors are{' '}
              <span 
                className="font-display italic text-alchemy-red"
                style={{ textShadow: '0 0 18px rgba(220, 38, 38, 0.3)' }}
              >
                still planning.
              </span>
            </span>
          </motion.h2>

          {/* Proof Strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.35, ease: easeOut }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-6 md:mb-8"
          >
            {proofPoints.map((point, i) => (
              <div key={i} className="flex items-center gap-1.5 sm:gap-2">
                <Check className="w-3 h-3 text-alchemy-red/80" />
                <span className="font-body text-[11px] sm:text-sm text-porcelain/60">{point}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.45, ease: easeOut }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-2.5"
          >
            <Link to="/book-sprint">
              <MagneticButton className="glass-cta-primary group relative overflow-hidden">
                <span className="relative z-10 font-body font-medium text-sm sm:text-base">Start Your Project Today</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </MagneticButton>
            </Link>

            <a
              href="#process"
              className="group inline-flex items-center gap-2 px-4 py-2.5 font-body text-sm text-porcelain/45 hover:text-porcelain/75 transition-colors duration-300"
            >
              <span>See How It Works</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-alchemy-red/70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* CTA Microtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="font-mono text-[8px] sm:text-[10px] text-porcelain/35 tracking-wider"
          >
            Free first call · 24h response · NDA on request
          </motion.p>
        </div>
      </div>

      {/* Bottom Section - Stats & Scroll pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-6 sm:pb-8 md:pb-10">
        <div className="flex flex-col items-center">
          {/* Minimal Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex items-center justify-center gap-8 sm:gap-12 mb-5 sm:mb-6"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="block font-display text-sm sm:text-base md:text-lg italic text-porcelain/70">
                  {stat.number}
                </span>
                <span className="block font-mono text-[6px] sm:text-[7px] text-porcelain/30 uppercase tracking-[0.1em]">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="font-mono text-[6px] sm:text-[7px] text-porcelain/20 uppercase tracking-[0.15em]">
              Scroll
            </span>
            <div className="relative w-3.5 h-6 rounded-full border border-porcelain/10 flex justify-center">
              <motion.div 
                className="absolute top-1 w-0.5 h-1 rounded-full bg-alchemy-red/50"
                animate={{ y: [0, 6, 0], opacity: [0.7, 0.2, 0.7] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Corner accents - desktop only */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.1, duration: 0.6, ease: easeOut }}
        className="hidden lg:block absolute top-10 left-10 w-10 h-10 border-l border-t border-porcelain/[0.06] pointer-events-none" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.6, ease: easeOut }}
        className="hidden lg:block absolute top-10 right-10 w-10 h-10 border-r border-t border-porcelain/[0.06] pointer-events-none" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.3, duration: 0.6, ease: easeOut }}
        className="hidden lg:block absolute bottom-10 left-10 w-10 h-10 border-l border-b border-porcelain/[0.06] pointer-events-none" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.4, duration: 0.6, ease: easeOut }}
        className="hidden lg:block absolute bottom-10 right-10 w-10 h-10 border-r border-b border-porcelain/[0.06] pointer-events-none" 
      />
    </section>
  );
});

Hero.displayName = 'Hero';
