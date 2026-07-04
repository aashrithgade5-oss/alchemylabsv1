'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { PerformanceProvider } from '@/contexts/PerformanceContext';
import { PageAtmosphereProvider, AtmosphericBackground } from '@/contexts/PageAtmosphereContext';
import { LayoutTransition } from './LayoutTransition';

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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PerformanceProvider>
          <PageAtmosphereProvider>
            <AtmosphericBackground />
            <Toaster />
            <Sonner />
            <LayoutTransition>
              {children}
            </LayoutTransition>
          </PageAtmosphereProvider>
        </PerformanceProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
