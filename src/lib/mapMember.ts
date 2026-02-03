import type { Tables } from "@/integrations/supabase/types";
import type { Miembro } from "@/types/miembro";

export function mapMember(row: Tables<"members">): Miembro {
  return {
    id: row.id,
    nombreCompleto: row.full_name,
    fechaNacimiento: row.date_of_birth ?? undefined,
    añoIngreso: row.year_joined ?? undefined,
    email: row.email ?? undefined,
    telefono: row.phone ?? undefined,
    fotoPerfil: row.photo_url ?? undefined,
    instagram: row.instagram ?? undefined,
    strava: row.strava ?? undefined,
    maratonesTotales: row.total_marathons,
    prMaraton: row.marathon_pr ?? undefined,
    añoPrMaraton: row.marathon_pr_year ?? undefined,
    ciudadPrMaraton: row.marathon_pr_city ?? undefined,
    vecesBoston: row.boston_count,
    prMedioMaraton: row.half_marathon_pr ?? undefined,
    pr10k: row.ten_k_pr ?? undefined,
    maratonesSub3: row.sub3_marathons,
    maratonMasCorrido: row.most_run_marathon ?? undefined,
    ciudadesMaratones: row.marathon_cities ?? undefined,
    otrasCiudadesMaratones: row.other_marathon_cities ?? undefined,
    bio: row.bio ?? undefined,
    fotoAutorizada: row.photo_authorized,
    tieneImagenPlaceholder: row.has_placeholder_photo,
    esLeyenda: row.is_legend,
  };
}
