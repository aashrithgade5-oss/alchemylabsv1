import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sun, Moon, Menu, X, Download, Linkedin, Instagram, Youtube, ExternalLink } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import { aashrithData } from '@/data/foundersData';
import { thoughtLeadershipEntries } from '@/data/portfolioProjects';
import {
  SectionShell,
  EyebrowLabel,
  MagneticCTA,
  MarqueeRow,
  BackgroundScene,
  ParticleField,
} from '@/components/portfolio';
import { BlueprintGrid, NoiseTexture, AnimatedCapabilities } from '@/components/effects';
import { SequentianBackground } from '@/components/SequentianBackground';
import { Footer } from '@/components/Footer';
import aashrithHeroBg from '@/assets/aashrith-hero-bg.mp4';

const EASE = [0.22, 1, 0.36, 1] as const;
const t = (isDark: boolean, dark: string, light: string) => isDark ? dark : light;

// Social links for Aashrith
const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/aashrithgade', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/aashrithzz/', label: 'Instagram' },
  { icon: Instagram, href: 'https://www.instagram.com/asharchiveszz/', label: 'AshArchives' },
  { icon: Youtube, href: 'https://www.youtube.com/@aashrithxd8587', label: 'YouTube' },
];

// Section divider component
const SectionDivider = () => (
  <div className="h-24 w-full relative">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-alchemy-black/50 to-transparent" />
  </div>
);

