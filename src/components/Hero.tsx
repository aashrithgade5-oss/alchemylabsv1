import { motion, useInView } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Sparkles, Layers, Target, ChevronDown } from 'lucide-react';
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

export const Hero = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: '-50px' });
  const [isMobile, setIsMobile] = useState(true);
  const [showParticles, setShowParticles] = useState(false);
  
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
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(0 0% 4%) 30%, hsl(0 0% 3.5%) 70%, hsl(0 0% 2%) 100%)',
        }} />
        
        <video
          autoPlay loop muted playsInline
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover scale-[1.02] ${isMobile ? 'opacity-[0.15]' : 'opacity-[0.12]'}`}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 0%, transparent 30%, rgba(10,10,10,0.4) 55%, rgba(10,10,10,0.85) 80%, rgba(10,10,10,0.98) 100%)',
        }} />
        
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, transparent 15%, transparent 85%, rgba(10,10,10,0.95) 100%)',
        }} />
        
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(220,38,38,0.08) 0%, transparent 60%)',
        }} />
        
        {!isMobile && (
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(ellipse 40% 35% at 25% 60%, rgba(220,38,38,0.04) 0%, transparent 50%),
              radial-gradient(ellipse 35% 30% at 75% 50%, rgba(220,38,38,0.03) 0%, transparent 45%)
            `,
          }} />
        )}
        
        {!isMobile && (
          <div className="absolute inset-0 opacity-[0.012]" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }} />
        )}
      </div>

      {showParticles && (
        <div className="absolute inset-0 z-[2] opacity-40">
          <Suspense fallback={null}>
            <NeuralBackground isMobile={false} />
          </Suspense>
        </div>
      )}

      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex-1 flex flex-col justify-center items-center w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-40 md:pt-28 md:pb-44"
      >
        <div className="flex flex-col items-center text-center w-full">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
            className="mb-8 md:mb-10"
          >
            <span 
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
              style={{
                background: 'rgba(220, 38, 38, 0.1)',
                border: '1px solid rgba(220, 38, 38, 0.3)',
              }}
            >
              <span className="w-1.5 h-1.5 bg-alchemy-red rounded-full animate-pulse" />
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-porcelain/80">
                AI-Powered Creative Studio
              </span>
            </span>
          </motion.div>

          {/* Headline — bigger, bolder, more spacing */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
            className="mb-6 md:mb-8 flex items-baseline justify-center gap-3 sm:gap-4 md:gap-5 flex-wrap"
          >
            <span className="font-body font-black text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] leading-[0.95] tracking-[0.04em] uppercase text-porcelain">
              ALCHEMY
            </span>
            <span className="font-body font-light text-lg sm:text-2xl md:text-3xl text-porcelain/25">in</span>
            <span 
              className="font-display italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] hero-fluid-text"
            >
              Motion
            </span>
          </motion.h1>

          {/* Subheadline — cleaner, more impactful */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25, ease: easeOut }}
            className="max-w-2xl mx-auto mb-8 md:mb-10"
          >
            <p className="font-body text-base sm:text-lg md:text-xl lg:text-2xl leading-[1.6] text-porcelain/60 font-light">
              We build brands that move faster, look sharper,{' '}
              <br className="hidden sm:block" />
              and feel{' '}
              <span className="font-display italic text-alchemy-red" style={{ textShadow: '0 0 20px rgba(220,38,38,0.25)' }}>
                inevitable.
              </span>
            </p>
          </motion.div>

          {/* Service Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.35, ease: easeOut }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 md:mb-12"
          >
            {servicePillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={i} 
                  className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:border-alchemy-red/30"
                  style={{
                    background: 'rgba(220,38,38,0.05)',
                    border: '1px solid rgba(220,38,38,0.12)',
                  }}
                >
                  <Icon className="w-3.5 h-3.5 text-alchemy-red/70" />
                  <span className="font-body text-[11px] sm:text-xs text-porcelain/55">{pillar.label}</span>
                </div>
              );
            })}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.45, ease: easeOut }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mb-3"
          >
            <Link to="/book-sprint">
              <MagneticButton className="glass-cta-primary group relative overflow-hidden">
                <span className="relative z-10 font-body font-medium text-sm sm:text-base">Start Your Project</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </MagneticButton>
            </Link>

            <a
              href="#process"
              className="group inline-flex items-center gap-2 px-5 py-3 font-body text-sm text-porcelain/50 hover:text-porcelain/80 transition-colors duration-300"
            >
              <span>See How It Works</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-alchemy-red/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* Microtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="font-mono text-[8px] sm:text-[10px] text-porcelain/30 tracking-wider"
          >
            Free first call · 24h response · NDA on request
          </motion.p>
        </div>
      </div>

      {/* Bottom — Scroll to Explore indicator */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-8 sm:pb-10">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[8px] sm:text-[9px] text-porcelain/25 uppercase tracking-[0.2em]">
              Scroll to explore
            </span>
            <div className="relative w-5 h-8 rounded-full border border-porcelain/10 flex justify-center">
              <motion.div 
                className="absolute top-2 w-0.5 h-2 rounded-full bg-alchemy-red/50"
                animate={{ y: [0, 8, 0], opacity: [0.7, 0.2, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Corner accents — desktop */}
      {!isMobile && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.1, duration: 0.6 }}
            className="absolute top-10 left-10 w-10 h-10 border-l border-t border-porcelain/[0.05] pointer-events-none" />
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute top-10 right-10 w-10 h-10 border-r border-t border-porcelain/[0.05] pointer-events-none" />
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.3, duration: 0.6 }}
            className="absolute bottom-10 left-10 w-10 h-10 border-l border-b border-porcelain/[0.05] pointer-events-none" />
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute bottom-10 right-10 w-10 h-10 border-r border-b border-porcelain/[0.05] pointer-events-none" />
        </>
      )}
    </section>
  );
});

Hero.displayName = 'Hero';
