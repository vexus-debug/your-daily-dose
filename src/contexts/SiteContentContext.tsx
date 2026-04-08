import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { loadSiteContent, saveSiteContentKey } from "@/lib/supabase-content";

// Image imports for defaults
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import hero6 from "@/assets/hero-6.jpg";
import hero7 from "@/assets/hero-7.jpg";
import hero8 from "@/assets/hero-8.jpg";
import hero9 from "@/assets/hero-9.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";
import gallery11 from "@/assets/gallery-11.jpg";
import gallery12 from "@/assets/gallery-12.jpg";
import gallery13 from "@/assets/gallery-13.jpg";
import gallery14 from "@/assets/gallery-14.jpg";
import gallery15 from "@/assets/gallery-15.jpg";
import profAdedayo from "@/assets/prof-adedayo.jpg";

// All editable site content in one place
export interface HeroSlide {
  tag: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaTo: string;
  image: string;
}

export interface Stat {
  value: number;
  label: string;
  suffix: string;
  isYear?: boolean;
}

export interface Service {
  title: string;
  desc: string;
  color: "primary" | "secondary" | "accent";
}

export interface JourneyStep {
  step: string;
  title: string;
  desc: string;
}

export interface Testimonial {
  text: string;
  name: string;
  role: string;
  initials: string;
}

export interface ProgramItem {
  title: string;
  desc: string;
  duration: string;
  image: string;
}

export interface BlogPost {
  date: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
}

export interface DonateWay {
  title: string;
  desc: string;
}

export interface ContactInfo {
  address: string[];
  phones: string[];
  emails: string[];
  hours: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  span?: string;
}

export interface MilestoneItem {
  year: string;
  title: string;
  desc: string;
  image: string;
}

export interface SiteContent {
  // Global
  whatsappNumber: string;
  socials: SocialLink[];
  contactInfo: ContactInfo;

  // Home page
  heroSlides: HeroSlide[];
  stats: Stat[];
  aboutSection: { subtitle: string; title: string; description: string; description2: string };
  services: Service[];
  journeySteps: JourneyStep[];
  testimonials: Testimonial[];
  programs: ProgramItem[];
  impactStats: { value: number; label: string; suffix: string }[];
  whyChooseUs: { title: string; desc: string }[];
  partners: string[];
  visitCards: { title: string; lines: string[] }[];
  finalCta: { title: string; description: string };

  // Home page images
  homeAboutBgImage: string;
  homeImpactBgImage: string;
  homeGalleryImages: string[];
  homeProfImage: string;

  // About page
  aboutHero: { tag: string; title: string; subtitle: string };
  aboutHeroImage: string;
  aboutOrigin: { title: string; paragraphs: string[] };
  aboutOriginImages: string[];
  milestones: MilestoneItem[];
  directorBio: { name: string; role: string; email: string; paragraphs: string[]; specialties: string[] };
  directorImage: string;
  values: { title: string; desc: string }[];
  boardSection: { title: string; paragraphs: string[] };
  aboutBottomImages: string[];

  // Eye Clinic page
  clinicHero: { tag: string; title: string; subtitle: string };
  clinicHeroImage: string;
  clinicMission: string;
  clinicAbout: { subtitle: string; title: string; paragraphs: string[] };
  clinicAboutImage: string;
  clinicServices: { title: string; description: string }[];
  surgicalStats: { label: string; value: string }[];
  clinicHours: { day: string; time: string }[];
  clinicCta: { title: string; description: string };
  clinicImages: string[];

  // Blog page
  blogHero: { subtitle: string; title: string; description: string };
  blogPosts: BlogPost[];

  // Donate page
  donateHero: { subtitle: string; title: string; description: string };
  donateWhy: { title: string; paragraphs: string[] };
  donateWays: DonateWay[];
  donateCta: { title: string; description: string; email: string; phone: string };
  donateImage: string;

  // Contact page
  contactHero: { subtitle: string; title: string; description: string };

