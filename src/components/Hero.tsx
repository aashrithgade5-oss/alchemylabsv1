import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import heroVideo from '@/assets/hero-video.mp4';
import { MagneticButton } from './MagneticButton';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-alchemy-black via-alchemy-black/70 to-alchemy-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black via-transparent to-alchemy-black/60" />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-40 w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-display tracking-display">
              <span className="italic text-alchemy-red">Alchemy</span>
              <span className="text-porcelain/90"> in </span>
              <span className="italic text-alchemy-red">Motion</span>
              <span className="text-porcelain/40">.</span>
            </h1>
          </motion.div>

          {/* Sub Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-display tracking-tight text-porcelain/70">
              <span className="italic text-alchemy-red">AI</span>
              <span className="text-porcelain/70">-Augmented </span>
              <span className="italic text-alchemy-red">Branding</span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-base md:text-lg text-porcelain/50 leading-relaxed max-w-2xl mx-auto mb-14 font-light"
          >
            We architect{' '}
            <span className="font-display italic text-porcelain/80">brand systems</span>{' '}
            for the intelligence era—where{' '}
            <span className="font-display italic text-porcelain/80">strategy</span>,{' '}
            <span className="font-display italic text-porcelain/80">identity</span>, and{' '}
            <span className="font-display italic text-porcelain/80">culture</span>{' '}
            scale through precision.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <MagneticButton
              href="#contact"
              className="glass-cta-primary group relative overflow-hidden"
            >
              <span className="font-body">Book a Strategy Sprint</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>

            <a
              href="#work"
              className="group inline-flex items-center gap-2 px-6 py-4 font-body text-porcelain/50 hover:text-porcelain transition-colors duration-300"
            >
              <span>Explore Our Work</span>
              <ArrowUpRight className="w-4 h-4 text-alchemy-red transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border border-porcelain/20 flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-alchemy-red" />
        </motion.div>
      </motion.div>
    </section>
  );
};
