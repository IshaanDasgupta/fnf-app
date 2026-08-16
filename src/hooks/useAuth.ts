import { useEffect } from "react";

import { useAuthStore } from "@/src/stores/auth";

export function useAuth() {
  const { accessToken, refreshExpiresAt, logout, isHydrated, user } =
    useAuthStore();

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
    basicOnboardingCompleted: user?.basicOnboardingCompleted || false,
    isHydrated,
  };
}
