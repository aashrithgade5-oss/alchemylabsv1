import { motion } from 'framer-motion';
import { memo, useMemo } from 'react';
import { getIsMobile, prefersReducedMotion } from '@/lib/utils';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

export const ParticleBackground = memo(() => {
  const isMobile = getIsMobile();
  const reducedMotion = prefersReducedMotion();
  const particleCount = isMobile ? 12 : 28;

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: isMobile ? Math.random() * 30 + 20 : Math.random() * 50 + 30,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
      opacity: Math.random() * 0.15 + 0.05,
    }));
  }, [particleCount, isMobile]);

  const blurBase = isMobile ? 40 : 80;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 30% 40%, rgba(220,38,38,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 70% 60%, rgba(220,38,38,0.08) 0%, transparent 50%),
            radial-gradient(ellipse 100% 80% at 50% 50%, rgba(10,10,10,0.95) 0%, hsl(var(--alchemy-black)) 100%)
          `,
        }}
      />

      {/* Animated glow orbs */}
      {!reducedMotion && (
        <>
          <motion.div
            className="absolute rounded-full"
            style={{
              width: isMobile ? 300 : 500,
              height: isMobile ? 300 : 500,
              left: '20%',
              top: '25%',
              background: 'radial-gradient(circle, rgba(220,38,38,0.2) 0%, transparent 70%)',
              filter: `blur(${blurBase}px)`,
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: isMobile ? 250 : 400,
              height: isMobile ? 250 : 400,
              right: '15%',
              bottom: '20%',
              background: 'radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%)',
              filter: `blur(${blurBase}px)`,
            }}
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </>
      )}

      {/* Floating particles */}
      {!reducedMotion &&
        particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle, rgba(220,38,38,${p.opacity}) 0%, transparent 70%)`,
              filter: `blur(${p.size * 0.6}px)`,
              willChange: 'transform',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 10, 0],
              opacity: [p.opacity, p.opacity * 1.8, p.opacity],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
});

ParticleBackground.displayName = 'ParticleBackground';
