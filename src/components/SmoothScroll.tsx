import { useEffect, useRef, useCallback, createContext, useContext } from 'react';
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
  const rafRef = useRef<number | null>(null);

  const raf = useCallback((time: number) => {
    lenisRef.current?.raf(time);
    rafRef.current = requestAnimationFrame(raf);
  }, []);

  const scrollTo = useCallback((
    target: string | HTMLElement | number, 
    options?: { offset?: number; duration?: number }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: options?.offset ?? -100,
        duration: options?.duration ?? 2,
      });
    }
  }, []);

  useEffect(() => {
    // Initialize Lenis with premium, luxurious settings
    const lenis = new Lenis({
      duration: 1.4, // Smooth but responsive
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1, // Linear interpolation for buttery smoothness
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger for seamless integration
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

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
              duration: 2,
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

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
      document.removeEventListener('modal-open', handleModalOpen);
      document.removeEventListener('modal-close', handleModalClose);
    };
  }, [raf]);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
