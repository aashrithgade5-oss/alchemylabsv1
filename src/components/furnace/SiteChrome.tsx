'use client';

import { usePathname } from 'next/navigation';
import { FurnaceNavigation } from './Navigation';
import { FurnaceFooter } from './Footer';

// The founder portfolios render their own inline nav and footer; the global
// chrome previously stacked on top of them. This gate keeps their files
// untouched while removing the duplicate overlay.
const portfolioRoutes = ['/aashrith', '/AashrithGadePortfolio', '/eva', '/EvaDoshiPortfolio'];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortfolio = portfolioRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isPortfolio) return <>{children}</>;

  return (
    <>
      <FurnaceNavigation />
      {children}
      <FurnaceFooter />
    </>
  );
}
