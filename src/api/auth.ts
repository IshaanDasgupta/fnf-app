import { ENDPOINTS } from "@/src/constants/endpoints";
import axiosClient from "@/src/lib/axios-client";

export interface SendOTPResponse {
  success: boolean;
}

export interface VerifyOTPResponse {
  user: {
    id: string;
    phone: string;
    name?: string;
    email?: string;
    age?: number;
    gender?: "male" | "female";
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
): Promise<VerifyOTPResponse> => {
  const { data } = await axiosClient.post<VerifyOTPResponse>(
    ENDPOINTS.AUTH.VERIFY_OTP,
    {
      phone,
      otp,
    },
  );

  return data;
};

export const refresh = async (
  refreshToken: string,
): Promise<VerifyOTPResponse> => {
  const { data } = await axiosClient.post<VerifyOTPResponse>(
    ENDPOINTS.AUTH.REFRESH,
    {
      refreshToken,
    },
  );

  return data;
};
