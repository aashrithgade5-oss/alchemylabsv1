import type { Metadata } from 'next';

// Shared SEO helpers. Why a helper: in the App Router a page's `openGraph` /
// `twitter` object REPLACES the root layout's (no deep merge), so any page that
// set its own openGraph silently lost the default 1200x630 card. Every public
// route builds its metadata here so the card, canonical and titles stay aligned.

export const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alchemylabs.in';
export const SITE_NAME = 'Alchemy Labs';
export const ORG_ID = `${SITE}/#organization`;
export const OG_IMAGE = { url: '/og-image.png', width: 1200, height: 630, alt: 'Alchemy Labs' };

type PageMetaInput = {
  /** Page name, rendered as "<title> · Alchemy Labs" by the root template. */
  title: string;
  description: string;
  /** Route path, e.g. "/services". Used for the canonical and og:url. */
  path: string;
  /** Pass true for a title that must not get the " · Alchemy Labs" suffix. */
  absoluteTitle?: boolean;
  type?: 'website' | 'profile' | 'article';
};

export function pageMetadata({ title, description, path, absoluteTitle, type = 'website' }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} · ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: 'en_IN',
      type,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

/**
 * Joins sentences into a meta description aimed at the 140-160 char window.
 * `required` is always kept. Each `optional` slot is either one sentence or a
 * list of alternatives (longest first); the first alternative that still fits
 * under `max` is appended, so a slot never contributes twice.
 */
export function fitDescription(required: string[], optional: (string | string[])[] = [], max = 160): string {
  let out = required.join(' ');
  for (const slot of optional) {
    const pick = (Array.isArray(slot) ? slot : [slot]).find((s) => out.length + 1 + s.length <= max);
    if (pick) out = `${out} ${pick}`;
  }
  if (out.length > max) out = `${out.slice(0, max - 1).trimEnd()}…`;
  return out;
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE}${c.path === '/' ? '' : c.path}`,
    })),
  };
}

/** Service schema. Deliberately carries NO offers/price data. */
export function serviceJsonLd({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    url: `${SITE}${path}`,
    provider: { '@id': ORG_ID },
    areaServed: 'Worldwide',
  };
}

/** Strips printed price amounts ("from $199", "₹4,999") so schema never carries prices. */
export const stripPrices = (text: string) =>
  text
    .replace(/\s*(?:\b(?:from|at|for)\s+)?(?:[$₹]|\bUSD\s?|\bINR\s?|\bRs\.?\s?)[\d,]+(?:\.\d+)?/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: stripPrices(item.q),
      acceptedAnswer: { '@type': 'Answer', text: stripPrices(item.a) },
    })),
  };
}
