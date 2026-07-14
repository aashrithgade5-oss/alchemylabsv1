'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MagneticCTA } from './MagneticCTA';

/**
 * Site-wide closing band, mounted once in SiteChrome right above the
 * footer. Rebuilt from the pre-Next.js Footer.tsx (commit f00fef1, the
 * last Vite-era version) — its footer-bg.png treatment and newsletter
 * subsection are real history; the enlarged wordmark and magnetic CTA
 * are new. The newsletter stays cosmetic (never had a working backend;
 * kept for visual completeness, not reintroduced as a real integration).
 */
export function BottomCTA() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <section className="relative overflow-hidden border-t border-line bg-void">
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/assets/footer-bg.png"
          alt=""
          fill
          className="scale-110 object-cover opacity-60 blur-[8px] saturate-[1.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/75 to-void/40" />
        <div className="absolute bottom-0 left-1/2 h-[60%] w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,77,28,0.14)_0%,transparent_70%)]" />
      </div>

      {/* enlarged wordmark: real text (not the low-res cropped PNG), so it
          stays crisp at this scale */}
      <p
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-sans text-[22vw] font-black leading-none tracking-tighter text-bone/5 md:text-[16vw]"
      >
        ALCHEMY
      </p>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center md:py-32">
        <p className="font-mono text-[10px] tracking-[0.3em] text-ash">BEGIN</p>
        <h2 className="mt-6 font-sans text-[clamp(2rem,4vw,3.25rem)] font-black leading-[1.05] tracking-[-0.03em] text-bone">
          Bring the brand. We will build what it needs.
        </h2>
        <div className="mt-10">
          <MagneticCTA href="/contact" variant="ember">
            Begin
          </MagneticCTA>
        </div>

        <div className="mt-20 w-full max-w-sm border-t border-line pt-10">
          <p className="font-mono text-[10px] tracking-[0.25em] text-ash">NEWSLETTER</p>
          <p className="mt-3 text-sm leading-relaxed text-ash">
            Quarterly notes on brand systems and AI, no filler.
          </p>
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="glass-input !text-bone placeholder:!text-ash"
            />
            <MagneticCTA type="submit" variant="ghost" className="w-full">
              Subscribe
            </MagneticCTA>
          </form>
        </div>
      </div>
    </section>
  );
}
