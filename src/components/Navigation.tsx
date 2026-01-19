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
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll for nav styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 py-4"
      >
        <div 
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
                <span className="font-display text-xl md:text-2xl font-normal text-porcelain tracking-wide italic">
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
              to="/contact"
              className={`hidden md:flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 no-glow ${
                isScrolled
                  ? 'bg-alchemy-red text-porcelain hover:bg-alchemy-red/90'
                  : 'glass-cta-nav text-porcelain'
              }`}
            >
              Contact
            </Link>

            {/* Mobile Menu Toggle Button */}
            <motion.button
              onClick={toggleMenu}
              className="md:hidden relative z-[110] p-2 text-porcelain hover:text-alchemy-red transition-colors"
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
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-alchemy-black backdrop-blur-3xl"
              onClick={closeMenu}
            >
              {/* Decorative gradients */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-gradient-radial from-alchemy-red/15 to-transparent rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-gradient-radial from-deep-crimson/10 to-transparent rounded-full blur-[80px] pointer-events-none" />
            </motion.div>
            
            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full flex flex-col items-center justify-center px-6 pt-20 pb-16"
            >
              {/* Navigation Links */}
              <nav className="flex flex-col items-center space-y-5">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ 
                      delay: 0.1 + index * 0.07,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <Link
                      to={item.href}
                      onClick={closeMenu}
                      className={`relative block text-center font-display text-3xl xs:text-4xl sm:text-5xl italic 
                        transition-all duration-300 py-2 px-4 no-glow
                        ${isActive(item.href) 
                          ? 'text-alchemy-red' 
                          : 'text-porcelain hover:text-alchemy-red'
                        }`}
                    >
                      {item.label}
                      {isActive(item.href) && (
                        <motion.span
                          layoutId="mobile-active-indicator"
                          className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-alchemy-red"
                          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.45, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10"
              >
                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 
                    bg-alchemy-red text-porcelain font-body font-medium text-lg
                    rounded-full transition-all duration-300
                    hover:bg-alchemy-red/90 active:scale-95 no-glow"
                >
                  Get In Touch
                </Link>
              </motion.div>

              {/* Footer Branding */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="absolute bottom-8 left-0 right-0 text-center"
              >
                <p className="font-mono text-[10px] text-porcelain/30 tracking-[0.3em] uppercase">
                  Alchemy Labs
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
