import { memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Layers, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SEOHead, generateOrganizationSchema } from '@/components/SEOHead';
import { NoiseTexture } from '@/components/effects';
import solutionsBgTexture from '@/assets/solutions-bg-texture.png';
import { useRef } from 'react';

const CALENDLY_URL = 'https://calendly.com/alchemylabs-work/30min';
const easing = [0.22, 1, 0.36, 1] as const;

const openCalendly = () => {
  (window as any).Calendly?.initPopupWidget({ url: CALENDLY_URL });
};

const pillars = [
  {
    id: 'ai',
    number: '01',
    title: 'AI Product Studio',
    subtitle: 'Fast (24h build)',
    description: 'Studio-grade media and systems—built for speed, finished with taste. From AI audits to cinematic campaigns and content engines.',
    icon: Sparkles,
    route: '/solutions/ai',
    deliverables: ['AI Leverage Audit', 'Campaign Sprint', 'Content Engine'],
    trust: 'Production in hours, not weeks',
    gradient: 'from-violet-500/15 via-purple-500/8 to-transparent',
    serviceCount: 6,
  },
  {
    id: 'branding',
    number: '02',
    title: 'Brand Systems',
    subtitle: 'Foundation',
    description: 'Identity infrastructure. Narrative precision. Visual inevitability. Complete brand ecosystems from logo to launch.',
    icon: Layers,
    route: '/solutions/branding',
    deliverables: ['Brand World', 'Identity System', 'Branding 360'],
    trust: 'Brands that feel inevitable',
    gradient: 'from-blue-500/15 via-cyan-500/8 to-transparent',
    serviceCount: 4,
  },
  {
    id: 'consultation',
    number: '03',
    title: 'Advisory',
    subtitle: 'Clarity',
    description: 'Clarity with a plan. From a single precision audit to full system simulation. Strategy you can execute today.',
    icon: Target,
    route: '/solutions/consultation',
    deliverables: ['Precision Audit', 'Strategy Build', 'Full Simulation'],
    trust: 'Strategy you can execute today',
    gradient: 'from-rose-500/15 via-pink-500/8 to-transparent',
    serviceCount: 3,
  },
];

// ── IMMERSIVE TEXTURE BACKGROUND ──
const ImmersiveTextureBg = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none z-0" aria-hidden>
      <motion.img
        src={solutionsBgTexture}
        alt=""
        loading="eager"
        decoding="async"
        draggable={false}
        style={{ scale, y }}
        className="absolute inset-0 w-full h-full object-cover opacity-[0.35]"
      />
      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-background/70" />
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-background to-transparent" />
      <NoiseTexture opacity={0.03} />
    </div>
  );
});
ImmersiveTextureBg.displayName = 'ImmersiveTextureBg';

