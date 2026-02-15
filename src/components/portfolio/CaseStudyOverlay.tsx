import { memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

export interface CaseStudyData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  challenge: string;
  approach: string;
  process: string[];
  results: string[];
  timeline: string;
  tools: string[];
  tags: string[];
}

interface CaseStudyOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudyData | null;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export const CaseStudyOverlay = memo(({ isOpen, onClose, caseStudy }: CaseStudyOverlayProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && caseStudy && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[90]"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-[95] w-full sm:w-[560px] overflow-y-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(10,10,10,0.97) 0%, rgba(5,5,5,0.99) 100%)',
              backdropFilter: 'blur(40px)',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="fixed top-5 right-5 z-[100] w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <X className="w-4 h-4 text-white/70" />
            </button>

            {/* Content */}
            <div className="pb-12">
              {/* Hero image */}
              <motion.div
                className="relative w-full aspect-video overflow-hidden"
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <img
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.97)] via-transparent to-transparent" />
              </motion.div>

              <div className="px-6 sm:px-8 -mt-12 relative z-10">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
                >
                  <span
                    className="inline-block font-mono text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-4 text-white/50"
                    style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)' }}
                  >
                    Conceptual Exploration
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl text-white leading-tight mb-2">
                    {caseStudy.title}
                  </h2>
                  <p className="font-body text-sm text-white/50 leading-relaxed mb-6">
                    {caseStudy.subtitle}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="font-mono text-[10px] text-white/40">
                      <span className="text-white/25">Timeline: </span>
                      <span className="text-alchemy-red/80">{caseStudy.timeline}</span>
                    </div>
                    <div className="font-mono text-[10px] text-white/40">
                      <span className="text-white/25">Tools: </span>
                      {caseStudy.tools.join(', ')}
                    </div>
                  </div>
                </motion.div>

                {/* Divider */}
                <div className="w-full h-px mb-8" style={{ background: 'linear-gradient(90deg, rgba(220,38,38,0.3) 0%, rgba(255,255,255,0.05) 100%)' }} />

                {/* Challenge */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
                  className="mb-8"
                >
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-alchemy-red/60 mb-3">The Challenge</h3>
                  <p className="font-body text-sm text-white/60 leading-relaxed">
                    {caseStudy.challenge}
                  </p>
                </motion.div>

                {/* Approach */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
                  className="mb-8"
                >
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-alchemy-red/60 mb-3">Our Approach</h3>
                  <p className="font-body text-sm text-white/60 leading-relaxed mb-5">
                    {caseStudy.approach}
                  </p>
                  <div className="space-y-3">
                    {caseStudy.process.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold mt-0.5"
                          style={{
                            background: 'rgba(220,38,38,0.12)',
                            border: '1px solid rgba(220,38,38,0.25)',
                            color: 'rgba(220,38,38,0.8)',
                          }}
                        >
                          {i + 1}
                        </div>
                        <p className="font-body text-xs text-white/50 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Results */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
                  className="mb-8"
                >
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-alchemy-red/60 mb-3">Impact</h3>
                  <div className="space-y-2">
                    {caseStudy.results.map((result, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <ArrowRight className="w-3 h-3 text-alchemy-red/50 mt-1 flex-shrink-0" />
                        <p className="font-body text-xs text-white/55 leading-relaxed">{result}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
                  className="flex flex-wrap gap-2"
                >
                  {caseStudy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-3 py-1.5 rounded-full text-white/50"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

CaseStudyOverlay.displayName = 'CaseStudyOverlay';
