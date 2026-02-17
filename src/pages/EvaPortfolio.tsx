import { memo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sun, Moon, Menu, X, Linkedin, Mail, ArrowRight, ChevronDown } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import { evaData, evaBrandCollaborations } from '@/data/foundersData';
import {
  SectionShell,
  EyebrowLabel,
  GlassCard,
  MagneticCTA,
  MarqueeRow,
  ParticleField,
} from '@/components/portfolio';
import { PortfolioFooter } from '@/components/portfolio/PortfolioFooter';
import { BlueprintGrid, NoiseTexture, AnimatedCapabilities } from '@/components/effects';
import { SequentianBackground } from '@/components/SequentianBackground';

const EASE = [0.22, 1, 0.36, 1] as const;
const t = (isDark: boolean, dark: string, light: string) => isDark ? dark : light;

// Social links
const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/eva-doshi-0b07b531b/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:evadoshi05@gmail.com?subject=Direct Inquiry – Eva Doshi', label: 'Email' },
];

// Footer config
const portfolioFooterLinks = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Ventures', href: '#ventures' },
  { label: 'Clients', href: '#clients' },
  { label: 'Journey', href: '#journey' },
  { label: 'Connect', href: '#connect' },
];
const ventureFooterLinks = [
  { label: 'Brand Alchemy', href: '#ventures', external: false },
  { label: 'Alchemy Labs', href: '#ventures', external: false },
];
const connectFooterLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/eva-doshi-0b07b531b/', external: true },
  { label: 'Email', href: 'mailto:evadoshi05@gmail.com?subject=Direct Inquiry – Eva Doshi', external: true },
];

