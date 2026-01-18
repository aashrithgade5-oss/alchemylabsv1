import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const principles = [
  {
    highlight: 'Restraint',
    rest: 'Over Noise',
    description: 'In a world of infinite content, precision is luxury.',
  },
  {
    highlight: 'Systems',
    rest: 'Over Luck',
    description: 'Repeatability is the foundation of scale.',
  },
  {
    highlight: 'Taste',
    rest: 'Over Templates',
    description: 'Cultural fluency cannot be automated—yet.',
  },
];

export const Manifesto = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax for background number
  const numberY = useTransform(scrollYProgress, [0, 1], ['15%', '-15%']);
  const numberOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.04, 0.04, 0]);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative py-40 overflow-hidden section-gradient"
    >
      {/* Large background number */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ y: numberY, opacity: numberOpacity }}
      >
        <span className="section-number">02</span>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-16">
        {/* Editorial Statement with premium reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.4 }}
          className="text-center mb-24"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-display tracking-display text-porcelain max-w-5xl mx-auto">
            <motion.span
              className="italic text-alchemy-red inline-block"
              initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              Alchemy Labs
            </motion.span>
            <motion.span
              className="text-porcelain/80 inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {' '}is built at the intersection of{' '}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 25, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="italic text-glow-red inline-block"
            >
              taste
            </motion.span>
            <motion.span
              className="text-porcelain/80 inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              ,{' '}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 25, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.65, duration: 0.8 }}
              className="italic text-glow-red inline-block"
            >
              systems
            </motion.span>
            <motion.span
              className="text-porcelain/80 inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              , and{' '}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 25, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="italic text-glow-red inline-block"
            >
              intelligence
            </motion.span>
            <motion.span
              className="text-porcelain/40 inline-block"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1, duration: 0.4, type: 'spring' }}
            >
              .
            </motion.span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="font-body text-lg md:text-xl text-porcelain/50 mt-10 max-w-2xl mx-auto font-light"
          >
            We don't chase trends. We design{' '}
            <span className="font-display italic text-porcelain/80">infrastructure</span>.
          </motion.p>
        </motion.div>

        {/* Principle Cards with hover effects */}
        <div className="grid md:grid-cols-3 gap-8">
          {principles.map((principle, i) => (
            <motion.div
              key={principle.highlight}
              initial={{ opacity: 0, y: 40, filter: 'blur(15px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.12,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -10, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
              className="glass-deep rounded-2xl p-10 text-center group relative overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-alchemy-red/0 to-alchemy-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <span className="font-mono text-xs text-alchemy-red/60 tracking-label uppercase relative z-10">
                0{i + 1}
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-porcelain mt-5 mb-5 relative z-10">
                <span className="italic text-alchemy-red group-hover:text-glow-red transition-all duration-500">
                  {principle.highlight}
                </span>{' '}
                <span className="text-porcelain/80">{principle.rest}</span>
              </h3>
              <p className="font-body text-base text-porcelain/50 leading-relaxed font-light relative z-10">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
