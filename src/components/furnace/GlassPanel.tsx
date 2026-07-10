'use client';

import { useRef, useCallback } from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

// Carbon glass: backdrop blur, hairline border, and a specular highlight
// that follows the pointer through two CSS variables.
export function GlassPanel({ children, className = '' }: GlassPanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--gx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty('--gy', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={`relative overflow-hidden rounded-2xl border border-line bg-carbon/60 backdrop-blur-xl ${className}`}
      style={{ ['--gx' as string]: '50%', ['--gy' as string]: '0%' }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(32rem circle at var(--gx) var(--gy), rgba(237,230,221,0.05), transparent 55%)',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
