'use client';

import { useRef, useState, useCallback } from 'react';
import { m } from 'framer-motion';
import Link from 'next/link';

type Variant = 'ember' | 'ghost' | 'glass';

interface MagneticCTAProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: Variant;
  className?: string;
  disabled?: boolean;
}

const variantClasses: Record<Variant, string> = {
  ember:
    'bg-ember text-void hover:bg-amber focus-visible:bg-amber ' +
    'shadow-[0_0_32px_rgba(255,77,28,0.25)]',
  ghost:
    'border border-line text-bone hover:border-ember/60 hover:text-bone ' +
    'bg-transparent',
  // Phase 1 opaque-mode glass pod: same liquid-glass base as GlassPanel,
  // no backdrop-filter:url() edge (small floating CTA, not a hero surface).
  glass: 'liquid-glass text-bone hover:border-ember/40',
};

const spring = { type: 'spring' as const, stiffness: 320, damping: 18, mass: 0.5 };

// Magnetic pull capped at 12px; press compresses to 0.97. Adapted from
// src/components/MagneticButton.tsx without the sound layer.
export function MagneticCTA({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'ember',
  className = '',
  disabled = false,
}: MagneticCTAProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = useCallback(
    (e: React.PointerEvent) => {
      if (disabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const cap = 12;
      setOffset({
        x: Math.max(-cap, Math.min(cap, x * 0.18)),
        y: Math.max(-cap, Math.min(cap, y * 0.18)),
      });
    },
    [disabled],
  );

  const handleLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  const inner = (
    <m.span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      animate={{ x: offset.x, y: offset.y }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={spring}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-sans text-sm font-semibold tracking-wide transition-colors duration-300 ${variantClasses[variant]} ${disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'} ${className}`}
    >
      {children}
    </m.span>
  );

  if (href) {
    return href.startsWith('#') ? (
      <a href={href} className="inline-block">
        {inner}
      </a>
    ) : (
      <Link href={href} className="inline-block">
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className="inline-block bg-transparent">
      {inner}
    </button>
  );
}
