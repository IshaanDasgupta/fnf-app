import { ListingCardResponse } from "@/src/api/listing";
import { navigation } from "@/src/lib/navigation";

export type QuickFilterId =
  | "all"
  | "near"
  | "furnished"
  | "under-15k"
  | "available-now"
  | "single-occupancy"
  | "attached-bathroom"
  | "parking"
  | "wifi"
  | "pet-friendly"
  | "1bhk"
  | "2bhk";

export type QuickFilter = {
  id: QuickFilterId;
  label: string;
  filter: (listing: ListingCardResponse) => boolean;
};

export const QUICK_FILTERS: QuickFilter[] = [
  {
    id: "all",
    label: "All",
    filter: () => true,
  },
  {
    id: "under-15k",
    label: "Under ₹15K",
    filter: (listing) => listing.rent < 15_000,
  },
  {
    id: "available-now",
    label: "Available Now",
    filter: (listing) => listing.availableImmediately,
  },
  {
    id: "single-occupancy",
    label: "Single Occupancy",
    filter: (listing) => listing.occupancy === "single",
  },
  {
    id: "1bhk",
    label: "1 BHK",
    filter: (listing) => listing.bhk === "1BHK",
  },
  {
    id: "2bhk",
    label: "2 BHK",
    filter: (listing) => listing.bhk === "2BHK",
  },
];

export const FilterNavConfig = {
  home: navigation.searchFilter.search,
  map: undefined,
  search: undefined,
};
