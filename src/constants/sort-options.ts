import { Ionicons } from "@expo/vector-icons";

import { SortBy, SortOrder } from "@/src/api/listing";

export interface SortOption {
  id: string;
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  sortBy: SortBy;
  sortOrder: SortOrder;
}

export const SORT_OPTIONS: SortOption[] = [
  {
    id: "nearest",
    label: "Nearest",
    iconName: "location-outline",
    sortBy: "distance",
    sortOrder: "asc",
  },
  {
    id: "rent-low-high",
    label: "Rent: Low to High",
    iconName: "arrow-up-outline",
    sortBy: "rent",
    sortOrder: "asc",
  },
  {
    id: "rent-high-low",
    label: "Rent: High to Low",
    iconName: "arrow-down-outline",
    sortBy: "rent",
    sortOrder: "desc",
  },
  {
    id: "newest",
    label: "Newest",
    iconName: "time-outline",
    sortBy: "creation_date",
    sortOrder: "desc",
  },
  {
    id: "popular",
    label: "Popular",
    iconName: "flame-outline",
    sortBy: "views",
    sortOrder: "desc",
  },
];
