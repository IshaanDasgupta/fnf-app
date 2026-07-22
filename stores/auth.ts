import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthUser {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  onboardingCompleted: boolean;
  isHydrated: boolean;
  login: (user?: AuthUser) => void;
  logout: () => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      onboardingCompleted: false,
      isHydrated: false,
      login: (user) =>
        set({
          user: user ?? { id: "demo-user", name: "Demo User" },
          isAuthenticated: true,
          onboardingCompleted: false,
        }),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          onboardingCompleted: false,
        }),
      completeOnboarding: () => set({ onboardingCompleted: true }),
      resetOnboarding: () => set({ onboardingCompleted: false }),
      setHydrated: (value) => set({ isHydrated: value }),
    }),
    {
      name: "fnf-auth-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        onboardingCompleted: state.onboardingCompleted,
      }),
      onRehydrateStorage: (state) => {
        return (state, error) => {
          state?.setHydrated(true);
        };
      },
    },
  ),
);
