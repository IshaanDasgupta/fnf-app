import { useMemo, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, useColorScheme } from "react-native";
import MapView from "react-native-maps";

import { ClusterMarker } from "@/src/components/map/ClusteMarker";
import { PropertyMarker } from "@/src/components/map/PropertyMarker";
import { ListingPreviewCard } from "@/src/components/map/PropertyPreviewCard";

import Spacer from "@/src/components/themed-ui/Spacer";
import ThemedSafeArea from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";

import {
  INIT_MAP_REGION_DELTA,
  MAP_REGION_DEBOUNCE_MS,
} from "@/src/constants/map-constants";
import { useMapListings } from "@/src/hooks/react-query/useMapListings";
import { useDebouncedValue } from "@/src/hooks/useDebouncedValue";
import { useSupercluster } from "@/src/hooks/useSupercluster";

import { LoadingErrorScreen } from "@/src/components/shared/LoadingErrorScreen";
import { LoadingScreen } from "@/src/components/shared/LoadingScreen";
import SearchFilter from "@/src/components/shared/SearchFilter";
import { ThemedIconButton } from "@/src/components/themed-ui/ThemedIconButton";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { useTheme } from "@/src/hooks/theme/useTheme";
import { navigation } from "@/src/lib/navigation";
import {
  countActiveMapFilters,
  useMapFilterStore,
} from "@/src/stores/map-filters";
import { darkMapStyle } from "@/src/theme/map";
import { sizes } from "@/src/theme/size";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

interface MapContentProps {
  latitude: number;
  longitude: number;
}

export default function MapContent({ latitude, longitude }: MapContentProps) {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();

  const router = useRouter();

  const [selectedListingId, setSelectedListingId] = useState<string>();
  const [searchLocality, setSearchLocality] = useState<string | undefined>(
    undefined,
  );

  const appliedMapFilters = useMapFilterStore(
    (state) => state.appliedMapFilters,
  );

  const activeMapFilterCount = countActiveMapFilters(appliedMapFilters);

  const mapRef = useRef<MapView>(null);

  const [region, setRegion] = useState({
    latitude,
    longitude,
    latitudeDelta: INIT_MAP_REGION_DELTA,
    longitudeDelta: INIT_MAP_REGION_DELTA,
  });

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
    isLoading: isMapDataLoading,
    isFetching: isMapDataFetching,
    isError: isMapDataError,
    refetch: refetchMapListings,
  } = useMapListings({
    ...bounds,
    limit: 200,
    ...appliedMapFilters,
  });

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

  const goToUserLocation = () => {
    setSelectedListingId(undefined);

    mapRef.current?.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: INIT_MAP_REGION_DELTA,
        longitudeDelta: INIT_MAP_REGION_DELTA,
      },
      500,
    );
  };

  if (isMapDataLoading) {
    return <LoadingScreen />;
  }

  if (isMapDataError && listings.length === 0) {
    return (
      <LoadingErrorScreen
        title="Couldn't load listings"
        message="Something went wrong while loading listings. Please try again."
        onRetry={async () => {
          const result = await refetchMapListings();

          if (result.isError) {
            Toast.show({
              type: "error",
              text1: "Couldn't load listings",
              text2: "Please try again in a moment.",
            });
          }
        }}
        retryLoading={isMapDataFetching}
      />
    );
  }

  if (isMapDataError) {
    Toast.show({
      type: "error",
      text1: "Could not load data!",
      text2: "Could not fetch fresh listing, please try again",
    });
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
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsBuildings
        onPress={() => setSelectedListingId(undefined)}
        onRegionChangeComplete={setRegion}
      >
        {/* Property / cluster markers */}
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
          <ThemedView style={styles.listingCount}>
            {isMapDataFetching ? (
              <>
                <ThemedView style={{ flexDirection: "row" }} gap="xs">
                  <ActivityIndicator color={colors.accent.primary} size={12} />
                  <ThemedText variant="caption" color="accent.primary">
                    Updating listings
                  </ThemedText>
                </ThemedView>
              </>
            ) : (
              <ThemedView style={{ flexDirection: "row" }} gap="xs">
                <ThemedText variant="caption" color="accent.primary">
                  {listings.length}
                </ThemedText>
                <ThemedText variant="caption" color="accent.primary">
                  {listings.length === 1 ? "listing" : "listings"} in this area
                </ThemedText>
              </ThemedView>
            )}
          </ThemedView>

          <Spacer size="md" />

          <SearchFilter
            onLocalitySelect={setSearchLocality}
            onSearch={() => {
              if (!searchLocality) {
                Toast.show({
                  type: "error",
                  text1: "Please select a locality to search!",
                });
                return;
              }
              console.log(searchLocality);
            }}
            onFilterPress={() =>
              router.push({
                pathname: navigation.filters,
                params: { source: "map" },
              })
            }
            activeFilterCount={activeMapFilterCount}
            placeholder='Try "Indiranagar, 3 bhk"'
          />

          <Spacer size="xl" />

          <ThemedIconButton
            icon={<Ionicons name="locate" size={26} />}
            variant="inverse"
            size="xl"
            radius="card"
            onPress={goToUserLocation}
            style={{ alignSelf: "flex-end" }}
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
  listingCount: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});
