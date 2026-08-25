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
  OccupancyType,
} from "@/src/constants/api-constants";
import { FilterTileItem } from "@/src/components/filter/FilterTileGrid";
import { VisualOptionItem } from "@/src/components/filter/VisualGridCard";
import { Ionicons } from "@expo/vector-icons";

type IconName = keyof typeof Ionicons.glyphMap;

export const BHK_VISUAL_OPTIONS: VisualOptionItem<BhkType>[] = [
  {
    id: "1RK",
    title: "1 RK",
    subtitle: "Studio room",
    iconName: "home-outline",
    tintBg: "rgba(77, 164, 232, 0.12)",
    tintColor: "#4DA4E8",
  },
  {
    id: "1BHK",
    title: "1 BHK",
    subtitle: "1 Bed + Hall",
    iconName: "business-outline",
    tintBg: "rgba(221, 245, 229, 0.7)",
    tintColor: "#15803D",
  },
  {
    id: "2BHK",
    title: "2 BHK",
    subtitle: "2 Bed + Hall",
    iconName: "business-outline",
    tintBg: "rgba(255, 229, 214, 0.7)",
    tintColor: "#C2410C",
  },
  {
    id: "3BHK",
    title: "3 BHK",
    subtitle: "3+ Bed + Hall",
    iconName: "business-outline",
    tintBg: "rgba(232, 236, 255, 0.7)",
    tintColor: "#4338CA",
  },
];

export const OCCUPANCY_VISUAL_OPTIONS: VisualOptionItem<OccupancyType>[] = [
  {
    id: "single",
    title: "Single",
    subtitle: "Private room",
    iconName: "person-outline",
    tintBg: "rgba(77, 164, 232, 0.12)",
    tintColor: "#4DA4E8",
  },
  {
    id: "double",
    title: "Double",
    subtitle: "Twin sharing",
    iconName: "people-outline",
    tintBg: "rgba(221, 245, 229, 0.7)",
    tintColor: "#15803D",
  },
  {
    id: "triple",
    title: "Triple",
    subtitle: "3+ sharing",
    iconName: "people-circle-outline",
    tintBg: "rgba(255, 229, 214, 0.7)",
    tintColor: "#C2410C",
  },
];

export const FURNISHING_VISUAL_OPTIONS: VisualOptionItem<FurnishedStatus>[] = [
  {
    id: "fully-furnished",
    title: "Fully",
    subtitle: "Move-in ready",
    iconName: "bed-outline",
    tintBg: "rgba(221, 245, 229, 0.7)",
    tintColor: "#15803D",
  },
  {
    id: "semi-furnished",
    title: "Semi",
    subtitle: "Basic fittings",
    iconName: "cube-outline",
    tintBg: "rgba(255, 243, 213, 0.7)",
    tintColor: "#B45309",
  },
  {
    id: "unfurnished",
    title: "Unfurnished",
    subtitle: "Bring your own",
    iconName: "layers-outline",
    tintBg: "rgba(232, 236, 255, 0.7)",
    tintColor: "#4338CA",
  },
];

export const GENDER_VISUAL_OPTIONS: VisualOptionItem<GenderPreference | "all">[] = [
  {
    id: "all",
    title: "Any Gender",
    subtitle: "All welcome",
    iconName: "male-female-outline",
    tintBg: "rgba(77, 164, 232, 0.12)",
    tintColor: "#4DA4E8",
  },
  {
    id: "male",
    title: "Male only",
    subtitle: "Men flatmates",
    iconName: "man-outline",
    tintBg: "rgba(232, 236, 255, 0.7)",
    tintColor: "#4338CA",
  },
  {
    id: "female",
    title: "Female only",
    subtitle: "Women flatmates",
    iconName: "woman-outline",
    tintBg: "rgba(255, 229, 214, 0.7)",
    tintColor: "#C2410C",
  },
];

const AMENITY_METAS: Partial<
  Record<AmenityType, { iconName: IconName; tintBg: string; tintColor: string }>
