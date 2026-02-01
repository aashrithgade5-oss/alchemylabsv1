import { memo, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MarqueeRowProps {
  children: ReactNode[];
  direction?: 'left' | 'right';
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
  pauseOnHover?: boolean;
  gap?: number;
}

const speedDurations = {
  slow: 60,
  medium: 40,
  fast: 25,
};

export const MarqueeRow = memo(({
  children,
  direction = 'left',
  speed = 'medium',
  className,
  pauseOnHover = true,
  gap = 24,
}: MarqueeRowProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const duration = speedDurations[speed];
  const animateX = direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'];

  return (
    <div
      className={cn('overflow-hidden', className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <motion.div
        className="flex"
        style={{ gap }}
        animate={{ x: animateX }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration,
            ease: 'linear',
          },
        }}
        {...(isPaused && { animate: { x: animateX[0] } })}
      >
        {/* Double the items for seamless loop */}
        {children}
        {children}
      </motion.div>
    </div>
  );
});

MarqueeRow.displayName = 'MarqueeRow';
