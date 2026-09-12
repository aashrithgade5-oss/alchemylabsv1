import type { Metadata } from 'next';
import { products } from '@lib/payments';
import ServiceProductPage from '@/views/ServiceProductPage';

// Without these every productized service shared one generic title and OG
// card, so each link preview looked identical. page.tsx stays a server
// component (the view below carries its own 'use client'), so it can export
// route metadata even though the page itself renders on the client.
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = products.find((p) => p.id === params.slug);
  if (!product) return { title: 'Service not found' };

  return {
    title: product.name,
    description: product.tagline,
    alternates: { canonical: `/services/${product.id}` },
    openGraph: {
      title: `${product.name} · Alchemy Labs`,
      description: product.tagline,
      url: `/services/${product.id}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} · Alchemy Labs`,
      description: product.tagline,
    },
  };
}

// Prerender the five at build time instead of server-rendering each on demand.
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

// Rendered through a real server component rather than `export default
// ServiceProductPage` — a bare re-export of a 'use client' binding makes Next
// treat the whole route as client-rendered and skip generateStaticParams.
export default function Page() {
  return <ServiceProductPage />;
}
