import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import heroVideo from '@/assets/hero-video.mp4';
import { MagneticButton } from './MagneticButton';
import { useRef } from 'react';

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const blur = useTransform(scrollYProgress, [0, 0.4], [0, 10]);

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background with enhanced parallax */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-110"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Layered gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-alchemy-black via-alchemy-black/80 to-alchemy-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black via-transparent to-alchemy-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-alchemy-black" />
        <div className="absolute inset-0 hero-gradient" />
      </motion.div>

      {/* Content with blur-on-scroll effect */}
      <motion.div
        style={{ 
          opacity, 
          scale,
          filter: blur.get() > 0 ? `blur(${blur.get()}px)` : 'none',
        }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-40 w-full will-change-transform"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline with staggered reveal */}
          <motion.div
            initial={{ opacity: 0, y: 60, filter: 'blur(20px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-display tracking-display">
              <motion.span
                className="italic text-alchemy-red inline-block"
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                Alchemy
              </motion.span>
              <motion.span
                className="text-porcelain/90 inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {' '}in{' '}
              </motion.span>
              <motion.span
                className="italic text-alchemy-red inline-block"
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                Motion
              </motion.span>
              <motion.span
                className="text-porcelain/30 inline-block"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.1, type: 'spring' }}
              >
                .
              </motion.span>
            </h1>
          </motion.div>

          {/* Sub Headline with gradient reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-display tracking-tight text-porcelain/70">
              <span className="italic text-alchemy-red">AI</span>
              <span className="text-porcelain/60">-Augmented </span>
              <span className="italic text-alchemy-red">Branding</span>
            </h2>
          </motion.div>

          {/* Description with word emphasis */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-base md:text-lg lg:text-xl text-porcelain/50 leading-relaxed max-w-2xl mx-auto mb-16 font-light"
          >
            We architect{' '}
            <span className="font-display italic text-porcelain/80">brand systems</span>{' '}
            for the intelligence era—where{' '}
            <span className="font-display italic text-porcelain/80">strategy</span>,{' '}
            <span className="font-display italic text-porcelain/80">identity</span>, and{' '}
            <span className="font-display italic text-porcelain/80">culture</span>{' '}
            scale through precision.
          </motion.p>

          {/* CTAs with stagger */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <MagneticButton
              href="#contact"
              className="glass-cta-primary group relative overflow-hidden"
            >
              <span className="font-body font-medium">Book a Strategy Sprint</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>

            <motion.a
              href="#work"
              className="group inline-flex items-center gap-2 px-6 py-4 font-body text-porcelain/50 hover:text-porcelain transition-all duration-500"
              whileHover={{ x: 4 }}
            >
              <span>Explore Our Work</span>
              <ArrowUpRight className="w-4 h-4 text-alchemy-red transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[10px] text-porcelain/30 uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-12 rounded-full border border-porcelain/20 flex justify-center pt-2"
        >
          <motion.div 
            className="w-1 h-3 rounded-full bg-alchemy-red"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