  // Gallery page
  galleryHero: { tag: string; title: string; subtitle: string };
  galleryImages: GalleryImage[];

  // Footer
  footerCta: string;
  footerBrand: { name: string; tagline: string; description: string };
  footerCopyright: string;

  // Navbar
  navBrand: { name: string; tagline: string };
}

const defaultContent: SiteContent = {
  whatsappNumber: "",
  socials: [
    { platform: "Facebook", url: "https://facebook.com/TLECrehabnig" },
    { platform: "Twitter", url: "https://twitter.com/tlecrehab" },
    { platform: "Instagram", url: "https://instagram.com/tlec_rehab" },
    { platform: "Youtube", url: "#" },
  ],
  contactInfo: {
    address: ["1 & 2 Amba Drive, Off Christ Chapel Ave,", "Off Igbo-Etche Road, Eleme Junction,", "Port Harcourt, Rivers State, Nigeria"],
    phones: ["+234 803 310 8139", "+234 805 502 7740"],
    emails: ["tlecrehab@gmail.com", "tleyec@gmail.com"],
    hours: ["Mon-Fri: 8AM – 5PM", "Sat: 8AM – 2PM", "Sun: Closed"],
  },
  heroSlides: [
    { tag: "Since 2015", title: "TLEC (Re)Hab Foundation", subtitle: "World-class eye care with compassionate long-term support for the visually impaired.", ctaLabel: "Our Services", ctaTo: "/eye-clinic", image: hero5 },
    { tag: "Professional Training", title: "Training Eye Care Professionals", subtitle: "Equipping eye care workers across Nigeria with world-class low vision skills.", ctaLabel: "Our Programs", ctaTo: "/eye-clinic", image: hero2 },
    { tag: "Comprehensive Care", title: "Building Brighter Futures", subtitle: "From pediatric ophthalmology to rehabilitation — every patient deserves to see clearly.", ctaLabel: "Visit The Clinic", ctaTo: "/eye-clinic", image: hero8 },
    { tag: "Make a Difference", title: "Every Person Deserves to See", subtitle: "Your support funds rehabilitation, surgeries, and training that transforms lives.", ctaLabel: "Donate Now", ctaTo: "/donate", image: hero1 },
    { tag: "Rehabilitation", title: "Independence Through Rehab", subtitle: "Orientation, mobility training, and life skills empowering blind individuals.", ctaLabel: "About Us", ctaTo: "/about", image: hero3 },
  ],
  stats: [
    { value: 2015, label: "Year Founded", suffix: "", isYear: true },
    { value: 1000, label: "Lives Touched", suffix: "+" },
    { value: 100, label: "Professionals Trained", suffix: "+" },
    { value: 8, label: "Years of Service", suffix: "+" },
  ],
  aboutSection: {
    subtitle: "Who We Are",
    title: "More Than Eye Care — A Lifeline",
    description: "The Lens (re)Habilitation Foundation for the Blind is a Nigerian non-profit that combines professional eye care with long-term rehabilitation and skills training.",
    description2: "Based in Port Harcourt, Rivers State, we operate both a full-service eye clinic and a rehabilitation center — providing medical treatment and life-skills training so the visually impaired can live independently and productively.",
  },
  services: [
    { title: "Low Vision Care", desc: "Advanced assessment and assistive technology to maximize remaining vision.", color: "secondary" },
    { title: "Pediatric Eye Care", desc: "Specialized treatment for children — including ROP screening for premature infants.", color: "primary" },
    { title: "Rehabilitation Programs", desc: "1-2 year orientation, mobility training, and daily living skills.", color: "accent" },
    { title: "Professional Training", desc: "Intensive courses equipping eye care professionals with world-class skills.", color: "secondary" },
    { title: "Neuro-Ophthalmology", desc: "Expert diagnosis and management of visual problems related to the nervous system.", color: "primary" },
    { title: "Counselling & Support", desc: "Emotional and psychological support for patients and families.", color: "accent" },
  ],
  journeySteps: [
    { step: "01", title: "Reach Out", desc: "Contact us by phone or visit our Port Harcourt center." },
    { step: "02", title: "Full Assessment", desc: "Thorough eye examinations using state-of-the-art equipment." },
    { step: "03", title: "Personalized Plan", desc: "A tailored treatment or rehabilitation program for you." },
    { step: "04", title: "New Independence", desc: "Gain independence and a brighter future through care." },
  ],
  testimonials: [
    { text: "TLEC gave my child a second chance at life. The team's dedication and expertise in pediatric eye care is truly remarkable.", name: "Mrs. Adaeze Nwosu", role: "Parent", initials: "AN" },
    { text: "The rehabilitation program transformed my life. I went from complete dependence to being able to navigate the world on my own.", name: "Emmanuel Okafor", role: "Graduate", initials: "EO" },
    { text: "The low vision intensive course was eye-opening. It equipped me with skills I now use daily in my practice across Nigeria.", name: "Dr. Funke Balogun", role: "Optometrist", initials: "FB" },
    { text: "From the counselling sessions to the mobility training, every aspect of the program showed genuine care for the whole person.", name: "Grace Ibe", role: "Patient", initials: "GI" },
  ],
  programs: [
    { title: "Low Vision Intensive Course", desc: "A professional development program for eye care workers — optometrists, ophthalmologists, and clinical staff.", duration: "5 Days", image: hero2 },
    { title: "Orientation & Mobility Training", desc: "Teaching blind individuals to navigate their environment safely and independently.", duration: "1-2 Years", image: hero6 },
    { title: "Seeing Is Believing Concert", desc: "Our annual fundraising musical event featuring top Nigerian artists to raise awareness and funds.", duration: "Annual Event", image: hero9 },
  ],
  impactStats: [
    { value: 500, label: "Patients Treated", suffix: "+" },
    { value: 200, label: "Surgeries Performed", suffix: "+" },
    { value: 50, label: "Students Graduated", suffix: "+" },
    { value: 15, label: "Partner Organizations", suffix: "+" },
  ],
  whyChooseUs: [
    { title: "World-Class Expertise", desc: "Led by a fellowship-trained pediatric ophthalmologist with international credentials and decades of experience." },
    { title: "Holistic Rehabilitation", desc: "Beyond medical treatment — we provide orientation, mobility training, crafts, and life skills for full independence." },
    { title: "Community-Centered", desc: "We build support networks for patients and families, ensuring no one faces visual impairment alone." },
    { title: "Training the Next Generation", desc: "Our intensive courses equip eye care professionals across Nigeria with critical low vision and rehabilitation skills." },
    { title: "Trusted Since 2015", desc: "Nearly a decade of consistent, reliable care — earning the trust of hundreds of families across the country." },
    { title: "End-to-End Care", desc: "From initial diagnosis through surgery and rehabilitation — a complete continuum of care under one roof." },
  ],
  partners: ["University of Port Harcourt", "LV Prasad Eye Institute", "NIPOSS", "West African College of Surgeons"],
  visitCards: [
    { title: "Location", lines: ["1 & 2 Amba Drive, Off Christ Chapel Ave", "Eleme Junction, Port Harcourt", "Rivers State, Nigeria"] },
    { title: "Clinic Hours", lines: ["Mon – Fri: 8:00 AM – 5:00 PM", "Saturday: 8:00 AM – 2:00 PM", "Low Vision Clinic: Fridays 9 AM"] },
    { title: "Contact", lines: ["+234 803 310 8139", "+234 805 502 7740", "tlecrehab@gmail.com"] },
  ],
  finalCta: { title: "Help Us Restore Sight and Hope", description: "Your donation funds rehabilitation programs, eye surgeries, and professional training that transforms lives across Nigeria." },
  homeAboutBgImage: hero4,
  homeImpactBgImage: hero1,
  homeGalleryImages: [hero4, hero6, hero7, hero9],
  homeProfImage: profAdedayo,
  aboutHero: { tag: "Our Story", title: "Restoring Sight, Rebuilding Lives", subtitle: "Since 2015, The Lens (re)Habilitation Foundation has combined world-class medical expertise with holistic rehabilitation — empowering blind and visually impaired Nigerians to live independently." },
  aboutHeroImage: hero4,
  aboutOrigin: {
    title: "Born from a Vision of Wholeness",
    paragraphs: [
      "Prof. Adedayo Adio — a fellowship-trained pediatric ophthalmologist — saw firsthand that medical treatment alone wasn't enough. Patients could receive surgery, but without rehabilitation, they remained dependent and isolated.",
      "So she created something different: a foundation that combines a full-service eye clinic with a comprehensive rehabilitation center — medical care and life skills under one roof.",
      "Today, TLEC's 1-2 year rehabilitation programs include orientation, mobility training, craftwork, counselling, and daily living skills — everything needed to live independently and productively.",
    ],
  },
  aboutOriginImages: [gallery3, gallery9],
  milestones: [
    { year: "2015", title: "Foundation Established", desc: "Prof. Adedayo Adio founded TLEC in Port Harcourt, Rivers State — recognizing that eye treatment alone was not enough.", image: hero5 },
    { year: "2016", title: "First Rehabilitation Cohort", desc: "Enrolled the first group of blind and visually impaired individuals for long-term orientation and mobility training.", image: gallery1 },
    { year: "2018", title: "Low Vision Clinic Opens", desc: "Launched a dedicated Friday low vision clinic — providing assessment, assistive devices, and personalized rehabilitation plans.", image: gallery5 },
    { year: "2020", title: "Professional Training Programs", desc: "Began the Low Vision Intensive Course — training optometrists and ophthalmologists from across Nigeria.", image: gallery11 },
    { year: "2022", title: "National Recognition", desc: "Prof. Adio became Chairperson of NIPOSS, elevating pediatric eye care across the country.", image: gallery13 },
    { year: "2024", title: "Expanding Impact", desc: "Over 1,000 lives touched, 100+ professionals trained, and a growing network of partners across West Africa.", image: gallery7 },
  ],
  directorBio: {
    name: "Prof. Adedayo Omobolanle Adio",
    role: "Medical Director & Founder",
    email: "drdayoadio@yahoo.com",
    paragraphs: [
      "A world-class pediatric ophthalmologist, Professor of Ophthalmology at the University of Port Harcourt, and current Chairperson of Nigerian Pediatric Ophthalmologists (NIPOSS).",
      "With specialized training from the LV Prasad Eye Institute in India and decades of clinical experience, Prof. Adio brings unmatched expertise in pediatric eye care and low vision rehabilitation.",
    ],
    specialties: ["Pediatric Ophthalmology", "Neuro-Ophthalmology", "Low Vision", "ROP Screening"],
  },
  directorImage: profAdedayo,
  values: [
    { title: "Compassion", desc: "Every patient is treated with dignity, empathy, and genuine care — regardless of background." },
    { title: "Excellence", desc: "World-class standards in eye care, rehabilitation, and professional training — no compromises." },
    { title: "Community", desc: "Building an inclusive society where visually impaired persons are seen, supported, and empowered." },
    { title: "Empowerment", desc: "Not just treating — equipping individuals with skills, confidence, and tools for true independence." },
  ],
  boardSection: {
    title: "Board of Trustees",
    paragraphs: [
      "Our board comprises distinguished community leaders, medical professionals, and philanthropists committed to expanding access to eye care and rehabilitation across Nigeria.",
      "Together, they ensure TLEC maintains the highest standards of governance, transparency, and impact — guiding our strategic direction while staying true to our founding mission.",
    ],
  },
  aboutBottomImages: [gallery1, gallery5, gallery3],
  clinicHero: { tag: "Medical Services", title: "The Lens Eye Clinic", subtitle: "Expert eye care from pediatric ophthalmology to advanced surgical procedures — restoring sight and transforming lives in Port Harcourt." },
  clinicHeroImage: hero8,
  clinicMission: "We believe every person deserves access to quality eye care — regardless of age, background, or ability to pay. That's the promise behind everything we do.",
  clinicAbout: {
    subtitle: "Our Story",
    title: "Comprehensive Eye Care, World-Class Expertise",
    paragraphs: [
      "The Lens Eye Clinic provides expert diagnosis and treatment for a wide range of eye conditions. Our team, led by Prof. Adedayo Adio — a fellowship-trained pediatric ophthalmologist — brings world-class expertise to Port Harcourt, Nigeria.",
      "We are equipped for both outpatient consultations and surgical procedures, including cataract extraction, strabismus correction, ptosis repair, and ROP screening for premature newborns.",
      "From the very first consultation to post-operative care, every step is guided by compassion, precision, and a commitment to restoring the gift of sight.",
    ],
  },
  clinicAboutImage: gallery2,
  clinicServices: [
    { title: "Pediatric Eye Care", description: "Specialized diagnosis and treatment for children from infancy through adolescence — including congenital conditions, strabismus, and amblyopia." },
    { title: "Cataract & Glaucoma", description: "Advanced surgical and medical management restoring clarity and preserving vision." },
    { title: "Low Vision Assessment", description: "Comprehensive evaluation and optical aids to maximize remaining vision for daily independence." },
    { title: "Neuro-Ophthalmology", description: "Diagnosis and management of vision problems related to the nervous system." },
    { title: "Strabismus & Ptosis Surgery", description: "Corrective surgery for misaligned eyes and drooping eyelids with precision techniques." },
    { title: "ROP Screening", description: "Early detection of Retinopathy of Prematurity in premature newborns — saving sight from day one." },
  ],
  surgicalStats: [
    { label: "Surgeries Performed", value: "5,000+" },
    { label: "Success Rate", value: "98%" },
    { label: "Patients Served", value: "15,000+" },
  ],
  clinicHours: [
    { day: "Monday — Friday", time: "8:00 AM – 5:00 PM" },
    { day: "Saturday", time: "8:00 AM – 2:00 PM" },
    { day: "Sunday", time: "Closed" },
    { day: "Low Vision Clinic", time: "Fridays, 9:00 AM" },
  ],
  clinicCta: { title: "Your Vision Is Our Mission", description: "Whether you need a routine check-up or specialized surgery, The Lens Eye Clinic is here to help you see the world clearly." },
  clinicImages: [gallery4, gallery6, gallery11, gallery13, gallery14, profAdedayo],
  blogHero: { subtitle: "Our Stories", title: "Blog & News", description: "Updates, stories, and insights from the work of TLEC (Re)Hab Foundation." },
  blogPosts: [
    { date: "March 15, 2026", title: "TLEC Team Celebrates Another Year of Impact", excerpt: "Our dedicated team reflects on a year of restoring sight and independence to hundreds of visually impaired Nigerians across Rivers State.", category: "News", image: hero5 },
    { date: "February 8, 2026", title: "Low Vision Intensive Course: 2-Week Training Program", excerpt: "Eye care professionals gather at the Olayiwola Omoni Seminar Room for an intensive course on the management of low vision.", category: "Training", image: hero2 },
    { date: "January 20, 2026", title: "Graduation Day: Students Complete Rehabilitation Program", excerpt: "Six students celebrate the completion of their rehabilitation program, equipped with new skills in orientation, mobility, and independence.", category: "Events", image: hero6 },
  ],
  donateHero: { subtitle: "Support Our Work", title: "Donate", description: "Every contribution helps restore sight and independence to someone in need." },
  donateWhy: {
    title: "Why Your Support Matters",
    paragraphs: [
      "The Lens (re)Habilitation Foundation for the Blind is a non-profit organization that relies on the generosity of individuals and organizations to continue its life-changing work.",
      "Your donation helps fund: rehabilitation programs for the blind, pediatric eye surgeries, low vision aids and equipment, professional training courses, and community outreach programs.",
      "Together, we can ensure that no visually impaired Nigerian is left without hope or the skills to live independently.",
    ],
  },
  donateWays: [
    { title: "Make a Donation", desc: "Your financial contribution directly funds rehabilitation programs, eye surgeries, and equipment for blind patients." },
    { title: "Volunteer Your Time", desc: "Share your skills and time with our rehabilitation center — from teaching to administrative support." },
    { title: "Sponsor a Person", desc: "Sponsor the full rehabilitation of a visually impaired individual through our 1-2 year program." },
    { title: "Partner With Us", desc: "Organizations and businesses can partner with TLEC for greater impact through corporate social responsibility." },
  ],
  donateCta: { title: "Ready to Make a Difference?", description: "Contact us to arrange your donation or sponsorship. We accept contributions via bank transfer and Paystack.", email: "tlecrehab@gmail.com", phone: "+2348033108139" },
  donateImage: hero3,
  contactHero: { subtitle: "Get in Touch", title: "Contact Us", description: "We'd love to hear from you. Reach out for inquiries, appointments, or partnership opportunities." },
  galleryHero: { tag: "Our Gallery", title: "Moments That Matter", subtitle: "A visual journey through our work — from outreach screenings and clinic consultations to rehabilitation milestones and community impact." },
  galleryImages: [
    { src: gallery5, alt: "TLEC team with Free Eye Screening banner", category: "Outreach", span: "md:col-span-2 md:row-span-2" },
    { src: gallery2, alt: "Prof. Adio consulting with patients at TLEC clinic", category: "Clinic" },
    { src: gallery1, alt: "Scholarship recipients with certificates", category: "Rehabilitation" },
    { src: gallery4, alt: "Eye examination and patient consultation", category: "Clinic" },
    { src: gallery7, alt: "Free Eye Screening outreach team", category: "Outreach", span: "md:col-span-2" },
    { src: gallery3, alt: "TLEC staff at reception", category: "Facility" },
    { src: gallery6, alt: "Medical team conducting eye examinations", category: "Clinic" },
    { src: gallery8, alt: "Rehabilitation group session", category: "Rehabilitation", span: "md:col-span-2 md:row-span-2" },
    { src: hero1, alt: "Eye care and vision services", category: "Clinic" },
    { src: hero2, alt: "Community outreach program", category: "Outreach" },
    { src: gallery9, alt: "The Lens Eye Clinic building exterior", category: "Facility" },
    { src: gallery10, alt: "TLEC main facility building", category: "Facility", span: "md:col-span-2" },
    { src: hero3, alt: "Pediatric eye care services", category: "Clinic" },
    { src: hero4, alt: "Vision rehabilitation training", category: "Rehabilitation" },
    { src: hero5, alt: "Community eye health screening", category: "Outreach" },
    { src: hero6, alt: "Advanced eye diagnostics", category: "Clinic" },
    { src: hero7, alt: "Assistive technology training", category: "Rehabilitation" },
    { src: hero8, alt: "TLEC facility and equipment", category: "Facility" },
    { src: hero9, alt: "Team coordination meeting", category: "Outreach" },
    { src: gallery11, alt: "Pediatric eye examination — infant patient", category: "Clinic" },
    { src: gallery12, alt: "Workshop materials and training supplies", category: "Training" },
    { src: gallery13, alt: "Primary Eye Care workshop — Rivers State Health Board partnership", category: "Training", span: "md:col-span-2" },
    { src: gallery14, alt: "Training session — healthcare workers in classroom", category: "Training", span: "md:col-span-2" },
    { src: gallery15, alt: "Eye care training workshop participants", category: "Training" },
  ],
  footerCta: "Help us restore sight and hope — every donation makes a difference.",
  footerBrand: { name: "TLEC (Re)Hab", tagline: "Foundation for the Blind", description: "Combining professional eye care with long-term rehabilitation since 2015. Based in Port Harcourt, Rivers State, Nigeria." },
  footerCopyright: "The Lens (re)Habilitation Foundation for the Blind",
  navBrand: { name: "TLEC (Re)Hab", tagline: "Foundation for the Blind" },
};

