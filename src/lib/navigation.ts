import { type Href, router, useRouter } from "expo-router";

export type AppRoute =
  | "/"
  | "/splash"
  | "/login"
  | "/phone-number"
  | "/basic"
  | "/step2"
  | "/step3"
  | "/step4"
  | "/home"
  | "/map"
  | "/profile"
  | "/settings/profile-basic-edit"
  | `/property/${string}`
  | "/permissions"
  | "/filters"
  | "/search";

export const navigation = {
  splash: "/splash" as Href,
  login: "/login" as Href,
  phone_number: "/phone-number" as Href,
  filters: "/filters" as Href,
  search: "/search" as Href,
  searchWithQuery: (q: string) => `/search?q=${encodeURIComponent(q)}` as Href,
  onboarding: {
    basic: "/basic" as Href,
    step2: "/step2" as Href,
    step3: "/step3" as Href,
    step4: "/step4" as Href,
  },
  tabs: {
    home: "/home" as Href,
    map: "/map" as Href,
    profile: "/profile" as Href,
  },
  settings: {
    profileBasicEdit: "/settings/profile-basic-edit" as Href,
  },
  property: (id: string) => `/property/${id}` as Href,
  permissions: "/permissions" as Href,
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
