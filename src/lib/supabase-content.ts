import { supabase } from "@/integrations/supabase/client";

// Load all site content from DB
export async function loadSiteContent(): Promise<Record<string, any> | null> {
  const { data, error } = await supabase
    .from("site_content")
    .select("key, value");

  if (error || !data || data.length === 0) return null;

  const content: Record<string, any> = {};
  data.forEach((row: any) => {
    content[row.key] = row.value;
  });
  return content;
}

// Save a specific content key to DB
export async function saveSiteContentKey(key: string, value: any): Promise<boolean> {
  const { error } = await supabase
    .from("site_content")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });

  return !error;
}

// Save multiple keys at once
export async function saveSiteContentBatch(entries: { key: string; value: any }[]): Promise<boolean> {
  const rows = entries.map(e => ({ key: e.key, value: e.value, updated_at: new Date().toISOString() }));
  const { error } = await supabase
    .from("site_content")
    .upsert(rows, { onConflict: "key" });

  return !error;
}

// Upload image to storage
export async function uploadImage(file: File): Promise<string | null> {
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
  const filePath = `uploads/${fileName}`;

  const { error } = await supabase.storage
    .from("site-images")
    .upload(filePath, file);

  if (error) {
    console.error("Upload error:", error);
    return null;
  }

  const { data } = supabase.storage
    .from("site-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// Track page visit
export async function trackPageVisit(page: string) {
  const referrer = document.referrer
    ? new URL(document.referrer).hostname || "direct"
    : "direct";

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const isTablet = /Tablet|iPad/i.test(navigator.userAgent);
  const device = isTablet ? "Tablet" : isMobile ? "Mobile" : "Desktop";

  await supabase.from("page_visitors").insert({
    page,
    referrer,
    device,
    country: "Unknown",
  });
}

// Get page visitors
export async function getPageVisitors() {
  const { data, error } = await supabase
    .from("page_visitors")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return [];
  return data || [];
}
