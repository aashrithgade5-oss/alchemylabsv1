import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ScrollReveal, StaggerReveal, ParallaxReveal } from '@/components/ScrollReveal';
import { SpotlightContainer, SpotlightItem } from '@/components/SpotlightGrid';
import { PageScrollTracker } from '@/components/PageScrollTracker';

const founders = [
  {
    name: 'Mr. Ash',
    role: 'Creative Director & Co-Founder',
    bio: 'Architect of brand systems and visual narratives. 15+ years shaping identities for brands that refuse to blend in. Obsessed with the intersection of strategy and aesthetics.',
    philosophy: 'Design is not decoration—it\'s the articulation of intent.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Eva Doshi',
    role: 'Strategy Lead & Co-Founder',
    bio: 'Former management consultant turned brand strategist. Expert in market positioning and cultural intelligence. Believes every great brand is built on uncomfortable truths.',
    philosophy: 'Strategy without courage is just planning.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
  },
];

const values = [
  { 
    title: 'Velocity', 
    description: 'Speed without sacrifice. We move fast because the market doesn\'t wait.',
    number: '01'
  },
  { 
    title: 'Precision', 
    description: 'Every decision is intentional. No wasted pixels, no empty words.',
    number: '02'
  },
  { 
    title: 'Authenticity', 
    description: 'We build brands that are genuinely different—not just different for difference\'s sake.',
    number: '03'
  },
  { 
    title: 'Craft', 
    description: 'The details are the experience. Excellence lives in the margins.',
    number: '04'
  },
];

const stats = [
  { value: '50+', label: 'Brands Transformed' },
  { value: '12', label: 'Countries Served' },
  { value: '3-5', label: 'Day Sprints' },
  { value: '∞', label: 'Obsession for Detail' },
];

