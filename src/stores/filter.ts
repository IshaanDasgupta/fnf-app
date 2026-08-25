import { DEFAULT_FILTER_VALUES, FilterValues } from "@/src/types/filter";
import { create } from "zustand";

export function countActiveFilters(filters: FilterValues): number {
  let count = 0;

  if (filters.bhk.length > 0) count += filters.bhk.length;
  if (filters.occupancy.length > 0) count += filters.occupancy.length;
  if (filters.furnishing.length > 0) count += filters.furnishing.length;
  if (filters.gender !== "all") count += 1;
  if (filters.minRent !== undefined || filters.maxRent !== undefined) count += 1;
  if (filters.availableImmediately) count += 1;
  if (filters.amenities.length > 0) count += filters.amenities.length;
  if (filters.addOns.length > 0) count += filters.addOns.length;
  if (filters.houseRules.length > 0) count += filters.houseRules.length;

  return count;
}

export interface ActiveFilterPill {
  id: string;
  label: string;
  onRemove: () => void;
}

export function getActiveFilterPills(
  filters: FilterValues,
  updateFilters: (updater: (prev: FilterValues) => FilterValues) => void,
): ActiveFilterPill[] {
  const pills: ActiveFilterPill[] = [];

  // Rent
  if (filters.minRent !== undefined || filters.maxRent !== undefined) {
    let label = "";
    if (filters.minRent !== undefined && filters.maxRent !== undefined) {
      label = `₹${(filters.minRent / 1000).toFixed(0)}k - ₹${(filters.maxRent / 1000).toFixed(0)}k`;
    } else if (filters.minRent !== undefined) {
      label = `₹${(filters.minRent / 1000).toFixed(0)}k+`;
    } else if (filters.maxRent !== undefined) {
      label = `Up to ₹${(filters.maxRent / 1000).toFixed(0)}k`;
    }
    pills.push({
      id: "rent",
      label,
      onRemove: () =>
        updateFilters((prev) => ({
          ...prev,
          minRent: undefined,
          maxRent: undefined,
        })),
    });
  }

  // BHK
  filters.bhk.forEach((b) => {
    pills.push({
      id: `bhk-${b}`,
      label: b,
      onRemove: () =>
        updateFilters((prev) => ({
          ...prev,
          bhk: prev.bhk.filter((item) => item !== b),
        })),
    });
  });

  // Occupancy
  filters.occupancy.forEach((occ) => {
    pills.push({
      id: `occ-${occ}`,
      label: `${occ.charAt(0).toUpperCase() + occ.slice(1)} occupancy`,
      onRemove: () =>
        updateFilters((prev) => ({
          ...prev,
          occupancy: prev.occupancy.filter((item) => item !== occ),
        })),
    });
  });

  // Furnishing
  filters.furnishing.forEach((f) => {
    const label =
      f === "fully-furnished"
        ? "Fully Furnished"
        : f === "semi-furnished"
          ? "Semi Furnished"
          : "Unfurnished";
    pills.push({
      id: `furnishing-${f}`,
      label,
      onRemove: () =>
        updateFilters((prev) => ({
          ...prev,
          furnishing: prev.furnishing.filter((item) => item !== f),
        })),
    });
  });

  // Gender
  if (filters.gender && filters.gender !== "all") {
    pills.push({
      id: `gender-${filters.gender}`,
      label: filters.gender === "male" ? "Male only" : "Female only",
      onRemove: () =>
        updateFilters((prev) => ({
          ...prev,
          gender: "all",
        })),
    });
  }

  // Immediate
  if (filters.availableImmediately) {
    pills.push({
      id: "immediate",
      label: "Immediate",
      onRemove: () =>
        updateFilters((prev) => ({
          ...prev,
          availableImmediately: false,
        })),
    });
  }

  // Amenities
  filters.amenities.forEach((a) => {
    pills.push({
      id: `amenity-${a}`,
      label: a,
      onRemove: () =>
        updateFilters((prev) => ({
          ...prev,
          amenities: prev.amenities.filter((item) => item !== a),
        })),
    });
  });

  // Add-ons
  filters.addOns.forEach((addon) => {
    pills.push({
      id: `addon-${addon}`,
      label: addon,
      onRemove: () =>
        updateFilters((prev) => ({
          ...prev,
          addOns: prev.addOns.filter((item) => item !== addon),
        })),
    });
  });

  // House Rules
  filters.houseRules.forEach((rule) => {
    pills.push({
      id: `rule-${rule}`,
      label: rule,
      onRemove: () =>
        updateFilters((prev) => ({
          ...prev,
          houseRules: prev.houseRules.filter((item) => item !== rule),
        })),
    });
  });

  return pills;
}

interface FilterState {
  appliedFilters: FilterValues;
  setAppliedFilters: (filters: FilterValues) => void;
  updateAppliedFilters: (
    updater: (prev: FilterValues) => FilterValues,
  ) => void;
  resetFilters: () => void;
  getActiveCount: () => number;
}

export const useFilterStore = create<FilterState>((set, get) => ({
  appliedFilters: { ...DEFAULT_FILTER_VALUES },

  setAppliedFilters: (filters: FilterValues) =>
    set({
      appliedFilters: { ...filters },
    }),

  updateAppliedFilters: (updater: (prev: FilterValues) => FilterValues) =>
    set((state) => ({
      appliedFilters: updater(state.appliedFilters),
    })),

  resetFilters: () =>
    set({
      appliedFilters: { ...DEFAULT_FILTER_VALUES },
    }),

  getActiveCount: () => {
    return countActiveFilters(get().appliedFilters);
  },
}));
