'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Download, Linkedin, Mail, Menu, X } from 'lucide-react';
import { PortfolioFooter } from '@/components/portfolio/PortfolioFooter';
import { NoiseTexture } from '@/components/effects';
import { setScrollLocked } from '@/components/LenisProvider';
import { Marquee } from '@/components/eva/Marquee';
import { HeroMedia } from '@/components/eva/HeroMedia';
import { Photo } from '@/components/eva/Photo';
import {
  eva, evaMedia, heroStats, brandAlchemyPosts, brandAlchemyWork, chain, experience,
  positions, skills, education, languages, debating,
} from '@/data/evaData';

const EASE = [0.22, 1, 0.36, 1] as const;

const NAV = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Profile', href: '#profile' },
  { label: 'Contact', href: '#contact' },
];

// Scroll reveal: hidden at rest, animates on entry; instant under reduced motion.
function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const Eyebrow = ({ n, children }: { n: string; children: ReactNode }) => (
  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/50">
    <span className="text-[rgb(var(--blush))]">{n}</span> — {children}
  </p>
);

// Inter Bold sentence-case line with ONE lowercase Playfair-italic emphasis word.
const Line = ({ pre, em, post = '', className = '', as: Tag = 'h2' }: { pre: string; em: string; post?: string; className?: string; as?: 'h2' | 'p' }) => (
  <Tag className={`font-headline font-bold tracking-[-0.02em] leading-[1.05] [text-wrap:balance] ${className}`}>
    <span className="glass-type">{pre} </span>
    <span className="font-playfair italic font-normal eva-em clip-pad">{em}</span>
    {post && <span className="glass-type">{post}</span>}
  </Tag>
);

const ResumeButton = ({ ghost = false }: { ghost?: boolean }) => (
  <a
    href={eva.resume}
    download
    className={`group inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full px-6 font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
      ghost
        ? 'border border-bone/20 text-bone hover:border-[rgb(var(--blush))] hover:text-[rgb(var(--blush))]'
        : 'bg-[rgb(var(--rose))] text-void shadow-[0_0_40px_-12px_rgb(var(--rose)/0.8)] hover:bg-[rgb(var(--petal))]'
    }`}
  >
    <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
    Download résumé (PDF)
  </a>
);

