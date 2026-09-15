import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from "react-native";

import { Locality } from "@/src/api/locality";
import ChipSelectionList from "@/src/components/home/ChipSelection";
import HomeHeader from "@/src/components/home/Header";
import ListingCard from "@/src/components/listing/card/ListingCard";
import { LoadingErrorScreen } from "@/src/components/shared/LoadingErrorScreen";
import { LoadingScreen } from "@/src/components/shared/LoadingScreen";
import SearchFilter from "@/src/components/shared/SearchFilter";
import Spacer from "@/src/components/themed-ui/Spacer";
import { ThemedSafeArea } from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { QUICK_FILTERS } from "@/src/constants/filters";
import { useListings } from "@/src/hooks/react-query/useListings";
import { useTheme } from "@/src/hooks/theme/useTheme";
import { useUserLocation } from "@/src/hooks/useUserLocation";
import { navigation } from "@/src/lib/navigation";
import { useFilterStore } from "@/src/stores/filter";
import { sizes } from "@/src/theme/size";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const [selectedFiltersIds, setSelectedFiltersIds] = useState<string[]>([]);
  const [searchLocality, setSearchLocality] = useState<Locality | undefined>(
    undefined,
  );
  const [searchResetKey, setSearchResetKey] = useState(false);

  const resetFilters = useFilterStore((state) => state.resetFilters);

  const { location, city } = useUserLocation();

  const {
    data,
    isError: isListingsDataError,
    isLoading: isListingsDataLoading,
    isFetching: isListingsDataFetching,
    isFetchingNextPage: isListingsDataFetchingNextPage,
    refetch: listingsDataRefetch,
    fetchNextPage: listingsDataFetchNextPage,
    hasNextPage: listingsDataHasNextPage,
  } = useListings({
    city: city!,
    latitude: location!.latitude,
    longitude: location!.longitude,
    quickFilters: selectedFiltersIds,
  });

  const listings = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  const toggleChip = (id: string) => {
    setSelectedFiltersIds((current) => {
      if (id === "all") {
        return [];
      }

      if (current.includes(id)) {
        return current.filter((chip) => chip !== id);
      }

      return [...current.filter((chip) => chip !== "all"), id];
    });
  };

  useFocusEffect(
    useCallback(() => {
      setSearchLocality(undefined);
      resetFilters();
      setSearchResetKey((prev) => !prev);
    }, [resetFilters]),
  );

  if (isListingsDataLoading) {
    return <LoadingScreen />;
  }

  if (!data) {
    return (
      <LoadingErrorScreen
        title="Could not load listings"
        message={`We couldn’t connect to our servers.\n Please check your internet connection and try again.`}
        retryLabel="Try Again"
        onRetry={listingsDataRefetch}
        retryLoading={isListingsDataFetching}
      />
    );
  }

  if (isListingsDataError) {
    Toast.show({
      type: "error",
      text1: "Could not load data!",
      text2: "Could not fetch fresh listings, please try again",
    });
  }

  if (data && listings.length === 0) {
    return (
      <ThemedSafeArea padding="lg">
        <ThemedView style={{ flex: 1 }}>
          <HomeHeader />

          <ThemedView
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: sizes.lg,
            }}
          >
            <ThemedText variant="h3">No listings found</ThemedText>

            <ThemedText
              variant="caption"
              style={{
                textAlign: "center",
                marginTop: sizes.sm,
              }}
            >
              We couldn't find any listings in {city}.
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedSafeArea>
    );
  }

  return (
    <ThemedSafeArea>
      <ThemedView style={{ flex: 1 }}>
        <ThemedView
          style={{
            paddingHorizontal: sizes.lg,
            paddingTop: sizes.lg,
            zIndex: 100,
            elevation: 100,
          }}
        >
          <HomeHeader />
          <Spacer size="lg" />
          <SearchFilter
            onLocalitySelect={(locality) => {
              setSearchLocality(locality);
              if (locality) {
                router.push(
                  navigation.searchFilter.searchWithQuery(locality.name),
                );
              }
            }}
            onSearch={() => {
              if (!searchLocality) {
                Toast.show({
                  type: "error",
                  text1: "Please select a locality to search!",
                });
                return;
              }

              router.push(
                navigation.searchFilter.searchWithQuery(searchLocality.name),
              );
            }}
            onFilterPress={() =>
              router.push({
                pathname: navigation.searchFilter.filters,
                params: { source: "home" },
              })
            }
            activeFilterCount={0}
            placeholder="Search any locality"
            resetKey={searchResetKey}
          />

          <ChipSelectionList
            items={QUICK_FILTERS}
            selectedChipsIds={selectedFiltersIds}
            onSelect={toggleChip}
          />
        </ThemedView>

        <FlatList
          data={listings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            padding: sizes.lg,
            paddingBottom: sizes["6xl"],
            gap: sizes.lg,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={
                isListingsDataFetching && !isListingsDataFetchingNextPage
              }
              onRefresh={listingsDataRefetch}
            />
          }
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (listingsDataHasNextPage && !isListingsDataFetchingNextPage) {
              listingsDataFetchNextPage();
            }
          }}
          renderItem={({ item }) => <ListingCard {...item} />}
          ListEmptyComponent={
            <ThemedView style={styles.container}>
              <ThemedView variant="secondary" style={styles.iconCircle}>
                <Ionicons name="search-outline" size={36} color="#666" />
              </ThemedView>

              <Spacer size="lg" />

              <ThemedText variant="title" color="foreground.primary">
                No properties found
              </ThemedText>

              <Spacer size="xs" />

              <ThemedText
                variant="bodySmall"
                color="foreground.secondary"
                style={styles.description}
              >
                {`We couldn't find any homes in ${city}, Please try again in a while.`}
              </ThemedText>
            </ThemedView>
          }
          ListFooterComponent={
            isListingsDataFetchingNextPage ? (
              <>
                <ActivityIndicator
                  color={colors.accent.primary}
                  style={{ marginVertical: 24 }}
                />
                <Spacer size="lg" />
              </>
            ) : (
              <Spacer size="2xl" />
            )
          }
        />
      </ThemedView>
    </ThemedSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: sizes["5xl"],
    paddingHorizontal: sizes["2xl"],
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    textAlign: "center",
  },
});
