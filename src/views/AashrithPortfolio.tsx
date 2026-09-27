'use client';

import { memo, useState, useEffect, useRef, useCallback } from 'react';
import { motion, MotionConfig, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent, useReducedMotion, type MotionValue } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { AG_MEDIA as M } from '@lib/portfolio';
import { ogCard } from '@lib/og';
import { ArrowLeft, Sun, Moon, Menu, X, Linkedin, Instagram, Youtube, ExternalLink, Film, Music, Sparkles, Users, Shield, Clock, Phone, ArrowRight, Eye } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
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
import { SafeImage } from '@/components/portfolio/SafeImage';
import { StreakSeam } from '@/components/portfolio/LightStreaks';
import { BlueprintGrid, NoiseTexture } from '@/components/effects';
import { SequentianBackground } from '@/components/SequentianBackground';
import { CaseStudyOverlay, type CaseStudyData } from '@/components/portfolio/CaseStudyOverlay';
import { useIsMobile } from '@/hooks/use-mobile';
const aashrithHeroBg = '/media/aashrith-hero-bg.mp4';
const aetherBento = '/media/aether-bento.webp';
const genesisBento = '/media/genesis-bento.webp';
const diorBento = '/media/dior-bento.webp';
const oakleyBento = '/media/oakley-bento.webp';
const tl1 = '/media/thought-leadership-1.webp';
const tl2 = '/media/thought-leadership-2.png';
const tl3 = '/media/thought-leadership-3.webp';
const tl4 = '/media/thought-leadership-4.png';
const tl5 = '/media/thought-leadership-5.webp';
const tl6 = '/media/thought-leadership-6.png';
const tl7 = '/media/thought-leadership-7.webp';
const tl8 = '/media/thought-leadership-8.webp';
const tl9 = '/media/thought-leadership-9.webp';
const ba1 = '/media/ba-post-1.jpg';
const ba2 = '/media/ba-post-2.jpg';
const ba3 = '/media/ba-post-3.jpg';
const ba4 = '/media/ba-post-4.jpg';
const ba5 = '/media/ba-post-5.jpg';
const ba6 = '/media/ba-post-6.jpg';
const ba7 = '/media/ba-post-7.jpg';
const ba8 = '/media/ba-post-8.jpg';
const ba9 = '/media/ba-post-9.jpg';

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
  { label: 'Download CV (PDF)', href: '/resumes/aashrith-gade-cv.pdf', download: true },
  { label: 'Instagram (@aashrithzz)', href: 'https://www.instagram.com/aashrithzz/', external: true },
  { label: 'AshArchives (@asharchiveszz)', href: 'https://www.instagram.com/asharchiveszz/', external: true },
  { label: 'YouTube', href: 'https://www.youtube.com/@aashrithxd8587', external: true },
];

// Brand Alchemy posts data
const brandAlchemyPosts = [
  { image: ba1, title: 'Brand Deck — Not Just a Brand, It\'s an Experiment', desc: 'Deconstructing the art of brand experimentation through bold visual narratives and strategic chaos.', link: '' },
  { image: ba2, title: 'These Ads Crashed Every Platform', desc: 'A viral campaign dissection — how platform-native creative broke algorithmic ceilings.', link: '' },
  { image: ba3, title: 'Most Hyped Collabs of 2025', desc: 'Curating the cultural collisions that defined the year in luxury brand partnerships.', link: '' },
  { image: ba4, title: 'Marketing Moves Fast — We Move Faster', desc: 'Speed is a strategy. How Brand Alchemy stays three steps ahead of the trend cycle.', link: '' },
  { image: ba5, title: 'The Algorithm Builds Empires', desc: 'Social media mastery decoded — speaking the language of platforms to build brand empires.', link: '' },
  { image: ba6, title: 'The Lost Files of Branding — 7 Principles', desc: 'Seven forgotten principles no one teaches anymore. Timeless truths in a trend-obsessed world.', link: '' },
  { image: ba7, title: 'Introducing Alchemy Casefiles™', desc: 'A new editorial series breaking down iconic brand strategies with forensic precision.', link: '' },
  { image: ba8, title: 'AI × Luxury — Building a Brand in 5 Days', desc: 'The Aether Rituals story — how generative AI met luxury wellness brand architecture.', link: '' },
  { image: ba9, title: 'Hermès — Craft That Outlives Trends', desc: 'Alchemy Casefiles Vol.1: deconstructing 187 years of time-trained brand mastery.', link: thoughtLeadershipEntries.find((e) => e.id === 'tl-2')?.url ?? '' },
];

