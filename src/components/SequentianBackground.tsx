'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, memo } from 'react';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePerformance } from '@/contexts/PerformanceContext';

const sequentian1 = '/assets/sequentian-1.png';
const sequentian2 = '/assets/sequentian-2.png';
const sequentian3 = '/assets/sequentian-3.png';
const sequentian4 = '/assets/sequentian-4.png';
const sequentian5 = '/assets/sequentian-5.png';

const variantMap: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: sequentian1,
  2: sequentian2,
  3: sequentian3,
  4: sequentian4,
  5: sequentian5,
};

interface SequentianBackgroundProps {
  variant: 1 | 2 | 3 | 4 | 5;
  opacity?: number;
  parallax?: boolean;
  blur?: number;
  /** Scale range end for parallax Ken Burns (default 1.15) */
  scaleEnd?: number;
  /** Add a color-matched ambient glow behind the image */
  glow?: boolean;
  className?: string;
}

export const SequentianBackground = memo(({
  variant,
  opacity = 0.45,
  parallax = true,
  blur = 0,
  scaleEnd = 1.15,
  glow = true,
  className = '',
}: SequentianBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { shouldParallax, maxBlur } = usePerformance();

  const effectiveParallax = parallax && shouldParallax;
  const effectiveBlur = Math.min(blur, maxBlur);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, effectiveParallax ? scaleEnd : 1]);
  const adjustedOpacity = isMobile ? opacity * 0.85 : opacity;

  return (
    <div
      ref={ref}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden
    >
      {/* Subtle warm ambient glow — restrained to avoid red-wash */}
      {glow && (
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(220, 38, 38, 0.04) 0%, transparent 60%)',
          }}
        />
      )}

      <motion.div
        className="absolute -inset-4 origin-center"
        style={{
          scale: effectiveParallax && !isMobile ? scale : 1,
          willChange: effectiveParallax && !isMobile ? 'transform' : 'auto',
          filter: effectiveBlur > 0 ? `blur(${effectiveBlur}px)` : undefined,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: adjustedOpacity }}
        transition={{ duration: 1.2 }}
      >
        <Image
          src={variantMap[variant]}
          alt=""
          fill
          draggable={false}
          className="object-cover object-center"
        />
      </motion.div>

      {/* Soft top fade — short for minimal dimming */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-background/80 to-transparent" />

      {/* Soft bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background/80 to-transparent" />
    </div>
  );
});

SequentianBackground.displayName = 'SequentianBackground';
