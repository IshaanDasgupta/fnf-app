import { MapFilterBar } from "@/src/components/map/MapFilterBar";
import { MapTopBar } from "@/src/components/map/MapTopBar";
import Spacer from "@/src/components/themed-ui/Spacer";
import ThemedSafeArea from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { QUICK_FILTERS } from "@/src/constants/quick-filters";
import { sizes } from "@/src/theme/size";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

export default function MapScreenWeb() {
  const [selectedFiltersIds, setSelectedFiltersIds] = useState<string[]>([]);

  const toggleFilter = (id: string) => {
    setSelectedFiltersIds((current) => {
      if (id === "all") return [];
      if (current.includes(id)) return current.filter((f) => f !== id);
      return [...current, id];
    });
  };

  return (
    <ThemedSafeArea variant="primary" style={styles.container}>
      <ThemedView style={styles.topBar}>
        <MapTopBar />
        <Spacer size="xl" />
        <MapFilterBar
          items={QUICK_FILTERS}
          selectedChipsIds={selectedFiltersIds}
          onSelect={toggleFilter}
        />
      </ThemedView>

      <ThemedView style={styles.placeholderContainer}>
        <ThemedView
          variant="secondary"
          borderRadius="card"
          padding="2xl"
          style={styles.placeholderCard}
        >
          <Ionicons name="map-outline" size={48} color="#4DA4E8" />
          <Spacer size="md" />
          <ThemedText variant="h3" style={{ textAlign: "center" }}>
            Interactive Map
          </ThemedText>
          <Spacer size="xs" />
          <ThemedText
            variant="bodySmall"
            color="foreground.secondary"
            style={{ textAlign: "center" }}
          >
            Interactive map view is optimized for iOS and Android native devices.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    paddingHorizontal: sizes.lg,
    paddingTop: sizes.lg,
  },
  placeholderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: sizes.xl,
  },
  placeholderCard: {
    alignItems: "center",
    maxWidth: 400,
    width: "100%",
  },
});
