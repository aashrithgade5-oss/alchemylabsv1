import { useEffect, useState, useRef } from 'react';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  // Check if desktop (no touch, has fine pointer)
  const isDesktop = typeof window !== 'undefined' && 
    !('ontouchstart' in window) && 
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  useEffect(() => {
    if (!isDesktop) return;

    const updateCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Hover detection via event delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      const isInteractive = target.closest('button, a, [role="button"], input, textarea, select, [data-cursor="pointer"]');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    
    rafRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDesktop, isVisible]);

  if (!isDesktop) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{
          zIndex: 999999,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.15s ease',
        }}
      >
        {/* Main dot */}
        <div
          className="absolute rounded-full bg-alchemy-red transition-all duration-200 ease-out"
          style={{
            width: isHovering ? 40 : 8,
            height: isHovering ? 40 : 8,
            opacity: isHovering ? 0.15 : 0.9,
            transform: 'translate(-50%, -50%)',
            border: isHovering ? '1px solid rgba(225, 6, 19, 0.5)' : 'none',
          }}
        />
        {/* Outer ring */}
        <div
          className="absolute rounded-full border border-alchemy-red/20 transition-all duration-300 ease-out"
          style={{
            width: isHovering ? 56 : 28,
            height: isHovering ? 56 : 28,
            transform: 'translate(-50%, -50%)',
            opacity: isHovering ? 0.8 : 0.4,
          }}
        />
      </div>

      {/* Hide default cursor */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
};
