/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/solutions', destination: '/services', permanent: true },
      { source: '/solutions/:path*', destination: '/services', permanent: true },
      { source: '/services/:slug', destination: '/services', permanent: true },
      { source: '/book-sprint', destination: '/contact', permanent: true },
    ];
  },
};

module.exports = nextConfig;
