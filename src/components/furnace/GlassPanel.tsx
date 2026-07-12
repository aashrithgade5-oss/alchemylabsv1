'use client';

import { useRef, useCallback } from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Liquid glass with refraction: the .liquid-glass base (blur + saturate +
 * brightness + inset highlight), a displacement-mapped edge ring that bends
 * the backdrop (.glass-refract-edge, filter defined in app/layout.tsx), a
 * static specular line on the top edge, and a pointer-tracked highlight.
 */
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
      className={`liquid-glass relative overflow-hidden rounded-2xl ${className}`}
      style={{ ['--gx' as string]: '50%', ['--gy' as string]: '0%' }}
    >
      {/* refraction ring: backdrop bends through the panel edges */}
      <div aria-hidden className="glass-refract-edge pointer-events-none absolute inset-0 rounded-[inherit]" />
      {/* specular highlight, top edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />
      {/* pointer-tracked sheen */}
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
