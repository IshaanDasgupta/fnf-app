import {
  AddOnType,
  AmenityType,
  BhkType,
  City,
  FurnishedStatus,
  GenderPreference,
  HouseRuleType,
  ListingStatus,
  NeighborhoodType,
  RentalScopeType,
  ServiceType,
} from "@/src/constants/api-constants";
import { ENDPOINTS } from "@/src/constants/endpoints";
import axiosClient from "@/src/lib/axios-client";

export interface RentalScope {
  type: RentalScopeType;
  capacity: number;
  totalOccupancy: number;
}

export type CapacityFilter = "1" | "2" | "3plus";

export interface FilterValues {
  locality?: string;

  bhk: BhkType[];
  capacity: CapacityFilter[];
  rentalType: RentalScopeType[];
  furnishedStatus: FurnishedStatus[];

  rentMin?: number;
  rentMax?: number;

  totalInitCostMin?: number;
  totalInitCostMax?: number;

  floorMin?: number;
  floorMax?: number;

  totalOccupancyMin?: number;
  totalOccupancyMax?: number;

  attachedWashroom?: boolean;

  gender?: GenderPreference;

  availableImmediately?: boolean;
  availableAfter?: Date;

  addOns: AddOnType[];
  amenities: AmenityType[];
  houseRules: HouseRuleType[];
  services: ServiceType[];
}

function serializeFilters(filters: FilterValues) {
  return {
    locality: filters.locality,

    bhk: filters.bhk.length > 0 ? filters.bhk.join(",") : undefined,

    capacity:
      filters.capacity.length > 0 ? filters.capacity.join(",") : undefined,

    rentalType:
      filters.rentalType.length > 0 ? filters.rentalType.join(",") : undefined,

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

    attachedWashroom:
      filters.attachedWashroom !== undefined
        ? String(filters.attachedWashroom)
        : undefined,

    gender: filters.gender,

    availableImmediately: filters.availableImmediately ? "true" : undefined,

    availableAfter: filters.availableAfter?.toISOString(),

    addOns: filters.addOns.length > 0 ? filters.addOns.join(",") : undefined,

    amenities:
      filters.amenities.length > 0 ? filters.amenities.join(",") : undefined,

    houseRules:
      filters.houseRules.length > 0 ? filters.houseRules.join(",") : undefined,

    services:
      filters.services.length > 0 ? filters.services.join(",") : undefined,
  };
}

export interface ListingCardResponse {
  id: string;
  coverImage: string;

  address: {
    locality: string;
    city: City;
  };

  rent: number;

  bhk: BhkType;
  rentalScope: RentalScope;

  furnishedStatus: FurnishedStatus;

  genderPreference?: GenderPreference;

  availableFrom?: string;
  availableImmediately: boolean;

  favorite: boolean;
}

export interface GetListingsResponse {
  success: boolean;
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

  coverImage: string;

  address: {
    locality: string;
    city: City;
  };

  bhk: BhkType;
  rentalScope: RentalScope;
  furnishedStatus: FurnishedStatus;

  genderPreference?: GenderPreference;

  favorite: boolean;
}

export interface GetMapListingsResponse {
  success: boolean;
  data: MapListingsResponse[];
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

  attachedWashroom?: boolean;

  status: ListingStatus;

  address: {
    locality: string;
    city: City;
    address: string;
  };

  location: {
    latitude: number;
    longitude: number;
  };

  genderPreference?: GenderPreference;

  bhk: BhkType;
  rentalScope: RentalScope;

  furnishedStatus: FurnishedStatus;

  floor?: number;

  services: {
    type: ServiceType;
    desc?: string;
    price?: number;
    included: boolean;
  }[];

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
  moveInCharges?: number;

  availableFrom?: string;
  availableImmediately: boolean;

  nearbyPlaces: {
    type: NeighborhoodType;
    name: string;
    distance: number;
  }[];

  views: number;
  favorites: number;

  favorite: boolean;

  listerId?: string;

  externalListing?: {
    source: string;
    url: string;
    author: string;
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

export type SortBy = "distance" | "rent" | "creation_date" | "favorites" | "views";
export type SortOrder = "asc" | "desc";

export interface GetSearchListingsParams extends FilterValues {
  city: City;
  latitude: number;
  longitude: number;

  cursor?: string;
  limit?: number;

  sortBy: SortBy;
  sortOrder: SortOrder;
}

export interface SearchListingsResponse {
  success: boolean;
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
