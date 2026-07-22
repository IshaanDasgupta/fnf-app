import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";
import Spacer from "@/components/themed-ui/Spacer";
import NearbyChip from "@/components/listing/screen/neighborhood/NeighborhoodChip";
import MapView, { Marker } from "react-native-maps";

export default function NeighborhoodSection() {
  return (
    <ThemedView>
      <ThemedText variant="h3">The neighborhood</ThemedText>

      <Spacer size="lg" />

      <ThemedView
        variant="secondary"
        borderRadius="card"
        style={{
          overflow: "hidden",
          height: 190,
        }}
      >
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 12.9716,
            longitude: 77.5946,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
          //   scrollEnabled={false}
          //   zoomEnabled={false}
          //   rotateEnabled={false}
          //   pitchEnabled={false}
          toolbarEnabled={false}
          showsCompass={false}
          showsScale={false}
          showsBuildings
          showsTraffic={false}
        >
          <Marker
            coordinate={{
              latitude: 12.9716,
              longitude: 77.5946,
            }}
          />
        </MapView>
      </ThemedView>

      <Spacer size="lg" />

      <ThemedView flexDirection="row" gap="md">
        <NearbyChip title="Metro" value="8 min" />

        <NearbyChip title="Cafés" value="24 nearby" />

        <NearbyChip title="Park" value="3 min" />
      </ThemedView>
    </ThemedView>
  );
}
