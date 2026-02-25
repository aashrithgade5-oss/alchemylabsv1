import { motion } from 'framer-motion';
import { memo, lazy, Suspense, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { BlueprintGrid, NoiseTexture } from '@/components/effects';
import { useIsMobile } from '@/hooks/use-mobile';
import aboutHeroVideo from '@/assets/about-hero-red-curves.mp4';

const LazyNeuralBackground = lazy(() =>
  import('@/components/NeuralBackground').then((m) => ({ default: m.NeuralBackground }))
);

const CINEMATIC_EASE = [0.22, 1, 0.36, 1] as const;

export const YinYangHero = memo(() => {
  const isMobile = useIsMobile();
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section className="relative h-[100svh] flex flex-col justify-end overflow-hidden">
      {/* Layer 1: Deep black base */}
      <div className="absolute inset-0 bg-black" />

      {/* Layer 2: Video background */}
      <motion.video
        src={aboutHeroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onCanPlay={() => setVideoReady(true)}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: videoReady ? (isMobile ? 0.25 : 0.22) : 0 }}
        transition={{ duration: 1.2, ease: CINEMATIC_EASE }}
      />

      {/* Layer 3: Premium vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      {/* Layer 4: Top/bottom fade gradients */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />

      {/* Layer 5: NeuralBackground particles (desktop only, lazy) */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <Suspense fallback={null}>
            <LazyNeuralBackground />
          </Suspense>
        </div>
      )}

      {/* Layer 6: Grain */}
      <BlueprintGrid opacity={0.015} />
      <NoiseTexture opacity={0.03} />

      {/* Main content — anchored to bottom */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pb-28 sm:pb-36">
        {/* Eyebrow */}
        <motion.div
          className="relative inline-block mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: CINEMATIC_EASE }}
        >
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-porcelain/40">
            About Alchemy Labs
          </span>
        </motion.div>

        {/* Main title — minimal, editorial */}
        <motion.h1
          className="tracking-tight mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: CINEMATIC_EASE }}
        >
          <span className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.92] text-porcelain block">
            Architects of
          </span>
          <span className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.92] italic text-alchemy-red block mt-1 sm:mt-2">
            inevitability
          </span>
        </motion.h1>

        {/* Subtitle — single refined line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7, ease: CINEMATIC_EASE }}
          className="font-body text-sm sm:text-base md:text-lg text-porcelain/40 max-w-lg leading-relaxed font-light"
        >
          Two founders. One vision. Building brands with discipline, structure, and AI-native execution.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-mono text-[10px] text-porcelain/25 tracking-[0.2em] uppercase">
          Scroll
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-4 h-4 text-alchemy-red/40" />
        </motion.div>
      </motion.div>
    </section>
  );
});

YinYangHero.displayName = 'YinYangHero';
