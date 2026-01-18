import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const principles = [
  {
    highlight: 'Conceptual',
    rest: 'Depth',
    description: 'We prototype visions. Every project is a proof of possibility.',
  },
  {
    highlight: 'Systems',
    rest: 'Thinking',
    description: 'Infrastructure over incidents. Scalable foundations.',
  },
  {
    highlight: 'Taste',
    rest: 'First',
    description: 'AI amplifies capability—human judgment ensures quality.',
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
      className="relative py-40 overflow-hidden"
    >
      {/* Mesh gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-alchemy-red/8 via-alchemy-red/3 to-transparent rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-deep-crimson/6 via-transparent to-transparent rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-conic from-alchemy-red/5 via-transparent to-alchemy-red/3 rounded-full blur-[150px] opacity-50" />
      </div>

      {/* Large background number */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ y: numberY, opacity: numberOpacity }}
      >
        <span className="section-number">02</span>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-16">
        {/* Editorial Statement - Realistic for new agency */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.4 }}
          className="text-center mb-24"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-display tracking-display text-porcelain max-w-5xl mx-auto text-balance">
            <motion.span
              className="text-porcelain/80 inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              We're a new studio with
            </motion.span>
            <motion.span
              className="italic text-alchemy-red inline-block"
              initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.9 }}
            >
              {' '}proven instincts
            </motion.span>
            <motion.span
              className="text-porcelain/80 inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {' '}and{' '}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 25, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="italic text-glow-red inline-block"
            >
              conceptual range
            </motion.span>
            <motion.span
              className="text-porcelain/40 inline-block"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.4, type: 'spring' }}
            >
              .
            </motion.span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="font-body text-lg md:text-xl text-porcelain/50 mt-10 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Our portfolio is conceptual—our capabilities are{' '}
            <span className="font-display italic text-porcelain/80">production-ready</span>. 
            We've built the systems. Now we're looking for the brands brave enough to use them.
          </motion.p>
        </motion.div>

        {/* Principle Cards with liquid glass effects */}
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
              className="relative rounded-2xl p-10 text-center group overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(225, 6, 19, 0.03) 100%)',
                backdropFilter: 'blur(40px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: `
                  0 8px 32px rgba(0, 0, 0, 0.3),
                  0 0 60px rgba(225, 6, 19, 0.05),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  inset 0 -1px 0 rgba(225, 6, 19, 0.05)
                `,
              }}
            >
              {/* Liquid gradient hover overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'radial-gradient(ellipse at 50% 0%, rgba(225, 6, 19, 0.15) 0%, transparent 70%)',
                }}
              />
              
              {/* Mesh accent */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-radial from-alchemy-red/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <span className="font-mono text-xs text-alchemy-red/60 tracking-label uppercase relative z-10">
                0{i + 1}
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-porcelain mt-5 mb-5 relative z-10 text-balance">
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

        {/* Honest positioning statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div 
            className="inline-block px-8 py-6 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(225, 6, 19, 0.08) 0%, rgba(225, 6, 19, 0.03) 100%)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(225, 6, 19, 0.15)',
            }}
          >
            <p className="font-body text-base md:text-lg text-porcelain/70 font-light">
              <span className="text-alchemy-red font-display italic">Zero clients. Infinite preparation.</span>
              <br />
              <span className="text-porcelain/50 text-sm mt-2 block">
                Every concept you see is a demonstration of what we'll build for you.
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};