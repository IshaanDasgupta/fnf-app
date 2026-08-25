import React from "react";
import Spacer from "@/src/components/themed-ui/Spacer";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import NearbyChip from "@/src/components/listing/screen/neighborhood/NeighborhoodChip";
import { Ionicons } from "@expo/vector-icons";

interface NeighborhoodItem {
  type: string;
  distance: number;
}

interface NeighborhoodSectionProps {
  latitude: number;
  longitude: number;
  neighborhood: NeighborhoodItem[];
}

export default function NeighborhoodSectionWeb({
  neighborhood,
}: NeighborhoodSectionProps) {
  return (
    <ThemedView>
      <ThemedText variant="h2">The neighborhood</ThemedText>

      <Spacer size="lg" />

      <ThemedView
        variant="secondary"
        borderRadius="card"
        style={styles.mapContainer}
      >
        <Ionicons name="location-outline" size={32} color="#4DA4E8" />
        <Spacer size="xs" />
        <ThemedText variant="caption" color="foreground.secondary">
          Location Map (Native View)
        </ThemedText>
      </ThemedView>

      <Spacer size="lg" />

      <ThemedView style={styles.chips} gap="md">
        {neighborhood.map((item) => (
          <NearbyChip
            key={`${item.type}-${item.distance}`}
            title={item.type}
            value={`${item.distance} min`}
          />
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = {
  mapContainer: {
    height: 120,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  chips: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
  },
};
