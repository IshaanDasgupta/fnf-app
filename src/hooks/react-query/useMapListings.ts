import { useQuery } from "@tanstack/react-query";

import { getMapListings, GetMapListingsParams } from "@/src/api/listing";

export function useMapListings(params: GetMapListingsParams, enabled = true) {
  return useQuery({
    queryKey: [
      "map-listings",
      params.north,
      params.south,
      params.east,
      params.west,
      params.quickFilters,
    ],

    queryFn: () => getMapListings(params),

    enabled,

    placeholderData: (previousData) => previousData,

    select: (response) => response.data,
  });
}
