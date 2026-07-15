'use client';

import { useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { products, type Product } from '@lib/payments';
import { PaymentSheet } from '../PaymentSheet';
import { AmbientVideo } from './AmbientVideo';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Phase 8 (Landing_Page_Patches.pdf): "I feel like we should only have the
// video that we have currently going on for your website teardown across
// all of them, or rather, each of them with a different tinted liquid glass
// finish so that they can be distinguished." — one shared reel (the
// website-teardown product's own footage), tint is what tells cards apart.
const TEARDOWN_REEL = { src: '/media/red-glass-panels.mp4', poster: '/media/red-glass-panels-poster.jpg' };

// Distinct tints, all inside the locked ember/void/carbon/amber palette
// (style-guide.md: one accent, no new colors) — hue held constant, only
// weight/warmth shifts per card so five cards read as five, not one repeated.
const cardTints = [
  'linear-gradient(160deg, rgba(255,77,28,0.22) 0%, rgba(10,9,8,0.55) 70%)',
  'linear-gradient(160deg, rgba(201,58,20,0.28) 0%, rgba(10,9,8,0.55) 70%)',
  'linear-gradient(160deg, rgba(255,160,40,0.18) 0%, rgba(10,9,8,0.6) 70%)',
  'linear-gradient(160deg, rgba(237,230,221,0.14) 0%, rgba(10,9,8,0.6) 70%)',
  'linear-gradient(160deg, rgba(255,77,28,0.12) 0%, rgba(201,58,20,0.3) 55%, rgba(10,9,8,0.55) 100%)',
];

// Three-way tie at the lowest price point.
const MOST_SELLING = new Set(
  products.filter((p) => p.priceUsd === Math.min(...products.map((x) => x.priceUsd))).map((p) => p.id),
);

function ProductCard({
  product,
  tint,
  onBuy,
}: {
  product: Product;
  tint: string;
  onBuy: (p: Product) => void;
}) {
  return (
    // CardContainer/Body/Item: pure CSS-transform 3D tilt (perspective +
    // rotateX/Y), no Three.js, no framer-motion dependency — safe inside a
    // marquee track. glass-solid stays (not GlassPanel): backdrop-filter
    // inside a moving track re-filters every animation frame and glitches
    // the scroll, confirmed in an earlier session (same reasoning as the
    // old snap-track, still applies to a translating marquee track).
    <CardContainer containerClassName="!py-0 w-[20rem] shrink-0" className="!w-full">
      <CardBody className="glass-solid group relative flex h-[26rem] w-full flex-col overflow-hidden rounded-2xl !transform-none transition-[box-shadow,border-color] duration-500 hover:border-ember/40 hover:shadow-[0_16px_48px_rgba(255,77,28,0.14)]">
        <AmbientVideo
          src={TEARDOWN_REEL.src}
          poster={TEARDOWN_REEL.poster}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        {/* per-card tint: this is what makes five uses of one reel read as
            five distinct cards instead of one repeated video */}
        <div aria-hidden className="absolute inset-0" style={{ background: tint }} />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/70 to-transparent" />
        {MOST_SELLING.has(product.id) && (
          <span className="absolute right-4 top-4 z-10 rounded-full border border-ember/40 bg-void/60 px-3 py-1 font-mono text-[9px] tracking-[0.15em] text-ember">
            MOST SELLING SPRINTS
          </span>
        )}
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
            {/* click completes the transaction (PaymentSheet checkout) —
                per the brief's own follow-up clarification ("they can
                actually click on it and complete the transaction"), not a
                navigation away from a mid-loop card */}
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
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  // reduced motion: the CSS animation is disabled globally (index.css), so
  // the duplicated set would otherwise just sit there as a static double
  // listing — render the single real set instead.
  const trackItems = reduced ? products : [...products, ...products];

  return (
    <section id="the-five" className="relative overflow-hidden">
      {/* Phase 8: full-bleed seamless background across the WHOLE section
          (was masked out after 26rem, leaving the card track on flat void —
          "not a dark box" per the brief). */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <AmbientVideo
          src="/media/red-gradient-stripes.mp4"
          poster="/media/red-gradient-stripes-poster.jpg"
          className="h-full w-full object-cover opacity-[0.1]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-void/70" />
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
        className="relative mt-14 overflow-hidden pb-24 md:pb-32"
        aria-label="The five fixed-price offers"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="furnace-marquee-track flex w-max gap-5 px-6 md:px-12 lg:px-16"
          data-paused={paused}
        >
          {trackItems.map((product, i) => (
            <ProductCard
              key={`${product.id}-${i}`}
              product={product}
              tint={cardTints[i % cardTints.length]}
              onBuy={setSelected}
            />
          ))}
        </div>
      </div>

      <PaymentSheet product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
