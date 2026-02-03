import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-gear.webp";
import { useGearProducts } from "@/hooks/useGearProducts";

const Gear = () => {
  const { data: products, isLoading } = useGearProducts();

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
            GEAR OFICIAL
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 font-body text-lg md:text-xl text-blanco-sal/70"
          >
            Representa al Club
          </motion.p>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="bg-blanco-sal py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-body text-xl text-foreground text-center mb-16 max-w-3xl mx-auto"
          >
            Al unirte al club, recibes tu kit oficial para representar a Correcaminos
            en cada entrenamiento y carrera.
          </motion.p>

          {/* Products Grid */}
          {isLoading ? (
            <p className="text-center text-muted-foreground">Cargando productos...</p>
          ) : !products?.length ? (
            <p className="text-center text-muted-foreground">No hay productos todavia.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
              {products.map((product, index) => (
                <Link key={product.id} to={`/gear/${product.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="text-center group cursor-pointer"
                  >
                    <div className="aspect-square bg-crema-jersey mb-6 overflow-hidden flex items-center justify-center">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <span className="font-body text-gris-humo">Imagen</span>
                      )}
                    </div>

                    <h3 className="font-display text-xl text-foreground mb-3 transition-colors duration-300 group-hover:text-primary">
                      {product.name}
                    </h3>

                    <p className="font-body text-base text-gris-humo leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}

          {/* Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-sm text-gris-humo text-center mt-16 italic"
          >
            El gear oficial se entrega exclusivamente a miembros del club.
          </motion.p>
        </div>
      </section>
    </>
  );
};

export default Gear;
