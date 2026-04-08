import { supabase } from "@/integrations/supabase/client";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  cover_image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogMedia {
  id: string;
  post_id: string;
  url: string;
  type: string;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100) + "-" + Date.now().toString(36);
}

// Use (supabase as any) for tables not yet in generated types
const db = () => supabase as any;

export async function getBlogPosts(publishedOnly = true): Promise<BlogPost[]> {
  let query = db().from("blog_posts").select("*").order("created_at", { ascending: false });
  if (publishedOnly) query = query.eq("published", true);
  const { data, error } = await query;
  if (error) { console.error(error); return []; }
  return (data || []) as BlogPost[];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await db()
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return null;
  return data as BlogPost;
}

export async function createBlogPost(post: { title: string; excerpt?: string; content?: string; category?: string; cover_image?: string; published?: boolean }): Promise<BlogPost | null> {
  const slug = generateSlug(post.title);
  const { data, error } = await db()
    .from("blog_posts")
    .insert({ ...post, slug, content: post.content || "", category: post.category || "General" })
    .select()
    .single();
  if (error) { console.error(error); return null; }
  return data as BlogPost;
}

export async function updateBlogPost(id: string, updates: Partial<Omit<BlogPost, "id" | "created_at" | "updated_at">>): Promise<boolean> {
  const { error } = await db().from("blog_posts").update(updates).eq("id", id);
  if (error) { console.error(error); return false; }
  return true;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const { error } = await db().from("blog_posts").delete().eq("id", id);
  if (error) { console.error(error); return false; }
  return true;
}

export async function getBlogMedia(postId: string): Promise<BlogMedia[]> {
  const { data, error } = await db()
    .from("blog_media")
    .select("*")
    .eq("post_id", postId)
    .order("sort_order", { ascending: true });
  if (error) { console.error(error); return []; }
  return (data || []) as BlogMedia[];
}

export async function addBlogMedia(postId: string, url: string, type = "image", caption?: string): Promise<BlogMedia | null> {
  const { data: existing } = await db().from("blog_media").select("sort_order").eq("post_id", postId).order("sort_order", { ascending: false }).limit(1);
  const nextOrder = existing && existing.length > 0 ? existing[0].sort_order + 1 : 0;
  const { data, error } = await db()
    .from("blog_media")
    .insert({ post_id: postId, url, type, caption, sort_order: nextOrder })
    .select()
    .single();
  if (error) { console.error(error); return null; }
  return data as BlogMedia;
}

export async function deleteBlogMedia(id: string): Promise<boolean> {
  const { error } = await db().from("blog_media").delete().eq("id", id);
  if (error) { console.error(error); return false; }
  return true;
}
