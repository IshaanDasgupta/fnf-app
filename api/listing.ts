import { ENDPOINTS } from "@/constants/endpoints";
import axiosClient from "@/utils/axios-client";

export interface ListingCardResponse {
  id: string;
  title: string;
  coverImage?: string;

  address: {
    locality: string;
    city: string;
  };

  location: {
    latitude: number;
    longitude: number;
  };

  rent: number;

  bhk: string;
  occupancy?: string;

  availableFrom?: string;
  availableImmediately: boolean;

  tags: string[];

  favorite: boolean;
}

export interface GetListingsResponse {
  data: ListingCardResponse[];

  pagination: {
    nextCursor: string | null;
    hasNext: boolean;
  };
}

export interface GetListingsParams {
  city: string;
  latitude: number;
  longitude: number;

  cursor?: string;
  limit?: number;

  quickFilters?: string[];
}

export async function getListings({
  city,
  latitude,
  longitude,
  cursor,
  limit = 20,
  quickFilters = [],
}: GetListingsParams): Promise<GetListingsResponse> {
  const { data } = await axiosClient.get<GetListingsResponse>(
    ENDPOINTS.LISTING.ALL,
    {
      params: {
        city,
        latitude,
        longitude,
        cursor,
        limit,
        quickFilters:
          quickFilters.length > 0 ? quickFilters.join(",") : undefined,
      },
    },
  );

  return data;
}

export interface GetMapListingsParams {
  north: number;
  south: number;
  east: number;
  west: number;

  limit?: number;

  quickFilters?: string[];
}

export interface MapListingsResponse {
  id: string;

  location: {
    latitude: number;
    longitude: number;
  };

  rent: number;

  title: string;
  coverImage?: string;

  address: {
    locality: string;
    city: string;
  };

  bhk: string;
  occupancy?: string;

  favorite: boolean;
}

export interface GetMapListingsResponse {
  data: MapListingsResponse[];
  hasMore: boolean;
}

export async function getMapListings({
  north,
  south,
  east,
  west,
  limit = 200,
  quickFilters = [],
}: GetMapListingsParams): Promise<GetMapListingsResponse> {
  const { data } = await axiosClient.get<GetMapListingsResponse>(
    ENDPOINTS.LISTING.MAP,
    {
      params: {
        north,
        south,
        east,
        west,
        limit,
        quickFilters:
          quickFilters.length > 0 ? quickFilters.join(",") : undefined,
      },
    },
  );

  return data;
}

export interface PostFavouriteListingResponse {
  success: boolean;
  message: string;
}

export async function postFavouriteListing(
  listing_id: string,
  value: boolean,
): Promise<PostFavouriteListingResponse> {
  const { data } = await axiosClient.post<PostFavouriteListingResponse>(
    ENDPOINTS.LISTING.FAVOURITE,
    {
      listing_id,
      value,
    },
  );

  return data;
}
