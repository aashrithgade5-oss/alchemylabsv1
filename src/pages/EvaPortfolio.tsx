import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Linkedin, Mail, Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import { ScrollReveal } from '@/components/ScrollReveal';
import { LazySection } from '@/components/LazySection';
import { evaData } from '@/data/foundersData';

// Navigation Component with ED logo
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
    { label: 'Experience', href: '#experience' },
    { label: 'Expertise', href: '#skills' },
    { label: 'Connect', href: '#contact' }
  ];

  const bgColor = isDark ? 'rgba(10,10,10,0.9)' : 'rgba(250,250,249,0.9)';
  const textColor = isDark ? 'text-white' : 'text-neutral-900';
  const textMuted = isDark ? 'text-white/60' : 'text-neutral-600';

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-4 sm:py-6'
      }`}
      style={{
        background: scrolled ? bgColor : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* ED Logo Mark */}
        <div className="flex items-center gap-4">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center font-elegant italic text-sm"
            style={{
              background: isDark 
                ? 'linear-gradient(135deg, rgba(251,113,133,0.2) 0%, rgba(220,38,38,0.1) 100%)'
                : 'linear-gradient(135deg, rgba(251,113,133,0.3) 0%, rgba(220,38,38,0.2) 100%)',
              border: '1px solid rgba(251,113,133,0.4)'
            }}
          >
            <span className={isDark ? 'text-alchemy-pink' : 'text-alchemy-red'}>ED</span>
          </div>
          <Link to="/about" className={`flex items-center gap-2 ${textMuted} hover:text-alchemy-red transition-colors`}>
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
              className={`font-body text-sm ${textMuted} hover:text-alchemy-red transition-colors`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'} transition-colors`}
          >
            {isDark ? <Sun className={`w-4 h-4 ${textMuted}`} /> : <Moon className={`w-4 h-4 ${textMuted}`} />}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-full ${isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'} transition-colors`}
          >
            {isOpen ? <X className={`w-5 h-5 ${textColor}`} /> : <Menu className={`w-5 h-5 ${textColor}`} />}
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
            className={`md:hidden absolute top-full left-0 right-0 ${isDark ? 'bg-[#0a0a0a]/98' : 'bg-[#fafaf9]/98'} backdrop-blur-xl border-t ${isDark ? 'border-white/5' : 'border-black/5'}`}
          >
            <div className="p-6 space-y-4">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block font-body text-lg ${textMuted} hover:text-alchemy-red transition-colors`}
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

// Hero Section - Editorial Luxury with pink gradients
const HeroSection = memo(({ isDark }: { isDark: boolean }) => {
  const bgGradient = isDark 
    ? 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)'
    : 'linear-gradient(135deg, #fafaf9 0%, #fff5f5 50%, #fafaf9 100%)';
  
  const textColor = isDark ? 'text-white' : 'text-neutral-900';
  const textMuted = isDark ? 'text-white/60' : 'text-neutral-600';

  return (
    <section 
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      style={{ background: bgGradient }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ 
          background: [
            'radial-gradient(ellipse at 30% 50%, rgba(220,38,38,0.08) 0%, transparent 50%)',
            'radial-gradient(ellipse at 70% 50%, rgba(251,113,133,0.08) 0%, transparent 50%)',
            'radial-gradient(ellipse at 50% 30%, rgba(253,164,175,0.06) 0%, transparent 50%)',
            'radial-gradient(ellipse at 30% 50%, rgba(220,38,38,0.08) 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* Flowing shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(135deg, #dc2626, #fb7185, #fda4af)',
            filter: 'blur(80px)'
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full opacity-10"
          animate={{ 
            scale: [1.1, 1, 1.1],
            x: [0, -30, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          style={{
            background: 'linear-gradient(45deg, #fb7185, #fda4af)',
            filter: 'blur(60px)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6">
        {/* Name with elegant typography */}
        <motion.h1
          className={`font-elegant text-5xl sm:text-6xl md:text-7xl lg:text-8xl italic ${textColor} tracking-tight mb-4`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ letterSpacing: '0.02em' }}
        >
          {evaData.hero.name}
        </motion.h1>

        {/* Titles */}
        <motion.div
          className="space-y-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {evaData.hero.titles.map((title) => (
            <p key={title} className={`font-body text-sm sm:text-base ${textMuted} tracking-[0.15em] uppercase`}>
              {title}
            </p>
          ))}
        </motion.div>

        {/* Tagline with pink gradient */}
        <motion.p
          className="font-body text-sm sm:text-base md:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            background: 'linear-gradient(135deg, #dc2626, #fb7185, #fda4af)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          {evaData.hero.tagline}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-alchemy-pink/60 mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

// Introduction Section
const IntroSection = memo(({ isDark }: { isDark: boolean }) => {
  const bgColor = isDark ? 'bg-[#0a0a0a]' : 'bg-[#fafaf9]';
  const textMuted = isDark ? 'text-white/70' : 'text-neutral-600';

  return (
    <section id="intro" className={`relative py-20 sm:py-28 md:py-40 ${bgColor} overflow-hidden`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Portrait + Bio */}
        <div className="flex flex-col items-center text-center">
          {/* Portrait with gradient border */}
          <ScrollReveal>
            <div 
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden relative mb-8"
              style={{
                background: 'linear-gradient(135deg, rgba(220,38,38,0.1) 0%, rgba(251,113,133,0.1) 100%)',
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.02), rgba(255,255,255,0.02)), linear-gradient(135deg, #dc2626, #fb7185)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`font-elegant text-5xl italic ${isDark ? 'text-white/10' : 'text-neutral-200'}`}>ED</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Bio */}
          <ScrollReveal delay={0.1}>
            <div className="max-w-2xl">
              <h2 
                className="font-elegant text-2xl sm:text-3xl italic mb-4"
                style={{
                  background: 'linear-gradient(135deg, #dc2626, #fb7185)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Strategy Meets Storytelling
              </h2>
              <p className={`font-body text-base sm:text-lg ${textMuted} font-light leading-relaxed mb-6`}>
                {evaData.bio.intro}
              </p>
              {evaData.bio.extendedIntro && (
                <p className={`font-body text-base ${isDark ? 'text-white/50' : 'text-neutral-500'} font-light leading-relaxed mb-8`}>
                  {evaData.bio.extendedIntro}
                </p>
              )}

              {/* Quote */}
              <blockquote className="relative">
                <p 
                  className="font-elegant text-xl sm:text-2xl italic"
                  style={{
                    background: 'linear-gradient(135deg, #dc2626, #fb7185)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  "{evaData.bio.quote}"
                </p>
              </blockquote>
            </div>
          </ScrollReveal>

          {/* Expertise */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {evaData.bio.expertise.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full font-body text-xs tracking-wide"
                  style={{
                    background: isDark 
                      ? 'linear-gradient(135deg, rgba(220,38,38,0.08) 0%, rgba(251,113,133,0.05) 100%)'
                      : 'linear-gradient(135deg, rgba(220,38,38,0.1) 0%, rgba(251,113,133,0.08) 100%)',
                    border: '1px solid rgba(251,113,133,0.2)',
                    color: isDark ? 'rgba(251,113,133,0.9)' : '#dc2626'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
});

IntroSection.displayName = 'IntroSection';

// Experience Timeline with center-aligned connector
const ExperienceSection = memo(({ isDark }: { isDark: boolean }) => {
  const bgColor = isDark ? 'bg-[#0f0f0f]' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-neutral-900';
  const textMuted = isDark ? 'text-white/60' : 'text-neutral-500';

  return (
    <section id="experience" className={`relative py-20 sm:py-28 md:py-40 ${bgColor} overflow-hidden`}>
      {/* Gradient line */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(220,38,38,0.3), rgba(251,113,133,0.2), transparent)'
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <h2 className={`font-elegant text-3xl sm:text-4xl md:text-5xl italic ${textColor} mb-12 sm:mb-16 text-center`}>
            Professional Journey
          </h2>
        </ScrollReveal>

        <div className="space-y-12">
          {evaData.experience.map((exp, i) => (
            <ScrollReveal key={exp.company} delay={i * 0.15}>
              <motion.div
                className="relative"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-3 h-3 rounded-full z-10"
                  style={{
                    background: 'linear-gradient(135deg, #dc2626, #fb7185)',
                    boxShadow: '0 0 15px rgba(251,113,133,0.4)'
                  }}
                />

                {/* Card */}
                <div 
                  className="ml-0 sm:ml-auto sm:mr-auto max-w-lg p-6 sm:p-8 rounded-2xl mt-6"
                  style={{
                    background: isDark 
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(220,38,38,0.03) 100%)'
                      : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(251,241,241,0.5) 100%)',
                    border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(251,113,133,0.15)',
                    boxShadow: isDark ? 'none' : '0 4px 24px rgba(0,0,0,0.05)'
                  }}
                >
                  <div className="text-center">
                    <h3 className={`font-elegant text-xl sm:text-2xl italic ${textColor} mb-1`}>
                      {exp.company}
                    </h3>
                    <p 
                      className="font-body text-sm tracking-wide mb-2"
                      style={{
                        background: 'linear-gradient(135deg, #dc2626, #fb7185)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      {exp.role}
                    </p>
                    <span className={`font-body text-xs ${textMuted}`}>
                      {exp.dates}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-2">
                    {exp.achievements.map((achievement, j) => (
                      <li key={j} className={`font-body text-sm ${textMuted} flex items-start gap-2`}>
                        <span 
                          className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                          style={{
                            background: 'linear-gradient(135deg, #dc2626, #fb7185)'
                          }}
                        />
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

// Philosophy Section
const PhilosophySection = memo(({ isDark }: { isDark: boolean }) => {
  const bgGradient = isDark 
    ? 'linear-gradient(135deg, #0a0a0a 0%, #150a0a 50%, #0a0a0a 100%)'
    : 'linear-gradient(135deg, #fafaf9 0%, #fff8f8 50%, #fafaf9 100%)';
  
  const textColor = isDark ? 'text-white' : 'text-neutral-900';

  return (
    <section 
      className="relative py-20 sm:py-28 md:py-40 overflow-hidden"
      style={{ background: bgGradient }}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <ScrollReveal>
          {/* Process visualization */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-12">
            {evaData.philosophy.process.map((step, i) => (
              <div key={step} className="flex items-center gap-4 sm:gap-8">
                <span className={`font-body font-medium text-base sm:text-lg ${textColor}`}>
                  {step}
                </span>
                {i < evaData.philosophy.process.length - 1 && (
                  <span className="text-alchemy-pink text-lg">→</span>
                )}
              </div>
            ))}
          </div>

          <p className={`font-body text-base sm:text-lg ${isDark ? 'text-white/60' : 'text-neutral-600'} max-w-2xl mx-auto mb-10`}>
            I believe that the best brand work happens when strategic thinking and creative storytelling work in harmony. 
            Every relationship, every project, every outcome starts with understanding.
          </p>

          <blockquote 
            className="font-elegant text-xl sm:text-2xl md:text-3xl italic"
            style={{
              background: 'linear-gradient(135deg, #dc2626, #fb7185, #fda4af)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            "{evaData.philosophy.statement}"
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  );
});

PhilosophySection.displayName = 'PhilosophySection';

// Skills Section
const SkillsSection = memo(({ isDark }: { isDark: boolean }) => {
  const bgColor = isDark ? 'bg-[#0a0a0a]' : 'bg-[#fafaf9]';
  const textColor = isDark ? 'text-white' : 'text-neutral-900';
  const textMuted = isDark ? 'text-white/60' : 'text-neutral-500';

  return (
    <section id="skills" className={`relative py-20 sm:py-28 ${bgColor} overflow-hidden`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <h2 className={`font-elegant text-3xl sm:text-4xl italic ${textColor} mb-12 text-center`}>
            Expertise
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {evaData.skills.map((skillGroup, i) => (
            <ScrollReveal key={skillGroup.category} delay={i * 0.1}>
              <div 
                className="p-6 rounded-2xl h-full text-center"
                style={{
                  background: isDark 
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(251,113,133,0.03) 100%)'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(251,241,241,0.5) 100%)',
                  border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(251,113,133,0.1)'
                }}
              >
                <h3 
                  className="font-body text-xs tracking-[0.15em] uppercase mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #dc2626, #fb7185)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map(item => (
                    <li key={item} className={`font-body text-sm ${textMuted}`}>
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
const ContactSection = memo(({ isDark }: { isDark: boolean }) => {
  const bgGradient = isDark 
    ? 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)'
    : 'linear-gradient(135deg, #fafaf9 0%, #fff8f8 50%, #fafaf9 100%)';
  
  const textColor = isDark ? 'text-white' : 'text-neutral-900';
  const textMuted = isDark ? 'text-white/50' : 'text-neutral-500';

  return (
    <section 
      id="contact" 
      className="relative py-20 sm:py-28 md:py-40 overflow-hidden"
      style={{ background: bgGradient }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full blur-[150px]"
          style={{
            background: 'linear-gradient(135deg, rgba(220,38,38,0.1), rgba(251,113,133,0.08))'
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <ScrollReveal>
          <h2 className={`font-elegant text-3xl sm:text-4xl md:text-5xl italic ${textColor} mb-4`}>
            Let's Start a Conversation
          </h2>
          <p className={`font-body text-base sm:text-lg ${textMuted} mb-10`}>
            Open to discussing strategic partnerships and brand collaborations
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${evaData.contact.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm text-white transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #dc2626, #fb7185)',
                boxShadow: '0 4px 20px rgba(251,113,133,0.3)'
              }}
            >
              <Mail className="w-4 h-4" />
              Reach Out
            </a>

            <a
              href={evaData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm ${textColor} transition-all duration-300 hover:scale-105`}
              style={{
                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)'
              }}
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </div>
        </ScrollReveal>

        {/* Back to About link */}
        <div className="mt-16">
          <Link
            to="/about"
            className={`inline-flex items-center gap-2 font-body text-sm ${textMuted} hover:text-alchemy-red transition-colors`}
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

