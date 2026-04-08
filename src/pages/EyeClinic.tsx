import { Link } from "react-router-dom";
import { Reveal } from "@/hooks/use-scroll-reveal";
import { useSiteContent } from "@/contexts/SiteContentContext";













const EyeClinic = () => {
  const { content } = useSiteContent();
  return (
  <div className="overflow-hidden">
    {/* ─── Full-bleed Hero ─── */}
    <section className="relative h-[85vh] min-h-[600px] flex items-end">
      <img
        src={content.clinicHeroImage}
        alt="Eye examination at The Lens Eye Clinic"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, hsl(213 86% 8% / 0.92) 0%, hsl(213 86% 8% / 0.5) 40%, transparent 70%)",
        }}
      />
      <div className="container relative pb-16 md:pb-24 z-10">
        <Reveal direction="up">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
            style={{
              background: "hsl(var(--secondary) / 0.15)",
              color: "hsl(var(--secondary))",
              backdropFilter: "blur(8px)",
            }}
          >
            Medical Services
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.08] max-w-4xl"
            style={{ color: "white" }}
          >
            The Lens
            <br />
            Eye Clinic
          </h1>
          <p
            className="mt-5 text-base sm:text-lg max-w-xl leading-relaxed"
            style={{ color: "hsl(0 0% 100% / 0.72)" }}
          >
            Expert eye care from pediatric ophthalmology to advanced surgical
            procedures — restoring sight and transforming lives in Port Harcourt.
          </p>
        </Reveal>
      </div>
    </section>

    {/* ─── Mission Statement Strip ─── */}
    <section
      className="py-16 md:py-24"
      style={{
        background:
          "linear-gradient(135deg, hsl(var(--primary)), hsl(213 86% 22%))",
      }}
    >
      <div className="container">
        <Reveal direction="up">
          <p
            className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed max-w-4xl mx-auto text-center"
            style={{ color: "hsl(0 0% 100% / 0.9)" }}
          >
            "We believe every person deserves access to quality eye care —
            regardless of age, background, or ability to pay. That's the
            promise behind everything we do."
          </p>
        </Reveal>
      </div>
    </section>

    {/* ─── About the Clinic — Editorial Split ─── */}
    <section className="py-20 md:py-32 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal direction="left">
            <div className="relative">
              <img
                src={content.clinicAboutImage}
                alt="Prof. Adio consulting with patients"
                className="rounded-3xl w-full aspect-[4/5] object-cover"
              />
              {/* Accent floating card */}
              <div
                className="absolute -bottom-6 -right-4 md:-right-8 rounded-2xl p-5 shadow-2xl max-w-[220px]"
                style={{
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                }}
              >
                <p className="text-3xl font-bold">20+</p>
                <p className="text-sm mt-1 opacity-80">Years of specialized eye care excellence</p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.15}>
            <div>
              <span className="text-sm font-semibold tracking-widest uppercase text-secondary mb-4 block">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
                Comprehensive Eye Care, <br className="hidden md:block" />
                World-Class Expertise
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The Lens Eye Clinic provides expert diagnosis and treatment for
                  a wide range of eye conditions. Our team, led by Prof. Adedayo
                  Adio — a fellowship-trained pediatric ophthalmologist — brings
                  world-class expertise to Port Harcourt, Nigeria.
                </p>
                <p>
                  We are equipped for both outpatient consultations and surgical
                  procedures, including cataract extraction, strabismus
                  correction, ptosis repair, and ROP screening for premature
                  newborns.
                </p>
                <p>
                  From the very first consultation to post-operative care, every
                  step is guided by compassion, precision, and a commitment to
                  restoring the gift of sight.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* ─── Services — Magazine-style Image Grid ─── */}
    <section className="section-blue py-20 md:py-32">
      <div className="container">
        <Reveal direction="up">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase text-secondary mb-3 block">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Clinic Services
            </h2>
          </div>
        </Reveal>

        {/* Bento-style services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Large featured card */}
          <Reveal direction="up" className="lg:col-span-2 lg:row-span-2">
            <div className="relative rounded-3xl overflow-hidden h-full min-h-[400px] group">
              <img
                src={content.clinicImages[2] || ""}
                alt="Pediatric eye examination"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, hsl(213 86% 8% / 0.88) 0%, hsl(213 86% 8% / 0.3) 50%, transparent 100%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <span
                  className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase mb-3"
                  style={{
                    background: "hsl(var(--secondary) / 0.2)",
                    color: "hsl(var(--secondary))",
                  }}
                >
                  Specialty
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "white" }}>
                  Pediatric Eye Care
                </h3>
                <p className="max-w-md leading-relaxed" style={{ color: "hsl(0 0% 100% / 0.75)" }}>
                  Specialized diagnosis and treatment for children from infancy
                  through adolescence — including congenital conditions,
                  strabismus, and amblyopia.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Smaller service cards */}
          <Reveal direction="up" delay={0.1}>
            <ServiceImageCard
              image={content.clinicImages[0] || ""}
              alt="Cataract & glaucoma management"
              title="Cataract & Glaucoma"
              description="Advanced surgical and medical management restoring clarity and preserving vision."
            />
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <ServiceImageCard
              image={content.clinicImages[2] || ""}
              alt="Low vision assessment and aids"
              title="Low Vision Assessment"
              description="Comprehensive evaluation and optical aids to maximize remaining vision for daily independence."
            />
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <ServiceImageCard
              image={content.clinicImages[1] || ""}
              alt="Neuro-ophthalmology diagnostics"
              title="Neuro-Ophthalmology"
              description="Diagnosis and management of vision problems related to the nervous system."
            />
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <ServiceImageCard
              image={content.clinicImages[0] || ""}
              alt="Strabismus and ptosis correction surgery"
              title="Strabismus & Ptosis Surgery"
              description="Corrective surgery for misaligned eyes and drooping eyelids with precision techniques."
            />
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <ServiceImageCard
              image={content.clinicImages[1] || ""}
              alt="ROP screening for premature infants"
              title="ROP Screening"
              description="Early detection of Retinopathy of Prematurity in premature newborns — saving sight from day one."
            />
          </Reveal>
        </div>
      </div>
    </section>

    {/* ─── Surgical Excellence — Full-width Parallax ─── */}
    <section className="relative py-32 md:py-44">
      <img
        src={content.clinicImages[0] || ""}
        alt="Surgical procedures at The Lens Eye Clinic"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(213 86% 8% / 0.88), hsl(213 60% 16% / 0.75))",
        }}
      />
      <div className="container relative z-10">
        <div className="max-w-2xl">
          <Reveal direction="up">
            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "hsl(var(--secondary))" }}>
              Surgical Excellence
            </span>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6" style={{ color: "white" }}>
              Precision That Restores Sight
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "hsl(0 0% 100% / 0.75)" }}>
              Our surgical team performs sight-restoring procedures with
              meticulous care — from routine cataract surgeries to complex
              pediatric operations. Every procedure is performed with
              state-of-the-art monitoring and the highest safety standards.
            </p>
            <div className="flex flex-wrap gap-4">
              <StatPill label="Surgeries Performed" value="5,000+" />
              <StatPill label="Success Rate" value="98%" />
              <StatPill label="Patients Served" value="15,000+" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* ─── Meet the Lead — Profile Section ─── */}
    <section className="py-20 md:py-32 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <Reveal direction="up" className="lg:col-span-2">
            <div className="relative">
              <img
                src={content.clinicImages[5] || ""}
                alt="Prof. Adedayo Adio"
                className="rounded-3xl w-full aspect-[3/4] object-cover shadow-xl"
              />
              <div
                className="absolute -bottom-4 left-6 right-6 rounded-2xl py-4 px-5 text-center shadow-xl"
                style={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                }}
              >
                <p className="font-bold text-foreground">Prof. Adedayo Adio</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Lead Consultant & Pediatric Ophthalmologist
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.15} className="lg:col-span-3">
            <span className="text-sm font-semibold tracking-widest uppercase text-secondary mb-4 block">
              Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
              Led by a Pioneer in
              <br className="hidden md:block" /> Pediatric Ophthalmology
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Prof. Adedayo Adio is a fellowship-trained pediatric
                ophthalmologist with over two decades of experience in the
                diagnosis, treatment, and surgical management of childhood eye
                diseases. Her expertise spans congenital cataracts, strabismus,
                ROP, and complex oculoplastic procedures.
              </p>
              <p>
                A passionate advocate for childhood blindness prevention across
                West Africa, she has trained hundreds of eye care professionals
                through workshops, seminars, and the TLEC Low Vision Training
                Programme.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* ─── Training & Professional Development ─── */}
    <section className="section-warm py-20 md:py-32">
      <div className="container">
        <Reveal direction="up">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase text-secondary mb-3 block">
              Knowledge & Training
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Professional Development
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          <Reveal direction="up">
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] group">
              <img
                src={content.clinicImages[3] || ""}
                alt="Primary Eye Care workshop"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, hsl(213 86% 8% / 0.85), transparent 60%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-xl font-bold mb-2" style={{ color: "white" }}>
                  Low Vision Training Programme
                </h3>
                <p className="text-sm leading-relaxed max-w-md" style={{ color: "hsl(0 0% 100% / 0.75)" }}>
                  Intensive courses for optometrists, ophthalmologists, and eye
                  care workers — equipping professionals across Nigeria with vital
                  skills in low vision rehabilitation.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] group">
              <img
                src={content.clinicImages[4] || ""}
                alt="Training session with healthcare workers"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, hsl(213 86% 8% / 0.85), transparent 60%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-xl font-bold mb-2" style={{ color: "white" }}>
                  Community Health Worker Training
                </h3>
                <p className="text-sm leading-relaxed max-w-md" style={{ color: "hsl(0 0% 100% / 0.75)" }}>
                  Partnering with Rivers State Health Board to train primary care
                  providers in early detection and referral of eye conditions.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* ─── Clinic Hours — Elegant Card ─── */}
    <section className="py-20 md:py-32 bg-background">
      <div className="container max-w-3xl">
        <Reveal direction="up">
          <div
            className="rounded-3xl p-8 md:p-12 shadow-xl"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)), hsl(213 86% 22%))",
            }}
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "white" }}>
                Clinic Hours
              </h2>
              <p className="text-sm mt-2" style={{ color: "hsl(0 0% 100% / 0.65)" }}>
                Walk-ins welcome · Appointments preferred
              </p>
            </div>

            <div className="space-y-0 divide-y" style={{ borderColor: "hsl(0 0% 100% / 0.12)" }}>
              {[
                { day: "Monday — Friday", time: "8:00 AM – 5:00 PM" },
                { day: "Saturday", time: "8:00 AM – 2:00 PM" },
                { day: "Sunday", time: "Closed" },
                { day: "Low Vision Clinic", time: "Fridays, 9:00 AM" },
              ].map((h) => (
                <div
                  key={h.day}
                  className="flex justify-between items-center py-4"
                  style={{ borderColor: "hsl(0 0% 100% / 0.12)" }}
                >
                  <span className="font-medium" style={{ color: "hsl(0 0% 100% / 0.9)" }}>
                    {h.day}
                  </span>
                  <span className="text-sm" style={{ color: "hsl(var(--secondary))" }}>
                    {h.time}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: "hsl(0 0% 100% / 0.12)",
                  color: "white",
                  border: "1px solid hsl(0 0% 100% / 0.18)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "hsl(0 0% 100% / 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "hsl(0 0% 100% / 0.12)";
                }}
              >
                Book an Appointment →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* ─── CTA ─── */}
    <section className="relative py-24 md:py-32">
      <img
        src={content.clinicImages[0] || ""}
        alt="Eye examination"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(213 86% 8% / 0.9), hsl(193 90% 20% / 0.85))",
        }}
      />
      <div className="container relative z-10 text-center">
        <Reveal direction="up">
          <h2 className="text-3xl md:text-5xl font-bold mb-5" style={{ color: "white" }}>
            Your Vision Is Our Mission
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto mb-8" style={{ color: "hsl(0 0% 100% / 0.72)" }}>
            Whether you need a routine check-up or specialized surgery, The Lens
            Eye Clinic is here to help you see the world clearly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg"
              style={{
                background: "hsl(var(--secondary))",
                color: "hsl(var(--secondary-foreground))",
              }}
            >
              Get in Touch
            </Link>
            <Link
              to="/donate"
              className="px-7 py-3.5 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: "hsl(0 0% 100% / 0.1)",
                color: "white",
                border: "1px solid hsl(0 0% 100% / 0.2)",
              }}
            >
              Support Our Work
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  </div>
  );
};

/* ─── Sub-components ─── */

const ServiceImageCard = ({
  image,
  alt,
  title,
  description,
}: {
  image: string;
  alt: string;
  title: string;
  description: string;
}) => (
  <div className="relative rounded-3xl overflow-hidden aspect-[4/5] group h-full">
    <img
      src={image}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(to top, hsl(213 86% 8% / 0.88) 0%, hsl(213 86% 8% / 0.2) 60%, transparent 100%)",
      }}
    />
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <h3 className="text-lg font-bold mb-1.5" style={{ color: "white" }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "hsl(0 0% 100% / 0.72)" }}>
        {description}
      </p>
    </div>
  </div>
);

const StatPill = ({ label, value }: { label: string; value: string }) => (
  <div
    className="rounded-2xl px-5 py-3"
    style={{
      background: "hsl(0 0% 100% / 0.08)",
      border: "1px solid hsl(0 0% 100% / 0.12)",
    }}
  >
    <p className="text-xl md:text-2xl font-bold" style={{ color: "white" }}>
      {value}
    </p>
    <p className="text-xs mt-0.5" style={{ color: "hsl(0 0% 100% / 0.6)" }}>
      {label}
    </p>
  </div>
);

export default EyeClinic;