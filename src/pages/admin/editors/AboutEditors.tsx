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

export const AboutHeroEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["aboutHero", "aboutHeroImage"]);
  const s = content.aboutHero;
  return (
    <AdminSection title="About Page Hero" description="Hero section on the About page.">
      <FormCard>
        <ImageInput label="Hero Background Image" value={content.aboutHeroImage} onChange={(v) => updateContent("aboutHeroImage", v)} onRemove={() => updateContent("aboutHeroImage", "")} />
        <TextInput label="Tag" value={s.tag} onChange={(v) => updateContent("aboutHero.tag", v)} />
        <TextInput label="Title" value={s.title} onChange={(v) => updateContent("aboutHero.title", v)} />
        <TextArea label="Subtitle" value={s.subtitle} onChange={(v) => updateContent("aboutHero.subtitle", v)} />
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const AboutOriginEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["aboutOrigin", "aboutOriginImages"]);
  const s = content.aboutOrigin;
  return (
    <AdminSection title="Origin Story" description="The founding narrative with images.">
      <FormCard>
        <TextInput label="Title" value={s.title} onChange={(v) => updateContent("aboutOrigin.title", v)} />
        {s.paragraphs.map((p, i) => (
          <TextArea key={i} label={`Paragraph ${i + 1}`} value={p} onChange={(v) => {
            const arr = [...s.paragraphs]; arr[i] = v;
            updateContent("aboutOrigin.paragraphs", arr);
          }} />
        ))}
      </FormCard>
      <FormCard title="Origin Section Images">
        {content.aboutOriginImages.map((img, i) => (
          <ImageInput
            key={i}
            label={`Image #${i + 1}`}
            value={img}
            onChange={(v) => {
              const arr = [...content.aboutOriginImages]; arr[i] = v;
              updateContent("aboutOriginImages", arr);
            }}
            onRemove={() => updateContent("aboutOriginImages", content.aboutOriginImages.filter((_, j) => j !== i))}
          />
        ))}
        <AddButton label="Add Image" onClick={() => updateContent("aboutOriginImages", [...content.aboutOriginImages, ""])} />
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const AboutMilestonesEditor = () => {
  const { content, updateNestedContent, addToArray, removeFromArray } = useSiteContent();
  const save = useSave(["milestones"]);
  return (
    <AdminSection title="Milestones" description="Timeline milestones with images.">
      {content.milestones.map((m, i) => (
        <ItemCard key={i} index={i} onRemove={content.milestones.length > 1 ? () => removeFromArray("milestones", i) : undefined}>
          <ImageInput label="Milestone Image" value={m.image} onChange={(v) => updateNestedContent("milestones", i, "image", v)} onRemove={() => updateNestedContent("milestones", i, "image", "")} />
          <div className="grid grid-cols-2 gap-3">
            <TextInput label="Year" value={m.year} onChange={(v) => updateNestedContent("milestones", i, "year", v)} />
            <TextInput label="Title" value={m.title} onChange={(v) => updateNestedContent("milestones", i, "title", v)} />
          </div>
          <TextArea label="Description" value={m.desc} onChange={(v) => updateNestedContent("milestones", i, "desc", v)} rows={2} />
        </ItemCard>
      ))}
      <AddButton label="Add Milestone" onClick={() => addToArray("milestones", { year: "", title: "", desc: "", image: "" })} />
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const AboutDirectorEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["directorBio", "directorImage"]);
  const d = content.directorBio;
  return (
    <AdminSection title="Director Bio" description="Medical director profile with photo.">
      <FormCard>
        <ImageInput label="Director Photo" value={content.directorImage} onChange={(v) => updateContent("directorImage", v)} onRemove={() => updateContent("directorImage", "")} />
        <TextInput label="Name" value={d.name} onChange={(v) => updateContent("directorBio.name", v)} />
        <TextInput label="Role" value={d.role} onChange={(v) => updateContent("directorBio.role", v)} />
        <TextInput label="Email" value={d.email} onChange={(v) => updateContent("directorBio.email", v)} />
        {d.paragraphs.map((p, i) => (
          <TextArea key={i} label={`Bio Paragraph ${i + 1}`} value={p} onChange={(v) => {
            const arr = [...d.paragraphs]; arr[i] = v;
            updateContent("directorBio.paragraphs", arr);
          }} />
        ))}
        {d.specialties.map((s, i) => (
          <TextInput key={i} label={`Specialty ${i + 1}`} value={s} onChange={(v) => {
            const arr = [...d.specialties]; arr[i] = v;
            updateContent("directorBio.specialties", arr);
          }} />
        ))}
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const AboutValuesEditor = () => {
  const { content, updateNestedContent } = useSiteContent();
  const save = useSave(["values"]);
  return (
    <AdminSection title="Values" description="Core values displayed on the About page.">
      {content.values.map((v, i) => (
        <ItemCard key={i} index={i}>
          <TextInput label="Title" value={v.title} onChange={(val) => updateNestedContent("values", i, "title", val)} />
          <TextArea label="Description" value={v.desc} onChange={(val) => updateNestedContent("values", i, "desc", val)} rows={2} />
        </ItemCard>
      ))}
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const AboutBoardEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["boardSection"]);
  const b = content.boardSection;
  return (
    <AdminSection title="Board Section" description="Board of Trustees section.">
      <FormCard>
        <TextInput label="Title" value={b.title} onChange={(v) => updateContent("boardSection.title", v)} />
        {b.paragraphs.map((p, i) => (
          <TextArea key={i} label={`Paragraph ${i + 1}`} value={p} onChange={(v) => {
            const arr = [...b.paragraphs]; arr[i] = v;
            updateContent("boardSection.paragraphs", arr);
          }} />
        ))}
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const AboutImagesEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["aboutBottomImages"]);
  return (
    <AdminSection title="About Page Images" description="Bottom section images on the About page.">
      <FormCard>
        {content.aboutBottomImages.map((img, i) => (
          <ImageInput
            key={i}
            label={`Image #${i + 1}`}
            value={img}
            onChange={(v) => {
              const arr = [...content.aboutBottomImages]; arr[i] = v;
              updateContent("aboutBottomImages", arr);
            }}
            onRemove={() => updateContent("aboutBottomImages", content.aboutBottomImages.filter((_, j) => j !== i))}
          />
        ))}
        <AddButton label="Add Image" onClick={() => updateContent("aboutBottomImages", [...content.aboutBottomImages, ""])} />
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};
