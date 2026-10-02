import {
  BhkType,
  City,
  FurnishedStatus,
  GenderPreference,
} from "@/src/constants/api-constants";
import { ENDPOINTS } from "@/src/constants/endpoints";
import axiosClient from "@/src/lib/axios-client";
import { RentalScope } from "@/src/api/listing";

export interface UpsertBasicRequest {
  name: string;
  age: number;
  gender: GenderPreference;
}

export interface UpsertBasicResponse {
  id: string;
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
  rentalScope: RentalScope;

  furnishedStatus: FurnishedStatus;

  genderPreference?: GenderPreference;

  availableFrom?: string;
  availableImmediately: boolean;
}

export interface ProfileResponse {
  id: string;
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
