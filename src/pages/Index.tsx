import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  Heart,
  Mail,
  ExternalLink,
  BookOpen,
  Users,
  HandHeart,
  Stethoscope,
  ArrowRight,
  Phone,
  Calendar,
  Smile,
  Shield,
  Star,
  Quote,
  MapPin,
  Clock,
  Award,
  GraduationCap,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Activity,
  Baby,
  Glasses,
  Brain,
} from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import { Reveal } from "@/hooks/use-scroll-reveal";
import { useCountUp } from "@/hooks/use-count-up";
import { useSiteContent } from "@/contexts/SiteContentContext";

/* ───────────────────────── DATA ───────────────────────── */

const stats = [
  { value: 2015, label: "Year Founded", icon: Calendar, suffix: "", isYear: true },
  { value: 1000, label: "Lives Touched", icon: Heart, suffix: "+" },
  { value: 100, label: "Professionals Trained", icon: GraduationCap, suffix: "+" },
  { value: 8, label: "Years of Service", icon: Award, suffix: "+" },
];

const services = [
  { icon: Eye, title: "Low Vision Care", desc: "Advanced assessment and assistive technology to maximize remaining vision.", color: "secondary" as const },
  { icon: Baby, title: "Pediatric Eye Care", desc: "Specialized treatment for children — including ROP screening for premature infants.", color: "primary" as const },
  { icon: Users, title: "Rehabilitation Programs", desc: "1-2 year orientation, mobility training, and daily living skills.", color: "accent" as const },
  { icon: BookOpen, title: "Professional Training", desc: "Intensive courses equipping eye care professionals with world-class skills.", color: "secondary" as const },
  { icon: Brain, title: "Neuro-Ophthalmology", desc: "Expert diagnosis and management of visual problems related to the nervous system.", color: "primary" as const },
  { icon: HandHeart, title: "Counselling & Support", desc: "Emotional and psychological support for patients and families.", color: "accent" as const },
];

const journey = [
  { step: "01", icon: Phone, title: "Reach Out", desc: "Contact us by phone or visit our Port Harcourt center." },
  { step: "02", icon: Eye, title: "Full Assessment", desc: "Thorough eye examinations using state-of-the-art equipment." },
  { step: "03", icon: Shield, title: "Personalized Plan", desc: "A tailored treatment or rehabilitation program for you." },
  { step: "04", icon: Smile, title: "New Independence", desc: "Gain independence and a brighter future through care." },
];

const testimonials = [
  { text: "TLEC gave my child a second chance at life. The team's dedication and expertise in pediatric eye care is truly remarkable.", name: "Mrs. Adaeze Nwosu", role: "Parent", initials: "AN" },
  { text: "The rehabilitation program transformed my life. I went from complete dependence to being able to navigate the world on my own.", name: "Emmanuel Okafor", role: "Graduate", initials: "EO" },
  { text: "The low vision intensive course was eye-opening. It equipped me with skills I now use daily in my practice across Nigeria.", name: "Dr. Funke Balogun", role: "Optometrist", initials: "FB" },
  { text: "From the counselling sessions to the mobility training, every aspect of the program showed genuine care for the whole person.", name: "Grace Ibe", role: "Patient", initials: "GI" },
];

/* programs data is now from context */

/* ───────────── COUNTER COMPONENT ───────────── */
const StatCounter = ({ value, suffix, label, icon: Icon, isYear }: { value: number; suffix: string; label: string; icon: React.ElementType; isYear?: boolean }) => {
  const { count, ref } = useCountUp(value, isYear ? 1500 : 2000);
  return (
    <div ref={ref} className="p-4 md:p-8 text-center">
      <Icon size={22} className="mx-auto mb-3 opacity-60" />
      <p className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
        {isYear ? (count || value) : count.toLocaleString()}<span className="text-lg">{suffix}</span>
      </p>
      <p className="text-xs md:text-sm opacity-70 mt-1 font-medium uppercase tracking-wider">{label}</p>
    </div>
  );
};

/* ───────────────────────── COMPONENT ───────────────────────── */

