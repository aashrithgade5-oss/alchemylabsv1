import { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  // Enable only after mount on desktop
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    
    if (!isTouch && hasFinePointer) {
      setEnabled(true);
      console.log('[Cursor] Enabled - desktop detected');
    } else {
      console.log('[Cursor] Disabled - touch device or no fine pointer');
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let raf: number;

    const update = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x - 14}px, ${pos.current.y - 14}px)`;
      }

      raf = requestAnimationFrame(update);
    };

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      // Check hover state
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el?.closest('button, a, [role="button"], input, textarea, select')) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    // Start animation
    raf = requestAnimationFrame(update);
    window.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: hovering ? 32 : 8,
          height: hovering ? 32 : 8,
          backgroundColor: hovering ? 'rgba(225, 6, 19, 0.15)' : 'rgba(225, 6, 19, 0.85)',
          border: hovering ? '1px solid rgba(225, 6, 19, 0.4)' : 'none',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 2147483647,
          transition: 'width 0.15s, height 0.15s, background-color 0.15s',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          border: '1px solid rgba(225, 6, 19, 0.25)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 2147483646,
          opacity: hovering ? 0 : 0.5,
          transition: 'opacity 0.15s',
        }}
      />
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          html, body, * { cursor: none !important; }
        }
      `}</style>
    </>
  );
};
