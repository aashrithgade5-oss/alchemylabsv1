import type { MetadataRoute } from 'next';
import { SITE } from '@lib/seo';

// Everything public is crawlable; the unpublished /journal is not. The private
// vault is deliberately NOT listed (a disallow line would advertise its path);
// it is noindex + auth-gated in middleware.ts instead.
// (both also carry noindex metadata via their segment layouts).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/journal'] }],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