const Index = () => {
  const { content } = useSiteContent();
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const t = testimonials[testimonialIdx];

  return (
    <div className="overflow-hidden">
      <HeroSlider />

      {/* ═══════════ FLOATING STATS RIBBON ═══════════ */}
      <section className="relative -mt-10 md:-mt-20 z-20 px-4 md:px-8 lg:px-16 pb-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-0 md:rounded-2xl md:overflow-hidden md:shadow-2xl">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`${
                  i % 2 === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                } rounded-2xl md:rounded-none relative`}
              >
                <StatCounter value={s.value} suffix={s.suffix} label={s.label} icon={s.icon} isYear={s.isYear} />
                {i < 3 && <div className="hidden md:block absolute right-0 top-1/4 bottom-1/4 w-px bg-primary-foreground/15" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ABOUT / MISSION — IMMERSIVE FULL-BLEED ═══════════ */}
      <section className="relative py-14 md:py-24 overflow-hidden">
        {/* Full-width background image */}
        <div className="absolute inset-0">
          <img src={content.homeAboutBgImage} alt="" className="w-full h-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70 md:via-background/85 md:to-background/40" />
        </div>

        <div className="relative z-10 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-xl">
              <Reveal direction="left" delay={0.1}>
                <span className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4 block">Who We Are</span>
              </Reveal>

              <Reveal direction="left" delay={0.2}>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.1]">
                  More Than Eye Care —{" "}
                  <span className="text-gradient">A Lifeline</span>
                </h2>
              </Reveal>

              <Reveal direction="left" delay={0.3}>
                <div className="p-6 md:p-8 rounded-2xl bg-background/80 backdrop-blur-md border border-border/50 shadow-2xl">
                  <p className="text-muted-foreground text-base leading-relaxed mb-4">
                    The Lens (re)Habilitation Foundation for the Blind is a Nigerian
                    non-profit that combines <strong className="text-foreground">professional eye care</strong> with long-term
                    rehabilitation and skills training.
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    Based in Port Harcourt, Rivers State, we operate both a full-service eye
                    clinic and a rehabilitation center — providing medical
                    treatment and life-skills training so the visually impaired
                    can live <strong className="text-foreground">independently and productively</strong>.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      { icon: Stethoscope, text: "Expert-Led Care" },
                      { icon: Glasses, text: "Advanced Equipment" },
                      { icon: Heart, text: "Compassionate Team" },
                      { icon: Shield, text: "Holistic Approach" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <item.icon size={16} className="text-secondary shrink-0" />
                        {item.text}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/about"
                      className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 text-sm"
                    >
                      Our Story
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-xl hover:bg-muted transition-all text-sm"
                    >
                      <Calendar size={16} />
                      Book a Visit
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ WAVE DIVIDER ═══════ */}
      <div className="h-16 bg-gradient-to-b from-background to-[hsl(var(--section-warm))]" />

      {/* ═══════════ SERVICES — SLEEK LAYOUT ═══════════ */}
      <section className="relative py-14 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--section-warm))] to-background" />

        <div className="relative z-10 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="mb-10 md:mb-16 md:text-center">
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  What We <span className="text-gradient">Do</span>
                </h2>
                <p className="text-muted-foreground text-base md:text-lg max-w-2xl md:mx-auto">
                  From clinical treatment to long-term rehabilitation — a full spectrum of services.
                </p>
              </div>
            </Reveal>

            {/* Services list — clean minimal rows */}
            <div className="space-y-0 border-t border-border/60">
              {services.map((s, i) => (
                <Reveal key={i} delay={i * 0.08} direction="up">
                  <div className="group flex items-start md:items-center gap-4 md:gap-8 py-6 md:py-8 border-b border-border/40 hover:bg-foreground/[0.02] transition-colors duration-300 cursor-default">
                    {/* Number */}
                    <span className="font-heading text-xs md:text-sm font-bold text-muted-foreground/40 tabular-nums pt-1 md:pt-0 w-6 shrink-0">
                      0{i + 1}
                    </span>

                    {/* Minimal icon accent */}
                    <div className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                      s.color === "primary"
                        ? "bg-primary/8 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                        : s.color === "secondary"
                        ? "bg-secondary/15 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground"
                        : "bg-accent/10 text-accent-foreground/60 group-hover:bg-accent group-hover:text-accent-foreground"
                    } group-hover:scale-110`}>
                      <s.icon size={18} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-0.5 group-hover:text-primary transition-colors duration-300">{s.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">{s.desc}</p>
                    </div>

                    {/* Hover arrow */}
                    <ArrowRight size={18} className="shrink-0 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 hidden md:block" />
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="text-center mt-10">
                <Link to="/eye-clinic" className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                  View All Services <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ JOURNEY — REAL TIMELINE ═══════════ */}
      <section className="relative py-14 md:py-24 bg-primary overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-secondary/10 blur-[100px] animate-float" />
        <div className="absolute bottom-20 left-10 w-56 h-56 rounded-full bg-accent/8 blur-[80px] animate-float" style={{ animationDelay: "3s" }} />

        <div className="relative z-10 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="md:text-center mb-10 md:mb-16">
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                  From First Visit to{" "}
                  <span className="text-secondary">New Sight</span>
                </h2>
                <p className="text-primary-foreground/60 text-base md:text-lg max-w-xl md:mx-auto">
                  We walk alongside you at every step.
                </p>
              </div>
            </Reveal>

            {/* Mobile: vertical timeline with left line */}
            <div className="md:hidden relative pl-10">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-secondary via-secondary/50 to-transparent" />

              {journey.map((j, i) => (
                <Reveal key={i} delay={i * 0.12} direction="left">
                  <div className="relative mb-10 last:mb-0">
                    {/* Node */}
                    <div className="absolute -left-10 top-1 w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-xs font-bold flex items-center justify-center shadow-lg shadow-secondary/30 z-10">
                      {j.step}
                    </div>
                    <div className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-5">
                      <j.icon size={22} className="text-secondary mb-2" />
                      <h3 className="font-heading text-lg font-bold text-primary-foreground mb-1">{j.title}</h3>
                      <p className="text-primary-foreground/50 text-sm leading-relaxed">{j.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Desktop: horizontal steps */}
            <div className="hidden md:grid md:grid-cols-4 gap-8 relative">
              <div className="absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
              {journey.map((j, i) => (
                <Reveal key={i} delay={i * 0.15} direction="up">
                  <div className="text-center group relative">
                    <div className="relative mx-auto w-24 h-24 mb-6">
                      <div className="absolute inset-0 rounded-full bg-secondary/20 group-hover:bg-secondary/30 transition-all duration-500 group-hover:scale-110" />
                      <div className="absolute inset-2 rounded-full bg-primary border-2 border-secondary/40 flex items-center justify-center group-hover:border-secondary transition-colors duration-300">
                        <j.icon size={30} className="text-primary-foreground" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold flex items-center justify-center shadow-lg shadow-secondary/30">
                        {j.step}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-primary-foreground mb-2">{j.title}</h3>
                    <p className="text-primary-foreground/50 text-sm leading-relaxed max-w-[200px] mx-auto">{j.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ IMPACT — PARALLAX + COUNTERS ═══════════ */}
      <section className="relative min-h-[450px] md:h-[550px] overflow-hidden">
        <div
          className="absolute inset-0 parallax-bg"
          style={{ backgroundImage: `url(${content.homeImpactBgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.92)] via-[hsl(var(--primary)/0.85)] to-[hsl(var(--secondary)/0.7)]" />

        <div className="relative z-10 h-full flex items-center px-4 md:px-8 lg:px-16 py-14 md:py-0">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <Reveal direction="left">
                <div>
                  <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
                    Real Impact,{" "}
                    <span className="text-secondary">Real Lives</span>
                  </h2>
                  <p className="text-primary-foreground/70 text-base md:text-lg leading-relaxed mb-6">
                    Every number represents a person — a child who can now see,
                    a mother who regained independence.
                  </p>
                  <Link
                    to="/donate"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-accent-foreground font-bold rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/30"
                  >
                    <Heart size={18} />
                    Support Our Mission
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.2}>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {[
                    { end: 500, label: "Patients Treated", icon: Stethoscope, suffix: "+" },
                    { end: 200, label: "Surgeries Performed", icon: Eye, suffix: "+" },
                    { end: 50, label: "Students Graduated", icon: GraduationCap, suffix: "+" },
                    { end: 15, label: "Partner Organizations", icon: Users, suffix: "+" },
                  ].map((item, i) => (
                    <ImpactCounter key={i} {...item} />
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ DIAGONAL DIVIDER ═══════ */}
      <div className="h-12 bg-gradient-to-b from-[hsl(var(--primary)/0.1)] to-background" />

      {/* ═══════════ PROGRAMS & EVENTS ═══════════ */}
      <section className="py-14 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(var(--section-blue))] to-background" />

        <div className="relative z-10 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="mb-10 md:mb-16">
                <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-3 block">Programs & Events</span>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Training, Events &amp;{" "}
                  <span className="text-gradient">Community</span>
                </h2>
                <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
                  Beyond treatment — we train professionals, host awareness events,
                  and build a community of care.
                </p>
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
              {content.programs.map((p, i) => (
                <Reveal key={i} delay={i * 0.15} direction="up">
                  <div className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-background border border-border">
                    <div className="relative h-52 md:h-56 overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                      <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-bold">
                        <Clock size={12} />
                        {p.duration}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.desc}</p>
                      <Link to="/about" className="inline-flex items-center gap-1.5 text-secondary font-semibold text-sm group-hover:gap-2.5 transition-all">
                        Learn More <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ GALLERY — PROPER BENTO GRID ═══════════ */}
      <section className="py-14 md:py-24 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(hsl(var(--secondary)) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="relative z-10 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="mb-10 md:mb-16 md:text-center">
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                  See Our <span className="text-secondary">Work</span> in Action
                </h2>
                <p className="text-primary-foreground/50 text-base md:text-lg max-w-2xl md:mx-auto">
                  A glimpse into our facilities, rehabilitation programs, and the lives we're changing.
                </p>
              </div>
            </Reveal>

            {/* Mobile: 2 large images + view more */}
            <div className="md:hidden grid grid-cols-1 gap-4">
              {content.homeGalleryImages.slice(0, 2).map((img, i) => (
                <Reveal key={i} delay={i * 0.1} direction="scale">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden">
                    <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                </Reveal>
              ))}
              <Link to="/about" className="inline-flex items-center justify-center gap-2 text-secondary font-semibold py-3">
                View Full Gallery <ArrowRight size={16} />
              </Link>
            </div>

            {/* Desktop: bento grid with proper spans */}
            <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 gap-4">
              {content.homeGalleryImages.map((img, i) => {
                const classNames = ["col-span-2 row-span-2", "", "", "col-span-2"];
                return (
                <Reveal key={i} delay={i * 0.08} direction="scale" className={classNames[i] || ""}>
                  <div className="w-full h-full min-h-[200px] rounded-2xl overflow-hidden group relative">
                    <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-500 flex items-center justify-center">
                      <Eye size={32} className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                    </div>
                  </div>
                </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS — SINGLE FEATURED ═══════════ */}
      <section className="py-14 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/5 blur-[120px]" />

        <div className="relative z-10 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-10 md:mb-14">
                Voices of{" "}
                <span className="text-gradient">Hope</span>
              </h2>
            </Reveal>

            <div className="relative">
              <div className="p-8 md:p-14 rounded-3xl bg-card border border-border shadow-xl">
                <Quote size={48} className="mx-auto text-secondary/20 mb-6" />

                <p className="text-foreground text-lg md:text-2xl leading-relaxed italic mb-8 max-w-2xl mx-auto">
                  "{t.text}"
                </p>

                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">
                    {t.initials}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-lg">{t.name}</p>
                    <p className="text-muted-foreground text-sm">{t.role}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={18} className="fill-secondary text-secondary" />
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setTestimonialIdx((testimonialIdx - 1 + testimonials.length) % testimonials.length)}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialIdx(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${i === testimonialIdx ? "bg-secondary w-8" : "bg-border hover:bg-muted-foreground"}`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                  <button
                    onClick={() => setTestimonialIdx((testimonialIdx + 1) % testimonials.length)}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ MEET THE DIRECTOR — DARK BLUE ═══════════ */}
      <section className="relative py-16 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(213 86% 8%), hsl(213 60% 16%), hsl(213 86% 12%))' }}>
        {/* Decorative glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary/8 blur-[150px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] translate-y-1/3 -translate-x-1/4" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(hsl(var(--secondary)) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative z-10 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
              <Reveal direction="left" className="md:col-span-2">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-br from-secondary/30 via-primary/20 to-secondary/10 rounded-3xl blur-md group-hover:blur-lg transition-all duration-700" />
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                    <img src={content.homeProfImage} alt="Prof. Adedayo Adio" className="w-full h-[320px] md:h-[420px] object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(213,86%,8%)/0.6] to-transparent" />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-xl shadow-secondary/30 ring-4 ring-[hsl(213,86%,8%)]">
                    <Award size={28} className="text-secondary-foreground" />
                  </div>
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.2} className="md:col-span-3">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest mb-4">
                  <Sparkles size={12} /> Leadership
                </span>
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
                  Prof. Adedayo Omobolanle Adio
                </h2>
                <p className="text-secondary font-semibold text-base md:text-lg mb-5">Medical Director & Founder</p>
                <p className="text-white/60 leading-relaxed mb-3 text-sm md:text-base">
                  A world-class pediatric ophthalmologist, Professor of Ophthalmology at the University
                  of Port Harcourt, and current Chairperson of Nigerian Pediatric Ophthalmologists (NIPOSS).
                </p>
                <p className="text-white/60 leading-relaxed mb-5 text-sm md:text-base">
                  With specialized training from the LV Prasad Eye Institute in India and decades of clinical
                  experience, Prof. Adio brings unmatched expertise in pediatric eye care and low vision rehabilitation.
                </p>

                {/* Contact */}
                <a href="mailto:drdayoadio@yahoo.com" className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 text-sm font-medium mb-5 transition-colors">
                  <Mail size={16} /> drdayoadio@yahoo.com
                </a>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {["Pediatric Ophthalmology", "Neuro-Ophthalmology", "Low Vision", "ROP Screening"].map((tag) => (
                    <span key={tag} className="px-3 py-1.5 rounded-full bg-white/5 text-white/70 text-xs font-medium border border-white/10 hover:bg-white/10 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Publications */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-3">Publications & Research</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Adio+A&cauthor_id=26351577" },
                      { label: "ResearchGate", url: "https://www.researchgate.net/profile/Adedayo_Adio7" },
                      { label: "African Journals Online", url: "https://www.ajol.info/index.php/njo/search/search?query=&authors=Adedayo+Adio" },
                      { label: "Published Book", url: "https://www.morebooks.shop/store/gb/book/handbook-for-pediatric-ophthalmic-counselling-for-developing-countries/isbn/978-3-659-94673-8" },
                    ].map((link) => (
                      <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs font-medium hover:bg-secondary/15 hover:text-secondary hover:border-secondary/30 transition-all">
                        <ExternalLink size={12} /> {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="py-14 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-[hsl(var(--section-warm))]" />
        <div className="relative z-10 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="md:text-center mb-10 md:mb-16">
                <span className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3 block">Why TLEC</span>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Why Families <span className="text-gradient">Trust Us</span>
                </h2>
                <p className="text-muted-foreground text-base md:text-lg max-w-2xl md:mx-auto">
                  We combine world-class expertise with deep compassion to deliver care that truly changes lives.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Award, title: "World-Class Expertise", desc: "Led by a fellowship-trained pediatric ophthalmologist with international credentials and decades of experience.", gradient: "from-primary to-primary/60" },
                { icon: Heart, title: "Holistic Rehabilitation", desc: "Beyond medical treatment — we provide orientation, mobility training, crafts, and life skills for full independence.", gradient: "from-secondary to-secondary/60" },
                { icon: Users, title: "Community-Centered", desc: "We build support networks for patients and families, ensuring no one faces visual impairment alone.", gradient: "from-accent to-accent/60" },
                { icon: GraduationCap, title: "Training the Next Generation", desc: "Our intensive courses equip eye care professionals across Nigeria with critical low vision and rehabilitation skills.", gradient: "from-primary to-secondary" },
                { icon: Shield, title: "Trusted Since 2015", desc: "Nearly a decade of consistent, reliable care — earning the trust of hundreds of families across the country.", gradient: "from-secondary to-primary" },
                { icon: Activity, title: "End-to-End Care", desc: "From initial diagnosis through surgery and rehabilitation — a complete continuum of care under one roof.", gradient: "from-accent to-primary" },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.08} direction="up">
                  <div className="group relative p-7 md:p-8 rounded-2xl bg-background border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon size={22} className="text-white" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ PARTNER LOGOS / TRUST STRIP ═══════════ */}
      <section className="py-10 md:py-14 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(213 86% 8%), hsl(213 60% 14%))' }}>
        <div className="relative z-10 px-4 md:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto text-center">
            <Reveal>
              <p className="text-white/40 text-xs uppercase tracking-[0.25em] font-semibold mb-8">Affiliated & Recognized By</p>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
                {[
                  "University of Port Harcourt",
                  "LV Prasad Eye Institute",
                  "NIPOSS",
                  "West African College of Surgeons",
                ].map((name, i) => (
                  <span key={i} className="text-white/30 text-sm md:text-base font-heading font-semibold hover:text-white/60 transition-colors duration-300">
                    {name}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ VISIT US — MODERN ═══════════ */}
      <section className="relative py-14 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-[hsl(var(--section-blue))]" />

        <div className="relative z-10 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="mb-10 md:mb-14">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary mb-3 block">Get in Touch</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Visit Us Today</h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-4 md:gap-5">
              {[
                {
                  icon: MapPin,
                  title: "Location",
                  lines: ["1 & 2 Amba Drive, Off Christ Chapel Ave", "Eleme Junction, Port Harcourt", "Rivers State, Nigeria"],
                  accent: "from-primary to-primary/70",
                },
                {
                  icon: Clock,
                  title: "Clinic Hours",
                  lines: ["Mon – Fri: 8:00 AM – 5:00 PM", "Saturday: 8:00 AM – 2:00 PM", "Low Vision Clinic: Fridays 9 AM"],
                  accent: "from-secondary to-secondary/70",
                },
                {
                  icon: Phone,
                  title: "Contact",
                  lines: ["+234 803 310 8139", "+234 805 502 7740", "tlecrehab@gmail.com"],
                  accent: "from-accent to-accent/70",
                },
              ].map((card, i) => (
                <Reveal key={i} delay={i * 0.1} direction="up">
                  <div className="group relative rounded-2xl bg-card border border-border overflow-hidden hover:shadow-lg transition-all duration-500">
                    {/* Gradient top bar */}
                    <div className={`h-1 bg-gradient-to-r ${card.accent}`} />
                    <div className="p-6 md:p-7">
                      <div className="flex items-center gap-3 mb-4">
                        <card.icon size={20} className="text-muted-foreground" />
                        <h3 className="font-heading text-base font-bold text-foreground">{card.title}</h3>
                      </div>
                      <div className="space-y-2 pl-8">
                        {card.lines.map((line, j) => (
                          <p key={j} className="text-muted-foreground text-sm leading-relaxed">{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[hsl(213,86%,25%)] to-secondary" />
        <div className="absolute top-10 right-[10%] w-80 h-80 rounded-full bg-secondary/20 blur-[100px] animate-float" />
        <div className="absolute bottom-10 left-[5%] w-60 h-60 rounded-full bg-accent/15 blur-[80px] animate-float" style={{ animationDelay: "2s" }} />

        <div className="relative z-10 px-4 md:px-8 lg:px-16 text-center">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-5 leading-[1.1]">
                Help Us Restore{" "}
                <span className="text-secondary">Sight</span>{" "}
                and{" "}
                <span className="text-accent">Hope</span>
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-primary-foreground/70 text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                Your donation funds rehabilitation programs, eye surgeries, and professional
                training that transforms lives across Nigeria.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  to="/donate"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-bold rounded-xl hover:bg-accent/90 transition-all shadow-2xl shadow-accent/30 text-lg animate-pulse-glow"
                >
                  <Heart size={20} className="group-hover:scale-110 transition-transform" />
                  Donate Now
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary-foreground/25 text-primary-foreground font-bold rounded-xl hover:bg-primary-foreground/10 backdrop-blur-sm transition-all text-lg"
                >
                  Volunteer With Us
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ───── Impact Counter Sub-component ───── */
const ImpactCounter = ({ end, label, icon: Icon, suffix }: { end: number; label: string; icon: React.ElementType; suffix: string }) => {
  const { count, ref } = useCountUp(end, 2000);
  return (
    <div ref={ref} className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-5 text-center hover:bg-primary-foreground/15 transition-all duration-300">
      <Icon size={22} className="mx-auto mb-2 text-secondary" />
      <p className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground">{count}{suffix}</p>
      <p className="text-primary-foreground/60 text-xs mt-1 uppercase tracking-wider">{label}</p>
    </div>
  );
};

export default Index;
