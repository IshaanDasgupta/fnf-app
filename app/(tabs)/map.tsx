import { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { PropertyMarker } from "@/components/map/PropertyMarker";
import { MapFilterBar } from "@/components/map/MapFilterBar";
import { MapTopBar } from "@/components/map/MapTopBar";

import { ThemedView } from "@/components/themed-ui/ThemedView";
import { ListingPreviewCard } from "@/components/map/PropertyPreviewCard";
import Spacer from "@/components/themed-ui/Spacer";
import { sizes } from "@/theme/size";
import ThemedSafeArea from "@/components/themed-ui/ThemedSafeArea";
import { darkMapStyle } from "@/theme/map";
import { useSupercluster } from "@/hooks/useSupercluster";
import { ClusterMarker } from "@/components/map/ClusteMarker";
import { LISTINGS } from "@/constants/listings";

const FILTERS = [
  {
    id: "price",
    label: "Price",
  },
  {
    id: "bedrooms",
    label: "Bedrooms",
  },
  {
    id: "moveIn",
    label: "Move-in",
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
  },
  {
    id: "test",
    label: "Test",
  },
  {
    id: "test2",
    label: "Ttest2",
  },
];

export default function MapScreen() {
  const colorScheme = useColorScheme();

  const [region, setRegion] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const { markers, getExpansionZoom } = useSupercluster({
    properties: LISTINGS,
    region,
  });

  const [search, setSearch] = useState("Indiranagar & nearby");

  const [selectedFilter, setSelectedFilter] = useState<string>();

  const [selectedListingId, setSelectedListingId] = useState<string>();

  const selectedProperty = useMemo(
    () => LISTINGS.find((listing) => listing.id === selectedListingId),
    [selectedListingId],
  );

  useEffect(() => {
    console.log(selectedProperty);
  }, [selectedProperty]);

  const visibleProperties = useMemo(() => {
    const north = region.latitude + region.latitudeDelta / 2;
    const south = region.latitude - region.latitudeDelta / 2;

    const east = region.longitude + region.longitudeDelta / 2;
    const west = region.longitude - region.longitudeDelta / 2;

    return LISTINGS.filter((property) => {
      return (
        property.latitude >= south &&
        property.latitude <= north &&
        property.longitude >= west &&
        property.longitude <= east
      );
    });
  }, [region]);

  const mapRef = useRef<MapView>(null);

  return (
    <ThemedView variant="primary" style={styles.container}>
      <MapView
        ref={mapRef}
        customMapStyle={colorScheme === "dark" ? darkMapStyle : []}
        provider="google"
        googleRenderer="LEGACY"
        style={StyleSheet.absoluteFill}
        initialRegion={region}
        toolbarEnabled={false}
        showsCompass={false}
        showsScale={false}
        showsTraffic={false}
        showsBuildings
        onPress={() => setSelectedListingId(undefined)}
        onRegionChange={setRegion}
      >
        {markers.map((marker) => {
          if (marker.type === "property") {
            return (
              <PropertyMarker
                key={marker.property.id}
                id={marker.property.id}
                latitude={marker.property.latitude}
                longitude={marker.property.longitude}
                price={marker.property.price}
                selected={selectedListingId === marker.property.id}
                onPress={() => {
                  console.log("pressed on prop", marker.property.id);
                  setSelectedListingId(marker.property.id);
                }}
              />
            );
          }

          return (
            <ClusterMarker
              key={`cluster-${marker.id}`}
              latitude={marker.latitude}
              longitude={marker.longitude}
              count={marker.count}
              onPress={() => {
                const zoom = getExpansionZoom(marker.id);

                const longitudeDelta = 360 / Math.pow(2, zoom);
                const latitudeDelta = longitudeDelta;

                mapRef.current?.animateToRegion(
                  {
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                    latitudeDelta,
                    longitudeDelta,
                  },
                  300,
                );
              }}
            />
          );
        })}
      </MapView>

      <ThemedSafeArea
        variant="transparent"
        style={StyleSheet.absoluteFill}
        pointerEvents="box-none"
      >
        <ThemedView style={styles.topBar}>
          <MapTopBar />
          <Spacer size="xl" />
          <MapFilterBar items={FILTERS} onSelect={setSelectedFilter} />
        </ThemedView>

        {selectedProperty && (
          <ThemedView style={styles.preview}>
            <ListingPreviewCard
              image={selectedProperty.image}
              match={selectedProperty.match}
              title={selectedProperty.title}
              location={selectedProperty.location}
              bedrooms={selectedProperty.bedrooms}
              flatmates={selectedProperty.flatmates}
              rent={selectedProperty.price}
              onPress={() => {}}
              onFavourite={() => {}}
              onMessage={() => {}}
            />
          </ThemedView>
        )}
      </ThemedSafeArea>
    </ThemedView>
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

  preview: {
    position: "absolute",
    left: sizes.lg,
    right: sizes.lg,
    bottom: 120,
  },
});
