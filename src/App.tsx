import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ScrollToTop } from "@/components/ScrollToTop";
import { LoadingScreen } from "@/components/LoadingScreen";
import { PageTransition } from "@/components/PageTransition";
import Index from "./pages/Index";
import LoQueSomos from "./pages/LoQueSomos";
import Directorio from "./pages/Directorio";
import HallOfFame from "./pages/HallOfFame";
import Numeros from "./pages/Numeros";
import Galeria from "./pages/Galeria";
import Diario from "./pages/Diario";
import DiarioPost from "./pages/DiarioPost";
import FormarParte from "./pages/FormarParte";
import Gear from "./pages/Gear";
import GearProduct from "./pages/GearProduct";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/lo-que-somos" element={<PageTransition><LoQueSomos /></PageTransition>} />
        <Route path="/directorio" element={<PageTransition><Directorio /></PageTransition>} />
        <Route path="/hall-of-fame" element={<PageTransition><HallOfFame /></PageTransition>} />
        <Route path="/numeros" element={<PageTransition><Numeros /></PageTransition>} />
        <Route path="/galeria" element={<PageTransition><Galeria /></PageTransition>} />
        <Route path="/diario" element={<PageTransition><Diario /></PageTransition>} />
        <Route path="/diario/:slug" element={<PageTransition><DiarioPost /></PageTransition>} />
        <Route path="/formar-parte" element={<PageTransition><FormarParte /></PageTransition>} />
        <Route path="/gear" element={<PageTransition><Gear /></PageTransition>} />
        <Route path="/gear/:slug" element={<PageTransition><GearProduct /></PageTransition>} />
        <Route path="/contacto" element={<PageTransition><Contacto /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LoadingScreen />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
