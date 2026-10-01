import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import { getSearchListings, GetSearchListingsParams } from "@/src/api/listing";

const PAGE_SIZE = 20;

type UseSearchListingsParams = Omit<
  GetSearchListingsParams,
  "cursor" | "limit" | "latitude" | "longitude"
> & {
  latitude?: number;
  longitude?: number;
};

export function useSearchListings({
  city,
  latitude,
  longitude,
  sortBy,
  sortOrder,
  ...filters
}: UseSearchListingsParams) {
  const hasLocation = latitude !== undefined && longitude !== undefined;

  return useInfiniteQuery({
    queryKey: [
      "search-listings",
      city,
      latitude,
      longitude,

      // filters (serialized to match wire format for stable keys)
      filters.locality,
      filters.bhk.length > 0 ? filters.bhk.join(",") : undefined,
      filters.capacity.length > 0 ? filters.capacity.join(",") : undefined,
      filters.rentalType.length > 0 ? filters.rentalType.join(",") : undefined,
      filters.furnishedStatus.length > 0
        ? filters.furnishedStatus.join(",")
        : undefined,
      filters.gender,
      filters.amenities.length > 0 ? filters.amenities.join(",") : undefined,
      filters.addOns.length > 0 ? filters.addOns.join(",") : undefined,
      filters.houseRules.length > 0 ? filters.houseRules.join(",") : undefined,
      filters.services.length > 0 ? filters.services.join(",") : undefined,
      filters.rentMin,
      filters.rentMax,
      filters.floorMin,
      filters.floorMax,
      filters.totalInitCostMin,
      filters.totalInitCostMax,
      filters.totalOccupancyMin,
      filters.totalOccupancyMax,
      filters.attachedWashroom,
      filters.availableImmediately ? "true" : undefined,
      filters.availableAfter?.toISOString(),

      // sorting
      sortBy,
      sortOrder,
    ],

    initialPageParam: undefined as string | undefined,

    enabled: hasLocation && city !== undefined,

    queryFn: ({ pageParam }) =>
      getSearchListings({
        city: city!,
        latitude: latitude!,
        longitude: longitude!,
        cursor: pageParam,
        limit: PAGE_SIZE,
        sortBy,
        sortOrder,
        ...filters,
      }),

    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNext ? lastPage.pagination.nextCursor : undefined,

    placeholderData: keepPreviousData,
  });
}
