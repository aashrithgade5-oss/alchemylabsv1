import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroVideo from '@/assets/hero-video.mp4';
import { MagneticButton } from './MagneticButton';
import { useRef } from 'react';

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          className="w-full h-full object-cover scale-105"
          style={{ 
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-alchemy-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black via-transparent to-alchemy-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-alchemy-black" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        ref={contentRef}
        style={{ opacity, scale }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        <div className="flex flex-col items-center text-center">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 sm:mb-10"
          >
            <span className="inline-block px-4 py-2 rounded-full border border-porcelain/10 bg-porcelain/5 backdrop-blur-sm">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-porcelain/60">
                AI-Powered Creative Studio
              </span>
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] leading-[1.1] tracking-[-0.02em] mb-6 sm:mb-8"
          >
            <span className="text-porcelain">Alchemy</span>
            <span className="text-porcelain/40 mx-2 sm:mx-3 font-light">in</span>
            <span className="italic text-alchemy-red">Motion</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.2] tracking-[-0.01em] mb-8 sm:mb-10"
          >
            <span className="italic text-alchemy-red">AI</span>
            <span className="text-porcelain/50">-Augmented </span>
            <span className="italic text-alchemy-red">Branding</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="font-body text-base sm:text-lg md:text-xl text-porcelain/45 leading-relaxed max-w-xl mx-auto mb-12 sm:mb-14 font-light"
          >
            We architect <span className="text-porcelain/70">brand systems</span> for the 
            intelligence era—where <span className="text-porcelain/70">strategy</span>, <span className="text-porcelain/70">identity</span>, 
            and <span className="text-porcelain/70">culture</span> scale through precision.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link to="/book-sprint">
              <MagneticButton className="glass-cta-primary group">
                <span className="font-body font-medium">Book a Strategy Sprint</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
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
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[10px] text-porcelain/25 uppercase tracking-[0.25em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-9 rounded-full border border-porcelain/15 flex justify-center pt-2"
        >
          <motion.div 
            className="w-1 h-2 rounded-full bg-alchemy-red/80"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
