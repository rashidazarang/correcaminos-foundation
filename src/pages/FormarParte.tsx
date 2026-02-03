import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Check, Instagram } from "lucide-react";
import heroImage from "@/assets/hero-formar-parte.webp";
import footerImage from "@/assets/footer-formar-parte.webp";
import { useSiteSetting } from "@/hooks/useSiteSettings";

const formSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es requerido").max(100, "Máximo 100 caracteres"),
  email: z.string().trim().email("Correo electrónico inválido").max(255, "Máximo 255 caracteres"),
  ciudad: z.string().trim().min(1, "La ciudad es requerida").max(100, "Máximo 100 caracteres"),
  comoConociste: z.string().trim().max(500, "Máximo 500 caracteres").optional(),
  miembroConocido: z.string().trim().max(200, "Máximo 200 caracteres").optional(),
  maratones: z.string().optional(),
  sobreTi: z.string().trim().max(1000, "Máximo 1000 caracteres").optional(),
});

type FormData = z.infer<typeof formSchema>;

const FormarParte = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data: whatsappPhone } = useSiteSetting("whatsapp_phone");
  
  const textRef = useRef(null);
  const textInView = useInView(textRef, { once: true, margin: "-100px" });
  
  const questionsRef = useRef(null);
  const questionsInView = useInView(questionsRef, { once: true, margin: "-50px" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    const phone = whatsappPhone || "528110504295";
    const lines = [
      "*Solicitud — Club Correcaminos*",
      "",
      `*Nombre:* ${data.nombre}`,
      `*Email:* ${data.email}`,
      `*Ciudad:* ${data.ciudad}`,
    ];
    if (data.comoConociste) lines.push(`*Cómo conoció al club:* ${data.comoConociste}`);
    if (data.miembroConocido) lines.push(`*Miembro conocido:* ${data.miembroConocido}`);
    if (data.maratones) lines.push(`*Maratones:* ${data.maratones}`);
    if (data.sobreTi) lines.push(`*Sobre mí:* ${data.sobreTi}`);

    const message = lines.join("\n");
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setIsSubmitted(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset form state after modal closes
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 300);
  };

  const paragraphs = [
    "En Correcaminos, no somos un club de puertas abiertas para cualquiera. Somos una comunidad basada en la confianza y el ADN compartido.",
    "El acceso es exclusivo por invitación. Buscamos personas que ya vivan bajo nuestros principios y que compartan nuestra pasión por el asfalto y la buena conducta.",
    "No importa en qué parte del mundo estés. Si conoces a un miembro, vibras con nuestros valores y tienes hambre de conquistar kilómetros junto a otros, queremos conocerte.",
  ];

  const questions = [
    "¿Conoces a alguien del Club?",
    "¿Compartes nuestros valores?",
    "¿Vibras en nuestra frecuencia?",
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center">
        <img src={heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: 'hsl(0 0% 10% / 0.7)' }} />
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-blanco-sal font-medium tracking-tight"
          >
            SER CORRECAMINOS
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 font-body text-lg md:text-xl text-blanco-sal/70"
          >
            NO ES SOLO CORRER
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-[2px] bg-primary mx-auto mt-8"
          />
        </div>
      </section>

      {/* Text Section */}
      <section ref={textRef} className="bg-blanco-sal py-20 md:py-28 px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="font-body text-lg md:text-xl leading-relaxed text-foreground"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </section>

      {/* Questions Section */}
      <section ref={questionsRef} className="bg-crema-jersey py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8 md:space-y-10">
          {questions.map((question, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={questionsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="font-display text-xl md:text-2xl lg:text-3xl italic text-secondary"
            >
              {question}
            </motion.p>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <img src={footerImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: 'hsl(0 0% 10% / 0.75)' }} />
        <div className="relative z-10 text-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => setIsModalOpen(true)}
            className="px-10 py-5 bg-primary text-negro-asfalto font-body font-semibold text-lg tracking-wide transition-colors duration-300 hover:bg-accent"
          >
            QUIERO SER PARTE
          </motion.button>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-negro-asfalto/80" />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[500px] max-h-[90vh] overflow-y-auto bg-blanco-sal rounded-lg p-8 md:p-10"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 text-gris-humo hover:text-foreground transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-6 h-6" />
              </button>

              {!isSubmitted ? (
                <>
                  <h2 className="font-display text-2xl md:text-3xl text-foreground mb-8 text-center">
                    CUÉNTANOS DE TI
                  </h2>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Nombre */}
                    <div>
                      <label className="block font-body text-sm text-foreground mb-2">
                        Nombre completo *
                      </label>
                      <input
                        {...register("nombre")}
                        type="text"
                        className="w-full px-4 py-3 bg-transparent border border-gris-calzada text-foreground font-body focus:border-primary focus:outline-none transition-colors"
                        placeholder="Tu nombre"
                      />
                      {errors.nombre && (
                        <p className="mt-1 text-sm text-destructive">{errors.nombre.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-body text-sm text-foreground mb-2">
                        Correo electrónico *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        className="w-full px-4 py-3 bg-transparent border border-gris-calzada text-foreground font-body focus:border-primary focus:outline-none transition-colors"
                        placeholder="tu@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Ciudad */}
                    <div>
                      <label className="block font-body text-sm text-foreground mb-2">
                        Ciudad donde vives *
                      </label>
                      <input
                        {...register("ciudad")}
                        type="text"
                        className="w-full px-4 py-3 bg-transparent border border-gris-calzada text-foreground font-body focus:border-primary focus:outline-none transition-colors"
                        placeholder="Tu ciudad"
                      />
                      {errors.ciudad && (
                        <p className="mt-1 text-sm text-destructive">{errors.ciudad.message}</p>
                      )}
                    </div>

                    {/* Cómo conociste */}
                    <div>
                      <label className="block font-body text-sm text-foreground mb-2">
                        ¿Cómo conociste al Club?
                      </label>
                      <input
                        {...register("comoConociste")}
                        type="text"
                        className="w-full px-4 py-3 bg-transparent border border-gris-calzada text-foreground font-body focus:border-primary focus:outline-none transition-colors"
                        placeholder="Redes sociales, un amigo, evento..."
                      />
                    </div>

                    {/* Miembro conocido */}
                    <div>
                      <label className="block font-body text-sm text-foreground mb-2">
                        ¿Conoces a algún miembro actual? Si es así, ¿quién?
                      </label>
                      <input
                        {...register("miembroConocido")}
                        type="text"
                        className="w-full px-4 py-3 bg-transparent border border-gris-calzada text-foreground font-body focus:border-primary focus:outline-none transition-colors"
                        placeholder="Nombre del miembro"
                      />
                    </div>

                    {/* Maratones */}
                    <div>
                      <label className="block font-body text-sm text-foreground mb-2">
                        ¿Cuántos maratones has corrido?
                      </label>
                      <input
                        {...register("maratones")}
                        type="number"
                        min="0"
                        className="w-full px-4 py-3 bg-transparent border border-gris-calzada text-foreground font-body focus:border-primary focus:outline-none transition-colors"
                        placeholder="0"
                      />
                    </div>

                    {/* Sobre ti */}
                    <div>
                      <label className="block font-body text-sm text-foreground mb-2">
                        Cuéntanos brevemente sobre ti y tu pasión por correr
                      </label>
                      <textarea
                        {...register("sobreTi")}
                        rows={4}
                        className="w-full px-4 py-3 bg-transparent border border-gris-calzada text-foreground font-body focus:border-primary focus:outline-none transition-colors resize-none"
                        placeholder="Tu historia como corredor..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-6 px-10 py-5 bg-primary text-negro-asfalto font-body font-semibold text-lg tracking-wide transition-colors duration-300 hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "ENVIANDO..." : "ENVIAR SOLICITUD"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Check className="w-8 h-8 text-negro-asfalto" />
                  </motion.div>

                  <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
                    ¡GRACIAS POR TU INTERÉS!
                  </h2>

                  <p className="font-body text-lg text-muted-foreground mb-6">
                    Hemos recibido tu información. Un miembro del comité se pondrá en contacto contigo próximamente.
                  </p>

                  <p className="font-body text-sm text-gris-humo mb-6">
                    Mientras tanto, síguenos en Instagram
                  </p>

                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-body font-medium"
                  >
                    <Instagram className="w-5 h-5" />
                    @clubcorrecaminos
                  </a>

                  <button
                    onClick={closeModal}
                    className="block w-full mt-8 px-8 py-4 border border-gris-calzada text-foreground font-body font-medium tracking-wide transition-colors duration-300 hover:bg-crema-jersey"
                  >
                    CERRAR
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FormarParte;
