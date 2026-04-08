import { useSiteContent } from "@/contexts/SiteContentContext";
import { useState } from "react";
import { Reveal } from "@/hooks/use-scroll-reveal";
import { X } from "lucide-react";


const categories = ["All", "Outreach", "Clinic", "Rehabilitation", "Facility", "Training"] as const;
type Category = (typeof categories)[number];


interface GalleryImage {
  src: string;
  alt: string;
  category: Category;
  span?: string; // tailwind col/row span classes
}


const Gallery = () => {
  const { content } = useSiteContent();
  const images = content.galleryImages;
  const [active, setActive] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "All" ? images : images.filter((img) => img.category === active);

  return (
    <>
      {/* Hero */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(213 86% 8%), hsl(213 60% 16%), hsl(213 86% 10%))" }}
      >
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(var(--secondary)) , transparent 50%), radial-gradient(circle at 80% 50%, hsl(213 60% 30%), transparent 50%)" }} />
        <div className="container relative text-center">
          <Reveal direction="up">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6" style={{ background: "hsl(var(--secondary) / 0.15)", color: "hsl(var(--secondary))" }}>
              Our Gallery
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4" style={{ color: "white" }}>
              Moments That <span style={{ color: "hsl(var(--secondary))" }}>Matter</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "hsl(0 0% 100% / 0.7)" }}>
              A visual journey through our work — from outreach screenings and clinic consultations to rehabilitation milestones and community impact.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-30 border-b border-border" style={{ background: "hsl(var(--background) / 0.95)", backdropFilter: "blur(12px)" }}>
        <div className="container flex gap-2 py-4 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                active === cat
                  ? "bg-secondary text-secondary-foreground shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[240px] md:auto-rows-[280px]">
            {filtered.map((img, i) => (
              <Reveal key={img.src + active} delay={Math.min(i * 0.05, 0.3)} direction="scale" className={`${img.span || ""}`}>
                <button
                  onClick={() => setLightbox(i)}
                  className="group relative w-full h-full rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ background: "hsl(var(--secondary) / 0.9)", color: "hsl(var(--secondary-foreground))" }}>
                      {img.category}
                    </span>
                    <p className="text-sm leading-snug" style={{ color: "white" }}>{img.alt}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "hsl(0 0% 0% / 0.9)" }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 p-2 rounded-full transition-colors"
            style={{ color: "white", background: "hsl(0 0% 100% / 0.1)" }}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={filtered[lightbox]?.src}
            alt={filtered[lightbox]?.alt}
            className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-center max-w-md" style={{ color: "hsl(0 0% 100% / 0.7)" }}>
            {filtered[lightbox]?.alt}
          </p>
        </div>
      )}
    </>
  );
};

export default Gallery;
