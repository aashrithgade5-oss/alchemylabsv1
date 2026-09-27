'use client';

import { useState } from 'react';
import { subscribeNewsletter } from '@/lib/newsletter';
import Image from 'next/image';
import { MagneticCTA } from './MagneticCTA';

/**
 * Site-wide closing band, mounted once in SiteChrome right above the
 * footer. Rebuilt from the pre-Next.js Footer.tsx (commit f00fef1, the
 * last Vite-era version) — its footer-bg.png treatment and newsletter
 * subsection are real history; the enlarged wordmark and magnetic CTA
 * are new. Patches-2: the newsletter is real now (app/api/newsletter emails
 * the founders on every sign-up and stores it when storage is connected).
 */
export function BottomCTA() {
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('sending');
    const res = await subscribeNewsletter(email, hp, 'closing-band');
    if (res.ok) {
      setState('done');
      setEmail('');
    } else {
      setState('error');
      setMsg(res.error ?? 'Could not subscribe right now.');
    }
  };

  return (
    <section className="relative overflow-hidden border-t border-line bg-void">
      {/* C-P21: flat-black/blurred band → full-bleed PHOTO background
          (unique /media asset, crisp not smeared), same gradient + ember
          radial contrast floor as the rest of the rebuilt pages. */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/media/mb-rider-fog.webp"
          alt=""
          fill
          quality={90}
          sizes="100vw"
          className="object-cover object-[75%_60%] opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-void/55" />
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
        <h2 className="mt-6 font-headline text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.035em] [text-wrap:balance] text-bone">
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
          {state === 'done' ? (
            <p role="status" className="mt-5 text-sm text-bone">
              You are on the list. The next note lands in your inbox.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3" aria-label="Newsletter sign-up">
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <input
                id="nl-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={state === 'sending'}
                className="glass-input !text-bone placeholder:!text-ash"
              />
              {/* honeypot */}
              <input aria-hidden tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" />
              <MagneticCTA type="submit" variant="ghost" className="w-full" disabled={state === 'sending'}>
                {state === 'sending' ? 'Subscribing' : 'Subscribe'}
              </MagneticCTA>
              {state === 'error' && <p role="alert" className="text-sm text-ember">{msg}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
