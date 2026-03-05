import { memo, useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sun, Moon, Menu, X, Linkedin, Instagram, Youtube, ExternalLink, Film, Music, Sparkles, Users, Shield, Clock, Phone, ArrowRight, Eye } from 'lucide-react';
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
import { CaseStudyOverlay, type CaseStudyData } from '@/components/portfolio/CaseStudyOverlay';
import { useIsMobile } from '@/hooks/use-mobile';
import aashrithHeroBg from '@/assets/aashrith-hero-bg.mp4';
import aetherBento from '@/assets/aether-bento.png';
import genesisBento from '@/assets/genesis-bento.png';
import diorBento from '@/assets/dior-bento.png';
import oakleyBento from '@/assets/oakley-bento.png';
import tl1 from '@/assets/thought-leadership-1.png';
import tl2 from '@/assets/thought-leadership-2.png';
import tl3 from '@/assets/thought-leadership-3.png';
import tl4 from '@/assets/thought-leadership-4.png';
import tl5 from '@/assets/thought-leadership-5.png';
import tl6 from '@/assets/thought-leadership-6.png';
import tl7 from '@/assets/thought-leadership-7.png';
import tl8 from '@/assets/thought-leadership-8.png';
import tl9 from '@/assets/thought-leadership-9.png';
import ba1 from '@/assets/ba-post-1.jpg';
import ba2 from '@/assets/ba-post-2.jpg';
import ba3 from '@/assets/ba-post-3.jpg';
import ba4 from '@/assets/ba-post-4.jpg';
import ba5 from '@/assets/ba-post-5.jpg';
import ba6 from '@/assets/ba-post-6.jpg';
import ba7 from '@/assets/ba-post-7.jpg';
import ba8 from '@/assets/ba-post-8.jpg';
import ba9 from '@/assets/ba-post-9.jpg';

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
  { label: 'Ash Archives', href: '#ventures', external: false },
];
const connectFooterLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aashrithgade', external: true },
  { label: 'Instagram (@aashrithzz)', href: 'https://www.instagram.com/aashrithzz/', external: true },
  { label: 'AshArchives (@asharchiveszz)', href: 'https://www.instagram.com/asharchiveszz/', external: true },
  { label: 'YouTube', href: 'https://www.youtube.com/@aashrithxd8587', external: true },
];

// Brand Alchemy posts data
const brandAlchemyPosts = [
  { image: ba1, title: 'Brand Deck — Not Just a Brand, It\'s an Experiment', desc: 'Deconstructing the art of brand experimentation through bold visual narratives and strategic chaos.', link: '#' },
  { image: ba2, title: 'These Ads Crashed Every Platform', desc: 'A viral campaign dissection — how platform-native creative broke algorithmic ceilings.', link: '#' },
  { image: ba3, title: 'Most Hyped Collabs of 2025', desc: 'Curating the cultural collisions that defined the year in luxury brand partnerships.', link: '#' },
  { image: ba4, title: 'Marketing Moves Fast — We Move Faster', desc: 'Speed is a strategy. How Brand Alchemy stays three steps ahead of the trend cycle.', link: '#' },
  { image: ba5, title: 'The Algorithm Builds Empires', desc: 'Social media mastery decoded — speaking the language of platforms to build brand empires.', link: '#' },
  { image: ba6, title: 'The Lost Files of Branding — 7 Principles', desc: 'Seven forgotten principles no one teaches anymore. Timeless truths in a trend-obsessed world.', link: '#' },
  { image: ba7, title: 'Introducing Alchemy Casefiles™', desc: 'A new editorial series breaking down iconic brand strategies with forensic precision.', link: '#' },
  { image: ba8, title: 'AI × Luxury — Building a Brand in 5 Days', desc: 'The Aether Rituals story — how generative AI met luxury wellness brand architecture.', link: '#' },
  { image: ba9, title: 'Hermès — Craft That Outlives Trends', desc: 'Alchemy Casefiles Vol.1: deconstructing 187 years of time-trained brand mastery.', link: '#' },
];

