import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Linkedin, Mail, Calendar, Sun, Moon, Menu, X, ChevronDown, Users, Sparkles, GraduationCap } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import { ScrollReveal } from '@/components/ScrollReveal';
import { LazySection } from '@/components/LazySection';
import { aashrithData } from '@/data/foundersData';

// Theme toggle hook
const useTheme = () => {
  const [isDark, setIsDark] = useState(true);
  return { isDark, toggleTheme: () => setIsDark(!isDark) };
};

// Navigation Component with AG logo
const PortfolioNav = memo(({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#intro' },
    { label: 'Ventures', href: '#ventures' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-4 sm:py-6'
      }`}
      style={{
        background: scrolled ? 'rgba(15,15,15,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* AG Logo Mark */}
        <div className="flex items-center gap-4">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center font-body font-bold text-sm"
            style={{
              background: 'linear-gradient(135deg, rgba(220,38,38,0.2) 0%, rgba(220,38,38,0.05) 100%)',
              border: '1px solid rgba(220,38,38,0.3)'
            }}
          >
            AG
          </div>
          <Link to="/about" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-xs tracking-wider hidden sm:inline">ALCHEMY LABS</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-white/60" /> : <Moon className="w-4 h-4 text-white/60" />}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-alchemy-darker/98 backdrop-blur-xl border-t border-white/5"
          >
            <div className="p-6 space-y-4">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block font-body text-lg text-white/80 hover:text-alchemy-red transition-colors"
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

// Hero Section with outline text effect
const HeroSection = memo(() => {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex(i => (i + 1) % aashrithData.hero.titles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Geometric shapes */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{
            background: 'linear-gradient(135deg, rgba(220,38,38,0.1) 0%, transparent 70%)',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-48 h-48"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{
            background: 'linear-gradient(45deg, rgba(220,38,38,0.08) 0%, transparent 70%)',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
          }}
        />
        
        {/* Grain overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat'
          }}
        />
        
        {/* Light sweep */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            width: '50%'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6">
        {/* Name with outline text effect */}
        <motion.h1
          className="font-body font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            WebkitTextStroke: '2px rgba(220,38,38,0.5)',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 60px rgba(220,38,38,0.3)'
          }}
        >
          {aashrithData.hero.name}
        </motion.h1>

        {/* Rotating titles with 3D flip */}
        <div className="h-12 sm:h-14 md:h-16 relative overflow-hidden mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={titleIndex}
              className="font-mono text-sm sm:text-base md:text-lg text-alchemy-red tracking-[0.2em] uppercase absolute w-full"
              initial={{ y: 30, opacity: 0, rotateX: -90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -30, opacity: 0, rotateX: 90 }}
              transition={{ duration: 0.5 }}
            >
              {aashrithData.hero.titles[titleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Positioning statement */}
        <motion.p
          className="font-body text-sm sm:text-base text-porcelain/50 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {aashrithData.positioning.short}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-alchemy-red/60 mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

// Introduction Section with enhanced bio
const IntroSection = memo(() => {
  return (
    <section id="intro" className="relative py-20 sm:py-28 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-16">
          {/* Left - Portrait (sticky on desktop) */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-32">
              <ScrollReveal>
                <div 
                  className="aspect-[4/5] rounded-2xl overflow-hidden relative"
                  style={{
                    background: 'linear-gradient(135deg, rgba(220,38,38,0.1) 0%, rgba(255,255,255,0.02) 100%)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 0 60px rgba(220,38,38,0.1)'
                  }}
                >
                  {/* Placeholder for portrait */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-6xl italic text-porcelain/10">AG</span>
                  </div>
                </div>
                <p className="font-mono text-xs text-porcelain/40 tracking-wide mt-4 text-center">
                  {aashrithData.bio.meta}
                </p>
                
                {/* Social Links */}
                <div className="flex items-center justify-center gap-4 mt-4">
                  <a
                    href={aashrithData.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-white/5 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-porcelain/50 hover:text-alchemy-red transition-colors" />
                  </a>
                  <a
                    href={`mailto:${aashrithData.contact.email}`}
                    className="p-2 rounded-full hover:bg-white/5 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-porcelain/50 hover:text-alchemy-red transition-colors" />
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Right - Content */}
          <div className="lg:col-span-3 space-y-8">
            <ScrollReveal>
              <h2 className="font-body font-bold text-2xl sm:text-3xl text-porcelain mb-4">
                Building Systems That Scale with Intelligence
              </h2>
              <p className="font-body text-base sm:text-lg text-porcelain/70 font-light leading-relaxed">
                {aashrithData.bio.intro}
              </p>
            </ScrollReveal>

            {aashrithData.bio.extendedIntro && (
              <ScrollReveal delay={0.1}>
                <p className="font-body text-base text-porcelain/60 font-light leading-relaxed">
                  {aashrithData.bio.extendedIntro}
                </p>
              </ScrollReveal>
            )}

            {/* Expertise Tags */}
            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap gap-3">
                {aashrithData.bio.expertise.map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="px-4 py-2 rounded-full font-mono text-xs text-alchemy-red/80 tracking-wide"
                    style={{
                      background: 'rgba(220,38,38,0.08)',
                      border: '1px solid rgba(220,38,38,0.15)'
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </ScrollReveal>

            {/* Quote */}
            <ScrollReveal delay={0.3}>
              <blockquote 
                className="relative pl-6 py-4"
                style={{ borderLeft: '2px solid rgba(220,38,38,0.5)' }}
              >
                <p className="font-display text-xl sm:text-2xl italic text-alchemy-red">
                  "{aashrithData.bio.quote}"
                </p>
              </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
});

IntroSection.displayName = 'IntroSection';

// Philosophy Lens Section - NEW
const PhilosophyLensSection = memo(() => {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-alchemy-red/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-alchemy-red tracking-[0.2em] uppercase mb-4 block">
              Strategic Lens
            </span>
            {aashrithData.philosophy.coreBelief && (
              <p className="font-display text-xl sm:text-2xl md:text-3xl italic text-porcelain">
                "{aashrithData.philosophy.coreBelief}"
              </p>
            )}
          </div>
        </ScrollReveal>

        {/* Strategic Lens Grid */}
        {aashrithData.philosophy.strategicLens && (
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            {aashrithData.philosophy.strategicLens.map((lens, i) => (
              <ScrollReveal key={lens} delay={i * 0.1}>
                <motion.div
                  className="p-6 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(220,38,38,0.03) 100%)',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                  whileHover={{ borderColor: 'rgba(220,38,38,0.2)' }}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-alchemy-red/60">0{i + 1}</span>
                    <p className="font-body text-base text-porcelain/80">{lens}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Process visualization */}
        <ScrollReveal delay={0.3}>
          <div className="flex items-center justify-center gap-4 sm:gap-8 mt-12">
            {aashrithData.philosophy.process.map((step, i) => (
              <div key={step} className="flex items-center gap-4 sm:gap-8">
                <span className="font-body font-bold text-lg sm:text-xl md:text-2xl text-porcelain">
                  {step}
                </span>
                {i < aashrithData.philosophy.process.length - 1 && (
                  <span className="text-alchemy-red text-xl sm:text-2xl">→</span>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

PhilosophyLensSection.displayName = 'PhilosophyLensSection';

// Ventures Section - NEW
const VenturesSection = memo(() => {
  if (!aashrithData.ventures) return null;

  return (
    <section id="ventures" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-8 sm:mb-12">
            <Sparkles className="w-5 h-5 text-alchemy-red" />
            <h2 className="font-body font-bold text-3xl sm:text-4xl text-porcelain tracking-tight">
              Ventures
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-6">
          {aashrithData.ventures.map((venture, i) => (
            <ScrollReveal key={venture.name} delay={i * 0.15}>
              <motion.div
                className="p-6 sm:p-8 rounded-2xl h-full flex flex-col"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(220,38,38,0.04) 100%)',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}
                whileHover={{ 
                  borderColor: 'rgba(220,38,38,0.3)',
                  y: -4
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <div className="mb-4">
                  <h3 className="font-body font-bold text-xl text-porcelain mb-1">
                    {venture.name}
                  </h3>
                  <span className="font-mono text-xs text-alchemy-red/70 tracking-wide">
                    {venture.type}
                  </span>
                </div>

                {/* Description */}
                <p className="font-body text-sm text-porcelain/60 mb-6 flex-grow">
                  {venture.description}
                </p>

                {/* Community size if available */}
                {venture.communitySize && (
                  <div className="flex items-center gap-2 mb-4 text-alchemy-red">
                    <Users className="w-4 h-4" />
                    <span className="font-mono text-xs">{venture.communitySize}</span>
                  </div>
                )}

                {/* Capabilities/Outputs */}
                <div className="space-y-2">
                  {(venture.capabilities || venture.outputs)?.slice(0, 3).map((item, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <span className="text-alchemy-red mt-1">•</span>
                      <span className="font-body text-xs text-porcelain/50">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
});

VenturesSection.displayName = 'VenturesSection';

// Experience Timeline
const ExperienceSection = memo(() => {
  return (
    <section id="experience" className="relative py-20 sm:py-28 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-alchemy-red/20 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="font-body font-bold text-3xl sm:text-4xl md:text-5xl text-porcelain mb-12 sm:mb-16 tracking-tight">
            Experience
          </h2>
        </ScrollReveal>

        <div className="space-y-8 sm:space-y-12">
          {aashrithData.experience.map((exp, i) => (
            <ScrollReveal key={exp.company} delay={i * 0.1}>
              <motion.div
                className="relative pl-8 sm:pl-12 group"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 top-2 w-3 h-3 rounded-full bg-alchemy-red"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  style={{
                    boxShadow: '0 0 20px rgba(220,38,38,0.5)'
                  }}
                />

                {/* Content */}
                <div 
                  className="p-6 sm:p-8 rounded-2xl transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(220,38,38,0.03) 100%)',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-body font-bold text-xl sm:text-2xl text-porcelain">
                        {exp.company}
                      </h3>
                      <p className="font-mono text-sm text-alchemy-red/80 tracking-wide">
                        {exp.role}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-porcelain/40">
                      {exp.dates}
                    </span>
                  </div>

                  {/* Revenue Signal */}
                  {exp.revenueSignal && (
                    <p className="font-mono text-xs text-alchemy-red/60 mb-4 italic">
                      {exp.revenueSignal}
                    </p>
                  )}

                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, j) => (
                      <li key={j} className="font-body text-sm text-porcelain/60 flex items-start gap-2">
                        <span className="text-alchemy-red mt-1.5">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
});

ExperienceSection.displayName = 'ExperienceSection';

// Education Section - NEW
const EducationSection = memo(() => {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-8">
            <GraduationCap className="w-5 h-5 text-alchemy-red" />
            <h2 className="font-body font-bold text-2xl sm:text-3xl text-porcelain tracking-tight">
              Education
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {aashrithData.education.map((edu, i) => (
            <ScrollReveal key={edu.institution} delay={i * 0.1}>
              <div 
                className="p-6 sm:p-8 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(220,38,38,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-body font-bold text-lg text-porcelain">
                      {edu.institution}
                    </h3>
                    <p className="font-body text-sm text-porcelain/60">
                      {edu.degree}
                    </p>
                    {edu.honors && (
                      <p className="font-mono text-xs text-alchemy-red/70 mt-1">
                        {edu.honors}
                      </p>
                    )}
                  </div>
                  <span className="font-mono text-xs text-porcelain/40">
                    {edu.year}
                  </span>
                </div>

                {/* Focus Areas */}
                {edu.focusAreas && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {edu.focusAreas.map((area) => (
                      <span
                        key={area}
                        className="px-3 py-1 rounded-full font-mono text-xs text-porcelain/50"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.05)'
                        }}
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
});

EducationSection.displayName = 'EducationSection';

// Skills Section
const SkillsSection = memo(() => {
  return (
    <section id="skills" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="font-body font-bold text-3xl sm:text-4xl text-porcelain mb-12 tracking-tight">
            Skills & Capabilities
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {aashrithData.skills.map((skillGroup, i) => (
            <ScrollReveal key={skillGroup.category} delay={i * 0.1}>
              <div 
                className="p-6 rounded-2xl h-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(220,38,38,0.03) 100%)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <h3 className="font-mono text-xs text-alchemy-red tracking-[0.15em] uppercase mb-4">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map(item => (
                    <li key={item} className="font-body text-sm text-porcelain/60">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = 'SkillsSection';

// Contact Section
const ContactSection = memo(() => {
  return (
    <section id="contact" className="relative py-20 sm:py-28 md:py-40 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-alchemy-red/8 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <ScrollReveal>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl italic text-porcelain mb-4">
            Let's Build Something Extraordinary
          </h2>
          <p className="font-body text-base sm:text-lg text-porcelain/50 mb-10">
            Open for select collaborations and creative partnerships
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${aashrithData.contact.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm text-porcelain transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(220,38,38,0.2)',
                border: '1px solid rgba(220,38,38,0.4)'
              }}
            >
              <Mail className="w-4 h-4" />
              Email
            </a>

            <a
              href={aashrithData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm text-porcelain transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>

            {aashrithData.contact.calendly && (
              <a
                href={aashrithData.contact.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm text-porcelain transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <Calendar className="w-4 h-4" />
                Schedule Call
              </a>
            )}
          </div>
        </ScrollReveal>

        {/* Back to About link */}
        <div className="mt-16">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 font-body text-sm text-porcelain/50 hover:text-porcelain transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Alchemy Labs About
          </Link>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';

// Scroll Progress Bar
const ScrollProgress = memo(() => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-transparent">
      <motion.div
        className="h-full bg-alchemy-red"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
});

ScrollProgress.displayName = 'ScrollProgress';

// Main Page Component
const AashrithPortfolio = memo(() => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-alchemy-dark text-white">
      <SEOHead 
        title="Aashrith Gade - Brand Architect & Creative Director | Alchemy Labs"
        description="Portfolio of Aashrith Gade. Brand architect operating at the intersection of strategy, culture, and AI-native execution. Founder of Alchemy Labs."
      />
      
      <ScrollProgress />
      <PortfolioNav isDark={isDark} toggleTheme={toggleTheme} />
      
      <HeroSection />
      
      <IntroSection />
      
      <LazySection minHeight="400px">
        <PhilosophyLensSection />
      </LazySection>
      
      <LazySection minHeight="500px">
        <VenturesSection />
      </LazySection>
      
      <LazySection minHeight="600px">
        <ExperienceSection />
      </LazySection>
      
      <LazySection minHeight="300px">
        <EducationSection />
      </LazySection>
      
      <LazySection minHeight="400px">
        <SkillsSection />
      </LazySection>
      
      <ContactSection />
    </div>
  );
});

AashrithPortfolio.displayName = 'AashrithPortfolio';

export default AashrithPortfolio;
