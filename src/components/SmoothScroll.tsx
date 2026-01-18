import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  const raf = useCallback((time: number) => {
    lenisRef.current?.raf(time);
    rafRef.current = requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    // Initialize Lenis with luxurious settings
    const lenis = new Lenis({
      duration: 1.8, // Slower, more premium feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Start animation loop
    rafRef.current = requestAnimationFrame(raf);

    // Handle anchor links for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            lenis.scrollTo(targetElement as HTMLElement, {
              offset: -100,
              duration: 2, // Longer, smoother scroll
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [raf]);

  return <>{children}</>;
};
