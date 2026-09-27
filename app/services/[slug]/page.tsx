import type { Metadata } from 'next';
import { products } from '@lib/payments';
import ServiceProductPage from '@/views/ServiceProductPage';
import { JsonLd } from '@/components/JsonLd';
import {
  breadcrumbJsonLd,
  fitDescription,
  pageMetadata,
  serviceJsonLd,
  stripPrices,
} from '@lib/seo';

// Each productized offer gets its own title, description and card. page.tsx
// stays a server component (the view carries its own 'use client'), so it can
// export route metadata. Metadata and schema never carry the price, which is
// shown on the page itself.
const describe = (tagline: string) =>
  stripPrices(
    fitDescription(
      [tagline],
      [
        [
          'A fixed-scope offer from Alchemy Labs, an AI-native brand studio in Mumbai.',
          'A fixed-scope offer from Alchemy Labs, Mumbai.',
        ],
        ['Start dates confirmed in writing.', 'Start without a call.'],
      ],
    ),
  );

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = products.find((p) => p.id === params.slug);
  if (!product) return { title: 'Service not found', robots: { index: false } };
  return pageMetadata({
    title: product.name,
    description: describe(product.tagline),
    path: `/services/${product.id}`,
    og: `product-${product.id}`,
  });
}

// Prerender the five at build time instead of server-rendering each on demand.
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

// Rendered through a real server component rather than `export default
// ServiceProductPage` — a bare re-export of a 'use client' binding makes Next
// treat the whole route as client-rendered and skip generateStaticParams.
export default function Page({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.id === params.slug);
  return (
    <>
      {product && (
        <JsonLd
          data={[
            breadcrumbJsonLd([
              { name: 'Services', path: '/services' },
              { name: product.name, path: `/services/${product.id}` },
            ]),
            serviceJsonLd({
              name: product.name,
              description: stripPrices(product.tagline),
              path: `/services/${product.id}`,
              serviceType: 'Fixed-scope brand service',
            }),
          ]}
        />
      )}
      <ServiceProductPage />
    </>
  );
}
