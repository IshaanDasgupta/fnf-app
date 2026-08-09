import { useEffect } from "react";

import { useAuthStore } from "@/stores/auth";

export function useAuth() {
  const {
    accessToken,
    refreshExpiresAt,
    logout,
    basicOnboardingCompleted,
    isHydrated,
    user,
  } = useAuthStore();

  const isAuthenticated =
    !!accessToken && !!refreshExpiresAt && Date.now() < refreshExpiresAt;

  useEffect(() => {
    if (refreshExpiresAt && Date.now() >= refreshExpiresAt) {
      logout();
    }
  }, [accessToken, refreshExpiresAt, logout]);

  return {
    user,
    isAuthenticated,
    basicOnboardingCompleted,
    isHydrated,
  };
}
