'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { m } from 'framer-motion';
import { products } from '@lib/payments';
import { GlassPanel } from '@/components/furnace/GlassPanel';
import { KineticHeadline } from '@/components/furnace/KineticHeadline';
import { CheckoutPanel } from '@/components/furnace/PaymentSheet';
import { HomeAtmosphere } from '@/components/furnace/home/HomeAtmosphere';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// C-P20: per-service long descriptions — copy voice, no em dashes.
const DESCRIPTIONS: Record<string, string> = {
  'brand-glow-up-audit':
    'Your brand as it stands, examined without courtesy. We map where the identity leaks value: type, color, voice, consistency across every surface a customer touches. You get a ranked list of fixes, each one scored by impact against effort, and a straight recommendation on what to do first. No deck padding. No diplomacy. A working document you can hand to any designer, or back to us.',
  'website-teardown':
    'Every screen of your site reviewed the way a skeptical customer reads it. We flag what buries the offer, what slows the click, and what quietly kills trust, then write the fix beside each finding. You receive a plain, ordered list: change this, cut that, move this above the fold. Built to be executed within a week, by any team.',
  'sample-reel':
    "One finished film in your brand's voice before you commit to a system. We take your existing material, write a sixty second cut, and produce it through our AI pipeline under human direction. The grade, pacing, and voice are calibrated to your market. If the reel earns the next conversation, the pipeline that made it is yours to keep using.",
  'logo-rescue':
    'Your existing mark, corrected rather than replaced. We rebuild the geometry, set the clear space, fix the weights, and deliver the files every vendor keeps asking for. The logo you already own starts behaving like it was drawn on purpose. Includes dark and light lockups, a favicon set, and a one page usage sheet nobody needs training to follow.',
  'instagram-aesthetic-audit':
    'Your grid held against the brands you admire until the gap has a name. We audit the last ninety days of posting: composition, color discipline, caption voice, and rhythm. Then we hand you a visual standard and a four week plan to close the distance. The feed stops looking managed and starts looking directed.',
};

// Journal [slug] pattern: client view reads the slug from the pathname, no
// server params needed (see BlogPostPage.tsx precedent).
export default function ServiceProductPage() {
  const slug = usePathname()?.split('/').pop() ?? '';
  const product = products.find((p) => p.id === slug);

  if (!product) {
    return (
      <main className="relative flex min-h-[70svh] flex-col items-center justify-center px-6 text-center font-sans">
        <p className="font-mono text-[10px] tracking-[0.3em] text-ash">NOT FOUND</p>
        <h1 className="mt-6 font-headline text-3xl font-black text-bone">
          That offer does not exist.
        </h1>
        <Link
          href="/services"
          className="mt-8 font-mono text-xs tracking-[0.2em] text-bone/70 transition-colors hover:text-bone"
        >
          ← ALL SERVICES
        </Link>
      </main>
    );
  }

  return (
    <main className="relative font-sans">
      <HomeAtmosphere />

      <section className="relative overflow-hidden px-6 pb-10 pt-40 md:px-12 md:pt-48">
        {/* category-glow field behind the hero, colored by the product accent */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 45% at 50% 30%, ${product.accent}1f 0%, transparent 70%)`,
          }}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-mono text-[10px] tracking-[0.3em] text-bone/70 md:text-[11px]"
          >
            FIXED SCOPE · ${product.priceUsd} · ₹{product.priceInr.toLocaleString('en-IN')}
          </m.p>
          <KineticHeadline
            as="h1"
            text={product.name}
            className="mx-auto mt-7 justify-center font-headline text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-[1.05] tracking-[-0.04em] text-bone"
            wordClassName="glass-type"
            delay={0.2}
          />
          <m.p
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.6, ease }}
            className="mx-auto mt-7 max-w-xl font-playfair text-xl italic text-bone/75 md:text-2xl"
          >
            {product.tagline}
          </m.p>
          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.85, ease }}
            className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-bone/70 md:text-lg"
          >
            {DESCRIPTIONS[product.id]}
          </m.p>
        </div>
      </section>

      {/* the existing UPI checkout flow, housed in liquid glass — reused
          from PaymentSheet, not rebuilt */}
      <section className="relative px-4 pb-28 md:px-6 md:pb-36">
        <m.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease }}
          className="mx-auto max-w-md"
        >
          <GlassPanel refract className="px-8 py-10">
            <CheckoutPanel product={product} />
          </GlassPanel>
        </m.div>
        <div className="mt-12 text-center">
          <Link
            href="/services#the-five"
            className="font-mono text-xs tracking-[0.2em] text-bone/70 transition-colors duration-300 hover:text-bone"
          >
            ← ALL FIVE OFFERS
          </Link>
        </div>
      </section>
    </main>
  );
}
