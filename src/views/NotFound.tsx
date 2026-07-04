'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-alchemy-black">
      <div className="text-center space-y-6">
        <h1 className="font-display text-8xl md:text-9xl text-alchemy-red">404</h1>
        <p className="text-xl text-porcelain/70">
          Oops! Page not found
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 glass-cta-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
