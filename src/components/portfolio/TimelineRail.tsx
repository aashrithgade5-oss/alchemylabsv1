import { memo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TimelineEntry {
  id: string;
  title: string;
  company: string;
  dates: string;
  highlights: string[];
  revenueSignal?: string;
}

interface TimelineRailProps {
  entries: TimelineEntry[];
  className?: string;
}

const TimelineCard = memo(({ entry, index }: { entry: TimelineEntry; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1]);

  return (
    <motion.div
      ref={ref}
      className="relative pl-8 sm:pl-12 pb-12 last:pb-0"
      style={{ opacity, scale }}
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-alchemy-red/50 via-alchemy-red/20 to-transparent" />

      {/* Timeline dot with pulse */}
      <div className="absolute left-0 top-2 -translate-x-1/2">
        <motion.div
          className="w-3 h-3 rounded-full bg-alchemy-red"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(220,38,38,0.4)',
              '0 0 0 8px rgba(220,38,38,0)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <span className="font-mono text-xs text-porcelain/40 tracking-wide">
          {entry.dates}
        </span>
        <h4 className="font-body font-semibold text-lg sm:text-xl text-porcelain">
          {entry.title}
        </h4>
        <p className="font-body text-sm text-alchemy-red/80">
          {entry.company}
        </p>
        {entry.revenueSignal && (
          <p className="font-mono text-xs text-porcelain/60 mt-2">
            {entry.revenueSignal}
          </p>
        )}
        <ul className="space-y-1 mt-3">
          {entry.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-porcelain/60">
              <span className="text-alchemy-red/60 mt-1.5">•</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
});

TimelineCard.displayName = 'TimelineCard';

export const TimelineRail = memo(({ entries, className }: TimelineRailProps) => {
  return (
    <div className={cn('relative', className)}>
      {entries.map((entry, i) => (
        <TimelineCard key={entry.id} entry={entry} index={i} />
      ))}
    </div>
  );
});

TimelineRail.displayName = 'TimelineRail';
