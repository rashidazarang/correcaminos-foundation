import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Globe, Users, Heart } from "lucide-react";
import { useLegends } from "@/hooks/useMembers";
import { Miembro } from "@/types/miembro";
import { MiembroModal } from "@/components/MiembroModal";
import { Skeleton } from "@/components/ui/skeleton";
import heroImage from "@/assets/hero-hall-of-fame.webp";
import footerImage from "@/assets/footer-hall-of-fame.webp";

const getLeyendaHighlight = (miembro: Miembro): string => {
  if (miembro.vecesBoston && miembro.vecesBoston >= 3) {
    return `${miembro.vecesBoston}x Boston Finisher`;
  }
  if (miembro.maratonesSub3 && miembro.maratonesSub3 >= 5) {
    return `${miembro.maratonesSub3}x Sub-3:00 Marathoner`;
  }
  if (miembro.ciudadesMaratones && miembro.ciudadesMaratones.length >= 6) {
    return "World Marathon Major Finisher";
  }
  return "Club Legend";
};

const LeyendaCard = ({
  miembro,
  onClick,
  delay,
}: {
  miembro: Miembro;
  onClick: () => void;
  delay: number;
}) => {
  const iniciales = miembro.nombreCompleto
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  const highlight = getLeyendaHighlight(miembro);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      className="bg-negro-asfalto cursor-pointer group overflow-hidden"
    >
      {/* Photo */}
      <div className="aspect-[4/3] relative overflow-hidden">
        {miembro.fotoPerfil ? (
          <img
            src={miembro.fotoPerfil}
            alt={miembro.nombreCompleto}
            className="w-full h-full object-cover contrast-125 grayscale group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gris-calzada/30 flex items-center justify-center contrast-125 grayscale group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500">
            <span className="font-display text-6xl text-gris-humo">
              {iniciales}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-negro-asfalto via-negro-asfalto/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <h3 className="font-display text-xl md:text-2xl text-dorado-medalla mb-2">
          {miembro.nombreCompleto}
        </h3>
        <p className="font-body text-sm text-crema-jersey/80 mb-4">
          {highlight}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-4">
          <span className="font-mono text-lg md:text-xl text-primary">
            {miembro.maratonesTotales} maratones
          </span>
          {miembro.prMaraton && (
            <span className="font-mono text-lg md:text-xl text-primary">
              PR: {miembro.prMaraton}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const LeyendaCardSkeleton = () => (
  <div className="bg-negro-asfalto overflow-hidden">
    <Skeleton className="aspect-[4/3] w-full rounded-none" />
    <div className="p-6 md:p-8">
      <Skeleton className="h-6 w-40 mb-2 bg-gris-calzada/30" />
      <Skeleton className="h-4 w-28 mb-4 bg-gris-calzada/30" />
      <Skeleton className="h-5 w-32 bg-gris-calzada/30" />
    </div>
  </div>
);

const HallOfFame = () => {
  const [selectedMiembro, setSelectedMiembro] = useState<Miembro | null>(null);
  const { data: leyendas = [], isLoading, isError } = useLegends();

  const criterios = [
    {
      icon: Trophy,
      text: "Múltiples finishes en Boston Marathon",
    },
    {
      icon: Star,
      text: "Maratones sub-3:00",
    },
    {
      icon: Globe,
      text: "Completar los 6 World Marathon Majors",
    },
    {
      icon: Users,
      text: "Fundadores del Club",
    },
    {
      icon: Heart,
      text: "Contribución excepcional a la comunidad",
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
            className="font-display text-4xl sm:text-5xl md:text-6xl text-dorado-medalla font-medium tracking-tight"
          >
            HALL OF FAME
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 font-body text-lg md:text-xl text-crema-jersey"
          >
            Nuestras Leyendas
          </motion.p>
        </div>
      </section>

      {/* Legends Gallery */}
      <section className="bg-crema-jersey py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {Array.from({ length: 4 }).map((_, i) => (
                <LeyendaCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-16">
              <p className="font-body text-lg text-gris-humo">
                Error al cargar las leyendas. Intenta de nuevo más tarde.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {leyendas.map((miembro, index) => (
                <LeyendaCard
                  key={miembro.id}
                  miembro={miembro}
                  onClick={() => setSelectedMiembro(miembro)}
                  delay={index * 0.15}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Criteria Section */}
      <section className="relative py-20 md:py-28 px-6 overflow-hidden">
        <img src={footerImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: 'hsl(0 0% 10% / 0.8)' }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-2xl md:text-3xl text-blanco-sal text-center mb-12"
          >
            ¿Cómo se llega al Hall of Fame?
          </motion.h2>

          <div className="space-y-6">
            {criterios.map((criterio, index) => (
              <motion.div
                key={criterio.text}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <criterio.icon className="w-6 h-6 text-dorado-medalla flex-shrink-0" />
                <span className="font-body text-lg text-blanco-sal">
                  {criterio.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <MiembroModal
        miembro={selectedMiembro}
        isOpen={!!selectedMiembro}
        onClose={() => setSelectedMiembro(null)}
      />
    </>
  );
};

export default HallOfFame;
