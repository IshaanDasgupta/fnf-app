import { Ionicons } from "@expo/vector-icons";
import React from "react";

import AmenityCard from "@/components/listing/screen/amenities/AmenityCard";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";
import { AmenityType } from "@/constants/api-constants";

interface AmenitiesSectionProps {
  amenities: {
    type: AmenityType;
    desc?: string;
  }[];
}

const amenityIcons: Record<AmenityType, keyof typeof Ionicons.glyphMap> = {
  Clubhouse: "business-outline",
  "Swimming Pool": "water-outline",
  Gym: "barbell-outline",
  Garden: "leaf-outline",
  "Sports Facilities": "football-outline",
  "Indoor Games": "game-controller-outline",
  "Jogging Track": "walk-outline",

  "24x7 Security": "shield-checkmark-outline",
  CCTV: "videocam-outline",
  "Security Guard": "person-outline",
  "Gated Community": "lock-closed-outline",
  Intercom: "call-outline",

  Lift: "arrow-up-outline",
  "Power Backup": "flash-outline",
  "Water Supply": "water-outline",
  "Gas Pipeline": "flame-outline",

  "Car Parking": "car-outline",
  "Bike Parking": "bicycle-outline",
  "Visitor Parking": "car-outline",
  "Covered Parking": "car-outline",
  "EV Charging": "flash-outline",

  "Pet Area": "paw-outline",

  Others: "information-circle-outline",
};

export default function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  return (
    <ThemedView gap="lg">
      <ThemedText variant="h2">Amenities</ThemedText>

      <ThemedView style={{ flexDirection: "row", flexWrap: "wrap" }} gap="md">
        {amenities.map((amenity, index) => (
          <AmenityCard
            key={`${amenity.type}-${index}`}
            icon={
              <Ionicons
                name={amenityIcons[amenity.type] ?? "checkmark-circle-outline"}
                size={18}
              />
            }
            label={
              amenity.type === "Others"
                ? (amenity.desc ?? "Other")
                : amenity.type
            }
            desc={amenity.type === "Others" ? undefined : amenity.desc}
          />
        ))}
      </ThemedView>
    </ThemedView>
  );
}
