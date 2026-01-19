import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroVideo from '@/assets/hero-video.mp4';
import { MagneticButton } from './MagneticButton';
import { useRef, Suspense, lazy } from 'react';

// Lazy load the neural background for performance
const NeuralBackground = lazy(() => 
  import('./NeuralBackground').then(mod => ({ default: mod.NeuralBackground }))
);

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: '-50px' });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section 
      id="hero" 
      ref={sectionRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-alchemy-black"
    >
      {/* Video Background - Base layer */}
      <motion.div className="absolute inset-0 z-[1]" style={{ y }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          className="w-full h-full object-cover scale-105 opacity-50"
          style={{ 
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        
        {/* Red-black vignette overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 11, 0.4) 50%, rgba(10, 10, 11, 0.9) 100%),
              linear-gradient(to bottom, rgba(10, 10, 11, 0.3) 0%, transparent 30%, transparent 70%, rgba(10, 10, 11, 0.95) 100%)
            `,
          }}
        />
        {/* Red accent vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(225, 6, 19, 0.08) 0%, transparent 60%)',
          }}
        />
      </motion.div>

      {/* Three.js Neural Particles - On top of video */}
      <div className="absolute inset-0 z-[2]">
        <Suspense fallback={null}>
          <NeuralBackground />
        </Suspense>
      </div>

      {/* Main Content */}
      <motion.div
        ref={contentRef}
        style={{ opacity, scale }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        <div className="flex flex-col items-center text-center">
          
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 sm:mb-10"
          >
            <span 
              className="inline-block px-5 py-2.5 rounded-full backdrop-blur-md"
              style={{
                background: 'linear-gradient(135deg, rgba(225, 6, 19, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)',
                border: '1px solid rgba(225, 6, 19, 0.25)',
                boxShadow: '0 0 30px rgba(225, 6, 19, 0.15)',
              }}
            >
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-porcelain/70">
                AI-Powered Creative Studio
              </span>
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6 sm:mb-8"
          >
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] leading-[1.1] tracking-[-0.02em]">
              <motion.span 
                className="inline-block bg-gradient-to-r from-porcelain via-porcelain/90 to-porcelain/70 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                Alchemy
              </motion.span>
              <motion.span 
                className="inline-block text-porcelain/40 mx-2 sm:mx-3 font-light"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                in
              </motion.span>
              <motion.span 
                className="inline-block italic bg-gradient-to-r from-alchemy-red via-alchemy-red/90 to-alchemy-red/70 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                Motion
              </motion.span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.h2
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.2] tracking-[-0.01em] mb-8 sm:mb-10"
          >
            <motion.span 
              className="inline-block italic text-alchemy-red"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              AI
            </motion.span>
            <motion.span 
              className="inline-block text-porcelain/50"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              -Augmented{' '}
            </motion.span>
            <motion.span 
              className="inline-block italic text-alchemy-red"
              initial={{ opacity: 0, x: 20 }}
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
            className="font-body text-base sm:text-lg md:text-xl text-porcelain/45 leading-relaxed max-w-xl mx-auto mb-12 sm:mb-14 font-light"
          >
            We architect <span className="text-porcelain/70 font-normal">brand systems</span> for the 
            intelligence era—where <span className="text-porcelain/70 font-normal">strategy</span>, <span className="text-porcelain/70 font-normal">identity</span>, 
            and <span className="text-porcelain/70 font-normal">culture</span> scale through precision.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link to="/book-sprint">
              <MagneticButton className="glass-cta-primary group relative overflow-hidden">
                <span className="relative z-10 font-body font-medium">Book a Strategy Sprint</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatDelay: 3,
                    ease: 'easeInOut'
                  }}
                />
              </MagneticButton>
            </Link>

            <Link
              to="/work"
              className="group inline-flex items-center gap-2 px-5 py-3 font-body text-porcelain/50 hover:text-porcelain transition-colors duration-300"
            >
              <span>Explore Our Work</span>
              <ArrowUpRight className="w-4 h-4 text-alchemy-red transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <motion.span 
          className="font-mono text-[10px] text-porcelain/25 uppercase tracking-[0.25em]"
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll
        </motion.span>
        <motion.div className="relative w-6 h-10 rounded-full border border-porcelain/15 flex justify-center">
          <motion.div 
            className="absolute top-2 w-1.5 h-3 rounded-full bg-gradient-to-b from-alchemy-red to-alchemy-red/50"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-porcelain/10 pointer-events-none" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-porcelain/10 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-porcelain/10 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-porcelain/10 pointer-events-none" />
    </section>
  );
};
