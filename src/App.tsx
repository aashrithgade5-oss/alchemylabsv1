import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ServicePage } from "./pages/ServicePage";
import { Preloader } from "./components/Preloader";
import { SmoothScroll } from "./components/SmoothScroll";
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

const queryClient = new QueryClient();

// Scroll restoration component
const ScrollToTopOnMount = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <>
      <ScrollToTopOnMount />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
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
  <SmoothScroll>
    <Preloader />
    <Toaster />
    <Sonner />
    <AnimatedRoutes />
  </SmoothScroll>
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
