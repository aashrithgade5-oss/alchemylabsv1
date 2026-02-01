import { memo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EyebrowLabel } from './EyebrowLabel';

export interface LightboxItem {
  id: string;
  image: string;
  title: string;
  context: string;
  tags: string[];
  category: string;
}

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: LightboxItem | null;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export const LightboxModal = memo(({
  isOpen,
  onClose,
  item,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
}: LightboxModalProps) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight' && onNext && hasNext) onNext();
    if (e.key === 'ArrowLeft' && onPrev && hasPrev) onPrev();
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop - 95% black for Zen Mode */}
          <motion.div
            className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-porcelain" />
          </button>

          {/* Navigation arrows */}
          {hasPrev && (
            <button
              onClick={onPrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-porcelain" />
            </button>
          )}
          {hasNext && (
            <button
              onClick={onNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-porcelain" />
            </button>
          )}

          {/* Content */}
          <motion.div
            className="relative z-10 w-full max-w-5xl mx-4 sm:mx-8"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {/* Image */}
            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-alchemy-darker mb-6">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="text-center">
              <EyebrowLabel className="mb-3">{item.category}</EyebrowLabel>
              <h3 className="font-display text-2xl sm:text-3xl text-porcelain mb-2">
                {item.title}
              </h3>
              <p className="font-body text-base text-porcelain/60 mb-4 max-w-2xl mx-auto">
                {item.context}
              </p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {item.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-mono text-alchemy-red/80 bg-alchemy-red/10 border border-alchemy-red/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

LightboxModal.displayName = 'LightboxModal';
