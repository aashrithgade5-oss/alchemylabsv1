import { memo } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ThoughtLeadershipEntry {
  id: string;
  type: 'linkedin' | 'case-study';
  title: string;
  excerpt: string;
  image?: string;
  engagement?: {
    views?: string;
    comments?: string;
    shares?: string;
  };
}

interface ThoughtLeadershipCardProps {
  entry: ThoughtLeadershipEntry;
  className?: string;
  onClick?: () => void;
}

export const ThoughtLeadershipCard = memo(({
  entry,
  className,
  onClick,
}: ThoughtLeadershipCardProps) => {
  const Icon = entry.type === 'linkedin' ? Linkedin : FileText;

  return (
    <motion.div
      className={cn('group cursor-pointer rounded-2xl overflow-hidden', className)}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      whileHover={{
        y: -4,
        borderColor: 'rgba(220,38,38,0.3)',
        boxShadow: '0 12px 40px rgba(220,38,38,0.1)',
      }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      {/* Image area */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
          style={{
            background: entry.image
              ? `url(${entry.image}) center/cover`
              : 'linear-gradient(135deg, rgba(220,38,38,0.1) 0%, rgba(255,255,255,0.02) 100%)',
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 60%)',
          }}
        />
        {/* Type badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm"
          style={{
            background: 'rgba(10,10,10,0.6)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Icon className="w-3 h-3 text-alchemy-red/80" />
          <span className="font-mono text-[10px] text-porcelain/60 uppercase tracking-wider">
            {entry.type === 'linkedin' ? 'LinkedIn' : 'Case Study'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h4 className="font-body font-semibold text-sm sm:text-base text-porcelain mb-2 line-clamp-2">
          {entry.title}
        </h4>
        <p className="font-body text-xs sm:text-sm text-porcelain/50 line-clamp-2 mb-3">
          {entry.excerpt}
        </p>

        {/* Engagement */}
        {entry.engagement && (
          <div className="flex gap-4 font-mono text-[10px] text-alchemy-red/60">
            {entry.engagement.views && <span>{entry.engagement.views} views</span>}
            {entry.engagement.comments && <span>{entry.engagement.comments} comments</span>}
            {entry.engagement.shares && <span>{entry.engagement.shares} shares</span>}
          </div>
        )}
      </div>
    </motion.div>
  );
});

ThoughtLeadershipCard.displayName = 'ThoughtLeadershipCard';
