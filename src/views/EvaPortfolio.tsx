'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Download, Linkedin, Mail, Menu, X } from 'lucide-react';
import { PortfolioFooter } from '@/components/portfolio/PortfolioFooter';
import { NoiseTexture } from '@/components/effects';
import { Marquee } from '@/components/eva/Marquee';
import { HeroMedia } from '@/components/eva/HeroMedia';
import {
  eva, heroStats, brandAlchemyPosts, brandAlchemyWork, experience,
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
const Line = ({ pre, em, post = '', className = '' }: { pre: string; em: string; post?: string; className?: string }) => (
  <h2 className={`font-headline font-bold tracking-[-0.02em] leading-[1.05] [text-wrap:balance] ${className}`}>
    <span className="glass-type">{pre} </span>
    <span className="font-playfair italic font-normal eva-em clip-pad">{em}</span>
    {post && <span className="glass-type">{post}</span>}
  </h2>
);

const ResumeButton = ({ ghost = false }: { ghost?: boolean }) => (
  <a
    href={eva.resume}
    download
    className={`inline-flex min-h-[48px] items-center gap-3 rounded-full px-6 font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
      ghost
        ? 'border border-bone/20 text-bone hover:border-[rgb(var(--blush))] hover:text-[rgb(var(--blush))]'
        : 'bg-[rgb(var(--rose))] text-void shadow-[0_0_40px_-12px_rgb(var(--rose)/0.8)] hover:bg-[rgb(var(--petal))]'
    }`}
  >
    <Download className="h-4 w-4" aria-hidden="true" />
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

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled ? 'bg-void/85 border-b border-bone/10' : ''}`}
        aria-label="Eva Doshi"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          <Link href="/about" className="flex min-h-[44px] items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/60 hover:text-bone">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Alchemy Labs</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            {NAV.map((l) => (
              <a key={l.href} href={l.href} className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/60 transition-colors hover:text-[rgb(var(--blush))]">
                {l.label}
              </a>
            ))}
          </div>
          <button
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/15 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 text-bone" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-void px-6 pb-10 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button onClick={() => setOpen(false)} className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-bone/15" aria-label="Close menu">
              <X className="h-5 w-5 text-bone" />
            </button>
            <div className="flex flex-1 flex-col justify-center gap-2">
              {NAV.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-2 font-headline text-4xl font-bold text-bone hover:text-[rgb(var(--blush))]"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: EASE }}
                >
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
  return <motion.div className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-[rgb(var(--rose))] via-[rgb(var(--blush))] to-[rgb(var(--petal))]" style={{ scaleX }} />;
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
    </span>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
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

      <motion.div style={reduce ? undefined : { y: textY }} className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-28 sm:px-8 sm:pb-20">
        <motion.p
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-[rgb(var(--blush))]">●</span> {eva.role} · {eva.city}
        </motion.p>

        <motion.h1
          className="mt-6 font-headline font-bold leading-[0.9] [text-wrap:balance] tracking-[-0.04em] text-[clamp(3.5rem,14vw,11rem)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
        >
          <span className="glass-type block">Eva</span>
          <span className="glass-type block">Doshi</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl [text-wrap:balance] font-headline text-2xl font-bold leading-tight text-bone sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
        >
          Luxury brands, built with <WordCycler />
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
        >
          <ResumeButton />
          <a href="#contact" className="inline-flex min-h-[48px] items-center gap-2 px-2 font-mono text-xs uppercase tracking-[0.18em] text-bone/70 hover:text-[rgb(var(--blush))]">
            Start a conversation <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>

        <motion.dl
          className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-bone/10 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {heroStats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-headline text-2xl font-bold text-bone sm:text-4xl">{s.value}</dd>
              <dd className="mt-1 font-mono text-[10px] uppercase leading-snug tracking-[0.15em] text-bone/50">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}

// ---------- Sections ----------
function Intro() {
  return (
    <section className="px-4 py-24 sm:px-8 sm:py-32">
      <Reveal className="mx-auto max-w-5xl">
        <Line pre="Strategy that reads like" em="story" post="." className="text-[clamp(2.25rem,6vw,5rem)]" />
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone/70 sm:text-xl">
          Co-founder of Brand Alchemy. Formerly content at Dentsu Creative across 12+ brands — from
          Forevermark to Dove. Trained at NMIMS School of Branding &amp; Advertising and HEC Paris in
          luxury management.
        </p>
      </Reveal>
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
          full lifecycle — 100% retained to date.
        </p>
      </Reveal>

      <Marquee label="Brand Alchemy social posts" seconds={70}>
        {brandAlchemyPosts.map((src, i) => (
          <figure key={src} className="mr-4 w-[62vw] shrink-0 overflow-hidden rounded-2xl border border-bone/10 transition-colors duration-500 hover:border-[rgb(var(--blush)/0.6)] sm:mr-6 sm:w-[300px] lg:w-[340px]">
            <img
              src={src}
              alt={`Brand Alchemy social post ${i + 1}`}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
            />
          </figure>
        ))}
      </Marquee>

      <div className="mt-10 border-t border-bone/10 pt-8">
        <Marquee label="What Eva did at Brand Alchemy" seconds={60} reverse>
          {brandAlchemyWork.map((w) => (
            <span key={w} className="flex items-center whitespace-nowrap font-headline text-2xl font-bold text-bone/80 sm:text-4xl">
              <span className="px-6 sm:px-10">{w}</span>
              <span className="font-playfair italic font-normal eva-em">·</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow n="02">Experience</Eyebrow>
          <Line pre="Agency floor to" em="founder" post="'s desk." className="mt-5 text-[clamp(2rem,5vw,4rem)]" />
        </Reveal>

        <ol className="mt-16 border-t border-bone/10">
          {experience.map((r, i) => (
            <li key={r.org}>
              <Reveal delay={i * 0.04} className="group grid gap-4 border-b border-bone/10 py-10 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[rgb(var(--blush))]">{r.dates}</p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/40">{r.place}</p>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-headline text-2xl font-bold text-bone transition-colors group-hover:text-[rgb(var(--blush))] sm:text-3xl">{r.org}</h3>
                  <p className="mt-2 text-bone/60">{r.title}</p>
                </div>
                <div className="md:col-span-5">
                  <ul className="space-y-3 text-bone/70">
                    {r.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="mt-[0.6em] h-px w-4 shrink-0 bg-[rgb(var(--blush))]" aria-hidden="true" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  {r.tags && (
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Brands">
                      {r.tags.map((t) => (
                        <li key={t} className="rounded-full border border-bone/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-bone/60">
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section id="leadership" className="scroll-mt-16 border-t border-bone/10 bg-carbon px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow n="03">Positions of responsibility</Eyebrow>
          <Line pre="Rooms she was" em="trusted" post=" to run." className="mt-5 text-[clamp(2rem,5vw,4rem)]" />
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {positions.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <article className="flex h-full flex-col rounded-2xl border border-bone/10 bg-void p-7 transition-colors hover:border-[rgb(var(--blush)/0.5)]">
                <span className="font-mono text-[11px] tracking-[0.2em] text-[rgb(var(--blush))]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-6 font-headline text-xl font-bold text-bone">{p.title}</h3>
                <p className="mt-1 text-bone/60">{p.org}</p>
                {p.note && <p className="mt-auto pt-6 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-bone/45">{p.note}</p>}
              </article>
            </Reveal>
          ))}
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
          <Line pre="Trained for" em="luxury" post=", fluent in four tongues." className="mt-5 text-[clamp(2rem,5vw,4rem)]" />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-3">
          <Reveal>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone/50">Skills</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {skills.map((s) => (
                <li key={s} className="rounded-full border border-bone/15 px-4 py-2 text-sm text-bone/80">{s}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone/50">Education</h3>
            <ul className="mt-5 divide-y divide-bone/10 border-y border-bone/10">
              {education.map((e) => (
                <li key={e.school} className="py-4">
                  <p className="font-headline text-xl font-bold text-bone">{e.school}</p>
                  <p className="text-bone/60">{e.detail}</p>
                </li>
              ))}
            </ul>
            <h3 className="mt-10 font-mono text-[11px] uppercase tracking-[0.25em] text-bone/50">Debating</h3>
            <ul className="mt-3 space-y-1 text-bone/70">
              {debating.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </Reveal>

          <Reveal delay={0.16}>
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
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden border-t border-bone/10 px-4 py-28 sm:px-8 sm:py-40">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(60% 50% at 50% 100%, rgb(var(--rose) / 0.2), transparent 70%)' }}
        aria-hidden="true"
      />
      <Reveal className="relative mx-auto max-w-4xl text-center">
        <Eyebrow n="05">Contact</Eyebrow>
        <Line pre="Let's make something" em="rare" post="." className="mt-6 text-[clamp(2.5rem,7vw,6rem)]" />
        <p className="mx-auto mt-6 max-w-lg text-bone/60">
          Open to brand strategy, luxury marketing and content roles — and to new Brand Alchemy clients.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`mailto:${eva.email}`}
            className="inline-flex min-h-[48px] items-center gap-3 rounded-full bg-[rgb(var(--rose))] px-6 shadow-[0_0_40px_-12px_rgb(var(--rose)/0.8)] font-mono text-xs uppercase tracking-[0.18em] text-void transition-colors hover:bg-[rgb(var(--petal))]"
          >
            <Mail className="h-4 w-4" aria-hidden="true" /> {eva.email}
          </a>
          <a
            href={eva.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center gap-3 rounded-full border border-bone/20 px-6 font-mono text-xs uppercase tracking-[0.18em] text-bone transition-colors hover:border-[rgb(var(--blush))] hover:text-[rgb(var(--blush))]"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
          </a>
          <ResumeButton ghost />
        </div>
      </Reveal>
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
        .eva-em { background: linear-gradient(100deg, rgb(var(--petal)), rgb(var(--blush)) 40%, rgb(var(--rose)) 70%, rgb(var(--petal))); background-size: 250% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: eva-flow 14s ease-in-out infinite alternate; }
        @keyframes eva-flow { to { background-position: 100% 0; } }
        @media (prefers-reduced-motion: reduce) { .eva-em { animation: none; } }
      ` }} />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Intro />
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
        portfolioLinks={NAV}
        ventureLinks={[{ label: 'Brand Alchemy', href: '#work', external: false }]}
        connectLinks={[
          { label: 'LinkedIn', href: eva.linkedin, external: true },
          { label: 'Email', href: `mailto:${eva.email}`, external: true },
          { label: 'Résumé (PDF)', href: eva.resume, external: true },
        ]}
      />
    </div>
  );
}
