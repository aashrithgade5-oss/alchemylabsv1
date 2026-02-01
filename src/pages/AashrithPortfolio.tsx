import { memo, useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Linkedin, Mail, Calendar, Menu, X, ChevronDown, Send } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import { aashrithData } from '@/data/foundersData';
import { portfolioProjects, serviceOfferings } from '@/data/portfolioProjects';
import {
  SectionShell,
  EyebrowLabel,
  GlassCard,
  MagneticCTA,
  MarqueeRow,
  LightboxModal,
  LightboxItem,
  TimelineRail,
  TimelineEntry,
  BackgroundScene,
} from '@/components/portfolio';

// ============================================
// NAVIGATION
// ============================================
const PortfolioNav = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#thinking' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-4 sm:py-6'
      }`}
      style={{
        background: scrolled ? 'rgba(10,10,10,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm font-bold text-porcelain"
            style={{
              background: 'linear-gradient(135deg, rgba(220,38,38,0.2) 0%, rgba(220,38,38,0.05) 100%)',
              border: '1px solid rgba(220,38,38,0.3)',
            }}
          >
            AG
          </div>
          <Link
            to="/about"
            className="flex items-center gap-2 text-porcelain/50 hover:text-porcelain transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-xs tracking-wider hidden sm:inline">ALCHEMY LABS</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm text-porcelain/60 hover:text-porcelain transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-alchemy-red group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-full hover:bg-white/5 transition-colors"
        >
          {isOpen ? <X className="w-5 h-5 text-porcelain" /> : <Menu className="w-5 h-5 text-porcelain" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-alchemy-black/98 backdrop-blur-xl border-t border-white/5"
          >
            <div className="p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block font-body text-lg text-porcelain/80 hover:text-alchemy-red transition-colors"
                >
                  {link.label}
                </a>
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
// SECTION 1: HERO
// ============================================
const HeroSection = memo(() => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-start overflow-hidden">
      {/* Background orb */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/4 w-[600px] h-[400px] rounded-full opacity-50"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(220,38,38,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <EyebrowLabel className="mb-6">
            FOUNDER · BRAND ARCHITECT · CREATIVE DIRECTION · AI-NATIVE
          </EyebrowLabel>
        </motion.div>

        {/* Main headline with blur-to-crisp reveal */}
        <motion.h1
          className="font-display text-[clamp(3rem,6vw,6rem)] leading-[1.05] tracking-tight text-porcelain mb-6"
          initial={{ opacity: 0, filter: 'blur(12px)', y: 40 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          Aashrith Gade
          <br />
          <span className="font-display italic text-alchemy-red">
            Designing brands as systems,
          </span>
          <br />
          <span className="text-porcelain/60">not campaigns.</span>
        </motion.h1>

        {/* Subcopy */}
        <motion.p
          className="font-body text-base sm:text-lg text-porcelain/60 max-w-2xl mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Founder of Brand Alchemy, Ashzz.ai, and Alchemy Labs—building AI-native brand systems
          with luxury-grade taste and long-term strategic intent.
        </motion.p>

        {/* Proof strip - 3 glass mini cards */}
        <motion.div
          className="flex flex-wrap gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {['Founder-Led Execution', 'AI-Native Systems', 'Luxury Positioning'].map((proof, i) => (
            <motion.div
              key={proof}
              className="px-4 py-3 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
            >
              <span className="font-mono text-xs text-porcelain/70 tracking-wide">{proof}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <MagneticCTA href="#work" variant="primary" size="lg">
            View Selected Work
          </MagneticCTA>
          <MagneticCTA href="#contact" variant="secondary" size="lg">
            Book a Strategy Sprint
          </MagneticCTA>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-6 h-6 text-alchemy-red/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});
HeroSection.displayName = 'HeroSection';

// ============================================
// SECTION 2: THINKING SYSTEM
// ============================================
const ThinkingSection = memo(() => {
  return (
    <SectionShell id="thinking" className="bg-alchemy-black" padding="xl">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <motion.h2
            className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.15] text-porcelain mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-alchemy-red italic">Brand</span> is infrastructure.
            <br />
            <span className="text-alchemy-red italic">AI</span> is leverage.
            <br />
            <span className="text-alchemy-red italic">Taste</span> is the constraint.
          </motion.h2>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              'Strategy → Narrative → Design → Execution',
              'Speed without taste is noise',
              'Systems compound. Campaigns expire.',
            ].map((bullet, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-alchemy-red mt-2.5 flex-shrink-0" />
                <p className="font-body text-lg text-porcelain/70">{bullet}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Abstract node diagram */}
        <motion.div
          className="relative h-80 lg:h-96"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <svg className="w-full h-full" viewBox="0 0 400 300">
            {/* Connections */}
            <motion.path
              d="M100,150 Q200,80 300,150"
              stroke="rgba(220,38,38,0.3)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            <motion.path
              d="M100,150 Q200,220 300,150"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.7 }}
            />
            <motion.path
              d="M200,50 L200,250"
              stroke="rgba(220,38,38,0.2)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.9 }}
            />
            {/* Nodes */}
            {[
              { cx: 100, cy: 150, r: 8, delay: 0.6 },
              { cx: 200, cy: 50, r: 6, delay: 0.8 },
              { cx: 200, cy: 150, r: 10, delay: 1 },
              { cx: 200, cy: 250, r: 6, delay: 1.2 },
              { cx: 300, cy: 150, r: 8, delay: 1.4 },
            ].map((node, i) => (
              <motion.circle
                key={i}
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill="rgba(220,38,38,0.8)"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: node.delay }}
              />
            ))}
          </svg>
          {/* Slow drift effect */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </SectionShell>
  );
});
ThinkingSection.displayName = 'ThinkingSection';

// ============================================
// SECTION 3: VENTURES
// ============================================
const VenturesSection = memo(() => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const ventures = [
    {
      id: 'brand-alchemy',
      name: 'Brand Alchemy',
      type: 'Thought Leadership IP',
      oneLiner: 'Branding + marketing systems, value content, long-term brand value.',
      details: aashrithData.ventures?.find((v) => v.name === 'Brand Alchemy'),
    },
    {
      id: 'ashzz',
      name: 'Ashzz.ai',
      type: 'AI-native community',
      oneLiner: '3.8K+ GenAI builders and enthusiasts; value-based content and Discord-led learning.',
      details: aashrithData.ventures?.find((v) => v.name === 'Ashzz.ai'),
    },
    {
      id: 'alchemy-labs',
      name: 'Alchemy Labs',
      type: 'Founder-led studio',
      oneLiner: 'AI branding, product builds, advisory—no agency bloat.',
      roleNote: 'Founder, CEO, Head of Design & Project Execution.',
      details: aashrithData.ventures?.find((v) => v.name === 'Alchemy Labs'),
    },
  ];

  return (
    <SectionShell id="about" padding="xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <EyebrowLabel className="mb-4">VENTURES</EyebrowLabel>
        <h2 className="font-display text-3xl sm:text-4xl text-porcelain">Building in Public</h2>
      </motion.div>

      <div className="space-y-4">
        {ventures.map((venture, i) => (
          <motion.div
            key={venture.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard
              variant="subtle"
              padding="lg"
              className="cursor-pointer"
              onClick={() => setExpandedId(expandedId === venture.id ? null : venture.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-body font-semibold text-xl text-porcelain">{venture.name}</h3>
                    <span className="font-mono text-xs text-alchemy-red/70 tracking-wide uppercase">
                      {venture.type}
                    </span>
                  </div>
                  <p className="font-body text-base text-porcelain/60">{venture.oneLiner}</p>
                  {venture.roleNote && (
                    <p className="font-mono text-xs text-porcelain/40 mt-2">{venture.roleNote}</p>
                  )}
                </div>
                <motion.div
                  animate={{ rotate: expandedId === venture.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-porcelain/40" />
                </motion.div>
              </div>

              <AnimatePresence>
                {expandedId === venture.id && venture.details && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 mt-6 border-t border-white/5">
                      <p className="font-body text-sm text-porcelain/70 mb-4">
                        {venture.details.description}
                      </p>
                      {venture.details.outputs && (
                        <div className="flex flex-wrap gap-2">
                          {venture.details.outputs.map((output) => (
                            <span
                              key={output}
                              className="px-3 py-1 rounded-full text-xs font-mono text-alchemy-red/80 bg-alchemy-red/10 border border-alchemy-red/20"
                            >
                              {output}
                            </span>
                          ))}
                        </div>
                      )}
                      {venture.details.capabilities && (
                        <div className="flex flex-wrap gap-2">
                          {venture.details.capabilities.map((cap) => (
                            <span
                              key={cap}
                              className="px-3 py-1 rounded-full text-xs font-mono text-porcelain/60 bg-white/5 border border-white/10"
                            >
                              {cap}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
});
VenturesSection.displayName = 'VenturesSection';

// ============================================
// SECTION 4: SELECTED WORK (Marquee Gallery)
// ============================================
const WorkGallerySection = memo(() => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const row1 = portfolioProjects.slice(0, 4);
  const row2 = portfolioProjects.slice(4, 8);
  const row3 = portfolioProjects.slice(8, 12);

  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((i) => (i + 1) % portfolioProjects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((i) => (i - 1 + portfolioProjects.length) % portfolioProjects.length);
  };

  const ProjectTile = ({ project, index }: { project: LightboxItem; index: number }) => {
    const [hovered, setHovered] = useState(false);

    return (
      <motion.div
        className="relative flex-shrink-0 w-72 sm:w-80 aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => handleOpen(index)}
        style={{
          filter: hovered ? 'none' : 'brightness(0.7) saturate(0.8)',
        }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4 }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <EyebrowLabel color="muted" className="mb-2">
            {project.category}
          </EyebrowLabel>
          <h4 className="font-display text-lg text-porcelain mb-1">{project.title}</h4>
          <span className="font-mono text-xs text-alchemy-red tracking-wider uppercase">VIEW</span>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section id="work" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <EyebrowLabel className="mb-4">SELECTED WORK</EyebrowLabel>
          <h2 className="font-display text-3xl sm:text-4xl text-porcelain">Moving Archive</h2>
        </motion.div>
      </div>

      {/* Marquee rows */}
      <div className="space-y-6">
        <MarqueeRow speed="slow" gap={24}>
          {row1.map((project, i) => (
            <ProjectTile key={project.id} project={project} index={i} />
          ))}
        </MarqueeRow>

        <MarqueeRow direction="right" speed="medium" gap={24}>
          {row2.map((project, i) => (
            <ProjectTile key={project.id} project={project} index={i + 4} />
          ))}
        </MarqueeRow>

        <MarqueeRow speed="fast" gap={24}>
          {row3.map((project, i) => (
            <ProjectTile key={project.id} project={project} index={i + 8} />
          ))}
        </MarqueeRow>
      </div>

      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        item={portfolioProjects[currentIndex]}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={currentIndex < portfolioProjects.length - 1}
        hasPrev={currentIndex > 0}
      />
    </section>
  );
});
WorkGallerySection.displayName = 'WorkGallerySection';

// ============================================
// SECTION 5: EXPERIENCE
// ============================================
const ExperienceSection = memo(() => {
  const timelineEntries: TimelineEntry[] = [
    {
      id: 'alchemy-labs',
      title: 'Founder & CEO',
      company: 'Brand Alchemy / Alchemy Labs',
      dates: '2024 - Present',
      revenueSignal: '~$9,000+ generated within 6 months across 6+ client engagements',
      highlights: [
        'Founded AI-native creative studio focused on brand architecture',
        'Built and scaled AI-native branding ventures',
        'Led end-to-end strategy, design, and execution',
      ],
    },
    {
      id: 'cipla',
      title: 'Marketing & Sales Intern',
      company: 'Cipla',
      dates: '2022 - 2023',
      highlights: [
        'Supported product marketing initiatives',
        'Gained exposure to healthcare marketing systems',
      ],
    },
    {
      id: 's8ul',
      title: 'Editor & Social Media Manager',
      company: 'S8UL Esports',
      dates: '2021 - 2022',
      highlights: [
        'Content strategy and editing',
        'Contributed to content across a 13M+ audience ecosystem',
      ],
    },
    {
      id: 'velocity',
      title: 'Branding & Social Media Manager',
      company: 'Velocity Gaming',
      dates: '2020 - 2021',
      highlights: [
        'Scaled Instagram from 5K to 40K in 10 weeks',
        'Designed consistent visual and narrative systems',
      ],
    },
  ];

  return (
    <SectionShell id="experience" padding="xl" maxWidth="lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <EyebrowLabel className="mb-4">EXPERIENCE</EyebrowLabel>
        <h2 className="font-display text-3xl sm:text-4xl text-porcelain">Credibility Rail</h2>
      </motion.div>

      <TimelineRail entries={timelineEntries} />
    </SectionShell>
  );
});
ExperienceSection.displayName = 'ExperienceSection';

// ============================================
// SECTION 6: WORK WITH ME (Offerings)
// ============================================
const OfferingsSection = memo(() => {
  return (
    <SectionShell padding="xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <EyebrowLabel className="mb-4">WORK WITH ME</EyebrowLabel>
        <h2 className="font-display text-3xl sm:text-4xl text-porcelain">
          Services & Engagement Models
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {serviceOfferings.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard variant="elevated" padding="lg" className="h-full flex flex-col">
              <h3 className="font-body font-semibold text-xl text-porcelain mb-2">
                {service.title}
              </h3>
              <p className="font-body text-sm text-porcelain/60 mb-6">{service.promise}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-porcelain/70">
                    <span className="text-alchemy-red mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <MagneticCTA href={`#contact?service=${service.id}`} variant="secondary" size="sm">
                Book Sprint
              </MagneticCTA>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
});
OfferingsSection.displayName = 'OfferingsSection';

