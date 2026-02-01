import { memo, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EyebrowLabelProps {
  children: ReactNode;
  className?: string;
  color?: 'red' | 'white' | 'muted';
}

const colorClasses = {
  red: 'text-alchemy-red',
  white: 'text-porcelain',
  muted: 'text-porcelain/50',
};

export const EyebrowLabel = memo(({ children, className, color = 'red' }: EyebrowLabelProps) => {
  return (
    <span
      className={cn(
        'font-mono text-[11px] sm:text-xs tracking-[0.18em] uppercase block',
        colorClasses[color],
        className
      )}
    >
      {children}
    </span>
  );
});

EyebrowLabel.displayName = 'EyebrowLabel';
