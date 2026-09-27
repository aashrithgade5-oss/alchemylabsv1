'use client';

import { usePathname } from 'next/navigation';
import { FurnaceNavigation } from './Navigation';
import { FurnaceFooter } from './Footer';
import { BottomCTA } from './BottomCTA';

// The founder portfolios render their own inline nav and footer; the global
// chrome previously stacked on top of them. This gate keeps their files
// untouched while removing the duplicate overlay.
const portfolioRoutes = ['/aashrith', '/AashrithGadePortfolio', '/eva', '/EvaDoshiPortfolio'];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortfolio = portfolioRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // the private vault is a bare tool surface: no public chrome at all
  const isVault = pathname === '/alchemy-vault' || pathname.startsWith('/alchemy-vault/');
  if (isPortfolio || isVault) return <>{children}</>;

  // /contact IS the CTA destination this band points to — showing it there
  // would just loop the visitor back onto the page they're already on.
  // Homepage and (since C-P17) Work both end in ClosingBand, their own
  // dedicated closer with the same "bring the brand, Begin" beat —
  // stacking this one right after it would read as the same CTA twice.
  // /pay is a utility page a client opens with an invoice: no sales closer.
  const skipBottomCTA = pathname === '/contact' || pathname === '/' || pathname === '/work' || pathname === '/pay';

  return (
    <>
      <FurnaceNavigation />
      {children}
      {!skipBottomCTA && <BottomCTA />}
      <FurnaceFooter />
    </>
  );
}
