'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Review-only corner badge (never on production): which commit and branch
 * this copy is running, plus a link to the /review hub. If it is missing or
 * shows an old commit, you are looking at the wrong copy of the site.
 */
export function ReviewBadge() {
  const pathname = usePathname();
  if (process.env.NEXT_PUBLIC_REVIEW !== '1' || pathname?.startsWith('/alchemy-vault')) return null;
  return (
    <Link
      href="/review"
      className="fixed bottom-4 right-4 z-[120] flex items-center gap-2 rounded-full border border-ember/50 bg-void/85 px-3.5 py-2 font-mono text-[10px] tracking-[0.18em] text-bone/85 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-colors hover:border-ember hover:text-bone"
    >
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" aria-hidden />
      REVIEW · {process.env.NEXT_PUBLIC_BUILD_SHA} · WHAT&rsquo;S NEW
    </Link>
  );
}