// Scroll Progress Bar with pink gradient
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
        className="h-full"
        style={{ 
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #dc2626, #fb7185, #fda4af)'
        }}
      />
    </div>
  );
});

ScrollProgress.displayName = 'ScrollProgress';

// Main Page Component
const EvaPortfolio = memo(() => {
  const [isDark, setIsDark] = useState(false); // Light mode default for Eva's editorial luxury theme
  const toggleTheme = () => setIsDark(!isDark);

  const bgColor = isDark ? 'bg-[#0a0a0a]' : 'bg-[#fafaf9]';

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-500`}>
      <SEOHead 
        title="Eva Doshi - Luxury Brand Strategy & Client Relations | Alchemy Labs"
        description="Portfolio of Eva Doshi. Leading client relations, outreach, and strategic growth with a background in fashion and luxury brand strategy."
      />
      
      <ScrollProgress />
      <PortfolioNav isDark={isDark} toggleTheme={toggleTheme} />
      
      <HeroSection isDark={isDark} />
      
      <IntroSection isDark={isDark} />
      
      <LazySection minHeight="600px">
        <ExperienceSection isDark={isDark} />
      </LazySection>
      
      <LazySection minHeight="400px">
        <PhilosophySection isDark={isDark} />
      </LazySection>
      
      <LazySection minHeight="400px">
        <SkillsSection isDark={isDark} />
      </LazySection>
      
      <ContactSection isDark={isDark} />
    </div>
  );
});

EvaPortfolio.displayName = 'EvaPortfolio';

export default EvaPortfolio;
