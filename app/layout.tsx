import type { Metadata } from 'next';
import { Fraunces } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from '@/components/Providers';
import { LayoutTransition } from '@/components/LayoutTransition';
import { SiteChrome } from '@/components/furnace/SiteChrome';
import { GrainOverlay } from '@/components/furnace/GrainOverlay';
import { CookieConsent } from '@/components/CookieConsent';
import '@/index.css';

// Fraunces variable carries display, headlines, and editorial pull-quotes
// (see style-guide.md); Geist carries body + mono. Playfair is retired.
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  axes: ['opsz'],
});

const description =
  'An AI-native brand studio in Mumbai. Brand systems and campaign imagery, built at machine speed under human judgment.';

export const metadata: Metadata = {
  title: {
    default: 'Alchemy Labs · AI-Native Brand Studio',
    template: '%s · Alchemy Labs',
  },
  description,
  // TODO(OVERHAUL_TODO): swap for the real domain once it exists.
  metadataBase: new URL('https://alchemylabsv1.lovable.app'),
  openGraph: {
    title: 'Alchemy Labs · AI-Native Brand Studio',
    description,
    url: 'https://alchemylabsv1.lovable.app',
    siteName: 'Alchemy Labs',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alchemy Labs · AI-Native Brand Studio',
    description,
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // next-view-transitions' <ViewTransitions> wrapper silently blocked every
    // AnimatePresence exit unmount (stuck invisible overlays); removed, the
    // framer fade in LayoutTransition is the page transition.
    <html lang="en" className={`${fraunces.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
        <body>
          <Providers>
            {/* LayoutTransition's transform wrapper breaks position:fixed for
                descendants, so the chrome sits outside it */}
            <SiteChrome>
              <LayoutTransition>{children}</LayoutTransition>
            </SiteChrome>
            <CookieConsent />
          </Providers>
          <GrainOverlay />
          {/* shared displacement filter for .glass-refract-edge (GlassPanel) */}
          <svg aria-hidden className="absolute h-0 w-0">
            <filter id="glass-refract">
              <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </svg>
          <SpeedInsights />
        </body>
      </html>
  );
}
