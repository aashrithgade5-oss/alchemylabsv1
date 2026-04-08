import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, lazy, Suspense, memo } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Preloader } from "./components/Preloader";
import { SmoothScroll } from "./components/SmoothScroll";
import { BackToTop } from "./components/BackToTop";
import { ScrollProgress } from "./components/ScrollProgress";
import { PageAtmosphereProvider, AtmosphericBackground } from "./contexts/PageAtmosphereContext";
import { PerformanceProvider } from "./contexts/PerformanceContext";
import { CookieConsent } from "./components/CookieConsent";

// Lazy load non-critical pages
const ServicePage = lazy(() => import("./pages/ServicePage").then(m => ({ default: m.ServicePage })));
const AdminAuth = lazy(() => import("./pages/AdminAuth"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const SolutionsHub = lazy(() => import("./pages/SolutionsHub"));
const AISolutionsPage = lazy(() => import("./pages/AISolutionsPage"));
const BrandingSolutionsPage = lazy(() => import("./pages/BrandingSolutionsPage"));
const ConsultationSolutionsPage = lazy(() => import("./pages/ConsultationSolutionsPage"));
const BookSprint = lazy(() => import("./pages/BookSprint"));
const About = lazy(() => import("./pages/About"));
const Work = lazy(() => import("./pages/Work"));
const JournalPage = lazy(() => import("./pages/JournalPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const AashrithPortfolio = lazy(() => import("./pages/AashrithPortfolio"));
const EvaPortfolio = lazy(() => import("./pages/EvaPortfolio"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Minimal loading fallback
const PageLoader = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-alchemy-black">
    <div className="w-6 h-6 border-2 border-alchemy-red/30 border-t-alchemy-red rounded-full animate-spin" />
  </div>
));
PageLoader.displayName = 'PageLoader';

// Simplified scroll restoration
const ScrollRestoration = memo(() => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  
  return null;
});
ScrollRestoration.displayName = 'ScrollRestoration';

// Optimized page transitions - CSS transform only (GPU accelerated)
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const AnimatedRoutes = memo(() => {
  const location = useLocation();
  
  return (
    <>
      <ScrollRestoration />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="min-h-screen gpu-accelerated"
        >
          <Suspense fallback={<PageLoader />}>
            <Routes location={location}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/work" element={<Work />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/journal/:slug" element={<BlogPostPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/solutions" element={<SolutionsHub />} />
              <Route path="/solutions/ai" element={<AISolutionsPage />} />
              <Route path="/solutions/branding" element={<BrandingSolutionsPage />} />
              <Route path="/solutions/consultation" element={<ConsultationSolutionsPage />} />
              <Route path="/book-sprint" element={<ContactPage />} />
              <Route path="/services/:slug" element={<ServicePage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/AashrithGadePortfolio" element={<AashrithPortfolio />} />
              <Route path="/aashrith" element={<AashrithPortfolio />} />
              <Route path="/EvaDoshiPortfolio" element={<EvaPortfolio />} />
              <Route path="/eva" element={<EvaPortfolio />} />
              <Route path="/admin/auth" element={<AdminAuth />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </>
  );
});
AnimatedRoutes.displayName = 'AnimatedRoutes';

const AppContent = memo(() => (
  <PageAtmosphereProvider>
    <SmoothScroll>
      <AtmosphericBackground />
      <Preloader />
      <ScrollProgress />
      <Toaster />
      <Sonner />
      <AnimatedRoutes />
      <BackToTop />
    </SmoothScroll>
    <CookieConsent />
  </PageAtmosphereProvider>
));
AppContent.displayName = 'AppContent';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PerformanceProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </PerformanceProvider>
    </TooltipProvider>
    <SpeedInsights />
  </QueryClientProvider>
);

export default App;
