import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type GearRow = Database["public"]["Tables"]["gear_products"]["Row"];
type GearInsert = Database["public"]["Tables"]["gear_products"]["Insert"];
type GearUpdate = Database["public"]["Tables"]["gear_products"]["Update"];

// Public: fetch all active products
export function useGearProducts() {
  return useQuery<GearRow[]>({
    queryKey: ["gear-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gear_products")
        .select("*")
        .eq("active", true)
        .order("sort_order")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

// Public: fetch single active product by slug
export function useGearProduct(slug: string) {
  return useQuery<GearRow | null>({
    queryKey: ["gear-product", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gear_products")
        .select("*")
        .eq("slug", slug)
        .eq("active", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
}

// Admin: fetch ALL products
export function useAdminGearProducts() {
  return useQuery<GearRow[]>({
    queryKey: ["admin-gear-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gear_products")
        .select("*")
        .order("sort_order")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateGearProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: GearInsert) => {
      const { data, error } = await supabase
        .from("gear_products")
        .insert(product)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gear-products"] });
      queryClient.invalidateQueries({ queryKey: ["gear-products"] });
    },
  });
}

export function useUpdateGearProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: GearUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from("gear_products")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gear-products"] });
      queryClient.invalidateQueries({ queryKey: ["gear-products"] });
      queryClient.invalidateQueries({ queryKey: ["gear-product"] });
    },
  });
}

export function useDeleteGearProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("gear_products")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gear-products"] });
      queryClient.invalidateQueries({ queryKey: ["gear-products"] });
    },
  });
}
