// Payment + offer config (Patches-1, 2026-09-27): NO exact prices anywhere on
// the site. Every engagement is scoped per project; the five productized
// offers only show a "from" starting point. Payment happens AFTER scope is
// agreed, so UPI carries no amount: the client enters the agreed figure.
//
// FUTURE BUILD (not live): Razorpay for India (UPI/cards/netbanking, invoices
// + payment links) and Razorpay International or Stripe for cross-border
// cards. Until then international clients are invoiced by email.

/** UPI ID. Taken from the owner's own PhonePe scanner (decoded 2026-09-27):
    upi://pay?pa=7794912315@ybl&pn=AASHRITH GADE. PhonePe also issues
    7794912315@ibl for the same number; swap here if you prefer that one. */
export const upiVpa = '7794912315@ybl';
/** Must match the bank-verified account name. */
export const upiPayeeName = 'Aashrith Gade';
/** Optional: a scanner image to show instead of the generated QR. */
export const upiQrImage: string | null = null;

/** Card / netbanking / wallets (India): a Razorpay Payment Page or Payment
    Link URL (https://rzp.io/...). Empty = the card rail offers a secure link
    on request instead. Set NEXT_PUBLIC_CARD_PAYMENT_URL in Vercel. */
export const cardPaymentUrl = process.env.NEXT_PUBLIC_CARD_PAYMENT_URL ?? '';
/** International cards / PayPal: Razorpay International page, Stripe
    Payment Link or paypal.me URL. Set NEXT_PUBLIC_INTL_PAYMENT_URL. */
export const intlPaymentUrl = process.env.NEXT_PUBLIC_INTL_PAYMENT_URL ?? '';

export const CONTACT_EMAIL = 'alchemylabs.work@gmail.com';
export const WHATSAPP_NUMBER = '917794912315';
export const WHATSAPP_DISPLAY = '+91 77949 12315';
export const CALENDLY_URL = 'https://calendly.com/alchemylabs-work/30min';

export function whatsappLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function estimateText(offer?: string) {
  return offer
    ? `Hi Alchemy Labs, I'd like a rough estimate for ${offer}. Brand: `
    : `Hi Alchemy Labs, I'd like a rough estimate for a project. Brand: `;
}

/** "From ₹9,000": the only price form allowed on the site. */
export function fromLabel(p: { fromInr: number }) {
  return `From ₹${p.fromInr.toLocaleString('en-IN')}`;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  /** Starting point in INR. Final figure is scoped per brief. */
  fromInr: number;
  /** C-P16: category accent hex, drawn from the locked palette (ember /
      ember-deep / amber / bone / ash) — drives the per-service hover glow
      on the marquee and the services pages. Not arbitrary colors. */
  accent: string;
}

export const products: Product[] = [
  {
    id: 'brand-glow-up-audit',
    accent: '#FF4D1C',
    name: 'Brand Glow-Up Audit',
    tagline: "A direct read on your brand's current state, with fixes ranked by impact.",
    fromInr: 9000,
  },
  {
    id: 'website-teardown',
    accent: '#C93A14',
    name: 'Website Teardown',
    tagline: 'Your site reviewed screen by screen, with a plain list of what to change.',
    fromInr: 9000,
  },
  {
    id: 'sample-reel',
    accent: '#FFA028',
    name: 'Sample Reel',
    tagline: "One finished AI film in your brand's voice, before you commit to more.",
    fromInr: 14000,
  },
  {
    id: 'logo-rescue',
    accent: '#EDE6DD',
    name: 'Logo Rescue',
    tagline: 'Your existing mark corrected and set to standard.',
    fromInr: 12000,
  },
  {
    id: 'instagram-aesthetic-audit',
    accent: '#9A9186',
    name: 'Instagram Aesthetic Audit',
    tagline: 'Your grid held against the brands you admire, with a plan to close the gap.',
    fromInr: 9000,
  },
];

/** UPI query with NO amount: the payer enters the agreed figure. */
export function upiQuery(note = ''): string {
  // %20 spaces (some apps choke on '+'), and a LITERAL '@' in the VPA:
  // several UPI apps never decode %40, so the ID would not resolve.
  const q: [string, string][] = [
    ['pa', upiVpa],
    ['pn', upiPayeeName],
    ['cu', 'INR'],
  ];
  if (note) q.push(['tn', note.slice(0, 50)]);
  return q.map(([k, v]) => `${k}=${encodeURIComponent(v).replace(/%40/g, '@')}`).join('&');
}

/** Generic intent: Android shows its UPI app chooser; QR payload too. */
export function upiPaymentUri(note = ''): string {
  return `upi://pay?${upiQuery(note)}`;
}

export type UpiApp = 'gpay' | 'phonepe' | 'paytm' | 'any';

/** App-specific deep links (iOS has no generic upi:// chooser). */
export function upiAppLink(app: UpiApp, platform: 'ios' | 'android' | 'other', note?: string) {
  const q = upiQuery(note);
  switch (app) {
    case 'gpay':
      return platform === 'android'
        ? `intent://pay?${q}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`
        : `gpay://upi/pay?${q}`;
    case 'phonepe':
      return `phonepe://pay?${q}`;
    case 'paytm':
      return `paytmmp://pay?${q}`;
    default:
      return `upi://pay?${q}`;
  }
}
