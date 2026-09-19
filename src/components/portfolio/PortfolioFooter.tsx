'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

type FooterLink = { label: string; href: string; external?: boolean; download?: boolean };

interface PortfolioFooterProps {
  isDark: boolean;
  founderName: string;
  monogram: string;
  copyright: string;
  signoff?: string;
  portfolioLinks?: FooterLink[];
  ventureLinks?: FooterLink[];
  connectLinks?: FooterLink[];
}

const t = (isDark: boolean, dark: string, light: string) => isDark ? dark : light;
const EASE = [0.22, 1, 0.36, 1] as const;

const linkCls = 'group inline-flex min-h-11 items-center gap-1.5 font-body text-sm text-porcelain/65 hover:text-porcelain transition-colors duration-300';

const FooterLinkItem = ({ link }: { link: FooterLink }) => {
  const ext = link.external && !link.download;
  return (
    <a
      href={link.href}
      {...(link.download ? { download: true } : {})}
      {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={linkCls}
    >
      <span className="relative">
        {link.label}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-ember transition-transform duration-500 ease-out group-hover:scale-x-100" />
      </span>
      {ext && <ArrowUpRight className="w-3 h-3 opacity-40" />}
    </a>
  );
};

const Column = ({ title, links, delay }: { title: string; links: FooterLink[]; delay: number }) => (
  <motion.nav
    aria-label={title}
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6, ease: EASE }}
  >
    <h3 className="font-mono text-[10px] text-porcelain/45 tracking-[0.3em] uppercase mb-4">{title}</h3>
    <ul>
      {links.map((link) => (
        <li key={link.label}><FooterLinkItem link={link} /></li>
      ))}
    </ul>
  </motion.nav>
);

export const PortfolioFooter = memo(({
  isDark,
  founderName,
  monogram,
  copyright,
  signoff,
  portfolioLinks = [],
  ventureLinks = [],
  connectLinks = [],
}: PortfolioFooterProps) => {
  const cv = connectLinks.find((l) => l.download);
  return (
    <footer className={`relative overflow-hidden ${t(isDark, 'bg-alchemy-black', 'bg-neutral-950')}`}>
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image src="/assets/footer-bg.png" alt="" fill sizes="100vw" className="object-cover opacity-40 scale-110" style={{ filter: 'blur(10px) saturate(1.1)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black via-alchemy-black/80 to-alchemy-black" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-10">
        {/* Masthead */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 pb-16 sm:pb-20 border-b border-porcelain/10">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-full flex items-center justify-center font-mono text-xs font-bold text-porcelain border border-ember/40">
                {monogram}
              </span>
              <span className="font-body text-xl sm:text-2xl font-bold tracking-[-0.01em] text-porcelain">{founderName}</span>
            </div>
            {signoff && (
              <p className="font-display italic text-lg sm:text-xl text-porcelain/45 mt-6 max-w-sm [text-wrap:balance]">{signoff}</p>
            )}
            {cv && (
              <a
                href={cv.href}
                download
                className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-porcelain/20 px-6 font-mono text-[11px] uppercase tracking-[0.2em] text-porcelain/80 hover:border-ember hover:text-porcelain transition-colors duration-300"
              >
                {cv.label}
              </a>
            )}
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-10">
            <Column title="Portfolio" links={portfolioLinks} delay={0.05} />
            <Column title="Ventures" links={ventureLinks} delay={0.1} />
            <div className="col-span-2 sm:col-span-1">
              <Column title="Connect" links={connectLinks.filter((l) => !l.download)} delay={0.15} />
            </div>
          </div>
        </div>

        {/* Colophon */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.08em] text-porcelain/40">
            © 2026 {copyright}.
          </p>
          <div className="flex gap-6">
            {[['Alchemy Labs', '/about'], ['Privacy', '/privacy'], ['Terms', '/terms']].map(([label, href]) => (
              <Link key={href} href={href} className="inline-flex min-h-11 items-center font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-porcelain/40 hover:text-porcelain transition-colors duration-300">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
});

PortfolioFooter.displayName = 'PortfolioFooter';