// Section divider
const SectionDivider = ({ isDark }: { isDark: boolean }) => (
  <div className="h-16 w-full relative">
    <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${t(isDark, 'via-alchemy-black/30', 'via-neutral-100')} to-transparent`} />
  </div>
);

// ============================================
// FIXED CORNER CONTROLS
// ============================================
const FixedControls = memo(({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) => (
  <>
    <motion.div className="fixed top-4 left-4 z-[70]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Link
        to="/about"
        className="flex items-center gap-1.5 px-3 py-2.5 rounded-full font-mono text-[10px] tracking-wider transition-all"
        style={{
          background: t(isDark, 'rgba(10,10,10,0.7)', 'rgba(250,250,249,0.7)'),
          backdropFilter: 'blur(24px) saturate(180%)',
          border: `1px solid ${t(isDark, 'rgba(255,255,255,0.08)', 'rgba(0,0,0,0.06)')}`,
          color: t(isDark, 'rgba(245,245,244,0.6)', 'rgba(64,64,64,1)'),
        }}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">BACK</span>
      </Link>
    </motion.div>

    <motion.div className="fixed top-4 right-4 z-[70]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-10 h-10 rounded-full transition-all"
        style={{
          background: t(isDark, 'rgba(10,10,10,0.7)', 'rgba(250,250,249,0.7)'),
          backdropFilter: 'blur(24px) saturate(180%)',
          border: `1px solid ${t(isDark, 'rgba(255,255,255,0.08)', 'rgba(0,0,0,0.06)')}`,
        }}
      >
        {isDark ? <Sun className="w-4 h-4 text-porcelain/60" /> : <Moon className="w-4 h-4 text-neutral-500" />}
      </button>
    </motion.div>
  </>
));
FixedControls.displayName = 'FixedControls';

// ============================================
// NAVIGATION — Liquid Glass Pill
// ============================================
const PortfolioNav = memo(({ isDark }: { isDark: boolean }) => {
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
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Ventures', href: '#ventures' },
    { label: 'Clients', href: '#clients' },
    { label: 'Journey', href: '#journey' },
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
          className={`mx-16 sm:mx-20 mt-4 sm:mt-6 px-5 sm:px-8 py-3.5 sm:py-4 flex items-center gap-5 sm:gap-8 transition-all duration-500 ${scrolled ? 'rounded-full' : 'rounded-2xl'}`}
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
            className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}
            style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.2) 0%, rgba(236,72,153,0.05) 100%)', border: '1px solid rgba(236,72,153,0.3)' }}
          >
            ED
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className={`font-body text-sm ${t(isDark, 'text-porcelain/60 hover:text-porcelain', 'text-neutral-600 hover:text-neutral-900')} transition-colors relative group`}>
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-pink-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center ml-auto md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={`p-2 rounded-full ${t(isDark, 'hover:bg-white/5', 'hover:bg-black/5')} transition-colors`}>
              {isOpen ? <X className={`w-5 h-5 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`} /> : <Menu className={`w-5 h-5 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`} />}
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
              <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 p-2">
                <X className={`w-6 h-6 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`} />
              </button>

              <div className="flex-1 flex flex-col justify-center gap-6">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-body text-3xl font-bold ${t(isDark, 'text-porcelain', 'text-neutral-900')} hover:text-pink-500 transition-colors`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease: EASE }}
                  >
                    {link.label}
                  </motion.a>
                ))}

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4, ease: EASE }}>
                  <Link to="/about" onClick={() => setIsOpen(false)} className={`inline-flex items-center gap-2 font-mono text-sm ${t(isDark, 'text-porcelain/50', 'text-neutral-500')} hover:text-pink-500 transition-colors mt-4`}>
                    <ArrowLeft className="w-4 h-4" />
                    Back to Alchemy Labs
                  </Link>
                </motion.div>
              </div>

              {/* Social links in mobile menu */}
              <motion.div
                className={`flex items-center gap-4 pt-6 border-t ${t(isDark, 'border-porcelain/10', 'border-neutral-200')}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
                    <s.icon className={`w-5 h-5 ${t(isDark, 'text-porcelain/40', 'text-neutral-400')} group-hover:text-pink-500 transition-colors`} />
                    <span className={`font-mono text-xs ${t(isDark, 'text-porcelain/30', 'text-neutral-400')} group-hover:text-pink-500 transition-colors`}>{s.label}</span>
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
// HERO — Pink-Toned Cinematic
// ============================================
const HeroSection = memo(({ isDark }: { isDark: boolean }) => {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={heroRef} className={`relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden ${t(isDark, 'bg-alchemy-black', 'bg-[#fafaf9]')}`}>
      <div className={`absolute inset-0 ${t(isDark, 'bg-alchemy-black', 'bg-[#fafaf9]')}`} />

      {/* Sequentian 4 — Crimson Cloud */}
      <SequentianBackground variant={4} opacity={isDark ? 0.15 : 0.08} blur={0} glow={false} />

      {/* Soft gradient orbs - pink */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'linear-gradient(135deg, #ec4899, #fb7185, #fda4af)', filter: 'blur(80px)', opacity: isDark ? 0.12 : 0.08 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full"
          animate={{ scale: [1.1, 1, 1.1], x: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          style={{ background: 'linear-gradient(45deg, #fb7185, #fda4af)', filter: 'blur(60px)', opacity: isDark ? 0.12 : 0.08 }}
        />
      </div>

      {/* Grid + Grain */}
      <BlueprintGrid opacity={0.015} />
      <NoiseTexture opacity={0.02} />

      {/* Pink particles */}
      <ParticleField count={20} color="rgba(236,72,153,0.25)" opacity={0.35} />

      {/* Top + Bottom fade */}
      <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${t(isDark, 'from-alchemy-black', 'from-[#fafaf9]')} to-transparent z-[1]`} />
      <div className={`absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t ${t(isDark, 'from-alchemy-black', 'from-[#fafaf9]')} to-transparent z-[1]`} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <span className={`font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] ${t(isDark, 'text-pink-400/70', 'text-pink-600/60')}`}>
            Co-Founder · Brand Strategist · Growth Partner
          </span>
        </motion.div>

        <motion.h1 className="mt-8 mb-6" initial={{ opacity: 0, filter: 'blur(12px)', y: 40 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} transition={{ duration: 1, delay: 0.4, ease: EASE }}>
          <span className={`block font-body font-black text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] uppercase leading-[0.85] tracking-[-0.03em] ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
            EVA
          </span>
          <span className="block font-body font-black text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] uppercase leading-[0.85] tracking-[-0.03em] bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
            DOSHI
          </span>
        </motion.h1>

        <motion.div className="flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <AnimatedCapabilities isDark={isDark} />
        </motion.div>

        <motion.p className="font-body text-sm sm:text-base mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          style={{ background: 'linear-gradient(135deg, #ec4899, #fb7185, #fda4af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
        >
          {evaData.hero.tagline}
        </motion.p>

        <motion.div className={`flex justify-center gap-6 font-mono text-[10px] sm:text-xs ${t(isDark, 'text-porcelain/30', 'text-neutral-400')} mt-5`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
          <span>Mumbai, IN</span><span>·</span><span>Ex-Dentsu</span><span>·</span><span>Co-Founder</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
        <motion.div className="w-px h-10 sm:h-12 bg-gradient-to-b from-transparent via-pink-500/60 to-transparent" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} />
        <span className={`font-mono text-[9px] uppercase tracking-widest ${t(isDark, 'text-porcelain/40', 'text-neutral-400')}`}>Scroll</span>
      </motion.div>
    </section>
  );
});
HeroSection.displayName = 'HeroSection';

// ============================================
// CREATIVE PHILOSOPHY — Seq 5
// ============================================
const CreativePhilosophy = memo(({ isDark }: { isDark: boolean }) => (
  <SectionShell id="philosophy" padding="xl" className={`relative ${t(isDark, '', 'bg-[#fafaf9]')}`}>
    <SequentianBackground variant={5} opacity={isDark ? 0.10 : 0.06} glow={false} />
    <div className="relative z-10 max-w-3xl mx-auto text-center">
      <motion.blockquote initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: EASE }}>
        <p className={`font-display text-2xl sm:text-3xl lg:text-4xl italic leading-snug ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
          "Strategy meets <span className="text-pink-500">storytelling</span>.
          <br />
          Execution meets <span className="text-pink-500">elegance</span>."
        </p>
      </motion.blockquote>

      <motion.p className={`font-body text-base sm:text-lg mt-8 leading-relaxed ${t(isDark, 'text-porcelain/60', 'text-neutral-600')}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}>
        {evaData.bio.intro}
      </motion.p>
      {evaData.bio.extendedIntro && (
        <motion.p className={`font-body text-sm sm:text-base mt-4 leading-relaxed ${t(isDark, 'text-porcelain/40', 'text-neutral-500')}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}>
          {evaData.bio.extendedIntro}
        </motion.p>
      )}

      {/* Expertise pills - pink */}
      <motion.div className="flex flex-wrap justify-center gap-3 mt-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
        {evaData.bio.expertise.map(tag => (
          <span key={tag} className="px-4 py-2 rounded-full font-body text-xs tracking-wide" style={{
            background: isDark ? 'linear-gradient(135deg, rgba(236,72,153,0.08), rgba(251,113,133,0.05))' : 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(251,113,133,0.08))',
            border: '1px solid rgba(236,72,153,0.2)',
            color: isDark ? 'rgba(236,72,153,0.9)' : '#be185d',
          }}>
            {tag}
          </span>
        ))}
      </motion.div>

      {/* Process visualization */}
      <motion.div className="flex items-center justify-center gap-4 sm:gap-8 mt-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
        {evaData.philosophy.process.map((step, i) => (
          <div key={step} className="flex items-center gap-4 sm:gap-8">
            <span className={`font-mono text-xs sm:text-sm tracking-wider ${t(isDark, 'text-porcelain/60', 'text-neutral-600')}`}>{step}</span>
            {i < evaData.philosophy.process.length - 1 && <ArrowRight className="w-4 h-4 text-pink-500/40" />}
          </div>
        ))}
      </motion.div>
    </div>
  </SectionShell>
));
CreativePhilosophy.displayName = 'CreativePhilosophy';

