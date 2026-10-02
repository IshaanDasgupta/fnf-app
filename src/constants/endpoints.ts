export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
export const ENDPOINTS = {
  AUTH: {
    SEND_OTP: "/auth/send-otp",
    VERIFY_OTP: "/auth/verify-otp",
    GOOGLE_LOGIN: "/auth/google-login",
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
    LOCALITIES: "/listing/localities",
    SEARCH: "/listing/search",
  },

  LOCALITY: {
    ALL: "/locality",
  },

  REDIRECT: "/redirect",
  TERMS: "/terms",
  PRIVACY: "/privacy",
} as const;
