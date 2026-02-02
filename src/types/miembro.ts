export interface Miembro {
  id: string;
  nombreCompleto: string;
  añoIngreso: number;
  fotoPerfil: string;
  maratonesTotales: number;
  prMaraton?: string;
  añoPrMaraton?: number;
  ciudadPrMaraton?: string;
  vecesBoston?: number;
  prMedioMaraton?: string;
  pr10k?: string;
  ciudadesMaratones?: string[];
  maratonesSub3?: number;
  instagram?: string;
  strava?: string;
  esLeyenda?: boolean;
}
