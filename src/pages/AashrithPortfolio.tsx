import { memo, useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sun, Moon, Menu, X, Linkedin, Instagram, Youtube, ExternalLink, Film, Music, Sparkles, Users, Shield, Clock, Phone } from 'lucide-react';
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
import { PortfolioFooter } from '@/components/portfolio/PortfolioFooter';
import { BlueprintGrid, NoiseTexture } from '@/components/effects';
import { SequentianBackground } from '@/components/SequentianBackground';
import { useIsMobile } from '@/hooks/use-mobile';
import aashrithHeroBg from '@/assets/aashrith-hero-bg.mp4';
import aetherBento from '@/assets/aether-bento.png';
import genesisBento from '@/assets/genesis-bento.png';
import diorBento from '@/assets/dior-bento.png';
import oakleyBento from '@/assets/oakley-bento.png';

const EASE = [0.22, 1, 0.36, 1] as const;
const t = (isDark: boolean, dark: string, light: string) => isDark ? dark : light;

// Social links
const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/aashrithgade', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/aashrithzz/', label: 'Instagram' },
  { icon: Instagram, href: 'https://www.instagram.com/asharchiveszz/', label: 'AshArchives' },
  { icon: Youtube, href: 'https://www.youtube.com/@aashrithxd8587', label: 'YouTube' },
];

// Footer config
const portfolioFooterLinks = [
  { label: 'Ventures', href: '#ventures' },
  { label: 'Work', href: '#work' },
  { label: 'Timeline', href: '#journey' },
  { label: 'Connect', href: '#connect' },
];
const ventureFooterLinks = [
  { label: 'Brand Alchemy', href: '#ventures', external: false },
  { label: 'Ashzz.ai', href: '#ventures', external: false },
  { label: 'Alchemy Labs', href: '#ventures', external: false },
];
const connectFooterLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aashrithgade', external: true },
  { label: 'Instagram (@aashrithzz)', href: 'https://www.instagram.com/aashrithzz/', external: true },
  { label: 'AshArchives (@asharchiveszz)', href: 'https://www.instagram.com/asharchiveszz/', external: true },
  { label: 'YouTube', href: 'https://www.youtube.com/@aashrithxd8587', external: true },
];

// Creative projects data
const creativeProjects = [
  {
    id: 'aether-rituals',
    num: '01',
    title: 'Aether Rituals',
    category: 'Luxury Lifestyle Brand',
    description: 'A transcendent luxury brand architecture blending ancient rituals with modern minimalism. The system speaks to transformation: the pause that reshapes reality.',
    image: aetherBento,
    tags: ['Brand Architecture', 'Product Design', 'Luxury Lifestyle'],
    year: '2024',
    sequentianVariant: 4 as const,
  },
  {
    id: 'genesis',
    num: '02',
    title: 'Genesis',
    category: 'Streetwear Brand',
    description: 'Apocalyptic streetwear for the AI generation. A monochromatic visual system built on contrast, mystery, and dystopian aesthetics—clothing for those who build the future.',
    image: genesisBento,
    tags: ['Streetwear', 'Branding', 'AI-Generated Visuals'],
    year: '2024',
    sequentianVariant: 1 as const,
  },
  {
    id: 'dior-campaign',
    num: '03',
    title: 'Dior: Dual Fragrance',
    category: 'Conceptual Fragrance Campaign',
    description: "AI-generated cinematic campaigns for two iconic fragrances. One speaks in gold and amber light, the other in purple and shadow. Two color stories, one visual language.",
    image: diorBento,
    tags: ['Fragrance', 'Campaign Creative', 'AI Direction'],
    year: '2024',
    sequentianVariant: 5 as const,
  },
  {
    id: 'oakley-showcase',
    num: '04',
    title: 'Oakley: Equipment Redefined',
    category: 'Athletic Brand Showcase',
    description: 'Bold visual system for performance eyewear. AI-powered product photography pushing the boundaries of athletic brand aesthetics. Built for speed, precision, and impact.',
    image: oakleyBento,
    tags: ['Athletic', 'Product Photography', 'AI Asset Generation'],
    year: '2024',
    sequentianVariant: 3 as const,
  },
];

