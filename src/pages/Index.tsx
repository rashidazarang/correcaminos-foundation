import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

const StatItem = ({ value, label, delay }: { value: number; label: string; delay: number }) => {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="text-center py-8"
    >
      <span className="font-mono text-5xl md:text-6xl lg:text-7xl text-primary tabular-nums">
        {count}
      </span>
      <p className="mt-4 font-body text-xs uppercase tracking-[0.2em] text-gris-humo">
        {label}
      </p>
    </motion.div>
  );
};

const Index = () => {
  const esenciaRef = useRef(null);
  const esenciaInView = useInView(esenciaRef, { once: true, margin: "-100px" });
  const [marqueeHovered, setMarqueeHovered] = useState(false);

  const stats = [
    { value: 847, label: "Maratones Completados" },
    { value: 52, label: "Miembros Activos" },
    { value: 23, label: "Países Corridos" },
    { value: 12, label: "Años de Historia" },
  ];

  const placeholderImages = Array(8).fill(null).map((_, i) => ({
    id: i,
    gradient: `linear-gradient(135deg, hsl(0 0% ${10 + i * 3}%) 0%, hsl(0 0% ${20 + i * 2}%) 100%)`,
  }));

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-negro-asfalto">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-negro-asfalto via-negro-asfalto/80 to-transparent" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          <motion.h1
            className="font-display text-center"
          >
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-blanco-sal font-medium tracking-tight"
            >
              CORREMOS SOLOS
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-blanco-sal font-medium tracking-tight mt-2"
            >
              LLEGAMOS JUNTOS
            </motion.span>
          </motion.h1>

          {/* Animated line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="h-[2px] bg-primary mt-8"
          />
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-8 h-8 text-blanco-sal/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* La Esencia Section */}
      <section ref={esenciaRef} className="bg-blanco-sal py-24 md:py-32 lg:py-40 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={esenciaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="font-body text-lg md:text-xl leading-relaxed text-foreground"
          >
            El Club Correcaminos no es solo un grupo que sale a correr; es nuestro equipo, 
            nuestro soporte y nuestra red. Aquí el ejercicio es el pretexto para forjar amistades reales.
          </motion.p>

          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            animate={esenciaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12 md:mt-16"
          >
            <p className="font-display text-xl md:text-2xl lg:text-3xl italic text-secondary leading-snug">
              "Nos apoyamos en cada sesión y nos acompañamos en cada reto hasta que todos alcancemos nuestras metas."
            </p>
          </motion.blockquote>
        </div>
      </section>

      {/* Números Section */}
      <section className="bg-negro-asfalto py-20 md:py-28 lg:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat, index) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                label={stat.label}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Galería Marquee Section */}
      <section className="bg-crema-jersey py-16 md:py-20 overflow-hidden">
        <div
          className="relative"
          onMouseEnter={() => setMarqueeHovered(true)}
          onMouseLeave={() => setMarqueeHovered(false)}
        >
          <motion.div
            className="flex gap-4"
            animate={{
              x: marqueeHovered ? 0 : "-50%",
            }}
            transition={{
              x: {
                repeat: marqueeHovered ? 0 : Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {/* Double the images for seamless loop */}
            {[...placeholderImages, ...placeholderImages].map((img, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[400px] md:w-[500px] aspect-[3/2] relative overflow-hidden group cursor-pointer"
              >
                <div
                  className="absolute inset-0 transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
                  style={{ background: img.gradient }}
                />
                <div className="absolute inset-0 bg-negro-asfalto/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-negro-asfalto py-28 md:py-36 lg:py-44 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blanco-sal tracking-tight"
          >
            ¿VIBRAS EN NUESTRA FRECUENCIA?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 md:mt-12"
          >
            <Link
              to="/formar-parte"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-blanco-sal text-blanco-sal font-body font-medium tracking-wide transition-all duration-300 hover:bg-primary hover:border-primary hover:text-negro-asfalto"
            >
              FORMAR PARTE
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Index;
