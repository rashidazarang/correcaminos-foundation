import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const StatRow = ({
  value,
  label,
  description,
  delay,
  reverse = false,
}: {
  value: number;
  label: string;
  description: string;
  delay: number;
  reverse?: boolean;
}) => {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`grid md:grid-cols-2 gap-8 items-center py-12 md:py-16 border-b border-gris-calzada/20 last:border-0 ${
        reverse ? "md:text-right" : ""
      }`}
    >
      <div className={reverse ? "md:order-2" : ""}>
        <span className="font-mono text-6xl sm:text-7xl md:text-8xl text-primary tabular-nums block">
          {count}
        </span>
      </div>
      <div className={reverse ? "md:order-1 md:text-left" : ""}>
        <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
          {label}
        </h3>
        <p className="font-body text-lg text-gris-humo">{description}</p>
      </div>
    </motion.div>
  );
};

const Numeros = () => {
  const mapRef = useRef(null);
  const mapInView = useInView(mapRef, { once: true });

  const stats = [
    { value: 847, label: "Maratones Completados", description: "Finales cruzados como equipo desde 2012" },
    { value: 52, label: "Miembros Activos", description: "Corredores que entrenan regularmente con el club" },
    { value: 23, label: "Países Donde Hemos Corrido", description: "Dejando huella en asfaltos de todo el mundo" },
    { value: 156, label: "Participaciones en Boston", description: "El mayor logro de un corredor amateur" },
    { value: 12, label: "Años de Historia", description: "Construyendo comunidad desde 2012" },
    { value: 38, label: "Miembros Sub-3:00", description: "La élite del club en maratón" },
  ];

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
            EL CLUB EN NÚMEROS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 font-body text-lg md:text-xl text-gris-humo"
          >
            ¡Nuestros datos no mienten!
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blanco-sal py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <StatRow
              key={stat.label}
              value={stat.value}
              label={stat.label}
              description={stat.description}
              delay={index * 0.1}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section ref={mapRef} className="bg-crema-jersey py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl text-foreground font-medium tracking-tight">
              Donde Hemos Dejado Huella
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="aspect-[16/9] bg-gris-calzada/20 flex items-center justify-center rounded-lg"
          >
            <div className="text-center">
              <p className="font-body text-lg text-gris-humo mb-2">🗺️</p>
              <p className="font-body text-gris-humo">Mapa interactivo próximamente</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Numeros;
