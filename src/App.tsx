import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteContentProvider } from "@/contexts/SiteContentContext";
import { AdminAuthProvider, useAdminAuth } from "@/contexts/AdminAuthContext";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import EyeClinic from "./pages/EyeClinic";
import Blog from "./pages/Blog";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import WhatsAppButton from "./components/WhatsAppButton";
import { useEffect } from "react";
import { trackPageVisit } from "./lib/supabase-content";
import { Loader2 } from "lucide-react";

// Admin
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import {
  HomeHeroEditor, HomeStatsEditor, HomeAboutEditor, HomeServicesEditor,
  HomeJourneyEditor, HomeTestimonialsEditor, HomeProgramsEditor,
  HomeImpactEditor, HomeWhyEditor, HomePartnersEditor, HomeVisitEditor, HomeCtaEditor,
  HomeGalleryEditor,
} from "./pages/admin/editors/HomeEditors";
import {
  AboutHeroEditor, AboutOriginEditor, AboutMilestonesEditor,
  AboutDirectorEditor, AboutValuesEditor, AboutBoardEditor, AboutImagesEditor,
} from "./pages/admin/editors/AboutEditors";
import {
  ClinicHeroEditor, ClinicMissionEditor, ClinicAboutEditor,
  ClinicServicesEditor, ClinicSurgicalEditor, ClinicHoursEditor, ClinicCtaEditor,
  ClinicImagesEditor,
} from "./pages/admin/editors/ClinicEditors";
import {
  BlogHeroEditor, BlogPostsEditor,
  DonateHeroEditor, DonateWhyEditor, DonateWaysEditor, DonateCtaEditor, DonateImageEditor,
  ContactHeroEditor, ContactInfoEditor, GalleryHeroEditor, GalleryImagesEditor,
} from "./pages/admin/editors/OtherEditors";
import {
  WhatsAppEditor, SocialsEditor, NavbarEditor, FooterEditor,
} from "./pages/admin/editors/SettingsEditors";

const queryClient = new QueryClient();

// Track page visits on route change
const PageTracker = () => {
  const location = useLocation();
  useEffect(() => {
    if (!location.pathname.startsWith("/admin")) {
      trackPageVisit(location.pathname);
    }
  }, [location.pathname]);
  return null;
};

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAdminAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="animate-spin text-secondary" size={32} />
    </div>
  );
  if (!isAuthenticated) return <AdminLogin />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SiteContentProvider>
        <AdminAuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <PageTracker />
            <Routes>
              {/* Public site */}
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/eye-clinic" element={<EyeClinic />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
              </Route>

              {/* Admin panel */}
              <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
                <Route index element={<AdminDashboard />} />
                <Route path="home/hero" element={<HomeHeroEditor />} />
                <Route path="home/stats" element={<HomeStatsEditor />} />
                <Route path="home/about" element={<HomeAboutEditor />} />
                <Route path="home/services" element={<HomeServicesEditor />} />
                <Route path="home/journey" element={<HomeJourneyEditor />} />
                <Route path="home/testimonials" element={<HomeTestimonialsEditor />} />
                <Route path="home/programs" element={<HomeProgramsEditor />} />
                <Route path="home/impact" element={<HomeImpactEditor />} />
                <Route path="home/why" element={<HomeWhyEditor />} />
                <Route path="home/partners" element={<HomePartnersEditor />} />
                <Route path="home/visit" element={<HomeVisitEditor />} />
                <Route path="home/cta" element={<HomeCtaEditor />} />
                <Route path="home/gallery" element={<HomeGalleryEditor />} />
                <Route path="about/hero" element={<AboutHeroEditor />} />
                <Route path="about/origin" element={<AboutOriginEditor />} />
                <Route path="about/milestones" element={<AboutMilestonesEditor />} />
                <Route path="about/director" element={<AboutDirectorEditor />} />
                <Route path="about/values" element={<AboutValuesEditor />} />
                <Route path="about/board" element={<AboutBoardEditor />} />
                <Route path="about/images" element={<AboutImagesEditor />} />
                <Route path="clinic/hero" element={<ClinicHeroEditor />} />
                <Route path="clinic/mission" element={<ClinicMissionEditor />} />
                <Route path="clinic/about" element={<ClinicAboutEditor />} />
                <Route path="clinic/services" element={<ClinicServicesEditor />} />
                <Route path="clinic/surgical" element={<ClinicSurgicalEditor />} />
                <Route path="clinic/hours" element={<ClinicHoursEditor />} />
                <Route path="clinic/cta" element={<ClinicCtaEditor />} />
                <Route path="clinic/images" element={<ClinicImagesEditor />} />
                <Route path="blog/hero" element={<BlogHeroEditor />} />
                <Route path="blog/posts" element={<BlogPostsEditor />} />
                <Route path="donate/hero" element={<DonateHeroEditor />} />
                <Route path="donate/why" element={<DonateWhyEditor />} />
                <Route path="donate/ways" element={<DonateWaysEditor />} />
                <Route path="donate/cta" element={<DonateCtaEditor />} />
                <Route path="donate/image" element={<DonateImageEditor />} />
                <Route path="contact/hero" element={<ContactHeroEditor />} />
                <Route path="contact/info" element={<ContactInfoEditor />} />
                <Route path="gallery/hero" element={<GalleryHeroEditor />} />
                <Route path="gallery/images" element={<GalleryImagesEditor />} />
                <Route path="settings/whatsapp" element={<WhatsAppEditor />} />
                <Route path="settings/socials" element={<SocialsEditor />} />
                <Route path="settings/navbar" element={<NavbarEditor />} />
                <Route path="settings/footer" element={<FooterEditor />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
            <WhatsAppButton />
          </BrowserRouter>
        </AdminAuthProvider>
      </SiteContentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
