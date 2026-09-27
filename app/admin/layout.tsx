import type { Metadata } from 'next';

// Private dashboard: never indexed (robots.txt also disallows /admin, but a
// disallow alone can still let a linked URL appear in results without a snippet).
export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
