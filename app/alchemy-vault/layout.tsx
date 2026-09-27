import type { Metadata } from 'next';

// Private: never indexed, never linked, not listed in robots.txt (listing it
// there would advertise the path). Access is enforced in middleware.ts.
export const metadata: Metadata = {
  title: 'Vault',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function VaultLayout({ children }: { children: React.ReactNode }) {
  return children;
}
