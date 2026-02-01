import { memo, useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MagneticCTAProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const variantStyles = {
  primary: {
    base: 'bg-gradient-to-r from-alchemy-red/20 to-alchemy-red/10 border-alchemy-red/40 text-porcelain',
    hover: 'hover:from-alchemy-red/30 hover:to-alchemy-red/15 hover:border-alchemy-red/60',
    glow: '0 0 30px rgba(220,38,38,0.25), 0 0 60px rgba(220,38,38,0.1)',
  },
  secondary: {
    base: 'bg-white/5 border-white/10 text-porcelain/80',
    hover: 'hover:bg-white/10 hover:border-white/20 hover:text-porcelain',
    glow: '0 0 20px rgba(255,255,255,0.1)',
  },
  ghost: {
    base: 'bg-transparent border-transparent text-porcelain/60',
    hover: 'hover:text-alchemy-red',
    glow: 'none',
  },
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm gap-2',
  md: 'px-6 py-3 text-sm gap-2',
  lg: 'px-8 py-4 text-base gap-3',
};

export const MagneticCTA = memo(({
  children,
  variant = 'primary',
  size = 'md',
  icon = true,
  href,
  onClick,
  className,
  type = 'button',
  disabled = false,
}: MagneticCTAProps) => {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [arrowOffset, setArrowOffset] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.15;
    const distanceY = (e.clientY - centerY) * 0.15;
    setPosition({ x: distanceX, y: distanceY });
    setArrowOffset(4);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setArrowOffset(0);
  };

  const styles = variantStyles[variant];
  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref as any}
      href={href}
      onClick={onClick}
      type={href ? undefined : type}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'inline-flex items-center justify-center font-body font-medium rounded-full border backdrop-blur-sm transition-all duration-300',
        sizeClasses[size],
        styles.base,
        styles.hover,
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      animate={{
        x: position.x,
        y: position.y,
      }}
      style={{
        boxShadow: styles.glow,
      }}
      whileTap={{ scale: 0.98 }}
    >
      <span>{children}</span>
      {icon && (
        <motion.span
          animate={{ x: arrowOffset }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      )}
    </Component>
  );
});

MagneticCTA.displayName = 'MagneticCTA';
