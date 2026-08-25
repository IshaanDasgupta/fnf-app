export interface DealbreakersFilter {
  noSmoking: boolean;
  petsAllowed: boolean;
  noAlcohol: boolean;
  noLateParties: boolean;
  noOvernightGuests: boolean;
  vegetarianOnly: boolean;
}

export interface FilterState {
  minPrice?: number;
  maxPrice?: number;
  priceBucket?: string;
  bedrooms: string[];
  roomType?: "all" | "entire_apartment" | "private_room" | "shared_room";
  diet: string[];
  sleepSchedule?: "all" | "early-bird" | "night-owl" | "flexible";
  workFromHome?: "all" | "never" | "sometimes" | "often";
  habits: string[];
  dealbreakers: DealbreakersFilter;
}

export const DEFAULT_FILTER_STATE: FilterState = {
  minPrice: undefined,
  maxPrice: undefined,
  priceBucket: "all",
  bedrooms: [],
  roomType: "all",
  diet: [],
  sleepSchedule: "all",
  workFromHome: "all",
  habits: [],
  dealbreakers: {
    noSmoking: false,
    petsAllowed: false,
    noAlcohol: false,
    noLateParties: false,
    noOvernightGuests: false,
    vegetarianOnly: false,
  },
};

export interface ListingFiltersProps {
  visible?: boolean;
  initialFilters?: Partial<FilterState>;
  onClose?: () => void;
  onApply?: (filters: FilterState) => void;
  onReset?: () => void;
}
