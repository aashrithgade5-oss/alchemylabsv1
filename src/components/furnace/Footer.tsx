'use client';

import { useRef, useState } from 'react';
import { LiveWhenVisible } from '@/components/fx/LiveWhenVisible';
import { LiquidMark } from '@/components/fx/LiquidMark';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { subscribeNewsletter } from '@/lib/newsletter';
import { FOOTER_BG } from '@lib/hf';

const nav = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Pay', href: '/pay' },
];

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/brandalchemy._' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/brandalchemylabs/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@brandalchemy-in' },
];

const MARQUEE = ['Strategy', 'Brand systems', 'Identity', 'Campaigns', 'Film', 'Advisory'];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const linkCls =
  'group inline-flex min-h-[40px] w-fit items-center gap-1.5 text-sm text-bone/70 transition-colors duration-300 hover:text-bone';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('sending');
    const res = await subscribeNewsletter(email, hp, 'footer');
    if (res.ok) {
      setState('done');
      setEmail('');
    } else {
      setState('error');
      setMsg(res.error ?? 'Could not subscribe right now.');
    }
  };

  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.25em] text-bone/50">NEWSLETTER</p>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-bone/65">Four notes a year on brands and AI. Nothing else.</p>
      {state === 'done' ? (
        <p role="status" className="mt-4 text-sm text-bone">You are on the list.</p>
      ) : (
        <form onSubmit={submit} className="relative mt-4 flex max-w-sm items-center rounded-full border border-bone/15 bg-void/40 p-1 backdrop-blur-md focus-within:border-ember/60" aria-label="Newsletter sign-up">
          <label htmlFor="ft-email" className="sr-only">Email address</label>
          <input
            id="ft-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={state === 'sending'}
            className="min-h-[44px] min-w-0 flex-1 bg-transparent px-4 text-sm text-bone outline-none placeholder:text-bone/35"
          />
          <input aria-hidden tabIndex={-1} autoComplete="off" name="website" value={hp} onChange={(e) => setHp(e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" />
          <button
            type="submit"
            disabled={state === 'sending'}
            className="min-h-[40px] shrink-0 rounded-full bg-bone px-5 text-sm font-semibold text-void transition-colors hover:bg-ember disabled:opacity-60"
          >
            {state === 'sending' ? 'Joining' : 'Join'}
          </button>
        </form>
      )}
      {state === 'error' && <p role="alert" className="mt-3 text-sm text-ember">{msg}</p>}
    </div>
  );
}

/**
 * Site-wide footer (Patches-6). The molten horizon still at full resolution
 * (the soft 1080p loop and the 1.2x zoom are gone: they were what read as
 * low quality), an editorial index grid with hairlines, and the ALCHEMY
 * wordmark cast in liquid metal (the same Paper LiquidMetal as the atom),
 * rising into place as the page ends. Reduced motion freezes every layer.
 */
