import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import alchemyLogo from '@/assets/alchemy-minimal-logo.png';
import { socialLinks } from './Footer';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
];

const menuVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
  exit: { opacity: 0, transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const menuItemVariants = {
  closed: { opacity: 0, y: 30, filter: 'blur(8px)' },
  open: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -15, filter: 'blur(4px)', transition: { duration: 0.25 } },
};

// Full-screen Liquid Glass Mobile Menu
const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return createPortal(
    <motion.div
      variants={menuVariants}
      initial="closed"
      animate="open"
      exit="exit"
      id="mobile-menu-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '24px',
      }}
    >
      {/* Liquid glass background — enhanced */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 140% 100% at 50% 20%, rgba(220,38,38,0.10) 0%, rgba(8,8,10,0.97) 55%)',
          backdropFilter: 'blur(60px) saturate(220%)',
          WebkitBackdropFilter: 'blur(60px) saturate(220%)',
        }}
      />

      {/* Grain texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.015,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          mixBlendMode: 'overlay' as const,
          pointerEvents: 'none' as const,
        }}
      />

      {/* Abstract grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.02,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Close Button */}
      <motion.button
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '12px',
          color: '#FFFFFF',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
        }}
        aria-label="Close menu"
      >
        <X size={24} strokeWidth={1.5} />
      </motion.button>

      {/* Navigation Links */}
      {navItems.map((item) => (
        <motion.div key={item.label} variants={menuItemVariants}>
          <Link
            to={item.href}
            onClick={onClose}
            style={{
              color: '#FFFFFF',
              fontSize: '18px',
              fontFamily: 'Playfair Display, Georgia, serif',
              fontStyle: 'italic',
              fontWeight: '400',
              letterSpacing: '0.04em',
              textDecoration: 'none',
              padding: '10px 20px',
              display: 'block',
              textAlign: 'center',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#dc2626')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          >
            {item.label}
          </Link>
        </motion.div>
      ))}

      {/* CTA */}
      <motion.div variants={menuItemVariants}>
        <Link
          to="/contact"
          onClick={onClose}
          style={{
            marginTop: '20px',
            background: 'linear-gradient(135deg, rgba(220,38,38,0.8) 0%, rgba(185,28,28,0.9) 100%)',
            color: '#FFFFFF',
            padding: '14px 36px',
            borderRadius: '9999px',
            fontWeight: '500',
            fontSize: '14px',
            letterSpacing: '0.05em',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 0 30px rgba(220,38,38,0.3)',
          }}
        >
          Book a Sprint
          <ArrowRight size={16} />
        </Link>
      </motion.div>

      {/* Social */}
      <motion.div
        variants={menuItemVariants}
        style={{
          display: 'flex',
          gap: '16px',
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {[
          { href: socialLinks.instagram, label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
          { href: socialLinks.linkedin, label: 'LinkedIn', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
          { href: socialLinks.youtube, label: 'YouTube', path: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' },
        ].map(({ href, label, path }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, rotate: 5 }}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.5)',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#dc2626')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            aria-label={label}
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d={path} /></svg>
          </motion.a>
        ))}
      </motion.div>
    </motion.div>,
    document.body
  );
};

// Premium nav link
const NavLink = ({ item, isActive }: { item: { label: string; href: string }; isActive: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={item.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative px-4 py-2 no-glow group"
    >
      <motion.span
        className={`relative z-10 font-body text-sm transition-colors duration-300 ${
          isActive ? 'text-alchemy-red' : 'text-porcelain/60 group-hover:text-porcelain'
        }`}
        animate={{ y: isHovered && !isActive ? -1 : 0 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {item.label}
      </motion.span>
      
      <motion.div
        className="absolute bottom-1 left-4 right-4 h-px bg-porcelain/30 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered && !isActive ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
      
      {isActive && (
        <>
          <motion.div
            layoutId="nav-indicator"
            className="absolute inset-0 bg-alchemy-red/10 rounded-full border border-alchemy-red/20"
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          />
          <motion.div
            layoutId="nav-dot"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-alchemy-red"
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          />
        </>
      )}
    </Link>
  );
};

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [blurIntensity, setBlurIntensity] = useState(16);
  const [glowIntensity, setGlowIntensity] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const lastScrollYRef = useRef(0);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 50);
        if (currentScrollY > lastScrollYRef.current && currentScrollY > 200) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
        // Dynamic blur + glow
        const blur = Math.min(16 + currentScrollY * 0.04, 40);
        setBlurIntensity(blur);
        const glow = Math.min(currentScrollY * 0.08, 20);
        setGlowIntensity(glow);

        lastScrollYRef.current = currentScrollY;
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const checkIsActive = useCallback((href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isHidden && !isMobileMenuOpen ? -100 : 0,
          opacity: isHidden && !isMobileMenuOpen ? 0 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 md:py-4"
      >
        <div 
          className={`max-w-6xl mx-auto transition-all duration-500 relative ${
            isScrolled ? 'glass-nav-pill py-2.5 px-5' : 'py-3 px-5'
          }`}
          style={isScrolled ? { 
            backdropFilter: `blur(${blurIntensity}px) saturate(200%)`,
            WebkitBackdropFilter: `blur(${blurIntensity}px) saturate(200%)`,
            boxShadow: `0 0 ${glowIntensity}px rgba(220,38,38,0.15), 0 0 ${glowIntensity * 3}px rgba(220,38,38,0.06), 0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)`,
          } : {}}
        >
          {/* Specular top highlight */}
          {isScrolled && (
            <div 
              className="absolute inset-x-0 top-0 h-px rounded-full pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.18) 30%, rgba(255,255,255,0.09) 70%, transparent 95%)',
              }}
            />
          )}

          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0 no-glow" onClick={() => setIsMobileMenuOpen(false)}>
              <motion.div
                className="w-10 h-10 md:w-11 md:h-11 rounded-lg overflow-hidden relative bg-transparent flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                onHoverStart={() => setLogoHovered(true)}
                onHoverEnd={() => setLogoHovered(false)}
              >
                <img 
                  src={alchemyLogo} 
                  alt="Alchemy Labs" 
                  className="w-[130%] h-[130%] object-contain transition-[filter] duration-200"
                  style={logoHovered ? { 
                    filter: 'drop-shadow(2px 0 0 rgba(220,38,38,0.5)) drop-shadow(-2px 0 0 rgba(100,180,255,0.3))' 
                  } : { filter: 'none' }}
                />
              </motion.div>
              <div className="hidden sm:flex items-baseline gap-1.5">
                <span className="font-display text-lg md:text-xl italic text-porcelain">Alchemy</span>
                <span className="font-body text-[9px] md:text-[10px] font-medium text-porcelain/60 tracking-[0.2em] uppercase">LABS</span>
              </div>
            </Link>

            <ul className="hidden md:flex items-center gap-0.5 lg:gap-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <NavLink item={item} isActive={checkIsActive(item.href)} />
                </li>
              ))}
            </ul>

            <Link
              to="/contact"
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              className={`hidden md:flex items-center gap-2 text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 no-glow relative overflow-hidden ${
                isScrolled ? 'bg-alchemy-red text-porcelain hover:bg-alchemy-red/90' : 'glass-cta-nav text-porcelain'
              }`}
            >
              {/* Shimmer sweep on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                animate={{ x: ctaHovered ? '200%' : '-100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">Book a Sprint</span>
              <motion.span
                className="relative z-10"
                animate={{ x: ctaHovered ? 3 : 0 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <ArrowRight size={14} />
              </motion.span>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-porcelain"
              style={{ zIndex: 100000 }}
              aria-label="Toggle menu"
            >
              <motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};
