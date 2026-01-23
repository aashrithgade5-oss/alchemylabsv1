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
  { number: '∞', label: 'Unlimited Iterations', subtext: 'No revision caps' },
  { number: '24h', label: 'Idea to Live Product', subtext: 'Rapid delivery' },
  { number: '1:1', label: 'Founder Collaboration', subtext: 'Direct access' },
];

export const Hero = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: '-50px' });
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('orientationchange', checkMobile);
    return () => window.removeEventListener('orientationchange', checkMobile);
  }, []);

  return (
    <section 
      id="hero" 
      ref={sectionRef} 
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-alchemy-black"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-[1]">
        {!isMobile && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover scale-105 opacity-20"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}
        
        {/* Vignette + Red glow */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 10, 0.6) 50%, rgba(10, 10, 10, 0.98) 100%),
              linear-gradient(to bottom, rgba(10, 10, 10, 0.5) 0%, transparent 30%, transparent 70%, rgba(10, 10, 10, 0.98) 100%)
            `,
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(220, 38, 38, 0.08) 0%, transparent 60%)',
          }}
        />
        
        {/* Subtle grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Neural Particles - Desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 z-[2] opacity-60">
          <NeuralBackground />
        </div>
      )}

      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 md:pt-0"
      >
        <div className="flex flex-col items-center text-center">
          
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 sm:mb-8"
          >
            <span 
              className="inline-block px-4 py-2 rounded-full backdrop-blur-md"
              style={{
                background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                border: '1px solid rgba(220, 38, 38, 0.3)',
              }}
            >
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-porcelain/80">
                AI-Powered Creative Studio
              </span>
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-5 sm:mb-6"
          >
            <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.08] tracking-[-0.02em] text-balance">
              <motion.span 
                className="block font-body font-medium text-porcelain"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                Ship production-ready products
              </motion.span>
              <motion.span 
                className="block mt-1"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <span className="font-body font-medium text-porcelain/80">while competitors are </span>
                <span 
                  className="font-display italic relative inline-block"
                  style={{ 
                    color: '#dc2626',
                    textShadow: '0 0 30px rgba(220, 38, 38, 0.4)',
                  }}
                >
                  still planning.
                  <span 
                    className="absolute bottom-0 left-0 w-full h-[3px] rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, rgba(220, 38, 38, 0.8) 0%, rgba(185, 28, 28, 0.4) 100%)',
                    }}
                  />
                </span>
              </motion.span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="font-body text-base sm:text-lg md:text-xl text-porcelain/60 leading-relaxed max-w-2xl mx-auto mb-6 font-light"
          >
            From vision to a live product in 24 hours—not weeks.
            <br className="hidden sm:block" />
            Work 1:1 with founders who ship, iterate, and scale with precision.
          </motion.p>

          {/* Proof Strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10"
          >
            <div 
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-5 py-3 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              {proofPoints.map((point, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-alchemy-red" />
                  <span className="font-body text-xs sm:text-sm text-porcelain/70">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4"
          >
            <Link to="/book-sprint">
              <MagneticButton className="glass-cta-primary group relative overflow-hidden">
                <span className="relative z-10 font-body font-medium text-sm sm:text-base">Start Your Project Today</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticButton>
            </Link>

            <a
              href="#process"
              className="group inline-flex items-center gap-2 px-5 py-3 font-body text-sm text-porcelain/50 hover:text-porcelain transition-colors duration-300"
            >
              <span>See How It Works</span>
              <ArrowUpRight className="w-4 h-4 text-alchemy-red transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* CTA Microtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="font-mono text-[10px] text-porcelain/40 tracking-wider"
          >
            Free first call · 24h response · NDA on request
          </motion.p>
        </div>
      </div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.85 }}
        className="absolute bottom-20 sm:bottom-16 left-1/2 -translate-x-1/2 z-10 w-full max-w-4xl px-4"
      >
        <div className="grid grid-cols-3 gap-3 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="group relative rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              {/* Top accent line on hover */}
              <div 
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.8), transparent)',
                }}
              />
              
              <span 
                className="block font-display text-3xl sm:text-4xl md:text-5xl italic mb-1"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.number}
              </span>
              <span className="block font-body text-[10px] sm:text-xs text-porcelain/70 mb-0.5">
                {stat.label}
              </span>
              <span className="hidden sm:block font-mono text-[9px] text-porcelain/40">
                {stat.subtext}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Corner accents - desktop only */}
      <div className="hidden lg:block absolute top-8 left-8 w-12 h-12 border-l border-t border-porcelain/10 pointer-events-none" />
      <div className="hidden lg:block absolute top-8 right-8 w-12 h-12 border-r border-t border-porcelain/10 pointer-events-none" />
    </section>
  );
});

Hero.displayName = 'Hero';
