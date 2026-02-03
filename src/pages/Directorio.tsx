import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { useMembers } from "@/hooks/useMembers";
import { Miembro } from "@/types/miembro";
import { MiembroModal } from "@/components/MiembroModal";
import { Skeleton } from "@/components/ui/skeleton";
import { RunnerPlaceholder } from "@/components/RunnerPlaceholder";
import heroImage from "@/assets/hero-directorio.webp";

const MiembroCard = ({
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      onClick={onClick}
      className="bg-white p-6 cursor-pointer transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
    >
      <div className="text-center">
        {/* Photo */}
        {miembro.fotoPerfil ? (
          <img
            src={miembro.fotoPerfil}
            alt={miembro.nombreCompleto}
            className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full object-cover mx-auto mb-4 border-2 border-crema-jersey"
          />
        ) : (
          <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full overflow-hidden mx-auto mb-4 border-2 border-crema-jersey">
            <RunnerPlaceholder size={150} />
          </div>
        )}

        <h3 className="font-display text-lg text-foreground mb-1">
          {miembro.nombreCompleto}
        </h3>
        <p className="font-body text-sm text-gris-humo mb-4">
          Miembro desde {miembro.añoIngreso}
        </p>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gris-calzada/20 mb-4" />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="flex items-center gap-2">
            <span>🏃</span>
            <span className="font-body text-sm text-foreground">
              {miembro.maratonesTotales} maratones
            </span>
          </div>
          {miembro.prMaraton && (
            <div className="flex items-center gap-2">
              <span>⏱️</span>
              <span className="font-mono text-sm text-primary">
                {miembro.prMaraton}
              </span>
            </div>
          )}
          {miembro.vecesBoston > 0 && (
            <div className="flex items-center gap-2 col-span-2">
              <span>🏆</span>
              <span className="font-body text-sm text-foreground">
                {miembro.vecesBoston}x Boston
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const MiembroCardSkeleton = () => (
  <div className="bg-white p-6">
    <div className="text-center">
      <Skeleton className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full mx-auto mb-4" />
      <Skeleton className="h-5 w-32 mx-auto mb-2" />
      <Skeleton className="h-4 w-24 mx-auto mb-4" />
      <div className="w-full h-[1px] bg-gris-calzada/20 mb-4" />
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  </div>
);

const Directorio = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("todos");
  const [marathonFilter, setMarathonFilter] = useState<string>("todos");
  const [selectedMiembro, setSelectedMiembro] = useState<Miembro | null>(null);

  const { data: miembros = [], isLoading, isError } = useMembers();

  const years = useMemo(() => {
    const uniqueYears = [...new Set(miembros.map((m) => m.añoIngreso).filter((y): y is number => y != null))].sort(
      (a, b) => b - a
    );
    return uniqueYears;
  }, [miembros]);

  const filteredMiembros = useMemo(() => {
    return miembros.filter((miembro) => {
      // Search filter
      if (
        searchTerm &&
        !miembro.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Year filter
      if (yearFilter !== "todos" && miembro.añoIngreso !== parseInt(yearFilter)) {
        return false;
      }

      // Marathon filter
      if (marathonFilter !== "todos") {
        const marathons = miembro.maratonesTotales;
        switch (marathonFilter) {
          case "1-10":
            if (marathons < 1 || marathons > 10) return false;
            break;
          case "11-25":
            if (marathons < 11 || marathons > 25) return false;
            break;
          case "26-50":
            if (marathons < 26 || marathons > 50) return false;
            break;
          case "50+":
            if (marathons <= 50) return false;
            break;
        }
      }

      return true;
    });
  }, [miembros, searchTerm, yearFilter, marathonFilter]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full overflow-hidden flex items-center justify-center">
        <img src={heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: 'hsl(0 0% 10% / 0.7)' }} />
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl text-blanco-sal font-medium tracking-tight"
          >
            DIRECTORIO
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 font-body text-lg md:text-xl text-blanco-sal/70"
          >
            Nuestra Comunidad
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-16 md:top-20 z-30 bg-blanco-sal shadow-subtle">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gris-humo" />
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-transparent border border-gris-calzada/30 text-foreground font-body focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            {/* Year Filter */}
            <div className="relative">
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="appearance-none w-full md:w-48 px-4 py-3 pr-10 bg-transparent border border-gris-calzada/30 text-foreground font-body focus:border-primary focus:outline-none cursor-pointer"
              >
                <option value="todos">Año: Todos</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gris-humo pointer-events-none" />
            </div>

            {/* Marathon Filter */}
            <div className="relative">
              <select
                value={marathonFilter}
                onChange={(e) => setMarathonFilter(e.target.value)}
                className="appearance-none w-full md:w-48 px-4 py-3 pr-10 bg-transparent border border-gris-calzada/30 text-foreground font-body focus:border-primary focus:outline-none cursor-pointer"
              >
                <option value="todos">Maratones: Todos</option>
                <option value="1-10">1-10</option>
                <option value="11-25">11-25</option>
                <option value="26-50">26-50</option>
                <option value="50+">50+</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gris-humo pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Members Grid */}
      <section className="bg-blanco-sal py-12 md:py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <MiembroCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-16">
              <p className="font-body text-lg text-gris-humo">
                Error al cargar los miembros. Intenta de nuevo más tarde.
              </p>
            </div>
          ) : filteredMiembros.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredMiembros.map((miembro, index) => (
                <MiembroCard
                  key={miembro.id}
                  miembro={miembro}
                  onClick={() => setSelectedMiembro(miembro)}
                  delay={index * 0.05}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-body text-lg text-gris-humo">
                No se encontraron miembros con esos filtros.
              </p>
            </div>
          )}
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

export default Directorio;
