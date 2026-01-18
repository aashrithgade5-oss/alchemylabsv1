import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import heroVideo from '@/assets/hero-video.mp4';

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
        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-alchemy-black via-alchemy-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black via-transparent to-alchemy-black/50" />
        <div className="absolute inset-0 hero-gradient opacity-60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-40 w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline - Symmetric centered layout */}
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-display tracking-display"
            >
              <span className="font-display italic text-alchemy-red">Alchemy</span>
              {' '}in{' '}
              <span className="font-display italic text-alchemy-red">Motion</span>
              <span className="text-porcelain/80">.</span>
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.9,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-display tracking-display text-porcelain/90"
            >
              <span className="font-display italic text-alchemy-red">AI</span>-Augmented{' '}
              <span className="font-display italic text-alchemy-red">Branding</span>
            </motion.h2>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl lg:text-2xl text-porcelain/70 leading-relaxed max-w-2xl mx-auto mb-12"
          >
            We architect{' '}
            <span className="font-display italic text-porcelain">brand systems</span>{' '}
            for the intelligence era—where{' '}
            <span className="font-display italic text-porcelain">strategy</span>,{' '}
            <span className="font-display italic text-porcelain">identity</span>, and{' '}
            <span className="font-display italic text-porcelain">culture</span>{' '}
            scale through precision.
          </motion.p>

          {/* CTAs - Symmetric centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass-cta-primary group"
            >
              <span className="font-display italic">Book</span>
              <span>a Strategy Sprint</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.a>

            <a
              href="#work"
              className="group inline-flex items-center gap-2 px-6 py-4 text-porcelain/70 hover:text-porcelain transition-colors duration-300"
            >
              <span>Explore Our</span>
              <span className="font-display italic text-porcelain">Work</span>
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
          className="w-6 h-10 rounded-full border border-porcelain/30 flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-alchemy-red" />
        </motion.div>
      </motion.div>
    </section>
  );
};
