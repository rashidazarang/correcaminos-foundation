import { motion } from "framer-motion";

interface GearItem {
  id: number;
  name: string;
  description: string;
}

const gearItems: GearItem[] = [
  {
    id: 1,
    name: "Camiseta Técnica Manga Corta",
    description: "Camiseta técnica blanca con logo del club bordado. Tela de alto rendimiento con tecnología de secado rápido.",
  },
  {
    id: 2,
    name: "Camiseta Técnica Manga Larga",
    description: "Camiseta técnica blanca manga larga para entrenamientos frescos. Ideal para las mañanas de invierno en Monterrey.",
  },
  {
    id: 3,
    name: "Gorra Técnica Premium",
    description: "Gorra técnica de marca premium (Adidas, Nike o similar). Diseño exclusivo del club con protección UV.",
  },
];

const Gear = () => {
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
            GEAR OFICIAL
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 font-body text-lg md:text-xl text-gris-humo"
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
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {gearItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-center"
              >
                {/* Product Image Placeholder */}
                <div className="aspect-square bg-crema-jersey mb-6 flex items-center justify-center">
                  <span className="font-body text-gris-humo">Imagen</span>
                </div>

                <h3 className="font-display text-xl text-foreground mb-3">
                  {item.name}
                </h3>

                <p className="font-body text-base text-gris-humo leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

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
