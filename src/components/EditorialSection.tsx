import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Rocket, Palette, Zap } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

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
  const lineWidth = useTransform(scrollYProgress, [0.4, 0.7], ['0%', '80%']);

  return (
    <section id="editorial" ref={sectionRef} className="relative py-32 overflow-hidden section-cream">
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(245,241,232,0.5) 100%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <motion.div style={{ y: textY }} className="space-y-8">
            <motion.span
              initial={{ opacity: 0, y: 20, letterSpacing: '0.5em' }}
              whileInView={{ opacity: 1, y: 0, letterSpacing: '0.25em' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="inline-block font-mono text-[10px] uppercase tracking-[0.25em] text-alchemy-black/40"
            >
              Our Promise
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-[-0.02em] text-alchemy-black text-balance"
            >
              <span className="block">
                Most agencies sell{' '}
                <motion.span 
                  className="italic inline-block" 
                  style={{ color: '#dc2626' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  hours
                </motion.span>.
              </span>
              <span className="block">
                We deliver{' '}
                <motion.span 
                  className="italic inline-block" 
                  style={{ color: '#dc2626' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  outcomes
                </motion.span>.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-body text-base md:text-lg text-alchemy-black/60 leading-relaxed max-w-lg font-light"
            >
              We're not counting billable hours—we're engineering brand infrastructure 
              that compounds. AI acceleration means premium output at startup speed.
            </motion.p>

            {/* Outcome pills — bounce in */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap gap-3"
            >
              {outcomeExamples.map((example, i) => {
                const Icon = example.icon;
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full cursor-default"
                    style={{
                      background: 'rgba(10, 10, 10, 0.06)',
                      border: '1px solid rgba(10, 10, 10, 0.1)',
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: '#dc2626' }} />
                    <span className="font-body text-sm text-alchemy-black/70">{example.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton
                href="#process"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-alchemy-black text-porcelain font-body font-medium text-sm transition-all duration-400 shadow-lg"
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

          {/* Right column — Stats with dramatic entrances */}
          <motion.div
            initial={{ opacity: 0, x: 50, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 8 }}
                className="border-b border-alchemy-black/10 pb-6 group cursor-default"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <motion.span 
                      className="font-display text-5xl md:text-6xl italic block mb-2"
                      style={{ color: '#dc2626' }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {stat.number}
                    </motion.span>
                    <span className="font-display text-lg text-alchemy-black block mb-1">{stat.label}</span>
                    <span className="font-body text-sm text-alchemy-black/40 font-light">{stat.subtext}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Quote with animated line */}
        <div className="mt-24 text-center">
          <motion.div
            className="h-px mb-12 mx-auto"
            style={{
              width: lineWidth,
              background: 'linear-gradient(90deg, transparent, #dc2626, transparent)',
            }}
          />
          
          <motion.blockquote 
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-2xl md:text-3xl lg:text-4xl italic text-alchemy-black/80 max-w-3xl mx-auto leading-[1.35] text-balance"
          >
            <span className="block">"The best brands don't explain themselves.</span>
            <span className="block">They<span style={{ color: '#dc2626' }}> feel inevitable</span>."</span>
          </motion.blockquote>
          <cite className="block mt-6 font-mono text-[10px] text-alchemy-black/25 not-italic uppercase tracking-[0.25em]">
            — Alchemy Labs Philosophy
          </cite>
        </div>
      </div>
    </section>
  );
};
