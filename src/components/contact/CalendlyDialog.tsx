'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

export const CALENDLY_URL = 'https://calendly.com/alchemylabs-work/30min';
const EMBED_URL = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=0a0908&text_color=ede6dd&primary_color=ff4d1c`;

export const isCalendlyOrigin = (origin: string) => {
  try {
    const { protocol, hostname } = new URL(origin);
    return protocol === 'https:' && (hostname === 'calendly.com' || hostname.endsWith('.calendly.com'));
  } catch {
    return false;
  }
};

type Props = { open: boolean; onClose: () => void; onBooked: () => void };

/** Accessible Calendly dialog: focus trap, Esc, scroll lock, focus return. */
export function CalendlyDialog({ open, onClose, onBooked }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    setLoaded(false);
    setSlow(false);
    const returnTo = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const slowTimer = setTimeout(() => setSlow(true), 8000);
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose();
      if (e.key !== 'Tab' || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), iframe');
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    const onMessage = (e: MessageEvent) => {
      if (!isCalendlyOrigin(e.origin)) return;
      if ((e.data as { event?: string })?.event === 'calendly.event_scheduled') onBooked();
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('message', onMessage);
    return () => {
      clearTimeout(slowTimer);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('message', onMessage);
      document.body.style.overflow = prevOverflow;
      returnTo?.focus?.();
    };
  }, [open, onClose, onBooked]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
        >
          <div aria-hidden onClick={onClose} className="absolute inset-0 bg-void/85 backdrop-blur-md" />
          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="calendly-title"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-[92svh] w-full max-w-4xl flex-col overflow-hidden rounded-t-[20px] border border-bone/10 bg-void shadow-[0_40px_120px_rgba(0,0,0,0.6)] sm:h-[min(86svh,820px)] sm:rounded-[20px]"
          >
            <header className="flex items-center justify-between gap-4 border-b border-bone/10 px-5 py-3 sm:px-6">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/45">Strategy call · 30 min</p>
                <h2 id="calendly-title" className="truncate font-headline text-lg font-bold text-bone">
                  Pick a <span className="font-playfair font-normal italic">time</span>.
                </h2>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/60 transition-colors hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember"
                >
                  <span className="hidden sm:inline">Open in Calendly</span>
                  <span className="sm:hidden">New tab</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
                <button
                  type="button"
                  data-autofocus
                  onClick={onClose}
                  aria-label="Close scheduler"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-bone/70 transition-colors hover:bg-bone/10 hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </header>

            <div className="relative flex-1">
              {!loaded && (
                <div aria-hidden className="absolute inset-0 grid gap-4 p-6 sm:grid-cols-[1fr_1.4fr] sm:p-10">
                  <div className="space-y-3">
                    <div className="h-4 w-1/3 rounded bg-bone/[0.06] motion-safe:animate-pulse" />
                    <div className="h-7 w-2/3 rounded bg-bone/[0.06] motion-safe:animate-pulse" />
                    <div className="h-3 w-1/2 rounded bg-bone/[0.05] motion-safe:animate-pulse" />
                  </div>
                  <div className="grid grid-cols-7 content-start gap-2">
                    {Array.from({ length: 35 }, (_, i) => (
                      <div key={i} className="aspect-square rounded-full bg-bone/[0.05] motion-safe:animate-pulse" />
                    ))}
                  </div>
                </div>
              )}
              {slow && !loaded && (
                <p role="status" className="absolute inset-x-0 bottom-6 px-6 text-center font-body text-sm text-bone/60">
                  Taking a while?{' '}
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="text-ember underline underline-offset-4">
                    Open the calendar in a new tab
                  </a>
                  .
                </p>
              )}
              <iframe
                src={EMBED_URL}
                title="Book a strategy call with Alchemy Labs"
                onLoad={() => setLoaded(true)}
                className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
