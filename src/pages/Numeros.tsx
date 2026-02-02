import { motion } from "framer-motion";

const Numeros = () => {
  const stats = [
    { value: "127", label: "Corredores Activos", description: "Miembros que entrenan regularmente" },
    { value: "48,320", label: "Kilómetros en 2025", description: "Distancia acumulada este año" },
    { value: "23", label: "Maratones", description: "Finales cruzados como equipo" },
    { value: "156", label: "Medios Maratones", description: "21K completados" },
    { value: "6", label: "Años de Historia", description: "Desde 2018" },
    { value: "52", label: "Entrenamientos/Año", description: "Cada domingo sin falta" },
    { value: "4:52", label: "Pace Promedio", description: "Min/km del grupo élite" },
    { value: "2:58", label: "Mejor Maratón", description: "Record del club en 42K" },
  ];

  return (
    <div className="pt-20 md:pt-24">
      <section className="section-editorial">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="label-sm mb-4 block">El Club en Números</span>
            <h1 className="headline-xl text-foreground">
              Los datos no mienten.
              <span className="block text-primary">El esfuerzo se mide.</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="border-t border-gris-calzada/30 pt-6"
              >
                <span className="stat-display text-3xl md:text-4xl lg:text-5xl block mb-2">
                  {stat.value}
                </span>
                <h3 className="font-display text-lg text-foreground mb-1">
                  {stat.label}
                </h3>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Numeros;
