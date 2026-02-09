import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sun, Moon, Menu, X, ChevronDown, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import { evaData, evaBrandCollaborations } from '@/data/foundersData';
import {
  SectionShell,
  EyebrowLabel,
  GlassCard,
  MagneticCTA,
  MarqueeRow,
  TimelineRail,
  TimelineEntry,
} from '@/components/portfolio';

const EASE = [0.22, 1, 0.36, 1] as const;
const t = (isDark: boolean, dark: string, light: string) => isDark ? dark : light;

// ============================================
// NAVIGATION
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
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Ventures', href: '#ventures' },
    { label: 'Clients', href: '#clients' },
    { label: 'Journey', href: '#journey' },
    { label: 'Connect', href: '#connect' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-4 sm:py-6'}`}
      style={{
        background: scrolled ? t(isDark, 'rgba(10,10,10,0.9)', 'rgba(250,250,249,0.9)') : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-display italic text-sm"
            style={{
              background: isDark
                ? 'linear-gradient(135deg, rgba(251,113,133,0.2) 0%, rgba(220,38,38,0.1) 100%)'
                : 'linear-gradient(135deg, rgba(251,113,133,0.3) 0%, rgba(220,38,38,0.2) 100%)',
              border: '1px solid rgba(251,113,133,0.4)',
            }}
          >
            <span className={isDark ? 'text-alchemy-pink' : 'text-alchemy-red'}>ED</span>
          </div>
          <Link to="/about" className={`flex items-center gap-2 ${t(isDark, 'text-porcelain/50 hover:text-porcelain', 'text-neutral-500 hover:text-neutral-900')} transition-colors`}>
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-xs tracking-wider hidden sm:inline">ALCHEMY LABS</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.label} href={link.href} className={`font-body text-sm ${t(isDark, 'text-porcelain/60 hover:text-porcelain', 'text-neutral-600 hover:text-neutral-900')} transition-colors`}>{link.label}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className={`p-2 rounded-full ${isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'} transition-colors`}>
            {isDark ? <Sun className="w-4 h-4 text-porcelain/60" /> : <Moon className="w-4 h-4 text-neutral-600" />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden p-2 rounded-full ${isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'} transition-colors`}>
            {isOpen ? <X className={`w-5 h-5 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`} /> : <Menu className={`w-5 h-5 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`md:hidden absolute top-full left-0 right-0 ${isDark ? 'bg-[#0a0a0a]/98' : 'bg-[#fafaf9]/98'} backdrop-blur-xl border-t ${isDark ? 'border-white/5' : 'border-black/5'}`}>
            <div className="p-6 space-y-4">
              {navLinks.map(link => (
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
// SECTION 1: HERO (Elegant Authority)
// ============================================
const HeroSection = memo(({ isDark }: { isDark: boolean }) => (
  <section
    className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    style={{ background: isDark ? 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)' : 'linear-gradient(135deg, #fafaf9 0%, #fff5f5 50%, #fafaf9 100%)' }}
  >
    {/* Soft gradient orbs */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'linear-gradient(135deg, #dc2626, #fb7185, #fda4af)', filter: 'blur(80px)' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full opacity-10"
        animate={{ scale: [1.1, 1, 1.1], x: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{ background: 'linear-gradient(45deg, #fb7185, #fda4af)', filter: 'blur(60px)' }}
      />
    </div>

    <div className="relative z-10 text-center px-4 sm:px-6">
      <motion.h1 className="mb-6" initial={{ opacity: 0, y: 40, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, ease: EASE }}>
        <span className={`block font-body font-black text-[3.5rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[7rem] uppercase leading-[0.85] tracking-[-0.03em] ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>EVA</span>
        <span className="block font-body font-black text-[3.5rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[7rem] uppercase leading-[0.85] tracking-[-0.03em] bg-gradient-to-r from-alchemy-red via-alchemy-pink to-alchemy-red bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">DOSHI</span>
      </motion.h1>

      <motion.div className="space-y-2 mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
        {evaData.hero.titles.map(title => (
          <p key={title} className={`font-body text-sm sm:text-base ${t(isDark, 'text-porcelain/60', 'text-neutral-600')} tracking-[0.15em] uppercase`}>{title}</p>
        ))}
      </motion.div>

      <motion.p className="font-body text-sm sm:text-base" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        style={{ background: 'linear-gradient(135deg, #dc2626, #fb7185, #fda4af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
      >
        {evaData.hero.tagline}
      </motion.p>

      {/* Decorative flourish */}
      <motion.div className="mt-8" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.3, scale: 1 }} transition={{ delay: 0.9, duration: 1 }}>
        <svg className="w-12 h-12 mx-auto" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" stroke="url(#pink-grad)" strokeWidth="0.5" />
          <circle cx="24" cy="24" r="12" stroke="url(#pink-grad)" strokeWidth="0.5" />
          <circle cx="24" cy="24" r="4" fill="url(#pink-grad)" fillOpacity="0.3" />
          <defs><linearGradient id="pink-grad" x1="0" y1="0" x2="48" y2="48"><stop stopColor="#dc2626" /><stop offset="1" stopColor="#fb7185" /></linearGradient></defs>
        </svg>
      </motion.div>

      <motion.div className="mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5 text-alchemy-pink/60 mx-auto" />
        </motion.div>
      </motion.div>
    </div>
  </section>
));
HeroSection.displayName = 'HeroSection';

// ============================================
// SECTION 2: CREATIVE PHILOSOPHY
// ============================================
const CreativePhilosophy = memo(({ isDark }: { isDark: boolean }) => (
  <SectionShell id="philosophy" padding="xl" className={t(isDark, '', 'bg-[#fafaf9]')}>
    <div className="max-w-3xl mx-auto text-center">
      <motion.blockquote initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: EASE }}>
        <p className={`font-display text-2xl sm:text-3xl lg:text-4xl italic leading-snug ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
          "Strategy meets <span className="text-alchemy-red">storytelling</span>.
          <br />
          Execution meets <span className="text-alchemy-red">elegance</span>."
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

      {/* Expertise pills */}
      <motion.div className="flex flex-wrap justify-center gap-3 mt-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
        {evaData.bio.expertise.map(tag => (
          <span key={tag} className="px-4 py-2 rounded-full font-body text-xs tracking-wide" style={{
            background: isDark ? 'linear-gradient(135deg, rgba(220,38,38,0.08), rgba(251,113,133,0.05))' : 'linear-gradient(135deg, rgba(220,38,38,0.1), rgba(251,113,133,0.08))',
            border: '1px solid rgba(251,113,133,0.2)',
            color: isDark ? 'rgba(251,113,133,0.9)' : '#dc2626',
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
            {i < evaData.philosophy.process.length - 1 && <ArrowRight className="w-4 h-4 text-alchemy-red/40" />}
          </div>
        ))}
      </motion.div>
    </div>
  </SectionShell>
));
CreativePhilosophy.displayName = 'CreativePhilosophy';

// ============================================
// SECTION 3: VENTURE CONTRIBUTIONS
// ============================================
const VentureContributions = memo(({ isDark }: { isDark: boolean }) => {
  const placeholderTiles = Array.from({ length: 8 }, (_, i) => (
    <div key={i} className="flex-shrink-0 w-48 sm:w-56 rounded-xl overflow-hidden" style={{ aspectRatio: '4/3', border: '1px solid rgba(251,113,133,0.15)', background: `linear-gradient(135deg, rgba(251,113,133,${0.03 + (i % 3) * 0.02}), rgba(255,255,255,0.02))` }}>
      <div className="w-full h-full flex items-center justify-center">
        <span className={`font-mono text-[10px] ${t(isDark, 'text-porcelain/20', 'text-neutral-300')}`}>IMG {i + 1}</span>
      </div>
    </div>
  ));

  return (
    <SectionShell id="ventures" padding="xl" maxWidth="full" className={t(isDark, '', 'bg-[#fafaf9]')}>
      <div className="max-w-6xl mx-auto mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, ease: EASE }}>
          <EyebrowLabel className="mb-4">VENTURE CONTRIBUTIONS</EyebrowLabel>
          <h2 className={`font-display text-3xl sm:text-4xl ${t(isDark, 'text-porcelain', 'text-neutral-900')} mb-3`}>
            Co-Founder, <span className="text-alchemy-red italic">Brand Alchemy</span>
          </h2>
          <p className={`font-body text-base sm:text-lg max-w-2xl ${t(isDark, 'text-porcelain/50', 'text-neutral-500')}`}>
            Architecting the thought leadership infrastructure that positions Alchemy Labs as the system behind AI-native branding.
          </p>
        </motion.div>
      </div>
      <MarqueeRow speed="slow" direction="left" gap={16}>
        {placeholderTiles}
      </MarqueeRow>
    </SectionShell>
  );
});
VentureContributions.displayName = 'VentureContributions';

// ============================================
// SECTION 4: CLIENT SHOWCASE
// ============================================
const ClientShowcase = memo(({ isDark }: { isDark: boolean }) => (
  <SectionShell id="clients" padding="xl" className={t(isDark, '', 'bg-[#fafaf9]')}>
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, ease: EASE }} className="mb-12">
      <EyebrowLabel className="mb-4">CLIENT PORTFOLIO</EyebrowLabel>
      <h2 className={`font-display text-3xl sm:text-4xl ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
        Fashion × Luxury <span className="text-alchemy-red italic">Brand Collaborations</span>
      </h2>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {evaBrandCollaborations.map((brand, i) => (
        <motion.div key={brand.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}>
          <GlassCard variant="default" hover padding="lg">
            <h4 className={`font-body font-bold text-lg ${t(isDark, 'text-porcelain', 'text-neutral-900')} mb-1`}>{brand.name}</h4>
            <p className="font-body text-sm text-alchemy-red/70 mb-2">{brand.role}</p>
            <p className={`font-mono text-xs ${t(isDark, 'text-porcelain/40', 'text-neutral-500')}`}>{brand.metric}</p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  </SectionShell>
));
ClientShowcase.displayName = 'ClientShowcase';

// ============================================
// SECTION 5: CAREER JOURNEY
// ============================================
const CareerJourney = memo(({ isDark }: { isDark: boolean }) => {
  const entries: TimelineEntry[] = evaData.experience.map((exp, i) => ({
    id: `eva-exp-${i}`,
    title: exp.role,
    company: exp.company,
    dates: exp.dates,
    highlights: exp.achievements,
    metrics: exp.metrics,
  }));

  return (
    <SectionShell id="journey" padding="xl" className={t(isDark, '', 'bg-[#fafaf9]')}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, ease: EASE }} className="mb-12">
        <EyebrowLabel className="mb-4">CAREER JOURNEY</EyebrowLabel>
        <h2 className={`font-display text-3xl sm:text-4xl ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
          Professional <span className="text-alchemy-red italic">Journey</span>
        </h2>
      </motion.div>
      <TimelineRail entries={entries} />
    </SectionShell>
  );
});
CareerJourney.displayName = 'CareerJourney';

// ============================================
// SECTION 6: FINAL STATEMENT + CTA
// ============================================
const FinalCTA = memo(({ isDark }: { isDark: boolean }) => (
  <SectionShell id="connect" padding="xl" className={`${t(isDark, '', 'bg-[#fafaf9]')} text-center`}>
    <div className="max-w-3xl mx-auto">
      <motion.blockquote initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: EASE }}>
        <p className={`font-display text-2xl sm:text-3xl lg:text-4xl italic leading-snug ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
          "Excellence isn't a moment—
          <br />
          it's a <span className="text-alchemy-red">system</span>."
        </p>
      </motion.blockquote>

      <motion.p className={`font-mono text-xs tracking-wider mt-8 ${t(isDark, 'text-porcelain/40', 'text-neutral-400')}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
        — Eva Doshi, Co-Founder
      </motion.p>

      <motion.div className="mt-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.6 }}>
        <MagneticCTA href="/contact" variant="primary" size="lg">
          Let's Collaborate
        </MagneticCTA>
      </motion.div>

      {/* Social links */}
      <motion.div className="flex justify-center gap-6 mt-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
        <a href={`mailto:${evaData.contact.email}`} className={`p-3 rounded-full ${t(isDark, 'hover:bg-white/5', 'hover:bg-black/5')} transition-colors`}>
          <Mail className={`w-5 h-5 ${t(isDark, 'text-porcelain/50', 'text-neutral-500')}`} />
        </a>
        <a href={evaData.contact.linkedin} target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full ${t(isDark, 'hover:bg-white/5', 'hover:bg-black/5')} transition-colors`}>
          <Linkedin className={`w-5 h-5 ${t(isDark, 'text-porcelain/50', 'text-neutral-500')}`} />
        </a>
      </motion.div>

      <motion.div className={`flex justify-center gap-4 sm:gap-6 font-mono text-[10px] sm:text-xs uppercase tracking-wider mt-10 ${t(isDark, 'text-porcelain/30', 'text-neutral-400')}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
        <span>NDA Available</span><span>·</span><span>24h Reply</span><span>·</span><span>Free First Call</span>
      </motion.div>

      {/* Back to About */}
      <motion.div className="mt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}>
        <Link to="/about" className={`font-mono text-xs ${t(isDark, 'text-porcelain/30 hover:text-porcelain/60', 'text-neutral-400 hover:text-neutral-600')} transition-colors`}>
          ← Back to About
        </Link>
      </motion.div>
    </div>
  </SectionShell>
));
FinalCTA.displayName = 'FinalCTA';

// ============================================
// SCROLL PROGRESS
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
    <div className="fixed bottom-0 left-0 right-0 z-40 h-0.5">
      <div className="h-full bg-gradient-to-r from-alchemy-pink to-alchemy-red" style={{ width: `${progress * 100}%`, transition: 'width 0.1s linear' }} />
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
      <PortfolioNav isDark={isDark} toggleTheme={toggleTheme} />
      <HeroSection isDark={isDark} />
      <CreativePhilosophy isDark={isDark} />
      <VentureContributions isDark={isDark} />
      <ClientShowcase isDark={isDark} />
      <CareerJourney isDark={isDark} />
      <FinalCTA isDark={isDark} />
      <ScrollProgress />
    </div>
  );
};

export default EvaPortfolio;
