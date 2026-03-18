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

// Dramatic text reveal with clip-path
const ClipReveal = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: '120%', opacity: 0, rotateX: -60 }}
      animate={{ y: '0%', opacity: 1, rotateX: 0 }}
      transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: 'bottom center' }}
      className={className}
    >
      {children}
    </motion.div>
  </div>
);

export const YinYangHero = memo(() => {
  const isMobile = useIsMobile();
  const [videoReady, setVideoReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.5], [isMobile ? 0.2 : 0.18, 0.03]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.5]);

  return (
    <section ref={sectionRef} className="relative h-[100svh] flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 bg-black" />

      {/* Video with enhanced parallax */}
      <motion.div className="absolute inset-0" style={{ scale: isMobile ? 1 : videoScale, opacity: videoOpacity }}>
        <video
          src={aboutHeroVideo}
          autoPlay muted loop playsInline preload="metadata"
          onCanPlay={() => setVideoReady(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: videoReady ? 1 : 0, transition: 'opacity 1.2s' }}
        />
      </motion.div>

      {/* Premium vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.9) 100%)' }}
      />

      {/* Animated aurora */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              'conic-gradient(from 0deg at 50% 60%, rgba(220,38,38,0) 0deg, rgba(220,38,38,0.12) 80deg, rgba(220,38,38,0) 160deg, rgba(220,38,38,0.08) 240deg, rgba(220,38,38,0) 360deg)',
              'conic-gradient(from 120deg at 50% 60%, rgba(220,38,38,0) 0deg, rgba(220,38,38,0.08) 80deg, rgba(220,38,38,0) 160deg, rgba(220,38,38,0.12) 240deg, rgba(220,38,38,0) 360deg)',
              'conic-gradient(from 240deg at 50% 60%, rgba(220,38,38,0) 0deg, rgba(220,38,38,0.12) 80deg, rgba(220,38,38,0) 160deg, rgba(220,38,38,0.08) 240deg, rgba(220,38,38,0) 360deg)',
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          style={{ filter: 'blur(60px)' }}
        />
      )}

      {/* Top/bottom gradients */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/90 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Scroll fade */}
      <motion.div className="absolute inset-0 bg-black pointer-events-none" style={{ opacity: overlayOpacity }} />

      {/* Particles */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Suspense fallback={null}><LazyNeuralBackground /></Suspense>
        </div>
      )}

      <BlueprintGrid opacity={0.015} />
      <NoiseTexture opacity={0.025} />

      {/* Main content — dramatic cinematic reveal */}
      <motion.div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-24 sm:pb-32" style={{ y: isMobile ? 0 : textY }}>
        {/* Eyebrow */}
        <motion.div
          className="relative inline-block mb-6"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.3, ease: CINEMATIC_EASE }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(220,38,38,0.1)',
              border: '1px solid rgba(220,38,38,0.3)',
              boxShadow: '0 0 25px rgba(220,38,38,0.1)',
            }}
          >
            <motion.span
              className="w-2 h-2 bg-alchemy-red rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ boxShadow: '0 0 10px rgba(220,38,38,0.8)' }}
            />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-porcelain/80">
              Meet Our Founders
            </span>
          </span>
        </motion.div>

        {/* Title — staggered 3D reveal */}
        <div className="mb-5">
          <ClipReveal delay={0.4}>
            <span className="font-body text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-porcelain/80 block mb-1">
              Architects of
            </span>
          </ClipReveal>
          <ClipReveal delay={0.55}>
            <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic bg-gradient-to-r from-alchemy-red via-red-400 to-alchemy-red bg-clip-text text-transparent block"
              style={{ filter: 'drop-shadow(0 0 30px rgba(220,38,38,0.4))' }}
            >
              meaning, systems,
            </span>
          </ClipReveal>
          <ClipReveal delay={0.7}>
            <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-porcelain block">
              and inevitability
            </span>
          </ClipReveal>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.9, ease: CINEMATIC_EASE }}
          className="font-body text-base sm:text-lg md:text-xl text-porcelain/45 max-w-2xl leading-relaxed"
        >
          Two founders. One vision. Building brands with discipline, structure, and AI-native execution.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-mono text-[9px] text-porcelain/20 tracking-[0.25em] uppercase">Scroll</span>
        <div className="relative w-px h-10">
          <div className="absolute inset-0 bg-gradient-to-b from-porcelain/[0.12] to-transparent" />
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-alchemy-red"
            animate={{ y: [0, 32, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 8px rgba(220,38,38,0.8)' }}
          />
        </div>
      </motion.div>
    </section>
  );
});

YinYangHero.displayName = 'YinYangHero';
