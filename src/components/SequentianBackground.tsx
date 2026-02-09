import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, memo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

import sequentian2 from '@/assets/sequentian-2.png';
import sequentian3 from '@/assets/sequentian-3.png';
import sequentian4 from '@/assets/sequentian-4.png';

const variantMap: Record<2 | 3 | 4, string> = {
  2: sequentian2,
  3: sequentian3,
  4: sequentian4,
};

interface SequentianBackgroundProps {
  variant: 2 | 3 | 4;
  opacity?: number;
  parallax?: boolean;
  className?: string;
}

export const SequentianBackground = memo(({
  variant,
  opacity = 0.35,
  parallax = true,
  className = '',
}: SequentianBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const adjustedOpacity = isMobile ? opacity * 0.7 : opacity;

  return (
    <div
      ref={ref}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden
    >
      <motion.img
        src={variantMap[variant]}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
        style={{
          scale: parallax && !isMobile ? scale : 1,
          willChange: parallax && !isMobile ? 'transform' : 'auto',
        }}
        className="absolute inset-0 w-full h-full object-cover origin-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: adjustedOpacity }}
        transition={{ duration: 1.2 }}
      />

      {/* Top gradient fade */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-background to-transparent" />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent" />

      {/* Radial vignette for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, hsl(var(--background) / 0.4) 80%)',
        }}
      />
    </div>
  );
});

SequentianBackground.displayName = 'SequentianBackground';
