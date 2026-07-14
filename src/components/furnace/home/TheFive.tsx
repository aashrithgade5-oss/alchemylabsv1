'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { products, type Product } from '@lib/payments';
import { PaymentSheet } from '../PaymentSheet';
import { AmbientVideo } from './AmbientVideo';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// One distinct visual field per card — elite DTC product shelf, no two alike.
const cardFields = [
  'linear-gradient(135deg, rgba(220,68,28,0.45) 0%, rgba(90,14,8,0.7) 100%)',
  'radial-gradient(20rem 14rem at 80% 0%, rgba(255,100,40,0.4) 0%, rgba(60,10,6,0.7) 70%)',
  'linear-gradient(200deg, rgba(178,34,20,0.55) 0%, rgba(30,8,5,0.8) 90%)',
  'radial-gradient(18rem 16rem at 15% 100%, rgba(220,68,28,0.42) 0%, rgba(50,10,6,0.75) 75%)',
  'linear-gradient(160deg, rgba(255,120,50,0.35) 0%, rgba(80,14,8,0.75) 100%)',
];

function ProductCard({
  product,
  field,
  onBuy,
}: {
  product: Product;
  field: string;
  onBuy: (p: Product) => void;
}) {
  return (
    // glass-solid, not GlassPanel: backdrop-filter inside the snap track
    // re-filters every scrolled frame and glitches the horizontal scroll
    <div className="glass-solid group relative flex w-[20rem] shrink-0 snap-center flex-col overflow-hidden rounded-2xl transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-ember/40 hover:shadow-[0_16px_48px_rgba(255,77,28,0.14)]">
      <div aria-hidden className="h-28 w-full" style={{ background: field }} />
      <div className="flex flex-1 flex-col justify-between p-7">
        <div>
          <p className="font-mono text-[10px] tracking-[0.25em] text-ash">FIXED SCOPE</p>
          <h3 className="mt-3 font-sans text-xl font-bold leading-snug text-bone">{product.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ash">{product.tagline}</p>
        </div>
        <div className="mt-8">
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
        </div>
      </div>
    </div>
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
          className="mt-6 font-sans text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.05] tracking-[-0.03em] text-bone"
        >
          Start under $300.
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
            field={cardFields[i % cardFields.length]}
            onBuy={setSelected}
          />
        ))}
        <div aria-hidden className="w-1 shrink-0" />
      </div>

      <PaymentSheet product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
