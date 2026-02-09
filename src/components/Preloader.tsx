import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import alchemyLogo from '@/assets/alchemy-logo.png';

export const Preloader = memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast progress simulation
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 35;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
      }
      setProgress(currentProgress);
    }, 30);

    // Quick preloader dismissal - 800ms total
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

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
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-alchemy-black"
        >
          {/* Subtle ambient glow */}
          <div 
            className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, hsl(356 94% 45% / 0.15) 0%, transparent 60%)',
              filter: 'blur(60px)',
            }}
          />

          {/* Center content */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Logo */}
            <div className="relative mb-10">
              <div
                className="absolute inset-0 -m-3 opacity-50"
                style={{
                  background: 'radial-gradient(circle, hsl(356 94% 45% / 0.2) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
              <img
                src={alchemyLogo}
                alt="Alchemy Labs"
                className="relative w-14 h-14 md:w-16 md:h-16 object-contain"
              />
            </div>

            {/* Progress bar */}
            <div className="w-40 md:w-48">
              <div 
                className="h-[2px] rounded-full overflow-hidden"
                style={{ backgroundColor: 'hsl(0 0% 100% / 0.08)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-100 ease-out"
                  style={{
                    width: `${Math.min(progress, 100)}%`,
                    background: 'linear-gradient(90deg, hsl(356 94% 45%), hsl(356 94% 55%))',
                    boxShadow: '0 0 12px hsl(356 94% 45% / 0.5)',
                  }}
                />
              </div>
              
              <div className="flex items-center justify-center mt-5">
                <span 
                  className="font-mono text-[9px] tracking-[0.25em] uppercase"
                  style={{ color: 'hsl(0 0% 100% / 0.3)' }}
                >
                  Loading
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bottom tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="absolute bottom-8 md:bottom-12"
          >
            <span 
              className="font-display text-sm italic"
              style={{ color: 'hsl(0 0% 100% / 0.2)' }}
            >
              Alchemy Labs
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

Preloader.displayName = 'Preloader';
