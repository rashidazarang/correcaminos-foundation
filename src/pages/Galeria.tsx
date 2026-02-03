import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import heroImage from "@/assets/hero-galeria.webp";
import { useSiteImages } from "@/hooks/useAdminImages";

type Category = "todos" | "entrenamientos" | "carreras" | "viajes" | "convivios";

const categories: { key: Category; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "entrenamientos", label: "Entrenamientos" },
  { key: "carreras", label: "Carreras" },
  { key: "viajes", label: "Viajes" },
  { key: "convivios", label: "Convivios" },
];

const Galeria = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("todos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { data: images } = useSiteImages("galeria");

  const filteredImages =
    activeCategory === "todos"
      ? images ?? []
      : (images ?? []).filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goToPrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  }, [lightboxIndex, filteredImages.length]);

  const goToNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  }, [lightboxIndex, filteredImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, goToPrev, goToNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

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
            ADN DEL CLUB
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 font-body text-lg md:text-xl text-blanco-sal/70"
          >
            Nuestra Historia en Imagenes
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-16 md:top-20 z-30 bg-blanco-sal border-b border-gris-calzada/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 font-body text-sm transition-colors duration-200 ${
                  activeCategory === cat.key
                    ? "bg-negro-asfalto text-blanco-sal"
                    : "bg-transparent text-gris-humo hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="bg-blanco-sal py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredImages.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              No hay imagenes en esta categoria.
            </p>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  onClick={() => openLightbox(index)}
                  className="break-inside-avoid cursor-pointer relative group overflow-hidden"
                >
                  <img
                    src={image.image_url}
                    alt={image.alt_text ?? ""}
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-negro-asfalto/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Expand className="w-8 h-8 text-blanco-sal" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredImages[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-negro-asfalto/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 text-blanco-sal/60 hover:text-blanco-sal transition-colors z-10"
              aria-label="Cerrar"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 font-mono text-sm text-blanco-sal/60">
              {lightboxIndex + 1} / {filteredImages.length}
            </div>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-4 md:left-8 p-2 text-blanco-sal/60 hover:text-blanco-sal transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 md:right-8 p-2 text-blanco-sal/60 hover:text-blanco-sal transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            >
              <img
                src={filteredImages[lightboxIndex].image_url}
                alt={filteredImages[lightboxIndex].alt_text ?? ""}
                className="max-w-full max-h-[90vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Galeria;
