import { motion, useScroll, useTransform } from 'framer-motion';
import { memo, lazy, Suspense, useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { BlueprintGrid, NoiseTexture } from '@/components/effects';
import { useIsMobile } from '@/hooks/use-mobile';
import aboutHeroVideo from '@/assets/about-hero-video.mp4';

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
        animate={{ opacity: videoReady ? (isMobile ? 0.18 : 0.15) : 0 }}
        transition={{ duration: 1.2, ease: CINEMATIC_EASE }}
      />

      {/* Layer 3: Premium vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      {/* Layer 4: Top/bottom fade gradients */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />

      {/* Layer 5: Red energy glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(220,38,38,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Layer 6: Secondary accent glows (desktop only) */}
      {!isMobile && (
        <>
          <div
            className="absolute pointer-events-none"
            style={{
              width: '40%', height: '50%', top: '10%', left: '-5%',
              background: 'radial-gradient(ellipse at center, rgba(220,38,38,0.04) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              width: '35%', height: '45%', bottom: '5%', right: '-5%',
              background: 'radial-gradient(ellipse at center, rgba(220,38,38,0.05) 0%, transparent 70%)',
            }}
          />
        </>
      )}

      {/* Layer 7: Technical grid (desktop only) */}
      {!isMobile && <BlueprintGrid opacity={0.012} />}

      {/* Layer 8: NeuralBackground particles (desktop only, lazy) */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <Suspense fallback={null}>
            <LazyNeuralBackground />
          </Suspense>
        </div>
      )}

      {/* Layer 9: Grain */}
      <BlueprintGrid opacity={0.02} />
      <NoiseTexture opacity={0.03} />

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

      {/* Main content — anchored to bottom third */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-24 sm:pb-32">
        {/* Eyebrow */}
        <motion.div
          className="relative inline-block mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: CINEMATIC_EASE }}
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

        {/* Main title */}
        <motion.h1
          className="tracking-tight mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: CINEMATIC_EASE }}
        >
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
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: CINEMATIC_EASE }}
          className="font-body text-base sm:text-lg md:text-xl text-porcelain/50 max-w-2xl leading-relaxed"
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
