'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { products, type Product } from '@lib/payments';
import { PaymentSheet } from '../PaymentSheet';
import { GlassPanel } from '../GlassPanel';
import { ScrollScrub } from '../fx/ScrollScrub';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * The Productized Five as a dense buy-now grid. Five cards fill a 3-column
 * grid exactly: the first spans two columns as the anchor.
 */
export function FiveGrid() {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <section id="the-five" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-32 lg:px-16">
        {/* clause-per-line rule + per-word scrub, one clause per row */}
        <h2 className="max-w-2xl font-headline text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.05] tracking-[-0.03em] text-bone">
          {/* display:flex makes each span block-level: one clause per line */}
          <ScrollScrub as="span" text="No call." wordClassName="glass-type" />
          <ScrollScrub as="span" text="No proposal." wordClassName="glass-type" />
          <ScrollScrub as="span" text="Just checkout." wordClassName="glass-type" />
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-ash">
          Five offers with printed prices. Pay now and the work starts this week.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <m.div
              key={product.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.07, ease }}
              className={i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''}
            >
              <GlassPanel className="group h-full transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-ember/40 hover:shadow-[0_16px_48px_rgba(255,77,28,0.14)]">
                <div className="flex h-full flex-col justify-between p-7">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.25em] text-ash">FIXED SCOPE</p>
                    <h3 className="mt-4 font-sans text-xl font-bold leading-snug text-bone">
                      {product.name}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-ash">{product.tagline}</p>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="font-mono text-sm text-bone">
                      ${product.priceUsd}
                      <span className="ml-2 text-[11px] text-ash">
                        ₹{product.priceInr.toLocaleString('en-IN')}
                      </span>
                    </span>
                    <button
                      onClick={() => setSelected(product)}
                      className="rounded-full border border-ember/50 px-4 py-1.5 font-sans text-xs font-semibold text-ember transition-colors duration-300 hover:bg-ember hover:text-void"
                    >
                      Buy now
                    </button>
                  </div>
                </div>
              </GlassPanel>
            </m.div>
          ))}
        </div>
      </div>

      <PaymentSheet product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
