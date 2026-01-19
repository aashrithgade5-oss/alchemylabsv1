import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ServicePage } from "./pages/ServicePage";
import { Preloader } from "./components/Preloader";
import { SmoothScroll } from "./components/SmoothScroll";
import { BackToTop } from "./components/BackToTop";
import AdminAuth from "./pages/AdminAuth";
import AdminDashboard from "./pages/AdminDashboard";
import SolutionsHub from "./pages/SolutionsHub";
import AISolutionsPage from "./pages/AISolutionsPage";
import BrandingSolutionsPage from "./pages/BrandingSolutionsPage";
import ConsultationSolutionsPage from "./pages/ConsultationSolutionsPage";
import BookSprint from "./pages/BookSprint";
import About from "./pages/About";
import Work from "./pages/Work";
import JournalPage from "./pages/JournalPage";
import ContactPage from "./pages/ContactPage";
import BlogPostPage from "./pages/BlogPostPage";
import { PageAtmosphereProvider, AtmosphericBackground } from "./contexts/PageAtmosphereContext";

const queryClient = new QueryClient();

// Scroll restoration with position memory
const ScrollRestoration = () => {
  const { pathname } = useLocation();
  const scrollPositions = useRef<Record<string, number>>({});
  
  useEffect(() => {
    // Save current scroll position before navigation
    const currentPath = pathname;
    
    const handleBeforeUnload = () => {
      scrollPositions.current[currentPath] = window.scrollY;
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Restore scroll position or scroll to top
    const savedPosition = scrollPositions.current[pathname];
    if (savedPosition !== undefined) {
      window.scrollTo({ top: savedPosition, left: 0, behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    
    return () => {
      scrollPositions.current[currentPath] = window.scrollY;
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);
  
  return null;
};

// Enhanced page transition variants with more dramatic effects
const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 30,
    scale: 0.98,
    filter: 'blur(8px)',
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: { 
    opacity: 0, 
    y: -20,
    scale: 1.02,
    filter: 'blur(8px)',
  },
};

// Get transition config based on destination
const getTransitionConfig = (pathname: string) => {
  if (pathname === '/contact' || pathname === '/about' || pathname === '/book-sprint') {
    return { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };
  }
  return { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const transitionConfig = getTransitionConfig(location.pathname);
  
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
          transition={transitionConfig}
          className="min-h-screen"
        >
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
        </motion.div>
      </AnimatePresence>
    </>
  );
};

const AppContent = () => (
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
);

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
