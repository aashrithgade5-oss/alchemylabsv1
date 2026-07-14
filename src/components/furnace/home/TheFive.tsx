'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { products, type Product } from '@lib/payments';
import { PaymentSheet } from '../PaymentSheet';
import { AmbientVideo } from './AmbientVideo';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// One full-bleed video per card, cycling through footage already used
// elsewhere on the page — small muted thumbnails at this scale, so reuse
// reads as cohesive rather than repetitive. No new assets needed.
const cardMedia = [
  { src: '/media/red-cloak-water.mp4', poster: '/media/red-cloak-water-poster.jpg' },
  { src: '/media/red-glass-panels.mp4', poster: '/media/red-glass-panels-poster.jpg' },
  { src: '/media/red-gradient-stripes.mp4', poster: '/media/red-gradient-stripes-poster.jpg' },
  { src: '/media/red-slats-tall.mp4', poster: '/media/red-slats-tall-poster.jpg' },
  { src: '/media/red-slats-wide.mp4', poster: '/media/red-slats-wide-poster.jpg' },
];

function ProductCard({
  product,
  media,
  onBuy,
}: {
  product: Product;
  media: (typeof cardMedia)[number];
  onBuy: (p: Product) => void;
}) {
  return (
    // CardContainer/Body/Item: pure CSS-transform 3D tilt (perspective +
    // rotateX/Y), no Three.js, no framer-motion dependency — safe inside a
    // snap-scroll track. glass-solid stays (not GlassPanel): backdrop-filter
    // inside this track re-filters every scrolled frame and glitches the
    // horizontal scroll, confirmed in an earlier session.
    <CardContainer containerClassName="!py-0 w-[20rem] shrink-0 snap-center" className="!w-full">
      <CardBody className="glass-solid group relative flex h-[26rem] w-full flex-col overflow-hidden rounded-2xl !transform-none transition-[box-shadow,border-color] duration-500 hover:border-ember/40 hover:shadow-[0_16px_48px_rgba(255,77,28,0.14)]">
        <AmbientVideo
          src={media.src}
          poster={media.poster}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/70 to-transparent" />
        <div className="relative flex h-full flex-col justify-between p-7">
          <CardItem translateZ={30}>
            <p className="font-mono text-[10px] tracking-[0.25em] text-ash">FIXED SCOPE</p>
            <h3 className="mt-3 font-sans text-xl font-bold leading-snug text-bone">{product.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ash">{product.tagline}</p>
          </CardItem>
          <CardItem translateZ={50} className="mt-8 w-full">
            <p className="font-mono text-sm text-bone">
              ${product.priceUsd}
              <span className="ml-2 text-[11px] text-ash">₹{product.priceInr.toLocaleString('en-IN')}</span>
            </p>
            <button
              onClick={() => onBuy(product)}
              className="mt-4 w-full rounded-full bg-ember px-5 py-2.5 font-sans text-sm font-semibold text-void transition-colors duration-300 hover:bg-amber"
            >
              Buy now · ${product.priceUsd}
            </button>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}

export function TheFive() {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <section id="the-five" className="relative overflow-hidden">
      {/* dim stripes loop behind the section head, masked out before the cards */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[26rem] overflow-hidden"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 25%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 25%, transparent 100%)',
        }}
      >
        <AmbientVideo
          src="/media/red-gradient-stripes.mp4"
          poster="/media/red-gradient-stripes-poster.jpg"
          className="h-full w-full object-cover opacity-[0.14]"
        />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 pt-24 md:px-12 md:pt-32 lg:px-16">
        <p className="font-mono text-[10px] tracking-[0.3em] text-ash">THE PRODUCTIZED FIVE</p>
        <m.h2
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease }}
          className="mt-6 font-headline text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.05] tracking-[-0.03em] text-bone"
        >
          The price is the pitch.
        </m.h2>
        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 max-w-md text-base leading-relaxed text-ash"
        >
          Five offers with printed prices. Pay now and the work starts this week.
        </m.p>
      </div>

      {/* snap gallery: drag or scroll sideways, every price and CTA in view */}
      <div
        className="furnace-snap relative mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-24 md:px-12 md:pb-32 lg:px-16"
        aria-label="The five fixed-price offers"
      >
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            media={cardMedia[i % cardMedia.length]}
            onBuy={setSelected}
          />
        ))}
        <div aria-hidden className="w-1 shrink-0" />
      </div>

      <PaymentSheet product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