// ── HERO ──
const HeroSection = memo(() => (
  <section className="relative min-h-[90vh] flex items-end pb-20 sm:pb-28 pt-32 sm:pt-40 overflow-hidden">
    {/* Floating ambient orbs */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-alchemy-red/6 rounded-full blur-[180px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-deep-crimson/5 rounded-full blur-[140px]"
        animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easing }}
        className="mb-6"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(220,38,38,0.08) 0%, rgba(220,38,38,0.02) 100%)',
            border: '1px solid rgba(220,38,38,0.15)',
          }}
        >
          <div className="w-1.5 h-1.5 bg-alchemy-red rounded-full animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-alchemy-red/80">
            Our Services
          </span>
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: easing }}
        className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] text-porcelain mb-6"
      >
        Three <span className="italic text-alchemy-red">Pillars</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: easing }}
        className="font-body text-base sm:text-lg md:text-xl text-porcelain/50 max-w-2xl font-light leading-relaxed mb-10"
      >
        Every brand challenge requires a different approach. We've engineered three —
        each a precision instrument built to compound.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap gap-3"
      >
        {['AI-Native', 'Founder-First', 'Outcome-Engineered'].map((tag) => (
          <span key={tag} className="font-mono text-[10px] sm:text-xs tracking-[0.15em] uppercase text-porcelain/35 border border-porcelain/8 rounded-full px-4 py-1.5">
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  </section>
));
HeroSection.displayName = 'HeroSection';

// ── PILLAR CARD ──
const PillarCard = memo(({ pillar, index }: { pillar: typeof pillars[0]; index: number }) => {
  const Icon = pillar.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: easing }}
    >
      <div
        className="group relative rounded-2xl overflow-hidden h-full transition-all duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Gradient hover bg */}
        <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
        
        {/* Inner glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 60px rgba(220,38,38,0.04)' }}
        />

        {/* Ghost number */}
        <span className="absolute -top-6 -right-2 font-display text-[120px] text-porcelain/[0.02] leading-none pointer-events-none select-none">
          {pillar.number}
        </span>

        <div className="relative z-10 p-7 sm:p-8 md:p-10 flex flex-col h-full">
          {/* Icon */}
          <div className="mb-5">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:shadow-[0_0_25px_rgba(220,38,38,0.2)] transition-shadow duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(220,38,38,0.1) 0%, rgba(220,38,38,0.03) 100%)',
                border: '1px solid rgba(220,38,38,0.2)',
              }}
            >
              <Icon className="w-5 h-5 text-alchemy-red" />
            </div>
          </div>

          {/* Label + Title */}
          <p className="font-mono text-[10px] text-alchemy-red/60 tracking-[0.2em] uppercase mb-2">
            Pillar {pillar.number} · {pillar.subtitle}
          </p>
          <h3 className="font-display text-2xl md:text-3xl italic text-porcelain mb-3 group-hover:text-alchemy-red transition-colors duration-300">
            {pillar.title}
          </h3>

          <p className="font-body text-sm text-porcelain/45 font-light leading-relaxed mb-5 flex-1">
            {pillar.description}
          </p>

          {/* Trust */}
          <p className="font-mono text-[10px] text-porcelain/25 uppercase tracking-wider mb-4">
            {pillar.trust}
          </p>

          {/* Deliverables preview */}
          <div className="mb-6 pt-4 border-t border-porcelain/5">
            <p className="font-mono text-[9px] text-alchemy-red/50 uppercase tracking-wider mb-2">
              Includes
            </p>
            <ul className="space-y-1.5">
              {pillar.deliverables.map((item, j) => (
                <li key={j} className="flex items-center gap-2 text-xs text-porcelain/45 font-light">
                  <span className="w-1 h-1 rounded-full bg-alchemy-red/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <Link
            to={pillar.route}
            className="inline-flex items-center gap-2 text-porcelain/55 group-hover:text-alchemy-red transition-colors duration-300"
          >
            <span className="font-body text-sm">Discover {pillar.serviceCount} Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
});
PillarCard.displayName = 'PillarCard';

// ── PILLARS GRID ──
const PillarsSection = memo(() => (
  <section className="relative py-8 sm:py-16">
    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
      <div className="grid md:grid-cols-3 gap-5 sm:gap-6 mb-16 sm:mb-20">
        {pillars.map((pillar, i) => (
          <PillarCard key={pillar.id} pillar={pillar} index={i} />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease: easing }}
        className="text-center"
      >
        <button
          type="button"
          onClick={openCalendly}
          className="gradient-border-glow-btn inline-flex items-center gap-3 px-8 py-4 rounded-xl font-body text-base text-porcelain transition-all duration-300 hover:text-white"
        >
          Book a Free 15-Min Consult
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center gap-3 mt-5">
          <span className="font-mono text-[10px] text-porcelain/30 tracking-wider">NDA available</span>
          <span className="text-porcelain/15">·</span>
          <span className="font-mono text-[10px] text-porcelain/30 tracking-wider">24h reply</span>
          <span className="text-porcelain/15">·</span>
          <span className="font-mono text-[10px] text-porcelain/30 tracking-wider">Free first call</span>
        </div>
      </motion.div>
    </div>
  </section>
));
PillarsSection.displayName = 'PillarsSection';

// ── PAGE ──
export const SolutionsHub = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Services — Alchemy Labs"
      description="AI Advisory, Brand Systems, and Strategic Consulting. Three pillars built for brands that refuse to move slowly."
      structuredData={generateOrganizationSchema()}
    />
    <Navigation />
    <ImmersiveTextureBg />
    <div className="relative z-10">
      <HeroSection />
      <PillarsSection />
    </div>
    <Footer />
  </div>
);

export default SolutionsHub;
