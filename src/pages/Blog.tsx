import { useSiteContent } from "@/contexts/SiteContentContext";
import { Calendar } from "lucide-react";

const Blog = () => {
  const { content } = useSiteContent();
  const posts = content.blogPosts;
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
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
          <div className="text-center mt-16">
            <p className="text-muted-foreground">More stories coming soon. Follow us on social media for the latest updates!</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
