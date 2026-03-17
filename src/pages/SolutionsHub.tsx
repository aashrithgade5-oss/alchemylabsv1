import { memo, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Zap, Layers, Target, ChevronDown, CheckCircle2, Users, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SEOHead, generateOrganizationSchema } from '@/components/SEOHead';
import { NoiseTexture } from '@/components/effects';
import { SequentianBackground } from '@/components/SequentianBackground';
import heroVideo from '@/assets/about-hero-red-curves.mp4';

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

// ── DYNAMIC RED/BLACK GRADIENT BACKGROUND ──
const DynamicBackground = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.08, 0.15, 0.12, 0.06]);

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none z-0" aria-hidden>
      {/* Deep black base */}
      <div className="absolute inset-0" style={{ background: '#060606' }} />
      
      {/* Dynamic red/black gradient mesh */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: glowOpacity }}
      >
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 30%, rgba(200,57,43,0.2) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 70%, rgba(220,38,38,0.15) 0%, transparent 55%),
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,0,0,0.08) 0%, transparent 70%)
          `,
        }} />
      </motion.div>

      {/* Subtle animated glow pulse */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse 50% 40% at 30% 40%, rgba(200,57,43,0.06) 0%, transparent 60%)',
            'radial-gradient(ellipse 50% 40% at 70% 60%, rgba(200,57,43,0.06) 0%, transparent 60%)',
            'radial-gradient(ellipse 50% 40% at 30% 40%, rgba(200,57,43,0.06) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      {/* Noise grain */}
      <NoiseTexture opacity={0.035} />
      
      {/* Bottom fade to background */}
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
});
DynamicBackground.displayName = 'DynamicBackground';

// ── HERO ──
const HeroSection = memo(() => {
  const [videoReady, setVideoReady] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative min-h-[100svh] flex flex-col justify-end pb-16 sm:pb-24 pt-32 sm:pt-40 overflow-hidden">
      {/* Video background + sequentian layer */}
      <motion.video
        src={heroVideo}
        autoPlay muted loop playsInline
        preload="metadata"
        onCanPlay={() => setVideoReady(true)}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: videoReady ? 0.15 : 0 }}
        transition={{ duration: 1.5, ease: EASE }}
      />

      {/* Heavy dark overlay for contrast */}
      <div className="absolute inset-0" style={{
        background: `
          linear-gradient(180deg, rgba(6,6,6,0.7) 0%, rgba(6,6,6,0.3) 40%, rgba(6,6,6,0.4) 70%, rgba(6,6,6,0.9) 100%),
          radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,57,43,0.08) 0%, transparent 60%)
        `,
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12 w-full">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 bg-alchemy-red rounded-full animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-porcelain/50">
              Our Solutions
            </span>
          </span>
        </motion.div>

        {/* Title — large editorial */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
          className="mb-8"
        >
          <span className="block font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] leading-[0.9] text-porcelain tracking-tight">
            Three
          </span>
          <span className="block font-display italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] leading-[0.9] text-alchemy-red tracking-tight"
            style={{ textShadow: '0 0 60px rgba(200,57,43,0.3)' }}>
            Pillars.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="font-body text-base sm:text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-12 text-porcelain/50"
        >
          Every brand challenge demands a different instrument.
          We've engineered three — each built to compound.
        </motion.p>

        {/* Tag pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap gap-3 mb-16"
        >
          {['AI-NATIVE', 'FOUNDER-FIRST', 'OUTCOME-ENGINEERED'].map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] uppercase px-4 py-2 rounded-full transition-all duration-300 hover:tracking-[0.2em] text-porcelain/40 hover:text-porcelain/60"
              style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-mono text-[9px] text-porcelain/25 tracking-[0.2em] uppercase">Explore</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-4 h-4 text-alchemy-red/40" />
        </motion.div>
      </motion.div>
    </section>
  );
});
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
            perspective: '900px',
            transformStyle: 'preserve-3d' as const,
            background: isHovered ? 'rgba(20,20,20,0.95)' : 'rgba(15,15,15,0.9)',
            border: isHovered ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(255,255,255,0.06)',
            borderLeft: isHovered ? '4px solid hsl(var(--alchemy-red))' : '4px solid transparent',
            transform: isHovered ? 'perspective(900px) rotateX(-2deg) rotateY(3deg) translateY(-4px) scale(1.015)' : 'translateY(0)',
            boxShadow: isHovered ? '0 24px 48px rgba(0,0,0,0.5), 0 0 40px rgba(200,57,43,0.12)' : '0 4px 12px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(12px)',
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
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(200,57,43,0.15)' }}>
                <Icon className="w-[18px] h-[18px] text-alchemy-red" />
              </div>
            </div>

            {/* Label */}
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-3 text-porcelain/35">
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
            <p className="font-body text-sm font-light leading-relaxed mb-6 flex-1 text-porcelain/45">
              {pillar.body}
            </p>

            {/* Divider */}
            <div className="w-full h-px mb-5" style={{ background: 'rgba(255,255,255,0.06)' }} />

            {/* Includes */}
            <div className="mb-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-3 text-porcelain/20">Includes</p>
              <ul className="space-y-2">
                {pillar.includes.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2.5 font-mono text-xs transition-transform duration-200 text-porcelain/50"
                    style={{
                      transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
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
                  <span className="absolute bottom-0 left-0 h-px bg-alchemy-red transition-all duration-300"
                    style={{ width: isHovered ? '100%' : '0%' }} />
                </span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300"
                  style={{ transform: isHovered ? 'translateX(4px)' : 'translateX(0)' }} />
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
  <section className="relative py-8 sm:py-16">
    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        <div className="lg:col-span-7">
          <PillarCard pillar={pillars[0]} index={0} size="large" />
        </div>
        <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
          <PillarCard pillar={pillars[1]} index={1} size="medium" />
          <PillarCard pillar={pillars[2]} index={2} size="medium" />
        </div>
      </div>
    </div>
  </section>
));
PillarsBento.displayName = 'PillarsBento';

// ── WHY ALCHEMY SECTION ──
const whyPoints = [
  { icon: Clock, title: '24h to Live', desc: 'From sprint call to first deliverable in under a day.' },
  { icon: Shield, title: 'NDA Protected', desc: 'Every engagement is confidential by default.' },
  { icon: Users, title: 'Founder-First', desc: 'Direct access to senior strategists. No account managers.' },
  { icon: CheckCircle2, title: 'Outcome-Engineered', desc: 'We don\'t bill for hours. We deliver results.' },
];

const WhySection = memo(() => (
  <section className="relative py-20 sm:py-32 overflow-hidden">
    <SequentianBackground variant={2} opacity={0.2} parallax scaleEnd={1.08} glow={false} />
    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mb-16"
      >
        <p className="font-mono text-[10px] sm:text-xs text-alchemy-red/60 tracking-[0.25em] uppercase mb-4">Why Us</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-porcelain leading-tight">
          Built different.<br />
          <span className="italic text-alchemy-red">By design.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {whyPoints.map((point, i) => {
          const Icon = point.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              className="rounded-xl p-6 sm:p-8 transition-all duration-300 hover:translate-y-[-2px] group"
              style={{
                background: 'rgba(15,15,15,0.8)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                style={{ background: 'rgba(200,57,43,0.1)' }}>
                <Icon className="w-[18px] h-[18px] text-alchemy-red/70 group-hover:text-alchemy-red transition-colors" />
              </div>
              <h3 className="font-body text-base font-semibold text-porcelain mb-2">{point.title}</h3>
              <p className="font-body text-sm text-porcelain/40 font-light leading-relaxed">{point.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
));
WhySection.displayName = 'WhySection';

// ── PROCESS STRIP ──
const processSteps = [
  { step: '01', title: 'Sprint Call', desc: '15-min discovery to align vision and scope.' },
  { step: '02', title: 'System Map', desc: 'We architect the strategy, timeline, and deliverables.' },
  { step: '03', title: 'Build & Iterate', desc: 'Rapid execution with real-time feedback loops.' },
  { step: '04', title: 'Deploy', desc: 'Launch-ready assets, systems, and documentation.' },
];

const ProcessStrip = memo(() => (
  <section className="relative py-20 sm:py-28 overflow-hidden">
    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mb-16"
      >
        <p className="font-mono text-[10px] sm:text-xs text-alchemy-red/60 tracking-[0.25em] uppercase mb-4">How It Works</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-porcelain">
          Four steps to{' '}
          <span className="italic text-alchemy-red">launch.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.04)' }}>
        {processSteps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
            className="relative p-8 sm:p-10"
            style={{ background: 'rgba(10,10,10,0.95)' }}
          >
            <span className="font-display text-5xl sm:text-6xl text-porcelain/[0.04] absolute top-4 right-6 leading-none select-none">
              {s.step}
            </span>
            <span className="font-mono text-[10px] text-alchemy-red/50 tracking-[0.2em] uppercase block mb-4">
              Step {s.step}
            </span>
            <h3 className="font-body text-lg font-semibold text-porcelain mb-2">{s.title}</h3>
            <p className="font-body text-sm text-porcelain/40 font-light leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));
ProcessStrip.displayName = 'ProcessStrip';

// ── EDITORIAL QUOTE ──
const EditorialQuote = memo(() => (
  <section className="relative py-20 sm:py-32 overflow-hidden">
    <SequentianBackground variant={4} opacity={0.2} parallax scaleEnd={1.06} glow={false} />
    <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 md:px-12 text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE }}
      >
        <div className="w-16 h-px mx-auto mb-10 bg-gradient-to-r from-transparent via-alchemy-red/40 to-transparent" />
        <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic text-porcelain/80 leading-[1.3] mb-10 text-balance">
          "We don't build brands that blend in.{' '}
          <span className="text-alchemy-red">We build brands that feel inevitable.</span>"
        </blockquote>
        <p className="font-mono text-[10px] text-porcelain/30 tracking-[0.2em] uppercase">
          — Alchemy Labs Manifesto
        </p>
      </motion.div>
    </div>
  </section>
));
EditorialQuote.displayName = 'EditorialQuote';

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
          background: 'rgba(15,15,15,0.9)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl italic text-porcelain mb-3">
              Ready to build something{' '}
              <span className="text-alchemy-red">inevitable</span>?
            </h2>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-porcelain/25">NDA available</span>
              <span className="text-porcelain/12">·</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-porcelain/25">24h reply</span>
              <span className="text-porcelain/12">·</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-porcelain/25">Free first call</span>
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
    <DynamicBackground />
    <div className="relative z-10">
      <HeroSection />
      <PillarsBento />
      <WhySection />
      <ProcessStrip />
      <EditorialQuote />
      <BottomCTA />
    </div>
    <Footer />
  </div>
);

export default SolutionsHub;