// Case study data
const caseStudyData: Record<string, CaseStudyData> = {
  'aether-rituals': {
    id: 'aether-rituals',
    title: 'Aether Rituals',
    subtitle: '48-hour luxury wellness brand architecture experiment',
    image: aetherBento,
    challenge: 'Create a complete luxury wellness brand identity from zero — including color system, product design, spatial design, and brand narrative — using AI-native tools in just 48 hours.',
    approach: 'We architected a transcendent brand system blending ancient ritual with modern minimalism. Using Midjourney for product visualization, ChatGPT for narrative architecture, and Figma for system design.',
    process: [
      'Brand strategy & positioning: Defined "the pause that transforms" as core philosophy',
      'Color system architecture: Four tones representing performance, transcendence, purity, and subtlety',
      'Product line design: Ritual essentials — containers, packaging, spatial elements',
      'Spatial design: Showroom concepts merging minimalism with organic textures',
      'Brand collateral: Typography system, product photography style, lifestyle imagery',
    ],
    results: [
      'Complete brand identity system in 48 hours',
      'Visual language competitive with $50K+ agency work',
      'Proof-of-concept for AI-native luxury branding',
      'Featured in creative portfolio, driving client interest',
    ],
    timeline: '48 Hours',
    tools: ['Midjourney', 'ChatGPT', 'Figma', 'Photoshop'],
    tags: ['Luxury', 'Wellness', 'AI-Native', 'Brand Architecture', '48-Hour Sprint'],
  },
  'genesis': {
    id: 'genesis',
    title: 'Genesis',
    subtitle: 'Experimental AI-native streetwear brand with full video generation',
    image: genesisBento,
    challenge: 'Build a complete streetwear brand for the AI generation — including apparel design, video campaigns, logo system, and brand personality — entirely through AI generation tools.',
    approach: 'Genesis emerged as a monochromatic visual system built on contrast, mystery, and apocalyptic aesthetics. We used Runway ML for video generation, Midjourney for product mockups.',
    process: [
      'Brand positioning: "Apocalyptic streetwear for the AI generation"',
      'Visual system: Monochrome palette with high contrast and geometric logo',
      'Apparel design: Hoodies, tees, outerwear with branded elements',
      'Video campaign: AI-generated lifestyle footage using Runway ML',
      'Typography & graphics: Technical, utilitarian, future-forward',
    ],
    results: [
      'Full streetwear brand identity with video assets',
      'Distinctive visual language separating from generic streetwear',
      'Demonstrated capability of AI video generation for fashion',
      'Ready-to-launch brand system (conceptual)',
    ],
    timeline: '5 Days',
    tools: ['Runway ML', 'Midjourney', 'ChatGPT', 'Premiere Pro', 'Figma'],
    tags: ['Streetwear', 'AI Video', 'Brand Identity', 'Gen Z', 'Dystopian'],
  },
  'dior-campaign': {
    id: 'dior-campaign',
    title: 'Dior: Dual Fragrance Campaign',
    subtitle: "Luxury AI campaign for J'adore & Poison",
    image: diorBento,
    challenge: "Create two distinct luxury fragrance campaigns for Dior's iconic scents — each with its own visual language, yet unified under one premium creative direction.",
    approach: "We architected two parallel color stories: J'adore in gold and amber light, Poison in purple and shadow. Both use AI-generated cinematic imagery rivaling traditional luxury photography.",
    process: [
      'Campaign strategy: Duality of desire — light vs. dark, sovereign vs. seductive',
      "J'adore visual system: Gold, amber, warm light, ethereal environments",
      'Poison visual system: Purple, shadow, mystery, dramatic compositions',
      'Product integration: Bottle placement, lighting, atmosphere',
      'Typography & layout: Premium editorial design language',
    ],
    results: [
      'Two complete luxury fragrance campaigns',
      'Visual quality matching $100K+ traditional production',
      'Demonstrated AI capability in ultra-premium category',
      'Case study for luxury brand AI adoption',
    ],
    timeline: '1 Week',
    tools: ['Midjourney', 'ChatGPT', 'Photoshop', 'InDesign'],
    tags: ['Luxury', 'Fragrance', 'Dual Campaign', 'AI Creative Direction', 'Editorial'],
  },
  'oakley-showcase': {
    id: 'oakley-showcase',
    title: 'Oakley: Equipment Redefined',
    subtitle: '24-hour AI campaign for performance eyewear',
    image: oakleyBento,
    challenge: "Create a visually arresting product campaign for Oakley eyewear in 24 hours using only AI tools.",
    approach: 'We developed a bold orange-red visual system emphasizing speed, precision, and satisfaction. Using AI-powered product photography and dynamic compositions.',
    process: [
      'Visual strategy: Bold orange-red gradient system',
      'Product photography: AI-generated hero shots with dramatic lighting',
      'Campaign tagline: "Equipment for our world" / "Satisfy"',
      'Layout design: Asymmetric grids, kinetic energy, motion blur',
    ],
    results: [
      'Campaign-ready visual assets in 24 hours',
      'Distinctive aesthetic matching Oakley brand DNA',
      'Proof of AI capability in athletic/product categories',
      'Portfolio piece demonstrating speed + quality',
    ],
    timeline: '24 Hours',
    tools: ['Midjourney', 'Photoshop', 'Figma'],
    tags: ['Athletic', 'Product Photography', 'AI Campaign', '24-Hour Sprint'],
  },
};

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
    description: 'Apocalyptic streetwear for the AI generation. A monochromatic visual system built on contrast, mystery, and dystopian aesthetics.',
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
    description: "AI-generated cinematic campaigns for two iconic fragrances. Two color stories, one visual language.",
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
    description: 'Bold visual system for performance eyewear. AI-powered product photography pushing the boundaries of athletic brand aesthetics.',
    image: oakleyBento,
    tags: ['Athletic', 'Product Photography', 'AI Asset Generation'],
    year: '2024',
    sequentianVariant: 3 as const,
  },
];

