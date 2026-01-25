import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { GlowBackground } from '@/components/GlowBackground';
import { SEOHead } from '@/components/SEOHead';
import { DynamicGlowBg } from '@/components/DynamicGlowBg';

import { socialLinks } from '@/components/Footer';

// Founder data following the master prompt exactly
const founders = [
  {
    name: 'Aashrith',
    title: 'Founder · CEO · Director',
    descriptor: 'Brand Architecture · Creative Direction · AI-Native Strategy',
    bio: `Aashrith is a brand architect operating at the intersection of strategy, culture, and AI-native marketing. With over 8 years of hands-on experience across branding, marketing, and positioning, his work focuses on building identity systems that scale with intelligence—not noise.

An alumnus of NMIMS (Class of 2026), Aashrith has worked across industries ranging from healthcare to luxury and digital-first brands, including experience with Cipla. His approach combines luxury positioning, narrative engineering, and creative direction, designed for brands that think long-term.

He is the founder behind Brand Alchemy and Ashzz.ai, platforms focused on decoding branding, systems thinking, and AI-led creative execution.`,
    meta: 'Mumbai · 21 · Founder-led studio practice',
    linkedin: socialLinks.founders.aashrith,
  },
  {
    name: 'Eva Doshi',
    title: 'Co-Founder · Chief of Client Relations · Outreach Head',
    descriptor: 'Luxury Brand Strategy · Creative Direction · Growth & Partnerships',
    bio: `Eva Doshi leads client relations, outreach, and strategic growth at Alchemy Labs. With a background in fashion and luxury brand strategy, she brings a sharp understanding of market dynamics, creative storytelling, and relationship-led growth.

An ex-Dentsu professional, Eva has worked across business development, marketing, sales, and AI-led marketing initiatives, bridging creative vision with executional precision. Her role ensures that Alchemy Labs operates with both strategic clarity and operational excellence—from first conversation to final delivery.`,
    meta: 'Mumbai · Co-founder · Client-first leadership',
    linkedin: socialLinks.founders.eva,
  },
];

// Micro principles for the "Why" section
const microPrinciples = [
  { text: 'Restraint beats noise' },
  { text: 'Systems beat luck' },
  { text: 'Taste beats templates' },
];

// Process steps
const processSteps = [
  {
    number: '01',
    title: 'Decode',
    description: 'Understand the brand, culture, and leverage points',
  },
  {
    number: '02',
    title: 'Architect',
    description: 'Build the system: narrative, identity, execution logic',
  },
  {
    number: '03',
    title: 'Execute',
    description: 'Deploy with precision, taste, and AI-native speed',
  },
];

