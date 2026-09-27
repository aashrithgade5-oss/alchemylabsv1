'use client';

import { useState } from 'react';
import { renderSVG } from 'uqr';
import { Check, Copy } from 'lucide-react';
import {
  WHATSAPP_DISPLAY,
  upiPaymentUri,
  upiPayeeName,
  upiQrImage,
  upiVpa,
  whatsappLink,
} from '@lib/payments';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-void';

/**
 * Pay an agreed amount by UPI. No amount is baked in: work is scoped first,
 * then the client enters the figure we agreed in writing. Desktop scans the
 * QR; phones get a one-tap intent into their UPI app plus a copyable ID.
 * With no VPA configured it degrades to "ask on WhatsApp" rather than a QR
 * that pays nobody.
 */
export function UpiPay({ note = 'Alchemy Labs', className = '' }: { note?: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  if (!upiVpa) {
    return (
      <div className={className}>
        <p className="text-sm leading-relaxed text-ash">
          UPI details are shared once scope is agreed.{' '}
          <a
            href={whatsappLink('Hi Alchemy Labs, please share UPI details for my invoice.')}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-bone underline decoration-ember/50 underline-offset-4 hover:decoration-ember ${focusRing}`}
          >
            Ask on WhatsApp · {WHATSAPP_DISPLAY}
          </a>
        </p>
      </div>
    );
  }

  const uri = upiPaymentUri(note);
  // dark-on-light: inverted QR codes fail in several Android UPI scanners
  const qrSvg = upiQrImage
    ? null
    : renderSVG(uri, { blackColor: '#0A0908', whiteColor: '#EDE6DD', border: 2 });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(upiVpa);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the ID stays visible to copy by hand */
    }
  };

  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
        {upiQrImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={upiQrImage}
            alt={`UPI QR code for ${upiPayeeName}`}
            className="w-44 shrink-0 rounded-xl border border-line bg-bone p-2"
          />
        ) : (
          <div
            role="img"
            aria-label={`UPI QR code for ${upiPayeeName}`}
            className="w-44 shrink-0 overflow-hidden rounded-xl bg-bone p-1 [&_svg]:h-full [&_svg]:w-full"
            dangerouslySetInnerHTML={{ __html: qrSvg ?? '' }}
          />
        )}
        <div className="w-full min-w-0 text-center sm:text-left">
          <p className="text-sm leading-relaxed text-ash">
            Scan with any UPI app and enter the amount we agreed in writing.
          </p>
          <button
            type="button"
            onClick={copy}
            className={`mt-3 inline-flex min-h-[44px] max-w-full items-center gap-2 rounded-full border border-line px-4 font-mono text-xs tracking-wider text-bone transition-colors hover:border-ember/60 ${focusRing}`}
            aria-label={`Copy UPI ID ${upiVpa}`}
          >
            <span className="truncate">{upiVpa}</span>
            {copied ? <Check className="h-3.5 w-3.5 shrink-0 text-ember" /> : <Copy className="h-3.5 w-3.5 shrink-0 text-ash" />}
          </button>
          <span className="sr-only" aria-live="polite">{copied ? 'UPI ID copied' : ''}</span>
        </div>
      </div>
      {/* phones: straight into the UPI app */}
      <a
        href={uri}
        className={`mt-5 flex min-h-[48px] w-full items-center justify-center rounded-full border border-ember/60 font-sans text-sm font-semibold text-bone transition-colors hover:bg-ember hover:text-void md:hidden ${focusRing}`}
      >
        Open UPI app
      </a>
    </div>
  );
}
