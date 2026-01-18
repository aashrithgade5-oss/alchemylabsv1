import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'click' | 'text'>('default');
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if desktop with fine pointer
    const checkDesktop = () => {
      const hasFineMouse = window.matchMedia('(pointer: fine)').matches;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsDesktop(hasFineMouse && !hasTouch);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const updateCursorPosition = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [mouseX, mouseY, isVisible]);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check for specific interactive elements
    const isLink = target.closest('a');
    const isButton = target.closest('button, [role="button"]');
    const isInput = target.closest('input, textarea, select');
    const hasDataCursor = target.closest('[data-cursor]');
    
    if (hasDataCursor) {
      const cursorType = hasDataCursor.getAttribute('data-cursor') as typeof cursorVariant;
      setCursorVariant(cursorType || 'hover');
    } else if (isInput) {
      setCursorVariant('text');
    } else if (isLink || isButton) {
      setCursorVariant('hover');
    } else {
      setCursorVariant('default');
    }
  }, []);

  const handleMouseDown = useCallback(() => setCursorVariant('click'), []);
  const handleMouseUp = useCallback(() => setCursorVariant('default'), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);

  useEffect(() => {
    if (!isDesktop) return;

    // Use document-level listeners for better coverage
    document.addEventListener('mousemove', updateCursorPosition, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isDesktop, updateCursorPosition, handleMouseOver, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter]);

  if (!isDesktop) return null;

  const getSize = () => {
    switch (cursorVariant) {
      case 'hover': return 48;
      case 'click': return 8;
      case 'text': return 4;
      default: return 12;
    }
  };

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        className="pointer-events-none"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 2147483647,
        }}
        animate={{
          width: getSize(),
          height: cursorVariant === 'text' ? 24 : getSize(),
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { type: 'spring', damping: 20, stiffness: 300 },
          height: { type: 'spring', damping: 20, stiffness: 300 },
          opacity: { duration: 0.15 },
        }}
      >
        <motion.div
          className="w-full h-full"
          animate={{
            backgroundColor: cursorVariant === 'hover' ? 'transparent' : 'hsl(356 94% 45%)',
            borderWidth: cursorVariant === 'hover' ? 2 : 0,
            borderColor: 'hsl(356 94% 45%)',
            borderRadius: cursorVariant === 'text' ? 2 : 999,
          }}
          style={{
            borderStyle: 'solid',
            mixBlendMode: cursorVariant === 'hover' ? 'normal' : 'difference',
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Small trailing dot */}
      <motion.div
        className="pointer-events-none rounded-full"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: 4,
          height: 4,
          backgroundColor: 'hsl(356 94% 45% / 0.5)',
          zIndex: 2147483646,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Global cursor hide styles */}
      <style>{`
        @media (pointer: fine) {
          *, *::before, *::after {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};
