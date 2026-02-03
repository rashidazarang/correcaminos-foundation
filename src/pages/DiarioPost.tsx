import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import { useBlogPost } from "@/hooks/useBlogPosts";

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

const DiarioPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useBlogPost(slug ?? "");

  if (isLoading) {
    return (
      <div className="pt-20 md:pt-24 min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-20 md:pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <span className="stat-display text-8xl md:text-9xl block mb-4">404</span>
          <h1 className="headline-lg text-foreground mb-4">Entrada no encontrada</h1>
          <p className="body-lg mb-8 max-w-md mx-auto">
            Esta entrada no existe o aun no ha sido publicada.
          </p>
          <Link
            to="/diario"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body font-medium tracking-wide hover:bg-primary/90 transition-colors"
          >
            Volver al Diario
          </Link>
        </div>
      </div>
    );
  }

  const readTime = estimateReadTime(post.content);
  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      {/* Hero / Cover Image */}
      <section className="relative h-[40vh] w-full overflow-hidden flex items-center justify-center">
        {post.cover_image_url ? (
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gris-calzada/30" />
        )}
        <div className="absolute inset-0" style={{ backgroundColor: "hsl(0 0% 10% / 0.7)" }} />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-body text-xs uppercase tracking-widest text-naranja-amanecer mb-4 block"
          >
            {post.category}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl text-blanco-sal font-medium tracking-tight"
          >
            {post.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 font-body text-sm text-blanco-sal/70 flex items-center justify-center gap-3 flex-wrap"
          >
            <span>Por: {post.author}</span>
            {publishedDate && (
              <>
                <span>•</span>
                <span>{publishedDate}</span>
              </>
            )}
            <span>•</span>
            <span>{readTime} min lectura</span>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-crema-jersey py-12 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:font-body prose-p:text-gris-humo prose-a:text-primary"
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-gris-calzada/30"
          >
            <Link
              to="/diario"
              className="inline-flex items-center gap-2 font-body text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al Diario
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default DiarioPost;
