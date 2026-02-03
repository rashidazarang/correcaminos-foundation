import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useGearProduct } from "@/hooks/useGearProducts";

const GearProduct = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useGearProduct(slug ?? "");

  if (isLoading) {
    return (
      <div className="pt-20 md:pt-24 min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-20 md:pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <span className="stat-display text-8xl md:text-9xl block mb-4">404</span>
          <h1 className="headline-lg text-foreground mb-4">Producto no encontrado</h1>
          <p className="body-lg mb-8 max-w-md mx-auto">
            Este producto no existe o no esta disponible.
          </p>
          <Link
            to="/gear"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body font-medium tracking-wide hover:bg-primary/90 transition-colors"
          >
            Volver a Gear
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden flex items-center justify-center">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gris-calzada/30" />
        )}
        <div className="absolute inset-0" style={{ backgroundColor: "hsl(0 0% 10% / 0.6)" }} />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl text-blanco-sal font-medium tracking-tight"
          >
            {product.name}
          </motion.h1>
        </div>
      </section>

      {/* Details */}
      <section className="bg-blanco-sal py-12 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {product.image_url && (
              <div className="aspect-square max-w-md mx-auto overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <h2 className="font-display text-2xl text-foreground mb-4">{product.name}</h2>
              <p className="font-body text-lg text-gris-humo leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-gris-calzada/30"
          >
            <Link
              to="/gear"
              className="inline-flex items-center gap-2 font-body text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a Gear
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default GearProduct;
