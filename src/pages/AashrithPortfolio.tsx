import { memo, useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Linkedin, Mail, Calendar, Menu, X, ChevronDown, Send, Sun, Moon } from 'lucide-react';
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
import { BlueprintGrid, NoiseTexture } from '@/components/effects';
import { AnimatedCapabilities } from '@/components/effects/AnimatedCapabilities';

// ============================================
// THEME HELPERS
// ============================================
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
        background: scrolled ? t(isDark, 'rgba(10,10,10,0.9)', 'rgba(250,250,249,0.9)') : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? `1px solid ${t(isDark, 'rgba(255,255,255,0.05)', 'rgba(0,0,0,0.05)')}` : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm font-bold ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}
            style={{
              background: 'linear-gradient(135deg, rgba(220,38,38,0.2) 0%, rgba(220,38,38,0.05) 100%)',
              border: '1px solid rgba(220,38,38,0.3)',
            }}
          >
            AG
          </div>
          <Link
            to="/about"
            className={`flex items-center gap-2 ${t(isDark, 'text-porcelain/50 hover:text-porcelain', 'text-neutral-500 hover:text-neutral-900')} transition-colors`}
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
              className={`font-body text-sm ${t(isDark, 'text-porcelain/60 hover:text-porcelain', 'text-neutral-600 hover:text-neutral-900')} transition-colors relative group`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-alchemy-red group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${t(isDark, 'hover:bg-white/5', 'hover:bg-black/5')} transition-colors`}
          >
            {isDark ? <Sun className="w-4 h-4 text-porcelain/60" /> : <Moon className="w-4 h-4 text-neutral-600" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-full ${t(isDark, 'hover:bg-white/5', 'hover:bg-black/5')} transition-colors`}
          >
            {isOpen ? <X className={`w-5 h-5 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`} /> : <Menu className={`w-5 h-5 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden absolute top-full left-0 right-0 ${t(isDark, 'bg-[#0a0a0a]/98', 'bg-[#fafaf9]/98')} backdrop-blur-xl border-t ${t(isDark, 'border-white/5', 'border-black/5')}`}
          >
            <div className="p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block font-body text-lg ${t(isDark, 'text-porcelain/80', 'text-neutral-700')} hover:text-alchemy-red transition-colors`}
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
// SECTION 1: HERO — Bold Uppercase Name
// ============================================
const HeroSection = memo(({ isDark }: { isDark: boolean }) => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Blueprint grid overlay */}
      <BlueprintGrid opacity={isDark ? 0.04 : 0.02} />
      <NoiseTexture opacity={isDark ? 0.04 : 0.02} />

      {/* Background orb */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/4 w-[600px] h-[400px] rounded-full opacity-50"
          animate={{ scale: [1, 1.1, 1], x: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: `radial-gradient(ellipse at center, ${isDark ? 'rgba(220,38,38,0.08)' : 'rgba(220,38,38,0.05)'} 0%, transparent 70%)`,
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Technical labels */}
      <div className={`absolute top-20 right-6 sm:right-8 font-mono text-[10px] ${t(isDark, 'text-alchemy-red/30', 'text-alchemy-red/20')} hidden lg:block`}>
        <div className="space-y-1">
          <div className="flex items-center justify-end gap-2">
            <span>PORTFOLIO.INIT</span>
            <div className="w-1.5 h-1.5 bg-alchemy-red rounded-full animate-pulse" />
          </div>
          <div className={`text-right ${t(isDark, 'text-porcelain/20', 'text-neutral-300')}`}>v1.0.0</div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className={`font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] ${t(isDark, 'text-alchemy-red/70', 'text-alchemy-red/60')}`}>
            Creative Director · Brand Architect · AI-Native
          </span>
        </motion.div>

        {/* Main headline — BOLD UPPERCASE on single line */}
        <motion.h1
          className="mb-6"
          initial={{ opacity: 0, filter: 'blur(12px)', y: 40 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={`block font-body font-black text-[4rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] xl:text-[10rem] uppercase leading-[0.85] tracking-[-0.03em] ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
            AASHRITH
          </span>
          <span className={`block font-body font-black text-[4rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] xl:text-[10rem] uppercase leading-[0.85] tracking-[-0.03em] bg-gradient-to-r from-alchemy-red via-alchemy-pink to-alchemy-red bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient`}>
            GADE
          </span>
        </motion.h1>

        {/* Animated rotating capabilities */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-6"
        >
          <AnimatedCapabilities />
        </motion.div>

        {/* Subcopy */}
        <motion.p
          className={`font-body text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed ${t(isDark, 'text-porcelain/50', 'text-neutral-500')}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Founder of Brand Alchemy, Ashzz.ai, and Alchemy Labs—building AI-native brand systems
          with luxury-grade taste and long-term strategic intent.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <MagneticCTA href="#work" variant="primary" size="lg">
            View Selected Work
          </MagneticCTA>
          <MagneticCTA href="#contact" variant="secondary" size="lg">
            Book a Strategy Sprint
          </MagneticCTA>
        </motion.div>

        {/* Technical metadata */}
        <motion.div
          className={`flex justify-center gap-6 font-mono text-[10px] sm:text-xs ${t(isDark, 'text-porcelain/30', 'text-neutral-400')}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <span>Mumbai, IN</span>
          <span>·</span>
          <span>EST. 2024</span>
          <span>·</span>
          <span>50+ Projects</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-px h-10 sm:h-12 bg-gradient-to-b from-transparent via-alchemy-red/60 to-transparent"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className={`font-mono text-[9px] uppercase tracking-widest ${t(isDark, 'text-porcelain/40', 'text-neutral-400')}`}>Scroll</span>
      </motion.div>
    </section>
  );
});
HeroSection.displayName = 'HeroSection';

// ============================================
// SECTION 2: THINKING SYSTEM
// ============================================
const ThinkingSection = memo(({ isDark }: { isDark: boolean }) => {
  return (
    <SectionShell id="thinking" className={t(isDark, 'bg-alchemy-black', 'bg-[#fafaf9]')} padding="xl">
      {/* Blueprint overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <BlueprintGrid opacity={isDark ? 0.02 : 0.01} />
      </div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <motion.h2
            className={`font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.15] mb-8 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}
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
                <p className={`font-body text-lg ${t(isDark, 'text-porcelain/70', 'text-neutral-600')}`}>{bullet}</p>
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
            <motion.path
              d="M100,150 Q200,80 300,150"
              stroke={isDark ? 'rgba(220,38,38,0.3)' : 'rgba(220,38,38,0.2)'}
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            <motion.path
              d="M100,150 Q200,220 300,150"
              stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.7 }}
            />
            <motion.path
              d="M200,50 L200,250"
              stroke={isDark ? 'rgba(220,38,38,0.2)' : 'rgba(220,38,38,0.15)'}
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.9 }}
            />
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
        </motion.div>
      </div>
    </SectionShell>
  );
});
ThinkingSection.displayName = 'ThinkingSection';

