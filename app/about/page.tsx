import type { Metadata } from 'next';
import About from '@/views/About';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    'Meet Alchemy Labs, an AI-native brand studio in Mumbai founded by Aashrith Gade and Eva Doshi: how we work, what we believe, and why judgment comes first.',
  path: '/about',
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'About', path: '/about' }])} />
      <About />
    </>
  );
}
