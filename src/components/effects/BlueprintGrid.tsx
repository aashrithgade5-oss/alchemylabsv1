import { memo } from 'react';

interface BlueprintGridProps {
  opacity?: number;
}

export const BlueprintGrid = memo(({ opacity = 0.03 }: BlueprintGridProps) => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ opacity }}
    preserveAspectRatio="none"
  >
    <defs>
      <pattern
        id="blueprint-grid"
        width="50"
        height="50"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 50 0 L 0 0 0 50"
          fill="none"
          stroke="hsl(var(--alchemy-red))"
          strokeWidth="0.5"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
  </svg>
));

BlueprintGrid.displayName = 'BlueprintGrid';
