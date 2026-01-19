import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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
          className="fixed bottom-6 right-6 z-50 p-3 sm:p-4 rounded-full 
            bg-alchemy-black/80 backdrop-blur-xl border border-white/10
            text-porcelain/70 hover:text-alchemy-red hover:border-alchemy-red/30
            shadow-lg hover:shadow-alchemy-red/20
            transition-all duration-300 group"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:-translate-y-1" />
          
          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full bg-alchemy-red/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
