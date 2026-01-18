import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'works', label: 'Works' },
  { id: 'manifesto', label: 'Thesis' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'journal', label: 'Journal' },
  { id: 'contact', label: 'Contact' },
];

export const HomepageScrollMap = () => {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState(0);

  // Calculate active section based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      const sectionIndex = Math.min(
        Math.floor(progress * sections.length),
        sections.length - 1
      );
      setActiveSection(sectionIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Progress line height
  const lineHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '100%']
  );

  return (
    <motion.div
      className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <div className="flex flex-col items-center gap-0">
        {/* Background track with label on hover */}
        <div className="relative flex flex-col items-center">
          {/* Background line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[6px] bottom-[6px] w-[2px] bg-porcelain/10 rounded-full" />
          
          {/* Active progress line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-1/2 -translate-x-1/2 top-[6px] w-[2px] bg-alchemy-red rounded-full origin-top"
          />

          {sections.map((section, i) => (
            <div 
              key={section.id} 
              className="relative flex items-center group"
              style={{ marginBottom: i < sections.length - 1 ? '18px' : 0 }}
            >
              {/* Label on hover - appears to the left */}
              <motion.span
                className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[10px] text-porcelain/50 tracking-wider uppercase whitespace-nowrap"
                initial={false}
              >
                {section.label}
              </motion.span>

              {/* Dot indicator */}
              <motion.div
                className={`w-[8px] h-[8px] rounded-full border-[1.5px] transition-all duration-300 ${
                  activeSection >= i
                    ? 'bg-alchemy-red border-alchemy-red shadow-[0_0_10px_rgba(225,6,19,0.5)]'
                    : 'bg-transparent border-porcelain/25 hover:border-porcelain/50'
                }`}
                animate={{
                  scale: activeSection === i ? 1.4 : 1,
                }}
                transition={{ duration: 0.25 }}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
