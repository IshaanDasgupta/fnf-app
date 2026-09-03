import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import { getListings, GetListingsParams } from "@/src/api/listing";

const PAGE_SIZE = 20;

type UseListingsParams = Omit<
  GetListingsParams,
  "cursor" | "limit" | "latitude" | "longitude"
> & {
  latitude?: number;
  longitude?: number;
};

export function useListings({
  city,
  latitude,
  longitude,
  quickFilters = [],
}: UseListingsParams) {
  const hasLocation = latitude !== undefined && longitude !== undefined;

  return useInfiniteQuery({
    queryKey: ["listings", city, latitude, longitude, quickFilters],

    initialPageParam: undefined as string | undefined,

    enabled: hasLocation,

    queryFn: ({ pageParam }) =>
      getListings({
        city,
        latitude: latitude!,
        longitude: longitude!,
        cursor: pageParam,
        limit: PAGE_SIZE,
        quickFilters,
      }),

    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNext ? lastPage.pagination.nextCursor : undefined,

    placeholderData: keepPreviousData,
  });
}
