import { useQuery } from "@tanstack/react-query";
import { getNearestCoastData } from "../utils/tideApi";
import type { NearestCoastData } from "../types/types";

export function useTideData(lat: number | null, lng: number | null) {
  return useQuery<NearestCoastData | null>({
    queryKey: ["tideData", lat, lng],
    queryFn: () => {
      if (lat == null || lng == null) throw new Error("Missing coords");
      return getNearestCoastData(lat, lng);
    },
    enabled: lat != null && lng != null,
    staleTime: 1000 * 60 * 5,
  });
}
