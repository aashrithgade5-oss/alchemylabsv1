import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface FounderCircleProps {
  name: string;
  title: string;
  descriptor: string;
  portfolioUrl: string;
  variant: 'yin' | 'yang';
  mouseX: any;
  mouseY: any;
}

const FounderCircle = memo(({ name, title, descriptor, portfolioUrl, variant, mouseX, mouseY }: FounderCircleProps) => {
  const isYin = variant === 'yin';
  
  // Parallax transforms based on mouse position
  const x = useTransform(mouseX, [0, 1], isYin ? [-15, 15] : [15, -15]);
  const y = useTransform(mouseY, [0, 1], [-10, 10]);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  
  return (
    <motion.div
      className={`relative flex flex-col items-center justify-center ${isYin ? 'order-1' : 'order-3'}`}
      style={{ x: springX, y: springY }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-40"
        animate={{ 
          rotate: isYin ? 360 : -360,
          scale: [1, 1.03, 1]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }}
        style={{
          background: isYin 
            ? 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(220,38,38,0.2) 0%, transparent 70%)',
          boxShadow: isYin
            ? '0 0 80px rgba(255,255,255,0.1), 0 0 120px rgba(220,38,38,0.05)'
            : '0 0 80px rgba(220,38,38,0.15), 0 0 120px rgba(220,38,38,0.08)'
        }}
      />
      
      {/* Main circle */}
      <motion.div
        className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full flex items-center justify-center cursor-pointer group"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: isYin
            ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, rgba(220,38,38,0.05) 100%)'
            : 'linear-gradient(135deg, rgba(220,38,38,0.15) 0%, rgba(185,28,28,0.08) 50%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(40px) saturate(180%)',
          border: isYin 
            ? '1px solid rgba(255,255,255,0.12)'
            : '1px solid rgba(220,38,38,0.25)',
          boxShadow: isYin
            ? 'inset 0 1px 0 rgba(255,255,255,0.15), 0 8px 32px rgba(0,0,0,0.3)'
            : 'inset 0 1px 0 rgba(220,38,38,0.1), 0 8px 32px rgba(220,38,38,0.15), 0 0 60px rgba(220,38,38,0.1)'
        }}
      >
        {/* Hover glow */}
        <div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: isYin
              ? 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.1) 0%, transparent 60%)'
              : 'radial-gradient(ellipse at 50% 30%, rgba(220,38,38,0.15) 0%, transparent 60%)'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 text-center px-6 sm:px-8">
          {/* Name */}
          <h3 className="font-display text-xl sm:text-2xl md:text-3xl italic text-porcelain mb-2">
            {name}
          </h3>
          
          {/* Title */}
          <p className="font-mono text-[10px] sm:text-xs text-alchemy-red/80 tracking-[0.15em] uppercase mb-3 sm:mb-4">
            {title}
          </p>
          
          {/* Descriptor */}
          <p className="font-body text-xs sm:text-sm text-porcelain/50 mb-4 sm:mb-6 line-clamp-2">
            {descriptor}
          </p>
          
          {/* CTA Button - glass pill style */}
          <Link
            to={portfolioUrl}
            className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-body font-medium transition-all duration-300 group/btn"
            style={{
              background: 'rgba(220,38,38,0.15)',
              border: '1px solid rgba(220,38,38,0.4)',
              boxShadow: '0 0 20px rgba(220,38,38,0.15)'
            }}
          >
            <span className="text-porcelain group-hover/btn:text-alchemy-red transition-colors">
              Discover Portfolio
            </span>
            <motion.span
              className="text-alchemy-red"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
});

FounderCircle.displayName = 'FounderCircle';

export const YinYangHero = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-12"
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[200px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.12, 0.08]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.3) 0%, transparent 70%)' }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[180px]"
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.06, 0.1, 0.06]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.25) 0%, transparent 70%)' }}
        />
      </div>

      {/* Particle effect dots - reduced count on mobile */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-alchemy-red/20"
          style={{
            left: `${15 + (i * 9)}%`,
            top: `${20 + (i * 6) % 60}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title section */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-porcelain tracking-tight mb-3 sm:mb-4">
            MEET OUR FOUNDERS
          </h1>
          <p className="font-mono text-xs sm:text-sm text-porcelain/60 tracking-[0.2em] uppercase">
            Architects of meaning, systems, and inevitability
          </p>
        </motion.div>

        {/* Yin Yang circles layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-4 xl:gap-8">
          <FounderCircle
            name="Aashrith"
            title="Founder · CEO · Director"
            descriptor="Brand Architecture · Creative Direction · AI-Native Strategy"
            portfolioUrl="/aashrith"
            variant="yin"
            mouseX={mouseX}
            mouseY={mouseY}
          />
          
          {/* Center gap with subtle connector */}
          <div className="hidden lg:flex flex-col items-center justify-center h-32 lg:h-48">
            <div className="w-px h-full bg-gradient-to-b from-transparent via-alchemy-red/20 to-transparent" />
          </div>
          
          <FounderCircle
            name="Eva Doshi"
            title="Co-Founder · Client Relations · Outreach"
            descriptor="Luxury Brand Strategy · Creative Direction · Growth & Partnerships"
            portfolioUrl="/eva"
            variant="yang"
            mouseX={mouseX}
            mouseY={mouseY}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-alchemy-red/60" />
        </motion.div>
      </motion.div>
    </section>
  );
});

YinYangHero.displayName = 'YinYangHero';
