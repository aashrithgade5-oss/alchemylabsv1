'use client';

import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { PerformanceProvider } from '@/contexts/PerformanceContext';
import { PageAtmosphereProvider } from '@/contexts/PageAtmosphereContext';
import { LenisProvider } from '@/components/LenisProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // LazyMotion + m components keep the full framer renderer out of First
    // Load JS; legacy motion.* components (frozen routes) still work beside it.
    <LazyMotion features={domAnimation}>
    {/* Patches-5: one switch honours prefers-reduced-motion for every framer
        animation site-wide (transforms jump, opacity still fades) */}
    <MotionConfig reducedMotion="user">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PerformanceProvider>
          <PageAtmosphereProvider>
            <LenisProvider />
            {/* Patches-5: the legacy fixed AtmosphericBackground (off-palette
                red, a second background system under HomeAtmosphere) retired */}
            <Toaster />
            <Sonner />
            {/* LayoutTransition moved to the root layout: its gpu-accelerated
                transform must wrap page content only, never the fixed chrome */}
            {children}
          </PageAtmosphereProvider>
        </PerformanceProvider>
      </TooltipProvider>
    </QueryClientProvider>
    </MotionConfig>
    </LazyMotion>
  );
}
