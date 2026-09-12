import type { Metadata } from 'next';
import TermsPage from '@/views/TermsPage';

const description = 'The terms governing engagements and use of the Alchemy Labs site.';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description,
  alternates: { canonical: '/terms' },
  openGraph: { title: 'Terms of Service · Alchemy Labs', description, url: '/terms' },
};

export default TermsPage;
