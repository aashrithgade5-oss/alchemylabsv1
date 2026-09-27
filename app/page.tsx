import type { Metadata } from 'next';
import HomePage from '@/views/HomePage';
import { pageMetadata } from '@lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Alchemy Labs · AI-Native Brand Studio',
  absoluteTitle: true,
  description:
    'Alchemy Labs is an AI-native brand studio in Mumbai. We build brand systems, campaign imagery and AI films, generated wide and cut down by human judgment.',
  path: '/',
});

export default HomePage;
