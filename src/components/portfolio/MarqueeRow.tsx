import { memo, useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn, getIsMobile } from '@/lib/utils';

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
  const [isMobile, setIsMobile] = useState(true);
  const duration = speedDurations[speed];
  const animateX = direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'];

  useEffect(() => {
    setIsMobile(getIsMobile());
  }, []);

  // Mobile: native horizontal scroll instead of infinite animation
  if (isMobile) {
    return (
      <div
        className={cn('overflow-x-auto scroll-smooth-native snap-x snap-mandatory', className)}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex" style={{ gap }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn('overflow-hidden', className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <motion.div
        className="flex will-change-transform"
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
