import { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });
  const magnetTarget = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  // Synchronous desktop check
  const isDesktop = typeof window !== 'undefined' && 
    !('ontouchstart' in window) && 
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  useEffect(() => {
    if (!isDesktop) return;

    let animationId: number;

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animate = () => {
      // Apply magnetic pull if near interactive element
      const targetX = magnetTarget.current.active ? magnetTarget.current.x : mousePos.current.x;
      const targetY = magnetTarget.current.active ? magnetTarget.current.y : mousePos.current.y;
      
      // Smooth interpolation
      cursorPos.current.x = lerp(cursorPos.current.x, targetX, 0.15);
      cursorPos.current.y = lerp(cursorPos.current.y, targetY, 0.15);

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${cursorPos.current.x}px`;
        cursorDotRef.current.style.top = `${cursorPos.current.y}px`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = `${cursorPos.current.x}px`;
        cursorRingRef.current.style.top = `${cursorPos.current.y}px`;
      }

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Check for magnetic targets
      const target = e.target as Element;
      const interactiveEl = target.closest('button, a, [role="button"], [data-magnetic]') as HTMLElement;
      
      if (interactiveEl) {
        const rect = interactiveEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        // Magnetic threshold (pixels from center)
        const threshold = Math.max(rect.width, rect.height) * 0.8;
        
        if (distance < threshold) {
          // Pull cursor toward center with strength based on distance
          const pull = 0.3 * (1 - distance / threshold);
          magnetTarget.current = {
            x: e.clientX - distX * pull,
            y: e.clientY - distY * pull,
            active: true
          };
          setIsHovering(true);
        } else {
          magnetTarget.current.active = false;
          setIsHovering(false);
        }
      } else {
        magnetTarget.current.active = false;
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -100, y: -100 };
      magnetTarget.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          width: isHovering ? '40px' : '8px',
          height: isHovering ? '40px' : '8px',
          backgroundColor: isHovering ? 'rgba(225, 6, 19, 0.12)' : 'rgba(225, 6, 19, 0.9)',
          border: isHovering ? '1px solid rgba(225, 6, 19, 0.5)' : 'none',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s, background-color 0.2s, border 0.2s',
          willChange: 'left, top',
        }}
      />
      
      {/* Cursor ring */}
      <div
        ref={cursorRingRef}
        style={{
          position: 'fixed',
          width: isHovering ? '56px' : '28px',
          height: isHovering ? '56px' : '28px',
          border: '1px solid rgba(225, 6, 19, 0.2)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999998,
          transform: 'translate(-50%, -50%)',
          opacity: isHovering ? 0.8 : 0.4,
          transition: 'width 0.3s, height 0.3s, opacity 0.2s',
          willChange: 'left, top',
        }}
      />

      {/* Hide default cursor */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
};
