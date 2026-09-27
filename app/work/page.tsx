import type { Metadata } from 'next';
import Work from '@/views/Work';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Work',
  description:
    'Selected work from Alchemy Labs: concept and self-initiated projects in AI campaign production, brand systems and film, each one labeled for what it is.',
  path: '/work',
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Work', path: '/work' }])} />
      <Work />
    </>
  );
}
