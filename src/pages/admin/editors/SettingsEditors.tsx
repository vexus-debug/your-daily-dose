import { useSiteContent } from "@/contexts/SiteContentContext";
import { AdminSection, FormCard, TextInput, TextArea, SaveButton } from "../components/AdminFormComponents";
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

export const WhatsAppEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["whatsappNumber"]);
  return (
    <AdminSection title="WhatsApp Settings" description="Configure the floating WhatsApp button number.">
      <FormCard>
        <TextInput
          label="WhatsApp Number"
          value={content.whatsappNumber}
          onChange={(v) => updateContent("whatsappNumber", v)}
          placeholder="e.g. 2348033108139 (no + or spaces)"
        />
        <p className="text-xs text-muted-foreground">Enter the number without + or spaces. This updates the floating WhatsApp button link.</p>
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const SocialsEditor = () => {
  const { content, updateNestedContent } = useSiteContent();
  const save = useSave(["socials"]);
  return (
    <AdminSection title="Social Links" description="Edit social media URLs.">
      {content.socials.map((s, i) => (
        <FormCard key={i} title={s.platform}>
          <TextInput label="URL" value={s.url} onChange={(v) => updateNestedContent("socials", i, "url", v)} />
        </FormCard>
      ))}
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const NavbarEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["navBrand"]);
  return (
    <AdminSection title="Navbar Settings" description="Navbar brand text.">
      <FormCard>
        <TextInput label="Brand Name" value={content.navBrand.name} onChange={(v) => updateContent("navBrand.name", v)} />
        <TextInput label="Tagline" value={content.navBrand.tagline} onChange={(v) => updateContent("navBrand.tagline", v)} />
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};

export const FooterEditor = () => {
  const { content, updateContent } = useSiteContent();
  const save = useSave(["footerCta", "footerBrand", "footerCopyright"]);
  return (
    <AdminSection title="Footer Settings" description="Footer content and branding.">
      <FormCard title="CTA Band">
        <TextInput label="CTA Text" value={content.footerCta} onChange={(v) => updateContent("footerCta", v)} />
      </FormCard>
      <FormCard title="Brand">
        <TextInput label="Name" value={content.footerBrand.name} onChange={(v) => updateContent("footerBrand.name", v)} />
        <TextInput label="Tagline" value={content.footerBrand.tagline} onChange={(v) => updateContent("footerBrand.tagline", v)} />
        <TextArea label="Description" value={content.footerBrand.description} onChange={(v) => updateContent("footerBrand.description", v)} />
      </FormCard>
      <FormCard title="Copyright">
        <TextInput label="Copyright Text" value={content.footerCopyright} onChange={(v) => updateContent("footerCopyright", v)} />
      </FormCard>
      <SaveButton onClick={save} />
    </AdminSection>
  );
};
