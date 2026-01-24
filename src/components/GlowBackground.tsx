import { memo } from 'react';
import { motion } from 'framer-motion';
import glowBg1 from '@/assets/glow-background-1.png';
import glowBg2 from '@/assets/glow-background-2.png';

type GlowVariant = 'red-energy' | 'soft-ambient' | 'subtle' | 'hero';

interface GlowBackgroundProps {
  variant?: GlowVariant;
  className?: string;
  animate?: boolean;
}

const variantStyles: Record<GlowVariant, { opacity: number; blur: string; scale: number; image: string }> = {
  'red-energy': { opacity: 0.25, blur: 'blur-[100px]', scale: 1.2, image: glowBg1 },
  'soft-ambient': { opacity: 0.15, blur: 'blur-[120px]', scale: 1.3, image: glowBg2 },
  'subtle': { opacity: 0.1, blur: 'blur-[150px]', scale: 1.5, image: glowBg2 },
  'hero': { opacity: 0.3, blur: 'blur-[80px]', scale: 1.1, image: glowBg1 },
};

export const GlowBackground = memo(({ 
  variant = 'soft-ambient', 
  className = '',
  animate = true 
}: GlowBackgroundProps) => {
  const style = variantStyles[variant];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Primary glow layer */}
        <motion.img
          src={style.image}
          alt=""
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover ${style.blur}`}
          style={{ 
            opacity: style.opacity,
            transform: `translate(-50%, -50%) scale(${style.scale})`,
          }}
          animate={animate ? {
            scale: [style.scale, style.scale * 1.05, style.scale],
            rotate: [0, 2, 0],
          } : undefined}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Secondary ambient layer for depth */}
        <motion.img
          src={variant === 'red-energy' ? glowBg2 : glowBg1}
          alt=""
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover ${style.blur} mix-blend-soft-light`}
          style={{ 
            opacity: style.opacity * 0.5,
            transform: `translate(-50%, -50%) scale(${style.scale * 1.2})`,
          }}
          animate={animate ? {
            scale: [style.scale * 1.2, style.scale * 1.15, style.scale * 1.2],
            rotate: [0, -3, 0],
          } : undefined}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </motion.div>
      
      {/* Dark gradient overlay to blend with background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/80" />
    </div>
  );
});

GlowBackground.displayName = 'GlowBackground';

export default GlowBackground;
