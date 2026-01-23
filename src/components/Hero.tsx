import { motion, useInView } from 'framer-motion';
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
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-alchemy-black"
    >
      {/* Video Background - Desktop only */}
      <div className="absolute inset-0 z-[1]">
        {!isMobile && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover scale-105 opacity-[0.12]"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}
        
        {/* Vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 10, 0.75) 55%, rgba(10, 10, 10, 0.98) 100%),
              linear-gradient(to bottom, rgba(10, 10, 10, 0.7) 0%, transparent 25%, transparent 75%, rgba(10, 10, 10, 0.98) 100%)
            `,
          }}
        />
        
        {/* Subtle red accent glow */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 45%, rgba(220, 38, 38, 0.04) 0%, transparent 45%)',
          }}
        />
        
        {/* Subtle grid - lighter */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Neural Particles - Desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 z-[2] opacity-40">
          <NeuralBackground />
        </div>
      )}

      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8"
      >
        <div className="flex flex-col items-center text-center">
          
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
            className="mb-5"
          >
            <span 
              className="inline-block px-3.5 py-1.5 rounded-full"
              style={{
                background: 'rgba(220, 38, 38, 0.06)',
                border: '1px solid rgba(220, 38, 38, 0.15)',
              }}
            >
              <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.12em] uppercase text-porcelain/60">
                AI-Powered Creative Studio
              </span>
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: easeOut }}
            className="text-[2.25rem] sm:text-[2.75rem] md:text-5xl lg:text-6xl xl:text-[4.25rem] leading-[1.08] tracking-[-0.015em] mb-4"
          >
            <span className="inline-block font-body font-bold text-porcelain tracking-[0.04em] uppercase">
              ALCHEMY
            </span>
            <span className="inline-block text-porcelain/25 mx-1.5 sm:mx-2 font-body font-light text-[0.4em]">
              in
            </span>
            <span 
              className="inline-block font-display italic"
              style={{
                background: 'linear-gradient(135deg, hsl(356 94% 50%) 0%, hsl(356 94% 40%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 20px rgba(220, 38, 38, 0.3))',
              }}
            >
              Motion
            </span>
          </motion.h1>

          {/* Subheadline - proper line breaks */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25, ease: easeOut }}
            className="text-sm sm:text-base md:text-lg lg:text-xl leading-[1.5] max-w-lg mx-auto mb-6"
          >
            <span className="block font-body font-medium text-porcelain/70">
              Ship production-ready products
            </span>
            <span className="block font-body text-porcelain/45">
              while competitors are{' '}
              <span 
                className="font-display italic text-alchemy-red"
                style={{ textShadow: '0 0 16px rgba(220, 38, 38, 0.25)' }}
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
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-6"
          >
            {proofPoints.map((point, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <Check className="w-2.5 h-2.5 text-alchemy-red/70" />
                <span className="font-body text-[11px] sm:text-xs text-porcelain/50">{point}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.45, ease: easeOut }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 mb-2.5"
          >
            <Link to="/book-sprint">
              <MagneticButton className="glass-cta-primary group relative overflow-hidden">
                <span className="relative z-10 font-body font-medium text-[13px] sm:text-sm">Start Your Project Today</span>
                <ArrowRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </MagneticButton>
            </Link>

            <a
              href="#process"
              className="group inline-flex items-center gap-1.5 px-3 py-2 font-body text-[13px] text-porcelain/40 hover:text-porcelain/70 transition-colors duration-300"
            >
              <span>See How It Works</span>
              <ArrowUpRight className="w-3 h-3 text-alchemy-red/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* CTA Microtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="font-mono text-[8px] text-porcelain/30 tracking-wider mb-10"
          >
            Free first call · 24h response · NDA on request
          </motion.p>

          {/* Minimal Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex items-center justify-center gap-8 sm:gap-10 mb-6"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span 
                  className="block font-display text-sm sm:text-base italic text-porcelain/70"
                >
                  {stat.number}
                </span>
                <span className="block font-mono text-[6px] sm:text-[7px] text-porcelain/30 uppercase tracking-[0.08em]">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="font-mono text-[6px] text-porcelain/20 uppercase tracking-[0.15em]">
              Scroll
            </span>
            <div className="relative w-3.5 h-6 rounded-full border border-porcelain/10 flex justify-center">
              <motion.div 
                className="absolute top-1 w-0.5 h-1 rounded-full bg-alchemy-red/50"
                animate={{ y: [0, 6, 0], opacity: [0.7, 0.15, 0.7] }}
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
        transition={{ delay: 1, duration: 0.6, ease: easeOut }}
        className="hidden lg:block absolute top-10 left-10 w-8 h-8 border-l border-t border-porcelain/[0.04] pointer-events-none" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.1, duration: 0.6, ease: easeOut }}
        className="hidden lg:block absolute top-10 right-10 w-8 h-8 border-r border-t border-porcelain/[0.04] pointer-events-none" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.6, ease: easeOut }}
        className="hidden lg:block absolute bottom-10 left-10 w-8 h-8 border-l border-b border-porcelain/[0.04] pointer-events-none" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.3, duration: 0.6, ease: easeOut }}
        className="hidden lg:block absolute bottom-10 right-10 w-8 h-8 border-r border-b border-porcelain/[0.04] pointer-events-none" 
      />
    </section>
  );
});

Hero.displayName = 'Hero';
