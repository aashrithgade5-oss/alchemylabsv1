import { memo } from 'react';

/**
 * Simplified FluidBackground - removed mouse tracking for performance
 * Use CSS transitions instead of Framer Motion for smoother GPU rendering
 */

interface FluidBackgroundProps {
  variant?: 'hero' | 'page' | 'subtle';
  className?: string;
}

export const FluidBackground = memo(({ variant = 'page', className = '' }: FluidBackgroundProps) => {
  if (variant === 'hero') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {/* Primary static blob */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full blur-[200px]"
          style={{
            background: 'radial-gradient(circle, rgba(225, 6, 19, 0.12) 0%, transparent 70%)',
            left: '50%',
            top: '40%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        {/* Secondary static blob */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[180px]"
          style={{
            background: 'radial-gradient(circle, rgba(80, 4, 10, 0.15) 0%, transparent 70%)',
            left: '30%',
            top: '60%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Static grain */}
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    );
  }

  if (variant === 'subtle') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[150px] opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(225, 6, 19, 0.06) 0%, transparent 70%)',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Static gradient mesh */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full blur-[180px]"
        style={{
          background: 'radial-gradient(circle, rgba(225, 6, 19, 0.08) 0%, transparent 70%)',
          left: '50%',
          top: '40%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[150px]"
        style={{
          background: 'radial-gradient(circle, rgba(80, 4, 10, 0.1) 0%, transparent 70%)',
          left: '30%',
          top: '60%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-alchemy-red/5 to-transparent rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-deep-crimson/5 to-transparent rounded-full blur-[120px]" />
    </div>
  );
});

FluidBackground.displayName = 'FluidBackground';
