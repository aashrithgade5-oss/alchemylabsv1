import { motion, AnimatePresence } from 'framer-motion';
import { useState, memo } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What do we mean by "24 hours"?',
    answer: 'From the moment we align on scope, you receive the first working version within 24 hours. Not a mood board—a functional build. This includes landing pages, visual systems, or AI-powered prototypes depending on your project.',
  },
  {
    question: 'How do unlimited iterations work?',
    answer: 'Once your sprint is active, we iterate until you\'re satisfied. No nickel-and-diming for revisions. We work in tight feedback loops—you share input, we ship updates, repeat until it feels right.',
  },
  {
    question: 'Do you work with early-stage founders?',
    answer: 'Yes, and we prefer it. Early-stage means we can shape the brand from scratch without legacy constraints. We\'ve designed our pricing and process specifically for founders who move fast and think big.',
  },
  {
    question: 'Can you sign an NDA?',
    answer: 'Absolutely. Confidentiality is standard. We\'re happy to sign your NDA or provide ours before any substantive discussion begins. Just ask during the first call.',
  },
  {
    question: 'What if I\'m not sure what I need?',
    answer: 'That\'s exactly what the first call is for. We\'ll map your situation, identify the fastest path to a meaningful win, and recommend whether AI, branding, or strategy is the right starting point. No commitment required.',
  },
  {
    question: 'How do we start?',
    answer: 'Book a 15-minute sprint call. We\'ll clarify your goals, assess fit, and—if there\'s alignment—send you a mini-plan within 24 hours. From there, we can kick off immediately or schedule based on your timeline.',
  },
];

export const FAQSection = memo(() => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, hsl(240 5% 3%) 0%, hsl(240 8% 5%) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full backdrop-blur-md mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
            }}
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-porcelain/80">
              FAQ
            </span>
          </span>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-porcelain mb-6">
            Short answers. <span className="italic text-alchemy-red">No smoke.</span>
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left rounded-xl p-6 transition-all duration-300"
                style={{
                  background: openIndex === i 
                    ? 'linear-gradient(135deg, rgba(220, 38, 38, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                  border: openIndex === i 
                    ? '1px solid rgba(220, 38, 38, 0.25)'
                    : '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-body text-base md:text-lg font-medium text-porcelain pr-4">
                    {faq.question}
                  </h3>
                  <div 
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: openIndex === i 
                        ? 'rgba(220, 38, 38, 0.2)'
                        : 'rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    {openIndex === i ? (
                      <Minus className="w-4 h-4 text-alchemy-red" />
                    ) : (
                      <Plus className="w-4 h-4 text-porcelain/60" />
                    )}
                  </div>
                </div>
                
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-body text-sm md:text-base text-porcelain/60 font-light leading-relaxed mt-4 pt-4 border-t border-porcelain/5">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

FAQSection.displayName = 'FAQSection';
