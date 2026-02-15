import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePerformance } from '@/contexts/PerformanceContext';
import { Cookie, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookieConsent = memo(() => {
  const { hasConsented, acceptCookies } = usePerformance();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (hasConsented) return;
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, [hasConsented]);

  const handleAccept = () => {
    setExiting(true);
    setTimeout(() => {
      acceptCookies();
      setVisible(false);
    }, 400);
  };

  if (hasConsented) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={exiting ? { y: 100, opacity: 0 } : { y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-[600px]"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black/60 backdrop-blur-xl shadow-2xl shadow-black/40">
            {/* Noise texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
                backgroundSize: '128px 128px',
              }}
            />

            {/* Subtle top edge glow */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="relative px-5 py-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              {/* Icon + Text */}
              <div className="flex items-center gap-3 text-center sm:text-left flex-1 min-w-0">
                <div className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.06] shrink-0">
                  <Cookie className="w-4 h-4 text-white/60" />
                </div>
                <p className="text-sm text-white/70 leading-relaxed">
                  We use cookies to optimize your experience.{' '}
                  <Link
                    to="/privacy"
                    className="inline-flex items-center gap-1 text-white/40 hover:text-white/60 transition-colors underline underline-offset-2 decoration-white/20"
                  >
                    <Shield className="w-3 h-3" />
                    Privacy
                  </Link>
                </p>
              </div>

              {/* Accept button */}
              <button
                onClick={handleAccept}
                className="shrink-0 relative group px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(220,38,38,0.8) 0%, rgba(185,28,28,0.9) 100%)',
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  background: 'linear-gradient(135deg, rgba(239,68,68,0.9) 0%, rgba(220,38,38,1) 100%)',
                }} />
                {/* Scanline */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)',
                  }}
                />
                <span className="relative z-10 tracking-wide">Accept All</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

CookieConsent.displayName = 'CookieConsent';
