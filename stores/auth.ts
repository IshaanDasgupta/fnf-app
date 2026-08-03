import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthUser {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

interface AuthState {
  user: AuthUser | null;

  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;

  basicOnboardingCompleted: boolean;
  isHydrated: boolean;

  login: (
    user: AuthUser,
    basicOnboardingCompleted: boolean,
    accessToken: string,
    refreshToken: string,
    expiresAt: number,
  ) => void;
  updateTokens: (
    accessToken: string,
    refreshToken: string,
    expiresAt: number,
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
      expiresAt: null,

      basicOnboardingCompleted: false,
      isHydrated: false,

      login: (
        user,
        basicOnboardingCompleted,
        accessToken,
        refreshToken,
        expiresAt,
      ) =>
        set({
          user,
          basicOnboardingCompleted,
          accessToken,
          refreshToken,
          expiresAt,
        }),
      updateTokens: (accessToken, refreshToken, expiresAt) =>
        set({
          accessToken,
          refreshToken,
          expiresAt,
        }),
      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          expiresAt: null,
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
        expiresAt: state.expiresAt,
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
