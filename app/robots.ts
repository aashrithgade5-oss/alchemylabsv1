import type { MetadataRoute } from 'next';
import { SITE } from '@lib/seo';

// Everything public is crawlable; /admin and the unpublished /journal are not
// (both also carry noindex metadata via their segment layouts).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/journal'] }],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
