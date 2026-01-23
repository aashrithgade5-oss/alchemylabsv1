import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Rocket, Palette, Zap } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

// Premium positioning metrics
const stats = [
  { number: '∞', label: 'Creative Capacity', subtext: 'Limitless production potential' },
  { number: '24h', label: 'Concept Speed', subtext: 'From brief to visual in a day' },
  { number: '1:1', label: 'Founder Access', subtext: 'Direct collaboration, no layers' },
];

const outcomeExamples = [
  { icon: Rocket, label: 'Launch-ready MVP' },
  { icon: Palette, label: 'Investor-grade brand kit' },
  { icon: Zap, label: 'High-velocity content system' },
];

export const EditorialSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const quoteScale = useTransform(scrollYProgress, [0.5, 0.8], [0.96, 1]);
  const quoteOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <section
      id="editorial"
      ref={sectionRef}
      className="relative py-32 overflow-hidden section-cream"
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Warm vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(245, 241, 232, 0.5) 100%)',
        }}
      />

      {/* Background number */}
      <motion.div
        className="absolute -left-10 md:-left-20 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ y: textY }}
      >
        <span className="font-display italic text-[25vw] leading-none text-alchemy-black/[0.02]">
          03
        </span>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <motion.div
            style={{ y: textY }}
            className="space-y-8"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block font-mono text-[10px] uppercase tracking-[0.25em] text-alchemy-black/40"
            >
              Our Promise
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-[-0.02em] text-alchemy-black text-balance"
            >
              Most agencies sell{' '}
              <span className="italic" style={{ color: '#dc2626' }}>hours</span>.
              <br />
              We deliver{' '}
              <span className="italic" style={{ color: '#dc2626' }}>outcomes</span>.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-body text-base md:text-lg text-alchemy-black/60 leading-relaxed max-w-lg font-light"
            >
              We're not counting billable hours—we're engineering brand infrastructure 
              that compounds. AI acceleration means premium output at startup speed.
            </motion.p>

            {/* Outcome Examples */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap gap-3"
            >
              {outcomeExamples.map((example, i) => {
                const Icon = example.icon;
                return (
                  <div 
                    key={i}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{
                      background: 'rgba(10, 10, 10, 0.05)',
                      border: '1px solid rgba(10, 10, 10, 0.08)',
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: '#dc2626' }} />
                    <span className="font-body text-sm text-alchemy-black/70">{example.label}</span>
                  </div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton
                href="#process"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-alchemy-black text-porcelain font-body font-medium text-sm transition-all duration-400"
              >
                <span>See Our Process</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
              
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-body font-medium text-sm text-alchemy-black/70 hover:text-alchemy-black transition-colors"
                style={{ border: '1px solid rgba(10, 10, 10, 0.15)' }}
              >
                <span>Start a Project</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right column - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="border-b border-alchemy-black/10 pb-6 group"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <span 
                      className="font-display text-5xl md:text-6xl italic block mb-2"
                      style={{ color: '#dc2626' }}
                    >
                      {stat.number}
                    </span>
                    <span className="font-display text-lg text-alchemy-black block mb-1">
                      {stat.label}
                    </span>
                    <span className="font-body text-sm text-alchemy-black/40 font-light">
                      {stat.subtext}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          style={{ scale: quoteScale, opacity: quoteOpacity }}
          className="mt-24 text-center"
        >
          <motion.blockquote 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-2xl md:text-3xl lg:text-4xl italic text-alchemy-black/80 max-w-3xl mx-auto leading-[1.3] text-balance"
          >
            "The best brands don't explain themselves. They 
            <span style={{ color: '#dc2626' }}> feel inevitable</span>."
          </motion.blockquote>
          <motion.cite 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="block mt-6 font-mono text-[10px] text-alchemy-black/30 not-italic uppercase tracking-[0.2em]"
          >
            — Alchemy Labs Philosophy
          </motion.cite>
        </motion.div>
      </div>
    </section>
  );
};
