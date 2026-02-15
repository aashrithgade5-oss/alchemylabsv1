import { createContext, useContext, useState, useEffect, useCallback, memo, type ReactNode } from 'react';
import { profileDevice, classifyTier, type PerformanceTier } from '@/hooks/useDevicePerformance';

const CONSENT_KEY = 'alchemy-cookie-consent';

type CalibrationState = 'idle' | 'calibrating' | 'done';

interface PerformanceContextType {
  tier: PerformanceTier;
  hasConsented: boolean;
  acceptCookies: () => void;
  calibrationState: CalibrationState;
  shouldUseParticles: boolean;
  shouldParallax: boolean;
  maxBlur: number;
  particleFactor: number;
}

const defaults: PerformanceContextType = {
  tier: 'medium',
  hasConsented: false,
  acceptCookies: () => {},
  calibrationState: 'idle',
  shouldUseParticles: true,
  shouldParallax: true,
  maxBlur: 60,
  particleFactor: 0.5,
};

const PerformanceContext = createContext<PerformanceContextType>(defaults);

export const usePerformance = () => useContext(PerformanceContext);

function getStoredConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) !== null;
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
  const [calibrationState, setCalibrationState] = useState<CalibrationState>(
    getStoredConsent() ? 'done' : 'idle'
  );

  const acceptCookies = useCallback(() => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ accepted: true, timestamp: Date.now() }));
    } catch { /* quota */ }
    setHasConsented(true);
    setCalibrationState('calibrating');
  }, []);

  // Run profiling after consent
  useEffect(() => {
    if (!hasConsented) return;

    const profile = profileDevice();
    const detected = classifyTier(profile);
    setTier(detected);
    document.documentElement.setAttribute('data-perf-tier', detected);

    // Skip calibration feedback - just go straight to idle
    if (calibrationState === 'calibrating') {
      setCalibrationState('idle');
    }
  }, [hasConsented, calibrationState]);

  const cfg = tierConfig[tier];

  return (
    <PerformanceContext.Provider value={{
      tier,
      hasConsented,
      acceptCookies,
      calibrationState,
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
