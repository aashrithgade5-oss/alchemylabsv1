import type { Metadata } from 'next';
import PrivacyPage from '@/views/PrivacyPage';

const description = 'How Alchemy Labs collects, uses, and protects your information.';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description,
  alternates: { canonical: '/privacy' },
  openGraph: { title: 'Privacy Policy · Alchemy Labs', description, url: '/privacy' },
};

export default PrivacyPage;
