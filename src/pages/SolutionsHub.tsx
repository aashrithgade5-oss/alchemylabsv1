import { memo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, Layers, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SEOHead, generateOrganizationSchema } from '@/components/SEOHead';
import { NoiseTexture } from '@/components/effects';
import solutionsBgTexture from '@/assets/solutions-bg-texture.png';

const CALENDLY_URL = 'https://calendly.com/alchemylabs-work/30min';
const EASE = [0.22, 1, 0.36, 1] as const;

const openCalendly = () => {
  (window as any).Calendly?.initPopupWidget({ url: CALENDLY_URL });
};

const pillars = [
  {
    id: 'ai',
    number: '01',
    label: 'PILLAR 01 · FAST TRACK',
    title: 'AI Product Studio',
    tagline: 'Production in hours, not weeks.',
    body: 'Studio-grade creative systems — built for speed, finished with taste. AI audits, campaign sprints, and content engines that actually compound.',
    icon: Zap,
    route: '/solutions/ai',
    includes: ['AI Leverage Audit', 'Campaign Sprint', 'Content Engine'],
    ctaCount: 6,
  },
  {
    id: 'branding',
    number: '02',
    label: 'PILLAR 02 · FOUNDATION',
    title: 'Brand Systems',
    tagline: 'Brands that feel inevitable.',
    body: 'Identity infrastructure built for permanence. Narrative precision. Visual inevitability. From logo to full brand ecosystem — built to last.',
    icon: Layers,
    route: '/solutions/branding',
    includes: ['Brand World', 'Identity System', 'Branding 360'],
    ctaCount: 4,
  },
  {
    id: 'consultation',
    number: '03',
    label: 'PILLAR 03 · CLARITY',
    title: 'Advisory',
    tagline: 'Strategy you can execute today.',
    body: 'From a single precision audit to full system simulation — we hand you a plan that works, not a deck that collects dust.',
    icon: Target,
    route: '/solutions/consultation',
    includes: ['Precision Audit', 'Strategy Build', 'Full Simulation'],
    ctaCount: 3,
  },
];

// ── TEXTURE BACKGROUND ──
const TextureBg = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none z-0" aria-hidden>
      <motion.img
        src={solutionsBgTexture}
        alt=""
        loading="eager"
        decoding="async"
        draggable={false}
        style={{ scale, y }}
        className="absolute inset-0 w-full h-full object-cover opacity-[0.25]"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(8,8,8,0.78)' }} />
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-background to-transparent" />
      <NoiseTexture opacity={0.03} />
    </div>
  );
});
TextureBg.displayName = 'TextureBg';

