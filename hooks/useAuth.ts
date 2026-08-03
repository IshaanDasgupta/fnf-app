import { useEffect } from "react";

import { useAuthStore } from "@/stores/auth";

export function useAuth() {
  const {
    accessToken,
    expiresAt,
    logout,
    basicOnboardingCompleted,
    isHydrated,
    user,
  } = useAuthStore();

  const isAuthenticated =
    !!accessToken && !!expiresAt && Date.now() < expiresAt;

  useEffect(() => {
    if (accessToken && expiresAt && Date.now() >= expiresAt) {
      logout();
    }
  }, [accessToken, expiresAt, logout]);

  return {
    user,
    isAuthenticated,
    basicOnboardingCompleted,
    isHydrated,
  };
}
