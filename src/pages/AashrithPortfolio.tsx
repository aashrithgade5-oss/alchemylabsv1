import { memo, useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sun, Moon, Menu, X, Download, Linkedin, Instagram, Youtube, ExternalLink, Film, Music, Sparkles, Users, Shield, Clock, Phone } from 'lucide-react';
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
import { BlueprintGrid, NoiseTexture, AnimatedCapabilities } from '@/components/effects';
import { SequentianBackground } from '@/components/SequentianBackground';
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
  { label: 'Insights', href: '#insights' },
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
    description: 'A transcendent luxury brand architecture blending ancient rituals with modern minimalism. The color palette—Aether Black, Gold, Ivory, and Gray—creates a system of refined elegance. Each element speaks to transformation: the pause that reshapes reality.',
    image: aetherBento,
    tags: ['Brand Architecture', 'Product Design', 'Luxury Lifestyle'],
    year: '2024',
  },
  {
    id: 'genesis',
    num: '02',
    title: 'Genesis',
    category: 'Streetwear Brand',
    description: 'Apocalyptic streetwear for the AI generation. Genesis is a monochromatic visual system built on contrast, mystery, and dystopian aesthetics. The brand exists at the intersection of technology and rebellion—clothing for those who build the future.',
    image: genesisBento,
    tags: ['Streetwear', 'Branding', 'AI-Generated Visuals'],
    year: '2024',
  },
  {
    id: 'dior-campaign',
    num: '03',
    title: 'Dior: Dual Fragrance',
    category: 'Conceptual Fragrance Campaign',
    description: "AI-generated cinematic campaigns for two iconic fragrances—J'adore and Poison. One speaks in gold and amber light, the other in purple and shadow. Two color stories, one visual language: the duality of desire.",
    image: diorBento,
    tags: ['Fragrance', 'Campaign Creative', 'AI Direction'],
    year: '2024',
  },
  {
    id: 'oakley-showcase',
    num: '04',
    title: 'Oakley: Equipment Redefined',
    category: 'Athletic Brand Showcase',
    description: 'Bold orange-red visual system for performance eyewear. AI-powered product photography pushing the boundaries of athletic brand aesthetics. Every frame is built for speed, precision, and satisfaction—equipment for our world.',
    image: oakleyBento,
    tags: ['Athletic', 'Product Photography', 'AI Asset Generation'],
    year: '2024',
  },
];

// Section divider with red dot
const SectionDivider = ({ isDark }: { isDark: boolean }) => (
  <div className="h-16 w-full relative">
    <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${t(isDark, 'via-alchemy-black/30', 'via-neutral-100')} to-transparent`} />
  </div>
);

// Project divider between creative projects
const ProjectDivider = ({ isDark }: { isDark: boolean }) => (
  <div className="flex items-center justify-center py-8 sm:py-12">
    <div className={`flex-1 h-px ${t(isDark, 'bg-gradient-to-r from-transparent via-porcelain/8 to-transparent', 'bg-gradient-to-r from-transparent via-neutral-200 to-transparent')}`} />
    <div className="w-2 h-2 rounded-full bg-alchemy-red/50 mx-6 animate-pulse" />
    <div className={`flex-1 h-px ${t(isDark, 'bg-gradient-to-r from-transparent via-porcelain/8 to-transparent', 'bg-gradient-to-r from-transparent via-neutral-200 to-transparent')}`} />
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
                    Back to Alchemy Labs
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
// HERO — Cinematic with perspective tilt + enhanced blur reveal + floating labels
// ============================================
const HeroSection = memo(({ isDark }: { isDark: boolean }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const perspectiveTilt = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

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

      <SequentianBackground variant={1} opacity={isDark ? 0.12 : 0.07} blur={0} glow={false} />
      <BlueprintGrid opacity={0.02} />
      <NoiseTexture opacity={0.03} />
      <ParticleField count={35} color="rgba(220,38,38,0.3)" opacity={0.4} />
      <ParticleField count={15} color={t(isDark, 'rgba(245,245,244,0.15)', 'rgba(0,0,0,0.08)')} opacity={0.2} speed={0.7} />

      <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${t(isDark, 'from-alchemy-black', 'from-[#fafaf9]')} to-transparent z-[1]`} />
      <div className={`absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t ${t(isDark, 'from-alchemy-black', 'from-[#fafaf9]')} to-transparent z-[1]`} />

      {/* Content with perspective tilt */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center"
        style={{
          perspective: 1000,
          rotateX: perspectiveTilt,
        }}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <span className={`font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] ${t(isDark, 'text-alchemy-red/70', 'text-alchemy-red/60')}`}>
            Creative Director · Brand Architect · AI-Native
          </span>
        </motion.div>

        {/* Enhanced blur reveal: 20px → 0 */}
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

        <motion.div className="flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <AnimatedCapabilities isDark={isDark} />
        </motion.div>

        {/* Floating venture labels with horizontal drift */}
        <motion.div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}>
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
          <span>Mumbai, IN</span><span>·</span><span>EST. 2024</span><span>·</span><span>50+ Projects</span>
        </motion.div>
      </motion.div>

      {/* Upgraded scroll indicator — capsule pill with "Explore" */}
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
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div className="w-px h-3 bg-alchemy-red/60" animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
          Explore
        </motion.div>
      </motion.div>
    </section>
  );
});
HeroSection.displayName = 'HeroSection';

