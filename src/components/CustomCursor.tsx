import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'click' | 'text'>('default');
  const [cursorText, setCursorText] = useState('');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if desktop with fine pointer
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsDesktop(mediaQuery.matches && !('ontouchstart' in window));
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches && !('ontouchstart' in window));
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [cursorX, cursorY]);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check for specific interactive elements
    const link = target.closest('a');
    const button = target.closest('button, [role="button"]');
    const input = target.closest('input, textarea, select');
    const hoverable = target.closest('[data-cursor]');
    
    if (hoverable) {
      const cursorType = hoverable.getAttribute('data-cursor');
      const text = hoverable.getAttribute('data-cursor-text') || '';
      setCursorVariant(cursorType as typeof cursorVariant || 'hover');
      setCursorText(text);
    } else if (input) {
      setCursorVariant('text');
      setCursorText('');
    } else if (link || button) {
      setCursorVariant('hover');
      setCursorText('');
    } else {
      setCursorVariant('default');
      setCursorText('');
    }
  }, []);

  const handleMouseDown = useCallback(() => {
    setCursorVariant('click');
  }, []);

  const handleMouseUp = useCallback(() => {
    setCursorVariant('default');
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDesktop, handleMouseMove, handleMouseOver, handleMouseDown, handleMouseUp]);

  if (!isDesktop) return null;

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: 'hsl(356 94% 45%)',
      border: 'none',
      mixBlendMode: 'difference' as const,
    },
    hover: {
      width: 48,
      height: 48,
      backgroundColor: 'transparent',
      border: '2px solid hsl(356 94% 45%)',
      mixBlendMode: 'normal' as const,
    },
    click: {
      width: 8,
      height: 8,
      backgroundColor: 'hsl(356 94% 45%)',
      border: 'none',
      mixBlendMode: 'difference' as const,
    },
    text: {
      width: 4,
      height: 24,
      backgroundColor: 'hsl(356 94% 45%)',
      border: 'none',
      mixBlendMode: 'difference' as const,
      borderRadius: 2,
    },
  };

  const currentVariant = variants[cursorVariant];

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: currentVariant.width,
          height: currentVariant.height,
          backgroundColor: currentVariant.backgroundColor,
          border: currentVariant.border,
          borderRadius: cursorVariant === 'text' ? 2 : '50%',
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
        }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-[10px] font-mono text-porcelain uppercase tracking-wider whitespace-nowrap"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Trailing dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-alchemy-red/50 pointer-events-none z-[99998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Hide default cursor */}
      <style>{`
        @media (pointer: fine) {
          html, body, * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};
