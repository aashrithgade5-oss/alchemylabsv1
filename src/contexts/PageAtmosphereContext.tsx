import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
    gradientPrimary: 'radial-gradient(ellipse at 50% 80%, rgba(225, 6, 19, 0.12) 0%, transparent 60%)',
    gradientSecondary: 'radial-gradient(ellipse at 20% 20%, rgba(225, 6, 19, 0.06) 0%, transparent 50%)',
    pulseColor: 'rgba(225, 6, 19, 0.08)',
    vibe: 'alive',
    accentGlow: 'rgba(225, 6, 19, 0.15)',
  },
  '/solutions': {
    gradientPrimary: 'linear-gradient(180deg, hsl(240 8% 5%) 0%, hsl(240 8% 8%) 50%, hsl(240 5% 4%) 100%)',
    gradientSecondary: 'radial-gradient(ellipse at 70% 30%, rgba(225, 6, 19, 0.05) 0%, transparent 60%)',
    pulseColor: 'rgba(225, 6, 19, 0.06)',
    vibe: 'architectural',
    accentGlow: 'rgba(80, 4, 10, 0.12)',
  },
  '/work': {
    gradientPrimary: 'linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(0 0% 5%) 50%, hsl(0 0% 2%) 100%)',
    gradientSecondary: 'radial-gradient(ellipse at 80% 70%, rgba(225, 6, 19, 0.04) 0%, transparent 50%)',
    pulseColor: 'rgba(225, 6, 19, 0.05)',
    vibe: 'gallery',
    accentGlow: 'rgba(225, 6, 19, 0.08)',
  },
  '/about': {
    gradientPrimary: 'linear-gradient(180deg, hsl(30 5% 4%) 0%, hsl(20 8% 6%) 50%, hsl(25 5% 3%) 100%)',
    gradientSecondary: 'radial-gradient(ellipse at 30% 50%, rgba(225, 6, 19, 0.05) 0%, transparent 60%)',
    pulseColor: 'rgba(225, 6, 19, 0.06)',
    vibe: 'human',
    accentGlow: 'rgba(180, 60, 40, 0.08)',
  },
  '/contact': {
    gradientPrimary: 'radial-gradient(ellipse at 50% 50%, rgba(225, 6, 19, 0.15) 0%, transparent 70%)',
    gradientSecondary: 'linear-gradient(180deg, hsl(356 40% 5%) 0%, hsl(356 30% 4%) 100%)',
    pulseColor: 'rgba(225, 6, 19, 0.1)',
    vibe: 'decisive',
    accentGlow: 'rgba(225, 6, 19, 0.2)',
  },
  '/journal': {
    gradientPrimary: 'linear-gradient(180deg, hsl(240 5% 4%) 0%, hsl(240 5% 6%) 100%)',
    gradientSecondary: 'radial-gradient(ellipse at 50% 20%, rgba(225, 6, 19, 0.05) 0%, transparent 50%)',
    pulseColor: 'rgba(225, 6, 19, 0.04)',
    vibe: 'editorial',
    accentGlow: 'rgba(225, 6, 19, 0.08)',
  },
  '/book-sprint': {
    gradientPrimary: 'radial-gradient(ellipse at 50% 30%, rgba(225, 6, 19, 0.15) 0%, transparent 60%)',
    gradientSecondary: 'radial-gradient(ellipse at 80% 80%, rgba(80, 4, 10, 0.12) 0%, transparent 50%)',
    pulseColor: 'rgba(225, 6, 19, 0.12)',
    vibe: 'conversion',
    accentGlow: 'rgba(225, 6, 19, 0.25)',
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

  // Track scroll progress with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const progress = maxScroll > 0 ? scrolled / maxScroll : 0;
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
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

// Simplified Atmospheric Background Component - performance optimized
export const AtmosphericBackground = () => {
  const { atmosphere } = usePageAtmosphere();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary gradient layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={atmosphere.vibe + '-primary'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="absolute inset-0"
          style={{ background: atmosphere.gradientSecondary }}
        />
      </AnimatePresence>

      {/* Simplified pulse effect - desktop only */}
      {!isMobile && (
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[200px]"
          style={{ backgroundColor: atmosphere.pulseColor }}
        />
      )}

      {/* Simple grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