// ---------- Chrome ----------
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  // Menu open: freeze page scroll (Lenis + native), close on Escape.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    setScrollLocked(true);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = prev;
      setScrollLocked(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled ? 'bg-void/85 border-b border-bone/10' : ''}`}
        aria-label="Eva Doshi"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          <Link href="/about" className="group flex min-h-[44px] items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/60 hover:text-bone">
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
            <span>Alchemy Labs</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            {NAV.map((l) => (
              <a key={l.href} href={l.href} className="eva-link inline-flex min-h-[44px] items-center font-mono text-[11px] uppercase tracking-[0.2em] text-bone/60 transition-colors hover:text-[rgb(var(--blush))]">
                {l.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/15 md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="h-5 w-5 text-bone" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col bg-void px-6 pb-10 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button type="button" onClick={() => setOpen(false)} className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-bone/15" aria-label="Close menu" autoFocus>
              <X className="h-5 w-5 text-bone" />
            </button>
            <div className="flex flex-1 flex-col justify-center gap-2">
              {NAV.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[56px] items-center gap-4 font-headline text-4xl font-bold text-bone hover:text-[rgb(var(--blush))]"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: EASE }}
                >
                  <span className="font-mono text-[11px] tracking-[0.2em] text-[rgb(var(--blush))]">{String(i + 1).padStart(2, '0')}</span>
                  {l.label}
                </motion.a>
              ))}
            </div>
            <ResumeButton />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-[rgb(var(--rose))] via-[rgb(var(--blush))] to-[rgb(var(--petal))]" style={{ scaleX }} />;
}

// ---------- Hero ----------
function WordCycler() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % eva.heroWords.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);
  return (
    <span className="relative inline-block min-w-[5.5ch] align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={eva.heroWords[i]}
          className="inline-block font-playfair italic font-normal eva-em clip-pad"
          initial={{ opacity: 0, y: '0.4em' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-0.4em' }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {eva.heroWords[i]}
        </motion.span>
      </AnimatePresence>
      <span className="glass-type">.</span>
    </span>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden bg-void">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y: mediaY, scale: 1.08 }}>
        <HeroMedia />
      </motion.div>
      {/* Legibility: left wash for the copy column, bottom falloff into the void, faint blush bloom behind subject */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#0A0908_0%,rgb(10_9_8/0.85)_30%,rgb(10_9_8/0.35)_58%,transparent_78%)] max-md:bg-[linear-gradient(180deg,rgb(10_9_8/0.35)_0%,rgb(10_9_8/0.55)_45%,#0A0908_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-void to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_78%_45%,rgb(var(--blush)/0.12),transparent_70%)]" />
      <NoiseTexture opacity={0.03} />

      <motion.div style={reduce ? undefined : { y: textY, opacity: fade }} className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-28 sm:px-8 sm:pb-20">
        <motion.p
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="eva-pulse text-[rgb(var(--blush))]" aria-hidden="true">●</span> {eva.role} · {eva.city}
        </motion.p>

        <h1 className="mt-6 font-headline font-bold leading-[0.9] tracking-[-0.04em] text-[clamp(3.5rem,14vw,11rem)]">
          {['Eva', 'Doshi'].map((w, i) => (
            <span key={w} className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.25 + i * 0.12, ease: EASE }}
              >
                <span className="glass-type">{w}</span>
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-6 max-w-xl [text-wrap:balance] font-headline text-2xl font-bold leading-tight sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
        >
          <span className="glass-type">Luxury brands, built with </span>
          <WordCycler />
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
        >
          <ResumeButton />
          <a href="#contact" className="group inline-flex min-h-[48px] items-center gap-2 px-2 font-mono text-xs uppercase tracking-[0.18em] text-bone/70 hover:text-[rgb(var(--blush))]">
            Start a conversation <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </motion.div>

        <motion.dl
          className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-bone/10 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {heroStats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="mt-1 font-mono text-[10px] uppercase leading-snug tracking-[0.15em] text-bone/50">{s.label}</dt>
              <dd className="font-headline text-2xl font-bold text-bone sm:text-4xl">{s.value}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}

// ---------- Sections ----------
function Story() {
  return (
    <section className="px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <Line pre="Strategy that reads like" em="story" post="." className="text-[clamp(2.25rem,6vw,5rem)]" />
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone/75 sm:text-xl">
            Eva co-founded Brand Alchemy and runs its client side end to end: winning the brief, setting the
            creative direction, and delivering for fashion and luxury labels. Before that she was on the agency
            floor at Dentsu Creative, writing and building social for 12+ brands, from Forevermark to Dove,
            with work going out every week across Instagram, digital and OOH.
          </p>
          <p className="mt-5 max-w-2xl leading-relaxed text-bone/60">
            She trained at NMIMS School of Branding &amp; Advertising and in luxury management at HEC Paris,
            and has shot and cut branded Reels for AND, Pepe Jeans, Azorte and Lovechild by Masaba.
          </p>
        </Reveal>
        <div className="lg:col-span-5">
          <Photo image={evaMedia.atelier} ratio="aspect-[4/5]" sizes="(min-width:1024px) 40vw, 92vw" className="mx-auto max-w-md lg:max-w-none" parallax />
        </div>
      </div>
    </section>
  );
}

function Chain() {
  return (
    <section aria-labelledby="chain-title" className="border-t border-bone/10 px-4 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/50">How she works</p>
          <div id="chain-title">
            <Line pre="One strategist, the" em="whole" post=" chain." className="mt-5 text-[clamp(2rem,5vw,4rem)]" />
          </div>
        </Reveal>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-3">
          {chain.map((c, i) => (
            <li key={c.step} className="bg-void">
              <Reveal delay={i * 0.05} className="group relative h-full p-7 sm:p-8">
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[rgb(var(--blush))] transition-transform duration-700 group-hover:scale-x-100" aria-hidden="true" />
                <span className="font-mono text-[11px] tracking-[0.2em] text-[rgb(var(--blush))]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 font-headline text-2xl font-bold text-bone">{c.step}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-bone/45">{c.where}</p>
                <p className="mt-4 text-bone/70">{c.proof}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function BrandAlchemyWork() {
  return (
    <section id="work" className="scroll-mt-16 border-y border-bone/10 bg-carbon py-24 sm:py-32">
      <Reveal className="mx-auto mb-12 flex max-w-7xl flex-col gap-6 px-4 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow n="01">Brand Alchemy</Eyebrow>
          <Line pre="Co-founded, and" em="curated" post=" post by post." className="mt-5 text-[clamp(2rem,5vw,4rem)]" />
        </div>
        <p className="max-w-sm text-bone/60">
          A brand strategy consultancy for fashion and luxury positioning. 4+ clients onboarded across the
          full lifecycle, 100% retained to date. Below, a run of its own posts.
        </p>
      </Reveal>

      <Marquee label="Brand Alchemy social posts" seconds={70}>
        {brandAlchemyPosts.map((p, i) => (
          <figure
            key={p.src}
            className={`group relative mr-4 shrink-0 self-center overflow-hidden rounded-2xl border border-bone/10 transition-colors duration-500 hover:border-[rgb(var(--blush)/0.6)] sm:mr-6 ${
              p.ratio === 'square' ? 'aspect-square w-[62vw] sm:w-[300px] lg:w-[340px]' : 'aspect-[4/5] w-[62vw] sm:w-[300px] lg:w-[340px]'
            }`}
          >
            <Image
              src={p.src}
              alt={`Brand Alchemy social post ${i + 1}`}
              fill
              sizes="(min-width:1024px) 340px, (min-width:640px) 300px, 62vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </figure>
        ))}
      </Marquee>

      <div className="mt-10 border-t border-bone/10 pt-8">
        <Marquee label="What Eva did at Brand Alchemy" seconds={60} reverse>
          {brandAlchemyWork.map((w) => (
            <span key={w} className="flex items-center whitespace-nowrap font-headline text-2xl font-bold text-bone/80 sm:text-4xl">
              <span className="px-6 sm:px-10">{w}</span>
              <span className="text-[rgb(var(--blush))]" aria-hidden="true">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function Experience() {
  const [active, setActive] = useState(0);
  return (
    <section id="experience" className="scroll-mt-16 px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow n="02">Experience</Eyebrow>
          <Line pre="Agency floor to" em="founder" post="'s desk." className="mt-5 text-[clamp(2rem,5vw,4rem)]" />
        </Reveal>

        <div className="mt-16 lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Desktop: one sticky frame that follows the role in view. */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-24 aspect-[4/5] overflow-hidden rounded-2xl border border-bone/10 bg-carbon">
              {experience.map((r, i) => (
                <div
                  key={r.org}
                  className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out ${i === active ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.04]'}`}
                  aria-hidden={i !== active}
                >
                  <Image src={r.image.src} alt={i === active ? r.image.alt : ''} fill sizes="40vw" className="object-cover" />
                </div>
              ))}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-void/80 to-transparent" />
              <p className="absolute bottom-5 left-5 right-5 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/80" aria-live="polite">
                <span className="text-[rgb(var(--blush))]">{String(active + 1).padStart(2, '0')}</span> / {String(experience.length).padStart(2, '0')} · {experience[active].org}
              </p>
            </div>
          </div>

          <ol className="border-t border-bone/10 lg:col-span-7">
            {experience.map((r, i) => (
              <motion.li
                key={r.org}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: '-45% 0px -45% 0px' }}
              >
                <Reveal delay={0.04} className="group border-b border-bone/10 py-10">
                  <div className="mb-6 lg:hidden">
                    <Photo image={r.image} ratio="aspect-[3/2]" sizes="92vw" />
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[rgb(var(--blush))]">{r.dates}</p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/40">{r.place}</p>
                  </div>
                  <h3 className={`mt-4 font-headline text-2xl font-bold transition-colors sm:text-3xl ${i === active ? 'lg:text-[rgb(var(--blush))]' : ''} text-bone`}>{r.org}</h3>
                  <p className="mt-2 text-bone/60">{r.title}</p>
                  <ul className="mt-6 space-y-3 text-bone/75">
                    {r.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="mt-[0.7em] h-px w-4 shrink-0 bg-[rgb(var(--blush))]" aria-hidden="true" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  {r.tags && (
                    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Brands">
                      {r.tags.map((t) => (
                        <li key={t} className="rounded-full border border-bone/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-bone/60 transition-colors hover:border-[rgb(var(--blush)/0.6)] hover:text-bone">
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  return (
    <section id="leadership" className="scroll-mt-16 border-t border-bone/10 bg-carbon pb-24 sm:pb-32">
      {/* Full-bleed stage still; the heading sits on a text-scoped vignette. */}
      <div ref={ref} className="relative flex min-h-[70svh] items-end overflow-hidden sm:min-h-[80svh]">
        <motion.div className="absolute inset-[-10%_0]" style={reduce ? undefined : { y }}>
          <Image src={evaMedia.stage.src} alt={evaMedia.stage.alt} fill sizes="100vw" className="object-cover object-[60%_center]" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/40 to-carbon/10" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 sm:px-8 sm:pb-16">
          <Reveal>
            <div className="relative inline-block">
              <div className="text-vignette absolute -inset-x-12 -inset-y-10 -z-10" aria-hidden="true" />
              <Eyebrow n="03">Positions of responsibility</Eyebrow>
              <Line pre="Rooms she was" em="trusted" post=" to run." className="mt-5 text-[clamp(2.25rem,6vw,5rem)]" />
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {positions.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <article className="group flex h-full flex-col rounded-2xl border border-bone/10 bg-void p-7 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-[rgb(var(--blush)/0.5)]">
                <span className="font-mono text-[11px] tracking-[0.2em] text-[rgb(var(--blush))]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-6 font-headline text-xl font-bold text-bone">{p.title}</h3>
                <p className="mt-1 text-bone/60">{p.org}</p>
                {p.note && <p className="mt-auto pt-6 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-bone/50">{p.note}</p>}
              </article>
            </Reveal>
          ))}
          <Reveal delay={positions.length * 0.06}>
            <article className="flex h-full flex-col rounded-2xl border border-dashed border-bone/15 p-7">
              <span className="font-mono text-[11px] tracking-[0.2em] text-bone/40">On the floor</span>
              <h3 className="mt-6 font-headline text-xl font-bold text-bone">Debating</h3>
              <ul className="mt-1 space-y-1 text-bone/60">
                {debating.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Profile() {
  return (
    <section id="profile" className="scroll-mt-16 px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow n="04">Profile</Eyebrow>
          <Line pre="Trained in" em="luxury" post=", from Mumbai to Paris." className="mt-5 text-[clamp(2rem,5vw,4rem)]" />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Photo image={evaMedia.paris} ratio="aspect-[4/5]" sizes="(min-width:1024px) 30vw, 92vw" className="mx-auto max-w-sm lg:max-w-none" caption="HEC Paris · Summer School, Luxury Management" />
          </div>

          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-8">
            <Reveal>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone/50">Education</h3>
              <ul className="mt-5 divide-y divide-bone/10 border-y border-bone/10">
                {education.map((e) => (
                  <li key={e.school} className="py-4">
                    <p className="font-headline text-xl font-bold text-bone">{e.school}</p>
                    <p className="text-bone/60">{e.detail}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone/50">Languages</h3>
              <ul className="mt-5 divide-y divide-bone/10 border-y border-bone/10">
                {languages.map((l) => (
                  <li key={l.name} className="flex items-baseline justify-between py-4">
                    <span className="font-headline text-xl font-bold text-bone">{l.name}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/50">{l.level}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12} className="sm:col-span-2">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone/50">Skills</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <li key={s} className="rounded-full border border-bone/15 px-4 py-2 text-sm text-bone/80 transition-colors hover:border-[rgb(var(--blush)/0.6)]">{s}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden border-t border-bone/10 px-4 py-24 sm:px-8 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(60% 50% at 70% 100%, rgb(var(--rose) / 0.18), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <Photo image={evaMedia.letter} ratio="aspect-[4/5]" sizes="(min-width:1024px) 38vw, 92vw" className="mx-auto max-w-sm lg:max-w-none" />
        </div>
        <Reveal className="order-1 lg:order-2 lg:col-span-7">
          <Eyebrow n="05">Contact</Eyebrow>
          <Line pre="Let's make something" em="rare" post="." className="mt-6 text-[clamp(2.5rem,7vw,6rem)]" />
          <p className="mt-6 max-w-lg text-lg text-bone/65">
            Open to brand strategy, luxury marketing and content roles, and to new Brand Alchemy clients.
            Email is the fastest way in; the résumé has the rest.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={`mailto:${eva.email}`}
              className="group inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full bg-[rgb(var(--rose))] px-6 font-mono text-xs tracking-[0.1em] text-void shadow-[0_0_40px_-12px_rgb(var(--rose)/0.8)] transition-colors hover:bg-[rgb(var(--petal))]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" /> {eva.email}
            </a>
            <a
              href={eva.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full border border-bone/20 px-6 font-mono text-xs uppercase tracking-[0.18em] text-bone transition-colors hover:border-[rgb(var(--blush))] hover:text-[rgb(var(--blush))]"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn <span className="sr-only">(opens in a new tab)</span>
            </a>
            <ResumeButton ghost />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Page ----------
export default function EvaPortfolio() {
  return (
    <div className="eva min-h-screen overflow-x-clip bg-void font-sans text-bone">
      {/* Black + pink is Eva (black + red is Aashrith). --ember is re-pointed so shared chrome (footer) follows. */}
      <style dangerouslySetInnerHTML={{ __html: `
        .eva { --blush: 244 182 200; --rose: 217 70 122; --petal: 250 221 230; --ember: 217 70 122; --ember-deep: 176 48 96; --footer-accent: #D9467A; }
        .eva ::selection { background: rgb(var(--rose) / 0.45); color: #EDE6DD; }
        .eva :focus-visible { outline: 2px solid rgb(var(--blush)); outline-offset: 3px; }
        .eva-em { background: linear-gradient(100deg, rgb(var(--petal)), rgb(var(--blush)) 40%, rgb(var(--rose)) 70%, rgb(var(--petal))); background-size: 250% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent; animation: eva-flow 14s ease-in-out infinite alternate; }
        @keyframes eva-flow { to { background-position: 100% 0; } }
        .eva-link { position: relative; }
        .eva-link::after { content: ''; position: absolute; left: 0; right: 0; bottom: 12px; height: 1px; background: rgb(var(--blush)); transform: scaleX(0); transform-origin: left; transition: transform .5s cubic-bezier(.22,1,.36,1); }
        .eva-link:hover::after { transform: scaleX(1); }
        .eva-pulse { display: inline-block; animation: eva-pulse 2.4s ease-in-out infinite; }
        @keyframes eva-pulse { 50% { opacity: .35; } }
        @media (prefers-reduced-motion: reduce) { .eva-em, .eva-pulse { animation: none; } }
      ` }} />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Story />
        <Chain />
        <BrandAlchemyWork />
        <Experience />
        <Leadership />
        <Profile />
        <Contact />
      </main>
      <PortfolioFooter
        isDark
        founderName="Eva Doshi"
        monogram="ED"
        copyright="Eva Doshi"
        accent="#D9467A"
        bgImage={evaMedia.mumbai.src}
        featherFrom="#0A0908"
        headline={
          <>
            <span className="glass-type">From Mumbai, with </span>
            <span className="font-playfair italic font-normal eva-em clip-pad">intent</span>
            <span className="glass-type">.</span>
          </>
        }
        portfolioLinks={NAV}
        ventureLinks={[
          { label: 'Brand Alchemy', href: '#work', external: false },
          { label: 'Alchemy Labs', href: '/about', external: false },
        ]}
        connectLinks={[
          { label: 'LinkedIn', href: eva.linkedin, external: true },
          { label: 'Email', href: `mailto:${eva.email}` },
          { label: 'Download résumé (PDF)', href: eva.resume, download: true },
        ]}
      />
    </div>
  );
}
