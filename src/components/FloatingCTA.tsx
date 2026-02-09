import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState, memo } from 'react';

export const FloatingCTA = memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        setIsVisible(scrollPercent > 0.2);
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-40 hidden md:block"
        >
          <Link
            to="/book-sprint"
            className="group flex flex-col items-end gap-1 px-5 py-3 rounded-full transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(220, 38, 38, 0.08) 100%)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(220, 38, 38, 0.4)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px rgba(220, 38, 38, 0.15)',
            }}
          >
            <div className="flex items-center gap-2">
              <span className="font-body text-sm font-medium text-porcelain">Book a Sprint</span>
              <ArrowRight className="w-4 h-4 text-porcelain group-hover:translate-x-1 transition-transform duration-300" />
            </div>
            <span className="font-mono text-[10px] text-porcelain/50">Free first call</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

FloatingCTA.displayName = 'FloatingCTA';
