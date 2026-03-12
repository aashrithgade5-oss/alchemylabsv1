import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, memo } from 'react';
import { ChevronRight, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What do we mean by "24 hours"?',
    answer: 'From the moment we align on scope, you receive the first working version within 24 hours. Not a mood board—a functional build.',
    tag: 'Speed',
  },
  {
    question: 'How do unlimited iterations work?',
    answer: "Once your sprint is active, we iterate until you're satisfied. No nickel-and-diming for revisions. We work in tight feedback loops.",
    tag: 'Process',
  },
  {
    question: 'Do you work with early-stage founders?',
    answer: "Yes, and we prefer it. Early-stage means we can shape the brand from scratch without legacy constraints.",
    tag: 'Clients',
  },
  {
    question: 'Can you sign an NDA?',
    answer: "Absolutely. Confidentiality is standard. We're happy to sign your NDA or provide ours before any discussion begins.",
    tag: 'Trust',
  },
  {
    question: "What if I'm not sure what I need?",
    answer: "That's exactly what the first call is for. We'll map your situation and recommend the right starting point. No commitment required.",
    tag: 'Start',
  },
  {
    question: 'How do we start?',
    answer: "Book a 15-minute sprint call. We'll clarify goals, assess fit, and send a mini-plan within 24 hours.",
    tag: 'Begin',
  },
];

// FAQ Card component
const FAQCard = memo(({ faq, isActive, onClick, index }: {
  faq: typeof faqs[0];
  isActive: boolean;
  onClick: () => void;
  index: number;
}) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`relative flex-shrink-0 w-[320px] md:w-[380px] rounded-2xl cursor-pointer overflow-hidden transition-all duration-500 ${
        isActive ? 'ring-1 ring-alchemy-red/40' : ''
      }`}
      style={{
        background: isActive
          ? 'linear-gradient(145deg, rgba(220, 38, 38, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)'
          : 'linear-gradient(145deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
        border: isActive 
          ? '1px solid rgba(220, 38, 38, 0.35)'
          : '1px solid rgba(255, 255, 255, 0.07)',
        backdropFilter: 'blur(20px)',
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Top shimmer */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="p-6 md:p-8">
        {/* Tag */}
        <div className="flex items-center justify-between mb-4">
          <span 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[9px] tracking-[0.15em] uppercase"
            style={{
              background: isActive ? 'rgba(220, 38, 38, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${isActive ? 'rgba(220, 38, 38, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
              color: isActive ? 'hsl(356 94% 55%)' : 'rgba(255, 255, 255, 0.5)',
            }}
          >
            <MessageCircle className="w-3 h-3" />
            {faq.tag}
          </span>
          <span className="font-display text-sm italic text-porcelain/20">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Question */}
        <h3 className={`font-display text-lg md:text-xl italic leading-snug mb-3 transition-colors duration-300 ${
          isActive ? 'text-alchemy-red' : 'text-porcelain'
        }`}>
          {faq.question}
        </h3>

        {/* Answer - expandable */}
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="font-body text-sm text-porcelain/55 font-light leading-relaxed pt-3 border-t border-porcelain/5">
                {faq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand indicator */}
        <motion.div 
          className="flex items-center gap-1 mt-4"
          animate={{ opacity: isActive ? 0 : 0.5 }}
        >
          <span className="font-mono text-[9px] text-porcelain/40 uppercase tracking-wider">
            {isActive ? '' : 'Tap to expand'}
          </span>
          {!isActive && <ChevronRight className="w-3 h-3 text-porcelain/30" />}
        </motion.div>
      </div>

      {/* Active glow */}
      {isActive && (
        <div 
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-full blur-2xl pointer-events-none"
          style={{ background: 'rgba(220, 38, 38, 0.15)' }}
        />
      )}
    </motion.div>
  );
});

FAQCard.displayName = 'FAQCard';

export const FAQSection = memo(() => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = dir === 'left' ? -400 : 400;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section id="faq" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, hsl(0 0% 4% / 0.9) 0%, hsl(0 0% 4% / 0.7) 50%, hsl(0 0% 4% / 0.9) 100%)',
        }} />
        <motion.div
          className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-alchemy-red/5 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 md:mb-16 px-6"
        >
          <span className="inline-block px-3.5 py-1.5 rounded-full mb-5"
            style={{
              background: 'rgba(220, 38, 38, 0.08)',
              border: '1px solid rgba(220, 38, 38, 0.2)',
            }}
          >
            <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-porcelain/70">
              FAQ
            </span>
          </span>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-[-0.02em] text-porcelain">
            <span className="block">Short answers.</span>
            <span className="block italic text-alchemy-red">No smoke.</span>
          </h2>
        </motion.div>

        {/* Scrollable carousel */}
        <div className="relative">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-alchemy-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-alchemy-black to-transparent z-10 pointer-events-none" />

          {/* Scroll buttons */}
          <AnimatePresence>
            {canScrollLeft && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => scroll('left')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(10, 10, 11, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <ChevronRight className="w-4 h-4 text-porcelain rotate-180" />
              </motion.button>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {canScrollRight && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => scroll('right')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(10, 10, 11, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <ChevronRight className="w-4 h-4 text-porcelain" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Cards row */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide px-8 md:px-16 pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {faqs.map((faq, i) => (
              <div key={i} className="snap-center">
                <FAQCard
                  faq={faq}
                  isActive={activeIndex === i}
                  onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                  index={i}
                />
              </div>
            ))}
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {faqs.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIndex(i);
                  scrollRef.current?.children[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? 'bg-alchemy-red w-6'
                    : 'bg-porcelain/15 hover:bg-porcelain/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

FAQSection.displayName = 'FAQSection';