// Case study data — Challenge / Approach / System built / Outcome.
// Outcomes appear only where a result is already on record; concepts describe the work.
const caseStudyData: Record<string, CaseStudyData> = {
  'studio186': {
    id: 'studio186',
    title: 'Studio186',
    subtitle: 'My full-time role at Studio186, The Times of India Group: four premium brands in preventive health, its consumer sub-brand, heritage travel and Indian craft. One lead, one system, written while the work is still happening.',
    image: M.s186Cover,
    status: 'open',
    role: 'Social & Growth Lead, full-time',
    year: '2026',
    timeline: 'Jul 2026 — ongoing',
    challenge: 'Four brands, four audiences: a longevity clinic, a five-day nutrition kit, heritage travel and Indian craft. One person accountable for brand, content and paid growth across all of them. Each needed its own voice without the studio’s output splintering into four.',
    approach: 'Diagnose before prescribing. The first week went to audits, competitor benchmarks and baselines frozen for every account, so every later number has a fixed point to be measured against. Then one shared system, with a separate editorial logic for each brand.',
    process: [
      'Social audits, competitor benchmarks and pre-activation baselines for each account.',
      'Brand, design and tone guidelines for all four verticals.',
      'An AI-native production pipeline for consistent, on-brand output.',
      'Paid growth run from the same editorial logic as organic.',
    ],
    results: ['Deorhi: monthly reach 8K → 700K in six weeks.', 'Evolve: sub-brand launch led end to end.'],
    statusNote: 'This is an open case study of the job I do every day. The work is live, so it reads like a working file: what was diagnosed, what was built, and only the results already on record. It gets updated as the work lands.',
    verticals: [
      {
        id: 'humanedge',
        name: 'HumanEdge',
        kicker: 'Preventive health',
        intro: 'A preventive-health and longevity brand, with the most stakeholders of the four and the ambition to lead its category. The job is to make a clinical subject feel like a long, calm conversation.',
        points: [
          'A three-channel plan across a newsletter, a WhatsApp channel and LinkedIn, split for consumers and for businesses.',
          'The first end-to-end Instagram and LinkedIn content strategy, pitched with the founder and chief medical officer.',
          'Production and content direction on episodes of The Long Game, the brand’s podcast.',
          'Renamed the webinar IP from a masterclass series to HumanEdge Conversations, with a live open-forum format built to lift engagement and registrations.',
        ],
        frames: [
          { src: M.heConversation, alt: 'HumanEdge · a conversation set before recording', wide: true },
          { src: M.heDawn, alt: 'HumanEdge · a morning walk on the promenade' },
          { src: M.heStill, alt: 'HumanEdge · a preventive morning, still life' },
        ],
      },
      {
        id: 'evolve',
        name: 'Evolve',
        kicker: 'Consumer sub-brand',
        parent: 'by HumanEdge',
        intro: 'A five-day nutrition kit. Five days of restraint is hard to make desirable, so the system borrows the kit’s own structure: five sleeves, five colours, five named days. Opening, Adaptation, Breakthrough, Momentum, Completion.',
        points: [
          'Led the sub-brand launch end to end.',
          'Pitched the brand world: AI visual direction, website UI/UX and the Instagram identity.',
          'Proposed the named days as the content system, turning an endurance test into an arc. Day two stops being the hungry day and becomes Adaptation.',
          'A media plan built on two levers, reach and frequency, with influencer seeding.',
        ],
        frames: [
          { src: M.evolveKit, alt: 'Evolve · the five-sleeve kit', wide: true },
          { src: M.evolveArc, alt: 'Evolve · five days, five colours' },
          { src: M.evolveRitual, alt: 'Evolve · a day-two morning' },
        ],
      },
      {
        id: 'deorhi',
        name: 'Deorhi',
        kicker: 'Heritage luxury travel',
        intro: 'Havelis, courtyards, slow time. The audit read the account as a retention problem before a reach problem, and the answer to both was restraint.',
        points: [
          'Rebuilt the editorial model around restraint-coded luxury: fewer, better frames; stillness over spectacle.',
          'Four content pillars and one rule: if a post belongs to none of them, it does not get made.',
          'A signature carousel, The Threshold, built as a template. The photography changes; the architecture does not.',
          'One rule for reels that never bends: real location, real date, no text before second three.',
          'Monthly reach 8K → 700K in six weeks.',
        ],
        frames: [
          { src: M.deorhiCourtyard, alt: 'Deorhi · a haveli courtyard at first light', wide: true },
          { src: M.deorhiThreshold, alt: 'Deorhi · the threshold' },
          { src: '/media/aashrith/deorhi-2.webp', alt: 'Deorhi · the journey in' },
        ],
      },
      {
        id: 'taqsha',
        name: 'Taqsha',
        kicker: 'Indian craft',
        intro: 'The quietest of the four: Indian craft, where the hand is the whole story. It shares the studio’s guidelines and pipeline, so it can grow without starting from zero.',
        points: [
          'Brand, design and tone guidelines, shared with the other three verticals.',
          'Content strategy in progress.',
        ],
        frames: [
          { src: M.taqshaBlock, alt: 'Taqsha · hand-block printing' },
          { src: M.taqshaStill, alt: 'Taqsha · textile, brass and clay' },
        ],
      },
    ],
    tools: ['AI-native production pipeline', 'Meta', 'LinkedIn'],
    tags: ['Full-time role', 'Open case study', 'Preventive health', 'Heritage luxury', 'Indian craft', 'Growth'],
  },
  'aether-rituals': {
    id: 'aether-rituals',
    title: 'Aether Rituals',
    subtitle: 'A concept AI-native skincare house: identity, packaging and campaign film from one AI pipeline.',
    image: M.aetherHero,
    concept: true,
    role: 'Founder & creative director (concept)',
    year: '2024',
    challenge: 'Build a complete luxury skincare house from zero — positioning, colour, product, packaging, space and film — and hold it to the standard of an established maison rather than a mood board.',
    approach: 'Strategy first. The house was anchored on one idea, the pause that transforms, and every visual decision was traced back to it: ancient ritual meeting modern minimalism, restraint over ornament, texture over noise.',
    process: [
      'Positioning and narrative architecture around "the pause that transforms".',
      'A four-tone colour system for performance, transcendence, purity and subtlety.',
      'Ritual essentials: containers, packaging and spatial elements designed as one family.',
      'Showroom concepts pairing minimal architecture with organic texture.',
      'A campaign film and lifestyle imagery produced through the same AI-native pipeline.',
    ],
    tools: ['Midjourney', 'ChatGPT', 'Figma', 'Photoshop'],
    tags: ['Concept', 'Skincare', 'Luxury', 'AI-native', 'Brand architecture'],
    frames: [
      { src: M.aether2, alt: 'Aether Rituals — ritual essentials' },
      { src: M.aether3, alt: 'Aether Rituals — texture and stone' },
      { src: '/media/aether-rituals-1.webp', alt: 'Aether Rituals — the original campaign frame', wide: true },
      { src: M.aether4, alt: 'Aether Rituals — the pause' },
      { src: '/media/aether-rituals-5.webp', alt: 'Aether Rituals — showroom concept' },
    ],
    video: '/media/aether-rituals-preview.mp4',
    poster: '/media/aether-rituals-preview-poster.jpg',
  },
  'genesis': {
    id: 'genesis',
    title: 'Genesis',
    subtitle: 'A concept AI brand system — monochrome streetwear for the AI generation, built entirely through generative tools.',
    image: M.genesisHero,
    concept: true,
    role: 'Founder & creative director (concept)',
    year: '2024',
    challenge: 'Design a streetwear brand whose whole world — apparel, logo, personality and moving image — could be generated end to end, without losing a point of view.',
    approach: 'Genesis was built on contrast and mystery: a monochrome system with a geometric mark and a technical, utilitarian voice, so every generated asset had rules to obey.',
    process: [
      'Positioning: apocalyptic streetwear for the AI generation.',
      'Monochrome visual system with high contrast and a geometric logo.',
      'Apparel range — hoodies, tees and outerwear carrying the brand elements.',
      'AI-generated lifestyle film for the campaign.',
      'Typography and graphics: technical, utilitarian, future-facing.',
    ],
    timeline: '5 days',
    tools: ['Runway ML', 'Midjourney', 'ChatGPT', 'Premiere Pro', 'Figma'],
    tags: ['Concept', 'Streetwear', 'AI video', 'Brand system'],
    frames: [
      { src: M.genesisPortrait, alt: 'Genesis — hood up, board-formed concrete' },
      { src: M.genesisRail, alt: 'Genesis — the monochrome range' },
      { src: '/media/genesis-bento.webp', alt: 'Genesis — the original system board', wide: true },
    ],
  },
  'dior-campaign': {
    id: 'dior-campaign',
    title: 'Dior: Dual Fragrance',
    subtitle: "A conceptual AI campaign for J'adore and Poison — two colour stories, one visual language.",
    image: M.diorHero,
    concept: true,
    role: 'Creative direction (concept)',
    year: '2024',
    challenge: "Create two distinct fragrance campaigns for Dior's J'adore and Poison — each with its own visual language, unified under one premium creative direction.",
    approach: "Two parallel colour stories built on the duality of desire: J'adore in gold, amber and warm light; Poison in purple, shadow and drama.",
    process: [
      "J'adore visual system: gold, amber, warm light, ethereal environments.",
      'Poison visual system: purple, shadow, mystery, dramatic composition.',
      'Bottle placement, lighting and atmosphere for each scent.',
      'An editorial typography and layout language across both.',
    ],
    timeline: '1 week',
    tools: ['Midjourney', 'ChatGPT', 'Photoshop', 'InDesign'],
    tags: ['Concept', 'Fragrance', 'Campaign', 'AI direction'],
    frames: [
      { src: M.diorGold, alt: 'Dual Fragrance — the gold story' },
      { src: M.diorShadow, alt: 'Dual Fragrance — the shadow story' },
      { src: '/media/dior-bento.webp', alt: 'Dual Fragrance — the original board', wide: true },
    ],
  },
  'oakley-showcase': {
    id: 'oakley-showcase',
    title: 'Oakley: Equipment Redefined',
    subtitle: 'A conceptual 24-hour AI campaign for performance eyewear.',
    image: M.oakleyHero,
    concept: true,
    role: 'Creative direction (concept)',
    year: '2024',
    challenge: 'Create a visually arresting product campaign for Oakley eyewear in 24 hours, using only AI tools.',
    approach: 'A bold orange-red system built around speed, precision and satisfaction, carried through dramatic product light and kinetic layouts.',
    process: [
      'Orange-red gradient visual system.',
      'AI-generated hero product shots with dramatic lighting.',
      'Campaign lines: "Equipment for our world" / "Satisfy".',
      'Asymmetric grids, kinetic energy and motion blur in layout.',
    ],
    timeline: '24 hours',
    tools: ['Midjourney', 'Photoshop', 'Figma'],
    tags: ['Concept', 'Athletic', 'Product', 'AI campaign'],
    frames: [
      { src: M.oakleySprint, alt: 'Equipment Redefined — speed, streaked in heat' },
      { src: M.oakleyLens, alt: 'Equipment Redefined — the desert in the lens' },
      { src: M.oakleyEclipse, alt: 'Equipment Redefined — eclipse', wide: true },
      { src: M.oakleyCrew, alt: 'Equipment Redefined — out of the haze' },
      { src: '/media/oakley-bento.webp', alt: 'Equipment Redefined — the original board' },
    ],
  },
};

