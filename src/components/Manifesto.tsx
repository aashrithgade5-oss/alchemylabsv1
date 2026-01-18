import { motion } from 'framer-motion';

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
  return (
    <section id="about" className="relative py-32 overflow-hidden section-gradient">
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-16">
        {/* Editorial Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-display tracking-display text-porcelain max-w-5xl mx-auto">
            <span className="italic text-alchemy-red">Alchemy Labs</span>
            <span className="text-porcelain/80"> is built at the intersection of </span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="italic text-alchemy-red"
            >
              taste
            </motion.span>
            <span className="text-porcelain/80">, </span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="italic text-alchemy-red"
            >
              systems
            </motion.span>
            <span className="text-porcelain/80">, and </span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="italic text-alchemy-red"
            >
              intelligence
            </motion.span>
            <span className="text-porcelain/50">.</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="font-body text-lg md:text-xl text-porcelain/50 mt-8 max-w-2xl mx-auto font-light"
          >
            We don't chase trends. We design <span className="font-display italic text-porcelain/80">infrastructure</span>.
          </motion.p>
        </motion.div>

        {/* Principle Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {principles.map((principle, i) => (
            <motion.div
              key={principle.highlight}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.15,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="glass-deep rounded-2xl p-8 text-center"
            >
              <span className="font-mono text-xs text-alchemy-red tracking-label uppercase">
                0{i + 1}
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-porcelain mt-4 mb-4">
                <span className="italic text-alchemy-red">{principle.highlight}</span>{' '}
                <span className="text-porcelain/80">{principle.rest}</span>
              </h3>
              <p className="font-body text-base text-porcelain/50 leading-relaxed font-light">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
