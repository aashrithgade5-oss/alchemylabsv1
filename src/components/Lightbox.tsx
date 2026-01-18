import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc?: string;
  videoSrc?: string;
  caption?: string;
  alt?: string;
}

export const Lightbox = ({ 
  isOpen, 
  onClose, 
  imageSrc, 
  videoSrc,
  caption,
  alt = 'Lightbox image'
}: LightboxProps) => {
  // Handle escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

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
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center cursor-zoom-out"
          onClick={onClose}
        >
          {/* Zen Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-alchemy-black/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-14 h-14 rounded-full glass flex items-center justify-center hover:bg-porcelain/10 transition-colors group"
          >
            <X className="w-6 h-6 text-porcelain/60 group-hover:text-porcelain transition-colors" />
          </motion.button>

          {/* Expand/Close Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-porcelain/40"
          >
            <ZoomOut className="w-4 h-4" />
            <span className="font-mono text-xs tracking-label uppercase">Click or ESC to close</span>
          </motion.div>
          
          {/* Media Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-[90vw] max-h-[85vh] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {videoSrc ? (
              <video
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
              />
            ) : imageSrc ? (
              <img
                src={imageSrc}
                alt={alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
            ) : null}
            
            {/* Mono-spaced caption */}
            {caption && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-10 left-0 right-0 text-center font-mono text-xs text-porcelain/30 tracking-wide truncate px-4"
              >
                {caption}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Clickable media wrapper with custom cursor
interface LightboxTriggerProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export const LightboxTrigger = ({ children, onClick, className = '' }: LightboxTriggerProps) => {
  return (
    <motion.div
      onClick={onClick}
      className={`relative cursor-zoom-in group ${className}`}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      {children}
      
      {/* Expand indicator on hover */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        className="absolute inset-0 flex items-center justify-center bg-alchemy-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      >
        <div className="w-16 h-16 rounded-full glass flex items-center justify-center">
          <ZoomIn className="w-6 h-6 text-porcelain" />
        </div>
      </motion.div>
    </motion.div>
  );
};
