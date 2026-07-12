'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { products, type Product } from '@lib/payments';
import { PaymentSheet } from '../PaymentSheet';
import { AmbientVideo } from './AmbientVideo';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

function ProductCard({ product, onBuy }: { product: Product; onBuy: (p: Product) => void }) {
  return (
    <div className="liquid-glass group flex w-[19rem] shrink-0 flex-col justify-between rounded-2xl p-7 transition-colors duration-500 hover:border-ember/40">
      <div>
        <p className="font-mono text-[10px] tracking-[0.25em] text-ash">FIXED SCOPE</p>
        <h3 className="mt-4 font-sans text-xl font-bold leading-snug text-bone">{product.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ash">{product.tagline}</p>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <span className="font-mono text-sm text-bone">
          ${product.priceUsd}
          <span className="ml-2 text-[11px] text-ash">₹{product.priceInr.toLocaleString('en-IN')}</span>
        </span>
        <button
          onClick={() => onBuy(product)}
          className="rounded-full border border-ember/50 px-4 py-1.5 font-sans text-xs font-semibold text-ember transition-colors duration-300 hover:bg-ember hover:text-void"
        >
          Buy now
        </button>
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
          className="mt-6 font-sans text-4xl font-bold text-bone md:text-5xl"
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

      {/* CSS marquee: track duplicated once, pauses on hover and on focus */}
      <div className="furnace-marquee relative mt-14 overflow-hidden pb-24 md:pb-32" aria-label="The five fixed-price offers">
        <div className="furnace-marquee-track flex w-max gap-5 px-6">
          {[...products, ...products].map((product, i) => (
            <ProductCard
              key={`${product.id}-${i}`}
              product={product}
              onBuy={setSelected}
            />
          ))}
        </div>
      </div>

      <PaymentSheet product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
