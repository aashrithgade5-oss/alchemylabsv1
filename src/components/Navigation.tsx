import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
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
          y: isHidden && !isMobileMenuOpen ? -100 : 0, 
          opacity: isHidden && !isMobileMenuOpen ? 0 : 1 
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[60] px-4 md:px-8 py-4"
      >
        <motion.div 
          className={`max-w-6xl mx-auto transition-all duration-500 ${
            isScrolled ? 'glass-nav-pill py-3 px-6' : 'py-4 px-6'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0 no-glow" onClick={closeMenu}>
              <motion.div 
                className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden relative"
                animate={{ scale: isScrolled ? 0.9 : 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
                <span className="font-alchemy text-xl md:text-2xl text-porcelain tracking-wide">
                  Alchemy
                </span>
                <span className="font-body text-[10px] md:text-xs font-bold text-porcelain/70 tracking-[0.35em] uppercase">
                  LABS
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className={`relative px-4 py-2 font-body text-sm transition-colors duration-300 no-glow rounded-full ${
                      isActive(item.href) 
                        ? 'text-alchemy-red' 
                        : 'text-porcelain/60 hover:text-porcelain'
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-alchemy-red/10 rounded-full border border-alchemy-red/20"
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Desktop CTA */}
            <Link
              to="/book-sprint"
              className={`hidden md:flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 no-glow ${
                isScrolled
                  ? 'bg-alchemy-red text-porcelain hover:bg-alchemy-red/90'
                  : 'glass-cta-nav text-porcelain'
              }`}
            >
              Book a Sprint
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden relative z-[70] p-2 text-porcelain hover:text-alchemy-red transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
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
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Overlay - FIXED z-index and visibility */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[65] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Dark Background - fully opaque */}
            <motion.div 
              className="absolute inset-0 bg-alchemy-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Grid background */}
            <div 
              className="absolute inset-0 opacity-10" 
              style={{
                backgroundImage: `
                  linear-gradient(rgba(225, 6, 19, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(225, 6, 19, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }} 
            />
            
            {/* Decorative Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-alchemy-red/15 blur-[120px] pointer-events-none" />
            
            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="relative h-full flex flex-col items-center justify-center px-8 pt-20"
            >
              {/* Navigation Links */}
              <nav className="flex flex-col items-center gap-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ 
                      delay: 0.1 + index * 0.05,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1]
                    }}
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
                      <span className="absolute -left-8 top-1/2 -translate-y-1/2 font-mono text-xs text-porcelain/30">
                        0{index + 1}
                      </span>
                      {item.label}
                      {isActive(item.href) && (
                        <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-alchemy-red" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ delay: 0.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
