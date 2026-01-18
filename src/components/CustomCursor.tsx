import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorVariant = 'default' | 'hover' | 'text' | 'hidden';

export const CustomCursor = () => {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const onMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [cursorX, cursorY, isVisible]);

  const onMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const onMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Check if device supports hover (not touch)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsMobile(!mediaQuery.matches);

    if (mediaQuery.matches) {
      window.addEventListener('mousemove', onMouseMove);
      document.body.addEventListener('mouseleave', onMouseLeave);
      document.body.addEventListener('mouseenter', onMouseEnter);

      // Set up hover detection for interactive elements
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'
      );
      const textElements = document.querySelectorAll(
        'h1, h2, h3, h4, h5, h6, p, [data-cursor="text"]'
      );

      const handleMouseEnterInteractive = () => setCursorVariant('hover');
      const handleMouseLeaveInteractive = () => setCursorVariant('default');
      const handleMouseEnterText = () => setCursorVariant('text');
      const handleMouseLeaveText = () => setCursorVariant('default');

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });

      textElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterText);
        el.addEventListener('mouseleave', handleMouseLeaveText);
      });

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        document.body.removeEventListener('mouseleave', onMouseLeave);
        document.body.removeEventListener('mouseenter', onMouseEnter);

        interactiveElements.forEach((el) => {
          el.removeEventListener('mouseenter', handleMouseEnterInteractive);
          el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
        });

        textElements.forEach((el) => {
          el.removeEventListener('mouseenter', handleMouseEnterText);
          el.removeEventListener('mouseleave', handleMouseLeaveText);
        });
      };
    }
  }, [onMouseMove, onMouseLeave, onMouseEnter]);

  // Don't render on mobile/touch devices
  if (isMobile) return null;

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: 'rgba(225, 6, 19, 0.8)',
      mixBlendMode: 'difference' as const,
    },
    hover: {
      width: 48,
      height: 48,
      backgroundColor: 'rgba(225, 6, 19, 0.15)',
      border: '1px solid rgba(225, 6, 19, 0.5)',
      mixBlendMode: 'normal' as const,
    },
    text: {
      width: 4,
      height: 24,
      backgroundColor: 'rgba(225, 6, 19, 0.6)',
      borderRadius: 2,
      mixBlendMode: 'difference' as const,
    },
    hidden: {
      width: 0,
      height: 0,
      opacity: 0,
    },
  };

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={cursorVariant}
        variants={variants}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        initial={false}
      />

      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-alchemy-red/20"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorVariant === 'hover' ? 64 : 32,
          height: cursorVariant === 'hover' ? 64 : 32,
          opacity: isVisible ? (cursorVariant === 'text' ? 0 : 0.5) : 0,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />

      {/* Hide default cursor globally */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};
