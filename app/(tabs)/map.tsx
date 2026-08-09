import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import MapView from "react-native-maps";

import { ClusterMarker } from "@/components/map/ClusteMarker";
import { MapFilterBar } from "@/components/map/MapFilterBar";
import { MapTopBar } from "@/components/map/MapTopBar";
import { PropertyMarker } from "@/components/map/PropertyMarker";
import { ListingPreviewCard } from "@/components/map/PropertyPreviewCard";

import Spacer from "@/components/themed-ui/Spacer";
import ThemedSafeArea from "@/components/themed-ui/ThemedSafeArea";
import { ThemedView } from "@/components/themed-ui/ThemedView";

import { QUICK_FILTERS } from "@/constants/quick-filters";
import { useSupercluster } from "@/hooks/useSupercluster";
import { useUserLocation } from "@/hooks/useUserLocation";

import { getMapListings, MapListingsResponse } from "@/api/listing";
import { darkMapStyle } from "@/theme/map";
import { sizes } from "@/theme/size";

export default function MapScreen() {
  const colorScheme = useColorScheme();

  const location = useUserLocation();

  const [region, setRegion] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [selectedFiltersIds, setSelectedFiltersIds] = useState<string[]>([]);

  const [listings, setListings] = useState<MapListingsResponse[]>([]);

  const [selectedListingId, setSelectedListingId] = useState<string>();

  const mapRef = useRef<MapView>(null);

  const fetchMapListings = useCallback(async () => {
    try {
      const north = region.latitude + region.latitudeDelta / 2;
      const south = region.latitude - region.latitudeDelta / 2;
      const east = region.longitude + region.longitudeDelta / 2;
      const west = region.longitude - region.longitudeDelta / 2;

      const response = await getMapListings({
        north,
        south,
        east,
        west,
        limit: 200,
        quickFilters: selectedFiltersIds,
      });

      setListings(response.data);
    } catch (error) {
      console.error("Failed to fetch map listings:", error);
    }
  }, [
    region.latitude,
    region.longitude,
    region.latitudeDelta,
    region.longitudeDelta,
    selectedFiltersIds,
  ]);

  useEffect(() => {
    if (!location) {
      return;
    }

    setRegion((current) => ({
      ...current,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }));
  }, []);

  useEffect(() => {
    fetchMapListings();
  }, [fetchMapListings]);

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
              image={selectedProperty.coverImage}
              title={selectedProperty.title}
              location={`${selectedProperty.address.locality}, ${selectedProperty.address.city}`}
              rent={selectedProperty.rent}
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
