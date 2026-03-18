import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, memo } from 'react';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const principles = [
  {
    highlight: 'Conceptual',
    rest: 'Depth',
    description: 'We prototype visions. Every project is a proof of possibility.',
    number: '01',
  },
  {
    highlight: 'Systems',
    rest: 'Thinking',
    description: 'Infrastructure over incidents. Scalable foundations.',
    number: '02',
  },
  {
    highlight: 'Taste',
    rest: 'First',
    description: 'AI amplifies capability—human judgment ensures quality.',
    number: '03',
  },
];

const firstCallSteps = [
  'We map the fastest path to a win',
  'You get a mini plan within 24h',
  "If we're not the fit, we refer you",
];

export const Manifesto = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const lineWidth = useTransform(scrollYProgress, [0.3, 0.6], ['0%', '100%']);

  return (
    <section id="manifesto" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ background: 'rgba(220,38,38,0.06)' }}
          animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Header — dramatic */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(220,38,38,0.1)',
              border: '1px solid rgba(220,38,38,0.3)',
              boxShadow: '0 0 20px rgba(220,38,38,0.1)',
            }}
          >
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-porcelain/80">
              Why Alchemy Labs
            </span>
          </span>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[-0.02em] text-porcelain max-w-4xl mx-auto text-balance mb-6">
            <span className="block text-porcelain/80">We're a new studio with</span>
            <span className="block">
              <motion.span 
                className="italic text-alchemy-red inline-block"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{ textShadow: '0 0 40px rgba(220,38,38,0.3)' }}
              >
                proven instincts
              </motion.span>
              <span className="text-porcelain/80"> and </span>
              <motion.span 
                className="italic text-alchemy-red inline-block"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                style={{ textShadow: '0 0 40px rgba(220,38,38,0.3)' }}
              >
                conceptual range
              </motion.span>
              <span className="text-porcelain/40">.</span>
            </span>
          </h2>
          
          <p className="font-body text-base md:text-lg text-porcelain/50 max-w-xl mx-auto font-light leading-relaxed">
            Our portfolio is conceptual—our capabilities are{' '}
            <span className="font-display italic text-porcelain/70">production-ready</span>.
          </p>
        </motion.div>

        {/* Cards + Risk Reversal */}
        <div className="grid lg:grid-cols-4 gap-6 mb-16">
          <div className="lg:col-span-3 grid md:grid-cols-3 gap-6">
            {principles.map((principle, i) => (
              <motion.div
                key={principle.highlight}
                initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative rounded-2xl p-8 text-center group overflow-hidden cursor-default"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(220,38,38,0.12) 0%, transparent 70%)' }}
                />
                
                {/* Top specular */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Animated border on hover */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ border: '1px solid rgba(220,38,38,0.3)', boxShadow: '0 0 30px rgba(220,38,38,0.1)' }}
                />
                
                <span className="font-mono text-[10px] text-alchemy-red/60 tracking-[0.25em] uppercase relative z-10">
                  {principle.number}
                </span>
                <h3 className="font-display text-xl md:text-2xl text-porcelain mt-4 mb-4 relative z-10">
                  <span className="italic text-alchemy-red" style={{ textShadow: '0 0 20px rgba(220,38,38,0.2)' }}>{principle.highlight}</span>{' '}
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
            initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="rounded-2xl p-6 lg:p-8"
            style={{
              background: 'linear-gradient(145deg, rgba(220,38,38,0.1) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(220,38,38,0.25)',
              boxShadow: '0 0 40px rgba(220,38,38,0.08)',
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(220,38,38,0.15)',
                  border: '1px solid rgba(220,38,38,0.3)',
                  boxShadow: '0 0 20px rgba(220,38,38,0.15)',
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
                <motion.li 
                  key={i} 
                  className="flex items-start gap-2.5"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <Check className="w-4 h-4 text-alchemy-red mt-0.5 flex-shrink-0" />
                  <span className="font-body text-sm text-porcelain/70 font-light">{step}</span>
                </motion.li>
              ))}
            </ul>
            
            <Link
              to="/book-sprint"
              className="inline-flex items-center gap-2 text-sm text-alchemy-red hover:text-porcelain transition-colors font-body group"
            >
              <span>Book your free call</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom quote with animated line */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-8"
        >
          {/* Animated expanding line */}
          <motion.div
            className="w-full max-w-md mx-auto h-px mb-12"
            style={{
              width: lineWidth,
              background: 'linear-gradient(90deg, transparent, hsl(356 94% 45%), transparent)',
              margin: '0 auto 48px',
            }}
          />

          <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl italic text-porcelain/80 max-w-3xl mx-auto leading-[1.35] text-balance">
            <span className="block">"The best brands don't explain themselves.</span>
            <span className="block">
              They
              <span className="text-alchemy-red" style={{ textShadow: '0 0 30px rgba(220,38,38,0.3)' }}> feel inevitable</span>."
            </span>
          </blockquote>
          <cite className="block mt-6 font-mono text-[10px] text-porcelain/25 not-italic uppercase tracking-[0.25em]">
            — Alchemy Labs Philosophy
          </cite>
        </motion.div>
      </div>
    </section>
  );
});

Manifesto.displayName = 'Manifesto';
