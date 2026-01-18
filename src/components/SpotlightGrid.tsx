import { motion } from 'framer-motion';
import { ReactNode, useState, createContext, useContext } from 'react';

// Context for spotlight state
interface SpotlightContextType {
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  anyHovered: boolean;
}

const SpotlightContext = createContext<SpotlightContextType>({
  hoveredId: null,
  setHoveredId: () => {},
  anyHovered: false,
});

// Wrapper for spotlight grid
interface SpotlightContainerProps {
  children: ReactNode;
  className?: string;
}

export const SpotlightContainer = ({ children, className = '' }: SpotlightContainerProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <SpotlightContext.Provider value={{ hoveredId, setHoveredId, anyHovered: hoveredId !== null }}>
      <div className={className}>{children}</div>
    </SpotlightContext.Provider>
  );
};

// Individual spotlight item
interface SpotlightItemProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export const SpotlightItem = ({ id, children, className = '' }: SpotlightItemProps) => {
  const { hoveredId, setHoveredId, anyHovered } = useContext(SpotlightContext);
  const isHovered = hoveredId === id;
  const isDimmed = anyHovered && !isHovered;

  return (
    <motion.div
      onMouseEnter={() => setHoveredId(id)}
      onMouseLeave={() => setHoveredId(null)}
      animate={{
        opacity: isDimmed ? 0.6 : 1,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`transition-shadow duration-300 ${
        isHovered ? 'shadow-[0_20px_60px_rgba(225,6,19,0.15)]' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Hook to use spotlight context
export const useSpotlight = () => useContext(SpotlightContext);
