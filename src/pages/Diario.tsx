import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-diario.webp";
import { useBlogPosts } from "@/hooks/useBlogPosts";

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

interface ArticleCardProps {
  slug: string;
  category: string;
  title: string;
  excerpt: string | null;
  author: string;
  readTime: number;
  coverImageUrl: string | null;
  delay: number;
}

const ArticleCard = ({
  slug,
  category,
  title,
  excerpt,
  author,
  readTime,
  coverImageUrl,
  delay,
}: ArticleCardProps) => {
  return (
    <Link to={`/diario/${slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="bg-blanco-sal group cursor-pointer"
      >
        {/* Cover Image */}
        <div className="aspect-[16/9] bg-gris-calzada/20 overflow-hidden">
          {coverImageUrl ? (
            <img
              src={coverImageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
              <span className="font-body text-sm text-gris-humo">Imagen</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <span className="font-body text-xs uppercase tracking-widest text-primary mb-3 block">
            {category}
          </span>

          <h3 className="font-display text-xl text-foreground mb-3 transition-colors duration-300 group-hover:text-primary line-clamp-2">
            {title}
          </h3>

          <p className="font-body text-base text-gris-humo mb-4 line-clamp-2">
            {excerpt || ""}
          </p>

          <div className="font-body text-sm text-gris-humo/70">
            Por: {author} • {readTime} min lectura
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

const Diario = () => {
  const { data: posts, isLoading } = useBlogPosts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full overflow-hidden flex items-center justify-center">
        <img src={heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: 'hsl(0 0% 10% / 0.7)' }} />
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl text-blanco-sal font-medium tracking-tight"
          >
            DIARIO DE RUTA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 font-body text-lg md:text-xl text-blanco-sal/70"
          >
            El Acervo de Experiencias
          </motion.p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="bg-crema-jersey py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <p className="text-center text-muted-foreground">Cargando entradas...</p>
          ) : !posts?.length ? (
            <p className="text-center text-muted-foreground">No hay entradas todavia.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {posts.map((post, index) => (
                <ArticleCard
                  key={post.id}
                  slug={post.slug}
                  category={post.category}
                  title={post.title}
                  excerpt={post.excerpt}
                  author={post.author}
                  readTime={estimateReadTime(post.content)}
                  coverImageUrl={post.cover_image_url}
                  delay={index * 0.1}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Diario;
