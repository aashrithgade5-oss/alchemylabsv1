import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroVideo from '@/assets/hero-video.mp4';
import { MagneticButton } from './MagneticButton';
import { useRef } from 'react';

// Word-by-word animation variants
const wordVariants = {
  hidden: { 
    opacity: 0, 
    y: 40, 
    filter: 'blur(12px)',
    rotateX: 45,
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    rotateX: 0,
  },
};

const charVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.8,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
  },
};

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const isHeadlineInView = useInView(headlineRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const blur = useTransform(scrollYProgress, [0, 0.4], [0, 10]);

  // Blend mode shifts
  const blendProgress = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background with enhanced parallax */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          className="w-full h-full object-cover scale-110"
          style={{ 
            // Ensure video plays on mobile
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Layered gradient overlays for depth - adjusted for mobile visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-alchemy-black via-alchemy-black/70 to-alchemy-black/20 md:from-alchemy-black md:via-alchemy-black/80 md:to-alchemy-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black via-transparent to-alchemy-black/40 md:to-alchemy-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-alchemy-black" />
        <div className="absolute inset-0 hero-gradient" />
        
        {/* Dynamic mesh gradient overlay - responsive sizes */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: blendProgress }}
        >
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-radial from-alchemy-red/10 to-transparent rounded-full blur-[80px] md:blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/3 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-gradient-radial from-deep-crimson/8 to-transparent rounded-full blur-[60px] md:blur-[120px]" />
        </motion.div>
      </motion.div>

      {/* Content with blur-on-scroll effect */}
      <motion.div
        style={{ 
          opacity, 
          scale,
          filter: blur.get() > 0 ? `blur(${blur.get()}px)` : 'none',
        }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-24 sm:py-32 md:py-40 w-full will-change-transform"
      >
        <div className="max-w-4xl mx-auto text-center" ref={headlineRef}>
          {/* Main Headline with character-by-character reveal */}
          <div className="mb-6 sm:mb-8 perspective-1000">
            <h1 className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-display tracking-display">
              {/* "Alchemy" - with blend mode effect */}
              <motion.span
                className="italic text-alchemy-red inline-block relative"
                initial="hidden"
                animate={isHeadlineInView ? 'visible' : 'hidden'}
                variants={wordVariants}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="relative z-10">Alchemy</span>
                {/* Blend overlay glow */}
                <motion.span 
                  className="absolute inset-0 text-alchemy-red blur-[2px] opacity-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0.3] }}
                  transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                >
                  Alchemy
                </motion.span>
              </motion.span>
              
              <motion.span
                className="text-porcelain/90 inline-block mx-2"
                initial={{ opacity: 0 }}
                animate={isHeadlineInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                in
              </motion.span>
              
              {/* "Motion" - with split character animation */}
              <motion.span
                className="italic text-alchemy-red inline-block relative"
                initial="hidden"
                animate={isHeadlineInView ? 'visible' : 'hidden'}
                variants={wordVariants}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="relative z-10">Motion</span>
                {/* Blend overlay glow */}
                <motion.span 
                  className="absolute inset-0 text-alchemy-red blur-[3px] opacity-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.4, 0.2] }}
                  transition={{ duration: 2.5, delay: 2, repeat: Infinity, repeatType: 'reverse' }}
                >
                  Motion
                </motion.span>
              </motion.span>
              
              <motion.span
                className="text-porcelain/30 inline-block"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={isHeadlineInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2, type: 'spring', stiffness: 200 }}
              >
                .
              </motion.span>
            </h1>
          </div>

          {/* Sub Headline with word reveal */}
          <motion.div
            className="mb-8 sm:mb-12 overflow-hidden"
          >
            <h2 className="font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-display tracking-tight">
              <motion.span
                className="italic text-alchemy-red inline-block"
                initial={{ opacity: 0, y: 30, rotateX: 45 }}
                animate={isHeadlineInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              >
                AI
              </motion.span>
              <motion.span
                className="text-porcelain/60 inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeadlineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                -Augmented{' '}
              </motion.span>
              <motion.span
                className="italic text-alchemy-red inline-block"
                initial={{ opacity: 0, y: 30, rotateX: 45 }}
                animate={isHeadlineInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
              >
                Branding
              </motion.span>
            </h2>
          </motion.div>

          {/* Description with word-by-word emphasis */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadlineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-sm sm:text-base md:text-lg lg:text-xl text-porcelain/50 leading-relaxed max-w-2xl mx-auto mb-10 sm:mb-16 font-light px-2"
          >
            We architect{' '}
            <motion.span 
              className="font-display italic text-porcelain/80 inline-block"
              initial={{ opacity: 0, y: 10 }}
              animate={isHeadlineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.7 }}
            >
              brand systems
            </motion.span>{' '}
            for the intelligence era—where{' '}
            <motion.span 
              className="font-display italic text-porcelain/80 inline-block"
              initial={{ opacity: 0, y: 10 }}
              animate={isHeadlineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.9 }}
            >
              strategy
            </motion.span>,{' '}
            <motion.span 
              className="font-display italic text-porcelain/80 inline-block"
              initial={{ opacity: 0, y: 10 }}
              animate={isHeadlineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 2.1 }}
            >
              identity
            </motion.span>, and{' '}
            <motion.span 
              className="font-display italic text-porcelain/80 inline-block"
              initial={{ opacity: 0, y: 10 }}
              animate={isHeadlineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 2.3 }}
            >
              culture
            </motion.span>{' '}
            scale through precision.
          </motion.p>

          {/* CTAs with stagger */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeadlineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link to="/book-sprint">
              <MagneticButton
                className="glass-cta-primary group relative overflow-hidden"
              >
                <span className="font-body font-medium">Book a Strategy Sprint</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticButton>
            </Link>

            <Link
              to="/work"
              className="group inline-flex items-center gap-2 px-6 py-4 font-body text-porcelain/50 hover:text-porcelain transition-all duration-500 no-glow"
            >
              <span>Explore Our Work</span>
              <ArrowUpRight className="w-4 h-4 text-alchemy-red transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced scroll indicator - hidden on very small screens */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-3"
      >
        <span className="font-mono text-[9px] sm:text-[10px] text-porcelain/30 uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-10 sm:w-6 sm:h-12 rounded-full border border-porcelain/20 flex justify-center pt-2"
        >
          <motion.div 
            className="w-1 h-2.5 sm:h-3 rounded-full bg-alchemy-red"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};