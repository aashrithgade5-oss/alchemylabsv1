import { memo, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePerformance } from '@/contexts/PerformanceContext';

interface ParticleFieldProps {
  count?: number;
  color?: string;
  opacity?: number;
  speed?: number;
  className?: string;
}

// Patches-7: deterministic (no SSR/CSR mismatch), CSS-animated, no blur
// filter: a radial gradient gives the same soft dot. Was up to 47 framer
// JS loops, each a blurred layer, running for the life of the page.
const rand = (n: number) => {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const Particle = memo(({ color, opacity, speed, index }: {
  color: string; opacity: number; speed: number; index: number;
}) => {
  const size = 24 + rand(index + 3) * 36;
  const dur = (8 + rand(index + 4) * 12) / speed;
  return (
    <div
      className="particle-drift absolute rounded-full"
      style={{
        left: `${rand(index + 1) * 100}%`,
        top: `${rand(index + 2) * 100}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
        opacity,
        animationDuration: `${dur}s`,
        animationDelay: `${-rand(index + 5) * dur}s`,
        ['--range' as string]: `${20 + rand(index + 6) * 40}px`,
      }}
    />
  );
});

Particle.displayName = 'Particle';

export const ParticleField = memo(({
  count = 30,
  color = 'rgba(255,77,28, 0.3)',
  opacity = 0.4,
  speed = 1,
  className,
}: ParticleFieldProps) => {
  const isMobile = useIsMobile();
  const { shouldUseParticles, particleFactor } = usePerformance();
  const prefersReduced = useMemo(() =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  []);

  const particleCount = prefersReduced || !shouldUseParticles ? 0 : Math.round((isMobile ? Math.min(count, 15) : count) * particleFactor);
  const particles = useMemo(() => Array.from({ length: particleCount }, (_, i) => i), [particleCount]);

  if (prefersReduced) return null;

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {particles.map(i => (
        <Particle key={i} index={i} color={color} opacity={opacity} speed={speed} />
      ))}
    </div>
  );
});

ParticleField.displayName = 'ParticleField';
