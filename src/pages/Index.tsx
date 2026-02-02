import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-runners.jpg";

const Index = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Corredores al amanecer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-negro-asfalto/40" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="label-sm text-blanco-sal/80 mb-4 block">
              Monterrey, México · Desde 2018
            </span>
            <h1 className="headline-xl text-blanco-sal max-w-4xl text-balance">
              Corremos porque el camino
              <span className="block text-primary">nos transforma</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/formar-parte"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body font-medium tracking-wide hover:bg-primary/90 transition-colors"
            >
              Únete al Club
            </Link>
            <Link
              to="/lo-que-somos"
              className="inline-flex items-center justify-center px-8 py-4 border border-blanco-sal/40 text-blanco-sal font-body font-medium tracking-wide hover:bg-blanco-sal/10 transition-colors"
            >
              Conoce Más
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 border-blanco-sal/40 flex items-start justify-center p-1"
          >
            <div className="w-1.5 h-3 bg-blanco-sal/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="section-editorial bg-crema-jersey">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-sm mb-4 block">El Club en Números</span>
            <h2 className="headline-lg text-foreground mb-16">
              Cada kilómetro cuenta una historia
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: "127", label: "Corredores Activos" },
              { value: "48,320", label: "Kilómetros en 2025" },
              { value: "23", label: "Maratones Completados" },
              { value: "6", label: "Años de Historia" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center md:text-left"
              >
                <span className="stat-display text-4xl md:text-5xl lg:text-6xl block mb-2">
                  {stat.value}
                </span>
                <span className="body-md">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section-editorial bg-background">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="label-sm mb-4 block">Lo Que Somos</span>
            <h2 className="headline-lg text-foreground mb-6">
              Más que un club.
              <span className="block text-secondary">Una comunidad.</span>
            </h2>
            <p className="body-lg mb-8">
              Somos corredores de Monterrey unidos por la pasión de superar
              nuestros límites. Cada domingo a las 6 AM, transformamos las
              calles en nuestro campo de entrenamiento.
            </p>
            <Link
              to="/lo-que-somos"
              className="link-underline font-body text-foreground font-medium"
            >
              Descubre nuestra historia
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="aspect-[4/5] bg-gris-calzada/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="label-sm text-gris-humo">Próximamente</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-editorial bg-negro-asfalto">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="headline-lg text-blanco-sal mb-6 text-balance">
              ¿Listo para dar el primer paso?
            </h2>
            <p className="body-lg text-gris-humo mb-10 max-w-2xl mx-auto">
              Únete a nuestra comunidad de corredores y descubre hasta dónde
              pueden llevarte tus propios pies.
            </p>
            <Link
              to="/formar-parte"
              className="inline-flex items-center justify-center px-10 py-5 bg-primary text-primary-foreground font-body font-medium text-lg tracking-wide hover:bg-primary/90 transition-colors"
            >
              Formar Parte del Club
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Index;
