import { memo, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HyperLiquidGlassProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: 'default' | 'hover-glow' | 'static';
  className?: string;
}

export const HyperLiquidGlass = memo(({
  children,
  variant = 'default',
  className,
  ...motionProps
}: HyperLiquidGlassProps) => {
  const isAnimated = variant !== 'static';

  return (
    <motion.div
      className={cn('relative rounded-2xl overflow-hidden', className)}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.12)',
      }}
      whileHover={variant === 'hover-glow' ? {
        borderColor: 'rgba(220,38,38,0.4)',
        boxShadow: '0 0 40px rgba(220,38,38,0.15), inset 0 0 40px rgba(220,38,38,0.03)',
      } : undefined}
      transition={{ duration: 0.3 }}
      {...motionProps}
    >
      {/* Animated edge glow */}
      {isAnimated && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            border: '1px solid transparent',
          }}
          animate={{
            boxShadow: [
              'inset 0 0 20px rgba(220,38,38,0), 0 0 15px rgba(220,38,38,0)',
              'inset 0 0 20px rgba(220,38,38,0.05), 0 0 15px rgba(220,38,38,0.08)',
              'inset 0 0 20px rgba(220,38,38,0), 0 0 15px rgba(220,38,38,0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      {children}
    </motion.div>
  );
});

HyperLiquidGlass.displayName = 'HyperLiquidGlass';
