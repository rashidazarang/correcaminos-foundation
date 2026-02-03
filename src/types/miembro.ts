export interface Miembro {
  id: string;
  nombreCompleto: string;
  fechaNacimiento?: string;
  añoIngreso?: number;
  email?: string;
  telefono?: string;
  fotoPerfil?: string;
  instagram?: string;
  strava?: string;
  maratonesTotales: number;
  prMaraton?: string;
  añoPrMaraton?: number;
  ciudadPrMaraton?: string;
  vecesBoston?: number;
  prMedioMaraton?: string;
  pr10k?: string;
  maratonesSub3?: number;
  maratonMasCorrido?: string;
  ciudadesMaratones?: string[];
  otrasCiudadesMaratones?: string;
  bio?: string;
  fotoAutorizada?: boolean;
  tieneImagenPlaceholder?: boolean;
  esLeyenda?: boolean;
}
