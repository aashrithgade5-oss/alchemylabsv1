'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { m, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { confettiBurst } from '@/lib/confetti';

const navItems = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function FurnaceNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-[80] flex justify-center px-4 pt-4">
      <m.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease }}
        className="group relative flex w-full max-w-4xl items-center justify-between overflow-hidden rounded-full border border-transparent px-5 py-2.5"
      >
        {/* C-P14 flash fix: backdrop-filter cannot transition, so toggling
            the liquid-glass CLASS popped the blur in while the white bg
            faded (the reported white flash). The glass now lives on a
            permanently-mounted inner layer whose OPACITY fades — one
            consistent treatment, no pop. */}
        <div
          aria-hidden
          className={`liquid-glass pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Phase 2 backdrop-mode glass edge: real refraction shows whatever
            color is scrolled behind the nav (red hero vs void sections).
            Chrome-only, degrades via @supports. Opacity-faded with the same
            curve as the glass layer. */}
        <div
          aria-hidden
          className={`glass-refract-edge pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* C-P14 chromatic hairline: 1px RGB-split ring, visible on scroll,
            full strength on hover — CSS only */}
        <div
          aria-hidden
          className={`nav-chroma-edge pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500 group-hover:opacity-100 ${
            scrolled ? 'opacity-60' : 'opacity-0'
          }`}
        />
        <Link href="/" className="relative flex items-center gap-2.5" aria-label="Alchemy Labs, home">
          <Image
            src="/assets/alchemy-minimal-logo.png"
            alt=""
            width={38}
            height={38}
            priority
            className="transition-transform duration-500 hover:rotate-[30deg]"
          />
          {/* Wordmark: Playfair Italic accent + LABS in mono small-caps (type law) */}
          <span className="hidden items-baseline gap-1.5 sm:flex">
            <span className="font-playfair text-lg italic leading-none text-bone">Alchemy</span>
            <span className="font-mono text-[10px] tracking-[0.3em] text-bone/70">LABS</span>
          </span>
        </Link>

        <ul className="relative hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`font-mono text-[11px] tracking-[0.2em] transition-colors duration-300 ${
                  pathname === item.href ? 'text-bone' : 'text-ash hover:text-bone'
                }`}
              >
                {item.label.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>

        <div className="relative flex items-center gap-3">
          {/* R-7c Tier 1: Begin is the booking-intent nav CTA (the general
              Contact nav link above is deliberately excluded) */}
          <Link
            href="/contact"
            onClick={() => confettiBurst()}
            className="hidden rounded-full bg-ember px-5 py-2 font-sans text-xs font-semibold text-void transition-colors duration-300 hover:bg-amber md:inline-block"
          >
            Begin
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-bone md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </m.nav>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[-1] flex flex-col items-center justify-center gap-2 bg-void/95 backdrop-blur-2xl md:hidden"
          >
            {navItems.map((item, i) => (
              <m.div
                key={item.href}
                initial={{ y: 24, opacity: 0, filter: 'blur(8px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.08 * i, ease }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-8 py-3 font-sans text-3xl font-bold text-bone"
                >
                  {item.label}
                </Link>
              </m.div>
            ))}
            <m.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease }}
              className="mt-6"
            >
              <Link
                href="/contact"
                onClick={() => {
                  setOpen(false);
                  confettiBurst();
                }}
                className="rounded-full bg-ember px-7 py-3.5 font-sans text-sm font-semibold text-void"
              >
                Begin
              </Link>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
