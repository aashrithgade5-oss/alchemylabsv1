import { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import footerBg from '@/assets/footer-bg.png';

interface PortfolioFooterProps {
  isDark: boolean;
  founderName: string;
  monogram: string;
  copyright: string;
  portfolioLinks?: { label: string; href: string }[];
  ventureLinks?: { label: string; href: string; external?: boolean }[];
  connectLinks?: { label: string; href: string; external?: boolean }[];
}

const t = (isDark: boolean, dark: string, light: string) => isDark ? dark : light;

export const PortfolioFooter = memo(({
  isDark,
  founderName,
  monogram,
  copyright,
  portfolioLinks = [],
  ventureLinks = [],
  connectLinks = [],
}: PortfolioFooterProps) => {
  return (
    <footer className={`relative overflow-hidden ${t(isDark, 'bg-alchemy-black', 'bg-neutral-950')}`}>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={footerBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 scale-110" style={{ filter: 'blur(8px) saturate(1.2)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black via-alchemy-black/70 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[60%] bg-gradient-radial from-alchemy-red/15 via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-alchemy-black via-transparent to-transparent h-32" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12 py-16 sm:py-20">
        {/* Logo area */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-mono text-sm font-bold text-porcelain" style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.2) 0%, rgba(220,38,38,0.05) 100%)', border: '1px solid rgba(220,38,38,0.3)' }}>
              {monogram}
            </div>
            <span className="font-body text-xl sm:text-2xl font-bold text-porcelain">{founderName}</span>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Portfolio */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h3 className="font-mono text-[10px] sm:text-xs text-porcelain/60 tracking-[0.15em] uppercase mb-4 sm:mb-6">Portfolio</h3>
            <ul className="space-y-3 sm:space-y-4">
              {portfolioLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="font-body text-sm text-porcelain/70 hover:text-porcelain transition-colors duration-300">{link.label}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Ventures */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h3 className="font-mono text-[10px] sm:text-xs text-porcelain/60 tracking-[0.15em] uppercase mb-4 sm:mb-6">Ventures</h3>
            <ul className="space-y-3 sm:space-y-4">
              {ventureLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-porcelain/70 hover:text-porcelain transition-colors duration-300 inline-flex items-center gap-1">
                      {link.label} <ExternalLink className="w-3 h-3 opacity-40" />
                    </a>
                  ) : (
                    <a href={link.href} className="font-body text-sm text-porcelain/70 hover:text-porcelain transition-colors duration-300">{link.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <h3 className="font-mono text-[10px] sm:text-xs text-porcelain/60 tracking-[0.15em] uppercase mb-4 sm:mb-6">Connect</h3>
            <ul className="space-y-3 sm:space-y-4">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-porcelain/70 hover:text-porcelain transition-colors duration-300">{link.label}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="pt-6 sm:pt-8 border-t border-porcelain/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] sm:text-xs text-porcelain/50">
            © <span className="text-glow-red">2026</span> {copyright}. All rights reserved.
          </p>
          <div className="flex gap-6 sm:gap-8">
            <Link to="/about" className="font-body text-xs sm:text-sm text-porcelain/50 hover:text-porcelain transition-colors">
              Back to Alchemy Labs
            </Link>
            <Link to="/privacy" className="font-body text-xs sm:text-sm text-porcelain/50 hover:text-porcelain transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="font-body text-xs sm:text-sm text-porcelain/50 hover:text-porcelain transition-colors">
              Terms
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
});

PortfolioFooter.displayName = 'PortfolioFooter';
