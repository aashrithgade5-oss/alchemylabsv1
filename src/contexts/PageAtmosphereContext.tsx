import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface AtmosphereConfig {
  gradientPrimary: string;
  gradientSecondary: string;
  pulseColor: string;
  vibe: string;
}

interface PageAtmosphereContextType {
  atmosphere: AtmosphereConfig;
  scrollProgress: number;
  hasVisitedContact: boolean;
}

const atmosphereConfigs: Record<string, AtmosphereConfig> = {
  '/': {
    gradientPrimary: 'radial-gradient(ellipse at 50% 80%, rgba(225, 6, 19, 0.12) 0%, transparent 60%)',
    gradientSecondary: 'radial-gradient(ellipse at 20% 20%, rgba(225, 6, 19, 0.05) 0%, transparent 50%)',
    pulseColor: 'rgba(225, 6, 19, 0.08)',
    vibe: 'alive',
  },
  '/solutions': {
    gradientPrimary: 'linear-gradient(180deg, hsl(240 8% 5%) 0%, hsl(240 8% 8%) 50%, hsl(240 5% 4%) 100%)',
    gradientSecondary: 'radial-gradient(ellipse at 70% 30%, rgba(40, 40, 45, 0.4) 0%, transparent 60%)',
    pulseColor: 'rgba(60, 60, 65, 0.1)',
    vibe: 'architectural',
  },
  '/work': {
    gradientPrimary: 'linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(0 0% 5%) 50%, hsl(0 0% 2%) 100%)',
    gradientSecondary: 'radial-gradient(ellipse at 80% 70%, rgba(80, 80, 80, 0.08) 0%, transparent 50%)',
    pulseColor: 'rgba(50, 50, 50, 0.05)',
    vibe: 'gallery',
  },
  '/about': {
    gradientPrimary: 'linear-gradient(180deg, hsl(30 5% 4%) 0%, hsl(20 8% 6%) 50%, hsl(25 5% 3%) 100%)',
    gradientSecondary: 'radial-gradient(ellipse at 30% 50%, rgba(80, 60, 40, 0.08) 0%, transparent 60%)',
    pulseColor: 'rgba(100, 80, 60, 0.06)',
    vibe: 'human',
  },
  '/contact': {
    gradientPrimary: 'radial-gradient(ellipse at 50% 50%, rgba(225, 6, 19, 0.15) 0%, transparent 70%)',
    gradientSecondary: 'linear-gradient(180deg, hsl(356 40% 5%) 0%, hsl(356 30% 4%) 100%)',
    pulseColor: 'rgba(225, 6, 19, 0.1)',
    vibe: 'decisive',
  },
  '/journal': {
    gradientPrimary: 'linear-gradient(180deg, hsl(240 5% 4%) 0%, hsl(240 5% 6%) 100%)',
    gradientSecondary: 'radial-gradient(ellipse at 50% 20%, rgba(225, 6, 19, 0.04) 0%, transparent 50%)',
    pulseColor: 'rgba(225, 6, 19, 0.03)',
    vibe: 'editorial',
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
    const config = atmosphereConfigs[basePath] || atmosphereConfigs[location.pathname] || defaultAtmosphere;
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

// Atmospheric Background Component
export const AtmosphericBackground = () => {
  const { atmosphere, scrollProgress } = usePageAtmosphere();
  const { scrollY } = useScroll();
  
  // Reduce grain opacity and darken background on scroll
  const grainOpacity = useTransform(scrollY, [0, 300], [0.03, 0.02]);
  const backgroundDarken = useTransform(scrollY, [0, 300], [0, 0.05]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
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

      {/* Subtle pulse effect */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[200px]"
        style={{ backgroundColor: atmosphere.pulseColor }}
      />

      {/* Scroll-responsive darkening overlay */}
      <motion.div
        style={{ opacity: backgroundDarken }}
        className="absolute inset-0 bg-alchemy-black"
      />
    </div>
  );
};
