import type { Metadata } from 'next';
import { ContactPage } from '@/views/ContactPage';

const description =
  'Start the work. Brief us in under three minutes and we reply within 24 hours. The first conversation is the audit.';

export const metadata: Metadata = {
  title: 'Contact',
  description,
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact · Alchemy Labs', description, url: '/contact' },
};

export default ContactPage;
