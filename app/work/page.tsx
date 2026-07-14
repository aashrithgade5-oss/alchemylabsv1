import type { Metadata } from 'next';
import Work from '@/views/Work';

const description =
  'Selected work: honestly labeled concept and self-initiated projects in AI campaign production and brand systems.';

export const metadata: Metadata = {
  title: 'Work',
  description,
  openGraph: { title: 'Work · Alchemy Labs', description },
};

export default Work;
