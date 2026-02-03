import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Instagram, ExternalLink, Mail, MapPin, ArrowRight } from "lucide-react";

const Contacto = () => {
  return (
    <section className="min-h-screen bg-negro-asfalto flex items-center justify-center px-6 py-24">
      <div className="max-w-lg mx-auto text-center">
        {/* Logo Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-32 h-32 mx-auto mb-10 bg-gris-calzada/20 rounded-full flex items-center justify-center"
        >
          <span className="font-display text-3xl text-blanco-sal">CC</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl text-blanco-sal font-medium tracking-tight mb-12"
        >
          CONTACTO
        </motion.h1>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 mb-12"
        >
          <a
            href="mailto:hola@clubcorrecaminos.com"
            className="flex items-center justify-center gap-3 font-body text-lg text-blanco-sal hover:text-primary transition-colors"
          >
            <Mail className="w-5 h-5 text-gris-humo" />
            hola@clubcorrecaminos.com
          </a>

          <div className="flex items-center justify-center gap-3 font-body text-lg text-gris-humo">
            <MapPin className="w-5 h-5" />
            Monterrey, Nuevo León, México
          </div>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-6 mb-16"
        >
          <a
            href="https://www.instagram.com/club_correcaminos/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-gris-calzada text-blanco-sal hover:border-primary hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            href="https://www.strava.com/clubs/corecaminosmty"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-gris-calzada text-blanco-sal hover:border-primary hover:text-primary transition-colors"
            aria-label="Strava"
          >
            <ExternalLink className="w-6 h-6" />
          </a>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="font-body text-gris-humo mb-6">
            Para formar parte del club, visita nuestra página de ingreso
          </p>
          <Link
            to="/formar-parte"
            className="group inline-flex items-center gap-2 font-body text-primary hover:text-accent transition-colors"
          >
            Formar Parte
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Contacto;
