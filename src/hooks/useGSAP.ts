import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Hook for scroll-triggered animations
export const useScrollAnimation = () => {
  useEffect(() => {
    // Batch animations for performance
    ScrollTrigger.batch('.gsap-reveal', {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
        });
      },
      start: 'top 85%',
      once: true,
    });

    // Fade from left
    ScrollTrigger.batch('.gsap-reveal-left', {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
        });
      },
      start: 'top 85%',
      once: true,
    });

    // Fade from right
    ScrollTrigger.batch('.gsap-reveal-right', {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
        });
      },
      start: 'top 85%',
      once: true,
    });

    // Scale reveal
    ScrollTrigger.batch('.gsap-reveal-scale', {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'back.out(1.7)',
        });
      },
      start: 'top 85%',
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
};

// Hook for parallax effect
export const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: () => window.innerHeight * speed * -1,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === ref.current) trigger.kill();
      });
    };
  }, [speed]);

  return ref;
};

// Hook for text split animation
export const useTextReveal = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const words = ref.current.querySelectorAll('.word');

    gsap.from(words, {
      y: 100,
      opacity: 0,
      rotation: 10,
      stagger: 0.05,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        once: true,
      },
    });
  }, []);

  return ref;
};

// Initialize GSAP global settings
export const initGSAP = () => {
  // Set default ease
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  });

  // Configure ScrollTrigger
  ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
  });

  // Set initial states for reveal animations
  gsap.set('.gsap-reveal', { opacity: 0, y: 50 });
  gsap.set('.gsap-reveal-left', { opacity: 0, x: -50 });
  gsap.set('.gsap-reveal-right', { opacity: 0, x: 50 });
  gsap.set('.gsap-reveal-scale', { opacity: 0, scale: 0.9 });
};

export { gsap, ScrollTrigger };
