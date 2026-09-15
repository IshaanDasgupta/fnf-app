import React from "react";
import { Linking, Platform, Pressable, useColorScheme } from "react-native";
import MapView, { Marker } from "react-native-maps";

import Spacer from "@/src/components/themed-ui/Spacer";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";

import { MapMarker } from "@/src/components/listing/screen/map/MapMarker";
import NearbyChip from "@/src/components/listing/screen/neighborhood/NeighborhoodChip";

import { ThemedIconText } from "@/src/components/themed-ui/ThemedIconText";
import { darkMapStyle } from "@/src/theme/map";
import { shadows } from "@/src/theme/shadows";
import { sizes } from "@/src/theme/size";
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

export default function NeighborhoodSection({
  latitude,
  longitude,
  neighborhood,
}: NeighborhoodSectionProps) {
  const colorScheme = useColorScheme();

  const openInMaps = async () => {
    if (Platform.OS === "ios") {
      await Linking.openURL(
        `http://maps.apple.com/?ll=${latitude},${longitude}`,
      );
      return;
    }

    const googleMapsUrl = `comgooglemaps://?q=${latitude},${longitude}`;
    const fallbackUrl = `geo:${latitude},${longitude}`;

    const canOpenGoogleMaps = await Linking.canOpenURL(googleMapsUrl);

    if (canOpenGoogleMaps) {
      await Linking.openURL(googleMapsUrl);
    } else {
      await Linking.openURL(fallbackUrl);
    }
  };

  return (
    <ThemedView>
      <ThemedText variant="h2">The neighborhood</ThemedText>

      <Spacer size="lg" />
      <Pressable onPress={openInMaps}>
        <ThemedView borderRadius="card" style={styles.mapContainer}>
          <MapView
            customMapStyle={colorScheme === "dark" ? darkMapStyle : []}
            style={styles.map}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.006,
              longitudeDelta: 0.006,
            }}
            toolbarEnabled={false}
            showsCompass={false}
            showsScale={false}
            showsBuildings
            showsTraffic={false}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <Marker coordinate={{ latitude, longitude }}>
              <MapMarker />
            </Marker>
          </MapView>
          <ThemedView
            variant="inverse"
            borderRadius="card"
            paddingVertical="md"
            paddingHorizontal="lg"
            style={{
              position: "absolute",
              right: sizes.md,
              bottom: sizes.md,
              ...shadows.lg,
            }}
          >
            <ThemedIconText
              icon={<Ionicons name="map-outline" />}
              iconColor="foreground.inverse"
              label="Open Map"
              labelColor="foreground.inverse"
              variant="caption"
            />
          </ThemedView>
        </ThemedView>
      </Pressable>

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
