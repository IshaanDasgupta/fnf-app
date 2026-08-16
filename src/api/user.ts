import { GenderPreference } from "@/src/constants/api-constants";
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
  title: string;
  coverImage: string;
  city: string;
  locality: string;
  rent: number;
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
