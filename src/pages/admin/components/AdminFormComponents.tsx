import { ReactNode, useRef, useState } from "react";
import { Save, Upload, Trash2, Image, Loader2 } from "lucide-react";
import { uploadImage } from "@/lib/supabase-content";
import { toast } from "sonner";

// Reusable form components for admin editors

export const AdminSection = ({ title, description, children }: { title: string; description?: string; children: ReactNode }) => (
  <div className="max-w-3xl space-y-6">
    <div>
      <h1 className="font-heading text-xl md:text-2xl font-bold text-foreground">{title}</h1>
      {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
    </div>
    {children}
  </div>
);

export const FormCard = ({ title, children }: { title?: string; children: ReactNode }) => (
  <div className="rounded-2xl bg-card border border-border p-5 md:p-6 space-y-4">
    {title && <h3 className="font-heading text-sm font-bold text-foreground">{title}</h3>}
    {children}
  </div>
);

export const FieldLabel = ({ label }: { label: string }) => (
  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">{label}</label>
);

export const TextInput = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) => (
  <div>
    <FieldLabel label={label} />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
    />
  </div>
);

export const TextArea = ({ label, value, onChange, rows = 3, placeholder }: { label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) => (
  <div>
    <FieldLabel label={label} />
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
    />
  </div>
);

export const NumberInput = ({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) => (
  <div>
    <FieldLabel label={label} />
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
    />
  </div>
);

export const SelectInput = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { label: string; value: string }[] }) => (
  <div>
    <FieldLabel label={label} />
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  </div>
);

export const SaveButton = ({ onClick, loading: externalLoading }: { onClick?: () => void; loading?: boolean }) => {
  const [saving, setSaving] = useState(false);
  const isLoading = externalLoading || saving;

  const handleClick = async () => {
    if (!onClick) return;
    setSaving(true);
    try {
      await onClick();
    } finally {
      setSaving(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/90 transition-all text-sm disabled:opacity-50"
    >
      {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
      {isLoading ? "Saving..." : "Save Changes"}
    </button>
  );
};

export const ItemCard = ({ index, children, onRemove }: { index: number; children: ReactNode; onRemove?: () => void }) => (
  <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3 relative">
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-muted-foreground">Item #{index + 1}</span>
      {onRemove && (
        <button onClick={onRemove} className="text-xs text-destructive hover:underline">Remove</button>
      )}
    </div>
    {children}
  </div>
);

export const ImageInput = ({ label, value, onChange, onRemove }: { label: string; value: string; onChange: (v: string) => void; onRemove?: () => void }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      if (url) {
        onChange(url);
        toast.success("Image uploaded!");
      } else {
        toast.error("Failed to upload image");
      }
    } catch {
      toast.error("Upload error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <FieldLabel label={label} />
      <div className="space-y-2">
        {uploading ? (
          <div className="w-full h-32 rounded-xl border border-border bg-muted/30 flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm">Uploading...</span>
          </div>
        ) : value ? (
          <div className="relative group rounded-xl overflow-hidden border border-border">
            <img src={value} alt={label} className="w-full h-32 object-cover" />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button
                onClick={() => fileRef.current?.click()}
                className="p-2 rounded-lg bg-background/90 text-foreground hover:bg-background transition-colors"
                title="Replace image"
              >
                <Upload size={16} />
              </button>
              {onRemove && (
                <button
                  onClick={onRemove}
                  className="p-2 rounded-lg bg-destructive/90 text-destructive-foreground hover:bg-destructive transition-colors"
                  title="Remove image"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full h-24 rounded-xl border-2 border-dashed border-border hover:border-secondary bg-muted/30 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Image size={20} />
            <span className="text-xs">Click to upload</span>
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste image URL..."
          className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>
    </div>
  );
};

export const AddButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full py-3 rounded-xl border-2 border-dashed border-border hover:border-secondary text-muted-foreground hover:text-foreground text-sm font-semibold transition-colors"
  >
    + {label}
  </button>
);