// ============================================
// VENTURE CONTRIBUTIONS — Seq 2
// ============================================
const VentureContributions = memo(({ isDark }: { isDark: boolean }) => {
  const placeholderTiles = Array.from({ length: 8 }, (_, i) => (
    <div key={i} className="flex-shrink-0 w-48 sm:w-56 rounded-xl overflow-hidden" style={{ aspectRatio: '4/3', border: '1px solid rgba(236,72,153,0.15)', background: `linear-gradient(135deg, rgba(236,72,153,${0.03 + (i % 3) * 0.02}), ${t(isDark, 'rgba(255,255,255,0.02)', 'rgba(0,0,0,0.01)')})` }}>
      <div className="w-full h-full flex items-center justify-center">
        <span className={`font-mono text-[10px] ${t(isDark, 'text-porcelain/20', 'text-neutral-300')}`}>IMG {i + 1}</span>
      </div>
    </div>
  ));

  return (
    <SectionShell id="ventures" padding="xl" maxWidth="full" className={`relative ${t(isDark, '', 'bg-[#fafaf9]')}`}>
      <SequentianBackground variant={2} opacity={isDark ? 0.12 : 0.07} glow={false} />
      {/* Pink radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(236,72,153,0.04) 0%, transparent 70%)' }} />

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, ease: EASE }}>
            <EyebrowLabel className="mb-4">VENTURE CONTRIBUTIONS</EyebrowLabel>
            <h2 className={`font-display text-3xl sm:text-4xl ${t(isDark, 'text-porcelain', 'text-neutral-900')} mb-3`}>
              Co-Founder, <span className="text-pink-500 italic">Brand Alchemy</span>
            </h2>
            <p className={`font-body text-base sm:text-lg max-w-2xl ${t(isDark, 'text-porcelain/50', 'text-neutral-500')}`}>
              Architecting the thought leadership infrastructure that positions Alchemy Labs as the system behind AI-native branding.
            </p>
          </motion.div>
        </div>
        <MarqueeRow speed="slow" direction="left" gap={16}>
          {placeholderTiles}
        </MarqueeRow>
      </div>
    </SectionShell>
  );
});
VentureContributions.displayName = 'VentureContributions';

// ============================================
// CLIENT SHOWCASE — No Sequentian, subtle pink radial
// ============================================
const ClientShowcase = memo(({ isDark }: { isDark: boolean }) => (
  <SectionShell id="clients" padding="xl" className={`relative ${t(isDark, '', 'bg-[#fafaf9]')}`}>
    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(236,72,153,0.03) 0%, transparent 60%)' }} />
    <div className="relative z-10">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, ease: EASE }} className="mb-12">
        <EyebrowLabel className="mb-4">CLIENT PORTFOLIO</EyebrowLabel>
        <h2 className={`font-display text-3xl sm:text-4xl ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
          Fashion × Luxury <span className="text-pink-500 italic">Brand Collaborations</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {evaBrandCollaborations.map((brand, i) => (
          <motion.div key={brand.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}>
            <div
              className="rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: t(isDark, 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.005) 100%)'),
                border: `1px solid ${t(isDark, 'rgba(255,255,255,0.06)', 'rgba(0,0,0,0.06)')}`,
                backdropFilter: 'blur(12px)',
              }}
            >
              <h4 className={`font-body font-bold text-lg ${t(isDark, 'text-porcelain', 'text-neutral-900')} mb-1`}>{brand.name}</h4>
              <p className="font-body text-sm text-pink-500/70 mb-2">{brand.role}</p>
              <p className={`font-mono text-xs ${t(isDark, 'text-porcelain/40', 'text-neutral-500')}`}>{brand.metric}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </SectionShell>
));
ClientShowcase.displayName = 'ClientShowcase';

// ============================================
// CAREER JOURNEY — Seq 3, Glass Cards with pink accents
// ============================================
const CareerJourney = memo(({ isDark }: { isDark: boolean }) => {
  const entries = evaData.experience;

  return (
    <SectionShell id="journey" padding="xl" className={`relative ${t(isDark, '', 'bg-[#fafaf9]')}`}>
      <SequentianBackground variant={3} opacity={isDark ? 0.10 : 0.06} glow={false} />
      <div className="relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, ease: EASE }} className="mb-16">
          <EyebrowLabel className="mb-4">CAREER JOURNEY</EyebrowLabel>
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
            Professional <span className="text-pink-500 italic">Journey.</span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-pink-500/30 via-pink-500/10 to-transparent" />

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
                <div className="absolute left-[11px] sm:left-[19px] top-6 w-2.5 h-2.5 rounded-full bg-pink-500/60 border-2 z-10" style={{ borderColor: t(isDark, '#0a0a0a', '#fafaf9') }} />

                <div
                  className="rounded-2xl p-6 sm:p-8 hover:-translate-y-1 transition-all duration-300"
                  style={{
                    background: t(isDark, 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.005) 100%)'),
                    border: `1px solid ${t(isDark, 'rgba(255,255,255,0.06)', 'rgba(0,0,0,0.06)')}`,
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className={`font-body font-bold text-base sm:text-lg ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>{exp.company}</h3>
                      <p className="font-mono text-xs text-pink-500/70 tracking-wider mt-0.5">{exp.role}</p>
                    </div>
                    <span className={`font-mono text-[10px] sm:text-xs ${t(isDark, 'text-porcelain/30', 'text-neutral-400')} whitespace-nowrap`}>{exp.dates}</span>
                  </div>

                  <ul className="space-y-1.5 mb-4">
                    {exp.achievements.map((a, j) => (
                      <li key={j} className={`font-body text-xs sm:text-sm ${t(isDark, 'text-porcelain/50', 'text-neutral-500')} flex items-start gap-2`}>
                        <span className="text-pink-500/40 mt-1.5 text-[6px]">●</span>
                        {a}
                      </li>
                    ))}
                  </ul>

                  {exp.metrics && (
                    <div className="flex flex-wrap gap-2">
                      {exp.metrics.map((m) => (
                        <div key={m.label} className="px-3 py-1.5 rounded-full font-mono text-[10px]" style={{
                          background: t(isDark, 'rgba(236,72,153,0.08)', 'rgba(236,72,153,0.06)'),
                          border: `1px solid ${t(isDark, 'rgba(236,72,153,0.15)', 'rgba(236,72,153,0.12)')}`,
                          color: t(isDark, 'rgba(236,72,153,0.7)', 'rgba(236,72,153,0.8)'),
                        }}>
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
CareerJourney.displayName = 'CareerJourney';

// ============================================
// FINAL CTA — Seq 1
// ============================================
const FinalCTA = memo(({ isDark }: { isDark: boolean }) => (
  <SectionShell id="connect" padding="xl" className={`relative ${t(isDark, '', 'bg-[#fafaf9]')} text-center`}>
    <SequentianBackground variant={1} opacity={isDark ? 0.15 : 0.08} glow={false} />

    <div className="relative z-10 max-w-3xl mx-auto">
      <motion.blockquote initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: EASE }}>
        <p className={`font-display text-xl sm:text-2xl lg:text-3xl italic leading-snug ${t(isDark, 'text-porcelain/80', 'text-neutral-800')}`}>
          "Excellence isn't a moment—
          <br />
          it's a <span className="text-pink-500">system</span>."
        </p>
      </motion.blockquote>

      <motion.p className={`font-mono text-xs tracking-wider mt-8 ${t(isDark, 'text-porcelain/30', 'text-neutral-400')}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
        — Eva Doshi, Co-Founder
      </motion.p>

      <motion.div className="mt-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.6 }}>
        <MagneticCTA href="/contact" variant="primary" size="lg">
          Let's Collaborate
        </MagneticCTA>
      </motion.div>

      <motion.div className={`flex justify-center gap-4 sm:gap-6 font-mono text-[10px] sm:text-xs uppercase tracking-wider mt-10 ${t(isDark, 'text-porcelain/30', 'text-neutral-400')}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
        <span>NDA Available</span><span>·</span><span>24h Reply</span><span>·</span><span>Free First Call</span>
      </motion.div>
    </div>
  </SectionShell>
));
FinalCTA.displayName = 'FinalCTA';

// ============================================
// SCROLL PROGRESS — Top, pink-to-red gradient
// ============================================
const ScrollProgress = memo(() => {
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
    <div className="fixed top-0 left-0 right-0 z-[80] h-1">
      <div
        className="h-full bg-gradient-to-r from-pink-500 to-alchemy-red"
        style={{
          width: `${progress * 100}%`,
          transition: 'width 0.1s linear',
          boxShadow: '0 0 8px rgba(236,72,153,0.5), 0 0 16px rgba(236,72,153,0.25)',
        }}
      />
    </div>
  );
});
ScrollProgress.displayName = 'ScrollProgress';

// ============================================
// MAIN PAGE
// ============================================
const EvaPortfolio = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('eva-theme');
      return stored ? stored === 'dark' : true;
    }
    return true;
  });

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem('eva-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-alchemy-black text-porcelain' : 'bg-[#fafaf9] text-neutral-900'} transition-colors duration-500`}>
      <SEOHead title="Eva Doshi — Co-Founder, Brand Strategist" description="Portfolio of Eva Doshi: Co-Founder of Brand Alchemy. Fashion × Luxury × Creative Direction." />
      <ScrollProgress />
      <FixedControls isDark={isDark} toggleTheme={toggleTheme} />
      <PortfolioNav isDark={isDark} />
      <HeroSection isDark={isDark} />
      <SectionDivider isDark={isDark} />
      <CreativePhilosophy isDark={isDark} />
      <SectionDivider isDark={isDark} />
      <VentureContributions isDark={isDark} />
      <SectionDivider isDark={isDark} />
      <ClientShowcase isDark={isDark} />
      <SectionDivider isDark={isDark} />
      <CareerJourney isDark={isDark} />
      <SectionDivider isDark={isDark} />
      <FinalCTA isDark={isDark} />
      <PortfolioFooter
        isDark={isDark}
        founderName="Eva Doshi"
        monogram="ED"
        copyright="Eva Doshi"
        portfolioLinks={portfolioFooterLinks}
        ventureLinks={ventureFooterLinks}
        connectLinks={connectFooterLinks}
      />
    </div>
  );
};

export default EvaPortfolio;
