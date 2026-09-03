import { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, useColorScheme } from "react-native";
import MapView from "react-native-maps";

import { ClusterMarker } from "@/src/components/map/ClusteMarker";
import { MapFilterBar } from "@/src/components/map/MapFilterBar";
import { MapTopBar } from "@/src/components/map/MapTopBar";
import { PropertyMarker } from "@/src/components/map/PropertyMarker";
import { ListingPreviewCard } from "@/src/components/map/PropertyPreviewCard";

import Spacer from "@/src/components/themed-ui/Spacer";
import ThemedSafeArea from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";

import { MAP_REGION_DEBOUNCE_MS } from "@/src/constants/map-constants";
import { QUICK_FILTERS } from "@/src/constants/quick-filters";
import { useMapListings } from "@/src/hooks/react-query/useMapListings";
import { useDebouncedValue } from "@/src/hooks/useDebouncedValue";
import { useSupercluster } from "@/src/hooks/useSupercluster";
import { useUserLocation } from "@/src/hooks/useUserLocation";

import { darkMapStyle } from "@/src/theme/map";
import { sizes } from "@/src/theme/size";

export default function MapScreen() {
  const colorScheme = useColorScheme();

  const { location, isLoading } = useUserLocation();

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  });

  const [selectedFiltersIds, setSelectedFiltersIds] = useState<string[]>([]);
  const [selectedListingId, setSelectedListingId] = useState<string>();

  const mapRef = useRef<MapView>(null);

  // Debounce the region so rapid pans don't fire a request per frame.
  const debouncedRegion = useDebouncedValue(region, MAP_REGION_DEBOUNCE_MS);

  const bounds = useMemo(
    () => ({
      north: debouncedRegion.latitude + debouncedRegion.latitudeDelta / 2,
      south: debouncedRegion.latitude - debouncedRegion.latitudeDelta / 2,
      east: debouncedRegion.longitude + debouncedRegion.longitudeDelta / 2,
      west: debouncedRegion.longitude - debouncedRegion.longitudeDelta / 2,
    }),
    [debouncedRegion],
  );

  const {
    data: listings = [],
    isLoading: isMapLoading,
    isFetching,
  } = useMapListings(
    {
      ...bounds,
      limit: 200,
      quickFilters: selectedFiltersIds,
    },
    !isLoading,
  );

  useEffect(() => {
    if (!location) {
      return;
    }

    setRegion((current) => ({
      ...current,
      latitude: location.latitude,
      longitude: location.longitude,
    }));
  }, [isLoading, location]);

  const mapListings = useMemo(
    () =>
      listings.map((listing) => ({
        id: listing.id,
        latitude: listing.location.latitude,
        longitude: listing.location.longitude,
        price: listing.rent,
      })),
    [listings],
  );

  const { markers, getExpansionZoom } = useSupercluster({
    properties: mapListings,
    region,
  });

  const selectedProperty = useMemo(
    () => listings.find((listing) => listing.id === selectedListingId),
    [listings, selectedListingId],
  );

  const toggleFilter = (id: string) => {
    setSelectedFiltersIds((current) => {
      if (id === "all") {
        return [];
      }

      if (current.includes(id)) {
        return current.filter((filterId) => filterId !== id);
      }

      return [...current, id];
    });
  };

  if (isLoading) {
    return (
      <ThemedSafeArea>
        <ThemedView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator />
        </ThemedView>
      </ThemedSafeArea>
    );
  }

  return (
    <ThemedView variant="primary" style={styles.container}>
      <MapView
        ref={mapRef}
        customMapStyle={colorScheme === "dark" ? darkMapStyle : []}
        provider="google"
        style={StyleSheet.absoluteFill}
        initialRegion={region}
        toolbarEnabled={false}
        showsCompass={false}
        showsScale={false}
        showsTraffic={false}
        showsBuildings
        onPress={() => setSelectedListingId(undefined)}
        onRegionChangeComplete={setRegion}
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

          <MapFilterBar
            items={QUICK_FILTERS}
            selectedChipsIds={selectedFiltersIds}
            onSelect={toggleFilter}
          />
        </ThemedView>

        {selectedProperty && (
          <ThemedView style={styles.preview}>
            <ListingPreviewCard
              listingId={selectedProperty.id}
              image={selectedProperty.coverImage}
              title={selectedProperty.title}
              location={`${selectedProperty.address.locality}, ${selectedProperty.address.city}`}
              bhk={selectedProperty.bhk}
              rent={selectedProperty.rent}
              occupancy={selectedProperty.occupancy}
              favourite={selectedProperty.favorite}
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
