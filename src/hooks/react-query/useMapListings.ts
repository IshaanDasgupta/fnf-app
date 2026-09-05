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
      params.locality,
      params.bhk,
      params.occupancy,
      params.furnishedStatus,
      params.gender,
      params.amenities,
      params.addOns,
      params.houseRules,
      params.rentMin,
      params.rentMax,
      params.floorMin,
      params.floorMax,
      params.totalInitCostMin,
      params.totalInitCostMax,
      params.totalOccupancyMin,
      params.totalOccupancyMax,
      params.availableImmediately,
      params.availableAfter,
    ],

    queryFn: () => getMapListings(params),

    enabled,

    placeholderData: (previousData) => previousData,

    select: (response) => response.data,
  });
}
