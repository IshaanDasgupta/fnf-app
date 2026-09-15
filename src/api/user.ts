import {
  BhkType,
  City,
  FurnishedStatus,
  GenderPreference,
  OccupancyType,
} from "@/src/constants/api-constants";
import { ENDPOINTS } from "@/src/constants/endpoints";
import axiosClient from "@/src/lib/axios-client";

export interface UpsertBasicRequest {
  name: string;
  age: number;
  gender: "male" | "female";
}

export interface UpsertBasicResponse {
  id: string;
  phone: string;
  name: string;
  email: string;
  age: number;
  gender: GenderPreference;
}

export interface PutUpsertBasicResponse {
  success: boolean;
  data: UpsertBasicResponse;
}

export interface ProfileListingResponse {
  id: string;

  coverImage: string;

  address: {
    locality: string;
    city: City;
  };

  rent: number;

  bhk: BhkType;
  occupancy: OccupancyType;

  totalOccupancy?: number;

  furnishedStatus: FurnishedStatus;

  genderPreference: GenderPreference;

  availableFrom?: string;
  availableImmediately: boolean;
}

export interface ProfileResponse {
  id: string;
  phone: string;
  name: string;
  email: string;
  age: number;
  gender: GenderPreference;
  favorite_listings: ProfileListingResponse[];
}

export interface GetProfileResponse {
  success: boolean;
  data: ProfileResponse;
}

export const upsertBasic = async (
  input: UpsertBasicRequest,
): Promise<PutUpsertBasicResponse> => {
  const { data } = await axiosClient.put<PutUpsertBasicResponse>(
    ENDPOINTS.USER.UPSERT_BASIC,
    input,
  );

  return data;
};

export const getProfile = async (): Promise<GetProfileResponse> => {
  const { data } = await axiosClient.get<GetProfileResponse>(
    ENDPOINTS.USER.PROFILE,
  );

  return data;
};
