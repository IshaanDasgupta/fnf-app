import { BhkType, City, OccupancyType } from "@/constants/api-constants";
import { ENDPOINTS } from "@/constants/endpoints";
import axiosClient from "@/lib/axios-client";

export interface ListingCardResponse {
  id: string;
  title: string;
  coverImage: string;

  address: {
    locality: string;
    city: City;
  };

  location: {
    latitude: number;
    longitude: number;
  };

  rent: number;

  bhk: BhkType;
  occupancy: OccupancyType;

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
  city: City;
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
  coverImage: string;

  address: {
    locality: string;
    city: City;
  };

  bhk: BhkType;
  occupancy: OccupancyType;

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

export interface ToggleFavouriteListingResponse {
  success: boolean;
  data: {
    favorite: boolean;
  };
}

export async function putFavouriteListing(
  listingId: string,
  value: boolean,
): Promise<ToggleFavouriteListingResponse> {
  const { data } = await axiosClient.put<ToggleFavouriteListingResponse>(
    ENDPOINTS.LISTING.FAVOURITE,
    {
      listingId,
      value,
    },
  );

  return data;
}
