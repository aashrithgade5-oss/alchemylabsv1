import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

interface AtmosphereConfig {
  gradientPrimary: string;
  gradientSecondary: string;
  pulseColor: string;
  vibe: string;
  accentGlow: string;
}

interface PageAtmosphereContextType {
  atmosphere: AtmosphereConfig;
  scrollProgress: number;
  hasVisitedContact: boolean;
}

const atmosphereConfigs: Record<string, AtmosphereConfig> = {
  '/': {
    gradientPrimary: 'radial-gradient(ellipse at 50% 80%, rgba(225, 6, 19, 0.15) 0%, transparent 60%)',
    gradientSecondary: 'radial-gradient(ellipse at 20% 20%, rgba(225, 6, 19, 0.08) 0%, transparent 50%)',
    pulseColor: 'rgba(225, 6, 19, 0.1)',
    vibe: 'alive',
    accentGlow: 'rgba(225, 6, 19, 0.2)',
  },
  '/solutions': {
    gradientPrimary: 'linear-gradient(180deg, hsl(240 8% 5%) 0%, hsl(240 8% 8%) 50%, hsl(240 5% 4%) 100%)',
    gradientSecondary: 'radial-gradient(ellipse at 70% 30%, rgba(225, 6, 19, 0.06) 0%, transparent 60%)',
    pulseColor: 'rgba(225, 6, 19, 0.08)',
    vibe: 'architectural',
    accentGlow: 'rgba(80, 4, 10, 0.15)',
  },
  '/work': {
    gradientPrimary: 'linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(0 0% 5%) 50%, hsl(0 0% 2%) 100%)',
    gradientSecondary: 'radial-gradient(ellipse at 80% 70%, rgba(225, 6, 19, 0.05) 0%, transparent 50%)',
    pulseColor: 'rgba(225, 6, 19, 0.06)',
    vibe: 'gallery',
    accentGlow: 'rgba(225, 6, 19, 0.1)',
  },
  '/about': {
    gradientPrimary: 'linear-gradient(180deg, hsl(30 5% 4%) 0%, hsl(20 8% 6%) 50%, hsl(25 5% 3%) 100%)',
    gradientSecondary: 'radial-gradient(ellipse at 30% 50%, rgba(225, 6, 19, 0.06) 0%, transparent 60%)',
    pulseColor: 'rgba(225, 6, 19, 0.08)',
    vibe: 'human',
    accentGlow: 'rgba(180, 60, 40, 0.1)',
  },
  '/contact': {
    gradientPrimary: 'radial-gradient(ellipse at 50% 50%, rgba(225, 6, 19, 0.18) 0%, transparent 70%)',
    gradientSecondary: 'linear-gradient(180deg, hsl(356 40% 5%) 0%, hsl(356 30% 4%) 100%)',
    pulseColor: 'rgba(225, 6, 19, 0.12)',
    vibe: 'decisive',
    accentGlow: 'rgba(225, 6, 19, 0.25)',
  },
  '/journal': {
    gradientPrimary: 'linear-gradient(180deg, hsl(240 5% 4%) 0%, hsl(240 5% 6%) 100%)',
    gradientSecondary: 'radial-gradient(ellipse at 50% 20%, rgba(225, 6, 19, 0.06) 0%, transparent 50%)',
    pulseColor: 'rgba(225, 6, 19, 0.05)',
    vibe: 'editorial',
    accentGlow: 'rgba(225, 6, 19, 0.1)',
  },
  '/book-sprint': {
    gradientPrimary: 'radial-gradient(ellipse at 50% 30%, rgba(225, 6, 19, 0.2) 0%, transparent 60%)',
    gradientSecondary: 'radial-gradient(ellipse at 80% 80%, rgba(80, 4, 10, 0.15) 0%, transparent 50%)',
    pulseColor: 'rgba(225, 6, 19, 0.15)',
    vibe: 'conversion',
    accentGlow: 'rgba(225, 6, 19, 0.3)',
  },
};

const defaultAtmosphere: AtmosphereConfig = atmosphereConfigs['/'];

const PageAtmosphereContext = createContext<PageAtmosphereContextType>({
  atmosphere: defaultAtmosphere,
  scrollProgress: 0,
  hasVisitedContact: false,
});

export const usePageAtmosphere = () => useContext(PageAtmosphereContext);

interface PageAtmosphereProviderProps {
  children: ReactNode;
}

export const PageAtmosphereProvider = ({ children }: PageAtmosphereProviderProps) => {
  const location = useLocation();
  const [atmosphere, setAtmosphere] = useState<AtmosphereConfig>(defaultAtmosphere);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasVisitedContact, setHasVisitedContact] = useState(false);

  // Check session storage for contact visit
  useEffect(() => {
    const visited = sessionStorage.getItem('hasVisitedContact');
    if (visited) setHasVisitedContact(true);
  }, []);

  // Track contact page visits
  useEffect(() => {
    if (location.pathname === '/contact') {
      sessionStorage.setItem('hasVisitedContact', 'true');
      setHasVisitedContact(true);
    }
  }, [location.pathname]);

  // Update atmosphere based on route
  useEffect(() => {
    const basePath = '/' + location.pathname.split('/')[1];
    const config = atmosphereConfigs[location.pathname] || atmosphereConfigs[basePath] || defaultAtmosphere;
    setAtmosphere(config);
  }, [location.pathname]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrolled / maxScroll : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <PageAtmosphereContext.Provider value={{ atmosphere, scrollProgress, hasVisitedContact }}>
      {children}
    </PageAtmosphereContext.Provider>
  );
};

// Enhanced Atmospheric Background Component with mouse reactivity
export const AtmosphericBackground = () => {
  const { atmosphere, scrollProgress } = usePageAtmosphere();
  const { scrollY } = useScroll();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 30, damping: 30 });
  
  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  // Reduce grain opacity and darken background on scroll
  const grainOpacity = useTransform(scrollY, [0, 300], [0.025, 0.015]);
  const backgroundDarken = useTransform(scrollY, [0, 300], [0, 0.03]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary gradient layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={atmosphere.vibe + '-primary'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          style={{ background: atmosphere.gradientPrimary }}
        />
      </AnimatePresence>

      {/* Secondary gradient layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={atmosphere.vibe + '-secondary'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="absolute inset-0"
          style={{ background: atmosphere.gradientSecondary }}
        />
      </AnimatePresence>

      {/* Mouse-reactive gradient blob */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px]"
        style={{
          background: `radial-gradient(circle, ${atmosphere.accentGlow} 0%, transparent 70%)`,
          left: smoothMouseX,
          top: smoothMouseY,
          x: '-50%',
          y: '-50%',
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Subtle pulse effect */}
      <motion.div
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full blur-[250px]"
        style={{ backgroundColor: atmosphere.pulseColor }}
      />

      {/* Corner accent glows */}
      <motion.div
        className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full blur-[150px]"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ backgroundColor: atmosphere.pulseColor }}
      />
      
      <motion.div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[150px]"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
        style={{ backgroundColor: atmosphere.pulseColor }}
      />

      {/* Animated grain texture */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: grainOpacity }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      {/* Scroll-responsive darkening overlay */}
      <motion.div
        style={{ opacity: backgroundDarken }}
        className="absolute inset-0 bg-alchemy-black"
      />
    </div>
  );
};
