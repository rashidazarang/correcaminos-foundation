import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mapMember } from "@/lib/mapMember";
import { marathonCityCoords } from "@/lib/marathonCityCoords";

const STALE_TIME = 5 * 60 * 1000;

export function useMembers() {
  return useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .order("full_name");
      if (error) throw error;
      return data.map(mapMember);
    },
    staleTime: STALE_TIME,
  });
}

export function useLegends() {
  return useQuery({
    queryKey: ["members", "legends"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .eq("is_legend", true)
        .order("total_marathons", { ascending: false })
        .order("marathon_pr", { ascending: true });
      if (error) throw error;
      return data.map(mapMember);
    },
    staleTime: STALE_TIME,
  });
}

export interface ClubStats {
  totalMarathons: number;
  memberCount: number;
  distinctCities: number;
  bostonFinishes: number;
  yearsOfHistory: number;
  sub3Members: number;
  earliestYear: number;
}

export function useClubStats() {
  return useQuery({
    queryKey: ["members", "stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("members")
        .select("total_marathons, boston_count, sub3_marathons, marathon_cities, year_joined");
      if (error) throw error;

      const citySet = new Set<string>();
      let totalMarathons = 0;
      let bostonFinishes = 0;
      let sub3Members = 0;
      let earliestYear = new Date().getFullYear();

      for (const row of data) {
        totalMarathons += row.total_marathons;
        bostonFinishes += row.boston_count;
        if (row.sub3_marathons > 0) sub3Members++;
        if (row.year_joined != null && row.year_joined < earliestYear) {
          earliestYear = row.year_joined;
        }
        if (row.marathon_cities) {
          for (const city of row.marathon_cities) citySet.add(city);
        }
      }

      const currentYear = new Date().getFullYear();

      return {
        totalMarathons,
        memberCount: data.length,
        distinctCities: citySet.size,
        bostonFinishes,
        yearsOfHistory: currentYear - earliestYear,
        sub3Members,
        earliestYear,
      } satisfies ClubStats;
    },
    staleTime: STALE_TIME,
  });
}

export interface MarathonCityPin {
  name: string;
  displayName: string;
  lat: number;
  lng: number;
  memberCount: number;
}

export function useMarathonCities() {
  return useQuery({
    queryKey: ["members", "marathon-cities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("members")
        .select("marathon_cities");
      if (error) throw error;

      const counts = new Map<string, number>();
      for (const row of data) {
        if (row.marathon_cities) {
          for (const city of row.marathon_cities) {
            counts.set(city, (counts.get(city) ?? 0) + 1);
          }
        }
      }

      const pins: MarathonCityPin[] = [];
      for (const [name, memberCount] of counts) {
        const coords = marathonCityCoords[name];
        if (coords) {
          pins.push({ name, displayName: coords.displayName, lat: coords.lat, lng: coords.lng, memberCount });
        }
      }
      return pins;
    },
    staleTime: STALE_TIME,
  });
}
