import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useLocation } from 'react-router-dom';

type CursorVariant = 'default' | 'hover' | 'text' | 'hidden';

// Check desktop synchronously to avoid initial null render
const checkIsDesktop = () => {
  if (typeof window === 'undefined') return false;
  // Also check for touch devices
  if ('ontouchstart' in window) return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
};

export const CustomCursor = () => {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [isVisible, setIsVisible] = useState(true); // Start visible
  const [isDesktop, setIsDesktop] = useState(checkIsDesktop);
  const cursorLabel = useRef<string>('');
  const location = useLocation();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const trailConfig = { damping: 35, stiffness: 150, mass: 0.8 };
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);

  // Re-check desktop on mount and media query changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsDesktop(mediaQuery.matches && !('ontouchstart' in window));

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches && !('ontouchstart' in window));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Reset visibility on route change to ensure cursor is active
  useEffect(() => {
    if (isDesktop) {
      setIsVisible(true);
    }
  }, [location.pathname, isDesktop]);

  const updateCursorVariant = useCallback((target: Element | null) => {
    if (!target) {
      setCursorVariant('default');
      cursorLabel.current = '';
      return;
    }
    
    if (target.closest('button, a, [role="button"], [data-cursor="button"]')) {
      setCursorVariant('hover');
      cursorLabel.current = '';
    } else if (target.closest('input, textarea, select')) {
      setCursorVariant('text');
    } else if (target.closest('[data-cursor="view"]')) {
      setCursorVariant('hover');
      cursorLabel.current = 'View';
    } else {
      setCursorVariant('default');
      cursorLabel.current = '';
    }
  }, []);

  // Single global mouse tracking - attached to window
  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
      updateCursorVariant(e.target as Element);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Use window for global tracking
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isDesktop, mouseX, mouseY, updateCursorVariant]);

  // Don't render on mobile/touch devices
  if (!isDesktop) return null;

  return (
    <>
      {/* Main cursor dot - fastest response */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 999999, // Highest z-index
        }}
        animate={{
          width: cursorVariant === 'hover' ? 56 : cursorVariant === 'text' ? 4 : 10,
          height: cursorVariant === 'hover' ? 56 : cursorVariant === 'text' ? 24 : 10,
          backgroundColor: cursorVariant === 'hover' 
            ? 'rgba(225, 6, 19, 0.12)' 
            : 'rgba(225, 6, 19, 0.9)',
          borderRadius: cursorVariant === 'text' ? 2 : 999,
          borderWidth: cursorVariant === 'hover' ? 1 : 0,
          borderColor: 'rgba(225, 6, 19, 0.5)',
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
      >
        {cursorVariant === 'hover' && cursorLabel.current && (
          <span className="text-[10px] font-mono uppercase tracking-wider text-alchemy-red">
            {cursorLabel.current}
          </span>
        )}
      </motion.div>

      {/* Trailing ring - slower, creates depth */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          border: '1px solid rgba(225, 6, 19, 0.15)',
          zIndex: 999998,
        }}
        animate={{
          width: cursorVariant === 'hover' ? 72 : 36,
          height: cursorVariant === 'hover' ? 72 : 36,
          opacity: isVisible && cursorVariant !== 'text' ? 0.6 : 0,
        }}
        transition={{ type: 'spring', damping: 35, stiffness: 180 }}
      />

      {/* Outer glow ring - slowest, for depth */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          border: '1px solid rgba(225, 6, 19, 0.08)',
          zIndex: 999997,
        }}
        animate={{
          width: cursorVariant === 'hover' ? 88 : 48,
          height: cursorVariant === 'hover' ? 88 : 48,
          opacity: isVisible && cursorVariant === 'default' ? 0.3 : 0,
        }}
        transition={{ type: 'spring', damping: 45, stiffness: 120 }}
      />

      {/* Hide default cursor globally on desktop */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          *, *::before, *::after {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};
