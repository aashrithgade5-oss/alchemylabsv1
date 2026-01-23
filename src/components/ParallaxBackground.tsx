import { memo, useMemo } from 'react';

/**
 * Simplified static background - no scroll listeners, pure CSS
 * This removes the heavy useScroll + useTransform overhead
 */
export const ParallaxBackground = memo(() => {
  // Static gradients - GPU accelerated via will-change: auto
  const gradients = useMemo(() => ({
    primary: 'radial-gradient(ellipse at 30% 20%, rgba(225, 6, 19, 0.06) 0%, transparent 50%)',
    secondary: 'radial-gradient(ellipse at 70% 80%, rgba(225, 6, 19, 0.04) 0%, transparent 50%)',
  }), []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* Single static gradient layer */}
      <div 
        className="absolute inset-0 opacity-70"
        style={{
          background: `${gradients.primary}, ${gradients.secondary}`,
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.006]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
});

ParallaxBackground.displayName = 'ParallaxBackground';

// Keep for backwards compatibility but simplified
export const ParallaxLayer = memo(({ children, className = '' }: { 
  children: React.ReactNode; 
  speed?: number; 
  className?: string;
}) => {
  return <div className={className}>{children}</div>;
});

ParallaxLayer.displayName = 'ParallaxLayer';
