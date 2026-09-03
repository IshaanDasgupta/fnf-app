import { Ionicons } from "@expo/vector-icons";
import React from "react";

import AddOnCard from "@/src/components/listing/screen/addons/AddOnCard";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { AddOnType } from "@/src/constants/api-constants";

interface AddOn {
  type: AddOnType;
  desc?: string;
}

interface AddOnsSectionProps {
  addOns: AddOn[];
}

const addOnIcons: Record<AddOnType, keyof typeof Ionicons.glyphMap> = {
  "Air Conditioning": "snow-outline",
  Refrigerator: "cube-outline",
  "Washing Machine": "shirt-outline",
  Microwave: "restaurant-outline",
  Oven: "flame-outline",
  Dishwasher: "water-outline",
  TV: "tv-outline",

  "Modular Kitchen": "restaurant-outline",
  "Gas Stove": "flame-outline",
  Chimney: "filter-outline",
  "Water Purifier": "water-outline",

  WiFi: "wifi-outline",
  "Fiber Internet": "globe-outline",

  "Attached Bathroom": "water-outline",
  Geyser: "water-outline",
  Balcony: "business-outline",
  "Private Terrace": "sunny-outline",
  "Walk-in Closet": "shirt-outline",
  Furniture: "home",

  Cook: "restaurant-outline",
  Maid: "person-outline",
  Housekeeping: "sparkles-outline",
  Laundry: "shirt-outline",

  Others: "information-circle-outline",
};

export default function AddOnsSection({ addOns }: AddOnsSectionProps) {
  return (
    <ThemedView gap="lg">
      <ThemedText variant="h2">Add-ons</ThemedText>

      <ThemedView style={{ flexDirection: "row", flexWrap: "wrap" }} gap="md">
        {addOns.map((addOn, index) => (
          <AddOnCard
            key={`${addOn.type}-${index}`}
            icon={
              <Ionicons
                name={addOnIcons[addOn.type] ?? "checkmark-circle-outline"}
                size={18}
              />
            }
            label={
              addOn.type === "Others" ? (addOn.desc ?? "Other") : addOn.type
            }
            desc={addOn.type === "Others" ? undefined : addOn.desc}
          />
        ))}
      </ThemedView>
    </ThemedView>
  );
}
