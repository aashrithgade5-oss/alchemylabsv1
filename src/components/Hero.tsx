import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroVideo from '@/assets/hero-video.mp4';
import { MagneticButton } from './MagneticButton';
import { useRef, useState, useEffect } from 'react';
import { NeuralBackground } from './NeuralBackground';

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: '-50px' });
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);

  return (
    <section 
      id="hero" 
      ref={sectionRef} 
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-alchemy-black"
    >
      {/* Video Background */}
      <motion.div className="absolute inset-0 z-[1]" style={{ y: isMobile ? 0 : y }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover scale-105 opacity-30"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        
        {/* Vignette overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 11, 0.5) 50%, rgba(10, 10, 11, 0.95) 100%),
              linear-gradient(to bottom, rgba(10, 10, 11, 0.4) 0%, transparent 30%, transparent 70%, rgba(10, 10, 11, 0.98) 100%)
            `,
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(225, 6, 19, 0.08) 0%, transparent 60%)',
          }}
        />
      </motion.div>

      {/* Neural Particles - Desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 z-[2]">
          <NeuralBackground />
        </div>
      )}

      {/* Main Content */}
      <motion.div
        ref={contentRef}
        style={{ opacity, scale: isMobile ? 1 : scale }}
        className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-20 md:pt-0"
      >
        <div className="flex flex-col items-center text-center">
          
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 sm:mb-8"
          >
            <span 
              className="inline-block px-4 py-2 rounded-full backdrop-blur-md"
              style={{
                background: 'linear-gradient(135deg, rgba(225, 6, 19, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                border: '1px solid rgba(225, 6, 19, 0.3)',
              }}
            >
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-porcelain/80">
                AI-Powered Creative Studio
              </span>
            </span>
          </motion.div>

          {/* Main Headline - ALCHEMY with blend-difference effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-5 sm:mb-6"
          >
            <h1 className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.05] tracking-[-0.02em]">
              <motion.span 
                className="inline-block font-body font-bold text-porcelain tracking-[0.08em] uppercase mix-blend-difference"
                style={{ willChange: 'transform, opacity' }}
                initial={{ opacity: 0, y: 35 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                ALCHEMY
              </motion.span>
              <motion.span 
                className="inline-block text-porcelain/40 mx-2 sm:mx-3 font-body font-light text-[0.5em]"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                in
              </motion.span>
              <motion.span 
                className="inline-block font-display italic motion-text relative mix-blend-difference"
                style={{ willChange: 'transform, opacity' }}
                initial={{ opacity: 0, y: 35 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                Motion
              </motion.span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.h2
            className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-[1.25] tracking-[-0.01em] mb-6 sm:mb-8"
          >
            <motion.span 
              className="inline-block italic text-alchemy-red"
              initial={{ opacity: 0, x: -15 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              AI
            </motion.span>
            <motion.span 
              className="inline-block text-porcelain/50"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              -Augmented{' '}
            </motion.span>
            <motion.span 
              className="inline-block italic text-alchemy-red"
              initial={{ opacity: 0, x: 15 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              Branding
            </motion.span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="font-body text-sm sm:text-base md:text-lg text-porcelain/50 leading-relaxed max-w-md sm:max-w-lg mx-auto mb-10 sm:mb-12 font-light px-2"
          >
            We architect <span className="text-porcelain/70">brand systems</span> for the 
            intelligence era—<br className="hidden sm:block" />where <span className="text-porcelain/70">strategy</span>, <span className="text-porcelain/70">identity</span>, 
            and <span className="text-porcelain/70">culture</span> scale with precision.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/book-sprint">
              <MagneticButton className="glass-cta-primary group relative overflow-hidden">
                <span className="relative z-10 font-body font-medium text-sm sm:text-base">Book a Strategy Sprint</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticButton>
            </Link>

            <Link
              to="/work"
              className="group inline-flex items-center gap-2 px-5 py-3 font-body text-sm text-porcelain/50 hover:text-porcelain transition-colors duration-300"
            >
              <span>Explore Our Work</span>
              <ArrowUpRight className="w-4 h-4 text-alchemy-red transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden sm:flex"
      >
        <motion.span 
          className="font-mono text-[9px] text-porcelain/30 uppercase tracking-[0.2em]"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll
        </motion.span>
        <motion.div className="relative w-5 h-8 rounded-full border border-porcelain/20 flex justify-center">
          <motion.div 
            className="absolute top-1.5 w-1 h-2 rounded-full bg-gradient-to-b from-alchemy-red to-alchemy-red/50"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* Corner accents - desktop only */}
      <div className="hidden lg:block absolute top-8 left-8 w-12 h-12 border-l border-t border-porcelain/10 pointer-events-none" />
      <div className="hidden lg:block absolute top-8 right-8 w-12 h-12 border-r border-t border-porcelain/10 pointer-events-none" />
      <div className="hidden lg:block absolute bottom-8 left-8 w-12 h-12 border-l border-b border-porcelain/10 pointer-events-none" />
      <div className="hidden lg:block absolute bottom-8 right-8 w-12 h-12 border-r border-b border-porcelain/10 pointer-events-none" />
    </section>
  );
};
