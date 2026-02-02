import { motion } from "framer-motion";

interface Article {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: number;
}

const mockArticles: Article[] = [
  {
    id: 1,
    category: "Experiencias",
    title: "Mi primer Boston: Crónica de un sueño cumplido",
    excerpt: "Después de años de preparación, finalmente crucé la línea de meta en la carrera más icónica del mundo.",
    author: "Carlos Mendoza",
    readTime: 8,
  },
  {
    id: 2,
    category: "Guías",
    title: "Guía completa: Cómo preparar el Maratón de Chicago",
    excerpt: "Todo lo que necesitas saber para conquistar una de las World Marathon Majors más rápidas.",
    author: "Ana Rodríguez",
    readTime: 12,
  },
  {
    id: 3,
    category: "Entrenamiento",
    title: "Entrenamiento de velocidad en la Calzada",
    excerpt: "Nuestras sesiones de intervalos favoritas para mejorar tu ritmo y resistencia.",
    author: "Miguel Torres",
    readTime: 6,
  },
  {
    id: 4,
    category: "Rituales",
    title: "El ritual pre-carrera de los Correcaminos",
    excerpt: "Desde la cena de pasta hasta el calentamiento: así nos preparamos para competir.",
    author: "Laura Sánchez",
    readTime: 5,
  },
  {
    id: 5,
    category: "Viajes",
    title: "Monterrey - Houston: La ruta de los texanos",
    excerpt: "Cómo organizamos el viaje grupal al Chevron Houston Marathon cada enero.",
    author: "Roberto Garza",
    readTime: 7,
  },
  {
    id: 6,
    category: "Nutrición",
    title: "Nutrición para maratón: Lo que aprendimos",
    excerpt: "Lecciones reales sobre alimentación antes, durante y después de los 42K.",
    author: "María López",
    readTime: 10,
  },
];

const ArticleCard = ({ article, delay }: { article: Article; delay: number }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-blanco-sal group cursor-pointer"
    >
      {/* Cover Image */}
      <div className="aspect-[16/9] bg-gris-calzada/20 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
          <span className="font-body text-sm text-gris-humo">Imagen</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <span className="font-body text-xs uppercase tracking-widest text-primary mb-3 block">
          {article.category}
        </span>

        <h3 className="font-display text-xl text-foreground mb-3 transition-colors duration-300 group-hover:text-primary line-clamp-2">
          {article.title}
        </h3>

        <p className="font-body text-base text-gris-humo mb-4 line-clamp-2">
          {article.excerpt}
        </p>

        <div className="font-body text-sm text-gris-humo/70">
          Por: {article.author} • {article.readTime} min lectura
        </div>
      </div>
    </motion.article>
  );
};

const Diario = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full bg-negro-asfalto flex items-center justify-center">
        <div className="text-center px-6">
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
            className="mt-6 font-body text-lg md:text-xl text-gris-humo"
          >
            El Acervo de Experiencias
          </motion.p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="bg-crema-jersey py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {mockArticles.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Diario;
