import { useRef } from 'react';
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

  // Different parallax speeds for each orb
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y4 = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);

  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 1.3]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.15, 0.25, 0.2, 0.1]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.08, 0.15, 0.05]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Primary red orb - top left */}
      <motion.div
        className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px]"
        style={{
          y: y1,
          scale: scale1,
          opacity: opacity1,
          background: 'radial-gradient(circle, hsl(356 94% 45% / 0.4) 0%, transparent 70%)',
        }}
      />

      {/* Secondary crimson orb - bottom right */}
      <motion.div
        className="absolute top-[40%] -right-[15%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-[100px]"
        style={{
          y: y2,
          scale: scale2,
          opacity: opacity2,
          background: 'radial-gradient(circle, hsl(354 85% 26% / 0.5) 0%, transparent 70%)',
        }}
      />

      {/* Accent orb - mid left */}
      <motion.div
        className="absolute top-[60%] -left-[20%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-[80px]"
        style={{
          y: y3,
          opacity: opacity2,
          background: 'radial-gradient(circle, hsl(356 94% 45% / 0.2) 0%, transparent 70%)',
        }}
      />

      {/* Deep orb - bottom center */}
      <motion.div
        className="absolute top-[80%] left-[30%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full blur-[100px]"
        style={{
          y: y4,
          opacity: opacity1,
          background: 'radial-gradient(circle, hsl(354 85% 26% / 0.3) 0%, transparent 70%)',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
};
