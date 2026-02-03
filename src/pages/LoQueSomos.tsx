import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-lo-que-somos.webp";
import footerImage from "@/assets/footer-lo-que-somos.webp";

const LoQueSomos = () => {
  const manifestoRef = useRef(null);
  const manifestoInView = useInView(manifestoRef, { once: true, margin: "-100px" });

  const codigoRef = useRef(null);
  const codigoInView = useInView(codigoRef, { once: true, margin: "-100px" });

  const resumenRef = useRef(null);
  const resumenInView = useInView(resumenRef, { once: true, margin: "-50px" });

  const valores = [
    {
      titulo: "La Amistad es el Core",
      descripcion: "Para nosotros, la convivencia y los lazos reales son lo primero. Corremos juntos, crecemos juntos.",
    },
    {
      titulo: "Crecimiento Orgánico",
      descripcion: "El club crece solo por invitación. Sumamos a amigos y familia que tengan el potencial y las ganas de adoptar nuestros valores. Calidad sobre cantidad, siempre.",
    },
    {
      titulo: "Integridad Total",
      descripcion: "Buscamos personas reales, honestas y de buena conducta. Gente que valore a su familia y que busque sumar algo positivo a la sociedad.",
    },
    {
      titulo: "Respeto al Entorno",
      descripcion: "El asfalto es nuestra cancha y lo respetamos. Cuidamos el medio ambiente y seguimos las reglas. La seguridad no se negocia.",
    },
    {
      titulo: "Rendimiento al Máximo",
      descripcion: "Nos apoyamos para que cada miembro explote su potencial deportivo. Si quieres mejorar, el club es tu plataforma.",
    },
    {
      titulo: "Squads con Propósito",
      descripcion: "Fomentamos la creación de subgrupos con metas claras: mismos maratones, mismos horarios, mismo paso. Encuentra tu lugar dentro de la comunidad.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden flex items-center justify-center">
        <img src={heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: 'hsl(0 0% 10% / 0.7)' }} />
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl text-blanco-sal font-medium tracking-tight"
          >
            LO QUE SOMOS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 font-body text-lg md:text-xl text-blanco-sal/70 italic"
          >
            El Manifiesto Correcaminos
          </motion.p>
        </div>
      </section>

      {/* El Manifiesto Section */}
      <section ref={manifestoRef} className="bg-blanco-sal py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={manifestoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="font-body text-xl md:text-2xl leading-loose text-foreground"
          >
            El Club Correcaminos no es solo un grupo que sale a correr; es nuestro equipo, 
            nuestro soporte y nuestra red. Aquí el ejercicio es el pretexto para forjar amistades reales.
          </motion.p>

          {/* Pull Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            animate={manifestoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="my-16 md:my-20 relative"
          >
            <span className="absolute -top-8 -left-4 font-display text-8xl md:text-9xl text-primary/30 leading-none select-none">
              "
            </span>
            <p className="font-display text-2xl md:text-3xl lg:text-4xl italic text-secondary leading-snug pl-4 md:pl-8">
              Juntos, somos el motor que te mantiene constante cuando las ganas fallan 
              y el crew que celebra tus objetivos como si fueran propios.
            </p>
            <span className="absolute -bottom-12 right-0 font-display text-8xl md:text-9xl text-primary/30 leading-none select-none">
              "
            </span>
          </motion.blockquote>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={manifestoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-body text-lg md:text-xl text-muted-foreground text-center mt-16"
          >
            Corremos solos, pero llegamos juntos.
          </motion.p>
        </div>
      </section>

      {/* Nuestro Código Section */}
      <section ref={codigoRef} className="bg-crema-jersey py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={codigoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl text-foreground font-medium tracking-tight">
              LO QUE NOS MUEVE
            </h2>
            <p className="mt-4 font-body text-lg text-gris-humo">
              Nuestro Código
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {valores.map((valor, index) => (
              <motion.div
                key={valor.titulo}
                initial={{ opacity: 0, y: 30 }}
                animate={codigoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-blanco-sal border-l-4 border-primary p-8 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
              >
                <h3 className="font-display text-xl text-foreground mb-3">
                  {valor.titulo}
                </h3>
                <p className="font-body text-base text-gris-humo leading-relaxed">
                  {valor.descripcion}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resumen + CTA Section */}
      <section ref={resumenRef} className="relative py-24 md:py-32 px-6 overflow-hidden">
        <img src={footerImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: 'hsl(0 0% 10% / 0.8)' }} />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={resumenInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="font-display text-xl md:text-2xl lg:text-3xl text-blanco-sal leading-relaxed"
          >
            Esto se trata de juntar a buenas personas para cultivar amistades épicas
            mientras devoramos kilómetros.
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={resumenInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[2px] bg-primary mx-auto mt-10"
          />

          <div className="mt-16 md:mt-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-2xl md:text-3xl text-blanco-sal mb-10"
          >
            ¿LISTO PARA UNIRTE?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Link
              to="/formar-parte"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-primary text-negro-asfalto font-body font-semibold text-lg tracking-wide transition-colors duration-300 hover:bg-accent"
            >
              FORMAR PARTE
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoQueSomos;
