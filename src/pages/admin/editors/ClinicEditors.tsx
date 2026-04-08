import { useSiteContent } from "@/contexts/SiteContentContext";
import { AdminSection, FormCard, TextInput, TextArea, SaveButton, ItemCard, ImageInput, AddButton } from "../components/AdminFormComponents";
import { toast } from "sonner";
import { SiteContent } from "@/contexts/SiteContentContext";

const useSave = (keys: (keyof SiteContent)[]) => {
  const { saveMultipleSections } = useSiteContent();
  return async () => {
    const ok = await saveMultipleSections(keys);
    if (ok) toast.success("Saved successfully!");
    else toast.error("Failed to save. Please try again.");
  };
};

export const ClinicHeroEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["clinicHero", "clinicHeroImage"]);
  const s = content.clinicHero;
  return (
    <AdminSection title="Clinic Hero" description="Eye Clinic page hero section with image.">
      <FormCard>
        <ImageInput label="Hero Image" value={content.clinicHeroImage} onChange={(v) => updateContent("clinicHeroImage", v)} onRemove={() => updateContent("clinicHeroImage", "")} />
        <TextInput label="Tag" value={s.tag} onChange={(v) => updateContent("clinicHero.tag", v)} />
        <TextInput label="Title" value={s.title} onChange={(v) => updateContent("clinicHero.title", v)} />
        <TextArea label="Subtitle" value={s.subtitle} onChange={(v) => updateContent("clinicHero.subtitle", v)} />
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const ClinicMissionEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["clinicMission"]);
  return (
    <AdminSection title="Mission Quote" description="The mission statement quote strip.">
      <FormCard>
        <TextArea label="Mission Quote" value={content.clinicMission} onChange={(v) => updateContent("clinicMission", v)} rows={4} />
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const ClinicAboutEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["clinicAbout", "clinicAboutImage"]);
  const s = content.clinicAbout;
  return (
    <AdminSection title="About the Clinic" description="Clinic story section with image.">
      <FormCard>
        <ImageInput label="Clinic About Image" value={content.clinicAboutImage} onChange={(v) => updateContent("clinicAboutImage", v)} onRemove={() => updateContent("clinicAboutImage", "")} />
        <TextInput label="Subtitle" value={s.subtitle} onChange={(v) => updateContent("clinicAbout.subtitle", v)} />
        <TextInput label="Title" value={s.title} onChange={(v) => updateContent("clinicAbout.title", v)} />
        {s.paragraphs.map((p, i) => (
          <TextArea key={i} label={`Paragraph ${i + 1}`} value={p} onChange={(v) => {
            const arr = [...s.paragraphs]; arr[i] = v;
            updateContent("clinicAbout.paragraphs", arr);
          }} />
        ))}
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const ClinicServicesEditor = () => {
  const { content, updateNestedContent } = useSiteContent();
  const save = useSave(["clinicServices"]);
  return (
    <AdminSection title="Clinic Services" description="Medical services offered.">
      {content.clinicServices.map((s, i) => (
        <ItemCard key={i} index={i}>
          <TextInput label="Title" value={s.title} onChange={(v) => updateNestedContent("clinicServices", i, "title", v)} />
          <TextArea label="Description" value={s.description} onChange={(v) => updateNestedContent("clinicServices", i, "description", v)} rows={2} />
        </ItemCard>
      ))}
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const ClinicSurgicalEditor = () => {
  const { content, updateNestedContent } = useSiteContent();
  const save = useSave(["surgicalStats"]);
  return (
    <AdminSection title="Surgical Stats" description="Surgery statistics pills.">
      {content.surgicalStats.map((s, i) => (
        <FormCard key={i} title={`Stat #${i + 1}`}>
          <div className="grid grid-cols-2 gap-3">
            <TextInput label="Label" value={s.label} onChange={(v) => updateNestedContent("surgicalStats", i, "label", v)} />
            <TextInput label="Value" value={s.value} onChange={(v) => updateNestedContent("surgicalStats", i, "value", v)} />
          </div>
        </FormCard>
      ))}
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const ClinicHoursEditor = () => {
  const { content, updateNestedContent } = useSiteContent();
  const save = useSave(["clinicHours"]);
  return (
    <AdminSection title="Clinic Hours" description="Operating hours displayed on the clinic page.">
      {content.clinicHours.map((h, i) => (
        <FormCard key={i}>
          <div className="grid grid-cols-2 gap-3">
            <TextInput label="Day" value={h.day} onChange={(v) => updateNestedContent("clinicHours", i, "day", v)} />
            <TextInput label="Time" value={h.time} onChange={(v) => updateNestedContent("clinicHours", i, "time", v)} />
          </div>
        </FormCard>
      ))}
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const ClinicCtaEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["clinicCta"]);
  return (
    <AdminSection title="Clinic CTA" description="Final call to action on the clinic page.">
      <FormCard>
        <TextInput label="Title" value={content.clinicCta.title} onChange={(v) => updateContent("clinicCta.title", v)} />
        <TextArea label="Description" value={content.clinicCta.description} onChange={(v) => updateContent("clinicCta.description", v)} />
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const ClinicImagesEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["clinicImages"]);
  return (
    <AdminSection title="Clinic Page Images" description="Additional images used throughout the clinic page.">
      <FormCard>
        {content.clinicImages.map((img, i) => (
          <ImageInput
            key={i}
            label={`Image #${i + 1}`}
            value={img}
            onChange={(v) => {
              const arr = [...content.clinicImages]; arr[i] = v;
              updateContent("clinicImages", arr);
            }}
            onRemove={() => updateContent("clinicImages", content.clinicImages.filter((_, j) => j !== i))}
          />
        ))}
        <AddButton label="Add Image" onClick={() => updateContent("clinicImages", [...content.clinicImages, ""])} />
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};
