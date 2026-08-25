import {
  AddOnType,
  AmenityType,
  BhkType,
  FurnishedStatus,
  GenderPreference,
  HouseRuleType,
  OccupancyType,
} from "@/src/constants/api-constants";

export interface FilterValues {
  bhk: BhkType[];
  occupancy: OccupancyType[];
  furnishing: FurnishedStatus[];
  gender: GenderPreference | "all";
  minRent?: number;
  maxRent?: number;
  availableImmediately: boolean;
  amenities: AmenityType[];
  addOns: AddOnType[];
  houseRules: HouseRuleType[];
}

export const DEFAULT_FILTER_VALUES: FilterValues = {
  bhk: [],
  occupancy: [],
  furnishing: [],
  gender: "all",
  minRent: undefined,
  maxRent: undefined,
  availableImmediately: false,
  amenities: [],
  addOns: [],
  houseRules: [],
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
