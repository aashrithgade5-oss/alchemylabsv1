import { memo } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoPlaceholderProps {
  aspectRatio?: string;
  gradient?: string;
  className?: string;
}

export const VideoPlaceholder = memo(({
  aspectRatio = '1/1',
  gradient,
  className,
}: VideoPlaceholderProps) => {
  const bg = gradient || 'radial-gradient(ellipse at center, rgba(220,38,38,0.15) 0%, rgba(220,38,38,0.02) 60%, transparent 80%)';

  return (
    <div
      className={cn('relative overflow-hidden rounded-2xl', className)}
      style={{ aspectRatio }}
    >
      {/* Base gradient */}
      <div className="absolute inset-0" style={{ background: bg }} />

      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />

      {/* Play icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            border: '1.5px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.03)',
          }}
        >
          <Play className="w-6 h-6 text-porcelain/20 ml-1" />
        </div>
      </div>
    </div>
  );
});

VideoPlaceholder.displayName = 'VideoPlaceholder';
