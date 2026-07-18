// Payment config for the Productized Five — the only offers on the site
// with printed prices. Hero services are scoped per project and never
// carry a number.

// TODO(OVERHAUL_TODO): replace with the real VPA before launch.
export const upiVpa = 'alchemylabs@upi';
export const upiPayeeName = 'Alchemy Labs';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  priceUsd: number;
  priceInr: number;
  /** Card checkout link. null until the gateway exists (OVERHAUL_TODO). */
  checkoutUrl: string | null;
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
    priceUsd: 199,
    priceInr: 9000,
    checkoutUrl: null,
  },
  {
    id: 'website-teardown',
    accent: '#C93A14',
    name: 'Website Teardown',
    tagline: 'Your site reviewed screen by screen, with a plain list of what to change.',
    priceUsd: 199,
    priceInr: 9000,
    checkoutUrl: null,
  },
  {
    id: 'sample-reel',
    accent: '#FFA028',
    name: 'Sample Reel',
    tagline: "One finished AI film in your brand's voice, before you commit to more.",
    priceUsd: 299,
    priceInr: 14000,
    checkoutUrl: null,
  },
  {
    id: 'logo-rescue',
    accent: '#EDE6DD',
    name: 'Logo Rescue',
    tagline: 'Your existing mark corrected and set to standard.',
    priceUsd: 249,
    priceInr: 12000,
    checkoutUrl: null,
  },
  {
    id: 'instagram-aesthetic-audit',
    accent: '#9A9186',
    name: 'Instagram Aesthetic Audit',
    tagline: 'Your grid held against the brands you admire, with a plan to close the gap.',
    priceUsd: 199,
    priceInr: 9000,
    checkoutUrl: null,
  },
];

export function upiPaymentUri(product: Product): string {
  const params = new URLSearchParams({
    pa: upiVpa,
    pn: upiPayeeName,
    am: String(product.priceInr),
    cu: 'INR',
    tn: `${product.name} - Alchemy Labs`,
  });
  return `upi://pay?${params.toString()}`;
}
