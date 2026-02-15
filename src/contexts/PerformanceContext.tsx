import { createContext, useContext, useState, useEffect, useCallback, memo, type ReactNode } from 'react';
import { profileDevice, classifyTier, type PerformanceTier } from '@/hooks/useDevicePerformance';

const CONSENT_KEY = 'alchemy-cookie-consent';

interface PerformanceContextType {
  tier: PerformanceTier;
  hasConsented: boolean;
  acceptCookies: () => void;
  shouldUseParticles: boolean;
  shouldParallax: boolean;
  maxBlur: number;
  particleFactor: number;
}

const defaults: PerformanceContextType = {
  tier: 'medium',
  hasConsented: false,
  acceptCookies: () => {},
  shouldUseParticles: true,
  shouldParallax: true,
  maxBlur: 60,
  particleFactor: 0.5,
};

const PerformanceContext = createContext<PerformanceContextType>(defaults);

export const usePerformance = () => useContext(PerformanceContext);

function getStoredConsent(): boolean {
  try {
    const val = localStorage.getItem(CONSENT_KEY);
    return val !== null;
  } catch {
    return false;
  }
}

const tierConfig: Record<PerformanceTier, { particles: boolean; parallax: boolean; maxBlur: number; factor: number }> = {
  high:   { particles: true,  parallax: true,  maxBlur: 120, factor: 1 },
  medium: { particles: true,  parallax: false, maxBlur: 40,  factor: 0.5 },
  low:    { particles: false, parallax: false, maxBlur: 20,  factor: 0 },
};

export const PerformanceProvider = memo(({ children }: { children: ReactNode }) => {
  const [hasConsented, setHasConsented] = useState(getStoredConsent);
  const [tier, setTier] = useState<PerformanceTier>('medium');

  const acceptCookies = useCallback(() => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ accepted: true, timestamp: Date.now() }));
    } catch { /* quota */ }
    setHasConsented(true);
  }, []);

  // Run profiling after consent
  useEffect(() => {
    if (!hasConsented) return;
    const profile = profileDevice();
    const detected = classifyTier(profile);
    setTier(detected);
    // Set CSS custom property for CSS-level adjustments
    document.documentElement.setAttribute('data-perf-tier', detected);
  }, [hasConsented]);

  const cfg = tierConfig[tier];

  return (
    <PerformanceContext.Provider value={{
      tier,
      hasConsented,
      acceptCookies,
      shouldUseParticles: cfg.particles,
      shouldParallax: cfg.parallax,
      maxBlur: cfg.maxBlur,
      particleFactor: cfg.factor,
    }}>
      {children}
    </PerformanceContext.Provider>
  );
});

PerformanceProvider.displayName = 'PerformanceProvider';
