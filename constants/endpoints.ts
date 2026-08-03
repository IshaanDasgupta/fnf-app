export const API_BASE_URL = "http://192.168.1.12:5000";

export const ENDPOINTS = {
  AUTH: {
    SEND_OTP: "/auth/send-otp",
    VERIFY_OTP: "/auth/verify-otp",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
  },

  USER: {
    PROFILE: "/user/profile",
  },

  LISTING: {
    ALL: "/listing",
    DETAILS: (id: string) => `/listing/${id}`,
    SAVE: (id: string) => `/listing/${id}/save`,
  },
} as const;
