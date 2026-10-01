import { FilterValues } from "@/src/api/listing";

export const DEFAULT_FILTER_VALUES: FilterValues = {
  locality: undefined,

  bhk: [],
  capacity: [],
  rentalType: [],
  furnishedStatus: [],

  rentMin: undefined,
  rentMax: undefined,

  totalInitCostMin: undefined,
  totalInitCostMax: undefined,

  floorMin: undefined,
  floorMax: undefined,

  totalOccupancyMin: undefined,
  totalOccupancyMax: undefined,

  gender: undefined,

  availableImmediately: false,
  availableAfter: undefined,

  addOns: [],
  amenities: [],
  houseRules: [],
  services: [],
};

export interface PricePreset {
  id: string;
  label: string;
  min?: number;
  max?: number;
}

export const PRICE_PRESETS: PricePreset[] = [
  { id: "under-15k", label: "Under ₹15K", max: 15000 },
  { id: "15k-25k", label: "₹15K - ₹25K", min: 15000, max: 25000 },
  { id: "25k-40k", label: "₹25K - ₹40K", min: 25000, max: 40000 },
  { id: "above-40k", label: "₹40K+", min: 40000 },
];
