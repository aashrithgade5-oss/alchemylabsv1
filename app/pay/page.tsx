import type { Metadata } from 'next';
import PayPage from '@/views/PayPage';
import { ogImageFor } from '@lib/seo';
import { ogCard } from '@lib/og';

// Utility page shared with clients alongside an invoice: never indexed.
export const metadata: Metadata = {
  title: 'Pay an invoice',
  description: 'Pay an Alchemy Labs invoice by UPI, card or international checkout.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/pay' },
  openGraph: { title: 'Pay an invoice · Alchemy Labs', url: '/pay', images: [ogImageFor('pay', 'Pay an Alchemy Labs invoice')] },
  twitter: { card: 'summary_large_image', images: [ogCard('pay')] },
};

export default function Page() {
  return <PayPage />;
}
