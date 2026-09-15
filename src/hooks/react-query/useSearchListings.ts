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

      // filters
      filters.locality,
      filters.bhk,
      filters.occupancy,
      filters.furnishedStatus,
      filters.gender,
      filters.amenities,
      filters.addOns,
      filters.houseRules,
      filters.rentMin,
      filters.rentMax,
      filters.floorMin,
      filters.floorMax,
      filters.totalInitCostMin,
      filters.totalInitCostMax,
      filters.totalOccupancyMin,
      filters.totalOccupancyMax,
      filters.availableImmediately,
      filters.availableAfter,

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
