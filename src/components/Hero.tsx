import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import heroVisual from '@/assets/hero-visual.jpg';

const headlineWords = ['Alchemy', 'in', 'Motion.'];
const subheadlineWords = ['AI-Augmented', 'Branding.'];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-alchemy-black">
        <div className="absolute inset-0 hero-gradient" />
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={heroVisual}
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-alchemy-black/60 via-transparent to-alchemy-black" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-40 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Editorial Column */}
          <div className="space-y-8">
            {/* Headline */}
            <div className="overflow-hidden">
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-display tracking-display">
                {headlineWords.map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2 + i * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block mr-4"
                  >
                    {word}
                  </motion.span>
                ))}
                <br />
                {subheadlineWords.map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.8,
                      delay: 0.6 + i * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block mr-4 text-alchemy-red"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl lg:text-2xl text-porcelain/80 leading-relaxed max-w-xl"
            >
              We architect brand systems for the intelligence era—where strategy, 
              identity, and culture scale through precision.
            </motion.p>

            {/* Tertiary */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="font-mono text-xs text-porcelain/50 tracking-label uppercase"
            >
              EST. 2024 / MUMBAI × SILICON VALLEY
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: [
                    '0 0 24px rgba(225, 6, 19, 0.2)',
                    '0 0 48px rgba(225, 6, 19, 0.4)',
                    '0 0 24px rgba(225, 6, 19, 0.2)',
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2, delay: 2, repeat: 0 },
                }}
                className="glass-cta-primary group"
              >
                <span>Book a Strategy Sprint</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>

              <a
                href="#work"
                className="group inline-flex items-center gap-2 px-6 py-4 text-porcelain/80 hover:text-porcelain transition-colors duration-300"
              >
                <span>Explore Our Work</span>
                <ArrowUpRight className="w-4 h-4 text-alchemy-red transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>
          </div>

          {/* Cinematic Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="aspect-[4/5] glass-deep rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-alchemy-red/10 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="w-20 h-20 mx-auto rounded-full glass-red flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-alchemy-red animate-pulse" />
                  </div>
                  <p className="font-mono text-xs text-porcelain/60 tracking-label uppercase">
                    Intelligence at Work
                  </p>
                </div>
              </div>
            </div>
            
            {/* Floating accent */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-alchemy-red/20 blur-2xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border border-porcelain/30 flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-alchemy-red" />
        </motion.div>
      </motion.div>
    </section>
  );
};
