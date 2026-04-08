import { useSiteContent } from "@/contexts/SiteContentContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Loader2 } from "lucide-react";
import { getBlogPosts, BlogPost as BlogPostType } from "@/lib/blog-service";

const Blog = () => {
  const { content } = useSiteContent();
  const [dbPosts, setDbPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts(true).then((data) => {
      setDbPosts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <section className="relative py-20 bg-primary">
        <div className="container">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2">Our Stories</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground">Blog & News</h1>
          <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl">
            Updates, stories, and insights from the work of TLEC (Re)Hab Foundation.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-secondary" size={32} />
            </div>
          ) : dbPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dbPosts.map((post) => (
                <Link to={`/blog/${post.slug}`} key={post.id}>
                  <article className="group rounded-2xl overflow-hidden bg-card border border-border hover:shadow-xl transition-shadow h-full">
                    {post.cover_image && (
                      <div className="aspect-video overflow-hidden">
                        <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary/10 text-secondary">{post.category}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar size={12} /> {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                      {post.excerpt && <p className="text-muted-foreground text-sm leading-relaxed">{post.excerpt}</p>}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            // Fallback to site_content posts if no DB posts
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.blogPosts.map((post, i) => (
                <article key={i} className="group rounded-2xl overflow-hidden bg-card border border-border hover:shadow-xl transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary/10 text-secondary">{post.category}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar size={12} /> {post.date}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{post.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
          <div className="text-center mt-16">
            <p className="text-muted-foreground">Follow us on social media for the latest updates!</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