// Thought leadership posts
const thoughtLeadershipPosts = [
  { image: tl1, title: 'AI vs Humans — The Creative Renaissance', desc: 'Exploring the intersection where artificial intelligence meets human creativity in modern brand building.', link: '#' },
  { image: tl2, title: 'The Era of Brand Gravity', desc: 'Why the brands that win aren\'t louder — they\'re heavier. A thesis on gravitational pull in positioning.', link: '#' },
  { image: tl3, title: 'LVMH × AI — When Data Learns to Feel', desc: 'A strategic deep-dive into how luxury conglomerates are weaponizing AI without losing soul.', link: '#' },
  { image: tl4, title: 'Vision Pro — The Most Brilliant Product Nobody Wants', desc: 'Deconstructing Apple\'s spatial computing gamble through the lens of brand perception.', link: '#' },
  { image: tl5, title: 'Patience — The Luxury of Slowness', desc: 'In a speed-addicted world, the brands that endure are the ones that refuse to rush.', link: '#' },
  { image: tl6, title: 'When Work Gets Done While You Sleep', desc: 'Building autonomous AI workflows that operate around the clock — a systems-first approach.', link: '#' },
  { image: tl7, title: 'The Founder Is the Algorithm', desc: 'Personal branding in 2025: why the founder\'s identity IS the competitive moat.', link: '#' },
  { image: tl8, title: 'Design That Thinks', desc: 'Moving beyond aesthetic decoration into design systems that reason, adapt, and compound.', link: '#' },
  { image: tl9, title: 'Marty Supreme — New Movie Marketing Peak?', desc: 'Breaking down the cultural marketing machinery behind cinema\'s most viral campaign.', link: '#' },
];

