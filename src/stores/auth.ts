import { UpsertBasicResponse } from "@/src/api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthUser {
  id: string;
  phone: string;
  name?: string;
  email?: string;
  age?: number;
  gender?: "male" | "female";

  basicOnboardingCompleted: boolean;
}

interface AuthState {
  user: AuthUser | null;

  accessToken: string | null;
  refreshToken: string | null;
  refreshExpiresAt: number | null;

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

  completeOnboarding: (updatedUser: UpsertBasicResponse) => void;

  setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      accessToken: null,
      refreshToken: null,
      refreshExpiresAt: null,

      isHydrated: false,

      login: (user, accessToken, refreshToken, refreshExpiresAt) =>
        set({
          user,
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
        }),
      completeOnboarding: (updatedUser) =>
        set({
          user: { ...updatedUser, basicOnboardingCompleted: true },
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
      }),

      onRehydrateStorage: () => {
        return (state) => {
          state?.setHydrated(true);
        };
      },
    },
  ),
);
