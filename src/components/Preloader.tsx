import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import alchemyLogo from '@/assets/alchemy-logo.png';

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 60);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

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
          exit={{ 
            opacity: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ backgroundColor: 'hsl(240 10% 4%)' }}
        >
          {/* Subtle ambient glow */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
              style={{
                background: 'radial-gradient(circle, hsl(356 94% 45% / 0.15) 0%, transparent 60%)',
                filter: 'blur(80px)',
              }}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.35, 0.2],
              }}
              transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
            />
          </div>

          {/* Center content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Logo container */}
            <div className="relative mb-12">
              {/* Soft glow behind logo */}
              <motion.div
                className="absolute inset-0 -m-4"
                style={{
                  background: 'radial-gradient(circle, hsl(356 94% 45% / 0.25) 0%, transparent 70%)',
                  filter: 'blur(25px)',
                }}
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              
              {/* Logo */}
              <motion.img
                src={alchemyLogo}
                alt="Alchemy Labs"
                className="relative w-16 h-16 md:w-20 md:h-20 object-contain"
                animate={{
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>

            {/* Progress bar */}
            <div className="w-48 md:w-56">
              <div 
                className="h-[2px] rounded-full overflow-hidden"
                style={{ backgroundColor: 'hsl(0 0% 100% / 0.08)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, hsl(356 94% 45%), hsl(356 94% 55%))',
                    boxShadow: '0 0 15px hsl(356 94% 45% / 0.6)',
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                />
              </div>
              
              {/* Progress text */}
              <motion.div 
                className="flex items-center justify-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span 
                  className="font-mono text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: 'hsl(0 0% 100% / 0.35)' }}
                >
                  Loading
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute bottom-10 md:bottom-14"
          >
            <span 
              className="font-display text-sm italic"
              style={{ color: 'hsl(0 0% 100% / 0.25)' }}
            >
              Alchemy Labs
            </span>
          </motion.div>

          {/* Subtle noise overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.02]" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
            }} 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
