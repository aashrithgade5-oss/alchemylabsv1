import { useEffect, useRef, useCallback, createContext, useContext, useState } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

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

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisRef = useRef<Lenis | null>(null);
  const [isReady, setIsReady] = useState(false);

  const scrollTo = useCallback((
    target: string | HTMLElement | number, 
    options?: { offset?: number; duration?: number }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: options?.offset ?? -100,
        duration: options?.duration ?? 1.5,
      });
    }
  }, []);

  useEffect(() => {
    // Check if mobile or prefers reduced motion
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Skip Lenis on mobile for better native scroll performance
    if (isMobile || prefersReducedMotion) {
      setIsReady(true);
      return;
    }

    // Initialize Lenis with butter-smooth optimized settings
    const lenis = new Lenis({
      duration: 1.0, // Slightly faster for snappier feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.2, // Reduced for less over-scroll
      infinite: false,
      wheelMultiplier: 0.9, // Slightly higher for better response
      lerp: 0.1, // Smooth interpolation factor
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP ticker for consistent 60fps updates
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0); // Disable lag smoothing for consistent frames

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
              duration: 1.2,
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Pause Lenis when interacting with modals/overlays
    const handleModalOpen = () => lenis.stop();
    const handleModalClose = () => lenis.start();

    document.addEventListener('modal-open', handleModalOpen);
    document.addEventListener('modal-close', handleModalClose);

    setIsReady(true);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
      document.removeEventListener('modal-open', handleModalOpen);
      document.removeEventListener('modal-close', handleModalClose);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
