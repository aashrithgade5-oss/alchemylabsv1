import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sun, Moon, Menu, X, ChevronDown, Download } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import { aashrithData } from '@/data/foundersData';
import { thoughtLeadershipEntries } from '@/data/portfolioProjects';
import {
  SectionShell,
  EyebrowLabel,
  MagneticCTA,
  MarqueeRow,
  TimelineRail,
  TimelineEntry,
  BackgroundScene,
  HyperLiquidGlass,
  ParticleField,
  VideoPlaceholder,
  ThoughtLeadershipCard,
} from '@/components/portfolio';
import { BlueprintGrid, NoiseTexture, AnimatedCapabilities } from '@/components/effects';

const EASE = [0.22, 1, 0.36, 1] as const;
const t = (isDark: boolean, dark: string, light: string) => isDark ? dark : light;

// ============================================
// NAVIGATION (kept as-is from original)
// ============================================
const PortfolioNav = memo(({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Ventures', href: '#ventures' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'Journey', href: '#journey' },
    { label: 'Connect', href: '#connect' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-4 sm:py-6'}`}
      style={{
        background: scrolled ? t(isDark, 'rgba(10,10,10,0.9)', 'rgba(250,250,249,0.9)') : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? `1px solid ${t(isDark, 'rgba(255,255,255,0.05)', 'rgba(0,0,0,0.05)')}` : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm font-bold ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}
            style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.2) 0%, rgba(220,38,38,0.05) 100%)', border: '1px solid rgba(220,38,38,0.3)' }}
          >
            AG
          </div>
          <Link to="/about" className={`flex items-center gap-2 ${t(isDark, 'text-porcelain/50 hover:text-porcelain', 'text-neutral-500 hover:text-neutral-900')} transition-colors`}>
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-xs tracking-wider hidden sm:inline">ALCHEMY LABS</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className={`font-body text-sm ${t(isDark, 'text-porcelain/60 hover:text-porcelain', 'text-neutral-600 hover:text-neutral-900')} transition-colors relative group`}>
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-alchemy-red group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className={`p-2 rounded-full ${t(isDark, 'hover:bg-white/5', 'hover:bg-black/5')} transition-colors`}>
            {isDark ? <Sun className="w-4 h-4 text-porcelain/60" /> : <Moon className="w-4 h-4 text-neutral-600" />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden p-2 rounded-full ${t(isDark, 'hover:bg-white/5', 'hover:bg-black/5')} transition-colors`}>
            {isOpen ? <X className={`w-5 h-5 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`} /> : <Menu className={`w-5 h-5 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className={`md:hidden absolute top-full left-0 right-0 ${t(isDark, 'bg-[#0a0a0a]/98', 'bg-[#fafaf9]/98')} backdrop-blur-xl border-t ${t(isDark, 'border-white/5', 'border-black/5')}`}>
            <div className="p-6 space-y-4">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} onClick={() => setIsOpen(false)} className={`block font-body text-lg ${t(isDark, 'text-porcelain/80', 'text-neutral-700')} hover:text-alchemy-red transition-colors`}>{link.label}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
});
PortfolioNav.displayName = 'PortfolioNav';

// ============================================
// SECTION 1: HERO (Hypnotic Entry)
// ============================================
const HeroSection = memo(({ isDark }: { isDark: boolean }) => (
  <section className="relative min-h-[100svh] flex items-center overflow-hidden">
    <ParticleField count={30} color="rgba(220,38,38,0.3)" opacity={0.4} />
    <BlueprintGrid opacity={isDark ? 0.03 : 0.02} />
    <NoiseTexture opacity={isDark ? 0.04 : 0.02} />

    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left: Name + capabilities */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <span className={`font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] ${t(isDark, 'text-alchemy-red/70', 'text-alchemy-red/60')}`}>
              Creative Director · Brand Architect · AI-Native
            </span>
          </motion.div>

          <motion.h1 className="mt-6 mb-4" initial={{ opacity: 0, filter: 'blur(12px)', y: 40 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} transition={{ duration: 1, delay: 0.4, ease: EASE }}>
            <span className={`block font-body font-black text-[4rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] xl:text-[10rem] uppercase leading-[0.85] tracking-[-0.03em] ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
              AASHRITH
            </span>
            <span className="block font-body font-black text-[4rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] xl:text-[10rem] uppercase leading-[0.85] tracking-[-0.03em] bg-gradient-to-r from-alchemy-red via-alchemy-pink to-alchemy-red bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
              GADE
            </span>
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <AnimatedCapabilities />
          </motion.div>

          <motion.p className={`font-body text-base sm:text-lg max-w-xl ${t(isDark, 'text-porcelain/50', 'text-neutral-500')} mt-4 mx-auto lg:mx-0`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}>
            Founder of Brand Alchemy, Ashzz.ai & Alchemy Labs
          </motion.p>

          <motion.div className={`flex justify-center lg:justify-start gap-6 font-mono text-[10px] sm:text-xs ${t(isDark, 'text-porcelain/30', 'text-neutral-400')} mt-4`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
            <span>Mumbai, IN</span><span>·</span><span>EST. 2024</span><span>·</span><span>50+ Projects</span>
          </motion.div>
        </div>

        {/* Right: Video in HyperLiquidGlass */}
        <motion.div className="w-full lg:w-[40%] flex-shrink-0" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.6, ease: EASE }}>
          <HyperLiquidGlass variant="hover-glow" className="p-2">
            <VideoPlaceholder aspectRatio="1/1" />
          </HyperLiquidGlass>
        </motion.div>
      </div>
    </div>

    {/* Scroll indicator */}
    <motion.div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
      <motion.div className="w-px h-10 sm:h-12 bg-gradient-to-b from-transparent via-alchemy-red/60 to-transparent" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} />
      <span className={`font-mono text-[9px] uppercase tracking-widest ${t(isDark, 'text-porcelain/40', 'text-neutral-400')}`}>Scroll</span>
    </motion.div>
  </section>
));
HeroSection.displayName = 'HeroSection';

// ============================================
// SECTION 2: VENTURE ECOSYSTEM (Marquee Archive)
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
    <SectionShell id="ventures" padding="xl" maxWidth="full" className={t(isDark, '', 'bg-[#fafaf9]')}>
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
            {/* Venture label */}
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
    </SectionShell>
  );
});
VentureEcosystem.displayName = 'VentureEcosystem';

// ============================================
// SECTION 3: THOUGHT LEADERSHIP (Proof Layer)
// ============================================
const ThoughtLeadership = memo(({ isDark }: { isDark: boolean }) => (
  <SectionShell id="leadership" padding="xl" className={t(isDark, '', 'bg-[#fafaf9]')}>
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, ease: EASE }} className="mb-12">
      <EyebrowLabel className="mb-4">THOUGHT LEADERSHIP</EyebrowLabel>
      <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl ${t(isDark, 'text-porcelain', 'text-neutral-900')} mb-3`}>
        Systems thinking, <span className="text-alchemy-red italic">documented.</span>
      </h2>
      <p className={`font-body text-base sm:text-lg max-w-2xl ${t(isDark, 'text-porcelain/50', 'text-neutral-500')}`}>
        Frameworks, case studies, and strategic narratives that reshape how brands operate in AI-first markets.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {thoughtLeadershipEntries.map((entry, i) => (
        <motion.div key={entry.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}>
          <ThoughtLeadershipCard entry={entry} />
        </motion.div>
      ))}
    </div>
  </SectionShell>
));
ThoughtLeadership.displayName = 'ThoughtLeadership';

// ============================================
// SECTION 4: CAREER TIMELINE (Journey Validation)
// ============================================
const CareerTimeline = memo(({ isDark }: { isDark: boolean }) => {
  const timelineEntries: TimelineEntry[] = aashrithData.experience.map((exp, i) => ({
    id: `exp-${i}`,
    title: exp.role,
    company: exp.company,
    dates: exp.dates,
    highlights: exp.achievements,
    revenueSignal: exp.revenueSignal,
    metrics: exp.metrics,
  }));

  return (
    <SectionShell id="journey" padding="xl" className={t(isDark, '', 'bg-[#fafaf9]')}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, ease: EASE }} className="mb-12">
        <EyebrowLabel className="mb-4">CAREER JOURNEY</EyebrowLabel>
        <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
          From execution to <span className="text-alchemy-red italic">architecture.</span>
        </h2>
      </motion.div>
      <TimelineRail entries={timelineEntries} />
    </SectionShell>
  );
});
CareerTimeline.displayName = 'CareerTimeline';

