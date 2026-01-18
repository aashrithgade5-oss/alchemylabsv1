import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

const stats = [
  { number: '50+', label: 'Projects Delivered' },
  { number: '98%', label: 'Client Retention' },
  { number: '3x', label: 'Average ROI' },
];

export const EditorialSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const numberY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden section-cream"
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Large background number */}
      <motion.div
        className="absolute -left-20 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ y: numberY }}
      >
        <span className="font-display italic text-[25vw] leading-none text-alchemy-black/[0.03]">
          03
        </span>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Main editorial content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Text */}
          <motion.div
            style={{ y: textY }}
            className="space-y-8"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-mono text-xs uppercase tracking-[0.2em] text-alchemy-black/50"
            >
              The Thesis
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-alchemy-black"
            >
              Most brands chase{' '}
              <span className="italic text-alchemy-red">relevance</span>.
              <br />
              Icons design{' '}
              <span className="italic text-alchemy-red">permanence</span>.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-lg text-alchemy-black/60 leading-relaxed max-w-lg"
            >
              We build strategic systems that compound over time—not campaigns that expire. 
              Every touchpoint is engineered to reinforce your position in culture.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <MagneticButton
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-alchemy-black text-porcelain font-body font-medium transition-all duration-300 hover:bg-alchemy-red hover:shadow-[0_0_30px_rgba(225,6,19,0.3)]"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right column - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="border-b border-alchemy-black/10 pb-8 group"
              >
                <div className="flex items-end justify-between">
                  <div>
                    <span className="font-display text-6xl md:text-7xl italic text-alchemy-red group-hover:text-glow-red transition-all duration-300">
                      {stat.number}
                    </span>
                  </div>
                  <span className="font-body text-sm text-alchemy-black/50 uppercase tracking-wider pb-4">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl italic text-alchemy-black/80 max-w-4xl mx-auto leading-relaxed">
            "In a world drowning in content, the brands that win are the ones that 
            <span className="text-alchemy-red"> mean something</span>."
          </blockquote>
          <cite className="block mt-6 font-mono text-sm text-alchemy-black/40 not-italic uppercase tracking-wider">
            — Alchemy Labs Founding Principle
          </cite>
        </motion.div>
      </div>
    </section>
  );
};
