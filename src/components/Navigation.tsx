import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
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

// Separate Mobile Menu Component rendered via Portal
const MobileMenu = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      id="mobile-menu-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0A0A0B',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        padding: '24px',
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '12px',
          color: '#FFFFFF',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
        aria-label="Close menu"
      >
        <X size={28} strokeWidth={1.5} />
      </button>

      {/* Navigation Links with stagger */}
      {navItems.map((item, index) => (
        <motion.a
          key={item.label}
          href={item.href}
          onClick={onClose}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
          style={{
            color: '#FFFFFF',
            fontSize: '15px',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: '400',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            padding: '10px 16px',
            opacity: 0.85,
            transition: 'opacity 0.2s ease, color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.color = '#dc2626';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.85';
            e.currentTarget.style.color = '#FFFFFF';
          }}
        >
          {item.label}
        </motion.a>
      ))}

      {/* CTA Button */}
      <motion.a
        href="/book-sprint"
        onClick={onClose}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        style={{
          marginTop: '20px',
          backgroundColor: '#dc2626',
          color: '#FFFFFF',
          padding: '14px 32px',
          borderRadius: '9999px',
          fontWeight: '500',
          fontSize: '14px',
          letterSpacing: '0.05em',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        Book a Sprint
        <ArrowRight size={16} />
      </motion.a>
    </motion.div>,
    document.body
  );
};

// Premium nav link with micro-interactions
const NavLink = ({ 
  item, 
  isActive 
}: { 
  item: { label: string; href: string }; 
  isActive: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={item.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative px-4 py-2 no-glow group"
    >
      {/* Text with micro-interaction */}
      <motion.span
        className={`relative z-10 font-body text-sm transition-colors duration-300 ${
          isActive 
            ? 'text-alchemy-red' 
            : 'text-porcelain/60 group-hover:text-porcelain'
        }`}
        animate={{
          y: isHovered && !isActive ? -1 : 0,
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {item.label}
      </motion.span>
      
      {/* Hover underline effect */}
      <motion.div
        className="absolute bottom-1 left-4 right-4 h-px bg-porcelain/30 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered && !isActive ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
      
      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute inset-0 bg-alchemy-red/10 rounded-full border border-alchemy-red/20"
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        />
      )}
    </Link>
  );
};

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [ctaHovered, setCtaHovered] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
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

  // Body scroll lock for mobile menu
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

  const checkIsActive = useCallback((href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  }, [location.pathname]);

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
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 md:py-4"
      >
        <div className={`max-w-6xl mx-auto transition-all duration-500 ${
          isScrolled ? 'glass-nav-pill py-2.5 px-5' : 'py-3 px-5'
        }`}>
          <div className="flex items-center justify-between">
            {/* Logo - Playfair Display Italic */}
            <Link 
              to="/" 
              className="flex items-center gap-2.5 group flex-shrink-0 no-glow"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <motion.div 
                className="w-9 h-9 md:w-11 md:h-11 rounded-full overflow-hidden relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src={alchemyLogo} 
                  alt="Alchemy Labs" 
                  className="w-[140%] h-[140%] object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </motion.div>
              <div className="hidden sm:flex items-baseline gap-1.5">
                <span className="font-display text-lg md:text-xl italic text-porcelain">
                  Alchemy
                </span>
                <span className="font-body text-[9px] md:text-[10px] font-medium text-porcelain/60 tracking-[0.2em] uppercase">
                  LABS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation with micro-interactions */}
            <ul className="hidden md:flex items-center gap-0.5 lg:gap-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <NavLink item={item} isActive={checkIsActive(item.href)} />
                </li>
              ))}
            </ul>
            
            {/* Desktop CTA with premium hover */}
            <Link
              to="/book-sprint"
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              className={`hidden md:flex items-center gap-2 text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 no-glow ${
                isScrolled
                  ? 'bg-alchemy-red text-porcelain hover:bg-alchemy-red/90'
                  : 'glass-cta-nav text-porcelain'
              }`}
            >
              <span>Book a Sprint</span>
              <motion.span
                animate={{ x: ctaHovered ? 3 : 0 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <ArrowRight size={14} />
              </motion.span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-porcelain"
              style={{ zIndex: 100000 }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Rendered via Portal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu 
            isOpen={isMobileMenuOpen} 
            onClose={() => setIsMobileMenuOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};
