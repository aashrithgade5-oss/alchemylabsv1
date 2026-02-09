import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ShimmerImage, ShimmerVideo } from '@/components/ShimmerImage';

interface MediaItem {
  src: string;
  type: 'image' | 'video';
  caption?: string;
}

interface MediaCarouselProps {
  items: MediaItem[];
  title: string;
}

export const MediaCarousel = ({ items, title }: MediaCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + items.length) % items.length);
  }, [items.length]);

  if (items.length === 0) return null;

  const item = items[current];

  return (
    <div className="relative w-full">
      {/* Main media area */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-alchemy-black/50">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {item.type === 'video' ? (
              <ShimmerVideo
                src={item.src}
                wrapperClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
            ) : (
              <ShimmerImage
                src={item.src}
                alt={`${title} - ${current + 1}`}
                wrapperClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Navigation arrows */}
        {items.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <ChevronLeft className="w-5 h-5 text-porcelain/80" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); go(1); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <ChevronRight className="w-5 h-5 text-porcelain/80" />
            </button>
          </>
        )}

        {/* Counter */}
        {items.length > 1 && (
          <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full font-mono text-[10px] text-porcelain/60 tracking-wider"
            style={{
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {current + 1} / {items.length}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {items.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
          {items.map((thumb, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`relative flex-shrink-0 w-16 h-11 rounded-lg overflow-hidden transition-all duration-300 ${
                i === current
                  ? 'ring-1 ring-alchemy-red/60 opacity-100'
                  : 'opacity-40 hover:opacity-70'
              }`}
            >
              {thumb.type === 'video' ? (
                <video src={thumb.src} className="w-full h-full object-cover" muted preload="metadata" />
              ) : (
                <img src={thumb.src} alt="" className="w-full h-full object-cover" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
