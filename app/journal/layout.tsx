import type { Metadata } from 'next';

// Journal is unpublished: every route under /journal (index + posts) stays
// out of search until it launches. Remove this, the robots.ts disallow and the
// page-level robots flag together when the journal goes live.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
