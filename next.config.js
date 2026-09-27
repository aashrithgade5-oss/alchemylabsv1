/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Patches-3: Higgsfield generations are served from its CDN and optimized
    // + cached by Vercel's image pipeline (the build sandbox cannot download
    // them). Scoped to this one host.
    remotePatterns: [
      { protocol: 'https', hostname: 'd8j0ntlcm91z4.cloudfront.net' }, // generations
      { protocol: 'https', hostname: 'd2ol7oe51mr4n9.cloudfront.net' }, // re-encoded uploads
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // C-P20 hotfix: the 12:21 AM consolidation MOVED public/assets/* into
  // public/media/ — every historical '/assets/…' reference (including the
  // FROZEN Aashrith portfolio files, which may not be edited) now resolves
  // through this rewrite. One rule fixes all callers at the URL layer.
  async rewrites() {
    return [{ source: '/assets/:path*', destination: '/media/:path*' }];
  },
  // CSP left out on purpose until tested against Turnstile/Supabase/Calendly/
  // Vercel insights in a preview deploy (see docs/DEPLOYMENT.md).
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // HSTS: HTTPS-only for two years, subdomains included, preload-list eligible.
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // one canonical host for search: www -> apex
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.alchemylabs.in' }],
        destination: 'https://alchemylabs.in/:path*',
        permanent: true,
      },
      { source: '/solutions', destination: '/services', permanent: true },
      { source: '/solutions/:path*', destination: '/services', permanent: true },
      // C-P20: the old '/services/:slug → /services' rule is GONE — the five
      // offers have real sub-pages again (app/services/[slug]). Browsers that
      // cached the old 308 may need a hard refresh.
      { source: '/book-sprint', destination: '/contact', permanent: true },
      // SEO pass 2026-09-27: legacy camel-case portfolio slugs -> clean URLs.
      // The old page files stay on disk (AashrithGadePortfolio is frozen);
      // redirects run before filesystem routes, so these are never served.
      { source: '/AashrithGadePortfolio', destination: '/aashrith', permanent: true },
      { source: '/EvaDoshiPortfolio', destination: '/eva', permanent: true },
    ];
  },
};

module.exports = nextConfig;
