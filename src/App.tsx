import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, lazy, Suspense, memo } from "react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Preloader } from "./components/Preloader";
import { SmoothScroll } from "./components/SmoothScroll";
import { BackToTop } from "./components/BackToTop";
import { PageAtmosphereProvider, AtmosphericBackground } from "./contexts/PageAtmosphereContext";

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

// Simplified page transition variants - removed blur for performance
const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 20,
  },
  animate: { 
    opacity: 1, 
    y: 0,
  },
  exit: { 
    opacity: 0, 
    y: -10,
  },
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
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-screen"
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
              <Route path="/book-sprint" element={<BookSprint />} />
              <Route path="/services/:slug" element={<ServicePage />} />
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
      <Toaster />
      <Sonner />
      <AnimatedRoutes />
      <BackToTop />
    </SmoothScroll>
  </PageAtmosphereProvider>
));
AppContent.displayName = 'AppContent';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
