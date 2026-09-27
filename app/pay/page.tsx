import type { Metadata } from 'next';
import PayPage from '@/views/PayPage';

// Utility page shared with clients alongside an invoice: never indexed.
export const metadata: Metadata = {
  title: 'Pay an invoice',
  description: 'Pay an Alchemy Labs invoice by UPI, card or international checkout.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/pay' },
};

export default function Page() {
  return <PayPage />;
}
