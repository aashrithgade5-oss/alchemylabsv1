'use client';

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { m, AnimatePresence } from 'framer-motion';
import { renderSVG } from 'uqr';
import { X } from 'lucide-react';
import type { Product } from '@lib/payments';
import { upiPaymentUri } from '@lib/payments';

const CONTACT_EMAIL = 'alchemylabs.work@gmail.com';
const WHATSAPP = 'https://wa.me/917794912315';

interface PaymentSheetProps {
  product: Product | null;
  onClose: () => void;
}

// Glass slide-over checkout. Desktop scans a UPI QR; mobile taps a upi://
// intent. Card checkout stays disabled until the gateway link lands in
// lib/payments.ts (OVERHAUL_TODO).
export function PaymentSheet({ product, onClose }: PaymentSheetProps) {
  // Portal target: page content sits inside LayoutTransition's transformed
  // wrapper, which would re-anchor this fixed overlay to the page.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const upiUri = useMemo(() => (product ? upiPaymentUri(product) : ''), [product]);
  const qrSvg = useMemo(
    () => (upiUri ? renderSVG(upiUri, { blackColor: '#EDE6DD', whiteColor: 'transparent', border: 1 }) : ''),
    [upiUri],
  );

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  const confirmationBody = product
    ? encodeURIComponent(`Paid for ${product.name}. Receipt and materials attached.`)
    : '';

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {product && (
        <m.div
          className="fixed inset-0 z-[100] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Checkout for ${product.name}`}
        >
          <button
            aria-label="Close checkout"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-void/70 backdrop-blur-sm"
          />
          <m.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
            className="liquid-glass relative flex h-full w-full max-w-md flex-col overflow-y-auto px-8 py-10"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-6 top-6 rounded-full border border-line p-2 text-ash transition-colors hover:border-ember/50 hover:text-bone"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="font-mono text-[10px] tracking-[0.25em] text-ash">CHECKOUT</p>
            <h2 className="mt-4 font-sans text-2xl font-bold text-bone">{product.name}</h2>
            <p className="mt-2 font-mono text-sm text-ash">
              ${product.priceUsd} · ₹{product.priceInr.toLocaleString('en-IN')}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ash">{product.tagline}</p>

            <div className="mt-8 border-t border-line pt-8">
              {/* Desktop: scan the QR */}
              <div className="hidden md:block">
                <p className="font-mono text-[10px] tracking-[0.25em] text-ash">SCAN WITH ANY UPI APP</p>
                <div
                  className="mx-auto mt-5 w-56 rounded-xl border border-line bg-void p-5 [&_svg]:h-full [&_svg]:w-full"
                  dangerouslySetInnerHTML={{ __html: qrSvg }}
                />
              </div>
              {/* Mobile: open the intent */}
              <div className="md:hidden">
                <a
                  href={upiUri}
                  className="flex w-full items-center justify-center rounded-full bg-ember px-7 py-4 font-sans text-sm font-semibold text-void"
                >
                  Pay ₹{product.priceInr.toLocaleString('en-IN')} by UPI
                </a>
              </div>

              <button
                disabled={!product.checkoutUrl}
                onClick={() => product.checkoutUrl && window.open(product.checkoutUrl, '_blank')}
                className="mt-5 w-full rounded-full border border-line py-3.5 font-sans text-sm text-ash disabled:cursor-not-allowed disabled:opacity-50"
              >
                {product.checkoutUrl ? 'Pay by card' : 'Card checkout opening soon'}
              </button>
            </div>

            <div className="mt-8 border-t border-line pt-8">
              <p className="text-sm leading-relaxed text-ash">
                Payment confirms your slot. Send your materials and the receipt to either address
                below and the work starts this week.
              </p>
              <div className="mt-5 flex flex-col gap-3 font-mono text-xs tracking-wider">
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(product.name)}&body=${confirmationBody}`}
                  className="text-bone underline decoration-ember/50 underline-offset-4 transition-colors hover:decoration-ember"
                >
                  MAIL · {CONTACT_EMAIL}
                </a>
                <a
                  href={`${WHATSAPP}?text=${confirmationBody}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bone underline decoration-ember/50 underline-offset-4 transition-colors hover:decoration-ember"
                >
                  WHATSAPP · +91 77949 12315
                </a>
              </div>
            </div>
          </m.aside>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
