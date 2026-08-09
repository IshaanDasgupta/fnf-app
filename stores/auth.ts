import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthUser {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;

  basicOnboardingCompleted: boolean;
}

interface AuthState {
  user: AuthUser | null;

  accessToken: string | null;
  refreshToken: string | null;
  refreshExpiresAt: number | null;

  basicOnboardingCompleted: boolean;
  isHydrated: boolean;

  login: (
    user: AuthUser,
    accessToken: string,
    refreshToken: string,
    refreshExpiresAt: number,
  ) => void;
  updateTokens: (
    accessToken: string,
    refreshToken: string,
    refreshExpiresAt: number,
  ) => void;
  logout: () => void;

  completeOnboarding: () => void;

  setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      accessToken: null,
      refreshToken: null,
      refreshExpiresAt: null,

      basicOnboardingCompleted: false,
      isHydrated: false,

      login: (user, accessToken, refreshToken, refreshExpiresAt) =>
        set({
          user,
          basicOnboardingCompleted: user.basicOnboardingCompleted,
          accessToken,
          refreshToken,
          refreshExpiresAt,
        }),
      updateTokens: (accessToken, refreshToken, refreshExpiresAt) =>
        set({
          accessToken,
          refreshToken,
          refreshExpiresAt,
        }),
      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          refreshExpiresAt: null,
          basicOnboardingCompleted: false,
        }),
      completeOnboarding: () =>
        set({
          basicOnboardingCompleted: true,
        }),

      setHydrated: (value) =>
        set({
          isHydrated: value,
        }),
    }),
    {
      name: "fnf-auth-store",

      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        refreshExpiresAt: state.refreshExpiresAt,
        basicOnboardingCompleted: state.basicOnboardingCompleted,
      }),

      onRehydrateStorage: () => {
        return (state) => {
          state?.setHydrated(true);
        };
      },
    },
  ),
);
