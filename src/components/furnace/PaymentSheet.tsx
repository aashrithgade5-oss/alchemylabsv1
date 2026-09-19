'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { m, AnimatePresence } from 'framer-motion';
import { renderSVG } from 'uqr';
import { X } from 'lucide-react';
import type { Product } from '@lib/payments';
import { upiPaymentUri } from '@lib/payments';

const CONTACT_EMAIL = 'alchemylabs.work@gmail.com';
const WHATSAPP = 'https://wa.me/917794912315';
const CALENDLY_URL = 'https://calendly.com/alchemylabs-work/30min';
const IS_DEV = process.env.NODE_ENV !== 'production';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-void';
const textLink = `inline-flex min-h-[44px] items-center text-bone underline decoration-ember/50 underline-offset-4 transition-colors hover:decoration-ember ${focusRing}`;

interface PaymentSheetProps {
  product: Product | null;
  onClose: () => void;
}

// C-P20: the checkout body, extracted so the per-service pages can house the
// SAME flow inside an inline liquid-glass panel (reused, not rebuilt).
export function CheckoutPanel({ product }: { product: Product }) {
  const upiUri = upiPaymentUri(product);
  const qrSvg = renderSVG(upiUri, {
    blackColor: '#EDE6DD',
    whiteColor: 'transparent',
    border: 1,
  });
  const confirmationBody = encodeURIComponent(
    `Paid for ${product.name}. Receipt and materials attached.`,
  );
  const inr = product.priceInr.toLocaleString('en-IN');

  return (
    <>
      <p className="font-mono text-[10px] tracking-[0.25em] text-ash">CHECKOUT · FIXED SCOPE · FIXED PRICE</p>
      <h2 className="mt-4 pr-12 font-sans text-2xl font-bold text-bone">{product.name}</h2>
      <p className="mt-2 font-mono text-sm text-ash">
        ${product.priceUsd} · ₹{inr}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-ash">{product.tagline}</p>

      {/* (a) UPI */}
      <div className="mt-8 border-t border-line pt-8">
        <p className="font-mono text-[10px] tracking-[0.25em] text-ash">UPI · INDIA</p>
        {IS_DEV && (
          <p className="mt-2 font-mono text-[10px] tracking-[0.15em] text-ember">
            DEV: UPI VPA IS A PLACEHOLDER, NOT LIVE
          </p>
        )}
        {/* Desktop: scan the QR */}
        <div className="hidden md:block">
          <p className="mt-4 text-sm text-ash">Scan with any UPI app.</p>
          <div
            role="img"
            aria-label={`UPI QR code to pay ₹${inr} for ${product.name}`}
            className="mx-auto mt-5 w-56 max-w-full rounded-xl border border-line bg-void p-5 [&_svg]:h-full [&_svg]:w-full"
            dangerouslySetInnerHTML={{ __html: qrSvg }}
          />
        </div>
        {/* Mobile: open the intent */}
        <a
          href={upiUri}
          className={`mt-4 flex min-h-[48px] w-full items-center justify-center rounded-full bg-ember px-7 font-sans text-sm font-semibold text-void md:hidden ${focusRing}`}
        >
          Pay ₹{inr} by UPI
        </a>
      </div>

      {/* (b) Shopify card checkout */}
      <div className="mt-8 border-t border-line pt-8">
        <p className="font-mono text-[10px] tracking-[0.25em] text-ash">CARD · INTERNATIONAL</p>
        {product.shopifyCheckoutUrl ? (
          <a
            href={product.shopifyCheckoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 flex min-h-[48px] w-full items-center justify-center rounded-full border border-ember/60 font-sans text-sm font-semibold text-bone transition-colors hover:bg-ember hover:text-void ${focusRing}`}
          >
            Pay ${product.priceUsd} by card (Shopify)
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="mt-4 min-h-[48px] w-full cursor-not-allowed rounded-full border border-line font-sans text-sm text-ash opacity-60"
          >
            Card checkout opening soon
          </button>
        )}
      </div>

      {/* (c) after payment, or talk first */}
      <div className="mt-8 border-t border-line pt-8">
        <p className="text-sm leading-relaxed text-ash">
          After paying, send the receipt and your materials to either address below. We reply to
          confirm the start date in writing.
        </p>
        <div className="mt-3 flex flex-col font-mono text-xs tracking-wider">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(product.name)}&body=${confirmationBody}`}
            className={`${textLink} break-all`}
          >
            MAIL · {CONTACT_EMAIL}
          </a>
          <a
            href={`${WHATSAPP}?text=${confirmationBody}`}
            target="_blank"
            rel="noopener noreferrer"
            className={textLink}
          >
            WHATSAPP · +91 77949 12315
          </a>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-ash">Rather talk first?</p>
        <div className="flex flex-col font-mono text-xs tracking-wider">
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={textLink}>
            BOOK A 30-MIN CALL
          </a>
          <a href="/contact" className={textLink}>
            CONTACT FORM
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
            aria-label={`Checkout for ${product.name}`}
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
              aria-label="Close checkout"
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
