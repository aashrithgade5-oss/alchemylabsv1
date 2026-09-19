import type { MetadataRoute } from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alchemylabs.in';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/journal'] }],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
