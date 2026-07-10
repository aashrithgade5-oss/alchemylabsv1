// Pure CSS molten orb: layered radial gradients on a slow transform drift.
// No JS animation loop; reduced motion kills the drift via .furnace-orb.
interface MoltenOrbProps {
  /** Diameter, any CSS length. */
  size?: string;
  className?: string;
  /** Drift period in seconds (30–60 reads as weight, not motion). */
  duration?: number;
  style?: React.CSSProperties;
}

export function MoltenOrb({ size = '48rem', className = '', duration = 48, style }: MoltenOrbProps) {
  return (
    <div
      aria-hidden
      className={`furnace-orb pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `
          radial-gradient(circle at 38% 40%, rgba(255,160,40,0.55) 0%, transparent 42%),
          radial-gradient(circle at 55% 60%, rgba(255,77,28,0.75) 0%, rgba(201,58,20,0.45) 38%, transparent 68%),
          radial-gradient(circle at 50% 50%, rgba(201,58,20,0.5) 0%, transparent 75%)
        `,
        filter: 'blur(60px)',
        animation: `furnace-orb-drift ${duration}s cubic-bezier(0.45, 0, 0.55, 1) infinite, furnace-orb-breathe ${Math.round(duration * 0.6)}s ease-in-out infinite`,
        ...style,
      }}
    />
  );
}
