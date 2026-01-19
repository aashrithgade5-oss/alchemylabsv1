import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

type CursorVariant = 'default' | 'hover' | 'click' | 'text' | 'view' | 'drag' | 'hidden';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export const CustomCursor = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [cursorText, setCursorText] = useState('');
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const trailIdRef = useRef(0);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Different spring configs for different effects
  const smoothConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const laggyConfig = { damping: 15, stiffness: 150, mass: 1 };
  const bouncyConfig = { damping: 12, stiffness: 500, mass: 0.3 };
  
  const cursorX = useSpring(mouseX, smoothConfig);
  const cursorY = useSpring(mouseY, smoothConfig);
  const trailX = useSpring(mouseX, laggyConfig);
  const trailY = useSpring(mouseY, laggyConfig);
  const glowX = useSpring(mouseX, bouncyConfig);
  const glowY = useSpring(mouseY, bouncyConfig);

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
    
    // Add trail point
    trailIdRef.current += 1;
    setTrail(prev => {
      const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: trailIdRef.current }];
      return newTrail.slice(-12); // Keep last 12 points
    });
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
    const isHidden = target.closest('[data-cursor-hidden]');
    
    if (isHidden) {
      setCursorVariant('hidden');
      setCursorText('');
    } else if (hasDataCursor) {
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

  // Clean up old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.slice(-8));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  if (!isDesktop) return null;
  if (cursorVariant === 'hidden') return null;

  const getSize = () => {
    switch (cursorVariant) {
      case 'hover': return 64;
      case 'click': return 8;
      case 'text': return 4;
      case 'view': return 100;
      case 'drag': return 80;
      default: return 16;
    }
  };

  const showText = cursorVariant === 'view' || cursorVariant === 'drag';

  return (
    <>
      {/* Trailing particles */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="pointer-events-none rounded-full"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            left: point.x,
            top: point.y,
            translateX: '-50%',
            translateY: '-50%',
            width: 8 - index * 0.5,
            height: 8 - index * 0.5,
            background: `radial-gradient(circle, rgba(225, 6, 19, ${0.4 - index * 0.03}) 0%, transparent 70%)`,
            zIndex: 2147483640 + index,
          }}
        />
      ))}

      {/* Ambient glow - large, soft, follows with delay */}
      <motion.div
        className="pointer-events-none rounded-full"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          width: 120,
          height: 120,
          background: 'radial-gradient(circle, rgba(225, 6, 19, 0.08) 0%, transparent 70%)',
          zIndex: 2147483644,
          opacity: isVisible && cursorVariant !== 'click' ? 1 : 0,
          filter: 'blur(20px)',
        }}
      />

      {/* Trail ring - follows with more delay */}
      <motion.div
        className="pointer-events-none rounded-full border border-alchemy-red/20"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: 48,
          height: 48,
          zIndex: 2147483645,
          opacity: isVisible && cursorVariant === 'default' ? 0.4 : 0,
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
          height: cursorVariant === 'text' ? 28 : getSize(),
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { type: 'spring', damping: 20, stiffness: 300 },
          height: { type: 'spring', damping: 20, stiffness: 300 },
          opacity: { duration: 0.15 },
        }}
      >
        <motion.div
          className="w-full h-full flex items-center justify-center backdrop-blur-sm"
          animate={{
            backgroundColor: showText 
              ? 'rgba(225, 6, 19, 0.95)' 
              : (cursorVariant === 'hover' ? 'rgba(225, 6, 19, 0.1)' : 'rgba(225, 6, 19, 1)'),
            borderWidth: cursorVariant === 'hover' && !showText ? 2 : 0,
            borderColor: 'rgba(225, 6, 19, 1)',
            borderRadius: cursorVariant === 'text' ? 2 : 999,
            scale: cursorVariant === 'click' ? 0.5 : 1,
            boxShadow: showText || cursorVariant === 'hover' 
              ? '0 0 30px rgba(225, 6, 19, 0.5), 0 0 60px rgba(225, 6, 19, 0.2)' 
              : '0 0 15px rgba(225, 6, 19, 0.4)',
          }}
          style={{
            borderStyle: 'solid',
            mixBlendMode: showText ? 'normal' : (cursorVariant === 'hover' ? 'normal' : 'difference'),
          }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Cursor text */}
          <AnimatePresence>
            {showText && cursorText && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-[11px] font-mono uppercase tracking-[0.15em] text-porcelain font-medium"
              >
                {cursorText}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Dot core */}
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
          width: 5,
          height: 5,
          backgroundColor: 'hsl(356 94% 45%)',
          boxShadow: '0 0 10px rgba(225, 6, 19, 0.8), 0 0 20px rgba(225, 6, 19, 0.4)',
          zIndex: 2147483648,
        }}
        animate={{
          opacity: isVisible && cursorVariant !== 'view' && cursorVariant !== 'drag' ? 1 : 0,
          scale: cursorVariant === 'click' ? 2.5 : 1,
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