// ============================================
// VENTURE ECOSYSTEM — Glass tiles with shimmer + counter animation
// ============================================
const AnimatedCounter = ({ target, suffix = '' }: { target: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!ref.current || triggered) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTriggered(true);
        const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''));
        const duration = 1500;
        const start = performance.now();
        const animate = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(numericTarget * eased));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, triggered]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const VentureEcosystem = memo(({ isDark }: { isDark: boolean }) => {
  const ventures = aashrithData.ventures || [];
  const ventureConfig = [
    { venture: ventures[0], num: '01', speed: 'slow' as const, direction: 'left' as const, gradient: 'rgba(220,38,38,0.06)', monogram: 'BA' },
    { venture: ventures[1], num: '02', speed: 'medium' as const, direction: 'right' as const, gradient: 'rgba(255,255,255,0.04)', monogram: 'AZ' },
    { venture: ventures[2], num: '03', speed: 'slow' as const, direction: 'left' as const, gradient: 'rgba(220,38,38,0.04)', monogram: 'AL' },
  ];

  // Styled glass tiles instead of placeholders
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
        {/* Top shimmer line */}
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
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(220,38,38,0.04) 0%, transparent 70%)' }} />
      <ParticleField count={10} color="rgba(220,38,38,0.2)" opacity={0.15} />

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, ease: EASE }}>
            <EyebrowLabel className="mb-4">VENTURES & INTELLECTUAL PROPERTY</EyebrowLabel>
            <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl ${t(isDark, 'text-porcelain', 'text-neutral-900')} mb-3`}>
              Three systems. <span className="text-alchemy-red italic">One vision.</span>
            </h2>
            <p className={`font-body text-base sm:text-lg max-w-2xl ${t(isDark, 'text-porcelain/50', 'text-neutral-500')}`}>
              Live portfolio. Proof-of-work. Building in public.
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
                  <p className={`font-mono text-[10px] sm:text-xs tracking-wider ${t(isDark, 'text-porcelain/40', 'text-neutral-500')}`}>
                    {venture.type}
                    {venture.communitySize && (
                      <span> · <AnimatedCounter target="3800" suffix="+" /> Members</span>
                    )}
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
// CREATIVE PROJECTS — The Main Event (NEW)
// ============================================
const CreativeProjectsSection = memo(({ isDark }: { isDark: boolean }) => {
  return (
    <section id="work" className={`relative ${t(isDark, '', 'bg-[#fafaf9]')}`}>
      {/* Section intro */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-32 pb-8 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center"
        >
          <EyebrowLabel className="mb-4">SELECTED CREATIVE WORK</EyebrowLabel>
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-6xl ${t(isDark, 'text-porcelain', 'text-neutral-900')} mb-4`}>
            Systems executed<br />
            <span className="text-alchemy-red italic">at the highest level.</span>
          </h2>
          <p className={`font-body text-sm sm:text-base max-w-xl mx-auto ${t(isDark, 'text-porcelain/45', 'text-neutral-500')}`}>
            Four AI-native campaigns spanning luxury, streetwear, fragrance, and athletic brands.
            Each built on strategic architecture, not surface aesthetics.
          </p>
        </motion.div>
      </div>

      {/* Project showcases */}
      {creativeProjects.map((project, i) => (
        <div key={project.id}>
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-32 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
            <div className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 sm:gap-12 lg:gap-16 items-center`}>
              {/* Metadata column */}
              <motion.div
                className="w-full lg:w-[40%] space-y-5"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                {/* Number */}
                <motion.span
                  className="font-mono text-5xl sm:text-7xl font-bold text-alchemy-red/15 block"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  {project.num}
                </motion.span>

                {/* Category */}
                <span className={`font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] ${t(isDark, 'text-porcelain/40', 'text-neutral-400')}`}>
                  {project.category}
                </span>

                {/* Title with blur-in */}
                <motion.h3
                  className={`font-display text-2xl sm:text-3xl lg:text-4xl ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}
                  initial={{ opacity: 0, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
                >
                  {project.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  className={`font-body text-sm sm:text-base leading-relaxed ${t(isDark, 'text-porcelain/55', 'text-neutral-500')}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
                >
                  {project.description}
                </motion.p>

                {/* Tag pills */}
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
                >
                  {project.tags.map((tag, j) => (
                    <motion.span
                      key={tag}
                      className="font-mono text-[10px] px-3 py-1.5 rounded-full"
                      style={{
                        background: t(isDark, 'rgba(220,38,38,0.08)', 'rgba(220,38,38,0.06)'),
                        border: `1px solid ${t(isDark, 'rgba(220,38,38,0.15)', 'rgba(220,38,38,0.12)')}`,
                        color: t(isDark, 'rgba(220,38,38,0.8)', 'rgba(220,38,38,0.7)'),
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 + j * 0.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>

              {/* Image column */}
              <motion.div
                className="w-full lg:w-[60%] relative group"
                initial={{ opacity: 0, scale: 1.03 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              >
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    border: `1px solid ${t(isDark, 'rgba(255,255,255,0.08)', 'rgba(0,0,0,0.06)')}`,
                  }}
                >
                  {/* Glass overlay */}
                  <div
                    className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
                    }}
                  />

                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                    whileHover={{
                      scale: 1.02,
                    }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Hover glow border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      boxShadow: '0 0 40px rgba(220,38,38,0.15), inset 0 0 40px rgba(220,38,38,0.03)',
                      border: '1px solid rgba(220,38,38,0.25)',
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Divider between projects */}
          {i < creativeProjects.length - 1 && (
            <ProjectDivider isDark={isDark} />
          )}
        </div>
      ))}
    </section>
  );
});
CreativeProjectsSection.displayName = 'CreativeProjectsSection';

// ============================================
// CAREER TIMELINE — Scroll-linked opacity + pulse dots
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
                {/* Shimmer sweep on hover */}
                <div
                  className="absolute inset-0 -translate-x-full group-hover/pill:translate-x-full transition-transform duration-700"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                  }}
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
            Building with <span className="text-alchemy-red italic">Intent.</span>
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
// BEYOND THE WORK — 3D tilt + icon glow
// ============================================
const creativePursuits = [
  { icon: Film, title: 'Film & Visual Storytelling', desc: 'Interest in cinematic narratives and visual direction.' },
  { icon: Music, title: 'Music & Sound Design', desc: 'Curating soundscapes that inform creative rhythm.' },
  { icon: Sparkles, title: 'AI Art Experimentation', desc: 'Pushing boundaries of generative media.' },
  { icon: Users, title: 'Community Building', desc: 'Nurturing spaces for creative minds.' },
];

const TiltCard = memo(({ children, isDark, delay }: { children: React.ReactNode; isDark: boolean; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / rect.height * -6;
    const y = (e.clientX - rect.left - rect.width / 2) / rect.width * 6;
    setTilt({ x: Math.max(-3, Math.min(3, x)), y: Math.max(-3, Math.min(3, y)) });
  }, []);

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="rounded-2xl p-6 sm:p-8 transition-all duration-300"
      style={{
        background: t(isDark, 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.005) 100%)'),
        border: `1px solid ${t(isDark, 'rgba(255,255,255,0.06)', 'rgba(0,0,0,0.06)')}`,
        backdropFilter: 'blur(12px)',
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: EASE }}
    >
      {children}
    </motion.div>
  );
});
TiltCard.displayName = 'TiltCard';

const BeyondTheWork = memo(({ isDark }: { isDark: boolean }) => (
  <SectionShell padding="xl" className={`relative ${t(isDark, '', 'bg-[#fafaf9]')}`}>
    <SequentianBackground variant={2} opacity={isDark ? 0.12 : 0.07} glow={false} />
    <div className="relative z-10 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, ease: EASE }} className="mb-12">
        <EyebrowLabel className="mb-4">BEYOND THE WORK</EyebrowLabel>
        <h2 className={`font-display text-2xl sm:text-3xl lg:text-4xl italic ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
          When the screens go dark.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {creativePursuits.map((item, i) => (
          <TiltCard key={item.title} isDark={isDark} delay={i * 0.15}>
            {/* Icon with pulsing glow */}
            <motion.div
              className="mb-4"
              animate={{
                filter: [
                  'drop-shadow(0 0 4px rgba(220,38,38,0.3))',
                  'drop-shadow(0 0 12px rgba(220,38,38,0.6))',
                  'drop-shadow(0 0 4px rgba(220,38,38,0.3))',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
            >
              <item.icon className={`w-5 h-5 ${t(isDark, 'text-alchemy-red/60', 'text-alchemy-red/70')}`} />
            </motion.div>
            <h3 className={`font-body font-bold text-sm sm:text-base mb-2 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>{item.title}</h3>
            <p className={`font-body text-xs sm:text-sm ${t(isDark, 'text-porcelain/45', 'text-neutral-500')}`}>{item.desc}</p>
          </TiltCard>
        ))}
      </div>
    </div>
  </SectionShell>
));
BeyondTheWork.displayName = 'BeyondTheWork';

// ============================================
// INSIGHTS — Watermark numbers + bottom hover glow
// ============================================
const InsightsSection = memo(({ isDark }: { isDark: boolean }) => (
  <SectionShell id="insights" padding="xl" className={`relative ${t(isDark, '', 'bg-[#fafaf9]')}`}>
    <div className="relative z-10">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, ease: EASE }} className="mb-10">
        <EyebrowLabel className="mb-3">INSIGHTS</EyebrowLabel>
        <h2 className={`font-display text-2xl sm:text-3xl lg:text-4xl italic ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
          Recent public thought leadership.
        </h2>
      </motion.div>

      {/* Desktop grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {thoughtLeadershipEntries.map((entry, i) => (
          <motion.a
            key={entry.id}
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            style={{
              minHeight: '220px',
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
            {/* Watermark number */}
            <span className={`absolute top-3 right-4 font-mono text-6xl font-black ${t(isDark, 'text-porcelain/[0.03]', 'text-neutral-900/[0.03]')} pointer-events-none select-none`}>
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Bottom hover glow line */}
            <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-alchemy-red/60 to-alchemy-red/20 transition-all duration-500" />

            <div>
              <div className="flex items-center gap-1.5 mb-4">
                {entry.type === 'instagram' ? (
                  <Instagram className="w-3.5 h-3.5 text-alchemy-red/60" />
                ) : (
                  <Linkedin className="w-3.5 h-3.5 text-alchemy-red/60" />
                )}
                <span className={`font-mono text-[9px] uppercase tracking-wider ${t(isDark, 'text-porcelain/30', 'text-neutral-400')}`}>
                  {entry.type === 'instagram' ? 'Instagram' : 'LinkedIn'}
                </span>
              </div>
              <h4 className={`font-display text-base sm:text-lg font-medium ${t(isDark, 'text-porcelain/80', 'text-neutral-700')} line-clamp-3 leading-snug`}>
                {entry.title}
              </h4>
              {entry.excerpt && (
                <p className={`font-body text-xs mt-3 line-clamp-2 ${t(isDark, 'text-porcelain/40', 'text-neutral-400')}`}>{entry.excerpt}</p>
              )}
            </div>
            <ExternalLink className={`w-4 h-4 mt-4 ${t(isDark, 'text-porcelain/20', 'text-neutral-300')} group-hover:text-alchemy-red transition-colors`} />
          </motion.a>
        ))}
      </div>

      {/* Mobile horizontal scroll with fade hint */}
      <div className="sm:hidden relative">
        <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4">
          {thoughtLeadershipEntries.map((entry, i) => (
            <motion.a
              key={entry.id}
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-[280px] snap-start group rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden"
              style={{
                minHeight: '180px',
                background: t(isDark, 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.005) 100%)'),
                border: `1px solid ${t(isDark, 'rgba(255,255,255,0.06)', 'rgba(0,0,0,0.06)')}`,
                backdropFilter: 'blur(12px)',
              }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <span className={`absolute top-2 right-3 font-mono text-5xl font-black ${t(isDark, 'text-porcelain/[0.03]', 'text-neutral-900/[0.03]')} pointer-events-none select-none`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  {entry.type === 'instagram' ? (
                    <Instagram className="w-3.5 h-3.5 text-alchemy-red/60" />
                  ) : (
                    <Linkedin className="w-3.5 h-3.5 text-alchemy-red/60" />
                  )}
                  <span className={`font-mono text-[9px] uppercase tracking-wider ${t(isDark, 'text-porcelain/30', 'text-neutral-400')}`}>
                    {entry.type === 'instagram' ? 'Instagram' : 'LinkedIn'}
                  </span>
                </div>
                <h4 className={`font-display text-base font-medium ${t(isDark, 'text-porcelain/80', 'text-neutral-700')} line-clamp-3 leading-snug`}>
                  {entry.title}
                </h4>
              </div>
              <ExternalLink className={`w-3.5 h-3.5 mt-3 ${t(isDark, 'text-porcelain/20', 'text-neutral-300')}`} />
            </motion.a>
          ))}
        </div>
        {/* Right fade hint */}
        <div className={`absolute top-0 right-0 w-8 h-full pointer-events-none ${t(isDark, 'bg-gradient-to-l from-alchemy-black to-transparent', 'bg-gradient-to-l from-[#fafaf9] to-transparent')}`} />
      </div>
    </div>
  </SectionShell>
));
InsightsSection.displayName = 'InsightsSection';

// ============================================
// PHILOSOPHY + CTA — Word-by-word reveal + radial pulse + trust icons
// ============================================
const WordRevealQuote = memo(({ isDark }: { isDark: boolean }) => {
  const words = "Brands don't fail because of lack of creativity—they fail because they lack".split(' ');
  const highlightWords: Record<string, boolean> = {};
  // Highlight keywords
  const fullSentence = [
    ...words,
    'structure,',
    'taste,',
    'and',
    'long-term',
    'thinking.',
  ];
  const highlightSet = new Set(['structure,', 'taste,', 'long-term', 'thinking.']);

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
        — Aashrith Gade, Founder
      </motion.p>

      {/* CTA with radial red pulse */}
      <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16 relative" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.6 }}>
        {/* Radial pulse behind CTA */}
        <motion.div
          className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-64 h-32 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(220,38,38,0.15) 0%, transparent 70%)' }} />
        </motion.div>

        <MagneticCTA href="/contact" variant="primary" size="lg">
          Start a Conversation
        </MagneticCTA>
        <MagneticCTA href="#" variant="ghost" size="lg" icon={false}>
          <Download className="w-4 h-4 mr-2" />
          Download Portfolio PDF
        </MagneticCTA>
      </motion.div>

      {/* Trust signals with icons */}
      <motion.div className={`flex justify-center gap-4 sm:gap-6 font-mono text-[10px] sm:text-xs uppercase tracking-wider mt-10 ${t(isDark, 'text-porcelain/30', 'text-neutral-400')}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
        <span className="flex items-center gap-1.5"><Shield className="w-3 h-3" />NDA Available</span>
        <span>·</span>
        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />24h Reply</span>
        <span>·</span>
        <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" />Free First Call</span>
      </motion.div>
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
// MAIN PAGE — Reordered sections
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
      <SectionDivider isDark={isDark} />
      <VentureEcosystem isDark={isDark} />
      <SectionDivider isDark={isDark} />
      <CreativeProjectsSection isDark={isDark} />
      <SectionDivider isDark={isDark} />
      <CareerTimeline isDark={isDark} />
      <SectionDivider isDark={isDark} />
      <BeyondTheWork isDark={isDark} />
      <SectionDivider isDark={isDark} />
      <PhilosophyCTA isDark={isDark} />
      <SectionDivider isDark={isDark} />
      <InsightsSection isDark={isDark} />
      <PortfolioFooter
        isDark={isDark}
        founderName="Aashrith Gade"
        monogram="AG"
        copyright="Aashrith Gade"
        portfolioLinks={portfolioFooterLinks}
        ventureLinks={ventureFooterLinks}
        connectLinks={connectFooterLinks}
      />
    </div>
  );
};

export default AashrithPortfolio;
