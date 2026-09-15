import { type Href, router, useRouter } from "expo-router";

export type AppRoute =
  | "/"
  | "/splash"
  | "/login"
  | "/phone-number"
  | "/otp"
  | "/basic"
  | "/step2"
  | "/step3"
  | "/step4"
  | "/home"
  | "/map"
  | "/profile"
  | "/profile-basic-edit"
  | `/property/${string}`
  | "/permissions"
  | "/filters"
  | "/search"
  | "/city-selection"
  | "/not-found";

export const navigation = {
  splash: "/splash" as const,

  auth: {
    login: "/login" as const,
    phone_number: "/phone-number" as const,
    otp: "/otp" as const,
  },

  searchFilter: {
    filters: "/filters" as const,
    search: "/search" as const,
    searchWithQuery: (q: string) =>
      `/search?q=${encodeURIComponent(q)}` as const,
  },

  onboarding: {
    basic: "/basic" as const,
    step2: "/step2" as const,
    step3: "/step3" as const,
    step4: "/step4" as const,
  },

  tabs: {
    home: "/home" as const,
    map: "/map" as const,
    profile: "/profile" as const,
  },

  settings: {
    profileBasicEdit: "/profile-basic-edit" as const,
  },

  property: (id: string) => `/property/${id}` as const,

  standalone: {
    permissions: "/permissions" as const,
    citySelection: "/city-selection" as const,
    notFound: "/not-found" as const,
  },
} as const;

export function useAppRouter() {
  return useRouter();
}

export function replaceTo(path: Href) {
  router.replace(path);
}

export function pushTo(path: Href) {
  router.push(path);
}
