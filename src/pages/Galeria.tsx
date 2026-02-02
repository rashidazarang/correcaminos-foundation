import { motion } from "framer-motion";

const Galeria = () => {
  const images = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    aspectRatio: i % 3 === 0 ? "aspect-[4/5]" : i % 2 === 0 ? "aspect-square" : "aspect-[3/4]",
  }));

  return (
    <div className="pt-20 md:pt-24">
      <section className="section-editorial">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="label-sm mb-4 block">Galería</span>
            <h1 className="headline-xl text-foreground">
              Momentos que definen
              <span className="block text-secondary">quiénes somos</span>
            </h1>
          </motion.div>

          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`${image.aspectRatio} bg-gris-calzada/20 break-inside-avoid flex items-center justify-center`}
              >
                <span className="label-sm text-gris-humo">Foto {image.id}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Galeria;
