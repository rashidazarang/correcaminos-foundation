import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import LoQueSomos from "./pages/LoQueSomos";
import Directorio from "./pages/Directorio";
import HallOfFame from "./pages/HallOfFame";
import Numeros from "./pages/Numeros";
import Galeria from "./pages/Galeria";
import Diario from "./pages/Diario";
import FormarParte from "./pages/FormarParte";
import Gear from "./pages/Gear";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/lo-que-somos" element={<LoQueSomos />} />
            <Route path="/directorio" element={<Directorio />} />
            <Route path="/hall-of-fame" element={<HallOfFame />} />
            <Route path="/numeros" element={<Numeros />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/diario" element={<Diario />} />
            <Route path="/formar-parte" element={<FormarParte />} />
            <Route path="/gear" element={<Gear />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
