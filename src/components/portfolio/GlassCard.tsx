import { memo, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'subtle' | 'red';
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const variantStyles = {
  default: {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  elevated: {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  },
  subtle: {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 100%)',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  red: {
    background: 'linear-gradient(135deg, rgba(220,38,38,0.08) 0%, rgba(255,255,255,0.02) 100%)',
    border: '1px solid rgba(220,38,38,0.15)',
  },
};

const paddingClasses = {
  sm: 'p-4 sm:p-5',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
};

export const GlassCard = memo(({
  children,
  className,
  variant = 'default',
  hover = true,
  padding = 'md',
  ...motionProps
}: GlassCardProps) => {
  return (
    <motion.div
      className={cn(
        'rounded-2xl backdrop-blur-sm',
        paddingClasses[padding],
        className
      )}
      style={variantStyles[variant]}
      whileHover={hover ? {
        borderColor: 'rgba(220,38,38,0.3)',
        y: -4,
        boxShadow: '0 12px 40px rgba(220,38,38,0.1)',
      } : undefined}
      transition={{ duration: 0.3 }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
});

GlassCard.displayName = 'GlassCard';
