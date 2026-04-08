import { useEffect, useState, useRef } from "react";
import { AdminSection, FormCard, TextInput, FieldLabel } from "../components/AdminFormComponents";
import { toast } from "sonner";
import { getGalleryImages, addGalleryImage, updateGalleryImage, deleteGalleryImage, GalleryImage } from "@/lib/gallery-service";
import { uploadImage } from "@/lib/supabase-content";
import { Loader2, Upload, Trash2, X, Save } from "lucide-react";

export const AdminGalleryEditor = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const data = await getGalleryImages();
    setImages(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const url = await uploadImage(file);
      if (url) {
        await addGalleryImage({ src: url, alt: file.name.split(".")[0], category: "General" });
      }
    }
    await load();
    setUploading(false);
    toast.success("Images added to gallery!");
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this image from the gallery?")) return;
    const ok = await deleteGalleryImage(id);
    if (ok) {
      setImages((prev) => prev.filter((img) => img.id !== id));
      toast.success("Image removed");
    }
  };

  const handleUpdate = async (id: string, field: string, value: string) => {
    setImages((prev) => prev.map((img) => img.id === id ? { ...img, [field]: value } : img));
  };

  const handleSave = async (img: GalleryImage) => {
    const ok = await updateGalleryImage(img.id, { alt: img.alt, category: img.category, span: img.span });
    if (ok) toast.success("Image updated!");
    else toast.error("Failed to update");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-secondary" size={32} />
      </div>
    );
  }

  return (
    <AdminSection title="Gallery Manager" description="Add, edit, or remove gallery images. Changes are saved to the database.">
      <button
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="w-full py-4 rounded-xl border-2 border-dashed border-border hover:border-secondary text-muted-foreground hover:text-foreground text-sm font-semibold transition-colors flex items-center justify-center gap-2"
      >
        {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
        {uploading ? "Uploading..." : "Upload Images"}
      </button>
      <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />

      <div className="space-y-3">
        {images.map((img) => (
          <div key={img.id} className="rounded-xl border border-border bg-card p-4 flex gap-4">
            <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 border border-border">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <TextInput label="Alt Text" value={img.alt} onChange={(v) => handleUpdate(img.id, "alt", v)} />
              <div className="grid grid-cols-2 gap-2">
                <TextInput label="Category" value={img.category} onChange={(v) => handleUpdate(img.id, "category", v)} />
                <TextInput label="Span (optional)" value={img.span || ""} onChange={(v) => handleUpdate(img.id, "span", v)} />
              </div>
            </div>
            <div className="flex flex-col gap-1 shrink-0">
              <button onClick={() => handleSave(img)} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Save">
                <Save size={14} className="text-secondary" />
              </button>
              <button onClick={() => handleDelete(img.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors" title="Delete">
                <Trash2 size={14} className="text-destructive" />
              </button>
            </div>
          </div>
        ))}
        {images.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">No gallery images yet. Upload some above!</p>
        )}
      </div>
    </AdminSection>
  );
};

export default AdminGalleryEditor;
