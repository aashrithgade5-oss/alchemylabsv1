import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePerformance } from '@/contexts/PerformanceContext';
import { Cookie, Shield, Loader2, Check } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const;

/** Calibration feedback toast shown after acceptance */
const CalibrationToast = memo(({ state }: { state: 'idle' | 'calibrating' | 'done' }) => (
  <AnimatePresence>
    {state !== 'idle' && (
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE_CINEMATIC }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[201]"
      >
        <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/40">
          {state === 'calibrating' ? (
            <>
              <Loader2 className="w-3.5 h-3.5 text-red-400 animate-spin" />
              <span className="text-xs text-white/60 tracking-wide">Calibrating your experience…</span>
            </>
          ) : (
            <>
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-emerald-400" />
              </div>
              <span className="text-xs text-white/60 tracking-wide">Optimized for your device</span>
            </>
          )}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
));
CalibrationToast.displayName = 'CalibrationToast';

export const CookieConsent = memo(() => {
  const { hasConsented, acceptCookies, calibrationState } = usePerformance();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  // Only show on homepage
  const isHomepage = location.pathname === '/';

  useEffect(() => {
    if (hasConsented || !isHomepage) return;
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, [hasConsented, isHomepage]);

  const handleAccept = () => {
    setExiting(true);
    setTimeout(() => {
      acceptCookies();
      setVisible(false);
    }, 500);
  };

  if (hasConsented) return <CalibrationToast state={calibrationState} />;
  if (!isHomepage) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={exiting ? { opacity: 0 } : { opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: exiting ? 0.5 : 0.8, ease: EASE_CINEMATIC, delay: exiting ? 0.2 : 0 }}
        >
          {/* Red-tinted depth-of-field backdrop */}
          <div
            className="absolute inset-0"
            style={{
              background: 'rgba(10, 0, 0, 0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          />

          {/* Animated red gradient orbs */}
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(220,38,38,0.3) 0%, transparent 70%)',
              }}
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(185,28,28,0.35) 0%, transparent 70%)',
              }}
            />
          </motion.div>

          {/* Center-stage dialog card */}
          <motion.div
            className="relative w-[calc(100%-2rem)] max-w-md mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={exiting ? { scale: 1.05, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{
              duration: exiting ? 0.4 : 0.6,
              ease: EASE_CINEMATIC,
              delay: exiting ? 0 : 0.3,
            }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-black/50 backdrop-blur-2xl shadow-2xl shadow-black/60">
              {/* Noise texture */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
                  backgroundSize: '128px 128px',
                }}
              />

              {/* Top edge shimmer -- red tinted */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

              {/* Inner red radial glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 50% 0%, rgba(220,38,38,0.08) 0%, transparent 60%)',
                }}
              />

              <div className="relative px-8 py-10 flex flex-col items-center text-center gap-6">
                {/* Animated cookie icon */}
                <motion.div
                  animate={{
                    filter: [
                      'drop-shadow(0 0 8px rgba(220,38,38,0.3))',
                      'drop-shadow(0 0 16px rgba(220,38,38,0.5))',
                      'drop-shadow(0 0 8px rgba(220,38,38,0.3))',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                    <Cookie className="w-7 h-7 text-white/70" />
                  </div>
                </motion.div>

                {/* Headline */}
                <div className="space-y-3">
                  <h2 className="text-2xl font-display italic text-white leading-tight">
                    We bake experiences,<br />not just cookies.
                  </h2>
                  <p className="text-sm text-white/50 leading-relaxed max-w-xs mx-auto">
                    Accept to let us calibrate your experience for butter-smooth performance tailored to your device.
                  </p>
                </div>

                {/* CTA button */}
                <div className="w-full space-y-3">
                  <button
                    onClick={handleAccept}
                    className="w-full relative group py-4 rounded-2xl text-base font-medium text-white tracking-wide transition-all duration-300 overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(220,38,38,0.85) 0%, rgba(185,28,28,0.95) 100%)',
                    }}
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(239,68,68,0.95) 0%, rgba(220,38,38,1) 100%)',
                      }}
                    />
                    {/* Scanline on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)',
                      }}
                    />
                    <span className="relative z-10 group-hover:scale-[1.02] inline-block transition-transform duration-300">
                      Accept &amp; Optimize
                    </span>
                  </button>

                  <p className="text-xs text-white/25 tracking-wide">
                    One click. Tailored performance.
                  </p>
                </div>

                {/* Privacy link */}
                <Link
                  to="/privacy"
                  className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white/50 transition-colors"
                >
                  <Shield className="w-3 h-3" />
                  Privacy Policy
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

CookieConsent.displayName = 'CookieConsent';
