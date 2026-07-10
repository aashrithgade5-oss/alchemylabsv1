'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// TODO(OVERHAUL_TODO): Services href flips to /services when Phase 2 ships.
const navItems = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/solutions' },
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
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease }}
        className={`flex w-full max-w-4xl items-center justify-between rounded-full border px-5 py-2.5 transition-all duration-500 ${
          scrolled
            ? 'border-line bg-void/70 backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <Link href="/" className="flex items-baseline gap-1.5" aria-label="Alchemy Labs, home">
          <span className="font-syne text-base font-bold tracking-tight text-bone">ALCHEMY</span>
          <span className="font-dmmono text-[9px] tracking-[0.3em] text-ash">LABS</span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`font-dmmono text-[11px] tracking-[0.2em] transition-colors duration-300 ${
                  pathname === item.href ? 'text-bone' : 'text-ash hover:text-bone'
                }`}
              >
                {item.label.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/#the-five"
            className="hidden rounded-full bg-ember px-5 py-2 font-syne text-xs font-semibold text-void transition-colors duration-300 hover:bg-amber md:inline-block"
          >
            Start under $300
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="rounded-full border border-line p-2 text-bone md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[-1] flex flex-col items-center justify-center gap-2 bg-void/95 backdrop-blur-2xl md:hidden"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ y: 24, opacity: 0, filter: 'blur(8px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.08 * i, ease }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-8 py-3 font-syne text-3xl font-bold text-bone"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease }}
              className="mt-6"
            >
              <Link
                href="/#the-five"
                onClick={() => setOpen(false)}
                className="rounded-full bg-ember px-7 py-3.5 font-syne text-sm font-semibold text-void"
              >
                Start under $300
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
