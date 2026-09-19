import type { Metadata } from 'next';
import JournalPage from '@/views/JournalPage';

const description = 'Perspectives on brand, systems, and intelligence from Alchemy Labs.';

export const metadata: Metadata = {
  title: 'Journal',
  description,
  alternates: { canonical: '/journal' },
  // unpublished: kept out of search until the journal launches
  robots: { index: false, follow: false },
  openGraph: { title: 'Journal · Alchemy Labs', description, url: '/journal' },
};

export default JournalPage;
