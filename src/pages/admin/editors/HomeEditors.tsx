import { useSiteContent } from "@/contexts/SiteContentContext";
import { AdminSection, FormCard, TextInput, TextArea, SaveButton, ItemCard, ImageInput, AddButton } from "../components/AdminFormComponents";
import { toast } from "sonner";
import { SiteContent } from "@/contexts/SiteContentContext";

// Helper to create a save handler for given keys
const useSave = (keys: (keyof SiteContent)[]) => {
  const { saveMultipleSections } = useSiteContent();
  return async () => {
    const ok = await saveMultipleSections(keys);
    if (ok) toast.success("Saved successfully!");
    else toast.error("Failed to save. Please try again.");
  };
};

// Home: Hero Slider
export const HomeHeroEditor = () => {
  const { content, updateNestedContent, addToArray, removeFromArray } = useSiteContent();
  const save = useSave(["heroSlides"]);
  return (
    <AdminSection title="Hero Slider" description="Edit the homepage hero slider slides — text and images.">
      {content.heroSlides.map((slide, i) => (
        <ItemCard key={i} index={i} onRemove={content.heroSlides.length > 1 ? () => removeFromArray("heroSlides", i) : undefined}>
          <ImageInput label="Slide Image" value={slide.image} onChange={(v) => updateNestedContent("heroSlides", i, "image", v)} onRemove={() => updateNestedContent("heroSlides", i, "image", "")} />
          <TextInput label="Tag" value={slide.tag} onChange={(v) => updateNestedContent("heroSlides", i, "tag", v)} />
          <TextInput label="Title" value={slide.title} onChange={(v) => updateNestedContent("heroSlides", i, "title", v)} />
          <TextArea label="Subtitle" value={slide.subtitle} onChange={(v) => updateNestedContent("heroSlides", i, "subtitle", v)} />
          <div className="grid grid-cols-2 gap-3">
            <TextInput label="CTA Label" value={slide.ctaLabel} onChange={(v) => updateNestedContent("heroSlides", i, "ctaLabel", v)} />
            <TextInput label="CTA Link" value={slide.ctaTo} onChange={(v) => updateNestedContent("heroSlides", i, "ctaTo", v)} />
          </div>
        </ItemCard>
      ))}
      <AddButton label="Add Slide" onClick={() => addToArray("heroSlides", { tag: "", title: "", subtitle: "", ctaLabel: "", ctaTo: "/", image: "" })} />
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

// Home: Stats
export const HomeStatsEditor = () => {
  const { content, updateNestedContent } = useSiteContent();
  const save = useSave(["stats"]);
  return (
    <AdminSection title="Stats Ribbon" description="Edit the floating stats below the hero.">
      {content.stats.map((stat, i) => (
        <FormCard key={i} title={`Stat #${i + 1}`}>
          <div className="grid grid-cols-2 gap-3">
            <TextInput label="Label" value={stat.label} onChange={(v) => updateNestedContent("stats", i, "label", v)} />
            <TextInput label="Suffix" value={stat.suffix} onChange={(v) => updateNestedContent("stats", i, "suffix", v)} />
          </div>
        </FormCard>
      ))}
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

// Home: About Section
export const HomeAboutEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["aboutSection", "homeAboutBgImage"]);
  const s = content.aboutSection;
  return (
    <AdminSection title="About Section" description="The 'Who We Are' section on the homepage.">
      <FormCard>
        <ImageInput label="Background Image" value={content.homeAboutBgImage} onChange={(v) => updateContent("homeAboutBgImage", v)} onRemove={() => updateContent("homeAboutBgImage", "")} />
        <TextInput label="Subtitle" value={s.subtitle} onChange={(v) => updateContent("aboutSection.subtitle", v)} />
        <TextInput label="Title" value={s.title} onChange={(v) => updateContent("aboutSection.title", v)} />
        <TextArea label="Description" value={s.description} onChange={(v) => updateContent("aboutSection.description", v)} />
        <TextArea label="Description 2" value={s.description2} onChange={(v) => updateContent("aboutSection.description2", v)} />
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

// Home: Services
export const HomeServicesEditor = () => {
  const { content, updateNestedContent } = useSiteContent();
  const save = useSave(["services"]);
  return (
    <AdminSection title="Services" description="Edit the services listed on the homepage.">
      {content.services.map((svc, i) => (
        <ItemCard key={i} index={i}>
          <TextInput label="Title" value={svc.title} onChange={(v) => updateNestedContent("services", i, "title", v)} />
          <TextArea label="Description" value={svc.desc} onChange={(v) => updateNestedContent("services", i, "desc", v)} rows={2} />
        </ItemCard>
      ))}
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

// Home: Journey
export const HomeJourneyEditor = () => {
  const { content, updateNestedContent } = useSiteContent();
  const save = useSave(["journeySteps"]);
  return (
    <AdminSection title="Journey Steps" description="The 'From First Visit to New Sight' timeline.">
      {content.journeySteps.map((step, i) => (
        <ItemCard key={i} index={i}>
          <div className="grid grid-cols-2 gap-3">
            <TextInput label="Step" value={step.step} onChange={(v) => updateNestedContent("journeySteps", i, "step", v)} />
            <TextInput label="Title" value={step.title} onChange={(v) => updateNestedContent("journeySteps", i, "title", v)} />
          </div>
          <TextArea label="Description" value={step.desc} onChange={(v) => updateNestedContent("journeySteps", i, "desc", v)} rows={2} />
        </ItemCard>
      ))}
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

// Home: Testimonials
export const HomeTestimonialsEditor = () => {
  const { content, updateNestedContent } = useSiteContent();
  const save = useSave(["testimonials"]);
  return (
    <AdminSection title="Testimonials" description="Edit testimonial quotes.">
      {content.testimonials.map((t, i) => (
        <ItemCard key={i} index={i}>
          <TextArea label="Quote" value={t.text} onChange={(v) => updateNestedContent("testimonials", i, "text", v)} />
          <div className="grid grid-cols-3 gap-3">
            <TextInput label="Name" value={t.name} onChange={(v) => updateNestedContent("testimonials", i, "name", v)} />
            <TextInput label="Role" value={t.role} onChange={(v) => updateNestedContent("testimonials", i, "role", v)} />
            <TextInput label="Initials" value={t.initials} onChange={(v) => updateNestedContent("testimonials", i, "initials", v)} />
          </div>
        </ItemCard>
      ))}
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

// Home: Programs
export const HomeProgramsEditor = () => {
  const { content, updateNestedContent } = useSiteContent();
  const save = useSave(["programs"]);
  return (
    <AdminSection title="Programs & Events" description="Featured programs on the homepage.">
      {content.programs.map((p, i) => (
        <ItemCard key={i} index={i}>
          <ImageInput label="Program Image" value={p.image} onChange={(v) => updateNestedContent("programs", i, "image", v)} onRemove={() => updateNestedContent("programs", i, "image", "")} />
          <TextInput label="Title" value={p.title} onChange={(v) => updateNestedContent("programs", i, "title", v)} />
          <TextArea label="Description" value={p.desc} onChange={(v) => updateNestedContent("programs", i, "desc", v)} rows={2} />
          <TextInput label="Duration" value={p.duration} onChange={(v) => updateNestedContent("programs", i, "duration", v)} />
        </ItemCard>
      ))}
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

// Home: Impact Stats
export const HomeImpactEditor = () => {
  const { content, updateNestedContent, updateContent } = useSiteContent();
  const save = useSave(["impactStats", "homeImpactBgImage"]);
  return (
    <AdminSection title="Impact Stats" description="The parallax impact counters section.">
      <FormCard title="Background Image">
        <ImageInput label="Impact Section Background" value={content.homeImpactBgImage} onChange={(v) => updateContent("homeImpactBgImage", v)} onRemove={() => updateContent("homeImpactBgImage", "")} />
      </FormCard>
      {content.impactStats.map((s, i) => (
        <FormCard key={i} title={`Counter #${i + 1}`}>
          <div className="grid grid-cols-3 gap-3">
            <TextInput label="Label" value={s.label} onChange={(v) => updateNestedContent("impactStats", i, "label", v)} />
            <TextInput label="Suffix" value={s.suffix} onChange={(v) => updateNestedContent("impactStats", i, "suffix", v)} />
          </div>
        </FormCard>
      ))}
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

// Home: Why Choose Us
export const HomeWhyEditor = () => {
  const { content, updateNestedContent } = useSiteContent();
  const save = useSave(["whyChooseUs"]);
  return (
    <AdminSection title="Why Choose Us" description="Trust section cards.">
      {content.whyChooseUs.map((w, i) => (
        <ItemCard key={i} index={i}>
          <TextInput label="Title" value={w.title} onChange={(val) => updateNestedContent("whyChooseUs", i, "title", val)} />
          <TextArea label="Description" value={w.desc} onChange={(val) => updateNestedContent("whyChooseUs", i, "desc", val)} rows={2} />
        </ItemCard>
      ))}
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

// Home: Partners
export const HomePartnersEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["partners"]);
  return (
    <AdminSection title="Partner Organizations" description="Affiliated organizations displayed in the trust strip.">
      <FormCard>
        {content.partners.map((p, i) => (
          <TextInput key={i} label={`Partner #${i + 1}`} value={p} onChange={(v) => {
            const arr = [...content.partners];
            arr[i] = v;
            updateContent("partners", arr);
          }} />
        ))}
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

// Home: Visit Cards
export const HomeVisitEditor = () => {
  const { content, updateNestedContent } = useSiteContent();
  const save = useSave(["visitCards"]);
  return (
    <AdminSection title="Visit Us Cards" description="Location, hours, and contact cards.">
      {content.visitCards.map((card, i) => (
        <FormCard key={i} title={card.title}>
          <TextInput label="Title" value={card.title} onChange={(v) => updateNestedContent("visitCards", i, "title", v)} />
          {card.lines.map((line, j) => (
            <TextInput key={j} label={`Line ${j + 1}`} value={line} onChange={(v) => {
              const lines = [...card.lines];
              lines[j] = v;
              updateNestedContent("visitCards", i, "lines", lines);
            }} />
          ))}
        </FormCard>
      ))}
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

// Home: Final CTA
export const HomeCtaEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["finalCta"]);
  return (
    <AdminSection title="Final CTA" description="The closing call-to-action on the homepage.">
      <FormCard>
        <TextInput label="Title" value={content.finalCta.title} onChange={(v) => updateContent("finalCta.title", v)} />
        <TextArea label="Description" value={content.finalCta.description} onChange={(v) => updateContent("finalCta.description", v)} />
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

// Home: Gallery Images
export const HomeGalleryEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["homeGalleryImages", "homeProfImage"]);
  return (
    <AdminSection title="Gallery Preview Images" description="Images shown in the gallery preview section on the homepage.">
      <FormCard title="Director Image">
        <ImageInput label="Professor / Director Photo" value={content.homeProfImage} onChange={(v) => updateContent("homeProfImage", v)} onRemove={() => updateContent("homeProfImage", "")} />
      </FormCard>
      <FormCard title="Gallery Grid Images">
        {content.homeGalleryImages.map((img, i) => (
          <ImageInput
            key={i}
            label={`Gallery Image #${i + 1}`}
            value={img}
            onChange={(v) => {
              const arr = [...content.homeGalleryImages];
              arr[i] = v;
              updateContent("homeGalleryImages", arr);
            }}
            onRemove={() => {
              const arr = content.homeGalleryImages.filter((_, j) => j !== i);
              updateContent("homeGalleryImages", arr);
            }}
          />
        ))}
        <AddButton label="Add Image" onClick={() => updateContent("homeGalleryImages", [...content.homeGalleryImages, ""])} />
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};
