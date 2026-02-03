import { motion, AnimatePresence } from "framer-motion";
import { X, Instagram, ExternalLink } from "lucide-react";
import { Miembro } from "@/types/miembro";
import { RunnerPlaceholder } from "@/components/RunnerPlaceholder";

interface MiembroModalProps {
  miembro: Miembro | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MiembroModal = ({ miembro, isOpen, onClose }: MiembroModalProps) => {
  if (!miembro) return null;

  const iniciales = miembro.nombreCompleto
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-negro-asfalto/85" />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[600px] max-h-[90vh] overflow-y-auto bg-blanco-sal rounded-lg p-8 md:p-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gris-humo hover:text-foreground transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              {/* Photo */}
              {miembro.fotoPerfil ? (
                <img
                  src={miembro.fotoPerfil}
                  alt={miembro.nombreCompleto}
                  className="w-[200px] h-[200px] rounded-full object-cover mx-auto mb-6 border-4 border-crema-jersey"
                />
              ) : (
                <div className="w-[200px] h-[200px] rounded-full overflow-hidden mx-auto mb-6 border-4 border-crema-jersey">
                  <RunnerPlaceholder size={200} />
                </div>
              )}

              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                {miembro.nombreCompleto}
              </h2>
              <p className="font-body text-gris-humo">
                Miembro desde {miembro.añoIngreso}
              </p>

              {/* Social Links */}
              {(miembro.instagram || miembro.strava) && (
                <div className="flex items-center justify-center gap-4 mt-4">
                  {miembro.instagram && (
                    <a
                      href={`https://instagram.com/${miembro.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gris-humo hover:text-primary transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {miembro.strava && (
                    <a
                      href={`https://strava.com/athletes/${miembro.strava}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gris-humo hover:text-primary transition-colors"
                      aria-label="Strava"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-crema-jersey p-4 text-center">
                <span className="font-mono text-2xl text-primary block">
                  {miembro.maratonesTotales}
                </span>
                <span className="font-body text-sm text-gris-humo">
                  Maratones
                </span>
              </div>

              {miembro.prMaraton && (
                <div className="bg-crema-jersey p-4 text-center">
                  <span className="font-mono text-2xl text-primary block">
                    {miembro.prMaraton}
                  </span>
                  <span className="font-body text-sm text-gris-humo">
                    PR Maratón
                  </span>
                </div>
              )}

              {miembro.vecesBoston > 0 && (
                <div className="bg-crema-jersey p-4 text-center">
                  <span className="font-mono text-2xl text-primary block">
                    {miembro.vecesBoston}x
                  </span>
                  <span className="font-body text-sm text-gris-humo">Boston</span>
                </div>
              )}

              {miembro.maratonesSub3 > 0 && (
                <div className="bg-crema-jersey p-4 text-center">
                  <span className="font-mono text-2xl text-primary block">
                    {miembro.maratonesSub3}
                  </span>
                  <span className="font-body text-sm text-gris-humo">Sub-3:00</span>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="space-y-4 border-t border-gris-calzada/30 pt-6">
              {miembro.prMaraton && miembro.ciudadPrMaraton && (
                <div className="flex justify-between">
                  <span className="font-body text-gris-humo">PR Maratón</span>
                  <span className="font-body text-foreground">
                    {miembro.prMaraton} — {miembro.ciudadPrMaraton} ({miembro.añoPrMaraton})
                  </span>
                </div>
              )}

              {miembro.prMedioMaraton && (
                <div className="flex justify-between">
                  <span className="font-body text-gris-humo">PR Medio Maratón</span>
                  <span className="font-mono text-foreground">{miembro.prMedioMaraton}</span>
                </div>
              )}

              {miembro.pr10k && (
                <div className="flex justify-between">
                  <span className="font-body text-gris-humo">PR 10K</span>
                  <span className="font-mono text-foreground">{miembro.pr10k}</span>
                </div>
              )}

              {miembro.ciudadesMaratones && miembro.ciudadesMaratones.length > 0 && (
                <div>
                  <span className="font-body text-gris-humo block mb-2">
                    Ciudades Maratón
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {miembro.ciudadesMaratones.map((ciudad) => (
                      <span
                        key={ciudad}
                        className="px-3 py-1 bg-negro-asfalto text-blanco-sal font-body text-sm"
                      >
                        {ciudad}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
