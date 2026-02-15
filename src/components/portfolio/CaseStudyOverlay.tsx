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
  accent?: string;
}

interface CaseStudyOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudyData | null;
}

const EASE = [0.22, 1, 0.36, 1] as const;

// Per-case accent system
const accentMap: Record<string, { color: string; glow: string }> = {
  'aether-rituals': { color: 'rgba(212,175,55,0.8)', glow: 'rgba(212,175,55,0.15)' },
  'genesis': { color: 'rgba(180,180,180,0.8)', glow: 'rgba(180,180,180,0.1)' },
  'dior-campaign': { color: 'rgba(168,85,247,0.8)', glow: 'rgba(168,85,247,0.12)' },
  'oakley-showcase': { color: 'rgba(249,115,22,0.8)', glow: 'rgba(249,115,22,0.12)' },
};

const fallbackAccent = { color: 'rgba(220,38,38,0.8)', glow: 'rgba(220,38,38,0.12)' };

export const CaseStudyOverlay = memo(({ isOpen, onClose, caseStudy }: CaseStudyOverlayProps) => {
  const accent = caseStudy ? (accentMap[caseStudy.id] || fallbackAccent) : fallbackAccent;

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
          {/* Backdrop — shallow depth-of-field */}
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(16px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Centered Modal */}
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-8 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl pointer-events-auto"
              style={{
                background: 'linear-gradient(135deg, rgba(12,12,12,0.97) 0%, rgba(6,6,6,0.99) 100%)',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: `0 0 80px ${accent.glow}, 0 40px 120px rgba(0,0,0,0.8)`,
              }}
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Accent glow line at top */}
              <div
                className="absolute top-0 inset-x-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)` }}
              />

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-[100] w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <X className="w-4 h-4 text-white/70" />
              </button>

              {/* Hero image */}
              <motion.div
                className="relative w-full aspect-[16/9] overflow-hidden rounded-t-2xl"
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <img
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,12,12,0.97)] via-[rgba(12,12,12,0.3)] to-transparent" />
                {/* Accent vignette */}
                <div
                  className="absolute inset-0"
                  style={{ background: `radial-gradient(ellipse at center bottom, ${accent.glow} 0%, transparent 60%)` }}
                />
              </motion.div>

              <div className="px-6 sm:px-8 -mt-10 relative z-10 pb-10">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
                >
                  <span
                    className="inline-block font-mono text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-4"
                    style={{
                      background: accent.glow,
                      border: `1px solid ${accent.color.replace('0.8', '0.3')}`,
                      color: accent.color,
                    }}
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
                      <span style={{ color: accent.color }}>{caseStudy.timeline}</span>
                    </div>
                    <div className="font-mono text-[10px] text-white/40">
                      <span className="text-white/25">Tools: </span>
                      {caseStudy.tools.join(', ')}
                    </div>
                  </div>
                </motion.div>

                {/* Divider */}
                <div
                  className="w-full h-px mb-8"
                  style={{ background: `linear-gradient(90deg, ${accent.color.replace('0.8', '0.4')} 0%, rgba(255,255,255,0.05) 100%)` }}
                />

                {/* Challenge */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
                  className="mb-8"
                >
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: accent.color.replace('0.8', '0.6') }}>
                    The Challenge
                  </h3>
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
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: accent.color.replace('0.8', '0.6') }}>
                    Our Approach
                  </h3>
                  <p className="font-body text-sm text-white/60 leading-relaxed mb-5">
                    {caseStudy.approach}
                  </p>
                  <div className="space-y-3">
                    {caseStudy.process.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold mt-0.5"
                          style={{
                            background: accent.glow,
                            border: `1px solid ${accent.color.replace('0.8', '0.3')}`,
                            color: accent.color,
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
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: accent.color.replace('0.8', '0.6') }}>
                    Impact
                  </h3>
                  <div className="space-y-2">
                    {caseStudy.results.map((result, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0" style={{ color: accent.color.replace('0.8', '0.5') }} />
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
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

CaseStudyOverlay.displayName = 'CaseStudyOverlay';
