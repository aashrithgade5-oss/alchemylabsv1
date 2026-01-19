import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter = ({ 
  value, 
  suffix = '', 
  prefix = '',
  duration = 2,
  className = ''
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, {
    mass: 1,
    stiffness: 75,
    damping: 15,
    duration: duration * 1000,
  });

  const display = useTransform(spring, (current) => 
    Math.floor(current)
  );

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
    }
  }, [isInView, value, spring, hasAnimated]);

  useEffect(() => {
    const unsubscribe = display.on('change', (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [display]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
};

interface MetricCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
  delay?: number;
}

export const MetricCard = ({ 
  value, 
  suffix = '', 
  prefix = '',
  label,
  description,
  delay = 0
}: MetricCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="relative group"
    >
      {/* Glow effect */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-alchemy-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      {/* Card */}
      <div className="relative p-8 rounded-2xl glass-deep border border-white/5 hover:border-alchemy-red/20 transition-all duration-500">
        {/* Metric value */}
        <div className="flex items-baseline gap-1 mb-3">
          <span className="font-display text-5xl md:text-6xl text-porcelain tracking-tight">
            <AnimatedCounter 
              value={value} 
              suffix={suffix}
              prefix={prefix}
              duration={2}
            />
          </span>
        </div>

        {/* Label */}
        <h3 className="font-body text-lg text-porcelain/90 font-medium mb-2">
          {label}
        </h3>

        {/* Description */}
        {description && (
          <p className="font-body text-sm text-porcelain/50 leading-relaxed">
            {description}
          </p>
        )}

        {/* Decorative corner accent */}
        <div className="absolute top-4 right-4 w-8 h-8">
          <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-alchemy-red/40 to-transparent" />
          <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-alchemy-red/40 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
};