> = {
  Gym: {
    iconName: "barbell-outline",
    tintBg: "rgba(221, 245, 229, 0.7)",
    tintColor: "#15803D",
  },
  "Swimming Pool": {
    iconName: "water-outline",
    tintBg: "rgba(77, 164, 232, 0.15)",
    tintColor: "#0284C7",
  },
  "Power Backup": {
    iconName: "battery-charging-outline",
    tintBg: "rgba(255, 243, 213, 0.7)",
    tintColor: "#B45309",
  },
  Lift: {
    iconName: "swap-vertical-outline",
    tintBg: "rgba(232, 236, 255, 0.7)",
    tintColor: "#4338CA",
  },
  "24x7 Security": {
    iconName: "shield-checkmark-outline",
    tintBg: "rgba(221, 245, 229, 0.7)",
    tintColor: "#15803D",
  },
  "Gated Community": {
    iconName: "key-outline",
    tintBg: "rgba(255, 229, 214, 0.7)",
    tintColor: "#C2410C",
  },
  "Car Parking": {
    iconName: "car-outline",
    tintBg: "rgba(77, 164, 232, 0.15)",
    tintColor: "#0284C7",
  },
  "Bike Parking": {
    iconName: "bicycle-outline",
    tintBg: "rgba(255, 243, 213, 0.7)",
    tintColor: "#B45309",
  },
  "EV Charging": {
    iconName: "flash-outline",
    tintBg: "rgba(221, 245, 229, 0.7)",
    tintColor: "#15803D",
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
      categoryTint: meta?.tintBg,
      categoryIconColor: meta?.tintColor,
    };
  });

const ADDON_METAS: Partial<
  Record<AddOnType, { iconName: IconName; tintBg: string; tintColor: string }>
> = {
  "Air Conditioning": {
    iconName: "snow-outline",
    tintBg: "rgba(77, 164, 232, 0.15)",
    tintColor: "#0284C7",
  },
  WiFi: {
    iconName: "wifi-outline",
    tintBg: "rgba(232, 236, 255, 0.7)",
    tintColor: "#4338CA",
  },
  "Washing Machine": {
    iconName: "shirt-outline",
    tintBg: "rgba(221, 245, 229, 0.7)",
    tintColor: "#15803D",
  },
  Refrigerator: {
    iconName: "cafe-outline",
    tintBg: "rgba(255, 243, 213, 0.7)",
    tintColor: "#B45309",
  },
  "Attached Bathroom": {
    iconName: "water-outline",
    tintBg: "rgba(77, 164, 232, 0.15)",
    tintColor: "#0284C7",
  },
  Balcony: {
    iconName: "sunny-outline",
    tintBg: "rgba(255, 229, 214, 0.7)",
    tintColor: "#C2410C",
  },
  Cook: {
    iconName: "restaurant-outline",
    tintBg: "rgba(255, 243, 213, 0.7)",
    tintColor: "#B45309",
  },
  Maid: {
    iconName: "sparkles-outline",
    tintBg: "rgba(232, 236, 255, 0.7)",
    tintColor: "#4338CA",
  },
};

export const POPULAR_ADDONS: FilterTileItem<AddOnType>[] = [
  "Air Conditioning",
  "WiFi",
  "Washing Machine",
  "Refrigerator",
  "Attached Bathroom",
  "Balcony",
  "Cook",
  "Maid",
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
      categoryTint: meta?.tintBg,
      categoryIconColor: meta?.tintColor,
    };
  });

const HOUSE_RULE_METAS: Partial<
  Record<HouseRuleType, { iconName: IconName; tintBg: string; tintColor: string }>
> = {
  "No Smoking": {
    iconName: "ban-outline",
    tintBg: "rgba(239, 68, 68, 0.12)",
    tintColor: "#DC2626",
  },
  "No Alcohol": {
    iconName: "wine-outline",
    tintBg: "rgba(239, 68, 68, 0.12)",
    tintColor: "#DC2626",
  },
  "Vegetarian Only": {
    iconName: "leaf-outline",
    tintBg: "rgba(221, 245, 229, 0.7)",
    tintColor: "#15803D",
  },
  "Pets Allowed": {
    iconName: "paw-outline",
    tintBg: "rgba(255, 229, 214, 0.7)",
    tintColor: "#C2410C",
  },
  "Guests Allowed": {
    iconName: "people-outline",
    tintBg: "rgba(77, 164, 232, 0.15)",
    tintColor: "#0284C7",
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
      categoryTint: meta?.tintBg,
      categoryIconColor: meta?.tintColor,
    };
  });