// ============================================
// GRADIENT TRANSITION — seamless section blends
// ============================================
const GradientTransition = ({ isDark, height = 'h-32 sm:h-48' }: { isDark: boolean; height?: string }) => (
  <div className={`${height} relative pointer-events-none`}>
    <div className={`absolute inset-0 bg-gradient-to-b ${t(isDark, 'from-transparent via-alchemy-black/50 to-transparent', 'from-transparent via-neutral-100/50 to-transparent')}`} />
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
// NAVIGATION
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
    { label: 'Ventures', href: '#ventures' },
    { label: 'Work', href: '#work' },
    { label: 'Timeline', href: '#journey' },
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
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}
            style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.2) 0%, rgba(220,38,38,0.05) 100%)', border: '1px solid rgba(220,38,38,0.3)' }}
          >
            AG
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className={`font-body text-sm ${t(isDark, 'text-porcelain/60 hover:text-porcelain', 'text-neutral-600 hover:text-neutral-900')} transition-colors relative group`}>
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-alchemy-red group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="flex items-center ml-auto md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={`p-2 rounded-full ${t(isDark, 'hover:bg-white/5', 'hover:bg-black/5')} transition-colors`}>
              {isOpen ? <X className={`w-5 h-5 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`} /> : <Menu className={`w-5 h-5 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`} />}
            </button>
          </div>
        </div>
      </motion.nav>

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
                    className={`font-body text-3xl font-bold ${t(isDark, 'text-porcelain', 'text-neutral-900')} hover:text-alchemy-red transition-colors`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease: EASE }}
                  >
                    {link.label}
                  </motion.a>
                ))}

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4, ease: EASE }}>
                  <Link to="/about" onClick={() => setIsOpen(false)} className={`inline-flex items-center gap-2 font-mono text-sm ${t(isDark, 'text-porcelain/50', 'text-neutral-500')} hover:text-alchemy-red transition-colors mt-4`}>
                    <ArrowLeft className="w-4 h-4" />
                    Alchemy Labs
                  </Link>
                </motion.div>
              </div>

              <motion.div
                className={`flex items-center gap-4 pt-6 border-t ${t(isDark, 'border-porcelain/10', 'border-neutral-200')}`}
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
// HERO — "The Arrival"
// ============================================
const HeroSection = memo(({ isDark }: { isDark: boolean }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={heroRef} className={`relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden ${t(isDark, 'bg-alchemy-black', 'bg-[#fafaf9]')}`}>
      <div className={`absolute inset-0 ${t(isDark, 'bg-alchemy-black', 'bg-[#fafaf9]')}`} />

      <motion.video
        src={aashrithHeroBg}
        autoPlay muted loop playsInline preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ scale: videoScale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isDark ? 0.25 : 0.35 }}
        transition={{ duration: 1.2, ease: EASE }}
      />

      {!isDark && <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.05)' }} />}
      <div className="absolute inset-0" style={{ background: t(isDark, 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(10,10,10,0.7) 100%)', 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(250,250,249,0.85) 100%)') }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 70%, rgba(220,38,38,0.06) 0%, transparent 70%)' }} />

      <SequentianBackground variant={1} opacity={isDark ? 0.10 : 0.06} blur={0} glow={false} />
      <BlueprintGrid opacity={0.02} />
      <NoiseTexture opacity={0.03} />
      <ParticleField count={35} color="rgba(220,38,38,0.3)" opacity={0.4} />
      <ParticleField count={15} color={t(isDark, 'rgba(245,245,244,0.15)', 'rgba(0,0,0,0.08)')} opacity={0.2} speed={0.7} />

      <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${t(isDark, 'from-alchemy-black', 'from-[#fafaf9]')} to-transparent z-[1]`} />
      <div className={`absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t ${t(isDark, 'from-alchemy-black', 'from-[#fafaf9]')} to-transparent z-[1]`} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <span className={`font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] ${t(isDark, 'text-alchemy-red/70', 'text-alchemy-red/60')}`}>
            FOUNDER · BRAND ARCHITECT · CREATIVE DIRECTOR
          </span>
        </motion.div>

        <motion.h1
          className="mt-8 mb-6"
          initial={{ opacity: 0, filter: 'blur(20px)', y: 40 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
        >
          <span className={`block font-body font-black text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] uppercase leading-[0.85] tracking-[-0.03em] ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
            AASHRITH
          </span>
          <span className="block font-body font-black text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] uppercase leading-[0.85] tracking-[-0.03em] bg-gradient-to-r from-alchemy-red via-alchemy-pink to-alchemy-red bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
            GADE
          </span>
        </motion.h1>

        {/* Static powerful tagline replacing AnimatedCapabilities */}
        <motion.p
          className={`font-body text-base sm:text-lg lg:text-xl max-w-2xl mx-auto ${t(isDark, 'text-porcelain/50', 'text-neutral-500')}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          I don't design brands. I architect the systems that make them <span className="text-alchemy-red italic">inevitable.</span>
        </motion.p>

        {/* Floating venture labels with horizontal drift */}
        <motion.div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}>
          <span className={`font-mono text-xs sm:text-sm ${t(isDark, 'text-porcelain/40', 'text-neutral-400')}`}>Founder of</span>
          {['Brand Alchemy', 'Ashzz.ai', 'Alchemy Labs'].map((name, i) => (
            <span key={name} className="flex items-center gap-2 sm:gap-3">
              <motion.span
                className="font-body font-bold text-xs sm:text-sm bg-gradient-to-r from-alchemy-red to-alchemy-pink bg-clip-text text-transparent"
                style={{ filter: 'drop-shadow(0 0 6px rgba(220,38,38,0.3))' }}
                animate={{ x: [0, 2, 0, -2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
              >
                {name}
              </motion.span>
              {i < 2 && <span className={`${t(isDark, 'text-porcelain/20', 'text-neutral-300')}`}>·</span>}
            </span>
          ))}
        </motion.div>

        <motion.div className={`flex justify-center gap-6 font-mono text-[10px] sm:text-xs ${t(isDark, 'text-porcelain/30', 'text-neutral-400')} mt-5`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
          <span>Mumbai, IN</span><span>·</span><span>NMIMS '26</span><span>·</span><span>Building in public</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
        <motion.div
          className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[9px] uppercase tracking-widest"
          style={{
            background: t(isDark, 'rgba(220,38,38,0.08)', 'rgba(220,38,38,0.06)'),
            border: '1px solid rgba(220,38,38,0.2)',
            color: t(isDark, 'rgba(220,38,38,0.8)', 'rgba(220,38,38,0.7)'),
          }}
          animate={{
            boxShadow: [
              '0 0 12px rgba(220,38,38,0.15)',
              '0 0 24px rgba(220,38,38,0.3)',
              '0 0 12px rgba(220,38,38,0.15)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div className="w-px h-3 bg-alchemy-red/60" animate={{ y: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          Scroll to explore
        </motion.div>
      </motion.div>
    </section>
  );
});
HeroSection.displayName = 'HeroSection';

// ============================================
// VENTURE ECOSYSTEM — "The System"
// ============================================
const VentureEcosystem = memo(({ isDark }: { isDark: boolean }) => {
  const ventures = aashrithData.ventures || [];
  const ventureDescriptions = [
    'Thought leadership platform. Where brand strategy meets systems thinking.',
    'AI-native creative community. 3.8K+ builders experimenting at the frontier.',
    'Founder-led studio. AI-powered brand systems for ventures that think long-term.',
  ];
  const ventureConfig = [
    { venture: ventures[0], num: '01', speed: 'slow' as const, direction: 'left' as const, gradient: 'rgba(220,38,38,0.06)', monogram: 'BA' },
    { venture: ventures[1], num: '02', speed: 'medium' as const, direction: 'right' as const, gradient: 'rgba(255,255,255,0.04)', monogram: 'AZ' },
    { venture: ventures[2], num: '03', speed: 'slow' as const, direction: 'left' as const, gradient: 'rgba(220,38,38,0.04)', monogram: 'AL' },
  ];

  const createTiles = (gradientTint: string, monogram: string) =>
    Array.from({ length: 10 }, (_, i) => (
      <motion.div
        key={i}
        className="flex-shrink-0 w-48 sm:w-56 rounded-xl overflow-hidden relative group cursor-pointer"
        style={{
          aspectRatio: '4/3',
          border: `1px solid ${t(isDark, 'rgba(255,255,255,0.08)', 'rgba(0,0,0,0.06)')}`,
          background: `linear-gradient(135deg, ${gradientTint} 0%, ${t(isDark, 'rgba(255,255,255,0.02)', 'rgba(0,0,0,0.01)')} 100%)`,
          backdropFilter: 'blur(8px)',
        }}
        whileHover={{
          scale: 1.05,
          rotate: 1,
          borderColor: 'rgba(220,38,38,0.4)',
          boxShadow: '0 0 30px rgba(220,38,38,0.15)',
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
          <motion.div
            className="h-full w-1/3"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
            animate={{ x: ['-100%', '400%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
          />
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <span className={`font-mono text-lg font-bold ${t(isDark, 'text-porcelain/10', 'text-neutral-200')}`}>{monogram}</span>
        </div>
      </motion.div>
    ));

  return (
    <SectionShell id="ventures" padding="xl" maxWidth="full" className={`relative ${t(isDark, '', 'bg-[#fafaf9]')}`}>
      <SequentianBackground variant={2} opacity={isDark ? 0.10 : 0.06} glow={false} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(220,38,38,0.04) 0%, transparent 70%)' }} />
      <ParticleField count={10} color="rgba(220,38,38,0.2)" opacity={0.15} />

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, ease: EASE }}>
            <EyebrowLabel className="mb-4">VENTURES & INTELLECTUAL PROPERTY</EyebrowLabel>
            <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl ${t(isDark, 'text-porcelain', 'text-neutral-900')} mb-3`}>
              Three ventures. <span className="text-alchemy-red italic">One operating system.</span>
            </h2>
            <p className={`font-body text-base sm:text-lg max-w-2xl ${t(isDark, 'text-porcelain/50', 'text-neutral-500')}`}>
              Each venture is a living laboratory — proof that the frameworks work before they reach a client.
            </p>
          </motion.div>
        </div>

        <div className="space-y-20">
          {ventureConfig.map(({ venture, num, speed, direction, gradient, monogram }, idx) => venture && (
            <motion.div
              key={venture.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: idx * 0.3, duration: 0.6 }}
            >
              <motion.div
                className="max-w-6xl mx-auto px-4 sm:px-6 mb-6 flex items-center gap-4"
                style={{
                  borderTop: idx > 0 ? `1px solid ${t(isDark, 'rgba(255,255,255,0.04)', 'rgba(0,0,0,0.04)')}` : 'none',
                  paddingTop: idx > 0 ? '2rem' : '0',
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <span className="font-mono text-2xl sm:text-3xl font-bold text-alchemy-red/30">{num}</span>
                <div>
                  <h3 className={`font-body font-bold text-lg sm:text-xl ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>{venture.name}</h3>
                  <p className={`font-body text-xs sm:text-sm ${t(isDark, 'text-porcelain/45', 'text-neutral-500')} mt-1 max-w-md`}>
                    {ventureDescriptions[idx]}
                  </p>
                </div>
              </motion.div>
              <MarqueeRow speed={speed} direction={direction} gap={16}>
                {createTiles(gradient, monogram)}
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
// CREATIVE PROJECTS — "The Proof" — Immersive Sticky Scroll
// ============================================
const ImmersiveProject = memo(({ project, index, isDark, isMobile }: { project: typeof creativeProjects[0]; index: number; isDark: boolean; isMobile: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <div
      ref={ref}
      className={`${isMobile ? 'relative min-h-[75vh]' : 'sticky top-0 h-screen'} w-full overflow-hidden`}
      style={{ zIndex: 10 + index }}
    >
      {/* Sequentian atmospheric layer */}
      <SequentianBackground variant={project.sequentianVariant} opacity={isDark ? 0.08 : 0.05} glow={false} />

      {/* Full-bleed background image */}
      <motion.img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={isMobile ? {} : { y, scale: imgScale, willChange: 'transform' }}
        loading={index === 0 ? 'eager' : 'lazy'}
        decoding="async"
      />

      {/* Dark gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* Ghost number */}
      <div className="absolute top-8 right-8 sm:top-12 sm:right-16 pointer-events-none select-none">
        <span className="font-mono text-[15vw] sm:text-[20vw] font-black text-white/[0.03] leading-none block">
          {project.num}
        </span>
      </div>

      {/* Editorial text overlay — bottom left */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 lg:p-20 z-10">
        <div className="max-w-2xl">
          {/* Conceptual label */}
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/40">
              {project.category}
            </span>
            <span className="font-mono text-[9px] px-2.5 py-1 rounded-full text-white/35 uppercase tracking-wider"
              style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            >
              Conceptual Exploration
            </span>
          </motion.div>

          {/* Title with blur-in */}
          <motion.h3
            className="font-display text-3xl sm:text-5xl lg:text-7xl text-white mb-4 leading-[0.95]"
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="font-body text-sm sm:text-base text-white/60 max-w-lg leading-relaxed mb-5"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          >
            {project.description}
          </motion.p>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-2 mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          >
            {project.tags.map((tag, j) => (
              <motion.span
                key={tag}
                className="font-mono text-[10px] px-3 py-1.5 rounded-full text-white/60"
                style={{
                  background: 'rgba(220,38,38,0.12)',
                  border: '1px solid rgba(220,38,38,0.2)',
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.35 + j * 0.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Year */}
          <motion.span
            className="font-mono text-[10px] text-white/25 tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {project.year}
          </motion.span>
        </div>
      </div>
    </div>
  );
});
ImmersiveProject.displayName = 'ImmersiveProject';

const CreativeProjectsSection = memo(({ isDark }: { isDark: boolean }) => {
  const isMobile = useIsMobile();

  return (
    <section id="work" className="relative">
      {/* Section intro */}
      <div className={`${t(isDark, 'bg-alchemy-black', 'bg-[#fafaf9]')} relative z-20`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-32 pb-12 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center"
          >
            <EyebrowLabel className="mb-4">SELECTED CREATIVE WORK</EyebrowLabel>
            <h2 className={`font-display text-3xl sm:text-4xl lg:text-6xl ${t(isDark, 'text-porcelain', 'text-neutral-900')} mb-4`}>
              The proof is in<br />
              <span className="text-alchemy-red italic">the systems.</span>
            </h2>
            <p className={`font-body text-sm sm:text-base max-w-xl mx-auto ${t(isDark, 'text-porcelain/45', 'text-neutral-500')}`}>
              Four AI-native brand explorations. Each built on strategic architecture, not surface aesthetics.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Immersive sticky-stacked projects (desktop) / simple stack (mobile) */}
      <div style={isMobile ? {} : { height: `${creativeProjects.length * 100}vh` }}>
        {creativeProjects.map((project, i) => (
          <ImmersiveProject key={project.id} project={project} index={i} isDark={isDark} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
});
CreativeProjectsSection.displayName = 'CreativeProjectsSection';

// ============================================
// CAREER TIMELINE — "The Arc"
// ============================================
const TimelineCard = memo(({ exp, i, isDark }: { exp: typeof aashrithData.experience[0]; i: number; isDark: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.35, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);

  return (
    <motion.div
      ref={ref}
      className="relative pl-12 sm:pl-16"
      style={{ opacity, scale }}
    >
      {/* Pulsing timeline dot */}
      <div className="absolute left-[11px] sm:left-[19px] top-6">
        <div className="w-2.5 h-2.5 rounded-full bg-alchemy-red/60 border-2 z-10 relative" style={{ borderColor: t(isDark, '#0a0a0a', '#fafaf9') }} />
        <motion.div
          className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-alchemy-red/30"
          animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        />
      </div>

      <div
        className="rounded-2xl p-5 sm:p-6 mb-2"
        style={{
          background: t(isDark, 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.005) 100%)'),
          border: `1px solid ${t(isDark, 'rgba(255,255,255,0.06)', 'rgba(0,0,0,0.06)')}`,
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className={`font-body font-bold text-base sm:text-lg ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>{exp.company}</h3>
            <p className="font-mono text-xs text-alchemy-red/70 tracking-wider mt-0.5">{exp.role}</p>
          </div>
          <span className={`font-mono text-[10px] sm:text-xs ${t(isDark, 'text-porcelain/30', 'text-neutral-400')} whitespace-nowrap`}>{exp.dates}</span>
        </div>

        <ul className="space-y-1.5 mb-4">
          {exp.achievements.map((a, j) => (
            <li key={j} className={`font-body text-xs sm:text-sm ${t(isDark, 'text-porcelain/50', 'text-neutral-500')} flex items-start gap-2`}>
              <span className="text-alchemy-red/40 mt-1.5 text-[6px]">●</span>
              {a}
            </li>
          ))}
        </ul>

        {exp.revenueSignal && (
          <p className={`font-mono text-[10px] ${t(isDark, 'text-alchemy-red/50', 'text-alchemy-red/60')} mb-3`}>{exp.revenueSignal}</p>
        )}

        {exp.metrics && (
          <div className="flex flex-wrap gap-2">
            {exp.metrics.map((m) => (
              <div
                key={m.label}
                className="px-3 py-1.5 rounded-full font-mono text-[10px] relative overflow-hidden group/pill"
                style={{
                  background: t(isDark, 'rgba(220,38,38,0.08)', 'rgba(220,38,38,0.06)'),
                  border: `1px solid ${t(isDark, 'rgba(220,38,38,0.15)', 'rgba(220,38,38,0.12)')}`,
                  color: t(isDark, 'rgba(220,38,38,0.7)', 'rgba(220,38,38,0.8)'),
                }}
              >
                <div
                  className="absolute inset-0 -translate-x-full group-hover/pill:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
                />
                <span className="relative z-10">
                  <span className="opacity-60">{m.label}:</span> {m.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
});
TimelineCard.displayName = 'TimelineCard';

const CareerTimeline = memo(({ isDark }: { isDark: boolean }) => {
  const entries = aashrithData.experience;
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start end', 'end start'] });

  return (
    <SectionShell id="journey" padding="xl" className={`relative ${t(isDark, '', 'bg-[#fafaf9]')}`}>
      <SequentianBackground variant={5} opacity={isDark ? 0.10 : 0.06} glow={false} />
      <div className="relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, ease: EASE }} className="mb-16">
          <EyebrowLabel className="mb-4">CAREER TIMELINE</EyebrowLabel>
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
            The arc of <span className="text-alchemy-red italic">intent.</span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto" ref={timelineRef}>
          {/* Animated timeline gradient line */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px overflow-hidden">
            <motion.div
              className="w-full h-[200%]"
              style={{
                background: 'linear-gradient(180deg, rgba(220,38,38,0.5) 0%, rgba(220,38,38,0.1) 30%, rgba(220,38,38,0.4) 50%, rgba(220,38,38,0.05) 100%)',
                y: useTransform(scrollYProgress, [0, 1], ['0%', '-50%']),
              }}
            />
          </div>

          <div className="space-y-8">
            {entries.map((exp, i) => (
              <TimelineCard key={`${exp.company}-${i}`} exp={exp} i={i} isDark={isDark} />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
});
CareerTimeline.displayName = 'CareerTimeline';

// ============================================
// PHILOSOPHY + CTA — "The Invitation"
// ============================================
const creativePursuits = [
  { icon: Film, title: 'Film', desc: 'Visual storytelling' },
  { icon: Music, title: 'Music', desc: 'Sound design' },
  { icon: Sparkles, title: 'AI Art', desc: 'Generative media' },
  { icon: Users, title: 'Community', desc: '3.8K+ builders' },
];

const WordRevealQuote = memo(({ isDark }: { isDark: boolean }) => {
  const fullSentence = "The best brands aren't designed — they're engineered to feel inevitable.".split(' ');
  const highlightSet = new Set(['engineered', 'inevitable.']);

  return (
    <motion.blockquote
      className={`font-display text-xl sm:text-2xl lg:text-3xl italic leading-snug ${t(isDark, 'text-porcelain/80', 'text-neutral-800')}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <span>"</span>
      {fullSentence.map((word, i) => {
        const isHighlight = highlightSet.has(word);
        return (
          <motion.span
            key={i}
            className={isHighlight ? 'text-alchemy-red' : ''}
            style={isHighlight ? { textShadow: '0 0 20px rgba(220,38,38,0.4)' } : {}}
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.3, delay: i * 0.03, ease: EASE }}
          >
            {word}{' '}
          </motion.span>
        );
      })}
      <span>"</span>
    </motion.blockquote>
  );
});
WordRevealQuote.displayName = 'WordRevealQuote';

const PhilosophyCTA = memo(({ isDark }: { isDark: boolean }) => (
  <SectionShell id="connect" padding="xl" className={`relative ${t(isDark, '', 'bg-[#fafaf9]')} text-center`}>
    <SequentianBackground variant={4} opacity={isDark ? 0.18 : 0.10} glow={false} />

    <div className="relative z-10 max-w-3xl mx-auto">
      <WordRevealQuote isDark={isDark} />

      <motion.p className={`font-mono text-xs tracking-wider mt-8 ${t(isDark, 'text-porcelain/30', 'text-neutral-400')}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
        — Aashrith Gade
      </motion.p>

      {/* Beyond the work — compact pills */}
      <motion.div
        className={`flex flex-wrap justify-center gap-3 mt-14 mb-14`}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {creativePursuits.map((item, i) => (
          <div
            key={item.title}
            className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[10px] sm:text-xs"
            style={{
              background: t(isDark, 'rgba(255,255,255,0.03)', 'rgba(0,0,0,0.03)'),
              border: `1px solid ${t(isDark, 'rgba(255,255,255,0.06)', 'rgba(0,0,0,0.06)')}`,
              color: t(isDark, 'rgba(245,245,244,0.5)', 'rgba(64,64,64,0.6)'),
            }}
          >
            <item.icon className="w-3 h-3 text-alchemy-red/50" />
            <span>{item.title}</span>
          </div>
        ))}
      </motion.div>

      {/* CTA with radial red pulse */}
      <motion.div className="flex flex-col items-center justify-center gap-4 relative" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.6 }}>
        <motion.div
          className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-64 h-32 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(220,38,38,0.15) 0%, transparent 70%)' }} />
        </motion.div>

        <MagneticCTA href="/contact" variant="primary" size="lg">
          Let's Build Something Inevitable
        </MagneticCTA>
      </motion.div>

      {/* Trust signals */}
      <motion.div className={`flex justify-center gap-4 sm:gap-6 font-mono text-[10px] sm:text-xs uppercase tracking-wider mt-10 ${t(isDark, 'text-porcelain/30', 'text-neutral-400')}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
        <span className="flex items-center gap-1.5"><Shield className="w-3 h-3" />NDA Available</span>
        <span>·</span>
        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />24h Reply</span>
        <span>·</span>
        <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" />Free First Call</span>
      </motion.div>

      {/* Featured writing micro-row */}
      {thoughtLeadershipEntries.length > 0 && (
        <motion.div
          className="mt-12 pt-8"
          style={{ borderTop: `1px solid ${t(isDark, 'rgba(255,255,255,0.06)', 'rgba(0,0,0,0.06)')}` }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <p className={`font-mono text-[10px] uppercase tracking-widest mb-4 ${t(isDark, 'text-porcelain/25', 'text-neutral-400')}`}>Featured Writing</p>
          <div className="flex flex-wrap justify-center gap-3">
            {thoughtLeadershipEntries.slice(0, 3).map((entry) => (
              <a
                key={entry.id}
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 font-body text-xs ${t(isDark, 'text-porcelain/40 hover:text-porcelain/70', 'text-neutral-500 hover:text-neutral-700')} transition-colors`}
              >
                {entry.type === 'instagram' ? <Instagram className="w-3 h-3" /> : <Linkedin className="w-3 h-3" />}
                <span className="line-clamp-1 max-w-[180px]">{entry.title}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-40" />
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  </SectionShell>
));
PhilosophyCTA.displayName = 'PhilosophyCTA';

// ============================================
// SCROLL PROGRESS
// ============================================
const ScrollProgressBar = memo(() => {
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
        className="h-full bg-gradient-to-r from-alchemy-red to-alchemy-pink"
        style={{
          width: `${progress * 100}%`,
          transition: 'width 0.1s linear',
          boxShadow: '0 0 8px rgba(220,38,38,0.5), 0 0 16px rgba(220,38,38,0.25)',
        }}
      />
    </div>
  );
});
ScrollProgressBar.displayName = 'ScrollProgressBar';

// ============================================
// MAIN PAGE — Continuous Narrative Flow
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
      <ScrollProgressBar />
      <FixedControls isDark={isDark} toggleTheme={toggleTheme} />
      <PortfolioNav isDark={isDark} />

      <HeroSection isDark={isDark} />
      <GradientTransition isDark={isDark} />
      <VentureEcosystem isDark={isDark} />
      <GradientTransition isDark={isDark} />
      <CreativeProjectsSection isDark={isDark} />
      <GradientTransition isDark={isDark} />
      <CareerTimeline isDark={isDark} />
      <GradientTransition isDark={isDark} />
      <PhilosophyCTA isDark={isDark} />
      <GradientTransition isDark={isDark} height="h-16 sm:h-24" />

      <PortfolioFooter
        isDark={isDark}
        founderName="Aashrith Gade"
        monogram="AG"
        copyright="Designed and built by Aashrith Gade"
        signoff="Always building. Always learning."
        portfolioLinks={portfolioFooterLinks}
        ventureLinks={ventureFooterLinks}
        connectLinks={connectFooterLinks}
      />
    </div>
  );
};

export default AashrithPortfolio;
