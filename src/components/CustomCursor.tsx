import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

type CursorVariant = 'default' | 'hover' | 'click' | 'text' | 'view' | 'drag';

export const CustomCursor = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [cursorText, setCursorText] = useState('');
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Different spring configs for different effects
  const smoothConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const laggyConfig = { damping: 20, stiffness: 200, mass: 0.8 };
  
  const cursorX = useSpring(mouseX, smoothConfig);
  const cursorY = useSpring(mouseY, smoothConfig);
  const trailX = useSpring(mouseX, laggyConfig);
  const trailY = useSpring(mouseY, laggyConfig);

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
    const isViewable = target.closest('[data-cursor-view]');
    const isDraggable = target.closest('[data-cursor-drag]');
    
    if (hasDataCursor) {
      const cursorType = hasDataCursor.getAttribute('data-cursor') as CursorVariant;
      setCursorVariant(cursorType || 'hover');
      const text = hasDataCursor.getAttribute('data-cursor-text');
      if (text) setCursorText(text);
    } else if (isViewable) {
      setCursorVariant('view');
      setCursorText('View');
    } else if (isDraggable) {
      setCursorVariant('drag');
      setCursorText('Drag');
    } else if (isInput) {
      setCursorVariant('text');
      setCursorText('');
    } else if (isLink || isButton) {
      setCursorVariant('hover');
      setCursorText('');
    } else {
      setCursorVariant('default');
      setCursorText('');
    }
  }, []);

  const handleMouseDown = useCallback(() => setCursorVariant('click'), []);
  const handleMouseUp = useCallback(() => setCursorVariant('default'), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);

  useEffect(() => {
    if (!isDesktop) return;

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
      case 'hover': return 56;
      case 'click': return 8;
      case 'text': return 4;
      case 'view': return 80;
      case 'drag': return 60;
      default: return 12;
    }
  };

  const showText = cursorVariant === 'view' || cursorVariant === 'drag';

  return (
    <>
      {/* Trail effect - follows with delay */}
      <motion.div
        className="pointer-events-none rounded-full"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: 40,
          height: 40,
          background: 'radial-gradient(circle, rgba(225, 6, 19, 0.1) 0%, transparent 70%)',
          zIndex: 2147483645,
          opacity: isVisible && cursorVariant !== 'click' ? 1 : 0,
        }}
      />
      
      {/* Main cursor ring */}
      <motion.div
        className="pointer-events-none flex items-center justify-center"
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
          className="w-full h-full flex items-center justify-center"
          animate={{
            backgroundColor: showText ? 'rgba(225, 6, 19, 0.9)' : (cursorVariant === 'hover' ? 'transparent' : 'hsl(356 94% 45%)'),
            borderWidth: cursorVariant === 'hover' && !showText ? 2 : 0,
            borderColor: 'hsl(356 94% 45%)',
            borderRadius: cursorVariant === 'text' ? 2 : 999,
            scale: cursorVariant === 'click' ? 0.5 : 1,
          }}
          style={{
            borderStyle: 'solid',
            mixBlendMode: showText ? 'normal' : (cursorVariant === 'hover' ? 'normal' : 'difference'),
          }}
          transition={{ duration: 0.15 }}
        >
          {/* Cursor text */}
          <AnimatePresence>
            {showText && cursorText && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-[10px] font-mono uppercase tracking-widest text-porcelain"
              >
                {cursorText}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Small center dot */}
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
          backgroundColor: 'hsl(356 94% 45%)',
          zIndex: 2147483646,
        }}
        animate={{
          opacity: isVisible && cursorVariant !== 'view' && cursorVariant !== 'drag' ? 1 : 0,
          scale: cursorVariant === 'click' ? 2 : 1,
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