// ============================================
// SECTION 5: PHILOSOPHY + CTA (Soft Conversion)
// ============================================
const PhilosophyCTA = memo(({ isDark }: { isDark: boolean }) => (
  <SectionShell id="connect" padding="xl" className={`${t(isDark, '', 'bg-[#fafaf9]')} text-center`}>
    <ParticleField count={15} color="rgba(220,38,38,0.15)" opacity={0.25} />

    <div className="relative z-10 max-w-3xl mx-auto">
      <motion.blockquote initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: EASE }}>
        <p className={`font-display text-2xl sm:text-3xl lg:text-4xl italic leading-snug ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
          "Brands don't fail because of lack of creativity—they fail because they lack{' '}
          <span className="text-alchemy-red">structure</span>, <span className="text-alchemy-red">taste</span>, and{' '}
          <span className="text-alchemy-red">long-term thinking</span>."
        </p>
      </motion.blockquote>

      <motion.p className={`font-mono text-xs tracking-wider mt-8 ${t(isDark, 'text-porcelain/40', 'text-neutral-400')}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
        — Aashrith Gade, Founder
      </motion.p>

      <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.6 }}>
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
      <VentureEcosystem isDark={isDark} />
      <ThoughtLeadership isDark={isDark} />
      <CareerTimeline isDark={isDark} />
      <PhilosophyCTA isDark={isDark} />
      <ScrollProgress isDark={isDark} />
    </div>
  );
};

export default AashrithPortfolio;
