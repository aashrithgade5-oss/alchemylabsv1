import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const firstCallSteps = [
  'We map the fastest path to a win',
  'You get a mini plan within 24h',
  "If we're not the fit, we refer you",
];

export const Manifesto = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const numberOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.03, 0.03, 0]);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-alchemy-red/6 via-transparent to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-radial from-deep-crimson/5 via-transparent to-transparent rounded-full blur-[100px]" />
      </div>

      {/* Background number */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ opacity: numberOpacity }}
      >
        <span className="font-display text-[30vw] leading-none text-porcelain/[0.02]">02</span>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full backdrop-blur-md mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
            }}
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-porcelain/80">
              Why Alchemy Labs
            </span>
          </span>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[-0.02em] text-porcelain max-w-4xl mx-auto text-balance mb-6">
            <span className="text-porcelain/80">We're a new studio with</span>
            <span className="italic text-alchemy-red"> proven instincts</span>
            <span className="text-porcelain/80"> and </span>
            <span className="italic text-alchemy-red">conceptual range</span>
            <span className="text-porcelain/40">.</span>
          </h2>
          
          <p className="font-body text-base md:text-lg text-porcelain/50 max-w-xl mx-auto font-light leading-relaxed">
            Our portfolio is conceptual—our capabilities are{' '}
            <span className="font-display italic text-porcelain/70">production-ready</span>. 
            We've built the systems. Now we're looking for the brands brave enough to use them.
          </p>
        </motion.div>

        {/* Cards + Risk Reversal Panel */}
        <div className="grid lg:grid-cols-4 gap-6 mb-16">
          {/* Principle Cards */}
          <div className="lg:col-span-3 grid md:grid-cols-3 gap-6">
            {principles.map((principle, i) => (
              <motion.div
                key={principle.highlight}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="relative rounded-2xl p-8 text-center group overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                {/* Hover glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(220, 38, 38, 0.1) 0%, transparent 70%)' }}
                />
                
                <span className="font-mono text-[10px] text-alchemy-red/60 tracking-[0.2em] uppercase relative z-10">
                  0{i + 1}
                </span>
                <h3 className="font-display text-xl md:text-2xl text-porcelain mt-4 mb-4 relative z-10">
                  <span className="italic text-alchemy-red">{principle.highlight}</span>{' '}
                  <span className="text-porcelain/80">{principle.rest}</span>
                </h3>
                <p className="font-body text-sm text-porcelain/50 leading-relaxed font-light relative z-10">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Risk Reversal Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="rounded-2xl p-6 lg:p-8"
            style={{
              background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
              border: '1px solid rgba(220, 38, 38, 0.2)',
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(220, 38, 38, 0.15)',
                  border: '1px solid rgba(220, 38, 38, 0.3)',
                }}
              >
                <MessageCircle className="w-5 h-5 text-alchemy-red" />
              </div>
              <h4 className="font-display text-lg italic text-porcelain">
                What happens on the first call
              </h4>
            </div>
            
            <ul className="space-y-3 mb-6">
              {firstCallSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-alchemy-red mt-0.5 flex-shrink-0" />
                  <span className="font-body text-sm text-porcelain/70 font-light">{step}</span>
                </li>
              ))}
            </ul>
            
            <Link
              to="/book-sprint"
              className="inline-flex items-center gap-2 text-sm text-alchemy-red hover:text-porcelain transition-colors font-body"
            >
              <span>Book your free call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom Callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center"
        >
          <div 
            className="inline-block px-8 py-6 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
              border: '1px solid rgba(220, 38, 38, 0.12)',
            }}
          >
            <p className="font-body text-base text-porcelain/70 font-light">
              <span className="text-alchemy-red font-display italic">Every first call is free.</span>
              <span className="text-porcelain/50 text-sm mt-2 block">
                No pressure. Just clarity on what's possible.
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
