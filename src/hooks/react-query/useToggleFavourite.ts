import { useMutation, useQueryClient } from "@tanstack/react-query";

import { putFavouriteListing } from "@/src/api/listing";

interface ToggleFavouriteInput {
  listingId: string;
  value: boolean;
}

export function useToggleFavourite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ listingId, value }: ToggleFavouriteInput) =>
      putFavouriteListing(listingId, value),

    onSuccess: (_, { listingId, value }) => {
      // Listing detail
      queryClient.setQueryData(["listing", listingId], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          data: {
            ...old.data,
            favorite: value,
          },
        };
      });

      // Home listings
      queryClient.setQueriesData({ queryKey: ["listings"] }, (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.map((listing: any) =>
              listing.id === listingId
                ? { ...listing, favorite: value }
                : listing,
            ),
          })),
        };
      });

      // Search listings
      queryClient.setQueriesData(
        { queryKey: ["search-listings"] },
        (old: any) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page: any) => ({
              ...page,
              data: page.data.map((listing: any) =>
                listing.id === listingId
                  ? { ...listing, favorite: value }
                  : listing,
              ),
            })),
          };
        },
      );

      // Map listings
      queryClient.setQueriesData({ queryKey: ["map-listings"] }, (old: any) => {
        if (!old) return old;

        return {
          ...old,
          data: old.data.map((listing: any) =>
            listing.id === listingId
              ? { ...listing, favorite: value }
              : listing,
          ),
        };
      });

      // Profile
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
}
