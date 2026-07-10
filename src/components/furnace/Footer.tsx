import Link from 'next/link';

// Link values mirror src/components/Footer.tsx socialLinks (that file stays
// untouched until the Phase 7 purge).
const nav = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/solutions' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
];

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/brandalchemy._' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/brandalchemylabs/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@brandalchemy-in' },
];

export function FurnaceFooter() {
  return (
    <footer className="relative border-t border-line bg-void">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/" className="flex items-baseline gap-1.5">
              <span className="font-syne text-lg font-bold tracking-tight text-bone">ALCHEMY</span>
              <span className="font-dmmono text-[10px] tracking-[0.3em] text-ash">LABS</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ash">
              An AI-native brand studio. Built in Mumbai, at work everywhere.
            </p>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Footer">
            <p className="font-dmmono text-[10px] tracking-[0.25em] text-ash">SITE</p>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-fit text-sm text-bone/70 transition-colors duration-300 hover:text-bone"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <p className="font-dmmono text-[10px] tracking-[0.25em] text-ash">ELSEWHERE</p>
            {socials.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-sm text-bone/70 transition-colors duration-300 hover:text-bone"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-dmmono text-[10px] tracking-[0.25em] text-ash">WRITE</p>
            <a
              href="mailto:alchemylabs.work@gmail.com"
              className="w-fit font-dmmono text-xs tracking-wider text-bone/70 transition-colors duration-300 hover:text-bone"
            >
              alchemylabs.work@gmail.com
            </a>
            <a
              href="https://wa.me/917794912315"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit font-dmmono text-xs tracking-wider text-bone/70 transition-colors duration-300 hover:text-bone"
            >
              +91 77949 12315
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-dmmono text-[10px] tracking-[0.2em] text-ash">
            MUMBAI · WORKING GLOBALLY
          </p>
          <div className="flex gap-6 font-dmmono text-[10px] tracking-[0.2em] text-ash">
            <Link href="/privacy" className="transition-colors hover:text-bone">
              PRIVACY
            </Link>
            <Link href="/terms" className="transition-colors hover:text-bone">
              TERMS
            </Link>
            <span>© {new Date().getFullYear()} ALCHEMY LABS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
