import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, memo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

import sequentian1 from '@/assets/sequentian-1.png';
import sequentian2 from '@/assets/sequentian-2.png';
import sequentian3 from '@/assets/sequentian-3.png';
import sequentian4 from '@/assets/sequentian-4.png';
import sequentian5 from '@/assets/sequentian-5.png';

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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, scaleEnd]);
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

      <motion.img
        src={variantMap[variant]}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
        style={{
          scale: parallax && !isMobile ? scale : 1,
          willChange: parallax && !isMobile ? 'transform' : 'auto',
          filter: blur > 0 ? `blur(${blur}px)` : undefined,
        }}
        className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] object-cover origin-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: adjustedOpacity }}
        transition={{ duration: 1.2 }}
      />

      {/* Soft top fade — short for minimal dimming */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-background/80 to-transparent" />

      {/* Soft bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background/80 to-transparent" />
    </div>
  );
});

SequentianBackground.displayName = 'SequentianBackground';
