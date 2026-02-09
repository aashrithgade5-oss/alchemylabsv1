import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ParticleFieldProps {
  count?: number;
  color?: string;
  opacity?: number;
  speed?: number;
  className?: string;
}

const Particle = memo(({ color, opacity, speed, index }: {
  color: string; opacity: number; speed: number; index: number;
}) => {
  const style = useMemo(() => {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = 4 + Math.random() * 12;
    const dur = (8 + Math.random() * 12) / speed;
    const delay = Math.random() * dur;
    const range = 20 + Math.random() * 40;
    return { x, y, size, dur, delay, range };
  }, [speed, index]);

  return (
    <motion.div
      className="absolute rounded-full will-change-transform"
      style={{
        left: `${style.x}%`,
        top: `${style.y}%`,
        width: style.size,
        height: style.size,
        background: color,
        opacity,
        filter: 'blur(20px)',
      }}
      animate={{ y: [-style.range, style.range, -style.range] }}
      transition={{
        duration: style.dur,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: style.delay,
      }}
    />
  );
});

Particle.displayName = 'Particle';

export const ParticleField = memo(({
  count = 30,
  color = 'rgba(220, 38, 38, 0.3)',
  opacity = 0.4,
  speed = 1,
  className,
}: ParticleFieldProps) => {
  const isMobile = useIsMobile();
  const prefersReduced = useMemo(() =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  []);

  const particleCount = prefersReduced ? 0 : (isMobile ? Math.min(count, 15) : count);
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
