import { motion } from "framer-motion";

const Contacto = () => {
  return (
    <div className="pt-20 md:pt-24">
      <section className="section-editorial">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-sm mb-4 block">Contacto</span>
            <h1 className="headline-xl text-foreground mb-8">
              Hablemos
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-12"
          >
            <div>
              <h2 className="headline-md mb-4">Información</h2>
              <div className="space-y-4 body-md">
                <p>
                  <span className="text-muted-foreground">Email:</span>
                  <br />
                  <a href="mailto:contacto@correcaminos.mx" className="text-foreground hover:text-primary transition-colors">
                    contacto@correcaminos.mx
                  </a>
                </p>
                <p>
                  <span className="text-muted-foreground">Ubicación:</span>
                  <br />
                  Monterrey, Nuevo León, México
                </p>
                <p>
                  <span className="text-muted-foreground">Entrenamientos:</span>
                  <br />
                  Domingos 6:00 AM
                  <br />
                  Parque Fundidora
                </p>
              </div>
            </div>

            <div>
              <h2 className="headline-md mb-4">Síguenos</h2>
              <div className="space-y-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 body-md text-foreground hover:text-primary transition-colors"
                >
                  Instagram →
                </a>
                <a
                  href="https://strava.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 body-md text-foreground hover:text-primary transition-colors"
                >
                  Strava →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contacto;
