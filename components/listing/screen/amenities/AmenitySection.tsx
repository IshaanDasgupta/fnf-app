import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";
import AmenityCard from "@/components/listing/screen/amenities/AmenityCard";

export default function AmenitiesSection() {
  return (
    <ThemedView gap="lg">
      <ThemedText variant="h2">Amenities</ThemedText>

      <ThemedView style={{ flexDirection: "row", flexWrap: "wrap" }} gap="md">
        <AmenityCard
          icon={<Ionicons name="wifi-outline" size={18} />}
          label="Fast Wi-Fi"
        />

        <AmenityCard
          icon={<Ionicons name="shirt-outline" size={18} />}
          label="Washer + dryer"
        />

        <AmenityCard
          icon={<Ionicons name="snow-outline" size={18} />}
          label="AC in every room"
        />

        <AmenityCard
          icon={<Ionicons name="restaurant-outline" size={18} />}
          label="Fully stocked kitchen"
        />
      </ThemedView>
    </ThemedView>
  );
}
