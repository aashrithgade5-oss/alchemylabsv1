import type { Metadata } from 'next';
import About from '@/views/About';

const description =
  'An AI-native brand studio in Mumbai. How we work, what we believe, and the judgment behind the machine speed.';

export const metadata: Metadata = {
  title: 'About',
  description,
  alternates: { canonical: '/about' },
  openGraph: { title: 'About · Alchemy Labs', description, url: '/about' },
};

export default About;
