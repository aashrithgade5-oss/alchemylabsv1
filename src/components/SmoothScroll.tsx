import { useEffect, useRef, useCallback, createContext, useContext, useState, memo } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { usePerformance } from '@/contexts/PerformanceContext';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: { offset?: number; duration?: number }) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll = memo(({ children }: SmoothScrollProps) => {
  const lenisRef = useRef<Lenis | null>(null);
  const { tier } = usePerformance();
  const [contextValue, setContextValue] = useState<SmoothScrollContextType>({
    lenis: null,
    scrollTo: () => {},
  });

  const scrollTo = useCallback((
    target: string | HTMLElement | number, 
    options?: { offset?: number; duration?: number }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: options?.offset ?? -100,
        duration: options?.duration ?? 1.2,
      });
    }
  }, []);

  useEffect(() => {
    // Check if mobile or prefers reduced motion
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Skip Lenis on mobile and reduced motion for native performance
    if (isMobile || prefersReducedMotion) {
      setContextValue({ lenis: null, scrollTo: () => {
        // Fallback to native scroll
      }});
      return;
    }

    // Initialize Lenis with optimized settings
    const lenis = new Lenis({
      duration: 0.8, // Faster for snappier response
      easing: (t) => 1 - Math.pow(1 - t, 3), // Cubic ease-out (simpler, faster)
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1,
      wheelMultiplier: 0.8,
      lerp: tier === 'low' ? 0.2 : tier === 'medium' ? 0.15 : 0.12,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use RAF for animation loop
    let rafId: number;
    const animate = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    // Handle anchor links
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
              duration: 1,
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { passive: false });

    // Pause on modal
    const handleModalOpen = () => lenis.stop();
    const handleModalClose = () => lenis.start();

    document.addEventListener('modal-open', handleModalOpen);
    document.addEventListener('modal-close', handleModalClose);

    setContextValue({ lenis, scrollTo });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
      document.removeEventListener('modal-open', handleModalOpen);
      document.removeEventListener('modal-close', handleModalClose);
    };
  }, [scrollTo]);

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  );
});

SmoothScroll.displayName = 'SmoothScroll';
