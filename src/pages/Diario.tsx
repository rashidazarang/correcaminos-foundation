import { motion } from "framer-motion";

const Diario = () => {
  const entries = [
    {
      date: "26 Enero 2025",
      title: "Primer entrenamiento del año: 15K por el Parque Fundidora",
      excerpt: "Arrancamos 2025 con todo. 45 corredores listos a las 6 AM, café en mano y ganas de quemar el asfalto.",
    },
    {
      date: "19 Enero 2025",
      title: "La historia detrás de nuestra camiseta 2025",
      excerpt: "El diseño de este año rinde homenaje a las montañas que nos rodean. Cada trazo cuenta una historia.",
    },
    {
      date: "12 Enero 2025",
      title: "Carlos rompe la barrera de las 3 horas en Houston",
      excerpt: "Después de 4 años de preparación, nuestro capitán finalmente logró su sueño: sub-3 en maratón.",
    },
  ];

  return (
    <div className="pt-20 md:pt-24">
      <section className="section-editorial">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="label-sm mb-4 block">Diario de Ruta</span>
            <h1 className="headline-xl text-foreground">
              Crónicas del camino
            </h1>
          </motion.div>

          <div className="space-y-12">
            {entries.map((entry, index) => (
              <motion.article
                key={entry.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b border-gris-calzada/20 pb-12 last:border-0"
              >
                <span className="label-sm text-primary mb-3 block">{entry.date}</span>
                <h2 className="headline-md text-foreground mb-4 hover:text-primary transition-colors cursor-pointer">
                  {entry.title}
                </h2>
                <p className="body-md max-w-2xl">{entry.excerpt}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Diario;
