import { useEffect, useState, useRef } from "react";
import { AdminSection, FormCard, TextInput, TextArea, SaveButton, ImageInput, FieldLabel } from "../components/AdminFormComponents";
import { toast } from "sonner";
import {
  getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost,
  getBlogMedia, addBlogMedia, deleteBlogMedia,
  BlogPost, BlogMedia
} from "@/lib/blog-service";
import { uploadImage } from "@/lib/supabase-content";
import { Loader2, Plus, Trash2, Eye, EyeOff, Edit, ArrowLeft, Upload, X } from "lucide-react";

export const AdminBlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const data = await getBlogPosts(false);
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    const post = await createBlogPost({ title: "New Blog Post", published: false });
    if (post) {
      toast.success("Post created!");
      setEditing(post.id);
      load();
    } else {
      toast.error("Failed to create post");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post permanently?")) return;
    const ok = await deleteBlogPost(id);
    if (ok) { toast.success("Post deleted"); load(); }
    else toast.error("Failed to delete");
  };

  const handleTogglePublish = async (post: BlogPost) => {
    const ok = await updateBlogPost(post.id, { published: !post.published });
    if (ok) { toast.success(post.published ? "Unpublished" : "Published!"); load(); }
  };

  if (editing) {
    return <BlogPostEditor postId={editing} onBack={() => { setEditing(null); load(); }} />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-secondary" size={32} />
      </div>
    );
  }

  return (
    <AdminSection title="Blog Posts" description="Create, edit, and manage blog posts.">
      <button
        onClick={handleCreate}
        className="w-full py-4 rounded-xl border-2 border-dashed border-border hover:border-secondary text-muted-foreground hover:text-foreground text-sm font-semibold transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={18} /> Create New Post
      </button>

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="rounded-xl border border-border bg-card p-4 flex items-start gap-4">
            {post.cover_image && (
              <img src={post.cover_image} alt="" className="w-20 h-14 rounded-lg object-cover shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-heading text-sm font-bold text-foreground truncate">{post.title}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${post.published ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"}`}>
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{post.excerpt || "No excerpt"}</p>
              <p className="text-[10px] text-muted-foreground mt-1">
                {new Date(post.created_at).toLocaleDateString()} · {post.category}
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => handleTogglePublish(post)} className="p-2 rounded-lg hover:bg-muted transition-colors" title={post.published ? "Unpublish" : "Publish"}>
                {post.published ? <EyeOff size={14} className="text-muted-foreground" /> : <Eye size={14} className="text-secondary" />}
              </button>
              <button onClick={() => setEditing(post.id)} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Edit">
                <Edit size={14} className="text-foreground" />
              </button>
              <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors" title="Delete">
                <Trash2 size={14} className="text-destructive" />
              </button>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">No blog posts yet. Create your first one!</p>
        )}
      </div>
    </AdminSection>
  );
};

const BlogPostEditor = ({ postId, onBack }: { postId: string; onBack: () => void }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [media, setMedia] = useState<BlogMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const mediaFileRef = useRef<HTMLInputElement>(null);

  // Local editing state
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [published, setPublished] = useState(false);

  const load = async () => {
    setLoading(true);
    const posts = await getBlogPosts(false);
    const p = posts.find((pp) => pp.id === postId);
    if (p) {
      setPost(p);
      setTitle(p.title);
      setExcerpt(p.excerpt || "");
      setContent(p.content);
      setCategory(p.category);
      setCoverImage(p.cover_image || "");
      setPublished(p.published);
      const m = await getBlogMedia(p.id);
      setMedia(m);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, [postId]);

  const handleSave = async () => {
    setSaving(true);
    const ok = await updateBlogPost(postId, { title, excerpt: excerpt || null, content, category, cover_image: coverImage || null, published });
    if (ok) toast.success("Post saved!");
    else toast.error("Failed to save");
    setSaving(false);
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const url = await uploadImage(file);
      if (url) {
        const type = file.type.startsWith("video") ? "video" : "image";
        await addBlogMedia(postId, url, type);
      }
    }
    const m = await getBlogMedia(postId);
    setMedia(m);
    setUploading(false);
    toast.success("Media uploaded!");
    if (mediaFileRef.current) mediaFileRef.current.value = "";
  };

  const handleMediaDelete = async (mediaId: string) => {
    const ok = await deleteBlogMedia(mediaId);
    if (ok) {
      setMedia((prev) => prev.filter((m) => m.id !== mediaId));
      toast.success("Media removed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-secondary" size={32} />
      </div>
    );
  }

  return (
    <AdminSection title="Edit Blog Post" description="Edit content, cover image, and media attachments.">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
        <ArrowLeft size={14} /> Back to all posts
      </button>

      <FormCard title="Post Details">
        <TextInput label="Title" value={title} onChange={setTitle} />
        <TextInput label="Category" value={category} onChange={setCategory} />
        <TextArea label="Excerpt" value={excerpt} onChange={setExcerpt} rows={2} placeholder="Short summary shown on the blog listing..." />
        <TextArea label="Content" value={content} onChange={setContent} rows={12} placeholder="Full blog post content..." />
        <ImageInput label="Cover Image" value={coverImage} onChange={setCoverImage} onRemove={() => setCoverImage("")} />
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="rounded border-border" />
            <span className="text-sm font-medium text-foreground">Published</span>
          </label>
          {post?.slug && (
            <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="text-xs text-secondary hover:underline">
              View post →
            </a>
          )}
        </div>
      </FormCard>

      {/* Media section */}
      <FormCard title="Post Media">
        <p className="text-xs text-muted-foreground -mt-2">Upload images or videos that appear within the post.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {media.map((m) => (
            <div key={m.id} className="relative group rounded-xl overflow-hidden border border-border">
              {m.type === "video" ? (
                <video src={m.url} className="w-full aspect-square object-cover" />
              ) : (
                <img src={m.url} alt={m.caption || ""} className="w-full aspect-square object-cover" />
              )}
              <button
                onClick={() => handleMediaDelete(m.id)}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-destructive/90 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => mediaFileRef.current?.click()}
          disabled={uploading}
          className="w-full py-3 rounded-xl border-2 border-dashed border-border hover:border-secondary text-muted-foreground hover:text-foreground text-sm font-semibold transition-colors flex items-center justify-center gap-2"
        >
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? "Uploading..." : "Add Media"}
        </button>
        <input ref={mediaFileRef} type="file" accept="image/*,video/*" multiple onChange={handleMediaUpload} className="hidden" />
      </FormCard>

      <SaveButton onClick={handleSave} loading={saving} />
    </AdminSection>
  );
};

export default AdminBlogList;
