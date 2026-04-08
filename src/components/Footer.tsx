import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowRight, Heart } from "lucide-react";
import logo from "@/assets/tlec-logo.jpg";

const footerLinks = [
  { to: "/about", label: "About Us" },
  { to: "/eye-clinic", label: "Eye Clinic" },
  { to: "/blog", label: "Blog" },
  { to: "/donate", label: "Donate" },
  { to: "/contact", label: "Contact" },
];

const socials = [
  { icon: Facebook, href: "https://facebook.com/TLECrehabnig", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/tlecrehab", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/tlec_rehab", label: "Instagram" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

const Footer = () => (
  <footer className="relative overflow-hidden">
    {/* Top CTA band */}
    <div className="bg-gradient-to-r from-primary via-[hsl(213,86%,25%)] to-secondary">
      <div className="container py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-primary-foreground">
          <Heart size={20} className="text-secondary shrink-0" />
          <p className="text-sm md:text-base font-medium">
            Help us restore sight and hope — every donation makes a difference.
          </p>
        </div>
        <Link
          to="/donate"
          className="group inline-flex items-center gap-2 px-5 py-2.5 bg-primary-foreground/10 hover:bg-primary-foreground/20 border border-primary-foreground/20 text-primary-foreground text-sm font-semibold rounded-lg backdrop-blur-sm transition-all shrink-0"
        >
          Donate Now
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>

    {/* Main footer */}
    <div className="bg-foreground text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <img src={logo} alt="TLEC" className="h-10 w-auto rounded" />
              <div>
                <p className="font-heading font-bold text-sm">TLEC (Re)Hab</p>
                <p className="text-[11px] text-primary-foreground/50">Foundation for the Blind</p>
              </div>
            </div>
            <p className="text-xs text-primary-foreground/50 leading-relaxed max-w-xs mb-6">
              Combining professional eye care with long-term rehabilitation since 2015. Based in Port Harcourt, Rivers State, Nigeria.
            </p>
            <div className="flex gap-2">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-primary-foreground/5 hover:bg-secondary/20 hover:text-secondary flex items-center justify-center transition-all duration-300 text-primary-foreground/40"
                >
                  <s.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground/30 mb-4">Navigation</h4>
            <div className="flex flex-col gap-2.5">
              {footerLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-sm text-primary-foreground/60 hover:text-secondary transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground/30 mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin size={14} className="mt-1 shrink-0 text-primary-foreground/30" />
                <span className="text-primary-foreground/60">1 & 2 Amba Drive, Off Christ Chapel Ave, Eleme Junction, Port Harcourt, Rivers State</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={14} className="shrink-0 text-primary-foreground/30" />
                <span className="text-primary-foreground/60">+234 803 310 8139</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail size={14} className="shrink-0 text-primary-foreground/30" />
                <span className="text-primary-foreground/60">tlecrehab@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/5">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-primary-foreground/30">
            © {new Date().getFullYear()} The Lens (re)Habilitation Foundation for the Blind
          </p>
          <p className="text-[11px] text-primary-foreground/20">
            All rights reserved
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
