/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
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
    ];
  },
};

module.exports = nextConfig;
