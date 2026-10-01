import { CapacityFilter } from "@/src/api/listing";
import { FilterTileItem } from "@/src/components/filter/FilterTileGrid";
import { VisualOptionItem } from "@/src/components/filter/VisualGridCard";
import {
  ADD_ON_TYPES,
  AMENITY_TYPES,
  AddOnType,
  AmenityType,
  BhkType,
  FurnishedStatus,
  GenderPreference,
  HOUSE_RULE_TYPES,
  HouseRuleType,
  RentalScopeType,
  SERVICES_TYPES,
  ServiceType,
} from "@/src/constants/api-constants";
import { Ionicons } from "@expo/vector-icons";

type IconName = keyof typeof Ionicons.glyphMap;

export const BHK_VISUAL_OPTIONS: VisualOptionItem<BhkType>[] = [
  {
    id: "1 RK",
    title: "1 RK",
    subtitle: "Studio room",
    iconName: "home-outline",
  },
  {
    id: "1 BHK",
    title: "1 BHK",
    subtitle: "1 Bed + Hall",
    iconName: "business-outline",
  },
  {
    id: "2 BHK",
    title: "2 BHK",
    subtitle: "2 Bed + Hall",
    iconName: "business-outline",
  },
  {
    id: "3 BHK",
    title: "3 BHK",
    subtitle: "3+ Bed + Hall",
    iconName: "business-outline",
  },
];

export const OCCUPANCY_VISUAL_OPTIONS: VisualOptionItem<CapacityFilter>[] = [
  {
    id: "1",
    title: "Single",
    subtitle: "Private room",
    iconName: "person-outline",
  },
  {
    id: "2",
    title: "Double",
    subtitle: "Twin sharing",
    iconName: "people-outline",
  },
  {
    id: "3plus",
    title: "Triple",
    subtitle: "3+ sharing",
    iconName: "people-circle-outline",
  },
];

export const RENTAL_TYPE_VISUAL_OPTIONS: VisualOptionItem<RentalScopeType>[] = [
  {
    id: "room",
    title: "Room",
    subtitle: "Private room",
    iconName: "bed-outline",
  },
  {
    id: "hall",
    title: "Hall",
    subtitle: "Shared hall",
    iconName: "people-outline",
  },
];

export const FURNISHING_VISUAL_OPTIONS: VisualOptionItem<FurnishedStatus>[] = [
  {
    id: "fully-furnished",
    title: "Fully",
    subtitle: "Move-in ready",
    iconName: "bed-outline",
  },
  {
    id: "semi-furnished",
    title: "Semi",
    subtitle: "Basic fittings",
    iconName: "cube-outline",
  },
  {
    id: "unfurnished",
    title: "Unfurnished",
    subtitle: "Bring your own",
    iconName: "layers-outline",
  },
];

export const GENDER_VISUAL_OPTIONS: VisualOptionItem<GenderPreference>[] = [
  {
    id: "Male",
    title: "Male only",
    subtitle: "Men flatmates",
    iconName: "man-outline",
  },
  {
    id: "Female",
    title: "Female only",
    subtitle: "Women flatmates",
    iconName: "woman-outline",
  },
];

const AMENITY_METAS: Partial<Record<AmenityType, { iconName: IconName }>> = {
  Gym: {
    iconName: "barbell-outline",
  },
  "Swimming Pool": {
    iconName: "water-outline",
  },
  "Power Backup": {
    iconName: "battery-charging-outline",
  },
  Lift: {
    iconName: "swap-vertical-outline",
  },
  "24x7 Security": {
    iconName: "shield-checkmark-outline",
  },
  "Gated Community": {
    iconName: "key-outline",
  },
  "Car Parking": {
    iconName: "car-outline",
  },
  "Bike Parking": {
    iconName: "bicycle-outline",
  },
  "EV Charging": {
    iconName: "flash-outline",
  },
};

export const POPULAR_AMENITIES: FilterTileItem<AmenityType>[] = [
  "Gym",
  "Swimming Pool",
  "Power Backup",
  "Lift",
  "24x7 Security",
  "Gated Community",
  "Car Parking",
  "Bike Parking",
  "EV Charging",
]
  .filter((item): item is AmenityType =>
    (AMENITY_TYPES as readonly string[]).includes(item),
  )
  .map((item) => {
    const meta = AMENITY_METAS[item];
    return {
      id: item,
      label: item,
      iconName: meta?.iconName ?? "sparkles-outline",
    };
  });

const ADDON_METAS: Partial<Record<AddOnType, { iconName: IconName }>> = {
  "Air Conditioning": {
    iconName: "snow-outline",
  },
  WiFi: {
    iconName: "wifi-outline",
  },
  "Washing Machine": {
    iconName: "shirt-outline",
  },
  Refrigerator: {
    iconName: "cafe-outline",
  },
  Balcony: {
    iconName: "sunny-outline",
  },
};

export const POPULAR_ADDONS: FilterTileItem<AddOnType>[] = [
  "Air Conditioning",
  "WiFi",
  "Washing Machine",
  "Refrigerator",
  "Balcony",
]
  .filter((item): item is AddOnType =>
    (ADD_ON_TYPES as readonly string[]).includes(item),
  )
  .map((item) => {
    const meta = ADDON_METAS[item];
    return {
      id: item,
      label: item,
      iconName: meta?.iconName ?? "apps-outline",
    };
  });

const HOUSE_RULE_METAS: Partial<Record<HouseRuleType, { iconName: IconName }>> =
  {
    "No Smoking": {
      iconName: "ban-outline",
    },
    "No Alcohol": {
      iconName: "wine-outline",
    },
    "Vegetarian Only": {
      iconName: "leaf-outline",
    },
    "Pets Allowed": {
      iconName: "paw-outline",
    },
    "Guests Allowed": {
      iconName: "people-outline",
    },
  };

export const POPULAR_HOUSE_RULES: FilterTileItem<HouseRuleType>[] = [
  "No Smoking",
  "No Alcohol",
  "Vegetarian Only",
  "Pets Allowed",
  "Guests Allowed",
]
  .filter((item): item is HouseRuleType =>
    (HOUSE_RULE_TYPES as readonly string[]).includes(item),
  )
  .map((item) => {
    const meta = HOUSE_RULE_METAS[item];
    return {
      id: item,
      label: item,
      iconName: meta?.iconName ?? "checkmark-circle-outline",
    };
  });

const SERVICE_METAS: Partial<Record<ServiceType, { iconName: IconName }>> = {
  cook: {
    iconName: "restaurant-outline",
  },
  maid: {
    iconName: "person-outline",
  },
  housekeeping: {
    iconName: "sparkles-outline",
  },
  laundry: {
    iconName: "shirt-outline",
  },
  other: {
    iconName: "information-circle-outline",
  },
};

export const SERVICE_DISPLAY_NAMES: Record<ServiceType, string> = {
  cook: "Cook",
  maid: "Maid",
  housekeeping: "House Keeping",
  laundry: "Laundry",
  other: "Other",
};

function formatServiceLabel(service: ServiceType) {
  return SERVICE_DISPLAY_NAMES[service];
}

export const POPULAR_SERVICES: FilterTileItem<ServiceType>[] = (
  ["cook", "maid", "housekeeping", "laundry"] as readonly string[]
)
  .filter((item): item is ServiceType =>
    (SERVICES_TYPES as readonly string[]).includes(item),
  )
  .map((item) => {
    const meta = SERVICE_METAS[item];
    return {
      id: item,
      label: formatServiceLabel(item),
      iconName: meta?.iconName ?? "checkmark-circle-outline",
    };
  });
