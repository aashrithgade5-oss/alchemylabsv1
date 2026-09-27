import type { MetadataRoute } from 'next';
import { products } from '@lib/payments';
import { SITE } from '@lib/seo';
import { allOffers } from '@/components/furnace/services/offerDetails';

// Public, indexable routes only. Deliberately excluded: /admin (private),
// /journal (unpublished, noindex), and the legacy /AashrithGadePortfolio +
// /EvaDoshiPortfolio slugs (308 to /aashrith and /eva in next.config.js).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const core: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/work', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'yearly' },
    { path: '/aashrith', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/eva', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
  ];
  return [
    ...core.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...allOffers.map(({ slug }) => ({
      url: `${SITE}/services/studio/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...products.map((p) => ({
      url: `${SITE}/services/${p.id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
