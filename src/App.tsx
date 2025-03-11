
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import CreateMemory from "./pages/CreateMemory";
import MemoryDetail from "./pages/MemoryDetail";
import { MemoryProvider } from "./contexts/MemoryContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MemoryProvider>
        <Toaster />
        <Sonner position="top-center" closeButton />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/create" element={<CreateMemory />} />
            <Route path="/memory/:id" element={<MemoryDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MemoryProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
