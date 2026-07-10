import type { Metadata } from 'next';
import { Syne, DM_Mono, Cormorant_Garamond } from 'next/font/google';
import { ViewTransitions } from 'next-view-transitions';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from '@/components/Providers';
import { SiteChrome } from '@/components/furnace/SiteChrome';
import { GrainOverlay } from '@/components/furnace/GrainOverlay';
import { CookieConsent } from '@/components/CookieConsent';
import '@/index.css';

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-dm-mono' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-cormorant',
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
    <ViewTransitions>
      <html lang="en" className={`${syne.variable} ${dmMono.variable} ${cormorant.variable}`}>
        <body>
          <Providers>
            <SiteChrome>{children}</SiteChrome>
            <CookieConsent />
          </Providers>
          <GrainOverlay />
          <SpeedInsights />
        </body>
      </html>
    </ViewTransitions>
  );
}
