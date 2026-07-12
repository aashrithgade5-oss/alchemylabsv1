import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from '@/components/Providers';
import { LayoutTransition } from '@/components/LayoutTransition';
import { SiteChrome } from '@/components/furnace/SiteChrome';
import { GrainOverlay } from '@/components/furnace/GrainOverlay';
import { CookieConsent } from '@/components/CookieConsent';
import '@/index.css';

// Playfair is reserved for editorial pull-quotes only; Geist carries
// everything else (display, body, mono).
const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
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
    <html lang="en" className={`${playfair.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
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
          <SpeedInsights />
        </body>
      </html>
  );
}
