import { memo, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionShellProps {
  children: ReactNode;
  className?: string;
  id?: string;
  mode?: 'hero' | 'system' | 'gallery' | 'experience' | 'offer' | 'contact';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const maxWidthClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-6xl',
  '2xl': 'max-w-7xl',
  full: 'max-w-none',
};

const paddingClasses = {
  none: 'py-0',
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-24',
  lg: 'py-20 sm:py-32',
  xl: 'py-24 sm:py-40',
};

export const SectionShell = memo(({
  children,
  className,
  id,
  maxWidth = 'xl',
  padding = 'lg',
}: SectionShellProps) => {
  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden',
        paddingClasses[padding],
        className
      )}
    >
      <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', maxWidthClasses[maxWidth])}>
        {children}
      </div>
    </section>
  );
});

SectionShell.displayName = 'SectionShell';
