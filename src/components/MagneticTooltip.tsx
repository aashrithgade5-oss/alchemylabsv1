import { memo, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MagneticTooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom';
  className?: string;
}

/**
 * Premium magnetic tooltip — follows cursor with spring physics
 * and reveals with blur-to-sharp + scale transition.
 */
export const MagneticTooltip = memo(({ children, content, position = 'top', className = '' }: MagneticTooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  }, []);

  return (
    <div
      ref={ref}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMove}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="absolute z-50 pointer-events-none whitespace-nowrap"
            style={{
              left: '50%',
              ...(position === 'top' ? { bottom: '100%', marginBottom: 10 } : { top: '100%', marginTop: 10 }),
            }}
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(6px)', x: '-50%', y: position === 'top' ? 8 : -8 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', x: `calc(-50% + ${coords.x * 0.15}px)`, y: position === 'top' ? 0 : 0 }}
            exit={{ opacity: 0, scale: 0.85, filter: 'blur(6px)', x: '-50%', y: position === 'top' ? 8 : -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <div
              className="px-3 py-1.5 rounded-lg font-mono text-[10px] tracking-wider uppercase"
              style={{
                background: 'rgba(15,15,15,0.9)',
                backdropFilter: 'blur(16px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(250,250,249,0.7)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.06)',
              }}
            >
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

MagneticTooltip.displayName = 'MagneticTooltip';
