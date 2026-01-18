import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import alchemyLogo from '@/assets/alchemy-logo.png';

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 80);

    // Minimum display time + actual load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-alchemy-black overflow-hidden"
        >
          {/* Animated background orbs with liquid glass effect */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Main red orb */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(225, 6, 19, 0.15) 0%, rgba(225, 6, 19, 0.05) 40%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              initial={{ x: '-50%', y: '-50%', scale: 0.8 }}
              animate={{ 
                x: '-50%', 
                y: '-50%', 
                scale: [0.8, 1.1, 0.9, 1],
              }}
              transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
            />
            
            {/* Secondary floating orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(225, 6, 19, 0.1) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
              animate={{ 
                x: [0, 50, -30, 0],
                y: [0, -40, 20, 0],
                scale: [1, 1.2, 0.9, 1],
              }}
              transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
            />
            
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
                filter: 'blur(30px)',
              }}
              animate={{ 
                x: [0, -40, 30, 0],
                y: [0, 30, -20, 0],
                scale: [1, 0.8, 1.1, 1],
              }}
              transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, delay: 0.5 }}
            />
          </div>

          {/* Liquid glass container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Glass card with liquid effect */}
            <div 
              className="relative p-12 md:p-16 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                backdropFilter: 'blur(40px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: `
                  0 0 80px rgba(225, 6, 19, 0.15),
                  0 0 160px rgba(225, 6, 19, 0.08),
                  0 32px 64px rgba(0, 0, 0, 0.4),
                  inset 0 1px 0 rgba(255, 255, 255, 0.15),
                  inset 0 -1px 0 rgba(225, 6, 19, 0.1)
                `,
              }}
            >
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(225, 6, 19, 0.3) 0%, transparent 50%, rgba(225, 6, 19, 0.2) 100%)',
                  opacity: 0.5,
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Logo with pulsing glow */}
              <motion.div className="relative">
                {/* Logo glow backdrop */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(225, 6, 19, 0.4) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                
                <motion.img
                  src={alchemyLogo}
                  alt="Alchemy Labs"
                  className="relative w-20 h-20 md:w-24 md:h-24 object-contain"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            </div>

            {/* Progress bar with liquid glass effect */}
            <motion.div 
              className="mt-10 w-56 md:w-64"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div 
                className="h-[3px] rounded-full overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)',
                }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, hsl(356 94% 45%), hsl(356 94% 55%), hsl(356 94% 45%))',
                    backgroundSize: '200% 100%',
                    boxShadow: '0 0 20px rgba(225, 6, 19, 0.8), 0 0 40px rgba(225, 6, 19, 0.4)',
                  }}
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${Math.min(progress, 100)}%`,
                    backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                  }}
                  transition={{ 
                    width: { duration: 0.3 },
                    backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' }
                  }}
                />
              </div>
              
              <motion.div 
                className="flex items-center justify-between mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="font-mono text-xs text-porcelain/30 tracking-widest">
                  LOADING
                </span>
                <span className="font-mono text-xs text-porcelain/50 tabular-nums">
                  {Math.round(Math.min(progress, 100))}%
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Tagline with glass backdrop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute bottom-12 md:bottom-16"
          >
            <div 
              className="px-6 py-2 rounded-full"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <span className="font-display text-sm md:text-base italic text-porcelain/40">
                Alchemy in Motion
              </span>
            </div>
          </motion.div>

          {/* Subtle grain texture */}
          <div 
            className="absolute inset-0 opacity-[0.015] pointer-events-none" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
            }} 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