export function FurnaceFooter() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const onContact = usePathname() === '/contact';
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const bgY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-6%', '0%']);
  const markY = useTransform(scrollYProgress, [0.45, 1], reduced ? ['0%', '0%'] : ['30%', '0%']);
  const markOpacity = useTransform(scrollYProgress, [0.45, 0.9], reduced ? [1, 1] : [0, 1]);

  return (
    <footer id="site-footer" ref={ref} className="relative overflow-hidden bg-void">
      <div aria-hidden className="absolute inset-0">
        <m.div className="absolute inset-x-0 -top-[6%] bottom-0 will-change-transform" style={{ y: bgY }}>
          <Image src={FOOTER_BG} alt="" fill sizes="100vw" quality={78} className="object-cover object-[50%_62%] opacity-70" />
        </m.div>
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-void/35" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-void to-transparent" />
        {/* fine grid: the brutalist index the content sits on */}
        <div className="footer-grid absolute inset-0" />
      </div>

      {/* linear scroll: the services, drifting under the fold line */}
      <LiveWhenVisible className="relative border-y border-bone/10 py-5">
        <div aria-hidden className="footer-marquee flex w-max whitespace-nowrap">
          {[0, 1].map((k) => (
            <span key={k} className="flex gap-10 pr-10">
              {MARQUEE.map((w, i) => (
                <span key={w} className="flex items-center gap-10 font-headline text-[clamp(1.25rem,2.4vw,2rem)] font-bold tracking-[-0.02em] text-bone/80">
                  {i % 2 ? <span className="font-playfair font-normal italic">{w.toLowerCase()}</span> : w}
                  <span className="h-1.5 w-1.5 rounded-full bg-ember/80" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </LiveWhenVisible>

      <div className="relative mx-auto max-w-6xl px-6 pb-6 pt-20 md:px-10 md:pt-28">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease }}
            className="max-w-3xl font-headline text-[clamp(2.25rem,5.5vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.035em] [text-wrap:balance]"
          >
            <span className="glass-type">Made for brands with </span>
            <span className="font-playfair font-normal italic text-bone">taste</span>
            <span className="glass-type">.</span>
          </m.p>
          {!onContact && <Link
            href="/contact"
            className="cta-sheen group inline-flex min-h-[52px] w-fit shrink-0 items-center gap-3 rounded-full border border-bone/20 bg-bone/[0.06] px-6 text-sm font-semibold text-bone shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition-colors duration-300 hover:border-ember/60 hover:bg-ember/15"
          >
            Book a call
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </Link>}
        </div>

        <div className="mt-16 grid gap-12 border-t border-bone/10 pt-12 md:mt-24 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Link href="/" className="flex w-fit items-center gap-3" aria-label="Alchemy Labs home">
              {/* flat mark here: the wordmark below is this viewport's one WebGL moment */}
              <Image src="/media/alchemy-minimal-logo.png" alt="" width={32} height={32} />
              <span className="flex items-baseline gap-1.5">
                <span className="font-playfair text-xl italic text-bone">Alchemy</span>
                <span className="font-mono text-[10px] tracking-[0.3em] text-bone/60">LABS</span>
              </span>
            </Link>
            <div className="mt-8">
              <Newsletter />
            </div>
          </div>

          <nav className="flex flex-col md:col-span-2" aria-label="Footer">
            <p className="mb-3 font-mono text-[10px] tracking-[0.25em] text-bone/50"><span className="text-ember/80">01</span> SITE</p>
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className={linkCls}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col md:col-span-2">
            <p className="mb-3 font-mono text-[10px] tracking-[0.25em] text-bone/50"><span className="text-ember/80">02</span> ELSEWHERE</p>
            {socials.map((item) => (
              <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                {item.label}
                <ArrowUpRight className="h-3 w-3 opacity-40 transition-opacity group-hover:opacity-80" aria-hidden />
              </a>
            ))}
          </div>

          <div className="flex flex-col md:col-span-3">
            <p className="mb-3 font-mono text-[10px] tracking-[0.25em] text-bone/50"><span className="text-ember/80">03</span> WRITE</p>
            <a href="mailto:alchemylabs.work@gmail.com" className={`${linkCls} break-all font-mono text-xs tracking-wider`}>
              alchemylabs.work@gmail.com
            </a>
            <a href="https://wa.me/917794912315" target="_blank" rel="noopener noreferrer" className={`${linkCls} font-mono text-xs tracking-wider`}>
              +91 77949 12315
            </a>
          </div>
        </div>

        {/* the wordmark, cast in liquid metal, rises into place as the page ends */}
        <m.div aria-hidden style={{ y: markY, opacity: markOpacity }} className="pointer-events-none relative mt-16 select-none md:mt-24">
          <LiveWhenVisible className="relative mx-auto aspect-[2180/410] w-full">
            {/* Patches-8: real liquid metal on desktop (Paper LiquidMetal), prepared
                at idle after load from a half-size mask so reaching the footer
                costs nothing; phones / touch keep the CSS chrome (mask + sweep). */}
            <LiquidMark
              size={0}
              src="/media/alchemy-wordmark-metal.png"
              shaderSrc="/media/alchemy-wordmark-metal-sm.png"
              inset="-1%"
              pixels={1400 * 300}
              tint="#EDE6DD"
              chrome
              desktopOnly
              eager
              look="wordmark"
            />
          </LiveWhenVisible>
        </m.div>

        <div className="relative mt-8 flex flex-col gap-3 border-t border-bone/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] tracking-[0.2em] text-bone/45">AI-NATIVE BRAND STUDIO · WORKING WORLDWIDE</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] tracking-[0.2em] text-bone/45">
            <Link href="/privacy" className="transition-colors hover:text-bone">PRIVACY</Link>
            <Link href="/terms" className="transition-colors hover:text-bone">TERMS</Link>
            <span>© {new Date().getFullYear()} ALCHEMY LABS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
