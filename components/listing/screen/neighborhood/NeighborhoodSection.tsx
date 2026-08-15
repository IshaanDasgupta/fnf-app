import React from "react";
import { useColorScheme } from "react-native";
import MapView, { Marker } from "react-native-maps";

import Spacer from "@/components/themed-ui/Spacer";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";

import { MapMarker } from "@/components/listing/screen/map/MapMarker";
import NearbyChip from "@/components/listing/screen/neighborhood/NeighborhoodChip";

import { darkMapStyle } from "@/theme/map";

interface NeighborhoodItem {
  type: string;
  distance: number;
}

interface NeighborhoodSectionProps {
  latitude: number;
  longitude: number;
  neighborhood: NeighborhoodItem[];
}

export default function NeighborhoodSection({
  latitude,
  longitude,
  neighborhood,
}: NeighborhoodSectionProps) {
  const colorScheme = useColorScheme();

  return (
    <ThemedView>
      <ThemedText variant="h2">The neighborhood</ThemedText>

      <Spacer size="lg" />

      <ThemedView
        variant="secondary"
        borderRadius="card"
        style={styles.mapContainer}
      >
        <MapView
          customMapStyle={colorScheme === "dark" ? darkMapStyle : []}
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
          toolbarEnabled={false}
          showsCompass={false}
          showsScale={false}
          showsBuildings
          showsTraffic={false}
        >
          <Marker coordinate={{ latitude, longitude }}>
            <MapMarker />
          </Marker>
        </MapView>
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
    overflow: "hidden" as const,
    height: 190,
  },

  map: {
    flex: 1,
  },

  chips: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
  },
};