export const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PageScrollTracker />
      
      {/* Hero - Full Screen */}
      <section 
        ref={heroRef} 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.08, 0.12, 0.08]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-alchemy-red/10 rounded-full blur-[180px]" 
          />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-warm-stone/5 rounded-full blur-[150px]" />
        </div>
        
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs text-alchemy-red tracking-[0.3em] uppercase mb-8"
          >
            About Alchemy Labs
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-porcelain mb-10 text-balance"
          >
            We Build Brands
            <br />
            <span className="italic text-alchemy-red">That Matter</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body text-lg md:text-xl text-porcelain/50 max-w-2xl mx-auto font-light leading-relaxed"
          >
            A boutique studio at the intersection of strategy, design, and artificial intelligence.
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-5 h-9 rounded-full border border-porcelain/20 flex items-start justify-center p-2"
            >
              <motion.div 
                animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-1 rounded-full bg-alchemy-red" 
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="relative py-20 border-y border-porcelain/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <p className="font-display text-4xl md:text-5xl lg:text-6xl italic text-alchemy-red mb-2">
                    {stat.value}
                  </p>
                  <p className="font-mono text-xs text-porcelain/40 tracking-[0.2em] uppercase">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto - Full Width Editorial */}
      <section className="relative py-40 overflow-hidden luxury-margin">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-alchemy-red/5 rounded-full blur-[200px] -translate-y-1/2" />
        </div>

        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="mb-16">
              <span className="font-mono text-xs text-alchemy-red tracking-[0.3em] uppercase">
                Our Manifesto
              </span>
            </div>
          </ScrollReveal>

          <div className="space-y-12">
            <ScrollReveal delay={0.1}>
              <p className="font-display text-3xl md:text-4xl lg:text-5xl italic text-porcelain leading-[1.2] tracking-tight text-balance">
                We exist for brands that refuse to be forgettable.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="font-body text-lg md:text-xl text-porcelain/60 font-light leading-relaxed max-w-3xl">
                For founders who know their vision deserves more than templates and trends. 
                For companies ready to invest in identity as infrastructure.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="font-body text-lg md:text-xl text-porcelain/60 font-light leading-relaxed max-w-3xl">
                Alchemy Labs was born from a simple observation: most agencies optimize for volume. 
                We optimize for impact. We'd rather build one iconic brand than a hundred mediocre ones.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="pt-8 border-t border-porcelain/10">
                <p className="font-display text-2xl md:text-3xl italic text-alchemy-red">
                  "We don't do safe. We do significant."
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <p className="font-body text-lg md:text-xl text-porcelain/60 font-light leading-relaxed max-w-3xl">
                Our process is intensive. Our standards are high. Our results speak for themselves. 
                We combine strategic rigor with creative ambition—and we do it at a pace that 
                matches the urgency of modern business.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Founders - Premium Layout */}
      <section className="relative py-40 luxury-margin">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex items-center gap-6 mb-20">
              <div className="w-20 h-px bg-alchemy-red/50" />
              <span className="font-mono text-xs text-porcelain/40 tracking-[0.3em] uppercase">
                Leadership
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl italic text-porcelain mb-20 tracking-tight text-balance">
              The Founders
            </h2>
          </ScrollReveal>

          <SpotlightContainer className="grid md:grid-cols-2 gap-8 md:gap-16">
            {founders.map((founder, i) => (
              <SpotlightItem key={founder.name} id={founder.name}>
                <ScrollReveal delay={i * 0.15}>
                  <div className="group">
                    {/* Image */}
                    <ParallaxReveal className="mb-8 rounded-2xl overflow-hidden">
                      <div className="aspect-[4/5] relative">
                        <img 
                          src={founder.image} 
                          alt={founder.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black/60 via-transparent to-transparent" />
                      </div>
                    </ParallaxReveal>

                    {/* Info */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-display text-3xl md:text-4xl italic text-porcelain mb-2">
                          {founder.name}
                        </h3>
                        <p className="font-mono text-xs text-alchemy-red tracking-[0.2em] uppercase">
                          {founder.role}
                        </p>
                      </div>

                      <p className="font-body text-base text-porcelain/50 font-light leading-relaxed">
                        {founder.bio}
                      </p>

                      <blockquote className="pt-4 border-t border-porcelain/10">
                        <p className="font-display text-lg italic text-porcelain/70">
                          "{founder.philosophy}"
                        </p>
                      </blockquote>
                    </div>
                  </div>
                </ScrollReveal>
              </SpotlightItem>
            ))}
          </SpotlightContainer>
        </div>
      </section>

      {/* Values - Editorial Grid */}
      <section className="relative py-40 border-t border-porcelain/5 luxury-margin">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Left - Header */}
            <div className="lg:sticky lg:top-40 lg:h-fit">
              <ScrollReveal>
                <span className="font-mono text-xs text-alchemy-red tracking-[0.3em] uppercase mb-6 block">
                  Principles
                </span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl italic text-porcelain tracking-tight text-balance">
                  What We
                  <br />
                  <span className="text-alchemy-red">Believe</span>
                </h2>
              </ScrollReveal>
            </div>

            {/* Right - Values */}
            <div className="space-y-16">
              {values.map((value, i) => (
                <ScrollReveal key={value.title} delay={i * 0.1}>
                  <div className="group flex gap-8">
                    <span className="font-display text-5xl md:text-6xl italic text-porcelain/10 group-hover:text-alchemy-red/20 transition-colors duration-500 flex-shrink-0">
                      {value.number}
                    </span>
                    <div className="pt-3">
                      <h4 className="font-display text-2xl md:text-3xl italic text-porcelain mb-4 group-hover:text-alchemy-red transition-colors duration-300">
                        {value.title}
                      </h4>
                      <p className="font-body text-base text-porcelain/50 font-light leading-relaxed tracking-normal">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-40 luxury-margin">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-alchemy-red/10 rounded-full blur-[200px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl italic text-porcelain mb-8 tracking-tight text-balance">
              Ready to create something
              <br />
              <span className="text-alchemy-red">unforgettable?</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-body text-lg text-porcelain/50 font-light mb-12 max-w-xl mx-auto">
              Let's discuss how we can transform your brand into something that truly matters.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 glass-cta-primary text-porcelain no-glow"
            >
              <span>Start a Conversation</span>
              <span className="text-alchemy-red">→</span>
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