// Creative projects data
type CreativeProject = {
  id: string; num: string; title: string; category: string; description: string; image: string;
  tags: string[]; year: string; concept: boolean; open?: boolean; sequentianVariant: 1 | 2 | 3 | 4 | 5;
};
const creativeProjects: CreativeProject[] = [
  {
    id: 'aether-rituals',
    num: '01',
    title: 'Aether Rituals',
    category: 'AI-native skincare house',
    description: 'A skincare house built on one idea, the pause that transforms. Identity, packaging and campaign film from a single pipeline.',
    image: M.aetherHero,
    tags: ['Brand architecture', 'Packaging', 'Campaign film'],
    year: '2024',
    concept: true,
    sequentianVariant: 4,
  },
  {
    id: 'genesis',
    num: '02',
    title: 'Genesis',
    category: 'AI brand system',
    description: 'Monochrome streetwear for the AI generation. Every generated asset had rules to obey, so the brand never lost its point of view.',
    image: genesisBento,
    tags: ['Brand system', 'Streetwear', 'AI video'],
    year: '2024',
    concept: true,
    sequentianVariant: 1,
  },
  {
    id: 'dior-campaign',
    num: '03',
    title: 'Dior: Dual Fragrance',
    category: 'Fragrance campaign',
    description: "J'adore in gold and warm light, Poison in violet and shadow. Two colour stories, one visual language.",
    image: diorBento,
    tags: ['Fragrance', 'Campaign', 'AI direction'],
    year: '2024',
    concept: true,
    sequentianVariant: 5,
  },
  {
    id: 'oakley-showcase',
    num: '04',
    title: 'Oakley: Equipment Redefined',
    category: 'Athletic brand showcase',
    description: 'Speed, precision and an orange-red system, taken from brief to campaign in 24 hours.',
    image: oakleyBento,
    tags: ['Athletic', 'Product', 'AI assets'],
    year: '2024',
    concept: true,
    sequentianVariant: 3,
  },
  {
    id: 'studio186',
    num: '05',
    title: 'Studio186',
    category: 'Full-time role · Social & Growth Lead · The Times of India Group',
    description: 'My full-time role since July 2026: social and growth lead for four brands, HumanEdge, Evolve, Deorhi and Taqsha, run as one system. Deorhi went from 8K to 700K monthly reach in six weeks.',
    image: M.s186Cover,
    tags: ['HumanEdge', 'Evolve', 'Deorhi', 'Taqsha'],
    year: '2026',
    concept: false,
    open: true,
    sequentianVariant: 2,
  },
];

// Ashzz.ai — editorial thought-leadership posts (16:9)
const azPosts = ['Prompt', 'Taste', 'Signal', 'Agents', 'Latent', 'Curate', 'Synthesis', 'Output', 'Judgment', 'Frontier'].map((title, i) => ({
  image: `/media/aashrith/az-${i + 1}.webp`,
  title,
  desc: '',
  link: '',
}));

// Thought leadership posts
const thoughtLeadershipPosts = [
  { image: tl1, title: 'AI vs Humans — The Creative Renaissance', desc: 'Exploring the intersection where artificial intelligence meets human creativity in modern brand building.', link: '' },
  { image: tl2, title: 'The Era of Brand Gravity', desc: 'Why the brands that win aren\'t louder — they\'re heavier. A thesis on gravitational pull in positioning.', link: '' },
  { image: tl3, title: 'LVMH × AI — When Data Learns to Feel', desc: 'A strategic deep-dive into how luxury conglomerates are weaponizing AI without losing soul.', link: '' },
  { image: tl4, title: 'Vision Pro — The Most Brilliant Product Nobody Wants', desc: 'Deconstructing Apple\'s spatial computing gamble through the lens of brand perception.', link: '' },
  { image: tl5, title: 'Patience — The Luxury of Slowness', desc: 'In a speed-addicted world, the brands that endure are the ones that refuse to rush.', link: '' },
  { image: tl6, title: 'When Work Gets Done While You Sleep', desc: 'Building autonomous AI workflows that operate around the clock — a systems-first approach.', link: '' },
  { image: tl7, title: 'The Founder Is the Algorithm', desc: 'Personal branding in 2025: why the founder\'s identity IS the competitive moat.', link: '' },
  { image: tl8, title: 'Design That Thinks', desc: 'Moving beyond aesthetic decoration into design systems that reason, adapt, and compound.', link: '' },
  { image: tl9, title: 'Marty Supreme — New Movie Marketing Peak?', desc: 'Breaking down the cultural marketing machinery behind cinema\'s most viral campaign.', link: '' },
];