// Keys used for DB storage - maps flat keys to content paths
const CONTENT_KEYS: (keyof SiteContent)[] = [
  "whatsappNumber", "socials", "contactInfo",
  "heroSlides", "stats", "aboutSection", "services", "journeySteps",
  "testimonials", "programs", "impactStats", "whyChooseUs", "partners",
  "visitCards", "finalCta",
  "homeAboutBgImage", "homeImpactBgImage", "homeGalleryImages", "homeProfImage",
  "aboutHero", "aboutHeroImage", "aboutOrigin", "aboutOriginImages",
  "milestones", "directorBio", "directorImage", "values", "boardSection", "aboutBottomImages",
  "clinicHero", "clinicHeroImage", "clinicMission", "clinicAbout", "clinicAboutImage",
  "clinicServices", "surgicalStats", "clinicHours", "clinicCta", "clinicImages",
  "blogHero", "blogPosts",
  "donateHero", "donateWhy", "donateWays", "donateCta", "donateImage",
  "contactHero",
  "galleryHero", "galleryImages",
  "footerCta", "footerBrand", "footerCopyright",
  "navBrand",
];

interface SiteContentContextType {
  content: SiteContent;
  loading: boolean;
  updateContent: (path: string, value: any) => void;
  updateNestedContent: (section: keyof SiteContent, index: number, field: string, value: any) => void;
  addToArray: (section: keyof SiteContent, item: any) => void;
  removeFromArray: (section: keyof SiteContent, index: number) => void;
  saveSection: (key: keyof SiteContent) => Promise<boolean>;
  saveMultipleSections: (keys: (keyof SiteContent)[]) => Promise<boolean>;
}

