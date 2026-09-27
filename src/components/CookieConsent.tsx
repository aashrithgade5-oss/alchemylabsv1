'use client';
import { memo, useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { usePerformance } from '@/contexts/PerformanceContext';
import { Cookie, Shield } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const;
const DECLINED_KEY = 'alchemy-cookies-declined';

export const CookieConsent = memo(() => {
  const { hasConsented, acceptCookies } = usePerformance();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const isHomepage = pathname === '/';

  useEffect(() => {
    if (hasConsented || !isHomepage) return;
    try { if (localStorage.getItem(DECLINED_KEY)) return; } catch { /* storage blocked */ }
    // never stacks on top of the opening sequence: wait for its handover
    let timer: ReturnType<typeof setTimeout> | undefined;
    const arm = () => { timer = setTimeout(() => setVisible(true), 1600); };
    const pl = document.documentElement.getAttribute('data-pl');
    if (pl === 'run') window.addEventListener('al:preloaded', arm, { once: true });
    else arm();
    return () => {
      clearTimeout(timer);
      window.removeEventListener('al:preloaded', arm);
    };
  }, [hasConsented, isHomepage]);

  const handleDecline = () => {
    try { localStorage.setItem(DECLINED_KEY, '1'); } catch { /* storage blocked */ }
    setVisible(false);
  };

  const handleAccept = () => {
    acceptCookies();
    setVisible(false);
  };

  if (hasConsented || !isHomepage) return null;

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE_CINEMATIC }}
          className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[200] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md"
        >
          <div
            className="relative overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4),0_2px_8px_rgba(0,0,0,0.3)]"
            style={{
              background: 'rgba(22,20,18,0.88)',
              backdropFilter: 'blur(48px)',
              WebkitBackdropFilter: 'blur(48px)',
              border: '1px solid rgba(255,255,255,0.10)',
            }}
          >
            {/* Top edge highlight – light refraction */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            {/* stacked on phones (copy row, then actions row) so the copy
                never collapses into a one-word column */}
            <div className="relative flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-6 sm:py-5">
              <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                <Cookie className="w-5 h-5 text-white/60" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/70 leading-snug">
                  We use cookies to optimize your experience.{' '}
                  <Link href="/privacy" className="inline-flex min-h-11 items-center gap-1 text-white/40 hover:text-white/60 transition-colors">
                    <Shield className="w-3 h-3" />
                    Privacy
                  </Link>
                </p>
              </div>
              </div>

              <div className="flex items-center justify-end gap-2">
              <button
                onClick={handleDecline}
                className="shrink-0 min-h-11 px-3 text-sm text-white/55 transition-colors hover:text-white"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="shrink-0 min-h-11 px-4 py-2 rounded-xl text-sm font-medium text-white tracking-wide transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,77,28,0.7) 0%, rgba(185,28,28,0.85) 100%)',
                  boxShadow: '0 2px 12px rgba(255,77,28,0.2)',
                }}
              >
                Allow
              </button>
              </div>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
});

CookieConsent.displayName = 'CookieConsent';
