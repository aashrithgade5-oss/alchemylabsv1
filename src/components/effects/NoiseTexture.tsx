import { memo } from 'react';

interface NoiseTextureProps {
  opacity?: number;
}

export const NoiseTexture = memo(({ opacity = 0.05 }: NoiseTextureProps) => (
  <div
    className="absolute inset-0 pointer-events-none mix-blend-overlay"
    style={{
      opacity,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
    }}
  />
));

NoiseTexture.displayName = 'NoiseTexture';
