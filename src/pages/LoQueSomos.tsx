import { motion } from "framer-motion";

const LoQueSomos = () => {
  return (
    <div className="pt-20 md:pt-24">
      <section className="section-editorial">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-sm mb-4 block">Lo Que Somos</span>
            <h1 className="headline-xl text-foreground mb-8">
              Una tribu que corre
              <span className="block text-primary">hacia adelante</span>
            </h1>
            <p className="body-lg max-w-2xl">
              Club Correcaminos nació en 2018 de un grupo de amigos que 
              compartían algo más que kilómetros: una filosofía de vida 
              basada en la disciplina, la comunidad y el amor por el asfalto.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-editorial bg-crema-jersey">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="headline-md mb-4">Nuestra Filosofía</h3>
              <p className="body-md">
                Creemos que correr es un acto de transformación. Cada 
                entrenamiento es una oportunidad para conocernos mejor, 
                superar barreras mentales y construir una versión más 
                fuerte de nosotros mismos.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="headline-md mb-4">Nuestro Compromiso</h3>
              <p className="body-md">
                Nos reunimos cada domingo a las 6 AM, sin excusas. 
                Entrenamos juntos, celebramos juntos, y nos apoyamos 
                en cada meta—desde el primer 5K hasta el maratón.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoQueSomos;
