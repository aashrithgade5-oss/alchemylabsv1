import { useEffect, useRef, useState, ReactNode, memo } from 'react';
import { motion } from 'framer-motion';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
  skeleton?: ReactNode;
  minHeight?: string;
}

// Default skeleton component
const DefaultSkeleton = memo(({ minHeight }: { minHeight: string }) => (
  <div 
    className="w-full animate-pulse"
    style={{ minHeight }}
  >
    <div className="space-y-6 p-8">
      <div className="h-8 bg-porcelain/5 rounded-lg w-1/3" />
      <div className="space-y-3">
        <div className="h-4 bg-porcelain/5 rounded w-full" />
        <div className="h-4 bg-porcelain/5 rounded w-5/6" />
        <div className="h-4 bg-porcelain/5 rounded w-4/6" />
      </div>
      <div className="grid grid-cols-3 gap-4 pt-4">
        <div className="h-32 bg-porcelain/5 rounded-xl" />
        <div className="h-32 bg-porcelain/5 rounded-xl" />
        <div className="h-32 bg-porcelain/5 rounded-xl" />
      </div>
    </div>
  </div>
));
DefaultSkeleton.displayName = 'DefaultSkeleton';

// Intersection Observer based lazy loading wrapper
export const LazySection = memo(({
  children,
  className = '',
  rootMargin = '200px',
  threshold = 0.1,
  skeleton,
  minHeight = '400px'
}: LazySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  useEffect(() => {
    if (isVisible) {
      // Small delay for smooth transition
      const timer = setTimeout(() => setHasLoaded(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div ref={ref} className={className} style={{ minHeight: isVisible ? 'auto' : minHeight }}>
      {!isVisible && (skeleton || <DefaultSkeleton minHeight={minHeight} />)}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hasLoaded ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
});

LazySection.displayName = 'LazySection';

// Skeleton variants for different content types
export const SectionSkeleton = memo(({ variant = 'default' }: { variant?: 'default' | 'hero' | 'grid' | 'text' }) => {
  if (variant === 'hero') {
    return (
      <div className="w-full min-h-[80vh] animate-pulse flex items-center justify-center">
        <div className="text-center space-y-6 max-w-2xl mx-auto px-6">
          <div className="h-6 bg-porcelain/5 rounded w-32 mx-auto" />
          <div className="h-16 bg-porcelain/5 rounded-lg w-full" />
          <div className="h-8 bg-porcelain/5 rounded w-2/3 mx-auto" />
          <div className="h-12 bg-porcelain/5 rounded-full w-48 mx-auto mt-8" />
        </div>
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className="w-full animate-pulse p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-video bg-porcelain/5 rounded-xl" />
              <div className="h-4 bg-porcelain/5 rounded w-3/4" />
              <div className="h-3 bg-porcelain/5 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className="w-full animate-pulse p-8 max-w-3xl mx-auto">
        <div className="space-y-4">
          <div className="h-8 bg-porcelain/5 rounded w-1/2" />
          <div className="h-4 bg-porcelain/5 rounded w-full" />
          <div className="h-4 bg-porcelain/5 rounded w-5/6" />
          <div className="h-4 bg-porcelain/5 rounded w-4/5" />
          <div className="h-4 bg-porcelain/5 rounded w-full" />
          <div className="h-4 bg-porcelain/5 rounded w-3/4" />
        </div>
      </div>
    );
  }

  return <DefaultSkeleton minHeight="400px" />;
});

SectionSkeleton.displayName = 'SectionSkeleton';
