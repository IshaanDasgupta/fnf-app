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
      params.bhk.length > 0 ? params.bhk.join(",") : undefined,
      params.capacity.length > 0 ? params.capacity.join(",") : undefined,
      params.rentalType.length > 0 ? params.rentalType.join(",") : undefined,
      params.furnishedStatus.length > 0
        ? params.furnishedStatus.join(",")
        : undefined,
      params.gender,
      params.amenities.length > 0 ? params.amenities.join(",") : undefined,
      params.addOns.length > 0 ? params.addOns.join(",") : undefined,
      params.houseRules.length > 0 ? params.houseRules.join(",") : undefined,
      params.services.length > 0 ? params.services.join(",") : undefined,
      params.rentMin,
      params.rentMax,
      params.floorMin,
      params.floorMax,
      params.totalInitCostMin,
      params.totalInitCostMax,
      params.totalOccupancyMin,
      params.totalOccupancyMax,
      params.attachedWashroom,
      params.availableImmediately ? "true" : undefined,
      params.availableAfter?.toISOString(),
    ],

    queryFn: () => getMapListings(params),

    enabled,

    placeholderData: (previousData) => previousData,

    select: (response) => response.data,
  });
}
