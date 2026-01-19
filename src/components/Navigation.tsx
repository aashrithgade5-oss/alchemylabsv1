import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import alchemyLogo from '@/assets/alchemy-logo.png';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
];

// Magnetic nav link component
const MagneticNavLink = ({ 
  href, 
  isActive, 
  children, 
  onClick 
}: { 
  href: string; 
  isActive: boolean; 
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: springX, y: springY }}>
      <Link
        ref={ref}
        to={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative px-4 py-2 font-body text-sm transition-colors duration-300 no-glow rounded-full ${
          isActive 
            ? 'text-alchemy-red' 
            : 'text-porcelain/60 hover:text-porcelain'
        }`}
      >
        {children}
        {isActive && (
          <motion.div
            layoutId="nav-indicator"
            className="absolute inset-0 bg-alchemy-red/10 rounded-full border border-alchemy-red/20"
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          />
        )}
        {/* Underline animation on hover */}
        <motion.div
          className="absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-alchemy-red to-alchemy-red/50"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'left' }}
        />
      </Link>
    </motion.div>
  );
};

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Smart scroll behavior - hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 50);
      
      // Hide when scrolling down past 200px, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = useCallback((href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href.replace('/#', ''));
  }, [location.pathname]);

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isHidden ? -100 : 0, 
          opacity: isHidden ? 0 : 1 
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4"
      >
        <motion.div 
          className={`max-w-6xl mx-auto transition-all duration-500 ${
            isScrolled ? 'glass-nav-pill py-3 px-6' : 'py-4 px-6'
          }`}
          animate={{
            height: isScrolled ? 'auto' : 'auto',
          }}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0 no-glow" onClick={closeMenu}>
              <motion.div 
                className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden relative"
                animate={{ scale: isScrolled ? 0.9 : 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={alchemyLogo} 
                  alt="Alchemy Labs" 
                  className="w-[140%] h-[140%] object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </motion.div>
              <motion.div 
                className="hidden sm:flex items-baseline gap-1.5"
                animate={{ opacity: isScrolled ? 0.95 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-display text-xl md:text-2xl font-normal text-porcelain tracking-wide italic">
                  Alchemy
                </span>
                <span className="font-body text-[10px] md:text-xs font-bold text-porcelain/70 tracking-[0.35em] uppercase">
                  LABS
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation with magnetic effect */}
            <ul className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <MagneticNavLink href={item.href} isActive={isActive(item.href)}>
                    {item.label}
                  </MagneticNavLink>
                </li>
              ))}
            </ul>
            
            {/* Desktop CTA with shimmer */}
            <Link
              to="/book-sprint"
              className={`hidden md:flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 no-glow relative overflow-hidden group ${
                isScrolled
                  ? 'bg-alchemy-red text-porcelain hover:bg-alchemy-red/90'
                  : 'glass-cta-nav text-porcelain'
              }`}
            >
              <span className="relative z-10">Book a Sprint</span>
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <motion.button
              onClick={toggleMenu}
              className="md:hidden relative z-[60] p-2 text-porcelain hover:text-alchemy-red transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={28} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={28} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Dark Background */}
            <motion.div 
              className="absolute inset-0 bg-[#0a0a0b]"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Animated grid background */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `
                linear-gradient(rgba(225, 6, 19, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(225, 6, 19, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }} />
            
            {/* Decorative Glow Elements */}
            <motion.div 
              className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-alchemy-red/10 blur-[120px] pointer-events-none"
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full bg-deep-crimson/10 blur-[100px] pointer-events-none"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full flex flex-col items-center justify-center px-8"
            >
              {/* Navigation Links */}
              <nav className="flex flex-col items-center gap-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 40, rotateX: -45 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      delay: 0.05 + index * 0.06,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    style={{ perspective: '1000px' }}
                  >
                    <Link
                      to={item.href}
                      onClick={closeMenu}
                      className={`relative block text-center font-display text-4xl sm:text-5xl italic tracking-tight
                        transition-all duration-300 py-2 px-6 no-glow
                        ${isActive(item.href) 
                          ? 'text-alchemy-red' 
                          : 'text-porcelain hover:text-alchemy-red/80'
                        }`}
                    >
                      {/* Number prefix */}
                      <span className="absolute -left-8 top-1/2 -translate-y-1/2 font-mono text-xs text-porcelain/30">
                        0{index + 1}
                      </span>
                      {item.label}
                      {isActive(item.href) && (
                        <motion.span
                          layoutId="mobile-active-dot"
                          className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-alchemy-red"
                          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-12"
              >
                <Link
                  to="/book-sprint"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 
                    bg-alchemy-red text-porcelain font-body font-medium text-lg
                    rounded-full transition-all duration-300
                    hover:bg-alchemy-red/90 active:scale-95 no-glow
                    shadow-lg shadow-alchemy-red/20"
                >
                  Book a Sprint
                </Link>
              </motion.div>

              {/* Footer Branding */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="absolute bottom-10 left-0 right-0 text-center font-mono text-xs text-porcelain/30 tracking-[0.25em] uppercase"
              >
                © 2025 Alchemy Labs
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
