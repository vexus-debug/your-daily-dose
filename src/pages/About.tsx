import { Link } from "react-router-dom";
import {
  Award,
  Target,
  Users,
  Heart,
  ArrowRight,
  GraduationCap,
  Globe,
  Sparkles,
  Mail,
  ExternalLink,
  Calendar,
  Eye,
  BookOpen,
  Shield,
  MapPin,
} from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-reveal";
import { useSiteContent } from "@/contexts/SiteContentContext";

const About = () => {
  const { content } = useSiteContent();
  return (
  <div className="overflow-hidden">
    {/* ═══════ CINEMATIC HERO ═══════ */}
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img src={content.aboutHeroImage} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-primary/45 md:bg-primary/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-primary/35 md:from-primary md:via-primary/78 md:to-primary/20" />
        <div className="absolute inset-y-0 left-0 right-0 md:right-[20%] bg-gradient-to-r from-primary/85 via-primary/60 to-transparent" />
      </div>

      <div className="relative z-10 px-4 md:px-8 lg:px-16 pb-16 md:pb-24 w-full">
        <div className="max-w-4xl">
          <Reveal direction="up" delay={0.1}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 border border-secondary/25 text-secondary text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles size={12} /> Our Story
            </span>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05]">
              Restoring Sight,<br />
              <span className="text-secondary">Rebuilding Lives</span>
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.3}>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed">
              Since 2015, The Lens (re)Habilitation Foundation has combined world-class medical expertise with holistic rehabilitation — empowering blind and visually impaired Nigerians to live independently.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1 h-3 rounded-full bg-secondary animate-bounce" />
        </div>
      </div>
    </section>

    {/* ═══════ THE ORIGIN — FLOWING NARRATIVE ═══════ */}
    <section className="relative py-20 md:py-32">
      <div className="absolute inset-0 bg-primary" />

      <div className="relative z-10 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal direction="left">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-secondary/20 to-primary/10 rounded-[2rem] blur-xl" />
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                  <img src={content.milestones[0]?.image} alt="TLEC Team at work" className="w-full aspect-[4/5] object-cover" />
                </div>
                {/* Floating stat */}
                <div className="absolute -bottom-6 -right-4 md:-right-8 bg-secondary text-secondary-foreground rounded-2xl px-6 py-4 shadow-xl shadow-secondary/30">
                  <p className="font-heading text-3xl font-bold">2015</p>
                  <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Est.</p>
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal direction="right" delay={0.1}>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground md:text-foreground mb-6 leading-tight">
                  Born from a <span className="text-secondary">Vision</span> of Wholeness
                </h2>
              </Reveal>

              <Reveal direction="right" delay={0.2}>
                <p className="text-primary-foreground/70 md:text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                  Prof. Adedayo Adio — a fellowship-trained pediatric ophthalmologist — saw firsthand that medical treatment alone wasn't enough. Patients could receive surgery, but without rehabilitation, they remained dependent and isolated.
                </p>
              </Reveal>

              <Reveal direction="right" delay={0.3}>
                <p className="text-primary-foreground/70 md:text-muted-foreground text-base leading-relaxed mb-5">
                  So she created something different: a foundation that combines a full-service <strong className="text-primary-foreground md:text-foreground">eye clinic</strong> with a comprehensive <strong className="text-primary-foreground md:text-foreground">rehabilitation center</strong> — medical care and life skills under one roof.
                </p>
              </Reveal>

              <Reveal direction="right" delay={0.4}>
                <p className="text-primary-foreground/70 md:text-muted-foreground text-base leading-relaxed mb-8">
                  Today, TLEC's 1-2 year rehabilitation programs include orientation, mobility training, craftwork, counselling, and daily living skills — everything needed to live independently and productively.
                </p>
              </Reveal>

              <Reveal direction="right" delay={0.5}>
                <div className="flex flex-wrap gap-3">
                  <Link to="/eye-clinic" className="group inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 text-sm">
                    Our Services <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 border border-primary-foreground/20 md:border-border text-primary-foreground md:text-foreground font-semibold rounded-xl hover:bg-primary-foreground/10 md:hover:bg-muted transition-all text-sm">
                    <Calendar size={16} /> Visit Us
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ═══════ DUAL MISSION — CLINIC + REHAB ═══════ */}
    <section className="relative py-16 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-[hsl(var(--section-blue,220_40%_96%))]" />

      <div className="relative z-10 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 md:mb-20">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Two Pillars, <span className="text-secondary">One Mission</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Medical excellence and holistic rehabilitation, working together.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Clinic */}
            <Reveal direction="left" delay={0.1}>
              <div className="group relative rounded-3xl overflow-hidden h-full">
                <div className="absolute inset-0">
                  <img src={content.aboutOriginImages[0] || ""} alt="The Lens Eye Clinic" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-primary/35" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-primary/30" />
                </div>
                <div className="relative z-10 p-8 md:p-10 flex flex-col justify-end min-h-[400px] md:min-h-[480px]">
                  <div className="w-14 h-14 rounded-2xl bg-primary-foreground/12 backdrop-blur-sm text-primary-foreground flex items-center justify-center mb-5 border border-primary-foreground/10">
                    <Eye size={28} />
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">The Lens Eye Clinic</h3>
                  <p className="text-white/90 leading-relaxed mb-4 max-w-xl">
                    Full-service ophthalmic care — pediatric eye exams, low vision assessment, neuro-ophthalmology, ROP screening, and surgical interventions. Equipped with modern diagnostic technology.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Pediatric Care", "Low Vision", "Surgery", "ROP Screening"].map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full bg-primary/45 text-primary-foreground text-xs font-medium border border-primary-foreground/10">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Rehab */}
            <Reveal direction="right" delay={0.2}>
              <div className="group relative rounded-3xl overflow-hidden h-full">
                <div className="absolute inset-0">
                  <img src={content.aboutOriginImages[1] || ""} alt="TLEC Rehabilitation Center" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-primary/35" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-primary/30" />
                </div>
                <div className="relative z-10 p-8 md:p-10 flex flex-col justify-end min-h-[400px] md:min-h-[480px]">
                  <div className="w-14 h-14 rounded-2xl bg-primary-foreground/12 backdrop-blur-sm text-secondary flex items-center justify-center mb-5 border border-primary-foreground/10">
                    <Heart size={28} />
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">TLEC (Re)Hab Center</h3>
                  <p className="text-white/90 leading-relaxed mb-4 max-w-xl">
                    Comprehensive 1-2 year rehabilitation programs including orientation, mobility training, craftwork, life skills, and counselling — equipping the visually impaired for full independence.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Mobility Training", "Life Skills", "Counselling", "Craftwork"].map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full bg-primary/45 text-primary-foreground text-xs font-medium border border-primary-foreground/10">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>

    {/* ═══════ TIMELINE JOURNEY ═══════ */}
    <section className="relative py-16 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(213 86% 8%), hsl(213 60% 14%), hsl(213 86% 10%))' }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(hsl(var(--secondary)) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 md:mb-20">
              <span className="text-secondary text-xs uppercase tracking-[0.25em] font-bold mb-4 block">Our Journey</span>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
                A Decade of <span className="text-secondary">Transformation</span>
              </h2>
              <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto">
                Key moments that shaped who we are today.
              </p>
            </div>
          </Reveal>

          {/* Timeline */}
          <div className="relative">
            {/* Center line — desktop only */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-secondary/50 via-secondary/20 to-transparent" />

            {content.milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <Reveal key={i} delay={i * 0.1} direction={isLeft ? "left" : "right"}>
                  <div className={`relative flex flex-col md:flex-row items-start mb-16 last:mb-0 ${isLeft ? "" : "md:flex-row-reverse"}`}>
                    {/* Content side */}
                    <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-0" : "md:pl-0"}`}>
                      <div className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/8 transition-all duration-500">
                        <div className="relative h-48 md:h-56 overflow-hidden">
                          <img src={m.image} alt={m.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/15" />
                          <span className="absolute bottom-4 left-4 font-heading text-4xl font-bold text-secondary">{m.year}</span>
                        </div>
                        <div className="p-6">
                          <h3 className="font-heading text-xl font-bold text-white mb-2">{m.title}</h3>
                          <p className="text-white/60 text-sm leading-relaxed">{m.desc}</p>
                        </div>
                      </div>
                    </div>

                    {/* Center node — desktop */}
                    <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 w-5 h-5 rounded-full bg-secondary shadow-lg shadow-secondary/40 ring-4 ring-[hsl(213,86%,10%)] z-10" />

                    {/* Spacer for other side */}
                    <div className="hidden md:block w-[calc(50%-2rem)]" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>

    {/* ═══════ MEDICAL DIRECTOR — FULL FEATURE ═══════ */}
    <section className="relative py-20 md:py-32 overflow-hidden bg-primary">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[200px]" />

      <div className="relative z-10 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest mb-4">
                <Sparkles size={12} /> Leadership
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground">
                The Visionary Behind <span className="text-secondary">TLEC</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-5 gap-10 md:gap-14 items-start">
            <Reveal direction="left" className="md:col-span-2">
              <div className="relative group sticky top-24">
                <div className="absolute -inset-3 bg-gradient-to-br from-secondary/25 via-primary/15 to-secondary/10 rounded-[2rem] blur-lg group-hover:blur-xl transition-all duration-700" />
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-border/20">
                  <img src={content.directorImage} alt="Prof. Adedayo Adio" className="w-full aspect-[3/4] object-cover object-top group-hover:scale-[1.03] transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-xl shadow-secondary/30 ring-4 ring-primary">
                  <Award size={32} className="text-secondary-foreground" />
                </div>
              </div>
            </Reveal>

            <div className="md:col-span-3">
              <Reveal direction="right" delay={0.1}>
                <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-1">
                  Prof. Adedayo Omobolanle Adio
                </h3>
                <p className="text-secondary font-semibold text-lg mb-2">Medical Director &amp; Founder</p>
                <a href="mailto:drdayoadio@yahoo.com" className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-secondary text-sm font-medium mb-6 transition-colors">
                  <Mail size={14} /> drdayoadio@yahoo.com
                </a>
              </Reveal>

              <Reveal direction="right" delay={0.2}>
                <div className="space-y-4 mb-6">
                  <p className="text-primary-foreground/70 leading-relaxed">
                    Prof. Adio graduated from the University of Ilorin Medical School in 1990 and holds qualifications from both the West African and Nigerian postgraduate medical colleges. She has subspecialty training in <strong className="text-primary-foreground">pediatric eye care</strong>, <strong className="text-primary-foreground">neuro-ophthalmology</strong>, and <strong className="text-primary-foreground">strabismus</strong>.
                  </p>
                  <p className="text-primary-foreground/70 leading-relaxed">
                    She is certified in low vision, rehabilitation, and ROP screening from the <strong className="text-primary-foreground">LV Prasad Eye Institute</strong> in India. She currently serves as Professor of Ophthalmology at the University of Port Harcourt and Chairperson of the <strong className="text-primary-foreground">Nigerian Pediatric Ophthalmologists Society (NIPOSS)</strong>.
                  </p>
                  <p className="text-primary-foreground/70 leading-relaxed">
                    Her book, <em className="text-primary-foreground font-medium">Handbook for Pediatric Ophthalmic Counselling for Developing Countries</em>, reflects her commitment to accessible eye care education across Africa.
                  </p>
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.3}>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Pediatric Ophthalmology", "Neuro-Ophthalmology", "Low Vision", "ROP Screening", "Strabismus"].map((tag) => (
                    <span key={tag} className="px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold border border-secondary/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.4}>
                <div className="p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10">
                  <p className="text-primary-foreground/60 text-xs uppercase tracking-widest font-semibold mb-4">Publications &amp; Research</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { label: "PubMed Publications", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Adio+A&cauthor_id=26351577", icon: BookOpen },
                      { label: "ResearchGate Profile", url: "https://www.researchgate.net/profile/Adedayo_Adio7", icon: Globe },
                      { label: "African Journals Online", url: "https://www.ajol.info/index.php/njo/search/search?query=&authors=Adedayo+Adio", icon: GraduationCap },
                      { label: "Published Book", url: "https://www.morebooks.shop/store/gb/book/handbook-for-pediatric-ophthalmic-counselling-for-developing-countries/isbn/978-3-659-94673-8", icon: BookOpen },
                    ].map((link) => (
                      <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 hover:border-secondary/30 hover:shadow-md transition-all">
                        <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                          <link.icon size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-primary-foreground truncate">{link.label}</p>
                          <p className="text-xs text-primary-foreground/50 flex items-center gap-1">View <ExternalLink size={10} /></p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ═══════ VALUES — MODERN CARDS ═══════ */}
    <section className="relative py-16 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-[hsl(var(--section-warm,35_60%_96%))]" />

      <div className="relative z-10 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                What We <span className="text-secondary">Stand For</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
                The principles that guide everything we do.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "Compassion", desc: "Every patient is treated with dignity, empathy, and genuine care — regardless of background.", gradient: "from-primary to-primary/60" },
              { icon: Target, title: "Excellence", desc: "World-class standards in eye care, rehabilitation, and professional training — no compromises.", gradient: "from-secondary to-secondary/60" },
              { icon: Users, title: "Community", desc: "Building an inclusive society where visually impaired persons are seen, supported, and empowered.", gradient: "from-accent to-accent/60" },
              { icon: Shield, title: "Empowerment", desc: "Not just treating — equipping individuals with skills, confidence, and tools for true independence.", gradient: "from-primary to-secondary" },
            ].map((v, i) => (
              <Reveal key={i} delay={i * 0.1} direction="up">
                <div className="group relative p-8 rounded-3xl bg-background border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <v.icon size={26} className="text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ═══════ BOARD + IMAGE MOSAIC ═══════ */}
    <section className="relative py-16 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(213 86% 8%), hsl(213 60% 14%))' }}>
      <div className="relative z-10 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <Reveal direction="left">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                    <img src={content.aboutBottomImages[0] || ""} alt="Board activities" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-square">
                    <img src={content.aboutBottomImages[1] || content.aboutOriginImages[0] || ""} alt="Community work" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
                <div className="space-y-3 pt-8">
                  <div className="rounded-2xl overflow-hidden aspect-square">
                    <img src={content.aboutBottomImages[2] || content.aboutOriginImages[1] || ""} alt="Training" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                    <img src={content.aboutOriginImages[0] || ""} alt="Eye clinic" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.2}>
              <div>
                <span className="text-secondary text-xs uppercase tracking-[0.25em] font-bold mb-4 block">Governance</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Board of Trustees
                </h2>
                <p className="text-white/60 leading-relaxed mb-5">
                  Our board comprises distinguished community leaders, medical professionals, and philanthropists committed to expanding access to eye care and rehabilitation across Nigeria.
                </p>
                <p className="text-white/60 leading-relaxed mb-8">
                  Together, they ensure TLEC maintains the highest standards of governance, transparency, and impact — guiding our strategic direction while staying true to our founding mission.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/contact" className="group inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 text-sm">
                    Get in Touch <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/donate" className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all text-sm">
                    <Heart size={16} /> Support Us
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>

    {/* ═══════ LOCATION CTA ═══════ */}
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-[hsl(213,86%,25%)] to-secondary" />
      <div className="absolute top-10 right-[10%] w-80 h-80 rounded-full bg-secondary/20 blur-[100px]" />

      <div className="relative z-10 px-4 md:px-8 lg:px-16 text-center">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <MapPin size={40} className="mx-auto text-secondary mb-6" />
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Visit Us in Port Harcourt
            </h2>
            <p className="text-primary-foreground/70 text-base md:text-lg mb-8">
              1 & 2 Amba Drive, Off Christ Chapel Avenue, Eleme Junction, Port Harcourt, Rivers State, Nigeria.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/contact" className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-bold rounded-xl hover:bg-accent/90 transition-all shadow-2xl shadow-accent/30">
                Contact Us <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/gallery" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary-foreground/25 text-primary-foreground font-bold rounded-xl hover:bg-primary-foreground/10 transition-all">
                View Gallery
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  </div>
  );
};

export default About;