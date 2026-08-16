import { City } from "@/src/constants/api-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface UserLocation {
  latitude: number;
  longitude: number;
}

interface LocationState {
  location: UserLocation | null;
  city: City | null;

  setLocation: (location: UserLocation) => void;
  setCity: (city: City) => void;

  clearLocation: () => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      location: null,
      city: null,

      setLocation: (location) =>
        set({
          location,
        }),

      setCity: (city) =>
        set({
          city,
        }),

      clearLocation: () =>
        set({
          location: null,
          city: null,
        }),
    }),
    {
      name: "fnf-location-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
