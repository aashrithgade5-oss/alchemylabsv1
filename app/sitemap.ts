import type { MetadataRoute } from 'next';
import { products } from '@lib/payments';
import { allOffers } from '@/components/furnace/services/offerDetails';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alchemylabs.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const core = ['', '/work', '/services', '/about', '/contact', '/aashrith', '/eva', '/privacy', '/terms'];
  return [
    ...core.map((p) => ({ url: `${SITE}${p}`, lastModified: now, priority: p === '' ? 1 : 0.7 })),
    ...products.map((p) => ({ url: `${SITE}/services/${p.id}`, lastModified: now, priority: 0.6 })),
    ...allOffers.map(({ slug }) => ({
      url: `${SITE}/services/studio/${slug}`,
      lastModified: now,
      priority: 0.6,
    })),
  ];
}
