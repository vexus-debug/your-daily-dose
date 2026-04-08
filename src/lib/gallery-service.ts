import { supabase } from "@/integrations/supabase/client";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  span: string | null;
  sort_order: number;
  created_at: string;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) { console.error(error); return []; }
  return (data || []) as GalleryImage[];
}

export async function addGalleryImage(img: { src: string; alt: string; category: string; span?: string }): Promise<GalleryImage | null> {
  const { data: existing } = await supabase.from("gallery_images").select("sort_order").order("sort_order", { ascending: false }).limit(1);
  const nextOrder = existing && existing.length > 0 ? (existing[0] as any).sort_order + 1 : 0;
  const { data, error } = await supabase
    .from("gallery_images")
    .insert({ ...img, sort_order: nextOrder })
    .select()
    .single();
  if (error) { console.error(error); return null; }
  return data as GalleryImage;
}

export async function updateGalleryImage(id: string, updates: Partial<Omit<GalleryImage, "id" | "created_at">>): Promise<boolean> {
  const { error } = await supabase.from("gallery_images").update(updates).eq("id", id);
  if (error) { console.error(error); return false; }
  return true;
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
  const { error } = await supabase.from("gallery_images").delete().eq("id", id);
  if (error) { console.error(error); return false; }
  return true;
}
