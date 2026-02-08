import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getIsMobile } from '@/lib/utils';

type SceneMode = 'hero' | 'system' | 'gallery' | 'experience' | 'offer' | 'contact';

interface BackgroundSceneProps {
  mode?: SceneMode;
  className?: string;
}

const sceneConfigs: Record<SceneMode, {
  gradient: string;
  orbs: { x: string; y: string; size: string; color: string; blur: string }[];
  vignette: string;
}> = {
  hero: {
    gradient: 'radial-gradient(ellipse at 30% 30%, rgba(220,38,38,0.08) 0%, transparent 50%)',
    orbs: [
      { x: '25%', y: '30%', size: '600px', color: 'rgba(220,38,38,0.06)', blur: '200px' },
      { x: '75%', y: '60%', size: '400px', color: 'rgba(255,255,255,0.02)', blur: '150px' },
    ],
    vignette: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.8) 100%)',
  },
  system: {
    gradient: 'radial-gradient(ellipse at 50% 50%, rgba(220,38,38,0.04) 0%, transparent 60%)',
    orbs: [
      { x: '50%', y: '50%', size: '800px', color: 'rgba(220,38,38,0.03)', blur: '250px' },
    ],
    vignette: 'radial-gradient(ellipse at center, transparent 50%, rgba(10,10,10,0.6) 100%)',
  },
  gallery: {
    gradient: 'linear-gradient(180deg, rgba(10,10,10,1) 0%, rgba(5,5,5,1) 100%)',
    orbs: [
      { x: '10%', y: '20%', size: '300px', color: 'rgba(220,38,38,0.04)', blur: '120px' },
      { x: '90%', y: '80%', size: '300px', color: 'rgba(220,38,38,0.04)', blur: '120px' },
    ],
    vignette: 'radial-gradient(ellipse at center, transparent 20%, rgba(5,5,5,0.95) 100%)',
  },
  experience: {
    gradient: 'linear-gradient(180deg, rgba(15,15,15,1) 0%, rgba(10,10,10,1) 100%)',
    orbs: [],
    vignette: 'none',
  },
  offer: {
    gradient: 'radial-gradient(ellipse at 50% 80%, rgba(220,38,38,0.06) 0%, transparent 50%)',
    orbs: [
      { x: '50%', y: '70%', size: '500px', color: 'rgba(220,38,38,0.05)', blur: '180px' },
    ],
    vignette: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.7) 100%)',
  },
  contact: {
    gradient: 'radial-gradient(ellipse at 50% 100%, rgba(220,38,38,0.1) 0%, transparent 60%)',
    orbs: [
      { x: '50%', y: '90%', size: '600px', color: 'rgba(220,38,38,0.08)', blur: '200px' },
    ],
    vignette: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.8) 100%)',
  },
};

export const BackgroundScene = memo(({ mode = 'hero', className }: BackgroundSceneProps) => {
  const config = sceneConfigs[mode];
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(getIsMobile());
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{ background: config.gradient }}
      />

      {/* Animated orbs - desktop only */}
      {!isMobile && (
        <AnimatePresence mode="wait">
          {config.orbs.map((orb, i) => (
            <motion.div
              key={`${mode}-orb-${i}`}
              className="absolute rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: [0, 20, 0],
                y: [0, -15, 0],
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                opacity: { duration: 1.2 },
                scale: { duration: 1.2 },
                x: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
                y: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
              }}
              style={{
                left: orb.x,
                top: orb.y,
                width: orb.size,
                height: orb.size,
                background: orb.color,
                filter: `blur(${orb.blur})`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </AnimatePresence>
      )}

      {/* Vignette overlay */}
      {config.vignette !== 'none' && (
        <div
          className="absolute inset-0"
          style={{ background: config.vignette }}
        />
      )}

      {/* Noise grain overlay - 2% opacity */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  );
});

BackgroundScene.displayName = 'BackgroundScene';
