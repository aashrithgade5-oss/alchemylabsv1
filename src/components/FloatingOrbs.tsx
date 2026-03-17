import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

interface FloatingOrbsProps {
  count?: number;
  className?: string;
}

/** Lightweight CSS-only floating glass orbs for depth behind the Hero */
export const FloatingOrbs = memo(({ count = 5, className = '' }: FloatingOrbsProps) => {
  const orbs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const size = 60 + Math.random() * 120;
      const x = 10 + Math.random() * 80;
      const y = 10 + Math.random() * 80;
      const duration = 12 + Math.random() * 18;
      const delay = Math.random() * -duration;
      const driftY = 30 + Math.random() * 60;
      const isRed = i < 2;

      return { size, x, y, duration, delay, driftY, isRed, id: i };
    });
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: orb.isRed
              ? 'radial-gradient(circle at 30% 30%, rgba(220,38,38,0.12), rgba(220,38,38,0.03) 60%, transparent 80%)'
              : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.06), rgba(255,255,255,0.015) 60%, transparent 80%)',
            border: `1px solid ${orb.isRed ? 'rgba(220,38,38,0.08)' : 'rgba(255,255,255,0.04)'}`,
            backdropFilter: 'blur(1px)',
            filter: 'blur(8px)',
          }}
          animate={{
            y: [-orb.driftY, orb.driftY, -orb.driftY],
            x: [-orb.driftY * 0.3, orb.driftY * 0.3, -orb.driftY * 0.3],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
});

FloatingOrbs.displayName = 'FloatingOrbs';