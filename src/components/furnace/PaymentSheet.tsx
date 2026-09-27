'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { m, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Product } from '@lib/payments';
import {
  CALENDLY_URL,
  CONTACT_EMAIL,
  WHATSAPP_DISPLAY,
  estimateText,
  fromLabel,
  whatsappLink,
} from '@lib/payments';
import { UpiPay } from './UpiPay';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-void';
const textLink = `inline-flex min-h-[44px] items-center text-bone underline decoration-ember/50 underline-offset-4 transition-colors hover:decoration-ember ${focusRing}`;

interface PaymentSheetProps {
  product: Product | null;
  onClose: () => void;
}

// Patches-1: no checkout at a printed price any more. The panel starts a
// conversation (call or WhatsApp estimate); UPI is for paying the amount we
// then agree in writing. Shared by the sheet and the per-offer pages.
export function CheckoutPanel({ product }: { product: Product }) {
  return (
    <>
      <p className="font-mono text-[10px] tracking-[0.25em] text-ash">
        {fromLabel(product).toUpperCase()} · SCOPED TO YOUR BRIEF
      </p>
      <h2 className="mt-4 pr-12 font-sans text-2xl font-bold text-bone">{product.name}</h2>
      <p className="mt-4 text-sm leading-relaxed text-ash">{product.tagline}</p>
      <p className="mt-4 text-sm leading-relaxed text-ash">
        The final figure depends on the scope. Tell us about the brand and we come back with a
        rough estimate before anything is billed.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex min-h-[48px] w-full items-center justify-center rounded-full bg-ember px-7 font-sans text-sm font-semibold text-void transition-colors hover:bg-amber ${focusRing}`}
        >
          Book a call
        </a>
        <a
          href={whatsappLink(estimateText(product.name))}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex min-h-[48px] w-full items-center justify-center rounded-full border border-ember/60 px-7 font-sans text-sm font-semibold text-bone transition-colors hover:bg-ember hover:text-void ${focusRing}`}
        >
          Text us for a rough estimate
        </a>
      </div>

      {/* already scoped: pay the agreed amount */}
      <div className="mt-10 border-t border-line pt-8">
        <p className="font-mono text-[10px] tracking-[0.25em] text-ash">ALREADY SCOPED · PAY BY UPI</p>
        <UpiPay note={product.name} className="mt-5" />
        <p className="mt-6 text-sm leading-relaxed text-ash">
          International clients are invoiced by email. After paying, send the receipt to
        </p>
        <div className="mt-1 flex flex-col font-mono text-xs tracking-wider">
          <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(product.name)}`} className={`${textLink} break-all`}>
            MAIL · {CONTACT_EMAIL}
          </a>
          <a href={whatsappLink(`Paid for ${product.name}. Receipt attached.`)} target="_blank" rel="noopener noreferrer" className={textLink}>
            WHATSAPP · {WHATSAPP_DISPLAY}
          </a>
        </div>
      </div>
    </>
  );
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Checkout sheet: bottom sheet on mobile, right slide-over from md up.
// Focus is trapped inside, Escape closes, body scroll is locked, and focus
// returns to the trigger on close.
export function PaymentSheet({ product, onClose }: PaymentSheetProps) {
  // Portal target: page content sits inside LayoutTransition's transformed
  // wrapper, which would re-anchor this fixed overlay to the page.
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => setMounted(true), []);

  const open = !!product;
  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => closeRef.current?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!panelRef.current.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      trigger?.focus?.();
    };
  }, [open]);

  if (!mounted) return null;

  // read at render (client-only past the mounted guard) so the first open animates correctly
  const desktop = window.matchMedia('(min-width: 768px)').matches;
  const hidden = desktop ? { x: '100%', y: 0 } : { x: 0, y: '100%' };

  return createPortal(
    <AnimatePresence>
      {product && (
        <m.div
          className="fixed inset-0 z-[100] flex items-end justify-center md:items-stretch md:justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div aria-hidden onClick={onClose} className="absolute inset-0 bg-void/70 backdrop-blur-sm" />
          <m.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Start ${product.name}`}
            initial={hidden}
            animate={{ x: 0, y: 0 }}
            exit={hidden}
            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
            className="liquid-glass relative flex max-h-[90svh] w-full flex-col overflow-y-auto overscroll-contain rounded-t-2xl px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 md:h-full md:max-h-none md:max-w-md md:rounded-none md:px-8 md:py-10"
          >
            <div aria-hidden className="mx-auto -mt-4 mb-4 h-1 w-10 shrink-0 rounded-full bg-line md:hidden" />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-line text-ash transition-colors hover:border-ember/50 hover:text-bone md:right-6 md:top-6 ${focusRing}`}
            >
              <X className="h-4 w-4" />
            </button>

            <CheckoutPanel product={product} />
          </m.aside>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
