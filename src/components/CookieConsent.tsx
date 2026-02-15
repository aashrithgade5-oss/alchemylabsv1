import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePerformance } from '@/contexts/PerformanceContext';
import { Cookie, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const;

export const CookieConsent = memo(() => {
  const { hasConsented, acceptCookies } = usePerformance();
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  const isHomepage = location.pathname === '/';

  useEffect(() => {
    if (hasConsented || !isHomepage) return;
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, [hasConsented, isHomepage]);

  const handleAccept = () => {
    acceptCookies();
    setVisible(false);
  };

  if (hasConsented || !isHomepage) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] w-[calc(100%-2rem)] max-w-lg"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black/80 backdrop-blur-xl shadow-2xl shadow-black/60">
            {/* Top shimmer */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

            <div className="relative px-6 py-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                <Cookie className="w-5 h-5 text-white/60" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/70 leading-relaxed">
                  We use cookies to optimize your experience.{' '}
                  <Link to="/privacy" className="inline-flex items-center gap-1 text-white/40 hover:text-white/60 transition-colors">
                    <Shield className="w-3 h-3" />
                    Privacy
                  </Link>
                </p>
              </div>

              <button
                onClick={handleAccept}
                className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-medium text-white tracking-wide transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(220,38,38,0.85) 0%, rgba(185,28,28,0.95) 100%)',
                }}
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

CookieConsent.displayName = 'CookieConsent';
