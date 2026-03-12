import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full group"
          style={{
            background: 'rgba(10, 10, 11, 0.8)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
          aria-label="Back to top"
        >
          {/* Circular progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
            <circle
              cx="28" cy="28" r="26"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="2"
            />
            <motion.circle
              cx="28" cy="28" r="26"
              fill="none"
              stroke="hsl(356 94% 45%)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 26}`}
              style={{
                strokeDashoffset: smoothProgress.get() 
                  ? undefined 
                  : `${2 * Math.PI * 26}`,
                pathLength: smoothProgress,
              }}
              pathLength="1"
            />
          </svg>
          
          <ArrowUp className="relative z-10 w-5 h-5 mx-auto text-porcelain/70 group-hover:text-alchemy-red transition-all duration-300 group-hover:-translate-y-0.5" />
          
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-alchemy-red/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
