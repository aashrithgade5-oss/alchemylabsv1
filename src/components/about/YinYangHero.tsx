import { motion } from 'framer-motion';
import { memo } from 'react';
import { ChevronDown } from 'lucide-react';
import { ParticleBackground } from './ParticleBackground';
import { FounderCircles } from './FounderCircles';

export const YinYangHero = memo(() => {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Unique particle background */}
      <ParticleBackground />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title section */}
        <motion.div
          className="text-center mb-10 sm:mb-14 md:mb-18"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <motion.span
            className="font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase text-alchemy-red/70 block mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Meet Our Founders
          </motion.span>

          {/* Main title — editorial serif/sans split */}
          <h1 className="tracking-tight mb-4">
            <span className="font-body text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-porcelain/80 block mb-1">
              Architects of
            </span>
            <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-alchemy-red block">
              meaning, systems,
            </span>
            <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-porcelain block">
              and inevitability
            </span>
          </h1>
        </motion.div>

        {/* Founder Circles */}
        <FounderCircles />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-mono text-[10px] text-porcelain/30 tracking-[0.2em] uppercase">
          Scroll
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5 text-alchemy-red/50" />
        </motion.div>
      </motion.div>
    </section>
  );
});

YinYangHero.displayName = 'YinYangHero';
