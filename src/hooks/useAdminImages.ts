import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SiteImage {
  id: string;
  section: "home" | "galeria";
  category: string | null;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
  created_at: string;
}

export function useSiteImages(section: "home" | "galeria") {
  return useQuery<SiteImage[]>({
    queryKey: ["site-images", section],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_images")
        .select("*")
        .eq("section", section)
        .order("sort_order")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as SiteImage[];
    },
  });
}

export function useCreateSiteImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (image: {
      section: "home" | "galeria";
      category?: string;
      image_url: string;
      alt_text?: string;
    }) => {
      const { data, error } = await supabase
        .from("site_images")
        .insert(image)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-images"] });
    },
  });
}

export function useDeleteSiteImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("site_images")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-images"] });
    },
  });
}