// ============================================
// FIXED CORNER CONTROLS
// ============================================
const FixedControls = memo(({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) => (
  <>
    <motion.div className="fixed top-4 left-4 z-[70]" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3, ease: EASE }}>
      <Link
        to="/about"
        className="flex items-center gap-1.5 px-3 py-2.5 rounded-full font-mono text-[10px] tracking-wider transition-all group"
        style={{
          background: t(isDark, 'rgba(10,10,10,0.7)', 'rgba(250,250,249,0.7)'),
          backdropFilter: 'blur(24px) saturate(180%)',
          border: `1px solid ${t(isDark, 'rgba(255,255,255,0.08)', 'rgba(0,0,0,0.06)')}`,
          color: t(isDark, 'rgba(245,245,244,0.6)', 'rgba(64,64,64,1)'),
        }}
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span className="hidden sm:inline">BACK</span>
      </Link>
    </motion.div>

    <motion.div className="fixed top-4 right-4 z-[70]" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3, ease: EASE }}>
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
// NAVIGATION — Liquid Glass Animated Nav
// ============================================
const PortfolioNav = memo(({ isDark }: { isDark: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > 200 && y > lastY);
      setLastY(y);
      
      // Track active section
      const sections = ['ventures', 'work', 'journey', 'connect'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight / 2) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.dispatchEvent(new Event('modal-open'));
    } else {
      document.body.style.overflow = '';
      document.dispatchEvent(new Event('modal-close'));
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = [
    { label: 'Ventures', href: '#ventures', id: 'ventures' },
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'Timeline', href: '#journey', id: 'journey' },
    { label: 'Connect', href: '#connect', id: 'connect' },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <motion.div
          className="pointer-events-auto mx-16 sm:mx-20 mt-4 sm:mt-6 px-5 sm:px-8 py-3.5 sm:py-4 flex items-center gap-5 sm:gap-8 transition-all duration-700"
          style={{
            borderRadius: scrolled ? '9999px' : '16px',
            background: scrolled
              ? t(isDark, 'rgba(10,10,10,0.75)', 'rgba(250,250,249,0.75)')
              : t(isDark, 'rgba(10,10,10,0.3)', 'rgba(250,250,249,0.3)'),
            backdropFilter: `blur(${scrolled ? 40 : 16}px) saturate(200%)`,
            border: `1px solid ${scrolled ? t(isDark, 'rgba(255,255,255,0.1)', 'rgba(0,0,0,0.08)') : t(isDark, 'rgba(255,255,255,0.05)', 'rgba(0,0,0,0.03)')}`,
            boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.4), 0 0 80px rgba(220,38,38,0.04)' : 'none',
          }}
          layout
        >
          {/* Monogram */}
          <motion.div
            className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(220,38,38,0.2) 0%, rgba(220,38,38,0.05) 100%)',
              border: '1px solid rgba(220,38,38,0.3)',
              color: t(isDark, '#f5f5f4', '#1a1a1a'),
            }}
            whileHover={{ scale: 1.1, borderColor: 'rgba(220,38,38,0.6)' }}
          >
            AG
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className={`font-body text-sm ${t(isDark, 'text-porcelain/60 hover:text-porcelain', 'text-neutral-600 hover:text-neutral-900')} transition-all relative group`}>
                {link.label}
                <span className={`absolute -bottom-0.5 left-0 h-px bg-alchemy-red transition-all duration-300 ${activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                {activeSection === link.id && (
                  <motion.span
                    className="absolute -bottom-2 left-1/2 w-1 h-1 rounded-full bg-alchemy-red"
                    layoutId="navDot"
                    style={{ x: '-50%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center ml-auto md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full ${t(isDark, 'hover:bg-white/5', 'hover:bg-black/5')} transition-colors relative`}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className={`w-5 h-5 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className={`w-5 h-5 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Full-screen liquid glass mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Liquid glass red-tinted backdrop */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{
                background: t(isDark,
                  'radial-gradient(ellipse 120% 80% at 50% 30%, rgba(220,38,38,0.12) 0%, rgba(10,10,10,0.98) 60%)',
                  'radial-gradient(ellipse 120% 80% at 50% 30%, rgba(220,38,38,0.08) 0%, rgba(250,250,249,0.98) 60%)'
                ),
                backdropFilter: 'blur(60px) saturate(200%)',
              }}
            />

            {/* Animated grid pattern */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.03 }}
              exit={{ opacity: 0 }}
              style={{
                backgroundImage: `linear-gradient(${t(isDark, 'rgba(255,255,255,0.05)', 'rgba(0,0,0,0.03)')} 1px, transparent 1px), linear-gradient(90deg, ${t(isDark, 'rgba(255,255,255,0.05)', 'rgba(0,0,0,0.03)')} 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
              }}
            />

            {/* Red atmospheric orb */}
            <motion.div
              className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 60%)' }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative z-10 flex flex-col h-full px-8 pt-24 pb-12">
              <motion.button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-3 rounded-full"
                style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)' }}
                whileHover={{ scale: 1.1, background: 'rgba(220,38,38,0.15)' }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <X className={`w-5 h-5 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`} />
              </motion.button>

              <div className="flex-1 flex flex-col justify-center gap-3">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-body text-4xl sm:text-5xl font-black ${t(isDark, 'text-porcelain', 'text-neutral-900')} hover:text-alchemy-red transition-colors relative overflow-hidden group`}
                    initial={{ opacity: 0, x: -60, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: 60, filter: 'blur(10px)' }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      <span className="font-mono text-xs text-alchemy-red/50 w-6">0{i + 1}</span>
                      {link.label}
                    </span>
                    <motion.div
                      className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-alchemy-red/50 to-transparent"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                    />
                  </motion.a>
                ))}

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4, ease: EASE }}>
                  <Link to="/about" onClick={() => setIsOpen(false)} className={`inline-flex items-center gap-2 font-mono text-sm ${t(isDark, 'text-porcelain/50', 'text-neutral-500')} hover:text-alchemy-red transition-colors mt-8`}>
                    <ArrowLeft className="w-4 h-4" />
                    Alchemy Labs
                  </Link>
                </motion.div>
              </div>

              <motion.div
                className={`flex items-center gap-4 pt-6 border-t ${t(isDark, 'border-porcelain/10', 'border-neutral-200')}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {socialLinks.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.05 }}
                  >
                    <s.icon className={`w-5 h-5 ${t(isDark, 'text-porcelain/40', 'text-neutral-400')} group-hover:text-alchemy-red transition-colors`} />
                    <span className={`font-mono text-xs ${t(isDark, 'text-porcelain/30', 'text-neutral-400')} group-hover:text-alchemy-red transition-colors`}>{s.label}</span>
                  </motion.a>
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
// HERO — "The Arrival" with enhanced effects
// ============================================
const HeroSection = memo(({ isDark }: { isDark: boolean }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

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
      <div className="absolute inset-0 pointer-events-none" style={{ background: t(isDark, 'radial-gradient(ellipse 40% 30% at 50% 45%, rgba(10,10,10,0.5) 0%, transparent 70%)', 'radial-gradient(ellipse 40% 30% at 50% 45%, rgba(250,250,249,0.4) 0%, transparent 70%)') }} />

      <SequentianBackground variant={1} opacity={isDark ? 0.15 : 0.08} blur={0} glow={false} />
      <BlueprintGrid opacity={0.02} />
      <NoiseTexture opacity={0.03} />
      <ParticleField count={35} color="rgba(220,38,38,0.3)" opacity={0.4} />

      <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${t(isDark, 'from-alchemy-black', 'from-[#fafaf9]')} to-transparent z-[1]`} />

      <motion.div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center" style={{ opacity: heroOpacity, y: heroY }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <span className={`font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] ${t(isDark, 'text-alchemy-red/70', 'text-alchemy-red/60')}`}>
            FOUNDER · BRAND ARCHITECT · SYSTEMS THINKER
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
          <span className="block font-body font-black text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] uppercase leading-[0.85] tracking-[-0.03em] hero-fluid-text bg-clip-text text-transparent">
            GADE
          </span>
        </motion.h1>

        <motion.p
          className={`font-body text-base sm:text-lg lg:text-xl max-w-2xl mx-auto ${t(isDark, 'text-porcelain/50', 'text-neutral-500')}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          I don't design brands. I architect the systems that make them <span className="text-alchemy-red italic font-display">inevitable.</span>
        </motion.p>

        <motion.div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}>
          <span className={`font-mono text-xs sm:text-sm ${t(isDark, 'text-porcelain/40', 'text-neutral-400')}`}>Founder of</span>
          {['Brand Alchemy', 'Ashzz.ai', 'Ash Archives'].map((name, i) => (
            <span key={name} className="flex items-center gap-2 sm:gap-3">
              <motion.span
                className="font-body font-bold text-xs sm:text-sm bg-gradient-to-r from-alchemy-red to-alchemy-pink bg-clip-text text-transparent"
                style={{ filter: 'drop-shadow(0 0 6px rgba(220,38,38,0.3))' }}
                whileHover={{ scale: 1.05 }}
              >
                {name}
              </motion.span>
              {i < 2 && <span className={`${t(isDark, 'text-porcelain/20', 'text-neutral-300')}`}>·</span>}
            </span>
          ))}
        </motion.div>

        <motion.div className={`flex justify-center gap-6 font-mono text-[10px] sm:text-xs ${t(isDark, 'text-porcelain/30', 'text-neutral-400')} mt-5`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
          <span>Mumbai, IN</span><span>·</span><span>NMIMS '26</span><span>·</span><span>Founder-led practice</span>
        </motion.div>
      </motion.div>

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
            boxShadow: ['0 0 12px rgba(220,38,38,0.15)', '0 0 24px rgba(220,38,38,0.3)', '0 0 12px rgba(220,38,38,0.15)'],
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
// INTERACTIVE POST TILE — Shared component for Brand Alchemy + Ash Archives
// ============================================
const PostTile = memo(({ post, index, accent, isHovered, onHover, onLeave }: {
  post: { image: string; title: string; desc: string; link: string };
  index: number;
  accent: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => (
  <motion.a
    href={post.link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-shrink-0 w-64 sm:w-72 rounded-2xl overflow-hidden relative group cursor-pointer block"
    style={{ aspectRatio: '4/5' }}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    whileHover={{ scale: 1.04, y: -8 }}
    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
  >
    {/* Image */}
    <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110" loading="lazy" />
    
    {/* Blur overlay on hover */}
    <motion.div
      className="absolute inset-0 transition-all duration-500"
      initial={false}
      animate={{
        backdropFilter: isHovered ? 'blur(4px)' : 'blur(0px)',
      }}
    />

    {/* Gradient overlay */}
    <div className="absolute inset-0 transition-opacity duration-500"
      style={{
        background: 'linear-gradient(180deg, transparent 10%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.9) 100%)',
        opacity: isHovered ? 1 : 0.5,
      }}
    />

    {/* Top shimmer sweep */}
    <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
      <motion.div
        className="h-full w-1/3"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        animate={{ x: ['-100%', '400%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: index * 0.4 }}
      />
    </div>

    {/* Liquid glass border glow */}
    <motion.div
      className="absolute inset-0 rounded-2xl pointer-events-none"
      initial={false}
      animate={{
        borderColor: isHovered ? accent : 'rgba(255,255,255,0.06)',
        boxShadow: isHovered ? `0 0 50px ${accent}, inset 0 1px 0 rgba(255,255,255,0.1)` : '0 0 0px transparent',
      }}
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
      transition={{ duration: 0.3 }}
    />

    {/* View Post indicator — appears on hover */}
    <AnimatePresence>
      {isHovered && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-[10px] tracking-wider text-white uppercase"
            style={{
              background: 'rgba(220,38,38,0.2)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(220,38,38,0.4)',
            }}
            initial={{ scale: 0.8, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 10 }}
          >
            <Instagram className="w-3.5 h-3.5" />
            View Post
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Content at bottom */}
    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
      <motion.p
        className="font-body font-semibold text-sm text-white leading-tight mb-1"
        initial={false}
        animate={{ y: isHovered ? -6 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {post.title}
      </motion.p>
      <motion.p
        className="font-body text-[11px] text-white/60 leading-snug line-clamp-2"
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
        transition={{ duration: 0.3 }}
      >
        {post.desc}
      </motion.p>
    </div>
  </motion.a>
));
PostTile.displayName = 'PostTile';

// ============================================
// VENTURE ECOSYSTEM — "The System"
// ============================================
const VentureEcosystem = memo(({ isDark }: { isDark: boolean }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const [hoveredPost, setHoveredPost] = useState<string | null>(null); // "ba-0", "tl-0" etc

  const ventureData = [
    {
      num: '01',
      name: 'Brand Alchemy',
      tagline: 'Where strategy becomes scripture.',
      description: 'A research-driven thought leadership platform decoding how brands are truly built — through culture, systems, narrative, and design. Not a blog. A body of work.',
      accent: 'rgba(220,38,38,0.5)',
      monogram: 'BA',
      speed: 'slow' as const,
      direction: 'left' as const,
      posts: brandAlchemyPosts,
      postPrefix: 'ba',
    },
    {
      num: '02',
      name: 'Ashzz.ai',
      tagline: '3.8K+ builders. One frontier.',
      description: 'An AI-native creative ecosystem where builders, designers, and strategists experiment at the bleeding edge of generative media, prompt engineering, and applied AI workflows.',
      accent: 'rgba(168,85,247,0.4)',
      monogram: 'AZ',
      speed: 'medium' as const,
      direction: 'right' as const,
      posts: null,
      postPrefix: 'az',
    },
    {
      num: '03',
      name: 'Ash Archives',
      tagline: 'The feed is the portfolio.',
      description: 'Cross-platform personal brand thought leadership across LinkedIn and Instagram — distilling brand strategy, AI-native thinking, and cultural commentary into editorial-grade visual content.',
      accent: 'rgba(251,146,60,0.4)',
      monogram: 'AA',
      speed: 'slow' as const,
      direction: 'left' as const,
      posts: thoughtLeadershipPosts,
      postPrefix: 'tl',
    },
  ];

  const createVentureTiles = (venture: typeof ventureData[0], idx: number) => {
    if (venture.posts) {
      return venture.posts.map((post, i) => (
        <PostTile
          key={i}
          post={post}
          index={i}
          accent={venture.accent}
          isHovered={hoveredPost === `${venture.postPrefix}-${i}`}
          onHover={() => setHoveredPost(`${venture.postPrefix}-${i}`)}
          onLeave={() => setHoveredPost(null)}
        />
      ));
    }

    // Ashzz.ai — abstract glass tiles
    return Array.from({ length: 10 }, (_, i) => (
      <motion.div
        key={i}
        className="flex-shrink-0 w-48 sm:w-56 rounded-2xl overflow-hidden relative group cursor-pointer"
        style={{
          aspectRatio: '4/3',
          background: t(isDark,
            'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
            'linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.01) 100%)'
          ),
          backdropFilter: 'blur(16px) saturate(150%)',
          border: `1px solid ${t(isDark, 'rgba(255,255,255,0.06)', 'rgba(0,0,0,0.05)')}`,
        }}
        whileHover={{
          scale: 1.06,
          borderColor: venture.accent,
          boxShadow: `0 8px 40px ${venture.accent.replace('0.4', '0.12')}`,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
          <motion.div
            className="h-full w-1/3"
            style={{ background: `linear-gradient(90deg, transparent, ${venture.accent}, transparent)` }}
            animate={{ x: ['-100%', '400%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
          />
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <span className={`font-mono text-xl font-bold ${t(isDark, 'text-porcelain/8', 'text-neutral-200/40')}`}>{venture.monogram}</span>
        </div>
      </motion.div>
    ));
  };

  return (
    <section ref={sectionRef} id="ventures" className={`relative overflow-hidden ${t(isDark, 'bg-alchemy-black', 'bg-[#fafaf9]')}`}>
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <SequentianBackground variant={2} opacity={isDark ? 0.16 : 0.09} glow={false} />
      </motion.div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(220,38,38,0.05) 0%, transparent 70%)' }} />
      <ParticleField count={12} color="rgba(220,38,38,0.2)" opacity={0.15} />

      <div className={`absolute top-0 inset-x-0 h-24 bg-gradient-to-b ${t(isDark, 'from-alchemy-black', 'from-[#fafaf9]')} to-transparent z-[2] pointer-events-none`} />

      <div className="relative z-10 py-28 sm:py-44">
        {/* Section header */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <motion.span
              className="inline-block font-mono text-[10px] sm:text-xs uppercase tracking-[0.5em] mb-6"
              style={{
                background: 'linear-gradient(90deg, rgba(220,38,38,0.8), rgba(220,38,38,0.4))',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
              initial={{ opacity: 0, letterSpacing: '0.3em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.5em' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
            >
              VENTURE ARCHITECTURE
            </motion.span>

            <h2 className={`font-display text-4xl sm:text-5xl lg:text-7xl leading-[0.9] ${t(isDark, 'text-porcelain', 'text-neutral-900')} mb-5`}>
              Three ventures.{' '}
              <span className="hero-fluid-text bg-clip-text text-transparent font-display italic">
                One operating system.
              </span>
            </h2>

            <motion.p
              className={`font-body text-sm sm:text-base max-w-2xl leading-relaxed ${t(isDark, 'text-porcelain/45', 'text-neutral-500')}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Not three companies. One interconnected intellectual infrastructure — each venture feeds the next, 
              building intellectual infrastructure that compounds before it ever reaches a client.
            </motion.p>
          </motion.div>
        </div>

        {/* Ventures */}
        <div className="space-y-28 sm:space-y-36">
          {ventureData.map((venture, idx) => (
            <motion.div
              key={venture.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              {/* Venture header */}
              <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-10">
                <motion.div
                  className="flex items-start gap-5 sm:gap-8"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <div className="relative flex-shrink-0">
                    <span className="font-mono text-4xl sm:text-6xl font-black" style={{
                      background: `linear-gradient(135deg, ${venture.accent}, ${venture.accent.replace(/[\d.]+\)$/, '0.15)')})`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                    }}>
                      {venture.num}
                    </span>
                    <motion.div
                      className="absolute -inset-4 rounded-full pointer-events-none"
                      style={{ background: `radial-gradient(circle, ${venture.accent.replace(/[\d.]+\)$/, '0.08)')} 0%, transparent 70%)` }}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <h3 className={`font-body font-black text-2xl sm:text-4xl tracking-tight ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
                        {venture.name}
                      </h3>
                      <span className={`font-display text-sm sm:text-base italic ${t(isDark, 'text-porcelain/30', 'text-neutral-400')}`}>
                        — {venture.tagline}
                      </span>
                    </div>
                    <p className={`font-body text-sm sm:text-base mt-3 max-w-xl leading-relaxed ${t(isDark, 'text-porcelain/40', 'text-neutral-500')}`}>
                      {venture.description}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Marquee */}
              <MarqueeRow speed={venture.speed} direction={venture.direction} gap={16} pauseOnHover={true}>
                {createVentureTiles(venture, idx)}
              </MarqueeRow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
VentureEcosystem.displayName = 'VentureEcosystem';

// ============================================
// CREATIVE PROJECTS — "The Proof" — Immersive Sticky Scroll
// ============================================
const ImmersiveProject = memo(({ project, index, isDark, isMobile, onDiscover }: { project: typeof creativeProjects[0]; index: number; isDark: boolean; isMobile: boolean; onDiscover: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <div
      ref={ref}
      className={`${isMobile ? 'relative min-h-[75vh]' : 'sticky top-0 h-screen'} w-full overflow-hidden pointer-events-none`}
      style={{ zIndex: 10 + index }}
    >
      <SequentianBackground variant={project.sequentianVariant} opacity={isDark ? 0.12 : 0.07} glow={false} />

      <motion.img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          ...(isMobile ? {} : { y, scale: imgScale, willChange: 'transform' }),
          objectPosition: 'center 30%',
        }}
        loading={index === 0 ? 'eager' : 'lazy'}
        decoding="async"
      />

      {/* Vignettes */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* Ghost number */}
      <div className="absolute top-8 right-8 sm:top-12 sm:right-16 pointer-events-none select-none">
        <span className="font-mono text-[15vw] sm:text-[20vw] font-black leading-none block bg-gradient-to-b from-alchemy-red/[0.1] to-alchemy-red/[0.03] bg-clip-text text-transparent">
          {project.num}
        </span>
      </div>

      {/* Editorial text overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 lg:p-20 pointer-events-auto">
        <div className="max-w-2xl">
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

          <motion.h3
            className="font-display text-3xl sm:text-5xl lg:text-7xl text-white mb-4 leading-[0.95]"
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            {project.title}
          </motion.h3>

          <motion.p
            className="font-body text-sm sm:text-base text-white/60 max-w-lg leading-relaxed mb-5"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          >
            {project.description}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-2 mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          >
            {project.tags.map((tag, j) => (
              <span
                key={tag}
                className="font-mono text-[10px] px-3 py-1.5 rounded-full text-white/60"
                style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.2)' }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <div className="flex items-center gap-4 mt-5">
            <motion.button
              onClick={onDiscover}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-[11px] sm:text-xs tracking-wider text-white/70 transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              whileHover={{
                scale: 1.05,
                borderColor: 'rgba(220,38,38,0.4)',
                boxShadow: '0 0 30px rgba(220,38,38,0.2)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              Discover More
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <span className="font-mono text-[10px] text-white/20 tracking-wider">{project.year}</span>
          </div>
        </div>
      </div>
    </div>
  );
});
ImmersiveProject.displayName = 'ImmersiveProject';

const CreativeProjectsSection = memo(({ isDark, onDiscover }: { isDark: boolean; onDiscover: (id: string) => void }) => {
  const isMobile = useIsMobile();

  return (
    <section id="work" className="relative">
      <div className={`${t(isDark, 'bg-alchemy-black', 'bg-[#fafaf9]')} relative z-20`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-32 pb-12 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center"
          >
            <motion.span
              className="inline-block font-mono text-[10px] sm:text-xs uppercase tracking-[0.5em] mb-6"
              style={{
                background: 'linear-gradient(90deg, rgba(220,38,38,0.8), rgba(220,38,38,0.4))',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              SELECTED CREATIVE WORK
            </motion.span>
            <h2 className={`font-display text-4xl sm:text-5xl lg:text-7xl leading-[0.9] ${t(isDark, 'text-porcelain', 'text-neutral-900')} mb-5`}>
              Every system leaves{' '}
              <span className="italic hero-fluid-text bg-clip-text text-transparent">fingerprints.</span>
            </h2>
            <p className={`font-body text-sm sm:text-base max-w-xl mx-auto ${t(isDark, 'text-porcelain/45', 'text-neutral-500')}`}>
              Four AI-native brand explorations. Each built on strategic architecture, not surface aesthetics.
            </p>
          </motion.div>
        </div>
      </div>

      <div style={isMobile ? {} : { height: `${creativeProjects.length * 100}vh` }}>
        {creativeProjects.map((project, i) => (
          <ImmersiveProject
            key={project.id}
            project={project}
            index={i}
            isDark={isDark}
            isMobile={isMobile}
            onDiscover={() => onDiscover(project.id)}
          />
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.35, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);

  return (
    <motion.div ref={ref} className="relative pl-12 sm:pl-16" style={{ opacity, scale }}>
      <div className="absolute left-[11px] sm:left-[19px] top-6">
        <div className="w-2.5 h-2.5 rounded-full bg-alchemy-red/60 border-2 z-10 relative" style={{ borderColor: t(isDark, '#0a0a0a', '#fafaf9') }} />
        <motion.div
          className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-alchemy-red/30"
          animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        />
      </div>

      <div
        className="rounded-2xl p-5 sm:p-6 mb-2 group"
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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start end', 'end start'] });
  const { scrollYProgress: sectionScrollProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgScale = useTransform(sectionScrollProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={sectionRef} id="journey" className={`relative overflow-hidden ${t(isDark, 'bg-alchemy-black', 'bg-[#fafaf9]')}`}>
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <SequentianBackground variant={5} opacity={isDark ? 0.22 : 0.14} glow={false} />
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{ 
          position: 'absolute', inset: 0,
          background: isDark 
            ? 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(220,38,38,0.08) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(220,38,38,0.05) 0%, transparent 70%)',
        }} />
      </motion.div>

      <div className="relative z-10 py-24 sm:py-40 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, ease: EASE }} className="mb-16">
          <motion.span
            className="inline-block font-mono text-[10px] sm:text-xs uppercase tracking-[0.5em] mb-6"
            style={{
              background: 'linear-gradient(90deg, rgba(220,38,38,0.8), rgba(220,38,38,0.4))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            THE ARC OF INTENT
          </motion.span>
          <h2 className={`font-display text-4xl sm:text-5xl lg:text-7xl leading-[0.9] ${t(isDark, 'text-porcelain', 'text-neutral-900')} mb-5`}>
            Every role was a{' '}
            <span className="italic hero-fluid-text bg-clip-text text-transparent">rehearsal.</span>
          </h2>
          <p className={`font-body text-sm sm:text-base max-w-xl ${t(isDark, 'text-porcelain/45', 'text-neutral-500')}`}>
            From execution to architecture. Each chapter sharpened the instinct for systems-level thinking.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto" ref={timelineRef}>
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
    </section>
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
  <section id="connect" className={`relative overflow-hidden ${t(isDark, 'bg-alchemy-black', 'bg-[#fafaf9]')} text-center`}>
    <SequentianBackground variant={4} opacity={isDark ? 0.22 : 0.12} glow={false} />

    <div className="relative z-10 max-w-3xl mx-auto py-24 sm:py-40 px-4 sm:px-6">
      <WordRevealQuote isDark={isDark} />

      <motion.p className={`font-mono text-xs tracking-wider mt-8 ${t(isDark, 'text-porcelain/30', 'text-neutral-400')}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
        — Aashrith Gade
      </motion.p>

      <motion.div
        className="flex flex-wrap justify-center gap-3 mt-14 mb-14"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {creativePursuits.map((item) => (
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

      <motion.div className="flex flex-col items-center justify-center gap-4 relative" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.6 }}>
        <motion.div
          className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-64 h-32 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(220,38,38,0.15) 0%, transparent 70%)' }} />
        </motion.div>

        <MagneticCTA href="/contact" variant="primary" size="lg">
          Let's Create Something Extraordinary
        </MagneticCTA>

        <motion.p
          className={`font-mono text-[10px] tracking-wider mt-2 ${t(isDark, 'text-porcelain/25', 'text-neutral-400')}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          Founder-to-founder. No gatekeepers.
        </motion.p>
      </motion.div>

      <motion.div className={`flex justify-center gap-4 sm:gap-6 font-mono text-[10px] sm:text-xs uppercase tracking-wider mt-10 ${t(isDark, 'text-porcelain/30', 'text-neutral-400')}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
        <span className="flex items-center gap-1.5"><Shield className="w-3 h-3" />NDA Available</span>
        <span>·</span>
        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />24h Reply</span>
        <span>·</span>
        <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" />Free First Call</span>
      </motion.div>

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
  </section>
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
    <div className="fixed top-0 left-0 right-0 z-[80] h-[2px]">
      <motion.div
        className="h-full"
        style={{
          width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, rgba(220,38,38,0.8), rgba(220,38,38,1), rgba(251,146,60,0.8))',
          boxShadow: '0 0 12px rgba(220,38,38,0.6), 0 0 24px rgba(220,38,38,0.3)',
          transition: 'width 0.1s linear',
        }}
      />
    </div>
  );
});
ScrollProgressBar.displayName = 'ScrollProgressBar';

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
  const [activeCaseStudy, setActiveCaseStudy] = useState<string | null>(null);

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
      <VentureEcosystem isDark={isDark} />
      <CreativeProjectsSection isDark={isDark} onDiscover={setActiveCaseStudy} />
      <CareerTimeline isDark={isDark} />
      <PhilosophyCTA isDark={isDark} />

      <PortfolioFooter
        isDark={isDark}
        founderName="Aashrith Gade"
        monogram="AG"
        copyright="Designed and built by Aashrith Gade"
        signoff="Always building. Always iterating."
        portfolioLinks={portfolioFooterLinks}
        ventureLinks={ventureFooterLinks}
        connectLinks={connectFooterLinks}
      />

      <CaseStudyOverlay
        open={!!activeCaseStudy}
        onOpenChange={(isOpen) => { if (!isOpen) setActiveCaseStudy(null); }}
        caseStudy={activeCaseStudy ? caseStudyData[activeCaseStudy] || null : null}
      />
    </div>
  );
};

export default AashrithPortfolio;
