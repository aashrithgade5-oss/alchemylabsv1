import type { Metadata } from 'next';
import JournalPage from '@/views/JournalPage';
import { ogImageFor } from '@lib/seo';
import { ogCard } from '@lib/og';

const description = 'Perspectives on brand, systems, and intelligence from Alchemy Labs.';

export const metadata: Metadata = {
  title: 'Journal',
  description,
  alternates: { canonical: '/journal' },
  // unpublished: kept out of search until the journal launches
  robots: { index: false, follow: false },
  openGraph: { title: 'Journal · Alchemy Labs', description, url: '/journal', images: [ogImageFor('journal', 'Journal · Alchemy Labs')] },
  twitter: { card: 'summary_large_image', images: [ogCard('journal')] },
};

export default JournalPage;