// ============================================
// SECTION 7: CONTACT
// ============================================
const ContactSection = memo(() => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    project: '',
    need: '',
    vision: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
  };

  return (
    <SectionShell id="contact" padding="xl" maxWidth="lg">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-porcelain mb-4">
          Let's build something <span className="italic text-alchemy-red">inevitable.</span>
        </h2>
        <p className="font-body text-sm text-porcelain/50">
          Free first call · Reply within 24h · NDA available
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-xs text-porcelain/50 mb-2 tracking-wide uppercase">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="glass-input w-full"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-porcelain/50 mb-2 tracking-wide uppercase">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="glass-input w-full"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-xs text-porcelain/50 mb-2 tracking-wide uppercase">
                  Project (optional)
                </label>
                <input
                  type="text"
                  value={formState.project}
                  onChange={(e) => setFormState({ ...formState, project: e.target.value })}
                  className="glass-input w-full"
                  placeholder="Project or company name"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-porcelain/50 mb-2 tracking-wide uppercase">
                  Need *
                </label>
                <select
                  required
                  value={formState.need}
                  onChange={(e) => setFormState({ ...formState, need: e.target.value })}
                  className="glass-input select-dropdown w-full"
                >
                  <option value="">Select an option</option>
                  <option value="ai-branding">AI Branding Studio</option>
                  <option value="branding-systems">Branding Systems</option>
                  <option value="advisory">Founder Advisory</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-porcelain/50 mb-2 tracking-wide uppercase">
                Vision (max 500 chars)
              </label>
              <textarea
                value={formState.vision}
                onChange={(e) => setFormState({ ...formState, vision: e.target.value.slice(0, 500) })}
                className="glass-input w-full h-32 resize-none"
                placeholder="Tell me about your project..."
                maxLength={500}
              />
              <span className="font-mono text-xs text-porcelain/30 mt-1 block text-right">
                {formState.vision.length}/500
              </span>
            </div>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <MagneticCTA type="submit" variant="primary" size="lg">
                <Send className="w-4 h-4 mr-2" />
                Send Brief
              </MagneticCTA>
              <MagneticCTA
                href={aashrithData.contact.calendly || '#'}
                variant="secondary"
                size="lg"
                icon={false}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book a Call Instead
              </MagneticCTA>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-alchemy-red/20 border border-alchemy-red/40 flex items-center justify-center mx-auto mb-6">
              <Send className="w-6 h-6 text-alchemy-red" />
            </div>
            <h3 className="font-display text-2xl text-porcelain mb-2">Brief received.</h3>
            <p className="font-body text-porcelain/60">I'll be in touch within 24 hours.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social links */}
      <motion.div
        className="flex items-center justify-center gap-4 mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <a
          href={aashrithData.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-alchemy-red/30 hover:bg-alchemy-red/10 transition-colors"
        >
          <Linkedin className="w-5 h-5 text-porcelain/70" />
        </a>
        <a
          href={`mailto:${aashrithData.contact.email}`}
          className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-alchemy-red/30 hover:bg-alchemy-red/10 transition-colors"
        >
          <Mail className="w-5 h-5 text-porcelain/70" />
        </a>
        <a
          href={aashrithData.contact.calendly || '#'}
          className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-alchemy-red/30 hover:bg-alchemy-red/10 transition-colors"
        >
          <Calendar className="w-5 h-5 text-porcelain/70" />
        </a>
      </motion.div>
    </SectionShell>
  );
});
ContactSection.displayName = 'ContactSection';

// ============================================
// MAIN PAGE COMPONENT
// ============================================
const AashrithPortfolio = () => {
  return (
    <>
      <SEOHead
        title="Aashrith Gade — Brand Architect & AI-Native Strategist"
        description="Designing brands as systems, not campaigns. Founder of Alchemy Labs, Brand Alchemy, and Ashzz.ai. AI-native brand systems with luxury-grade taste."
      />

      <BackgroundScene mode="hero" />

      <div className="relative z-10 min-h-screen bg-transparent text-porcelain">
        <PortfolioNav />
        <HeroSection />
        <ThinkingSection />
        <VenturesSection />
        <WorkGallerySection />
        <ExperienceSection />
        <OfferingsSection />
        <ContactSection />

        {/* Footer credibility line */}
        <footer className="py-8 text-center border-t border-white/5">
          <p className="font-mono text-xs text-porcelain/40 tracking-wide">
            Founder-led. Systems-driven. Outcome-obsessed.
          </p>
        </footer>
      </div>
    </>
  );
};

export default AashrithPortfolio;
