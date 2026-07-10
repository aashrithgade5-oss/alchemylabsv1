'use client';

import { memo, useState } from 'react';
import Image from 'next/image';

type GlowVariant = 'waves' | 'ascii' | 'liquid' | 'random';
type GlowPosition = 'left' | 'right' | 'center' | 'full';

interface DynamicGlowBgProps {
  variant?: GlowVariant;
  position?: GlowPosition;
  opacity?: number;
  className?: string;
}

const glowImagePaths = {
  waves: '/assets/glow-bg-1.png',
  ascii: '/assets/glow-bg-2.png',
  liquid: '/assets/glow-bg-3.png',
};

/**
 * GPU-optimized dynamic glow background
 * Uses CSS filters with hardware acceleration
 */
export const DynamicGlowBg = memo(({
  variant = 'liquid',
  position = 'center',
  opacity = 0.35,
  className = ''
}: DynamicGlowBgProps) => {
  const imageSrc = variant === 'random'
    ? [glowImagePaths.waves, glowImagePaths.ascii, glowImagePaths.liquid][Math.floor(Math.random() * 3)]
    : glowImagePaths[variant];
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles: Record<GlowPosition, string> = {
    left: 'left-0 -translate-x-1/4',
    right: 'right-0 translate-x-1/4',
    center: 'left-1/2 -translate-x-1/2',
    full: 'left-0 right-0',
  };

  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Image layer with GPU-accelerated blur */}
      <div 
        className={`
          absolute top-1/2 -translate-y-1/2 
          ${position === 'full' ? 'w-full' : 'w-[80%] md:w-[60%]'} 
          h-full ${positionStyles[position]}
          transition-opacity duration-700
          gpu-accelerated
        `}
        style={{ 
          opacity: isVisible ? 1 : 0,
        }}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover gpu-accelerated"
          style={{
            opacity,
            filter: 'blur(8px)',
          }}
          onLoad={() => setIsVisible(true)}
        />
      </div>
      
      {/* Gradient overlays for blending - pure CSS, no JS */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom, hsl(0 0% 4% / 0.85) 0%, transparent 25%, transparent 75%, hsl(0 0% 4% / 0.9) 100%),
            linear-gradient(to right, hsl(0 0% 4% / 0.9) 0%, transparent 35%, transparent 65%, hsl(0 0% 4% / 0.9) 100%)
          `,
        }}
      />
      
      {/* Subtle red radial glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(220, 38, 38, 0.06) 0%, transparent 55%)',
        }}
      />
    </div>
  );
});

DynamicGlowBg.displayName = 'DynamicGlowBg';
