'use client';

import { useEffect, useState } from 'react';
import { Check, Copy, ArrowUpRight } from 'lucide-react';
import {
  WHATSAPP_DISPLAY,
  cardPaymentUrl,
  intlPaymentUrl,
  upiAppLink,
  upiPaymentUri,
  upiPayeeName,
  upiQrImage,
  upiVpa,
  whatsappLink,
  type UpiApp,
} from '@lib/payments';
import { LuxeQr } from './LuxeQr';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-void';
const pill = `inline-flex min-h-[44px] items-center justify-center rounded-full border border-line px-4 font-sans text-[13px] font-semibold text-bone transition-colors hover:border-ember/60 hover:text-bone ${focusRing}`;

const APPS: { id: UpiApp; name: string }[] = [
  { id: 'gpay', name: 'Google Pay' },
  { id: 'phonepe', name: 'PhonePe' },
  { id: 'paytm', name: 'Paytm' },
  { id: 'any', name: 'Other UPI app' },
];

type Platform = 'ios' | 'android' | 'other';

/**
 * Pay an agreed amount. Two rails in one glass panel:
 *  - UPI: editorial QR (any UPI app scans it), copyable ID, and on phones
 *    one-tap buttons straight into Google Pay / PhonePe / Paytm / any app.
 *  - Card & international: Razorpay / PayPal hosted checkout when the owner
 *    has set the links, otherwise a secure link on request.
 * No amount is baked in: work is scoped first, the client enters the figure.
 */
export function UpiPay({ note = 'Alchemy Labs', className = '' }: { note?: string; className?: string }) {
  const [tab, setTab] = useState<'upi' | 'card'>('upi');
  const [copied, setCopied] = useState(false);
  const [platform, setPlatform] = useState<Platform>('other');

  useEffect(() => {
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/i.test(ua)) setPlatform('ios');
    else if (/Android/i.test(ua)) setPlatform('android');
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(upiVpa);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the ID stays visible to copy by hand */
    }
  };

  const tabBtn = (id: 'upi' | 'card', text: string) => (
    <button
      type="button"
      role="tab"
      id={`pay-tab-${id}`}
      aria-selected={tab === id}
      aria-controls={`pay-panel-${id}`}
      onClick={() => setTab(id)}
      className={`min-h-[40px] flex-1 rounded-full px-4 font-mono text-[10px] tracking-[0.22em] transition-colors ${focusRing} ${
        tab === id ? 'bg-bone text-void' : 'text-bone/60 hover:text-bone'
      }`}
    >
      {text}
    </button>
  );

  return (
    <div className={className}>
      <div role="tablist" aria-label="Payment method" className="flex gap-1 rounded-full border border-line p-1">
        {tabBtn('upi', 'UPI')}
        {tabBtn('card', 'CARD · INTL')}
      </div>

      {tab === 'upi' ? (
        <div id="pay-panel-upi" role="tabpanel" aria-labelledby="pay-tab-upi" className="mt-6">
          {/* glass bezel around the bone tile: gradient hairline + specular top edge */}
          <div className="relative mx-auto w-full max-w-[17rem] rounded-[22px] bg-gradient-to-b from-bone/25 via-bone/[0.06] to-ember/25 p-px shadow-[0_24px_60px_rgba(0,0,0,0.45),0_0_40px_rgba(255,77,28,0.08)]">
            <div className="relative overflow-hidden rounded-[21px] bg-carbon/80 p-3">
              <div aria-hidden className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              {upiQrImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={upiQrImage} alt={`UPI QR code for ${upiPayeeName}`} className="w-full rounded-2xl" />
              ) : (
                <LuxeQr value={upiPaymentUri()} label={`UPI QR code for ${upiPayeeName}`} className="block w-full rounded-2xl" />
              )}
            </div>
          </div>
          <p className="mt-5 text-center font-mono text-[10px] tracking-[0.3em] text-bone/80">
            {upiPayeeName.toUpperCase()}
          </p>
          <div className="mt-3 flex justify-center">
            <button type="button" onClick={copy} className={`${pill} max-w-full gap-2 font-mono text-xs font-normal tracking-wider`} aria-label={`Copy UPI ID ${upiVpa}`}>
              <span className="truncate">{upiVpa}</span>
              {copied ? <Check className="h-3.5 w-3.5 shrink-0 text-ember" /> : <Copy className="h-3.5 w-3.5 shrink-0 text-ash" />}
            </button>
          </div>
          <span className="sr-only" aria-live="polite">{copied ? 'UPI ID copied' : ''}</span>
          <p className="mt-4 text-center text-sm leading-relaxed text-ash">
            Scan with any UPI app and enter the amount we agreed in writing.
          </p>

          {/* phones: straight into the app (iOS has no generic UPI chooser) */}
          {platform !== 'other' && (
            <div className="mt-6">
              <p className="text-center font-mono text-[10px] tracking-[0.25em] text-ash">OR PAY IN YOUR APP</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {APPS.map((a) => (
                  <a key={a.id} href={upiAppLink(a.id, platform, note)} className={pill}>
                    {a.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div id="pay-panel-card" role="tabpanel" aria-labelledby="pay-tab-card" className="mt-6 space-y-3">
          {cardPaymentUrl ? (
            <a href={cardPaymentUrl} target="_blank" rel="noopener noreferrer" className={`flex min-h-[52px] w-full items-center justify-between rounded-full bg-ember px-6 font-sans text-sm font-semibold text-void transition-colors hover:bg-amber ${focusRing}`}>
              Card, netbanking or wallet
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          ) : null}
          {intlPaymentUrl ? (
            <a href={intlPaymentUrl} target="_blank" rel="noopener noreferrer" className={`flex min-h-[52px] w-full items-center justify-between rounded-full border border-ember/60 px-6 font-sans text-sm font-semibold text-bone transition-colors hover:bg-ember hover:text-void ${focusRing}`}>
              International card or PayPal
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          ) : null}
          {!cardPaymentUrl || !intlPaymentUrl ? (
            <div className="rounded-2xl border border-line p-5">
              <p className="text-sm leading-relaxed text-ash">
                {cardPaymentUrl
                  ? 'Paying from outside India? We send a secure international checkout link for your invoice.'
                  : 'Paying by card, netbanking or from outside India? We send a secure hosted checkout link for your invoice.'}
              </p>
              <a
                href={whatsappLink('Hi Alchemy Labs, please send a card payment link for my invoice.')}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm text-bone underline decoration-ember/50 underline-offset-4 hover:decoration-ember ${focusRing}`}
              >
                Request a payment link · {WHATSAPP_DISPLAY}
              </a>
            </div>
          ) : null}
          <p className="pt-2 text-xs leading-relaxed text-ash">
            Card details are entered on the payment provider&rsquo;s own secure page. This site never sees them.
          </p>
        </div>
      )}
    </div>
  );
}
