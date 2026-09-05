import { FilterValues } from "@/src/api/listing";
import { DEFAULT_FILTER_VALUES } from "@/src/types/filter";
import { create } from "zustand";

export function countActiveMapFilters(filters: FilterValues): number {
  let count = 0;

  if (filters.bhk.length > 0) count += filters.bhk.length;
  if (filters.occupancy.length > 0) count += filters.occupancy.length;
  if (filters.furnishedStatus.length > 0)
    count += filters.furnishedStatus.length;
  if (filters.gender !== undefined) count += 1;
  if (filters.rentMin !== undefined || filters.rentMax !== undefined)
    count += 1;
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

export function getActiveMapFilterPills(
  filters: FilterValues,
  updateFilters: (updater: (prev: FilterValues) => FilterValues) => void,
): ActiveFilterPill[] {
  const pills: ActiveFilterPill[] = [];

  // Rent
  if (filters.rentMin !== undefined || filters.rentMax !== undefined) {
    let label = "";
    if (filters.rentMin !== undefined && filters.rentMax !== undefined) {
      label = `₹${(filters.rentMin / 1000).toFixed(0)}k - ₹${(filters.rentMax / 1000).toFixed(0)}k`;
    } else if (filters.rentMin !== undefined) {
      label = `₹${(filters.rentMin / 1000).toFixed(0)}k+`;
    } else if (filters.rentMax !== undefined) {
      label = `Up to ₹${(filters.rentMax / 1000).toFixed(0)}k`;
    }
    pills.push({
      id: "rent",
      label,
      onRemove: () =>
        updateFilters((prev) => ({
          ...prev,
          rentMin: undefined,
          rentMax: undefined,
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

  // furnishedStatus
  filters.furnishedStatus.forEach((f) => {
    const label =
      f === "fully-furnished"
        ? "Fully Furnished"
        : f === "semi-furnished"
          ? "Semi Furnished"
          : "Unfurnished";
    pills.push({
      id: `furnishedStatus-${f}`,
      label,
      onRemove: () =>
        updateFilters((prev) => ({
          ...prev,
          furnishedStatus: prev.furnishedStatus.filter((item) => item !== f),
        })),
    });
  });

  // Gender
  if (filters.gender) {
    pills.push({
      id: `gender-${filters.gender}`,
      label: filters.gender === "male" ? "Male only" : "Female only",
      onRemove: () =>
        updateFilters((prev) => ({
          ...prev,
          gender: undefined,
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
  appliedMapFilters: FilterValues;
  setAppliedMapFilters: (filters: FilterValues) => void;
  updateAppliedMapFilters: (
    updater: (prev: FilterValues) => FilterValues,
  ) => void;
  resetMapFilters: () => void;
  getActiveMapFilterCount: () => number;
}

export const useMapFilterStore = create<FilterState>((set, get) => ({
  appliedMapFilters: { ...DEFAULT_FILTER_VALUES },

  setAppliedMapFilters: (filters: FilterValues) =>
    set({
      appliedMapFilters: { ...filters },
    }),

  updateAppliedMapFilters: (updater: (prev: FilterValues) => FilterValues) =>
    set((state) => ({
      appliedMapFilters: updater(state.appliedMapFilters),
    })),

  resetMapFilters: () =>
    set({
      appliedMapFilters: { ...DEFAULT_FILTER_VALUES },
    }),

  getActiveMapFilterCount: () => {
    return countActiveMapFilters(get().appliedMapFilters);
  },
}));
