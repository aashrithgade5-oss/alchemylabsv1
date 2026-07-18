/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
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
