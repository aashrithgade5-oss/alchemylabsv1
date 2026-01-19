import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface FluidBackgroundProps {
  variant?: 'hero' | 'page' | 'subtle';
  className?: string;
}

export const FluidBackground = ({ variant = 'page', className = '' }: FluidBackgroundProps) => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Transform mouse position to gradient positions
  const gradient1X = useTransform(smoothX, [0, 1], ['20%', '80%']);
  const gradient1Y = useTransform(smoothY, [0, 1], ['20%', '60%']);
  const gradient2X = useTransform(smoothX, [0, 1], ['80%', '20%']);
  const gradient2Y = useTransform(smoothY, [0, 1], ['60%', '20%']);

  if (variant === 'hero') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {/* Primary fluid blob */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full blur-[200px]"
          style={{
            background: 'radial-gradient(circle, rgba(225, 6, 19, 0.15) 0%, transparent 70%)',
            left: gradient1X,
            top: gradient1Y,
            x: '-50%',
            y: '-50%',
          }}
        />
        
        {/* Secondary fluid blob */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[180px]"
          style={{
            background: 'radial-gradient(circle, rgba(80, 4, 10, 0.2) 0%, transparent 70%)',
            left: gradient2X,
            top: gradient2Y,
            x: '-50%',
            y: '-50%',
          }}
        />

        {/* Animated grain */}
        <motion.div
          className="absolute inset-0 opacity-[0.015]"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    );
  }

  if (variant === 'subtle') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[150px] opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(225, 6, 19, 0.08) 0%, transparent 70%)',
            left: gradient1X,
            top: gradient1Y,
            x: '-50%',
            y: '-50%',
          }}
        />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Dynamic gradient mesh */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full blur-[180px]"
        style={{
          background: 'radial-gradient(circle, rgba(225, 6, 19, 0.12) 0%, transparent 70%)',
          left: gradient1X,
          top: gradient1Y,
          x: '-50%',
          y: '-50%',
        }}
      />
      
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[150px]"
        style={{
          background: 'radial-gradient(circle, rgba(80, 4, 10, 0.15) 0%, transparent 70%)',
          left: gradient2X,
          top: gradient2Y,
          x: '-50%',
          y: '-50%',
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-alchemy-red/5 to-transparent rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-deep-crimson/5 to-transparent rounded-full blur-[120px]" />
    </div>
  );
};
