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
        return prev + Math.random() * 15;
      });
    }, 100);

    // Minimum display time + actual load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-alchemy-black"
        >
          {/* Background grain */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }} />

          {/* Red glow */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-alchemy-red/10 rounded-full blur-[100px]" />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <motion.img
              src={alchemyLogo}
              alt="Alchemy Labs"
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
              animate={{
                filter: [
                  'drop-shadow(0 0 20px rgba(225, 6, 19, 0.3))',
                  'drop-shadow(0 0 40px rgba(225, 6, 19, 0.6))',
                  'drop-shadow(0 0 20px rgba(225, 6, 19, 0.3))',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Progress bar */}
          <div className="relative z-10 mt-12 w-48">
            <div className="h-[2px] bg-porcelain/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-alchemy-red"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
                style={{
                  boxShadow: '0 0 10px rgba(225, 6, 19, 0.8)',
                }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-mono text-xs text-porcelain/40 text-center mt-4"
            >
              {Math.round(Math.min(progress, 100))}%
            </motion.p>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute bottom-12 font-display text-sm italic text-porcelain/30"
          >
            Alchemy in Motion
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
