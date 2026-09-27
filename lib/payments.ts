// Payment + offer config (Patches-1, 2026-09-27): NO exact prices anywhere on
// the site. Every engagement is scoped per project; the five productized
// offers only show a "from" starting point. Payment happens AFTER scope is
// agreed, so UPI carries no amount: the client enters the agreed figure.
//
// FUTURE BUILD (not live): Razorpay for India (UPI/cards/netbanking, invoices
// + payment links) and Razorpay International or Stripe for cross-border
// cards. Until then international clients are invoiced by email.

/** OWNER: paste the UPI ID here (e.g. 'name@okhdfcbank'). Empty = the UPI
    block hides itself and points people to WhatsApp instead of showing a
    QR that pays nobody. */
export const upiVpa = '';
export const upiPayeeName = 'Alchemy Labs';
/** Optional: your own UPI scanner image (e.g. '/media/upi-qr.png'). When set
    it is shown instead of the generated QR. */
export const upiQrImage: string | null = null;

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

/** UPI intent with NO amount: the payer enters the agreed figure. */
export function upiPaymentUri(note = 'Alchemy Labs'): string {
  const params = new URLSearchParams({
    pa: upiVpa,
    pn: upiPayeeName,
    cu: 'INR',
    tn: note,
  });
  return `upi://pay?${params.toString()}`;
}