// ============================================
// SECTION 3: VENTURES
// ============================================
const VenturesSection = memo(({ isDark }: { isDark: boolean }) => {
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
    <SectionShell id="about" className={t(isDark, '', 'bg-[#fafaf9]')} padding="xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <EyebrowLabel className="mb-4">VENTURES</EyebrowLabel>
        <h2 className={`font-display text-3xl sm:text-4xl ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>Building in Public</h2>
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
            <div
              className={`rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 ${
                isDark
                  ? 'bg-white/[0.03] border border-white/[0.06] hover:border-alchemy-red/20'
                  : 'bg-white border border-neutral-200 hover:border-alchemy-red/30 shadow-sm'
              }`}
              onClick={() => setExpandedId(expandedId === venture.id ? null : venture.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`font-body font-semibold text-xl ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>{venture.name}</h3>
                    <span className="font-mono text-xs text-alchemy-red/70 tracking-wide uppercase">
                      {venture.type}
                    </span>
                  </div>
                  <p className={`font-body text-base ${t(isDark, 'text-porcelain/60', 'text-neutral-500')}`}>{venture.oneLiner}</p>
                  {venture.roleNote && (
                    <p className={`font-mono text-xs mt-2 ${t(isDark, 'text-porcelain/40', 'text-neutral-400')}`}>{venture.roleNote}</p>
                  )}
                </div>
                <motion.div
                  animate={{ rotate: expandedId === venture.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className={`w-5 h-5 ${t(isDark, 'text-porcelain/40', 'text-neutral-400')}`} />
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
                    <div className={`pt-6 mt-6 border-t ${t(isDark, 'border-white/5', 'border-neutral-100')}`}>
                      <p className={`font-body text-sm mb-4 ${t(isDark, 'text-porcelain/70', 'text-neutral-600')}`}>
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
                        <div className="flex flex-wrap gap-2 mt-2">
                          {venture.details.capabilities.map((cap) => (
                            <span
                              key={cap}
                              className={`px-3 py-1 rounded-full text-xs font-mono ${t(isDark, 'text-porcelain/60 bg-white/5 border border-white/10', 'text-neutral-600 bg-neutral-100 border border-neutral-200')}`}
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
            </div>
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
const WorkGallerySection = memo(({ isDark }: { isDark: boolean }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const row1 = portfolioProjects.slice(0, 4);
  const row2 = portfolioProjects.slice(4, 8);
  const row3 = portfolioProjects.slice(8, 12);

  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => setCurrentIndex((i) => (i + 1) % portfolioProjects.length);
  const handlePrev = () => setCurrentIndex((i) => (i - 1 + portfolioProjects.length) % portfolioProjects.length);

  const ProjectTile = ({ project, index }: { project: LightboxItem; index: number }) => {
    const [hovered, setHovered] = useState(false);

    return (
      <motion.div
        className="relative flex-shrink-0 w-72 sm:w-80 aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => handleOpen(index)}
        style={{ filter: hovered ? 'none' : 'brightness(0.7) saturate(0.8)' }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4 }}
      >
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <EyebrowLabel color="muted" className="mb-2">{project.category}</EyebrowLabel>
          <h4 className="font-display text-lg text-porcelain mb-1">{project.title}</h4>
          <span className="font-mono text-xs text-alchemy-red tracking-wider uppercase">VIEW</span>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section id="work" className={`relative py-20 sm:py-32 overflow-hidden ${t(isDark, '', 'bg-[#f5f5f4]')}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <EyebrowLabel className="mb-4">SELECTED WORK</EyebrowLabel>
          <h2 className={`font-display text-3xl sm:text-4xl ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>Moving Archive</h2>
        </motion.div>
      </div>

      <div className="space-y-6">
        <MarqueeRow speed="slow" gap={24}>
          {row1.map((project, i) => <ProjectTile key={project.id} project={project} index={i} />)}
        </MarqueeRow>
        <MarqueeRow direction="right" speed="medium" gap={24}>
          {row2.map((project, i) => <ProjectTile key={project.id} project={project} index={i + 4} />)}
        </MarqueeRow>
        <MarqueeRow speed="fast" gap={24}>
          {row3.map((project, i) => <ProjectTile key={project.id} project={project} index={i + 8} />)}
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
const ExperienceSection = memo(({ isDark }: { isDark: boolean }) => {
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
    <SectionShell id="experience" className={t(isDark, '', 'bg-[#fafaf9]')} padding="xl" maxWidth="lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <EyebrowLabel className="mb-4">EXPERIENCE</EyebrowLabel>
        <h2 className={`font-display text-3xl sm:text-4xl ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>Credibility Rail</h2>
      </motion.div>

      <TimelineRail entries={timelineEntries} />
    </SectionShell>
  );
});
ExperienceSection.displayName = 'ExperienceSection';

// ============================================
// SECTION 6: WORK WITH ME (Offerings)
// ============================================
const OfferingsSection = memo(({ isDark }: { isDark: boolean }) => {
  return (
    <SectionShell className={t(isDark, '', 'bg-[#f5f5f4]')} padding="xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <EyebrowLabel className="mb-4">WORK WITH ME</EyebrowLabel>
        <h2 className={`font-display text-3xl sm:text-4xl ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
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
            <div className={`rounded-2xl p-6 sm:p-8 h-full flex flex-col transition-all duration-300 ${
              isDark
                ? 'bg-white/[0.03] border border-white/[0.08] hover:border-alchemy-red/25'
                : 'bg-white border border-neutral-200 hover:border-alchemy-red/30 shadow-sm'
            }`}>
              <h3 className={`font-body font-semibold text-xl mb-2 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
                {service.title}
              </h3>
              <p className={`font-body text-sm mb-6 ${t(isDark, 'text-porcelain/60', 'text-neutral-500')}`}>{service.promise}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {service.deliverables.map((item) => (
                  <li key={item} className={`flex items-start gap-2 text-sm ${t(isDark, 'text-porcelain/70', 'text-neutral-600')}`}>
                    <span className="text-alchemy-red mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <MagneticCTA href={`#contact?service=${service.id}`} variant="secondary" size="sm">
                Book Sprint
              </MagneticCTA>
            </div>
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
const ContactSection = memo(({ isDark }: { isDark: boolean }) => {
  const [formState, setFormState] = useState({
    name: '', email: '', project: '', need: '', vision: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = isDark
    ? 'glass-input w-full'
    : 'w-full px-5 py-4 rounded-lg bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:border-alchemy-red/50 focus:ring-2 focus:ring-alchemy-red/10 outline-none transition-all';

  return (
    <SectionShell id="contact" className={t(isDark, '', 'bg-[#fafaf9]')} padding="xl" maxWidth="lg">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className={`font-display text-[clamp(2rem,5vw,3.5rem)] mb-4 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>
          Let's build something <span className="italic text-alchemy-red">inevitable.</span>
        </h2>
        <p className={`font-body text-sm ${t(isDark, 'text-porcelain/50', 'text-neutral-500')}`}>
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
                <label className={`block font-mono text-xs mb-2 tracking-wide uppercase ${t(isDark, 'text-porcelain/50', 'text-neutral-500')}`}>Name *</label>
                <input type="text" required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className={inputClass} placeholder="Your name" />
              </div>
              <div>
                <label className={`block font-mono text-xs mb-2 tracking-wide uppercase ${t(isDark, 'text-porcelain/50', 'text-neutral-500')}`}>Email *</label>
                <input type="email" required value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} className={inputClass} placeholder="you@company.com" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className={`block font-mono text-xs mb-2 tracking-wide uppercase ${t(isDark, 'text-porcelain/50', 'text-neutral-500')}`}>Project (optional)</label>
                <input type="text" value={formState.project} onChange={(e) => setFormState({ ...formState, project: e.target.value })} className={inputClass} placeholder="Project or company name" />
              </div>
              <div>
                <label className={`block font-mono text-xs mb-2 tracking-wide uppercase ${t(isDark, 'text-porcelain/50', 'text-neutral-500')}`}>Need *</label>
                <select required value={formState.need} onChange={(e) => setFormState({ ...formState, need: e.target.value })} className={`${inputClass} ${isDark ? 'select-dropdown' : ''}`}>
                  <option value="">Select an option</option>
                  <option value="ai-branding">AI Branding Studio</option>
                  <option value="branding-systems">Branding Systems</option>
                  <option value="advisory">Founder Advisory</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>
            </div>
            <div>
              <label className={`block font-mono text-xs mb-2 tracking-wide uppercase ${t(isDark, 'text-porcelain/50', 'text-neutral-500')}`}>Vision (max 500 chars)</label>
              <textarea
                value={formState.vision}
                onChange={(e) => setFormState({ ...formState, vision: e.target.value.slice(0, 500) })}
                className={`${inputClass} h-32 resize-none`}
                placeholder="Tell me about your project..."
                maxLength={500}
              />
              <span className={`font-mono text-xs mt-1 block text-right ${t(isDark, 'text-porcelain/30', 'text-neutral-400')}`}>
                {formState.vision.length}/500
              </span>
            </div>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <MagneticCTA type="submit" variant="primary" size="lg">
                <Send className="w-4 h-4 mr-2" />
                Send Brief
              </MagneticCTA>
              <MagneticCTA href={aashrithData.contact.calendly || '#'} variant="secondary" size="lg" icon={false}>
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
            <h3 className={`font-display text-2xl mb-2 ${t(isDark, 'text-porcelain', 'text-neutral-900')}`}>Brief received.</h3>
            <p className={`font-body ${t(isDark, 'text-porcelain/60', 'text-neutral-500')}`}>I'll be in touch within 24 hours.</p>
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
        {[
          { href: aashrithData.contact.linkedin, icon: Linkedin, external: true },
          { href: `mailto:${aashrithData.contact.email}`, icon: Mail },
          { href: aashrithData.contact.calendly || '#', icon: Calendar },
        ].map(({ href, icon: Icon, external }) => (
          <a
            key={href}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className={`p-3 rounded-full transition-colors ${
              isDark
                ? 'bg-white/5 border border-white/10 hover:border-alchemy-red/30 hover:bg-alchemy-red/10'
                : 'bg-neutral-100 border border-neutral-200 hover:border-alchemy-red/30 hover:bg-alchemy-red/5'
            }`}
          >
            <Icon className={`w-5 h-5 ${t(isDark, 'text-porcelain/70', 'text-neutral-600')}`} />
          </a>
        ))}
      </motion.div>
    </SectionShell>
  );
});
ContactSection.displayName = 'ContactSection';

// ============================================
// MAIN PAGE COMPONENT
// ============================================
const AashrithPortfolio = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem('aashrith-theme');
    return saved ? saved === 'dark' : true;
  });

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem('aashrith-theme', next ? 'dark' : 'light');
      return next;
    });
  }, []);

  return (
    <>
      <SEOHead
        title="Aashrith Gade — Brand Architect & AI-Native Strategist"
        description="Designing brands as systems, not campaigns. Founder of Alchemy Labs, Brand Alchemy, and Ashzz.ai."
      />

      {isDark && <BackgroundScene mode="hero" />}

      <div className={`relative z-10 min-h-screen transition-colors duration-500 ${isDark ? 'bg-transparent text-porcelain' : 'bg-[#fafaf9] text-neutral-900'}`}>
        <PortfolioNav isDark={isDark} toggleTheme={toggleTheme} />
        <HeroSection isDark={isDark} />
        <ThinkingSection isDark={isDark} />
        <VenturesSection isDark={isDark} />
        <WorkGallerySection isDark={isDark} />
        <ExperienceSection isDark={isDark} />
        <OfferingsSection isDark={isDark} />
        <ContactSection isDark={isDark} />

        {/* Footer credibility line */}
        <footer className={`py-8 text-center border-t ${isDark ? 'border-white/5' : 'border-neutral-200'}`}>
          <p className={`font-mono text-xs tracking-wide ${isDark ? 'text-porcelain/40' : 'text-neutral-400'}`}>
            Founder-led. Systems-driven. Outcome-obsessed.
          </p>
        </footer>
      </div>
    </>
  );
};

export default AashrithPortfolio;
