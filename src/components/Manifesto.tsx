import { motion } from 'framer-motion';

const principles = [
  {
    title: 'Restraint Over Noise',
    highlight: 'Restraint',
    rest: 'Over Noise',
    description: 'In a world of infinite content, precision is luxury.',
  },
  {
    title: 'Systems Over Luck',
    highlight: 'Systems',
    rest: 'Over Luck',
    description: 'Repeatability is the foundation of scale.',
  },
  {
    title: 'Taste Over Templates',
    highlight: 'Taste',
    rest: 'Over Templates',
    description: 'Cultural fluency cannot be automated—yet.',
  },
];

export const Manifesto = () => {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Cream Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-alchemy-black via-cream-editorial to-alchemy-black" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-20">
        {/* Editorial Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2 }}
          className="text-center mb-24"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-display text-graphite-layer max-w-5xl mx-auto">
            Alchemy Labs is built at the intersection of{' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="italic text-alchemy-red"
            >
              taste
            </motion.span>
            ,{' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="italic text-alchemy-red"
            >
              systems
            </motion.span>
            , and{' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="italic text-alchemy-red"
            >
              intelligence
            </motion.span>
            .
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-xl md:text-2xl text-graphite-layer/70 mt-8 max-w-2xl mx-auto"
          >
            We don't chase trends. We design infrastructure.
          </motion.p>
        </motion.div>

        {/* Principle Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {principles.map((principle, i) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, rotateX: -15, y: 30 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.15,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="glass-on-cream rounded-xl p-8 text-center"
            >
              <span className="font-mono text-xs text-alchemy-red tracking-label uppercase">
                0{i + 1}
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-graphite-layer mt-4 mb-4">
                <span className="italic text-alchemy-red">{principle.highlight}</span>{' '}
                <span>{principle.rest}</span>
              </h3>
              <p className="text-graphite-layer/70 leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