// ============================================
// NAVIGATION — Liquid Glass Pill
// ============================================
const PortfolioNav = memo(({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > 200 && y > lastY);
      setLastY(y);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY]);

  const navLinks = [
    { label: 'Ventures', href: '#ventures' },
    { label: 'Timeline', href: '#journey' },
    { label: 'Insights', href: '#insights' },
    { label: 'Connect', href: '#connect' },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={`mx-4 mt-4 sm:mt-6 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-4 sm:gap-6 transition-all duration-500 ${scrolled ? 'rounded-full' : 'rounded-2xl'}`}
          style={{
            background: scrolled
              ? t(isDark, 'rgba(10,10,10,0.7)', 'rgba(250,250,249,0.7)')
              : t(isDark, 'rgba(10,10,10,0.3)', 'rgba(250,250,249,0.3)'),
            backdropFilter: `blur(${scrolled ? 32 : 16}px) saturate(180%)`,
            border: `1px solid ${scrolled ? t(isDark, 'rgba(255,255,255,0.1)', 'rgba(0,0,0,0.08)') : t(isDark, 'rgba(255,255,255,0.05)', 'rgba(0,0,0,0.03)')}`,
            boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.3)' : 'none',
          }}
        >
          {/* Monogram */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}
            style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.2) 0%, rgba(220,38,38,0.05) 100%)', border: '1px solid rgba(220,38,38,0.3)' }}
          >
            AG
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className={`font-body text-xs ${t(isDark, 'text-porcelain/60 hover:text-porcelain', 'text-neutral-600 hover:text-neutral-900')} transition-colors relative group`}>
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-alchemy-red group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Desktop social icons */}
            <div className="hidden md:flex items-center gap-1">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={`p-1.5 rounded-full ${t(isDark, 'hover:bg-white/5', 'hover:bg-black/5')} transition-colors`} title={s.label}>
                  <s.icon className={`w-3.5 h-3.5 ${t(isDark, 'text-porcelain/40 hover:text-alchemy-red', 'text-neutral-400 hover:text-alchemy-red')} transition-colors`} />
                </a>
              ))}
            </div>

            <Link to="/about" className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider ${t(isDark, 'text-porcelain/40 hover:text-porcelain hover:bg-white/5', 'text-neutral-500 hover:text-neutral-900 hover:bg-black/5')} transition-all`}>
              <ArrowLeft className="w-3 h-3" />
              BACK
            </Link>

            <button onClick={toggleTheme} className={`p-2 rounded-full ${t(isDark, 'hover:bg-white/5', 'hover:bg-black/5')} transition-colors`}>
              {isDark ? <Sun className="w-3.5 h-3.5 text-porcelain/50" /> : <Moon className="w-3.5 h-3.5 text-neutral-500" />}
            </button>

            <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden p-2 rounded-full ${t(isDark, 'hover:bg-white/5', 'hover:bg-black/5')} transition-colors`}>
              {isOpen ? <X className={`w-4 h-4 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`} /> : <Menu className={`w-4 h-4 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: t(isDark, 'rgba(10,10,10,0.97)', 'rgba(250,250,249,0.97)'),
                backdropFilter: 'blur(40px)',
              }}
            />
            <div className="relative z-10 flex flex-col h-full px-8 pt-24 pb-12">
              {/* Close */}
              <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 p-2">
                <X className={`w-6 h-6 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`} />
              </button>

              {/* Nav links */}
              <div className="flex-1 flex flex-col justify-center gap-6">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-body text-3xl font-bold ${t(isDark, 'text-porcelain', 'text-neutral-900')} hover:text-alchemy-red transition-colors`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease: EASE }}
                  >
                    {link.label}
                  </motion.a>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4, ease: EASE }}
                >
                  <Link
                    to="/about"
                    onClick={() => setIsOpen(false)}
                    className={`inline-flex items-center gap-2 font-mono text-sm ${t(isDark, 'text-porcelain/50', 'text-neutral-500')} hover:text-alchemy-red transition-colors mt-4`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Alchemy Labs
                  </Link>
                </motion.div>
              </div>

              {/* Social links at bottom */}
              <motion.div
                className="flex items-center gap-4 pt-6 border-t border-porcelain/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
                    <s.icon className={`w-5 h-5 ${t(isDark, 'text-porcelain/40', 'text-neutral-400')} group-hover:text-alchemy-red transition-colors`} />
                    <span className={`font-mono text-xs ${t(isDark, 'text-porcelain/30', 'text-neutral-400')} group-hover:text-alchemy-red transition-colors`}>{s.label}</span>
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
PortfolioNav.displayName = 'PortfolioNav';

// ============================================
// HERO — Cinematic Video + Centered Layout
// ============================================
const HeroSection = memo(({ isDark }: { isDark: boolean }) => (
  <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">
    {/* Layer 1: Deep black base */}
    <div className="absolute inset-0 bg-alchemy-black" />

    {/* Layer 2: Video background */}
    <motion.video
      src={aashrithHeroBg}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 w-full h-full object-cover"
      initial={{ opacity: 0 }}
      animate={{ opacity: isDark ? 0.12 : 0.08 }}
      transition={{ duration: 1.2, ease: EASE }}
    />

    {/* Layer 3: Vignette */}
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(10,10,10,0.7) 100%)' }} />

    {/* Layer 4: Red energy glow */}
    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 70%, rgba(220,38,38,0.06) 0%, transparent 70%)' }} />

    {/* Layer 5: Sequentian */}
    <SequentianBackground variant={1} opacity={0.2} blur={1} glow={false} />

    {/* Layer 6: Grid + Grain */}
    <BlueprintGrid opacity={0.02} />
    <NoiseTexture opacity={0.03} />

    {/* Layer 7: Particles */}
    <ParticleField count={20} color="rgba(220,38,38,0.25)" opacity={0.3} />

    {/* Top + Bottom fade */}
    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-alchemy-black to-transparent z-[1]" />
    <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-alchemy-black to-transparent z-[1]" />

    {/* Content — centered */}
    <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
        <span className={`font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] ${t(isDark, 'text-alchemy-red/70', 'text-alchemy-red/60')}`}>
          Creative Director · Brand Architect · AI-Native
        </span>
      </motion.div>

      <motion.h1 className="mt-8 mb-6" initial={{ opacity: 0, filter: 'blur(12px)', y: 40 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} transition={{ duration: 1, delay: 0.4, ease: EASE }}>
        <span className={`block font-body font-black text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] uppercase leading-[0.85] tracking-[-0.03em] ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
          AASHRITH
        </span>
        <span className="block font-body font-black text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] uppercase leading-[0.85] tracking-[-0.03em] bg-gradient-to-r from-alchemy-red via-alchemy-pink to-alchemy-red bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
          GADE
        </span>
      </motion.h1>

      <motion.div className="flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
        <AnimatedCapabilities />
      </motion.div>

      <motion.p className={`font-body text-base sm:text-lg max-w-xl mx-auto ${t(isDark, 'text-porcelain/50', 'text-neutral-500')} mt-6`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}>
        Founder of Brand Alchemy, Ashzz.ai & Alchemy Labs
      </motion.p>

      <motion.div className={`flex justify-center gap-6 font-mono text-[10px] sm:text-xs ${t(isDark, 'text-porcelain/30', 'text-neutral-400')} mt-5`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
        <span>Mumbai, IN</span><span>·</span><span>EST. 2024</span><span>·</span><span>50+ Projects</span>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
      <motion.div className="w-px h-10 sm:h-12 bg-gradient-to-b from-transparent via-alchemy-red/60 to-transparent" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} />
      <span className={`font-mono text-[9px] uppercase tracking-widest ${t(isDark, 'text-porcelain/40', 'text-neutral-400')}`}>Scroll</span>
    </motion.div>
  </section>
));
HeroSection.displayName = 'HeroSection';

// ============================================
// VENTURE ECOSYSTEM
// ============================================
const VentureEcosystem = memo(({ isDark }: { isDark: boolean }) => {
  const ventures = aashrithData.ventures || [];
  const ventureConfig = [
    { venture: ventures[0], num: '01', speed: 'slow' as const, direction: 'left' as const },
    { venture: ventures[1], num: '02', speed: 'medium' as const, direction: 'right' as const },
    { venture: ventures[2], num: '03', speed: 'slow' as const, direction: 'left' as const },
  ];

  const placeholderTiles = Array.from({ length: 10 }, (_, i) => (
    <div key={i} className="flex-shrink-0 w-48 sm:w-56 rounded-xl overflow-hidden" style={{ aspectRatio: '4/3', border: '1px solid rgba(255,255,255,0.1)', background: `linear-gradient(135deg, rgba(220,38,38,${0.03 + (i % 3) * 0.02}) 0%, rgba(255,255,255,0.02) 100%)` }}>
      <div className="w-full h-full flex items-center justify-center">
        <span className={`font-mono text-[10px] ${t(isDark, 'text-porcelain/20', 'text-neutral-300')}`}>IMG {i + 1}</span>
      </div>
    </div>
  ));

  return (
    <SectionShell id="ventures" padding="xl" maxWidth="full" className={`relative ${t(isDark, '', 'bg-[#fafaf9]')}`}>
      <SequentianBackground variant={3} opacity={0.15} glow={false} />
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, ease: EASE }}>
            <EyebrowLabel className="mb-4">VENTURES & INTELLECTUAL PROPERTY</EyebrowLabel>
            <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl ${t(isDark, 'text-porcelain', 'text-neutral-900')} mb-3`}>
              Three systems. <span className="text-alchemy-red italic">One vision.</span>
            </h2>
            <p className={`font-body text-base sm:text-lg max-w-2xl ${t(isDark, 'text-porcelain/50', 'text-neutral-500')}`}>
              Building the infrastructure for AI-native brands.
            </p>
          </motion.div>
        </div>

        <div className="space-y-20">
          {ventureConfig.map(({ venture, num, speed, direction }, idx) => venture && (
            <motion.div key={venture.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ delay: idx * 0.3, duration: 0.6 }}>
              <motion.div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6 flex items-center gap-4" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}>
                <span className="font-mono text-2xl sm:text-3xl font-bold text-alchemy-red/30">{num}</span>
                <div>
                  <h3 className={`font-body font-bold text-lg sm:text-xl ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>{venture.name}</h3>
                  <p className={`font-mono text-[10px] sm:text-xs tracking-wider ${t(isDark, 'text-porcelain/40', 'text-neutral-500')}`}>
                    {venture.type}{venture.communitySize ? ` · ${venture.communitySize}` : ''}
                  </p>
                </div>
              </motion.div>
              <MarqueeRow speed={speed} direction={direction} gap={16}>
                {placeholderTiles}
              </MarqueeRow>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
});
VentureEcosystem.displayName = 'VentureEcosystem';

// ============================================
// CAREER TIMELINE — Glass Cards
// ============================================
const CareerTimeline = memo(({ isDark }: { isDark: boolean }) => {
  const entries = aashrithData.experience;

  return (
    <SectionShell id="journey" padding="xl" className={`relative ${t(isDark, '', 'bg-[#fafaf9]')}`}>
      <SequentianBackground variant={2} opacity={0.15} glow={false} />
      <div className="relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, ease: EASE }} className="mb-16">
          <EyebrowLabel className="mb-4">CAREER TIMELINE</EyebrowLabel>
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
            Building with <span className="text-alchemy-red italic">Intent.</span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Central timeline line */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-alchemy-red/30 via-alchemy-red/10 to-transparent" />

          <div className="space-y-8">
            {entries.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${i}`}
                className="relative pl-12 sm:pl-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
              >
                {/* Timeline dot */}
                <div className="absolute left-[11px] sm:left-[19px] top-6 w-2.5 h-2.5 rounded-full bg-alchemy-red/60 border-2 border-alchemy-black z-10" />

                {/* Glass card */}
                <div
                  className="rounded-2xl p-6 sm:p-8 group hover:-translate-y-1 transition-all duration-300"
                  style={{
                    background: t(isDark, 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.005) 100%)'),
                    border: `1px solid ${t(isDark, 'rgba(255,255,255,0.06)', 'rgba(0,0,0,0.06)')}`,
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  {/* Left accent bar */}
                  <div className="absolute left-12 sm:left-16 top-0 bottom-0 w-0.5 rounded-full bg-gradient-to-b from-alchemy-red/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className={`font-body font-bold text-base sm:text-lg ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
                        {exp.company}
                      </h3>
                      <p className="font-mono text-xs text-alchemy-red/70 tracking-wider mt-0.5">
                        {exp.role}
                      </p>
                    </div>
                    <span className={`font-mono text-[10px] sm:text-xs ${t(isDark, 'text-porcelain/30', 'text-neutral-400')} whitespace-nowrap`}>
                      {exp.dates}
                    </span>
                  </div>

                  {/* Achievements */}
                  <ul className="space-y-1.5 mb-4">
                    {exp.achievements.map((a, j) => (
                      <li key={j} className={`font-body text-xs sm:text-sm ${t(isDark, 'text-porcelain/45', 'text-neutral-500')} flex items-start gap-2`}>
                        <span className="text-alchemy-red/40 mt-1.5 text-[6px]">●</span>
                        {a}
                      </li>
                    ))}
                  </ul>

                  {exp.revenueSignal && (
                    <p className={`font-mono text-[10px] ${t(isDark, 'text-alchemy-red/50', 'text-alchemy-red/60')} mb-3`}>
                      {exp.revenueSignal}
                    </p>
                  )}

                  {/* Metrics pills */}
                  {exp.metrics && (
                    <div className="flex flex-wrap gap-2">
                      {exp.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="px-3 py-1.5 rounded-full font-mono text-[10px]"
                          style={{
                            background: t(isDark, 'rgba(220,38,38,0.08)', 'rgba(220,38,38,0.06)'),
                            border: `1px solid ${t(isDark, 'rgba(220,38,38,0.15)', 'rgba(220,38,38,0.12)')}`,
                            color: t(isDark, 'rgba(220,38,38,0.7)', 'rgba(220,38,38,0.8)'),
                          }}
                        >
                          <span className="opacity-60">{m.label}:</span> {m.value}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
});
CareerTimeline.displayName = 'CareerTimeline';

// ============================================
// INSIGHTS — Minimal Liquid Glass Links
// ============================================
const InsightsSection = memo(({ isDark }: { isDark: boolean }) => (
  <SectionShell id="insights" padding="xl" className={`relative ${t(isDark, '', 'bg-[#fafaf9]')}`}>
    <SequentianBackground variant={5} opacity={0.12} glow={false} />
    <div className="relative z-10">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, ease: EASE }} className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <EyebrowLabel className="mb-3">INSIGHTS</EyebrowLabel>
          <h2 className={`font-display text-2xl sm:text-3xl lg:text-4xl ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
            Recent thinking.
          </h2>
        </div>
      </motion.div>

      {/* Desktop: grid, Mobile: horizontal scroll */}
      <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {thoughtLeadershipEntries.map((entry, i) => (
          <motion.a
            key={entry.id}
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            style={{
              minHeight: '160px',
              background: t(isDark, 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.005) 100%)'),
              border: `1px solid ${t(isDark, 'rgba(255,255,255,0.06)', 'rgba(0,0,0,0.06)')}`,
              backdropFilter: 'blur(12px)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: EASE }}
            whileHover={{
              borderColor: 'rgba(220,38,38,0.3)',
              boxShadow: '0 8px 30px rgba(220,38,38,0.08)',
            }}
          >
            <div>
              <div className="flex items-center gap-1.5 mb-3">
                {entry.type === 'instagram' ? (
                  <Instagram className="w-3 h-3 text-alchemy-red/60" />
                ) : (
                  <Linkedin className="w-3 h-3 text-alchemy-red/60" />
                )}
                <span className={`font-mono text-[9px] uppercase tracking-wider ${t(isDark, 'text-porcelain/30', 'text-neutral-400')}`}>
                  {entry.type === 'instagram' ? 'Instagram' : 'LinkedIn'}
                </span>
              </div>
              <h4 className={`font-body text-sm font-medium ${t(isDark, 'text-porcelain/80', 'text-neutral-700')} line-clamp-3 leading-snug`}>
                {entry.title}
              </h4>
            </div>
            <ExternalLink className={`w-3 h-3 mt-3 ${t(isDark, 'text-porcelain/20', 'text-neutral-300')} group-hover:text-alchemy-red transition-colors`} />
          </motion.a>
        ))}
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="sm:hidden flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4">
        {thoughtLeadershipEntries.map((entry, i) => (
          <motion.a
            key={entry.id}
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-[260px] snap-start group rounded-2xl p-5 flex flex-col justify-between"
            style={{
              minHeight: '140px',
              background: t(isDark, 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.005) 100%)'),
              border: `1px solid ${t(isDark, 'rgba(255,255,255,0.06)', 'rgba(0,0,0,0.06)')}`,
              backdropFilter: 'blur(12px)',
            }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
          >
            <div>
              <div className="flex items-center gap-1.5 mb-3">
                {entry.type === 'instagram' ? (
                  <Instagram className="w-3 h-3 text-alchemy-red/60" />
                ) : (
                  <Linkedin className="w-3 h-3 text-alchemy-red/60" />
                )}
                <span className={`font-mono text-[9px] uppercase tracking-wider ${t(isDark, 'text-porcelain/30', 'text-neutral-400')}`}>
                  {entry.type === 'instagram' ? 'Instagram' : 'LinkedIn'}
                </span>
              </div>
              <h4 className={`font-body text-sm font-medium ${t(isDark, 'text-porcelain/80', 'text-neutral-700')} line-clamp-3 leading-snug`}>
                {entry.title}
              </h4>
            </div>
            <ExternalLink className={`w-3 h-3 mt-3 ${t(isDark, 'text-porcelain/20', 'text-neutral-300')}`} />
          </motion.a>
        ))}
      </div>
    </div>
  </SectionShell>
));
InsightsSection.displayName = 'InsightsSection';

// ============================================
// PHILOSOPHY + CTA — Subtler
// ============================================
const PhilosophyCTA = memo(({ isDark }: { isDark: boolean }) => (
  <SectionShell id="connect" padding="xl" className={`relative ${t(isDark, '', 'bg-[#fafaf9]')} text-center`}>
    <SequentianBackground variant={4} opacity={0.2} glow={false} />

    <div className="relative z-10 max-w-3xl mx-auto">
      <motion.blockquote initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: EASE }}>
        <p className={`font-display text-xl sm:text-2xl lg:text-3xl italic leading-snug ${t(isDark, 'text-porcelain/80', 'text-neutral-800')}`}>
          "Brands don't fail because of lack of creativity—they fail because they lack{' '}
          <span className="text-alchemy-red">structure</span>, <span className="text-alchemy-red">taste</span>, and{' '}
          <span className="text-alchemy-red">long-term thinking</span>."
        </p>
      </motion.blockquote>

      <motion.p className={`font-mono text-xs tracking-wider mt-8 ${t(isDark, 'text-porcelain/30', 'text-neutral-400')}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
        — Aashrith Gade, Founder
      </motion.p>

      <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.6 }}>
        <MagneticCTA href="/contact" variant="primary" size="lg">
          Start a Conversation
        </MagneticCTA>
        <MagneticCTA href="#" variant="ghost" size="lg" icon={false}>
          <Download className="w-4 h-4 mr-2" />
          Download Portfolio PDF
        </MagneticCTA>
      </motion.div>

      <motion.div className={`flex justify-center gap-4 sm:gap-6 font-mono text-[10px] sm:text-xs uppercase tracking-wider mt-10 ${t(isDark, 'text-porcelain/30', 'text-neutral-400')}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
        <span>NDA Available</span><span>·</span><span>24h Reply</span><span>·</span><span>Free First Call</span>
      </motion.div>
    </div>
  </SectionShell>
));
PhilosophyCTA.displayName = 'PhilosophyCTA';

// ============================================
// SCROLL PROGRESS
// ============================================
const ScrollProgress = memo(({ isDark }: { isDark: boolean }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 h-0.5">
      <div className="h-full bg-gradient-to-r from-alchemy-red to-alchemy-pink" style={{ width: `${progress * 100}%`, transition: 'width 0.1s linear' }} />
    </div>
  );
});
ScrollProgress.displayName = 'ScrollProgress';

// ============================================
// MAIN PAGE
// ============================================
const AashrithPortfolio = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('aashrith-theme');
      return stored ? stored === 'dark' : true;
    }
    return true;
  });

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem('aashrith-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-alchemy-black text-porcelain' : 'bg-[#fafaf9] text-neutral-900'} transition-colors duration-500`}>
      <SEOHead title="Aashrith Gade — Founder, Brand Architect" description="Portfolio of Aashrith Gade: founder of Brand Alchemy, Ashzz.ai & Alchemy Labs. AI-native brand architecture with luxury-grade taste." />
      <BackgroundScene mode="hero" />
      <PortfolioNav isDark={isDark} toggleTheme={toggleTheme} />
      <HeroSection isDark={isDark} />
      <SectionDivider />
      <VentureEcosystem isDark={isDark} />
      <SectionDivider />
      <CareerTimeline isDark={isDark} />
      <SectionDivider />
      <PhilosophyCTA isDark={isDark} />
      <SectionDivider />
      <InsightsSection isDark={isDark} />
      <Footer />
      <ScrollProgress isDark={isDark} />
    </div>
  );
};

export default AashrithPortfolio;
