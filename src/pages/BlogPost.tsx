import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogPostBySlug, getBlogMedia, BlogPost as BlogPostType, BlogMedia } from "@/lib/blog-service";
import { Calendar, ArrowLeft, Tag, Loader2 } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-reveal";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [media, setMedia] = useState<BlogMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const p = await getBlogPostBySlug(slug);
      setPost(p);
      if (p) {
        const m = await getBlogMedia(p.id);
        setMedia(m);
      }
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-secondary" size={32} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="font-heading text-3xl font-bold text-foreground">Post Not Found</h1>
        <Link to="/blog" className="text-secondary hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 bg-primary">
        {post.cover_image && (
          <div className="absolute inset-0">
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover opacity-20" />
          </div>
        )}
        <div className="container relative">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary/20 text-secondary">
              <Tag size={10} className="inline mr-1" />{post.category}
            </span>
            <span className="text-xs text-primary-foreground/60 flex items-center gap-1">
              <Calendar size={12} /> {new Date(post.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground max-w-3xl">{post.title}</h1>
          {post.excerpt && (
            <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl">{post.excerpt}</p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container max-w-3xl">
          <Reveal direction="up">
            {post.cover_image && (
              <div className="rounded-2xl overflow-hidden mb-10 border border-border">
                <img src={post.cover_image} alt={post.title} className="w-full aspect-video object-cover" />
              </div>
            )}
            <div className="prose prose-lg max-w-none text-foreground leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </Reveal>

          {/* Media gallery */}
          {media.length > 0 && (
            <Reveal direction="up" delay={0.2}>
              <div className="mt-12">
                <h3 className="font-heading text-xl font-bold text-foreground mb-6">Media</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {media.map((m) => (
                    <div key={m.id} className="rounded-xl overflow-hidden border border-border">
                      {m.type === "video" ? (
                        <video src={m.url} controls className="w-full aspect-video object-cover" />
                      ) : (
                        <img src={m.url} alt={m.caption || ""} className="w-full aspect-video object-cover" />
                      )}
                      {m.caption && (
                        <p className="p-3 text-sm text-muted-foreground">{m.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
