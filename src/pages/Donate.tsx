import { useSiteContent } from "@/contexts/SiteContentContext";
import { Heart, Users, Gift, Handshake } from "lucide-react";

const ways = [
  { icon: Heart, title: "Make a Donation", desc: "Your financial contribution directly funds rehabilitation programs, eye surgeries, and equipment for blind patients." },
  { icon: Users, title: "Volunteer Your Time", desc: "Share your skills and time with our rehabilitation center — from teaching to administrative support." },
  { icon: Gift, title: "Sponsor a Person", desc: "Sponsor the full rehabilitation of a visually impaired individual through our 1-2 year program." },
  { icon: Handshake, title: "Partner With Us", desc: "Organizations and businesses can partner with TLEC for greater impact through corporate social responsibility." },
];

const Donate = () => {
  const { content } = useSiteContent();
  return (
    <div>
      <section className="relative py-20 bg-primary">
        <div className="container">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2">Support Our Work</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground">Donate</h1>
          <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl">
            Every contribution helps restore sight and independence to someone in need.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Why Your Support Matters</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Lens (re)Habilitation Foundation for the Blind is a non-profit organization that relies on the generosity of individuals and organizations to continue its life-changing work.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your donation helps fund: rehabilitation programs for the blind, pediatric eye surgeries, low vision aids and equipment, professional training courses, and community outreach programs.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Together, we can ensure that no visually impaired Nigerian is left without hope or the skills to live independently.
            </p>
          </div>
          <img src={content.donateImage} alt="TLEC beneficiary" className="rounded-2xl shadow-xl w-full" />
        </div>
      </section>

      <section className="section-warm py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Ways to Help</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {ways.map((w, i) => (
              <div key={i} className="flex gap-5 p-8 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <w.icon size={28} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{w.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-2xl text-center">
          <div className="p-12 rounded-3xl bg-primary">
            <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-4">Ready to Make a Difference?</h2>
            <p className="text-primary-foreground/80 mb-8">
              Contact us to arrange your donation or sponsorship. We accept contributions via bank transfer and Paystack.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:tlecrehab@gmail.com" className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
                Email to Donate
              </a>
              <a href="tel:+2348033108139" className="px-8 py-3 border-2 border-primary-foreground/30 text-primary-foreground font-semibold rounded-lg hover:bg-primary-foreground/10 transition-colors">
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;
