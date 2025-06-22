import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Club from "./pages/Club";
import Team from "./pages/Team";
import Games from "./pages/Games";
import TV from "./pages/TV";
import Youth from "./pages/Youth";
import LoginPage from "./pages/Login";
import ArticlePage from "./pages/ArticlePage";
import VideoPage from "./pages/VideoPage";
import NotFound from "./pages/NotFound";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/club" element={<Club />} />
          <Route path="/team" element={<Team />} />
          <Route path="/games" element={<Games />} />
          <Route path="/tv" element={<TV />} />
          <Route path="/video/:id" element={<VideoPage />} />
          <Route path="/youth" element={<Youth />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
