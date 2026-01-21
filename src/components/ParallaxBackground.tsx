import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxLayer = ({ children, speed = 0.5, className = '' }: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

export const ParallaxBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Different parallax speeds for each orb - disabled on mobile
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '0%' : '15%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '0%' : '-10%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '0%' : '25%']);

  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.95]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 0.15, 0.12, 0.06]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Static gradient for mobile, animated for desktop */}
      {isMobile ? (
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, rgba(225, 6, 19, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, rgba(225, 6, 19, 0.05) 0%, transparent 50%)
            `,
          }}
        />
      ) : (
        <>
          {/* Primary red orb - top left */}
          <motion.div
            className="absolute -top-[15%] -left-[8%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full blur-[80px]"
            style={{
              y: y1,
              scale: scale1,
              opacity: opacity1,
              background: 'radial-gradient(circle, hsl(356 94% 45% / 0.3) 0%, transparent 65%)',
            }}
          />

          {/* Secondary crimson orb - bottom right */}
          <motion.div
            className="absolute top-[45%] -right-[12%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-[70px]"
            style={{
              y: y2,
              opacity: 0.06,
              background: 'radial-gradient(circle, hsl(354 85% 26% / 0.4) 0%, transparent 65%)',
            }}
          />

          {/* Deep accent orb - mid left */}
          <motion.div
            className="absolute top-[65%] -left-[15%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full blur-[60px]"
            style={{
              y: y3,
              opacity: 0.05,
              background: 'radial-gradient(circle, hsl(356 94% 45% / 0.2) 0%, transparent 65%)',
            }}
          />
        </>
      )}

      {/* Subtle grid pattern overlay - simplified */}
      <div
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
};
