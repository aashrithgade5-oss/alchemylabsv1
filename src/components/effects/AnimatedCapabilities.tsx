import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const capabilities = [
  'Brand Architecture',
  'Creative Direction',
  'AI-Native Strategy',
  'Systems Thinking',
  'Narrative Engineering',
];

export const AnimatedCapabilities = memo(() => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % capabilities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-12 sm:h-16 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-xl sm:text-2xl lg:text-3xl text-porcelain/60 tracking-wide"
        >
          <span className="relative inline-block">
            {capabilities[index]}
            {/* Subtle glitch echo */}
            <motion.span
              className="absolute inset-0 text-alchemy-red/30 mix-blend-screen"
              animate={{ x: [-1, 1, -1], opacity: [0, 0.25, 0] }}
              transition={{ duration: 0.15, repeat: 2, delay: 2.5 }}
              aria-hidden
            >
              {capabilities[index]}
            </motion.span>
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

AnimatedCapabilities.displayName = 'AnimatedCapabilities';