export const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* SECTION 1 — OPENING MANIFESTO */}
      <section 
        ref={heroRef} 
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20 sm:pt-24"
      >
        {/* Dynamic Glow Background - right side like footer */}
        <DynamicGlowBg variant="liquid" position="right" opacity={0.35} />
        
        {/* Additional gradient overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-alchemy-red/6 rounded-full blur-[180px]" />
        </div>
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 md:px-12 text-center"
        >
          {/* Serif headline with line-by-line reveal */}
          <motion.h1
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.15] tracking-tight text-porcelain mb-8 sm:mb-10 text-balance"
          >
            <span className="block">We don't design brands.</span>
            <motion.span 
              className="block italic text-alchemy-red mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              We architect meaning, systems, and inevitability.
            </motion.span>
          </motion.h1>

          {/* Supporting paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="space-y-6 max-w-2xl mx-auto"
          >
            <p className="font-body text-lg md:text-xl text-porcelain/60 font-light leading-relaxed">
              Alchemy Labs was built on a simple belief: that brands don't fail because of lack of creativity—they fail because they lack structure, taste, and long-term thinking.
            </p>
            <p className="font-body text-base md:text-lg text-porcelain/50 font-light leading-relaxed">
              We operate at the intersection of brand architecture, culture, and AI-native execution—designing systems that hold attention, scale with intelligence, and age with relevance.
            </p>
            <p className="font-body text-base text-porcelain/40 font-light">
              This studio exists for brands that don't want noise.<br />
              <span className="text-porcelain/60">They want clarity, leverage, and longevity.</span>
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2 — WHY ALCHEMY LABS EXISTS (CREAM SECTION) */}
      <section className="relative py-20 sm:py-28 md:py-40 bg-cream-editorial overflow-hidden">
        {/* Liquid glass ambient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-alchemy-red/5 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 md:px-12">
          {/* Two-column editorial layout */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left - Headline */}
            <div>
              <ScrollReveal>
                <span className="font-mono text-xs text-alchemy-red tracking-[0.3em] uppercase mb-6 block">
                  Our Reason
                </span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-alchemy-black leading-[1.1] tracking-tight text-balance">
                  Why Alchemy Labs
                </h2>
              </ScrollReveal>
            </div>

            {/* Right - Body copy */}
            <div className="space-y-8">
              <ScrollReveal delay={0.1}>
                <p className="font-body text-lg text-alchemy-black/70 font-light leading-relaxed">
                  The modern brand landscape rewards speed—but punishes shallowness.
                  AI has multiplied output, but diluted meaning.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2}>
                <p className="font-body text-lg text-alchemy-black/70 font-light leading-relaxed">
                  Alchemy Labs was created to restore discipline to branding.
                  To combine human taste with machine leverage.
                  To design not just campaigns—but infrastructure.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="font-display text-xl italic text-alchemy-black/90">
                  We don't chase trends.<br />
                  We build systems that survive them.
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* Micro Principles - Glass Cards */}
          <div className="mt-12 sm:mt-16 md:mt-20 grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {microPrinciples.map((principle, i) => (
              <ScrollReveal key={principle.text} delay={0.4 + i * 0.1}>
                <div 
                  className="p-6 sm:p-8 rounded-2xl text-center"
                  style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(24px) saturate(120%)',
                    border: '1px solid rgba(10, 10, 11, 0.08)',
                    boxShadow: '0 8px 32px rgba(10, 10, 11, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                  }}
                >
                  <p className="font-display text-xl md:text-2xl italic text-alchemy-black">
                    {principle.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — FOUNDERS */}
      <section className="relative py-20 sm:py-28 md:py-40 overflow-hidden">
        {/* Dynamic Glow Background */}
        <DynamicGlowBg variant="ascii" position="left" opacity={0.25} />
        
        {/* Background mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-alchemy-red/5 rounded-full blur-[200px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-deep-crimson/5 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <ScrollReveal>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-px bg-alchemy-red/40" />
              <span className="font-mono text-xs text-porcelain/40 tracking-[0.3em] uppercase">
                Leadership
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-porcelain mb-12 sm:mb-16 md:mb-20 tracking-tight">
              The Founders
            </h2>
          </ScrollReveal>

          {/* Founder Cards - Liquid Glass */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {founders.map((founder, i) => (
              <ScrollReveal key={founder.name} delay={i * 0.15}>
                <motion.div
                  className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(225, 6, 19, 0.03) 100%)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: `
                      0 8px 32px rgba(0, 0, 0, 0.25),
                      0 0 60px rgba(225, 6, 19, 0.03),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1),
                      inset 0 -1px 0 rgba(225, 6, 19, 0.03)
                    `,
                  }}
                  whileHover={{ 
                    boxShadow: `
                      0 12px 48px rgba(0, 0, 0, 0.3),
                      0 0 80px rgba(225, 6, 19, 0.08),
                      inset 0 1px 0 rgba(255, 255, 255, 0.15),
                      inset 0 -1px 0 rgba(225, 6, 19, 0.05)
                    `,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Subtle hover glow */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 0%, rgba(225, 6, 19, 0.08) 0%, transparent 70%)',
                    }}
                  />

                  {/* Name */}
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl italic text-porcelain mb-2 relative z-10">
                    {founder.name}
                  </h3>

                  {/* Title - mono label */}
                  <p className="font-mono text-xs text-alchemy-red/70 tracking-[0.15em] uppercase mb-4 relative z-10">
                    {founder.title}
                  </p>

                  {/* Primary Descriptor */}
                  <p className="font-display text-lg italic text-porcelain/80 mb-6 relative z-10">
                    {founder.descriptor}
                  </p>

                  {/* Bio */}
                  <div className="space-y-4 mb-6 relative z-10">
                    {founder.bio.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className="font-body text-sm text-porcelain/50 font-light leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Meta Line */}
                  <p className="font-mono text-xs text-porcelain/30 tracking-wide relative z-10 mb-4">
                    {founder.meta}
                  </p>
                  
                  {/* LinkedIn Connect */}
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-body text-xs text-alchemy-red hover:text-porcelain transition-all duration-300 relative z-10 group/link"
                    style={{
                      background: 'rgba(220, 38, 38, 0.08)',
                      border: '1px solid rgba(220, 38, 38, 0.2)',
                    }}
                  >
                    <span>Want to connect? Reach out</span>
                    <svg className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — HOW WE WORK */}
      <section className="relative py-20 sm:py-28 md:py-40 border-y border-porcelain/5 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-12">
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl italic text-porcelain mb-12 sm:mb-16 tracking-tight text-center">
              How We Work
            </h2>
          </ScrollReveal>

          {/* Horizontal process flow */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-12 sm:mb-16">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.15}>
                <div className="text-center">
                  <span className="font-display text-4xl sm:text-5xl md:text-6xl italic text-porcelain/10 block mb-3 sm:mb-4">
                    {step.number}
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl md:text-3xl italic text-alchemy-red mb-3 sm:mb-4">
                    {step.title}
                  </h4>
                  <p className="font-body text-sm text-porcelain/50 font-light">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Closing line */}
          <ScrollReveal delay={0.5}>
            <div className="text-center pt-8 border-t border-porcelain/5">
              <p className="font-body text-base text-porcelain/40 font-light">
                No bloated decks. No performative strategy.<br />
                <span className="text-porcelain/60">Only work that compounds.</span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 5 — WHAT WE BELIEVE */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <ScrollReveal>
            <p className="font-display text-2xl md:text-3xl lg:text-4xl italic text-porcelain/90 leading-relaxed tracking-tight text-balance">
              We believe brands are built the way institutions are built—
              <br className="hidden md:block" />
              <span className="text-porcelain/60">with patience, structure, and restraint.</span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-body text-lg text-porcelain/40 font-light mt-10">
              Alchemy Labs is not for everyone.
              <br />
              <span className="text-porcelain/60">It's for those who want to build something that lasts.</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 6 — SOFT CTA */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        {/* Red glow background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-alchemy-red/10 rounded-full blur-[180px]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-12 text-center">
          <ScrollReveal>
            <Link
              to="/contact"
              className="group inline-flex flex-col items-center gap-4"
            >
              {/* CTA Button - Liquid Glass with red glow */}
              <motion.span
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-porcelain font-medium no-glow"
                style={{
                  background: 'linear-gradient(135deg, rgba(225, 6, 19, 0.15) 0%, rgba(225, 6, 19, 0.05) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(225, 6, 19, 0.3)',
                  boxShadow: '0 0 40px rgba(225, 6, 19, 0.2)',
                }}
                whileHover={{
                  boxShadow: '0 0 60px rgba(225, 6, 19, 0.4), 0 0 100px rgba(225, 6, 19, 0.15)',
                  scale: 1.02,
                }}
                transition={{ duration: 0.4 }}
              >
                <span className="font-body text-base">Start a Conversation</span>
                <span className="text-alchemy-red group-hover:translate-x-1 transition-transform duration-300">→</span>
              </motion.span>

              {/* Subtext */}
              <span className="font-mono text-xs text-porcelain/30 tracking-wider uppercase">
                Selective partnerships. Intentional work.
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
