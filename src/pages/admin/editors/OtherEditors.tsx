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

export const BlogHeroEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["blogHero"]);
  const s = content.blogHero;
  return (
    <AdminSection title="Blog Hero" description="Blog page hero section.">
      <FormCard>
        <TextInput label="Subtitle" value={s.subtitle} onChange={(v) => updateContent("blogHero.subtitle", v)} />
        <TextInput label="Title" value={s.title} onChange={(v) => updateContent("blogHero.title", v)} />
        <TextArea label="Description" value={s.description} onChange={(v) => updateContent("blogHero.description", v)} />
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const BlogPostsEditor = () => {
  const { content, updateNestedContent, addToArray, removeFromArray } = useSiteContent();
  const save = useSave(["blogPosts"]);
  return (
    <AdminSection title="Blog Posts" description="Edit blog post content and images.">
      {content.blogPosts.map((post, i) => (
        <ItemCard key={i} index={i} onRemove={content.blogPosts.length > 1 ? () => removeFromArray("blogPosts", i) : undefined}>
          <ImageInput label="Post Image" value={post.image} onChange={(v) => updateNestedContent("blogPosts", i, "image", v)} onRemove={() => updateNestedContent("blogPosts", i, "image", "")} />
          <div className="grid grid-cols-2 gap-3">
            <TextInput label="Date" value={post.date} onChange={(v) => updateNestedContent("blogPosts", i, "date", v)} />
            <TextInput label="Category" value={post.category} onChange={(v) => updateNestedContent("blogPosts", i, "category", v)} />
          </div>
          <TextInput label="Title" value={post.title} onChange={(v) => updateNestedContent("blogPosts", i, "title", v)} />
          <TextArea label="Excerpt" value={post.excerpt} onChange={(v) => updateNestedContent("blogPosts", i, "excerpt", v)} />
        </ItemCard>
      ))}
      <AddButton label="Add Blog Post" onClick={() => addToArray("blogPosts", { date: "", title: "", excerpt: "", category: "", image: "" })} />
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const DonateHeroEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["donateHero"]);
  const s = content.donateHero;
  return (
    <AdminSection title="Donate Hero" description="Donate page hero section.">
      <FormCard>
        <TextInput label="Subtitle" value={s.subtitle} onChange={(v) => updateContent("donateHero.subtitle", v)} />
        <TextInput label="Title" value={s.title} onChange={(v) => updateContent("donateHero.title", v)} />
        <TextArea label="Description" value={s.description} onChange={(v) => updateContent("donateHero.description", v)} />
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const DonateWhyEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["donateWhy"]);
  const s = content.donateWhy;
  return (
    <AdminSection title="Why Support" description="Why your support matters section.">
      <FormCard>
        <TextInput label="Title" value={s.title} onChange={(v) => updateContent("donateWhy.title", v)} />
        {s.paragraphs.map((p, i) => (
          <TextArea key={i} label={`Paragraph ${i + 1}`} value={p} onChange={(v) => {
            const arr = [...s.paragraphs]; arr[i] = v;
            updateContent("donateWhy.paragraphs", arr);
          }} />
        ))}
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const DonateWaysEditor = () => {
  const { content, updateNestedContent } = useSiteContent();
  const save = useSave(["donateWays"]);
  return (
    <AdminSection title="Ways to Help" description="Donation methods cards.">
      {content.donateWays.map((w, i) => (
        <ItemCard key={i} index={i}>
          <TextInput label="Title" value={w.title} onChange={(v) => updateNestedContent("donateWays", i, "title", v)} />
          <TextArea label="Description" value={w.desc} onChange={(v) => updateNestedContent("donateWays", i, "desc", v)} rows={2} />
        </ItemCard>
      ))}
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const DonateCtaEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["donateCta"]);
  const s = content.donateCta;
  return (
    <AdminSection title="Donate CTA" description="Final donation call to action.">
      <FormCard>
        <TextInput label="Title" value={s.title} onChange={(v) => updateContent("donateCta.title", v)} />
        <TextArea label="Description" value={s.description} onChange={(v) => updateContent("donateCta.description", v)} />
        <div className="grid grid-cols-2 gap-3">
          <TextInput label="Email" value={s.email} onChange={(v) => updateContent("donateCta.email", v)} />
          <TextInput label="Phone" value={s.phone} onChange={(v) => updateContent("donateCta.phone", v)} />
        </div>
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const DonateImageEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["donateImage"]);
  return (
    <AdminSection title="Donate Page Image" description="Main image on the donate page.">
      <FormCard>
        <ImageInput label="Donate Image" value={content.donateImage} onChange={(v) => updateContent("donateImage", v)} onRemove={() => updateContent("donateImage", "")} />
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const ContactHeroEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["contactHero"]);
  const s = content.contactHero;
  return (
    <AdminSection title="Contact Hero" description="Contact page hero section.">
      <FormCard>
        <TextInput label="Subtitle" value={s.subtitle} onChange={(v) => updateContent("contactHero.subtitle", v)} />
        <TextInput label="Title" value={s.title} onChange={(v) => updateContent("contactHero.title", v)} />
        <TextArea label="Description" value={s.description} onChange={(v) => updateContent("contactHero.description", v)} />
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const ContactInfoEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["contactInfo"]);
  const c = content.contactInfo;
  return (
    <AdminSection title="Contact Info" description="Address, phone numbers, emails, and hours.">
      <FormCard title="Address">
        {c.address.map((line, i) => (
          <TextInput key={i} label={`Line ${i + 1}`} value={line} onChange={(v) => {
            const arr = [...c.address]; arr[i] = v;
            updateContent("contactInfo.address", arr);
          }} />
        ))}
      </FormCard>
      <FormCard title="Phone Numbers">
        {c.phones.map((p, i) => (
          <TextInput key={i} label={`Phone ${i + 1}`} value={p} onChange={(v) => {
            const arr = [...c.phones]; arr[i] = v;
            updateContent("contactInfo.phones", arr);
          }} />
        ))}
      </FormCard>
      <FormCard title="Emails">
        {c.emails.map((e, i) => (
          <TextInput key={i} label={`Email ${i + 1}`} value={e} onChange={(v) => {
            const arr = [...c.emails]; arr[i] = v;
            updateContent("contactInfo.emails", arr);
          }} />
        ))}
      </FormCard>
      <FormCard title="Hours">
        {c.hours.map((h, i) => (
          <TextInput key={i} label={`Hours ${i + 1}`} value={h} onChange={(v) => {
            const arr = [...c.hours]; arr[i] = v;
            updateContent("contactInfo.hours", arr);
          }} />
        ))}
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const GalleryHeroEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["galleryHero"]);
  const s = content.galleryHero;
  return (
    <AdminSection title="Gallery Hero" description="Gallery page hero section.">
      <FormCard>
        <TextInput label="Tag" value={s.tag} onChange={(v) => updateContent("galleryHero.tag", v)} />
        <TextInput label="Title" value={s.title} onChange={(v) => updateContent("galleryHero.title", v)} />
        <TextArea label="Subtitle" value={s.subtitle} onChange={(v) => updateContent("galleryHero.subtitle", v)} />
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const GalleryImagesEditor = () => {
  const { content, updateNestedContent, addToArray, removeFromArray } = useSiteContent();
  const save = useSave(["galleryImages"]);
  return (
    <AdminSection title="Gallery Images" description="Manage all gallery images — add, edit, or remove.">
      {content.galleryImages.map((img, i) => (
        <ItemCard key={i} index={i} onRemove={() => removeFromArray("galleryImages", i)}>
          <ImageInput label="Image" value={img.src} onChange={(v) => updateNestedContent("galleryImages", i, "src", v)} onRemove={() => updateNestedContent("galleryImages", i, "src", "")} />
          <TextInput label="Alt Text" value={img.alt} onChange={(v) => updateNestedContent("galleryImages", i, "alt", v)} />
          <div className="grid grid-cols-2 gap-3">
            <TextInput label="Category" value={img.category} onChange={(v) => updateNestedContent("galleryImages", i, "category", v)} />
            <TextInput label="Span Classes (optional)" value={img.span || ""} onChange={(v) => updateNestedContent("galleryImages", i, "span", v)} />
          </div>
        </ItemCard>
      ))}
      <AddButton label="Add Gallery Image" onClick={() => addToArray("galleryImages", { src: "", alt: "", category: "Clinic", span: "" })} />
      <SaveButton onClick={save} />
    </AdminSection>
  );
};
