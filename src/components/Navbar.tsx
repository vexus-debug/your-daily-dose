import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import logo from "@/assets/tlec-logo.jpg";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/eye-clinic", label: "The Lens Eye Clinic" },
  { to: "/blog", label: "Blog" },
  { to: "/gallery", label: "Gallery" },
  { to: "/donate", label: "Donate" },
  { to: "/contact", label: "Contact Us" },
];

const socials = [
  { icon: Facebook, href: "https://facebook.com/TLECrehabnig", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/tlecrehab", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/tlec_rehab", label: "Instagram" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="TLEC Logo" className="h-14 w-auto rounded" />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-primary leading-tight">TLEC (Re)Hab</p>
            <p className="text-xs text-muted-foreground leading-tight">Foundation for the Blind</p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === link.to
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile slide-out menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="lg:hidden p-2 text-foreground" aria-label="Open menu">
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] p-0 flex flex-col">
            {/* Header */}
            <div className="p-6 pb-4 border-b border-border">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                <img src={logo} alt="TLEC Logo" className="h-12 w-auto rounded" />
                <div>
                  <p className="text-sm font-semibold text-primary leading-tight">TLEC (Re)Hab</p>
                  <p className="text-xs text-muted-foreground leading-tight">Foundation for the Blind</p>
                </div>
              </Link>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all mb-1 ${
                    pathname === link.to
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Contact & Social footer */}
            <div className="border-t border-border p-6 space-y-4">
              <div className="space-y-2.5">
                <a href="tel:+2348033043aborting" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Phone size={16} className="text-primary shrink-0" />
                  <span>+234 803 304 3927</span>
                </a>
                <a href="mailto:info@tlecrehab.org" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Mail size={16} className="text-primary shrink-0" />
                  <span>info@tlecrehab.org</span>
                </a>
              </div>

              <div className="flex items-center gap-3 pt-1">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <s.icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