// ── HERO ──
const HeroSection = memo(() => (
  <section className="relative min-h-[85vh] flex items-end pb-20 sm:pb-28 pt-32 sm:pt-40 overflow-hidden">
    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12 w-full">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-8"
      >
        <span className="inline-flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 bg-alchemy-red rounded-full" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em]"
            style={{ color: 'hsl(var(--muted-foreground))' }}>
            Our Solutions
          </span>
        </span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
        className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] leading-[0.92] text-porcelain mb-6"
      >
        Three{' '}
        <span className="italic text-alchemy-red">Pillars.</span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
        className="font-body text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed mb-10"
        style={{ color: 'hsl(var(--muted-foreground))' }}
      >
        Every brand challenge demands a different instrument.
        We've engineered three — each built to compound.
      </motion.p>

      {/* Tag pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.36 }}
        className="flex flex-wrap gap-3"
      >
        {['AI-NATIVE', 'FOUNDER-FIRST', 'OUTCOME-ENGINEERED'].map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] uppercase px-4 py-1.5 rounded-full transition-all duration-300 hover:tracking-[0.2em]"
            style={{
              color: 'hsl(var(--muted-foreground))',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  </section>
));
HeroSection.displayName = 'HeroSection';

// ── PILLAR CARD ──
const PillarCard = memo(({ pillar, index, size }: { pillar: typeof pillars[0]; index: number; size: 'large' | 'medium' }) => {
  const Icon = pillar.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      className="h-full"
    >
      <Link
        to={pillar.route}
        className="block h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="group relative h-full rounded-2xl overflow-hidden transition-all duration-300"
          style={{
            background: isHovered ? '#141414' : '#0f0f0f',
            border: isHovered ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(255,255,255,0.06)',
            borderLeft: isHovered ? '4px solid hsl(var(--alchemy-red))' : '4px solid transparent',
            transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: isHovered ? '0 24px 48px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.2)',
          }}
        >
          {/* Ghost number */}
          <span
            className="absolute -top-4 -right-2 font-display leading-none pointer-events-none select-none transition-opacity duration-300"
            style={{
              fontSize: 'clamp(120px, 15vw, 200px)',
              color: 'hsl(var(--porcelain))',
              opacity: isHovered ? 0.06 : 0.03,
            }}
          >
            {pillar.number}
          </span>

          <div className={`relative z-10 flex flex-col h-full ${size === 'large' ? 'p-8 sm:p-10 lg:p-12' : 'p-7 sm:p-8'}`}>
            {/* Icon */}
            <div className="mb-5">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: 'rgba(200,57,43,0.15)',
                }}
              >
                <Icon className="w-[18px] h-[18px] text-alchemy-red" />
              </div>
            </div>

            {/* Label */}
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-3"
              style={{ color: 'hsl(var(--muted-foreground))' }}>
              {pillar.label}
            </p>

            {/* Title */}
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-porcelain mb-2 group-hover:text-alchemy-red transition-colors duration-300">
              {pillar.title}
            </h3>

            {/* Tagline */}
            <p className="font-mono text-[10px] sm:text-xs text-alchemy-red/60 tracking-wide uppercase mb-4">
              {pillar.tagline}
            </p>

            {/* Body */}
            <p className="font-body text-sm font-light leading-relaxed mb-6 flex-1"
              style={{ color: 'hsl(var(--muted-foreground))' }}>
              {pillar.body}
            </p>

            {/* Divider */}
            <div className="w-full h-px mb-5" style={{ background: 'rgba(255,255,255,0.06)' }} />

            {/* Includes */}
            <div className="mb-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-3"
                style={{ color: 'rgba(255,255,255,0.25)' }}>
                Includes
              </p>
              <ul className="space-y-2">
                {pillar.includes.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2.5 font-mono text-xs transition-transform duration-200"
                    style={{
                      color: 'hsl(var(--muted-foreground))',
                      transform: isHovered ? `translateX(${4}px)` : 'translateX(0)',
                      transitionDelay: `${j * 40}ms`,
                    }}
                  >
                    <span className="text-alchemy-red/70">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-auto">
              <span className="inline-flex items-center gap-2 font-body text-sm text-porcelain/60 group-hover:text-alchemy-red transition-colors duration-300">
                <span className="relative">
                  Discover {pillar.ctaCount} Services
                  <span
                    className="absolute bottom-0 left-0 h-px bg-alchemy-red transition-all duration-300"
                    style={{ width: isHovered ? '100%' : '0%' }}
                  />
                </span>
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform duration-300"
                  style={{ transform: isHovered ? 'translateX(4px)' : 'translateX(0)' }}
                />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});
PillarCard.displayName = 'PillarCard';

// ── BENTO GRID ──
const PillarsBento = memo(() => (
  <section className="relative py-4 sm:py-12">
    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
      {/* Asymmetric bento: Pillar 01 large left, 02+03 stacked right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Large card */}
        <div className="lg:col-span-7">
          <PillarCard pillar={pillars[0]} index={0} size="large" />
        </div>
        {/* Two medium cards stacked */}
        <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
          <PillarCard pillar={pillars[1]} index={1} size="medium" />
          <PillarCard pillar={pillars[2]} index={2} size="medium" />
        </div>
      </div>
    </div>
  </section>
));
PillarsBento.displayName = 'PillarsBento';

// ── BOTTOM CTA ──
const BottomCTA = memo(() => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
    className="relative py-16 sm:py-24"
  >
    <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
      <div
        className="rounded-2xl px-8 sm:px-12 py-12 sm:py-16"
        style={{
          background: '#0f0f0f',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl italic text-porcelain mb-3">
              Ready to build something{' '}
              <span className="text-alchemy-red">inevitable</span>?
            </h2>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-wider"
                style={{ color: 'rgba(255,255,255,0.25)' }}>NDA available</span>
              <span style={{ color: 'rgba(255,255,255,0.12)' }}>·</span>
              <span className="font-mono text-[10px] uppercase tracking-wider"
                style={{ color: 'rgba(255,255,255,0.25)' }}>24h reply</span>
              <span style={{ color: 'rgba(255,255,255,0.12)' }}>·</span>
              <span className="font-mono text-[10px] uppercase tracking-wider"
                style={{ color: 'rgba(255,255,255,0.25)' }}>Free first call</span>
            </div>
          </div>

          <button
            type="button"
            onClick={openCalendly}
            className="gradient-border-glow-btn inline-flex items-center gap-3 px-8 py-4 rounded-xl font-body text-sm text-porcelain transition-all duration-300 hover:text-white whitespace-nowrap"
          >
            Book a Free 15-Min Consult
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </motion.section>
));
BottomCTA.displayName = 'BottomCTA';

// ── PAGE ──
export const SolutionsHub = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Services — Alchemy Labs"
      description="AI Advisory, Brand Systems, and Strategic Consulting. Three pillars built for brands that refuse to move slowly."
      structuredData={generateOrganizationSchema()}
    />
    <Navigation />
    <TextureBg />
    <div className="relative z-10">
      <HeroSection />
      <PillarsBento />
      <BottomCTA />
    </div>
    <Footer />
  </div>
);

export default SolutionsHub;
