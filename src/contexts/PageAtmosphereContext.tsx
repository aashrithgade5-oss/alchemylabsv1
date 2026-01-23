import React, { createContext, useContext, useEffect, useState, ReactNode, useMemo, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface AtmosphereConfig {
  gradientPrimary: string;
  gradientSecondary: string;
  vibe: string;
}

interface PageAtmosphereContextType {
  atmosphere: AtmosphereConfig;
  hasVisitedContact: boolean;
}

const atmosphereConfigs: Record<string, AtmosphereConfig> = {
  '/': {
    gradientPrimary: 'radial-gradient(ellipse at 50% 80%, rgba(225, 6, 19, 0.08) 0%, transparent 60%)',
    gradientSecondary: 'radial-gradient(ellipse at 20% 20%, rgba(225, 6, 19, 0.04) 0%, transparent 50%)',
    vibe: 'alive',
  },
  '/solutions': {
    gradientPrimary: 'linear-gradient(180deg, hsl(240 8% 5%) 0%, hsl(240 8% 8%) 50%, hsl(240 5% 4%) 100%)',
    gradientSecondary: 'radial-gradient(ellipse at 70% 30%, rgba(225, 6, 19, 0.03) 0%, transparent 60%)',
    vibe: 'architectural',
  },
  '/work': {
    gradientPrimary: 'linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(0 0% 5%) 50%, hsl(0 0% 2%) 100%)',
    gradientSecondary: 'radial-gradient(ellipse at 80% 70%, rgba(225, 6, 19, 0.03) 0%, transparent 50%)',
    vibe: 'gallery',
  },
  '/about': {
    gradientPrimary: 'linear-gradient(180deg, hsl(30 5% 4%) 0%, hsl(20 8% 6%) 50%, hsl(25 5% 3%) 100%)',
    gradientSecondary: 'radial-gradient(ellipse at 30% 50%, rgba(225, 6, 19, 0.03) 0%, transparent 60%)',
    vibe: 'human',
  },
  '/contact': {
    gradientPrimary: 'radial-gradient(ellipse at 50% 50%, rgba(225, 6, 19, 0.1) 0%, transparent 70%)',
    gradientSecondary: 'linear-gradient(180deg, hsl(356 40% 5%) 0%, hsl(356 30% 4%) 100%)',
    vibe: 'decisive',
  },
  '/journal': {
    gradientPrimary: 'linear-gradient(180deg, hsl(240 5% 4%) 0%, hsl(240 5% 6%) 100%)',
    gradientSecondary: 'radial-gradient(ellipse at 50% 20%, rgba(225, 6, 19, 0.03) 0%, transparent 50%)',
    vibe: 'editorial',
  },
  '/book-sprint': {
    gradientPrimary: 'radial-gradient(ellipse at 50% 30%, rgba(225, 6, 19, 0.1) 0%, transparent 60%)',
    gradientSecondary: 'radial-gradient(ellipse at 80% 80%, rgba(80, 4, 10, 0.08) 0%, transparent 50%)',
    vibe: 'conversion',
  },
};

const defaultAtmosphere: AtmosphereConfig = atmosphereConfigs['/'];

const PageAtmosphereContext = createContext<PageAtmosphereContextType>({
  atmosphere: defaultAtmosphere,
  hasVisitedContact: false,
});

export const usePageAtmosphere = () => useContext(PageAtmosphereContext);

interface PageAtmosphereProviderProps {
  children: ReactNode;
}

export const PageAtmosphereProvider = ({ children }: PageAtmosphereProviderProps) => {
  const location = useLocation();
  const [hasVisitedContact, setHasVisitedContact] = useState(false);

  // Memoize atmosphere config
  const atmosphere = useMemo(() => {
    const basePath = '/' + location.pathname.split('/')[1];
    return atmosphereConfigs[location.pathname] || atmosphereConfigs[basePath] || defaultAtmosphere;
  }, [location.pathname]);

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

  const contextValue = useMemo(() => ({
    atmosphere,
    hasVisitedContact,
  }), [atmosphere, hasVisitedContact]);

  return (
    <PageAtmosphereContext.Provider value={contextValue}>
      {children}
    </PageAtmosphereContext.Provider>
  );
};

// Simplified Atmospheric Background - no animations, just CSS transitions
export const AtmosphericBackground = memo(() => {
  const { atmosphere } = usePageAtmosphere();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary gradient layer - CSS transition instead of Framer Motion */}
      <motion.div
        key={atmosphere.vibe}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0"
        style={{ background: atmosphere.gradientPrimary }}
      />

      {/* Secondary gradient layer */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ background: atmosphere.gradientSecondary }}
      />

      {/* Minimal grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
});

AtmosphericBackground.displayName = 'AtmosphericBackground';
