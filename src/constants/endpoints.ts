// import "dotenv/config";

// export const API_BASE_URL = process.env.API_BASE_URL;
export const API_BASE_URL = "http://192.168.1.6:5000";
export const ENDPOINTS = {
  AUTH: {
    SEND_OTP: "/auth/send-otp",
    VERIFY_OTP: "/auth/verify-otp",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
  },

  USER: {
    PROFILE: "/user/profile",
    UPSERT_BASIC: "/user/upsert-basic",
  },

  LISTING: {
    ALL: "/listing",
    MAP: "/listing/map",
    DETAILS: (id: string) => `/listing/${id}`,
    FAVOURITE: `/listing/fav`,
  },
} as const;
