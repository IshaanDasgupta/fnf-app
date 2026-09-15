import { ENDPOINTS } from "@/src/constants/endpoints";
import axiosClient from "@/src/lib/axios-client";

export interface Locality {
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface GetLocalitiesResponse {
  success: boolean;
  data: Locality[];
}

export async function getLocalities({
  city,
}: {
  city: string;
}): Promise<GetLocalitiesResponse> {
  const { data } = await axiosClient.get<GetLocalitiesResponse>(
    ENDPOINTS.LOCALITY.ALL,
    {
      params: {
        city,
      },
    },
  );

  return data;
}
