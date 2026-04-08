import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import {
  LayoutDashboard,
  Home,
  Info,
  Eye,
  BookOpen,
  Heart,
  Mail,
  Image,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Globe,
  MessageCircle,
  Share2,
  Navigation,
  PanelBottom,
} from "lucide-react";

interface NavItem {
  label: string;
  to?: string;
  icon: React.ElementType;
  children?: { label: string; to: string }[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  {
    label: "Home Page",
    icon: Home,
    children: [
      { label: "Hero Slider", to: "/admin/home/hero" },
      { label: "Stats", to: "/admin/home/stats" },
      { label: "About Section", to: "/admin/home/about" },
      { label: "Services", to: "/admin/home/services" },
      { label: "Journey Steps", to: "/admin/home/journey" },
      { label: "Testimonials", to: "/admin/home/testimonials" },
      { label: "Programs", to: "/admin/home/programs" },
      { label: "Impact Stats", to: "/admin/home/impact" },
      { label: "Why Choose Us", to: "/admin/home/why" },
      { label: "Partners", to: "/admin/home/partners" },
      { label: "Visit Cards", to: "/admin/home/visit" },
      { label: "Final CTA", to: "/admin/home/cta" },
      { label: "Images", to: "/admin/home/gallery" },
    ],
  },
  {
    label: "About Page",
    icon: Info,
    children: [
      { label: "Hero", to: "/admin/about/hero" },
      { label: "Origin Story", to: "/admin/about/origin" },
      { label: "Milestones", to: "/admin/about/milestones" },
      { label: "Director Bio", to: "/admin/about/director" },
      { label: "Values", to: "/admin/about/values" },
      { label: "Board Section", to: "/admin/about/board" },
      { label: "Images", to: "/admin/about/images" },
    ],
  },
  {
    label: "Eye Clinic Page",
    icon: Eye,
    children: [
      { label: "Hero", to: "/admin/clinic/hero" },
      { label: "Mission Quote", to: "/admin/clinic/mission" },
      { label: "About Clinic", to: "/admin/clinic/about" },
      { label: "Services", to: "/admin/clinic/services" },
      { label: "Surgical Stats", to: "/admin/clinic/surgical" },
      { label: "Clinic Hours", to: "/admin/clinic/hours" },
      { label: "CTA", to: "/admin/clinic/cta" },
      { label: "Images", to: "/admin/clinic/images" },
    ],
  },
  {
    label: "Blog Page",
    icon: BookOpen,
    children: [
      { label: "Manage Posts", to: "/admin/blog/manage" },
      { label: "Hero Section", to: "/admin/blog/hero" },
    ],
  },
  {
    label: "Donate Page",
    icon: Heart,
    children: [
      { label: "Hero", to: "/admin/donate/hero" },
      { label: "Why Support", to: "/admin/donate/why" },
      { label: "Ways to Help", to: "/admin/donate/ways" },
      { label: "Donate CTA", to: "/admin/donate/cta" },
      { label: "Image", to: "/admin/donate/image" },
    ],
  },
  {
    label: "Contact Page",
    icon: Mail,
    children: [
      { label: "Hero", to: "/admin/contact/hero" },
      { label: "Contact Info", to: "/admin/contact/info" },
    ],
  },
  {
    label: "Gallery Page",
    icon: Image,
    children: [
      { label: "Manage Images", to: "/admin/gallery/manage" },
      { label: "Hero Section", to: "/admin/gallery/hero" },
    ],
  },
  {
    label: "Global Settings",
    icon: Settings,
    children: [
      { label: "WhatsApp", to: "/admin/settings/whatsapp" },
      { label: "Social Links", to: "/admin/settings/socials" },
      { label: "Navbar", to: "/admin/settings/navbar" },
      { label: "Footer", to: "/admin/settings/footer" },
    ],
  },
];

const AdminLayout = () => {
  const { logout } = useAdminAuth();
  const handleLogout = async () => {
    await logout();
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const location = useLocation();

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isChildActive = (item: NavItem) =>
    item.children?.some((c) => location.pathname === c.to);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Eye size={16} className="text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">TLEC Admin</p>
              <p className="text-[10px] text-muted-foreground">Content Manager</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {navItems.map((item) =>
            item.to ? (
              <NavLink
                key={item.label}
                to={item.to}
                end
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`
                }
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ) : (
              <div key={item.label}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isChildActive(item) ? "bg-secondary/10 text-secondary" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <item.icon size={18} />
                    {item.label}
                  </span>
                  {expandedMenus.includes(item.label) || isChildActive(item) ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
                {(expandedMenus.includes(item.label) || isChildActive(item)) && (
                  <div className="ml-5 mt-0.5 space-y-0.5 border-l-2 border-border pl-3">
                    {item.children?.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center gap-4 px-4 md:px-6 h-14 bg-card/95 backdrop-blur border-b border-border">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground">
            <Menu size={22} />
          </button>
          <h2 className="text-sm font-semibold text-foreground truncate">
            {navItems.flatMap((i) => (i.children ? i.children.map(c => ({ label: c.label, to: c.to })) : [{ label: i.label, to: i.to || "" }])).find((i) => i.to === location.pathname)?.label || "Admin Panel"}
          </h2>
          <a href="/" target="_blank" rel="noopener noreferrer" className="ml-auto text-xs text-muted-foreground hover:text-secondary flex items-center gap-1">
            <Globe size={14} /> View Site
          </a>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
