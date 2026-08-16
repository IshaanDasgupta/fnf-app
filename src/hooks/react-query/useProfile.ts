import { useQuery } from "@tanstack/react-query";

import { getProfile } from "@/src/api/user";

export const PROFILE_QUERY_KEY = ["profile"];

export function useProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: getProfile,
    select: (response) => response.data,
  });
}