// ============================================
// FIXED CORNER CONTROLS
// ============================================
const FixedControls = memo(({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) => (
  <>
    <motion.div className="fixed top-4 left-4 z-[70]" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3, ease: EASE }}>
      <Link
        href="/about"
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
            boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.4), 0 0 80px rgba(255,77,28,0.04)' : 'none',
          }}
          layout
        >
          {/* Monogram */}
          <motion.div
            className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,77,28,0.2) 0%, rgba(255,77,28,0.05) 100%)',
              border: '1px solid rgba(255,77,28,0.3)',
              color: t(isDark, '#f5f5f4', '#1a1a1a'),
            }}
            whileHover={{ scale: 1.1, borderColor: 'rgba(255,77,28,0.6)' }}
          >
            AG
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,77,28,0.15) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className={`font-body text-sm ${t(isDark, 'text-porcelain/60 hover:text-porcelain', 'text-neutral-600 hover:text-neutral-900')} transition-all relative group`}>
                {link.label}
                <span className={`absolute -bottom-0.5 left-0 h-px bg-ember transition-all duration-300 ${activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                {activeSection === link.id && (
                  <motion.span
                    className="absolute -bottom-2 left-1/2 w-1 h-1 rounded-full bg-ember"
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
                  'radial-gradient(ellipse 120% 80% at 50% 30%, rgba(255,77,28,0.12) 0%, rgba(10,10,10,0.98) 60%)',
                  'radial-gradient(ellipse 120% 80% at 50% 30%, rgba(255,77,28,0.08) 0%, rgba(250,250,249,0.98) 60%)'
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
              style={{ background: 'radial-gradient(circle, rgba(255,77,28,0.08) 0%, transparent 60%)' }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative z-10 flex flex-col h-full px-8 pt-24 pb-12">
              <motion.button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-3 rounded-full"
                style={{ background: 'rgba(255,77,28,0.08)', border: '1px solid rgba(255,77,28,0.2)' }}
                whileHover={{ scale: 1.1, background: 'rgba(255,77,28,0.15)' }}
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
                    className={`font-body text-4xl sm:text-5xl font-black ${t(isDark, 'text-porcelain', 'text-neutral-900')} hover:text-ember transition-colors relative overflow-hidden group`}
                    initial={{ opacity: 0, x: -60, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: 60, filter: 'blur(10px)' }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      <span className="font-mono text-xs text-ember/50 w-6">0{i + 1}</span>
                      {link.label}
                    </span>
                    <motion.div
                      className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-ember/50 to-transparent"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                    />
                  </motion.a>
                ))}

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4, ease: EASE }}>
                  <Link href="/about" onClick={() => setIsOpen(false)} className={`inline-flex items-center gap-2 font-mono text-sm ${t(isDark, 'text-porcelain/50', 'text-neutral-500')} hover:text-ember transition-colors mt-8`}>
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
                    <s.icon className={`w-5 h-5 ${t(isDark, 'text-porcelain/40', 'text-neutral-400')} group-hover:text-ember transition-colors`} />
                    <span className={`font-mono text-xs ${t(isDark, 'text-porcelain/30', 'text-neutral-400')} group-hover:text-ember transition-colors`}>{s.label}</span>
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
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 70%, rgba(255,77,28,0.06) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: t(isDark, 'radial-gradient(ellipse 40% 30% at 50% 45%, rgba(10,10,10,0.5) 0%, transparent 70%)', 'radial-gradient(ellipse 40% 30% at 50% 45%, rgba(250,250,249,0.4) 0%, transparent 70%)') }} />

      <SequentianBackground variant={1} opacity={isDark ? 0.15 : 0.08} blur={0} glow={false} />
      <BlueprintGrid opacity={0.02} />
      <NoiseTexture opacity={0.03} />
      <ParticleField count={35} color="rgba(255,77,28,0.3)" opacity={0.4} />

      <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${t(isDark, 'from-alchemy-black', 'from-[#fafaf9]')} to-transparent z-[1]`} />

      <motion.div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center" style={{ opacity: heroOpacity, y: heroY }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <span className={`font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] ${t(isDark, 'text-ember/70', 'text-ember/60')}`}>
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
          className={`mx-auto font-body text-[clamp(0.95rem,1.7vw,1.35rem)] font-light tracking-[-0.01em] sm:whitespace-nowrap ${t(isDark, 'text-porcelain/70', 'text-neutral-600')}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Brand strategy with <span className="font-playfair italic text-ember">taste</span>, and the systems to carry it.
        </motion.p>

        <motion.div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}>
          <span className={`font-mono text-xs sm:text-sm ${t(isDark, 'text-porcelain/40', 'text-neutral-400')}`}>Founder of</span>
          {['Alchemy Labs', 'Brand Alchemy', 'Ashzz.ai', 'Ash Archives'].map((name, i, all) => (
            <span key={name} className="flex items-center gap-2 sm:gap-3">
              <motion.span
                className="font-body font-bold text-xs sm:text-sm bg-gradient-to-r from-ember to-ember-deep bg-clip-text text-transparent"
                style={{ filter: 'drop-shadow(0 0 6px rgba(255,77,28,0.3))' }}
                whileHover={{ scale: 1.05 }}
              >
                {name}
              </motion.span>
              {i < all.length - 1 && <span className={`${t(isDark, 'text-porcelain/20', 'text-neutral-300')}`}>·</span>}
            </span>
          ))}
        </motion.div>


        <motion.div className="mt-8 flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
          <a
            href="/resumes/aashrith-gade-cv.pdf"
            download
            className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-6 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${t(isDark, 'border-porcelain/20 text-porcelain/80 hover:border-ember hover:text-porcelain', 'border-neutral-300 text-neutral-700 hover:border-ember hover:text-neutral-900')}`}
          >
            Download CV (PDF) <ArrowRight className="w-3.5 h-3.5 rotate-90" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
        <motion.div
          className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[9px] uppercase tracking-widest"
          style={{
            background: t(isDark, 'rgba(255,77,28,0.08)', 'rgba(255,77,28,0.06)'),
            border: '1px solid rgba(255,77,28,0.2)',
            color: t(isDark, 'rgba(255,77,28,0.8)', 'rgba(255,77,28,0.7)'),
          }}
          animate={{
            boxShadow: ['0 0 12px rgba(255,77,28,0.15)', '0 0 24px rgba(255,77,28,0.3)', '0 0 12px rgba(255,77,28,0.15)'],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div className="w-px h-3 bg-ember/60" animate={{ y: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }} />
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
const PostTile = memo(({ post, index, accent, isHovered, onHover, onLeave, wide = false }: {
  post: { image: string; title: string; desc: string; link: string };
  index: number;
  accent: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  /** 16:9 editorial post instead of 4:5 */
  wide?: boolean;
}) => {
  const Tag = post.link ? motion.a : motion.div;
  return (
  <Tag
    {...(post.link ? { href: post.link, target: '_blank', rel: 'noopener noreferrer' } : { tabIndex: 0 })}
    className={`snap-start flex-shrink-0 ${wide ? 'w-[82vw] max-w-[300px] sm:max-w-none sm:w-[420px] lg:w-[480px]' : 'w-64 sm:w-72'} rounded-2xl overflow-hidden relative group ${post.link ? 'cursor-pointer' : 'cursor-default'} block bg-alchemy-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember`}
    style={{ aspectRatio: wide ? '16/9' : '4/5' }}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    onFocus={onHover}
    onBlur={onLeave}
    whileHover={{ scale: wide ? 1.02 : 1.04, y: wide ? -4 : -8 }}
    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
  >
    {/* Image */}
    {wide ? (
      <SafeImage src={post.image} fallback="/media/thought-leadership-1.webp" alt={post.title} fill sizes="480px" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
    ) : (
      <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110" loading="lazy" />
    )}
    
    {/* Blur overlay on hover */}
    {!wide && <motion.div
      className="absolute inset-0 transition-all duration-500"
      initial={false}
      animate={{
        backdropFilter: isHovered ? 'blur(4px)' : 'blur(0px)',
      }}
    />}

    {/* Gradient overlay */}
    <div className="absolute inset-0 transition-opacity duration-500"
      style={{
        background: 'linear-gradient(180deg, transparent 10%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.9) 100%)',
        opacity: wide ? (isHovered ? 0.25 : 0) : isHovered ? 1 : 0.5,
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
    {!wide && post.link && <AnimatePresence>
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
              background: 'rgba(255,77,28,0.2)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,77,28,0.4)',
            }}
            initial={{ scale: 0.8, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 10 }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View post
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>}

    {/* Content at bottom */}
    {!wide && <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
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
    </div>}
  </Tag>
  );
});
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
      accent: 'rgba(255,77,28,0.5)',
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
      speed: 'slow' as const,
      direction: 'right' as const,
      posts: azPosts,
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

  const createVentureTiles = (venture: typeof ventureData[0]) =>
    venture.posts.map((post, i) => (
      <PostTile
        key={i}
        post={post}
        index={i}
        wide={venture.postPrefix === 'az'}
        accent={venture.accent}
        isHovered={hoveredPost === `${venture.postPrefix}-${i}`}
        onHover={() => setHoveredPost(`${venture.postPrefix}-${i}`)}
        onLeave={() => setHoveredPost(null)}
      />
    ));

  return (
    <section ref={sectionRef} id="ventures" className={`relative overflow-hidden ${t(isDark, 'bg-alchemy-black', 'bg-[#fafaf9]')}`}>
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <SequentianBackground variant={2} opacity={isDark ? 0.16 : 0.09} glow={false} />
      </motion.div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,77,28,0.05) 0%, transparent 70%)' }} />
      <ParticleField count={12} color="rgba(255,77,28,0.2)" opacity={0.15} />

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
                background: 'linear-gradient(90deg, rgba(255,77,28,0.8), rgba(255,77,28,0.4))',
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

            <h2 className={`[text-wrap:balance] tracking-[-0.02em] font-display text-4xl sm:text-5xl lg:text-7xl leading-[0.9] ${t(isDark, 'text-porcelain', 'text-neutral-900')} mb-5`}>
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
              Not three companies. One system: each venture feeds the next, so the thinking compounds
              long before it reaches a client.
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
              <MarqueeRow speed={venture.speed} duration={venture.postPrefix === 'az' ? 130 : undefined} direction={venture.direction} gap={16} pauseOnHover={true}>
                {createVentureTiles(venture)}
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
const ImmersiveProject = memo(({ project, index, isDark, isMobile, onDiscover }: { project: CreativeProject; index: number; isDark: boolean; isMobile: boolean; onDiscover: () => void }) => {
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

      <motion.div
        className="absolute inset-0"
        style={isMobile ? undefined : { y, scale: imgScale, willChange: 'transform' }}
      >
        <SafeImage
          src={project.image}
          fallback={aetherBento}
          alt={project.title}
          fill
          sizes="100vw"
          priority={index === 0}
          className="object-cover object-[center_30%]"
        />
      </motion.div>

      {/* Vignettes */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* Ghost number */}
      <div className="absolute top-8 right-8 sm:top-12 sm:right-16 pointer-events-none select-none">
        <span className="font-mono text-[15vw] sm:text-[20vw] font-black leading-none block bg-gradient-to-b from-ember/[0.1] to-ember/[0.03] bg-clip-text text-transparent">
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
            <span className="font-mono text-[9px] px-2.5 py-1 rounded-full text-white/55 uppercase tracking-wider"
              style={{ border: '1px solid rgba(255,255,255,0.16)' }}
            >
              {project.concept ? 'Concept' : project.id === 'studio186' ? 'Full-time role' : 'Client work'}
            </span>
            {project.open && (
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] px-2.5 py-1 rounded-full text-white/80 uppercase tracking-wider bg-ember/15" style={{ border: '1px solid rgba(255,77,28,0.35)' }}>
                <span className="relative flex h-1.5 w-1.5" aria-hidden>
                  <span className="absolute inline-flex h-full w-full rounded-full bg-ember opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
                </span>
                Open · ongoing
              </span>
            )}
          </motion.div>

          <h3 className="font-body font-bold text-4xl sm:text-5xl lg:text-7xl text-white mb-4 leading-[0.95] tracking-[-0.03em] [text-wrap:balance] overflow-hidden pb-[0.08em]">
            <motion.button
              type="button"
              onClick={onDiscover}
              className="block text-left [text-wrap:balance] hover:text-white/85 transition-colors"
              initial={{ y: '105%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, delay: 0.05, ease: EASE }}
            >
              {project.title}
            </motion.button>
          </h3>

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
                style={{ background: 'rgba(255,77,28,0.12)', border: '1px solid rgba(255,77,28,0.2)' }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <div className="flex items-center gap-4 mt-5">
            <motion.button
              onClick={onDiscover}
              aria-haspopup="dialog"
              aria-label={`Open case study: ${project.title}`}
              className="group flex min-h-11 items-center gap-2 px-6 rounded-full font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] text-white/85 transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              whileHover={{
                scale: 1.05,
                borderColor: 'rgba(255,77,28,0.4)',
                boxShadow: '0 0 30px rgba(255,77,28,0.2)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              View case study
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
                background: 'linear-gradient(90deg, rgba(255,77,28,0.8), rgba(255,77,28,0.4))',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              SELECTED CREATIVE WORK
            </motion.span>
            <h2 className={`[text-wrap:balance] tracking-[-0.02em] font-display text-4xl sm:text-5xl lg:text-7xl leading-[0.9] ${t(isDark, 'text-porcelain', 'text-neutral-900')} mb-5`}>
              Every system leaves{' '}
              <span className="italic hero-fluid-text bg-clip-text text-transparent">fingerprints.</span>
            </h2>
            <p className={`font-body text-sm sm:text-base max-w-xl mx-auto ${t(isDark, 'text-porcelain/45', 'text-neutral-500')}`}>
              Four concept houses built to test a system end to end, and the job I do every day. Each one starts with the thinking, not the surface.
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
// CAREER TIMELINE — "The Arc of Intent"
// ============================================
type ArcRoleData = { org: string; parent: string; role: string; dates: string; lines: string[]; chips?: string[]; image?: string; imageAlt?: string; caseId?: string };
const arcRoles: ArcRoleData[] = [
  {
    org: 'Studio186', parent: 'The Times of India Group (Bennett, Coleman & Co.), Mumbai', role: 'Social & Growth Lead', dates: 'Jul 2026 — Present',
    lines: [
      'Sole lead for brand, content and paid growth across four premium verticals: HumanEdge (preventive health) and its consumer sub-brand, Taqsha (Indian craft) and Deorhi (heritage luxury travel). Led the sub-brand launch end to end.',
      'Built the AI-native production pipeline and the brand, design and tone guidelines for all four.',
      "Rebuilt Deorhi's editorial model around restraint-coded luxury: monthly reach 8K → 700K in six weeks.",
    ],
    chips: ['HumanEdge', 'Evolve', 'Deorhi', 'Taqsha'],
    image: M.deorhiCourtyard,
    imageAlt: 'Deorhi · a haveli courtyard at first light',
    caseId: 'studio186',
  },
  {
    org: 'Alchemy Labs', parent: 'Founder-led practice', role: 'Founder & Brand Strategist', dates: 'Jul 2025 — Present',
    lines: [
      'An independent practice for fashion, skincare and niche luxury.',
      'Brand strategy and identity, generative-AI production and custom web — delivered as one system.',
    ],
    chips: ['Fashion', 'Skincare', 'Niche luxury'],
  },
  {
    org: 'Cipla Ltd.', parent: 'Delhi NCR', role: 'Marketing Strategy Intern', dates: 'May — Jul 2023',
    lines: [
      'Marketing strategy across 6+ markets.',
      'Campaigns reaching 12.8M consumers.',
    ],
  },
  {
    org: 'Velocity Gaming', parent: '', role: 'Branding & Social Media Manager', dates: 'Mar — May 2022',
    lines: [
      'Owned branding and social media.',
      'Instagram grew 5K → 40K in 10 weeks, alongside Corsair and Red Bull sponsorships.',
    ],
    chips: ['Corsair', 'Red Bull'],
  },
  {
    org: 'S8UL Esports', parent: '', role: 'Content Strategy & Growth Manager', dates: 'Apr 2020 — May 2021',
    lines: [
      'Content strategy and growth.',
      'Built the creative pipeline behind a 13M+ combined creator audience.',
    ],
  },
];

const arcCoda = [
  { label: 'Education', items: ['NMIMS Mumbai — B.B.A. Branding & Advertising, 2023–2026', 'HEC Paris — Luxury Management Summer School, Jun 2026'] },
  { label: 'Leadership', items: ['Head of Marketing, NMIMS College Film Festival 2025 — 200K–300K organic views', 'National 2nd Best Speaker, ISC National Debate Championship 2023'] },
  { label: 'Credentials', items: ['Wharton Business Foundations · LVMH Insider · Google AI Leader'] },
];

const ArcRole = memo(({ role, active, isDark, reduced, onDiscover }: { role: ArcRoleData; active: boolean; isDark: boolean; reduced: boolean; onDiscover?: (id: string) => void }) => {
  const on = active || reduced;
  const ink = t(isDark, '#f5f5f4', '#171717');
  const dim = t(isDark, 'rgba(245,245,244,0.35)', 'rgba(23,23,23,0.35)');
  return (
    <motion.article
      className="relative pl-10 sm:pl-16 lg:pl-0 lg:grid lg:grid-cols-[180px_1fr] lg:gap-16"
      initial={false}
      animate={{ opacity: on ? 1 : 0.35 }}
      transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
    >
      <span className={`block font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] mb-3 lg:mb-0 lg:pt-3 lg:text-right ${t(isDark, 'text-porcelain/45', 'text-neutral-500')}`}>{role.dates}</span>
      <div className="lg:pl-16 min-w-0">
        <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.16em] text-ember mb-3">{role.role}</p>
        <h3
          className="font-body font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.02] tracking-[-0.03em] [text-wrap:balance]"
          style={{
            backgroundImage: `linear-gradient(90deg, ${ink} 0%, ${ink} 45%, #FF4D1C 50%, ${dim} 55%, ${dim} 100%)`,
            backgroundSize: '220% 100%',
            backgroundPosition: on ? '0% 0' : '100% 0',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            transition: reduced ? 'none' : 'background-position 1.1s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {role.org}
        </h3>
        {role.parent && <p className={`font-body text-sm mt-2 [text-wrap:pretty] ${t(isDark, 'text-porcelain/50', 'text-neutral-500')}`}>{role.parent}</p>}

        <ol className="mt-6 space-y-3 max-w-[58ch]">
          {role.lines.map((line, j) => (
            <li key={line} className={`grid grid-cols-[28px_1fr] gap-2 font-body text-[15px] sm:text-base leading-relaxed [text-wrap:pretty] ${j === role.lines.length - 1 && role.lines.length > 1 ? t(isDark, 'text-porcelain', 'text-neutral-900') : t(isDark, 'text-porcelain/65', 'text-neutral-600')}`}>
              <span className="font-mono text-[10px] pt-[0.4em] text-ember/70" aria-hidden>{String(j + 1).padStart(2, '0')}</span>
              <span>{line}</span>
            </li>
          ))}
        </ol>

        {role.chips && (
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Brands">
            {role.chips.map((c) => (
              <li key={c} className={`font-mono text-[10px] uppercase tracking-[0.16em] rounded-full border px-3 py-1.5 ${t(isDark, 'border-porcelain/15 text-porcelain/70', 'border-neutral-300 text-neutral-600')}`}>{c}</li>
            ))}
          </ul>
        )}

        {role.image && (
          <motion.figure
            className="relative mt-8 aspect-[16/9] w-full max-w-2xl overflow-hidden rounded-[20px]"
            initial={false}
            animate={{ opacity: on ? 1 : 0.25, scale: on ? 1 : 0.97 }}
            transition={{ duration: reduced ? 0 : 0.9, ease: EASE }}
          >
            <SafeImage src={role.image} fallback="/media/aether-rituals-2.webp" alt={role.imageAlt ?? role.org} fill sizes="(min-width: 1024px) 672px, 90vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <figcaption className="absolute left-4 bottom-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/80">{role.imageAlt ?? role.org}</figcaption>
          </motion.figure>
        )}

        {role.caseId && onDiscover && (
          <button
            type="button"
            onClick={() => onDiscover(role.caseId!)}
            aria-haspopup="dialog"
            className={`group mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border px-5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${t(isDark, 'border-porcelain/20 text-porcelain/80 hover:border-ember hover:text-porcelain', 'border-neutral-300 text-neutral-700 hover:border-ember hover:text-neutral-900')}`}
          >
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full rounded-full bg-ember opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
            </span>
            Read the open case study
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        )}
      </div>
    </motion.article>
  );
});
ArcRole.displayName = 'ArcRole';

const CareerTimeline = memo(({ isDark, onDiscover }: { isDark: boolean; onDiscover?: (id: string) => void }) => {
  const reduced = !!useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsets = useRef<number[]>([]);
  const [active, setActive] = useState(-1);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 65%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const pulseTop = useTransform(progress, (v) => `${Math.min(Math.max(v, 0), 1) * 100}%`);

  useEffect(() => {
    const measure = () => {
      const h = trackRef.current?.offsetHeight || 1;
      offsets.current = nodeRefs.current.map((n) => (n ? n.offsetTop / h : 1));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useMotionValueEvent(progress, 'change', (v) => {
    let idx = -1;
    offsets.current.forEach((o, i) => { if (v >= o - 0.02) idx = i; });
    setActive((prev) => (prev === idx ? prev : idx));
  });

  // Line x-position: left rail on phones/tablets, between date column and copy on desktop.
  const lineX = 'left-[7px] sm:left-[15px] lg:left-[244px]';

  return (
    <section id="journey" className={`relative overflow-hidden ${t(isDark, 'bg-alchemy-black', 'bg-[#fafaf9]')}`}>
      <SequentianBackground variant={5} opacity={isDark ? 0.14 : 0.08} glow={false} />

      <div className="relative z-10 py-24 sm:py-36 lg:py-44 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: EASE }} className="mb-20 sm:mb-28 max-w-3xl">
          <span className="inline-block font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] text-ember mb-6">THE ARC OF INTENT</span>
          <h2 className={`[text-wrap:balance] tracking-[-0.02em] font-display text-4xl sm:text-5xl lg:text-7xl leading-[0.95] ${t(isDark, 'text-porcelain', 'text-neutral-900')} mb-6`}>
            Every role was a{' '}
            <span className="italic hero-fluid-text bg-clip-text text-transparent">rehearsal.</span>
          </h2>
          <p className={`font-body text-sm sm:text-base max-w-xl leading-relaxed [text-wrap:pretty] ${t(isDark, 'text-porcelain/50', 'text-neutral-500')}`}>
            Esports taught speed. Pharma taught scale. Studio186 is teaching restraint. Each chapter moved the work from execution toward architecture.
          </p>
        </motion.header>

        <div ref={trackRef} className="relative">
          <svg className={`absolute top-0 ${lineX} w-[2px] h-full overflow-visible pointer-events-none`} viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden>
            <line x1="1" y1="0" x2="1" y2="100" stroke={t(isDark, 'rgba(255,255,255,0.08)', 'rgba(0,0,0,0.08)')} strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <motion.line
              x1="1" y1="0" x2="1" y2="100"
              stroke="#FF4D1C" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
              style={{ pathLength: reduced ? 1 : progress, filter: 'drop-shadow(0 0 4px rgba(255,77,28,0.7))' }}
            />
          </svg>

          {!reduced && (
            <motion.div className={`absolute ${lineX} ml-px -translate-x-1/2 -translate-y-1/2 pointer-events-none`} style={{ top: pulseTop }} aria-hidden>
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFD9C7]" style={{ boxShadow: '0 0 0 3px rgba(255,77,28,0.35), 0 0 18px 6px rgba(255,77,28,0.55), 0 0 48px 12px rgba(255,77,28,0.25)' }} />
            </motion.div>
          )}

          <div className="space-y-20 sm:space-y-28">
            {arcRoles.map((role, i) => {
              const on = reduced || i <= active;
              return (
                <div key={role.org} ref={(el) => { nodeRefs.current[i] = el; }} className="relative">
                  <span
                    className={`absolute top-2 ${lineX} ml-px -translate-x-1/2 w-[9px] h-[9px] rounded-full border transition-colors duration-500`}
                    style={{
                      background: on ? '#FF4D1C' : t(isDark, '#0a0a0a', '#fafaf9'),
                      borderColor: on ? '#FF4D1C' : t(isDark, 'rgba(255,255,255,0.25)', 'rgba(0,0,0,0.2)'),
                    }}
                    aria-hidden
                  />
                  <ArcRole role={role} active={i === active} isDark={isDark} reduced={reduced} onDiscover={onDiscover} />
                </div>
              );
            })}
          </div>
        </div>

        <div className={`mt-24 sm:mt-32 pt-10 border-t grid gap-10 sm:grid-cols-3 ${t(isDark, 'border-porcelain/10', 'border-neutral-200')}`}>
          {arcCoda.map((c) => (
            <div key={c.label}>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember mb-4">{c.label}</p>
              <ul className="space-y-3">
                {c.items.map((it) => (
                  <li key={it} className={`font-body text-sm leading-relaxed [text-wrap:pretty] ${t(isDark, 'text-porcelain/60', 'text-neutral-600')}`}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
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

// ============================================
// STATEMENT — scroll-linked editorial line + principles
// ============================================
const statementWords = "The best brands aren't designed. They're engineered to feel inevitable.".split(' ');
const EMPHASIS = 'inevitable.';
const principles = [
  { k: '01', title: 'Architecture before aesthetics', body: 'Positioning, narrative and system are decided before a single frame is made.' },
  { k: '02', title: 'One pipeline, every output', body: 'Identity, content and campaign film come from the same AI-native system, so the brand never drifts.' },
  { k: '03', title: 'Restraint is the signal', body: 'Luxury reads in what is left out. Fewer, better frames compound.' },
];

const StatementWord = ({ word, i, n, progress, isDark }: { word: string; i: number; n: number; progress: MotionValue<number>; isDark: boolean }) => {
  const start = i / n;
  const opacity = useTransform(progress, [start, start + 1.5 / n], [0.16, 1]);
  const em = word === EMPHASIS;
  return (
    <>
      <motion.span
        style={{ opacity }}
        className={em
          ? 'font-playfair italic font-normal text-ember tracking-[-0.01em]'
          : t(isDark, 'text-porcelain', 'text-neutral-900')}
      >
        {em ? 'inevitable' : word}
      </motion.span>
      {em ? <motion.span style={{ opacity }} className={t(isDark, 'text-porcelain', 'text-neutral-900')}>.</motion.span> : null}
      {i < n - 1 ? ' ' : ''}
    </>
  );
};

const StatementSection = memo(({ isDark }: { isDark: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const full = useMotionValue(1);
  const progress = reduced ? full : scrollYProgress;

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-44 pb-20 sm:pb-28 text-left">
      <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] text-ember mb-8 sm:mb-12">The thesis</p>
      <div ref={ref}>
        <h2 className="font-body font-bold text-[2.25rem] leading-[1.06] sm:text-6xl lg:text-[5.25rem] sm:leading-[1.02] tracking-[-0.035em] max-w-[18ch] [text-wrap:balance] [hyphens:none]">
          {statementWords.map((w, i) => (
            <StatementWord key={i} word={w} i={i} n={statementWords.length} progress={progress} isDark={isDark} />
          ))}
        </h2>
      </div>
      <p className={`font-mono text-xs tracking-wider mt-8 ${t(isDark, 'text-porcelain/45', 'text-neutral-500')}`}>— Aashrith Gade</p>

      <div className={`mt-20 sm:mt-28 grid gap-10 sm:gap-8 sm:grid-cols-3 border-t pt-10 ${t(isDark, 'border-porcelain/10', 'border-neutral-200')}`}>
        {principles.map((p, i) => (
          <motion.div
            key={p.k}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] text-ember">{p.k}</span>
            <h3 className={`mt-4 font-body font-bold text-xl sm:text-2xl leading-tight tracking-[-0.02em] [text-wrap:balance] ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>{p.title}</h3>
            <p className={`mt-3 font-body text-sm sm:text-base leading-relaxed max-w-[34ch] [text-wrap:pretty] ${t(isDark, 'text-porcelain/60', 'text-neutral-600')}`}>{p.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
});
StatementSection.displayName = 'StatementSection';

const PhilosophyCTA = memo(({ isDark }: { isDark: boolean }) => (
  <section id="connect" className={`relative overflow-hidden ${t(isDark, 'bg-alchemy-black', 'bg-[#fafaf9]')} text-center`}>
    <SequentianBackground variant={4} opacity={isDark ? 0.22 : 0.12} glow={false} />

    <StatementSection isDark={isDark} />
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><StreakSeam isDark={isDark} /></div>

    <div className="relative z-10 max-w-3xl mx-auto pt-20 sm:pt-28 pb-24 sm:pb-40 px-4 sm:px-6">

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
            <item.icon className="w-3 h-3 text-ember/50" />
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
          <div className="w-64 h-32 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(255,77,28,0.15) 0%, transparent 70%)' }} />
        </motion.div>

        <MagneticCTA href="/contact" variant="primary" size="lg">
          Start a conversation
        </MagneticCTA>

        <a
          href="/resumes/aashrith-gade-cv.pdf"
          download
          className={`mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border px-7 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${t(isDark, 'border-porcelain/25 text-porcelain/85 hover:border-ember hover:text-porcelain', 'border-neutral-300 text-neutral-600 hover:text-neutral-900')}`}
        >
          Download CV (PDF)
        </a>

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

      <motion.div className={`flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-x-6 font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] mt-12 ${t(isDark, 'text-porcelain/30', 'text-neutral-400')}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
        <span className="flex items-center gap-1.5"><Shield className="w-3 h-3" />NDA Available</span>
        <span>·</span>
        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />Founder-read</span>
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
          background: 'linear-gradient(90deg, rgba(255,77,28,0.8), rgba(255,77,28,1), rgba(251,146,60,0.8))',
          boxShadow: '0 0 12px rgba(255,77,28,0.6), 0 0 24px rgba(255,77,28,0.3)',
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

  const order = creativeProjects.map((p) => p.id);
  const idx = activeCaseStudy ? order.indexOf(activeCaseStudy) : -1;
  const prevId = idx > 0 ? order[idx - 1] : null;
  const nextId = idx >= 0 && idx < order.length - 1 ? order[idx + 1] : null;
  const closeCase = useCallback((isOpen: boolean) => { if (!isOpen) setActiveCaseStudy(null); }, []);

  return (
    <MotionConfig reducedMotion="user">
    <div className={`min-h-screen overflow-x-clip ${isDark ? 'bg-alchemy-black text-porcelain' : 'bg-[#fafaf9] text-neutral-900'} transition-colors duration-500`}>
      <SEOHead title="Aashrith Gade — Founder, Brand Architect" description="Portfolio of Aashrith Gade: founder of Brand Alchemy, Ashzz.ai & Alchemy Labs. AI-native brand architecture with luxury-grade taste." image={ogCard('aashrith')} />
      <BackgroundScene mode="hero" />
      <ScrollProgressBar />
      <FixedControls isDark={isDark} toggleTheme={toggleTheme} />
      <PortfolioNav isDark={isDark} />

      <HeroSection isDark={isDark} />
      <VentureEcosystem isDark={isDark} />
      <StreakSeam isDark={isDark} />
      <CreativeProjectsSection isDark={isDark} onDiscover={setActiveCaseStudy} />
      <CareerTimeline isDark={isDark} onDiscover={setActiveCaseStudy} />
      <StreakSeam isDark={isDark} />
      <PhilosophyCTA isDark={isDark} />

      <PortfolioFooter
        isDark={isDark}
        founderName="Aashrith Gade"
        monogram="AG"
        copyright="Designed and built by Aashrith Gade"
        headline={<>Always building. Always <span className="font-playfair italic font-normal text-ember">iterating</span>.</>}
        bgImage="/media/aashrith/footer-bg.webp"
        bgFallback="/media/footer-bg.png"
        featherFrom={isDark ? '#0A0908' : '#fafaf9'}
        streaks
        portfolioLinks={portfolioFooterLinks}
        ventureLinks={ventureFooterLinks}
        connectLinks={connectFooterLinks}
      />

      <CaseStudyOverlay
        open={!!activeCaseStudy}
        onOpenChange={closeCase}
        caseStudy={activeCaseStudy ? caseStudyData[activeCaseStudy] || null : null}
        onPrev={prevId ? () => setActiveCaseStudy(prevId) : undefined}
        onNext={nextId ? () => setActiveCaseStudy(nextId) : undefined}
        prevTitle={prevId ? caseStudyData[prevId]?.title : undefined}
        nextTitle={nextId ? caseStudyData[nextId]?.title : undefined}
      />
    </div>
    </MotionConfig>
  );
};

export default AashrithPortfolio;
