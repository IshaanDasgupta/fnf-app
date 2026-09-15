import {
  AddOnType,
  AmenityType,
  BhkType,
  City,
  FurnishedStatus,
  GenderPreference,
  HouseRuleType,
  NeighborhoodType,
  OccupancyType,
} from "@/src/constants/api-constants";
import { ENDPOINTS } from "@/src/constants/endpoints";
import axiosClient from "@/src/lib/axios-client";

export interface FilterValues {
  locality?: string;

  bhk: BhkType[];
  occupancy: OccupancyType[];
  furnishedStatus: FurnishedStatus[];

  rentMin?: number;
  rentMax?: number;

  totalInitCostMin?: number;
  totalInitCostMax?: number;

  floorMin?: number;
  floorMax?: number;

  totalOccupancyMin?: number;
  totalOccupancyMax?: number;

  gender?: GenderPreference;

  availableImmediately?: boolean;
  availableAfter?: Date;

  addOns: AddOnType[];
  amenities: AmenityType[];
  houseRules: HouseRuleType[];
}

function serializeFilters(filters: FilterValues) {
  return {
    locality: filters.locality,

    bhk: filters.bhk.length > 0 ? filters.bhk.join(",") : undefined,

    occupancy:
      filters.occupancy.length > 0 ? filters.occupancy.join(",") : undefined,

    furnishedStatus:
      filters.furnishedStatus.length > 0
        ? filters.furnishedStatus.join(",")
        : undefined,

    rentMin: filters.rentMin,
    rentMax: filters.rentMax,

    totalInitCostMin: filters.totalInitCostMin,
    totalInitCostMax: filters.totalInitCostMax,

    floorMin: filters.floorMin,
    floorMax: filters.floorMax,

    totalOccupancyMin: filters.totalOccupancyMin,
    totalOccupancyMax: filters.totalOccupancyMax,

    gender: filters.gender,

    availableImmediately:
      filters.availableImmediately !== undefined
        ? String(filters.availableImmediately)
        : undefined,

    availableAfter: filters.availableAfter?.toISOString(),

    addOns: filters.addOns.length > 0 ? filters.addOns.join(",") : undefined,

    amenities:
      filters.amenities.length > 0 ? filters.amenities.join(",") : undefined,

    houseRules:
      filters.houseRules.length > 0 ? filters.houseRules.join(",") : undefined,
  };
}

export interface ListingCardResponse {
  id: string;
  coverImage: string;

  address: {
    locality: string;
    city: City;
  };

  totalOccupancy?: number;
  furnishedStatus: FurnishedStatus;

  genderPreference: GenderPreference;

  rent: number;

  bhk: BhkType;
  occupancy: OccupancyType;

  availableFrom?: string;
  availableImmediately: boolean;

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

export interface GetMapListingsParams extends FilterValues {
  north: number;
  south: number;
  east: number;
  west: number;
  limit?: number;
}

export interface MapListingsResponse {
  id: string;

  location: {
    latitude: number;
    longitude: number;
  };

  rent: number;

  totalOccupancy?: number;
  furnishedStatus: FurnishedStatus;

  genderPreference: GenderPreference;
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
  ...filters
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
        ...serializeFilters(filters),
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

export interface ListingResponse {
  id: string;

  images: string[];
  coverImage: string;

  carpetArea?: number;

  status: string;

  address: {
    locality: string;
    city: City;
    address: string;
  };

  location: {
    latitude: number;
    longitude: number;
  };

  genderPreference: GenderPreference;

  bhk: BhkType;
  occupancy: OccupancyType;
  totalOccupancy?: number;

  furnishedStatus: FurnishedStatus;

  floor?: number;

  addOns: {
    type: AddOnType;
    desc?: string;
  }[];

  amenities: {
    type: AmenityType;
    desc?: string;
  }[];

  houseRules: {
    type: HouseRuleType;
    desc?: string;
  }[];

  rent: number;
  deposit?: number;
  brokerage?: number;
  setupCost?: number;

  availableFrom?: string;
  availableImmediately: boolean;

  neighborhood: {
    type: NeighborhoodType;
    distance: number;
  }[];

  views: number;
  favorites: number;

  favorite: boolean;

  lister?: {
    name: string;
    age?: number;
    profilePic?: string;
    contactNumber?: string;
    lifestyle: string[];
  };

  externalListing?: {
    source: string;
    url: string;
  };
}

export interface GetListingResponse {
  success: boolean;
  data: ListingResponse;
}

export async function getListing(
  listingId: string,
): Promise<GetListingResponse> {
  const { data } = await axiosClient.get<GetListingResponse>(
    ENDPOINTS.LISTING.DETAILS(listingId),
  );

  return data;
}

export interface GetSearchListingsParams extends FilterValues {
  city: City;
  latitude: number;
  longitude: number;

  cursor?: string;
  limit?: number;

  sortBy: "distance" | "rent" | "creation_date" | "favorites" | "views";
  sortOrder: "asc" | "desc";
}

export interface SearchListingsResponse {
  data: ListingCardResponse[];

  pagination: {
    nextCursor: string | null;
    hasNext: boolean;
  };
}

export async function getSearchListings({
  city,
  latitude,
  longitude,
  cursor,
  limit = 20,
  sortBy,
  sortOrder,
  ...filters
}: GetSearchListingsParams): Promise<SearchListingsResponse> {
  const { data } = await axiosClient.get<SearchListingsResponse>(
    ENDPOINTS.LISTING.SEARCH,
    {
      params: {
        city,
        latitude,
        longitude,
        cursor,
        limit,
        sortBy,
        sortOrder,
        ...serializeFilters(filters),
      },
    },
  );

  return data;
}
