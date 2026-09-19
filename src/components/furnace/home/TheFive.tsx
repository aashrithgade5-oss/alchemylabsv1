'use client';

import { useState } from 'react';
import Image from 'next/image';
import { m, useReducedMotion } from 'framer-motion';
import { products, type Product } from '@lib/payments';
import { PaymentSheet } from '../PaymentSheet';
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

function ProductCard({ product, n, onBuy }: { product: Product; n: number; onBuy: (p: Product) => void }) {
  return (
    <article className="group relative flex h-[24rem] w-[19rem] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-bone/[0.08] bg-carbon/80 p-7 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-bone/20">
      {/* one thin specular edge, the obsidian motif, lit on hover */}
      <span
        aria-hidden
        className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-ember/0 to-transparent transition-colors duration-700 group-hover:via-ember/70"
      />
      <div>
        <p className="font-mono text-[10px] tracking-[0.25em] text-ash">
          {String(n).padStart(2, '0')} · FIXED SCOPE
        </p>
        <h3 className="type-scroll mt-5 text-[1.9rem] text-bone">{product.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ash">{product.tagline}</p>
      </div>
      <div>
        <p className="flex items-baseline gap-2">
          <span className="font-headline text-3xl font-light tracking-tight text-bone">${product.priceUsd}</span>
          <span className="font-mono text-[11px] text-ash">₹{product.priceInr.toLocaleString('en-IN')}</span>
        </p>
        <button
          onClick={() => onBuy(product)}
          className="mt-5 min-h-11 w-full rounded-full border border-bone/15 px-5 py-2.5 font-sans text-sm text-bone transition-colors duration-300 hover:border-ember hover:bg-ember hover:text-void focus-visible:border-ember"
        >
          Buy now
        </button>
      </div>
    </article>
  );
}

export function TheFive() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  // reduced motion: the CSS animation is disabled globally (index.css), so
  // the duplicated set would otherwise just sit there as a static double
  // listing — render the single half instead.
  const halves = reduced ? [0] : [0, 1];

  return (
    <section id="the-five" className="relative overflow-hidden">
      {/* Phase 8: full-bleed seamless background across the WHOLE section
          (was masked out after 26rem, leaving the card track on flat void —
          "not a dark box" per the brief). */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <Image
          src="/media/obsidian-fold-1.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-right opacity-90"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 pt-24 md:px-12 md:pt-32 lg:px-16">
        <p className="font-mono text-[10px] tracking-[0.3em] text-ash">THE PRODUCTIZED FIVE</p>
        <m.h2
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease }}
          className="mt-6 font-headline text-[clamp(2.25rem,4.5vw,4rem)] font-light leading-[1.02] tracking-[-0.04em] text-bone"
        >
          Priced to ship.
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

      {/* Phase 8 marquee: track holds the 5 cards duplicated once (10 total)
          animating to -50%, which loops seamlessly back to frame zero.
          Paused on hover/focus so the CTA inside a card is safely clickable
          — this is the mitigation for the earlier session's stated reason
          for NOT building a literal marquee ("fights a clickable Buy-now
          button"): the brief's own follow-up asks for exactly this pause
          behavior, so it resolves that concern rather than ignoring it. */}
      <div
        className="relative mt-14 overflow-hidden pb-24 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:pb-32"
        aria-label="The five fixed-price offers"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* C-P16 seam fix: the old single flex track carried a leading px-6
            pad + a dangling gap, so translateX(-50%) never landed on an
            identical frame — the visible jump read as reverse playback.
            Two IDENTICAL half groups (each pr-5 so the boundary gap matches
            the internal gap-5) make -50% loop with no seam. */}
        <div className="furnace-marquee-track flex w-max" data-paused={paused}>
          {halves.map((half) => (
            <div key={half} aria-hidden={half === 1} className="flex shrink-0 gap-5 pr-5">
              {products.map((product, i) => (
                <ProductCard
                  key={`${half}-${product.id}`}
                  product={product}
                  n={i + 1}
                  onBuy={setSelected}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <PaymentSheet product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