const SiteContentContext = createContext<SiteContentContextType | null>(null);

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  // Load content from DB on mount
  useEffect(() => {
    loadSiteContent().then((dbContent) => {
      if (dbContent) {
        setContent((prev) => {
          const merged = { ...prev };
          for (const key of CONTENT_KEYS) {
            if (dbContent[key] !== undefined) {
              (merged as any)[key] = dbContent[key];
            }
          }
          return merged;
        });
      }
      setLoading(false);
    });
  }, []);

  const updateContent = (path: string, value: any) => {
    setContent((prev) => {
      const keys = path.split(".");
      const newContent = { ...prev };
      let obj: any = newContent;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = Array.isArray(obj[keys[i]]) ? [...obj[keys[i]]] : { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return newContent;
    });
  };

  const updateNestedContent = (section: keyof SiteContent, index: number, field: string, value: any) => {
    setContent((prev) => {
      const arr = [...(prev[section] as any[])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [section]: arr };
    });
  };

  const addToArray = (section: keyof SiteContent, item: any) => {
    setContent((prev) => ({
      ...prev,
      [section]: [...(prev[section] as any[]), item],
    }));
  };

  const removeFromArray = (section: keyof SiteContent, index: number) => {
    setContent((prev) => ({
      ...prev,
      [section]: (prev[section] as any[]).filter((_: any, i: number) => i !== index),
    }));
  };

  const saveSection = useCallback(async (key: keyof SiteContent): Promise<boolean> => {
    return saveSiteContentKey(key, content[key]);
  }, [content]);

  const saveMultipleSections = useCallback(async (keys: (keyof SiteContent)[]): Promise<boolean> => {
    const promises = keys.map((key) => saveSiteContentKey(key, content[key]));
    const results = await Promise.all(promises);
    return results.every(Boolean);
  }, [content]);

  return (
    <SiteContentContext.Provider value={{ content, loading, updateContent, updateNestedContent, addToArray, removeFromArray, saveSection, saveMultipleSections }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error("useSiteContent must be used within SiteContentProvider");
  return ctx;
};
