import { useRef, useEffect } from 'react';
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();

  // Animated gradient mesh background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      
      time += 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create animated gradient mesh
      const gradient1 = ctx.createRadialGradient(
        canvas.width * (0.3 + Math.sin(time * 0.5) * 0.15),
        canvas.height * (0.3 + Math.cos(time * 0.7) * 0.15),
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.7
      );
      
      gradient1.addColorStop(0, 'rgba(225, 6, 19, 0.12)');
      gradient1.addColorStop(0.4, 'rgba(225, 6, 19, 0.04)');
      gradient1.addColorStop(1, 'rgba(10, 10, 11, 0)');
      
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Second gradient for depth
      const gradient2 = ctx.createRadialGradient(
        canvas.width * (0.7 + Math.cos(time * 0.3) * 0.2),
        canvas.height * (0.6 + Math.sin(time * 0.4) * 0.2),
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.6
      );
      
      gradient2.addColorStop(0, 'rgba(177, 18, 28, 0.08)');
      gradient2.addColorStop(0.5, 'rgba(122, 7, 16, 0.03)');
      gradient2.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Different parallax speeds for each orb
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 0.9]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.12, 0.2, 0.15, 0.08]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Animated gradient mesh canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-70"
      />

      {/* Primary red orb - top left */}
      <motion.div
        className="absolute -top-[15%] -left-[8%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full blur-[100px]"
        style={{
          y: y1,
          scale: scale1,
          opacity: opacity1,
          background: 'radial-gradient(circle, hsl(356 94% 45% / 0.35) 0%, transparent 65%)',
        }}
      />

      {/* Secondary crimson orb - bottom right */}
      <motion.div
        className="absolute top-[45%] -right-[12%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full blur-[90px]"
        style={{
          y: y2,
          opacity: 0.08,
          background: 'radial-gradient(circle, hsl(354 85% 26% / 0.45) 0%, transparent 65%)',
        }}
      />

      {/* Deep accent orb - mid left */}
      <motion.div
        className="absolute top-[65%] -left-[15%] w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] rounded-full blur-[70px]"
        style={{
          y: y3,
          opacity: 0.06,
          background: 'radial-gradient(circle, hsl(356 94% 45% / 0.25) 0%, transparent 65%)',
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
};
