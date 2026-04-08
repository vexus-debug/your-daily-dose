import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:tlecrehab@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`;
    window.open(mailto);
  };

  return (
    <div>
      <section className="relative py-20 bg-primary">
        <div className="container">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2">Get in Touch</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground">Contact Us</h1>
          <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl">
            We'd love to hear from you. Reach out for inquiries, appointments, or partnership opportunities.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {[
              { icon: MapPin, title: "Address", lines: ["1 & 2 Amba Drive, Off Christ Chapel Ave,", "Off Igbo-Etche Road, Eleme Junction,", "Port Harcourt, Rivers State, Nigeria"] },
              { icon: Phone, title: "Phone", lines: ["+234 803 310 8139", "+234 805 502 7740"] },
              { icon: Mail, title: "Email", lines: ["tlecrehab@gmail.com (Rehab)", "tleyec@gmail.com (Clinic)"] },
              { icon: Clock, title: "Hours", lines: ["Mon-Fri: 8AM – 5PM", "Sat: 8AM – 2PM", "Sun: Closed"] },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <item.icon size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  {item.lines.map((line, j) => (
                    <p key={j} className="text-muted-foreground text-sm">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-card border border-border space-y-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">Send a Message</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="section-blue py-16">
        <div className="container text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Find Us</h2>
          <p className="text-muted-foreground mb-6">1 & 2 Amba Drive, Off Christ Chapel Avenue, Eleme Junction, Port Harcourt, Rivers State</p>
          <div className="rounded-2xl overflow-hidden border border-border h-64 bg-muted flex items-center justify-center">
            <iframe
              title="TLEC Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.7!2d7.05!3d4.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNTEnMDAuMCJOIDfCsDAzJzAwLjAiRQ!5e0!3m2!1sen!2sng!4v1!5m2!1sen!2sng"
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
