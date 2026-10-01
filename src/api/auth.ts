import { GenderPreference } from "@/src/constants/api-constants";
import { ENDPOINTS } from "@/src/constants/endpoints";
import axiosClient from "@/src/lib/axios-client";

export interface SendOTPResponse {
  success: boolean;
}

export interface AuthResponse {
  user: {
    id: string;
    phone: string;
    name?: string;
    email?: string;
    age?: number;
    gender?: GenderPreference;
    basicOnboardingCompleted: boolean;
  };
  accessToken: string;
  refreshToken: string;
  refreshExpiresAt: number;
}

export const sendOTP = async (phone: string): Promise<SendOTPResponse> => {
  const { data } = await axiosClient.post<SendOTPResponse>(
    ENDPOINTS.AUTH.SEND_OTP,
    {
      phone,
    },
  );

  return data;
};

export const verifyOTP = async (
  phone: string,
  otp: string,
): Promise<AuthResponse> => {
  const { data } = await axiosClient.post<AuthResponse>(
    ENDPOINTS.AUTH.VERIFY_OTP,
    {
      phone,
      otp,
    },
  );

  return data;
};

export const googleLogin = async (idToken: string): Promise<AuthResponse> => {
  const { data } = await axiosClient.post<AuthResponse>(
    ENDPOINTS.AUTH.GOOGLE_LOGIN,
    {
      idToken,
    },
  );

  return data;
};

export const refresh = async (refreshToken: string): Promise<AuthResponse> => {
  const { data } = await axiosClient.post<AuthResponse>(
    ENDPOINTS.AUTH.REFRESH,
    {
      refreshToken,
    },
  );

  return data;
};
