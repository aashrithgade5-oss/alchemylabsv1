'use client';

import Link from 'next/link';
import { EmberField } from '@/components/fx/EmberField';
import { LiquidMark } from '@/components/fx/LiquidMark';
import { MagneticCTA } from '@/components/furnace/MagneticCTA';

// Patches-5: the 404 joins the brand. A slow dusk field, the atom in liquid
// metal, one honest line, two ways back.
const NotFound = () => (
  <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-void px-6 font-sans">
    <EmberField preset="dusk" />
    <div className="relative flex flex-col items-center text-center">
      <LiquidMark size={120} />
      <p className="mt-10 font-mono text-[10px] tracking-[0.35em] text-bone/55">ERROR 404</p>
      <h1 className="mt-5 font-headline text-[clamp(2.4rem,6vw,4.75rem)] font-bold leading-[1.04] tracking-[-0.035em]">
        <span className="glass-type">Nothing was made </span>
        <span className="font-playfair font-normal italic text-bone">here</span>
        <span className="glass-type">.</span>
      </h1>
      <p className="mt-5 max-w-sm text-base leading-relaxed text-bone/65">The page you wanted has moved, or never existed.</p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <MagneticCTA href="/" variant="ember">Back to the studio</MagneticCTA>
        <MagneticCTA href="/work" variant="ghost">See the work</MagneticCTA>
      </div>
    </div>
  </main>
);

export default NotFound;
