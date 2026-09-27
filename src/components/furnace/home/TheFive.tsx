'use client';

import { useEffect, useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { fromLabel, products, type Product } from '@lib/payments';
import { PaymentSheet } from '../PaymentSheet';
import { AmbientVideo } from './AmbientVideo';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Phase 8: one shared reel (the website-teardown footage); the tint is what
// tells the five cards apart.
const TEARDOWN_REEL = { src: '/media/red-glass-panels.mp4', poster: '/media/red-glass-panels-poster.jpg' };

// Distinct tints, all inside the locked ember/void/carbon/amber palette.
const cardTints = [
  'linear-gradient(160deg, rgba(255,77,28,0.22) 0%, rgba(10,9,8,0.55) 70%)',
  'linear-gradient(160deg, rgba(201,58,20,0.28) 0%, rgba(10,9,8,0.55) 70%)',
  'linear-gradient(160deg, rgba(255,160,40,0.18) 0%, rgba(10,9,8,0.6) 70%)',
  'linear-gradient(160deg, rgba(237,230,221,0.14) 0%, rgba(10,9,8,0.6) 70%)',
  'linear-gradient(160deg, rgba(255,77,28,0.12) 0%, rgba(201,58,20,0.3) 55%, rgba(10,9,8,0.55) 100%)',
];

// Calm luxury pace: ~18px/s across a ~1.6k px half-track.
const MARQUEE_SECONDS = 90;

function ProductCard({
  product,
  tint,
  onBuy,
  duplicate = false,
}: {
  product: Product;
  tint: string;
  onBuy: (p: Product) => void;
  /** second marquee half: hidden from AT and out of the tab order */
  duplicate?: boolean;
}) {
  // Perf: ten cards used to each autoplay the same reel. The poster holds the
  // frame; the reel only mounts on the card the pointer/focus is on.
  const [live, setLive] = useState(false);
  return (
    <CardContainer containerClassName="!py-0 w-[18rem] shrink-0 snap-start sm:w-[20rem]" className="!w-full">
      <div
        className="contents"
        style={
          {
            '--svc-edge': `${product.accent}66`,
            '--svc-glow': `0 16px 48px ${product.accent}29`,
          } as React.CSSProperties
        }
      >
        <CardBody
          className="glass-solid group relative flex h-[26rem] w-full flex-col overflow-hidden rounded-2xl !transform-none transition-[box-shadow,border-color] duration-500 hover:border-[color:var(--svc-edge)] hover:shadow-[var(--svc-glow)]"
        >
          <div
            className="absolute inset-0"
            onPointerEnter={() => setLive(true)}
            onPointerLeave={() => setLive(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={TEARDOWN_REEL.poster}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
            {live && (
              <AmbientVideo
                src={TEARDOWN_REEL.src}
                poster={TEARDOWN_REEL.poster}
                className="absolute inset-0 h-full w-full object-cover opacity-30"
              />
            )}
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: tint }} />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon via-carbon/70 to-transparent" />
          <div className="pointer-events-none relative flex h-full flex-col justify-between p-7">
            <CardItem translateZ={30}>
              <p className="font-mono text-[10px] tracking-[0.25em] text-ash">FOCUSED OFFER</p>
              <h3 className="mt-3 font-sans text-xl font-bold leading-snug text-bone [text-wrap:balance]">
                <Link
                  href={`/services/${product.id}`}
                  tabIndex={duplicate ? -1 : undefined}
                  className="pointer-events-auto underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
                >
                  {product.name}
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ash [text-wrap:pretty]">{product.tagline}</p>
            </CardItem>
            <CardItem translateZ={50} className="pointer-events-auto mt-8 w-full">
              <p className="font-mono text-xs tracking-[0.15em] text-bone/80">{fromLabel(product)}</p>
              <button
                type="button"
                tabIndex={duplicate ? -1 : undefined}
                onClick={() => onBuy(product)}
                onFocus={() => setLive(true)}
                onBlur={() => setLive(false)}
                className="mt-4 min-h-[44px] w-full rounded-full bg-ember px-5 py-2.5 font-sans text-sm font-semibold text-void transition-colors duration-300 hover:bg-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone focus-visible:ring-offset-2 focus-visible:ring-offset-carbon"
              >
                Get an estimate
              </button>
            </CardItem>
          </div>
        </CardBody>
      </div>
    </CardContainer>
  );
}

export function TheFive() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const reduced = useReducedMotion();
  // Touch devices get a native swipe/snap row instead of an auto marquee.
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (pointer: coarse)');
    const sync = () => setTouch(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const scrollRow = Boolean(reduced) || touch;
  const paused = userPaused || hovered || focused;

  return (
    <section id="the-five" className="relative scroll-mt-24 overflow-hidden">
      <div aria-hidden className="section-feather absolute inset-0 overflow-hidden">
        <AmbientVideo
          src="/media/red-gradient-stripes.mp4"
          poster="/media/red-gradient-stripes-poster.jpg"
          className="h-full w-full object-cover opacity-[0.1]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-void/70" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 px-6 pt-24 md:px-12 md:pt-32 lg:px-16">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-ash">THE PRODUCTIZED FIVE</p>
          <m.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease }}
            className="mt-6 font-headline text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-bone [text-wrap:balance]"
          >
            <span className="glass-type">Scoped to </span>
            <span className="font-playfair font-normal italic">ship</span>
            <span className="glass-type">.</span>
          </m.h2>
          <m.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 max-w-md text-base leading-relaxed text-ash [text-wrap:pretty]"
          >
            Five focused ways to start. Each begins from a set point and is scoped to your brief
            before anything is billed.
          </m.p>
        </div>
        {!scrollRow && (
          <button
            type="button"
            aria-pressed={userPaused}
            aria-label={userPaused ? 'Play the offer carousel' : 'Pause the offer carousel'}
            onClick={() => setUserPaused((p) => !p)}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line px-5 font-mono text-[10px] tracking-[0.25em] text-bone/80 transition-colors hover:border-ember/60 hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
          >
            <span aria-hidden>{userPaused ? '▶' : '❚❚'}</span>
            {userPaused ? 'PLAY' : 'PAUSE'}
          </button>
        )}
      </div>

      {scrollRow ? (
        // Static, swipeable snap row: touch devices and reduced motion.
        <div
          role="region"
          aria-label="The five focused offers"
          tabIndex={0}
          className="furnace-snap relative mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-6 px-6 pb-24 focus-visible:outline-none md:scroll-px-12 md:px-12 md:pb-32"
        >
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} tint={cardTints[i % cardTints.length]} onBuy={setSelected} />
          ))}
        </div>
      ) : (
        <div
          role="region"
          aria-label="The five focused offers"
          className="relative mt-14 overflow-hidden pb-24 md:pb-32"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
          }}
        >
          {/* two identical halves (each pr-5 == gap-5) so -50% loops seamlessly */}
          <div
            className="furnace-marquee-track flex w-max"
            data-paused={paused}
            style={{ animationDuration: `${MARQUEE_SECONDS}s` }}
          >
            {[0, 1].map((half) => (
              <div key={half} aria-hidden={half === 1 || undefined} className="flex shrink-0 gap-5 pr-5">
                {products.map((product, i) => (
                  <ProductCard
                    key={`${half}-${product.id}`}
                    product={product}
                    tint={cardTints[i % cardTints.length]}
                    onBuy={setSelected}
                    duplicate={half === 1}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <PaymentSheet product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
