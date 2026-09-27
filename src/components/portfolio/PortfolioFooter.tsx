'use client';
import { memo, useRef, type CSSProperties, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { LightStreaks } from './LightStreaks';

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
  /** Accent colour (any CSS colour / var). Default ember. */
  accent?: string;
  /** Full-bleed background image. When set it renders sharp with parallax drift. */
  bgImage?: string;
  /** Used if bgImage fails to load. */
  bgFallback?: string;
  /** Large sign-off line above the masthead. */
  headline?: ReactNode;
  /** Temporal motion-blur light streaks. */
  streaks?: boolean;
  /** Colour the top edge feathers from (the page background). */
  featherFrom?: string;
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
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" style={{ background: 'var(--footer-accent)' }} />
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
  accent = '#FF4D1C',
  bgImage,
  bgFallback = '/media/footer-bg.png',
  headline,
  streaks = false,
  featherFrom,
}: PortfolioFooterProps) => {
  const cv = connectLinks.find((l) => l.download);
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const bgY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-12%', '0%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], reduced ? [1.08, 1.08] : [1.18, 1.06]);
  const vars = { '--footer-accent': accent, '--streak-accent': accent } as CSSProperties;

  return (
    <footer ref={ref} style={vars} className={`relative overflow-hidden ${t(isDark, 'bg-alchemy-black', 'bg-neutral-950')}`}>
      <div className="absolute inset-0 z-0" aria-hidden>
        {bgImage ? (
          <>
            <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
              <SafeImage src={bgImage} fallback={bgFallback} alt="" fill sizes="100vw" className="object-cover object-center opacity-80" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black via-alchemy-black/60 to-alchemy-black/20" />
            <div className="absolute inset-x-0 top-0 h-48" style={{ background: `linear-gradient(to bottom, ${featherFrom ?? '#0A0908'}, transparent)` }} />
          </>
        ) : (
          <>
            <SafeImage src={bgFallback} alt="" fill sizes="100vw" className="object-cover opacity-40 scale-110" style={{ filter: 'blur(10px) saturate(1.1)' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black via-alchemy-black/80 to-alchemy-black" />
          </>
        )}
        {streaks && <LightStreaks />}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-10">
        {headline && (
          <motion.p
            className="font-body font-bold text-porcelain text-[2.5rem] sm:text-6xl lg:text-[5.5rem] leading-[0.98] tracking-[-0.035em] [text-wrap:balance] max-w-4xl pt-16 sm:pt-32 pb-16 sm:pb-24"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: EASE }}
          >
            {headline}
          </motion.p>
        )}

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
              <span className="w-11 h-11 rounded-full flex items-center justify-center font-mono text-xs font-bold text-porcelain border" style={{ borderColor: `color-mix(in srgb, ${accent} 45%, transparent)` }}>
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
                className="footer-cv mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-porcelain/20 px-6 font-mono text-[11px] uppercase tracking-[0.2em] text-porcelain/80 hover:text-porcelain transition-colors duration-300"
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
          <div className="flex flex-wrap gap-x-6">
            {[['Alchemy Labs', '/about'], ['Privacy', '/privacy'], ['Terms', '/terms']].map(([label, href]) => (
              <Link key={href} href={href} className="inline-flex min-h-11 items-center font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-porcelain/40 hover:text-porcelain transition-colors duration-300">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.footer-cv:hover { border-color: var(--footer-accent); }` }} />
    </footer>
  );
});

PortfolioFooter.displayName = 'PortfolioFooter';
