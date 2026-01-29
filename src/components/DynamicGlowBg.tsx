import { memo } from 'react';
import glowBg1 from '@/assets/glow-bg-1.png';
import glowBg2 from '@/assets/glow-bg-2.png';
import glowBg3 from '@/assets/glow-bg-3.png';

type GlowVariant = 'waves' | 'ascii' | 'liquid' | 'random';
type GlowPosition = 'left' | 'right' | 'center' | 'full';

interface DynamicGlowBgProps {
  variant?: GlowVariant;
  position?: GlowPosition;
  opacity?: number;
  className?: string;
}

const glowImages = {
  waves: glowBg1,
  ascii: glowBg2,
  liquid: glowBg3,
};

/**
 * Dynamic glow background component using uploaded images
 * Styled like the footer with blur, gradient, and opacity effects
 */
export const DynamicGlowBg = memo(({ 
  variant = 'liquid', 
  position = 'center',
  opacity = 0.4,
  className = '' 
}: DynamicGlowBgProps) => {
  const imageSrc = variant === 'random' 
    ? [glowBg1, glowBg2, glowBg3][Math.floor(Math.random() * 3)]
    : glowImages[variant];

  const positionClasses = {
    left: 'left-0 -translate-x-1/4',
    right: 'right-0 translate-x-1/4',
    center: 'left-1/2 -translate-x-1/2',
    full: 'left-0 right-0',
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Image layer with blur and opacity - GPU optimized */}
      <div 
        className={`absolute top-1/2 -translate-y-1/2 ${position === 'full' ? 'w-full' : 'w-[80%] md:w-[60%]'} h-full ${positionClasses[position]}`}
        style={{ willChange: 'auto' }}
      >
        <img 
          src={imageSrc} 
          alt=""
          className="w-full h-full object-cover"
          style={{ 
            opacity, 
            filter: 'blur(10px)',
            transform: 'translateZ(0)',
          }}
          loading="lazy"
          decoding="async"
        />
      </div>
      
      {/* Gradient overlays for blending */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom, hsl(0 0% 4% / 0.8) 0%, transparent 20%, transparent 80%, hsl(0 0% 4% / 0.9) 100%),
            linear-gradient(to right, hsl(0 0% 4% / 0.9) 0%, transparent 30%, transparent 70%, hsl(0 0% 4% / 0.9) 100%)
          `,
        }}
      />
      
      {/* Subtle red radial glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(220, 38, 38, 0.08) 0%, transparent 60%)',
        }}
      />
      
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
});

DynamicGlowBg.displayName = 'DynamicGlowBg';
