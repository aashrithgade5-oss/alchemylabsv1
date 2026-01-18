import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

// Premium positioning metrics - not hypothetical, but aspirational and honest
const stats = [
  { number: '∞', label: 'Creative Capacity', subtext: 'Limitless production potential' },
  { number: '24h', label: 'Concept Speed', subtext: 'From brief to visual in a day' },
  { number: '1:1', label: 'Founder Access', subtext: 'Direct collaboration, no layers' },
];

export const EditorialSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const numberY = useTransform(scrollYProgress, [0, 1], ['30%', '-30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['15%', '-15%']);
  const quoteScale = useTransform(scrollYProgress, [0.5, 0.8], [0.95, 1]);
  const quoteOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <section
      id="editorial"
      ref={sectionRef}
      className="relative py-40 overflow-hidden section-cream"
    >
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Large parallax background number */}
      <motion.div
        className="absolute -left-10 md:-left-20 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ y: numberY }}
      >
        <span className="font-display italic text-[30vw] md:text-[25vw] leading-none text-alchemy-black/[0.025]">
          03
        </span>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Main editorial content */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left column - Text with parallax */}
          <motion.div
            style={{ y: textY }}
            className="space-y-10"
          >
            <motion.span
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="inline-block font-mono text-xs uppercase tracking-[0.25em] text-alchemy-black/40"
            >
              Our Promise
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 40, filter: 'blur(15px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-alchemy-black text-balance"
            >
              Most agencies sell{' '}
              <span className="italic text-alchemy-red">hours</span>.
              <br />
              We deliver{' '}
              <span className="italic text-alchemy-red">outcomes</span>.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-body text-lg md:text-xl text-alchemy-black/60 leading-relaxed max-w-lg"
            >
              We're not counting billable hours—we're engineering brand infrastructure 
              that compounds. AI acceleration means premium output at startup speed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <MagneticButton
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-alchemy-black text-porcelain font-body font-medium transition-all duration-500 hover:bg-alchemy-red hover:shadow-[0_0_40px_rgba(225,6,19,0.4)]"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right column - Premium positioning metrics */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.15 }}
                className="border-b border-alchemy-black/10 pb-8 group"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <motion.span 
                      className="font-display text-5xl md:text-6xl lg:text-7xl italic text-alchemy-red block mb-2"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      {stat.number}
                    </motion.span>
                    <span className="font-display text-lg md:text-xl text-alchemy-black block mb-1">
                      {stat.label}
                    </span>
                    <span className="font-body text-sm text-alchemy-black/40">
                      {stat.subtext}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom quote with scale animation */}
        <motion.div
          style={{ scale: quoteScale, opacity: quoteOpacity }}
          className="mt-32 text-center"
        >
          <motion.blockquote 
            initial={{ opacity: 0, y: 60, filter: 'blur(20px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="font-display text-2xl md:text-3xl lg:text-4xl xl:text-5xl italic text-alchemy-black/80 max-w-4xl mx-auto leading-[1.3] text-balance"
          >
            "The best brands don't explain themselves. They 
            <span className="text-alchemy-red"> feel inevitable</span>."
          </motion.blockquote>
          <motion.cite 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="block mt-8 font-mono text-sm text-alchemy-black/30 not-italic uppercase tracking-[0.2em]"
          >
            — Alchemy Labs Philosophy
          </motion.cite>
        </motion.div>
      </div>
    </section>
  );
};