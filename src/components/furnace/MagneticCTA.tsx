'use client';

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

// Calm, critically-damped press — no overshoot. The old magnetic pull
// (springy follow-the-cursor) read as a wiggle; hover is now a 1px lift and
// one light sheen passing across the pill (.cta-sheen in index.css).
const press = { type: 'spring' as const, stiffness: 500, damping: 40 };

export function MagneticCTA({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'ember',
  className = '',
  disabled = false,
}: MagneticCTAProps) {
  const inner = (
    <m.span
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={press}
      className={`cta-sheen relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 font-sans text-sm font-semibold tracking-wide transition-[transform,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${disabled ? '' : 'hover:-translate-y-px'} ${variantClasses[variant]} ${disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'} ${className}`}
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
