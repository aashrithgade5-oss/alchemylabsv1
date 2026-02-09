import { motion } from 'framer-motion';
import { memo } from 'react';
import { ChevronDown } from 'lucide-react';
import { ParticleBackground } from './ParticleBackground';
import { FounderCircles } from './FounderCircles';
import { BlueprintGrid, NoiseTexture } from '@/components/effects';
import { SequentianBackground } from '@/components/SequentianBackground';

export const YinYangHero = memo(() => {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Sequentian Silk Fold background */}
      <SequentianBackground variant={1} opacity={0.55} parallax scaleEnd={1.2} blur={2} />

      {/* Layered background */}
      <div className="absolute inset-0">
        <ParticleBackground />
        <BlueprintGrid opacity={0.03} />
        <NoiseTexture opacity={0.04} />
      </div>

      {/* Animated gradient mesh */}
      <motion.div
        className="absolute inset-0 opacity-25 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(220,38,38,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(220,38,38,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(220,38,38,0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title section */}
        <motion.div
          className="text-center mb-10 sm:mb-14 md:mb-18"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow with hand-drawn underline */}
          <motion.div
            className="relative inline-block mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-alchemy-red/70">
              Meet Our Founders
            </span>
            <svg
              className="absolute -bottom-2 left-0 w-full h-1"
              viewBox="0 0 200 4"
              preserveAspectRatio="none"
            >
              <path
                d="M 0 2 Q 50 0, 100 2 T 200 2"
                stroke="hsl(var(--alchemy-red))"
                strokeWidth="1"
                fill="none"
                opacity="0.4"
              />
            </svg>
          </motion.div>

          {/* Main title — editorial serif/sans split */}
          <h1 className="tracking-tight mb-5">
            <span className="font-body text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-porcelain/80 block mb-1">
              Architects of
            </span>
            <span className="block">
              <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic bg-gradient-to-r from-alchemy-red via-alchemy-pink to-alchemy-red bg-clip-text text-transparent">
                meaning, systems,
              </span>
            </span>
            <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-porcelain block">
              and inevitability
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-body text-base sm:text-lg md:text-xl text-porcelain/50 max-w-2xl mx-auto leading-relaxed"
          >
            Two founders. One vision. Building brands with discipline, structure, and AI-native execution.
          </motion.p>
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
