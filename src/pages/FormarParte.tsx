import { motion } from "framer-motion";

const FormarParte = () => {
  return (
    <div className="pt-20 md:pt-24">
      <section className="section-editorial">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-sm mb-4 block">Formar Parte</span>
            <h1 className="headline-xl text-foreground mb-8">
              Únete a la tribu
            </h1>
            <p className="body-lg max-w-2xl mb-12">
              No importa tu nivel. Lo que importa es tu compromiso. 
              Si estás listo para entrenar cada domingo a las 6 AM, 
              eres uno de los nuestros.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-crema-jersey p-8 md:p-12"
          >
            <h2 className="headline-md mb-6">Requisitos</h2>
            <ul className="space-y-4 mb-8">
              {[
                "Poder completar 5K sin detenerte",
                "Compromiso de asistir mínimo 3 domingos al mes",
                "Espíritu de equipo y ganas de mejorar",
                "Pago de membresía mensual ($500 MXN)",
              ].map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary mt-1">→</span>
                  <span className="body-md text-foreground">{req}</span>
                </li>
              ))}
            </ul>

            <a
              href="mailto:contacto@correcaminos.mx"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body font-medium tracking-wide hover:bg-primary/90 transition-colors"
            >
              Contactar para Inscripción
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FormarParte;
