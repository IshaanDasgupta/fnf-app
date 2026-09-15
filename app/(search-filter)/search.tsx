import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Locality } from "@/src/api/locality";
import ListingCard from "@/src/components/listing/card/ListingCard";
import { LoadingErrorScreen } from "@/src/components/shared/LoadingErrorScreen";
import { LoadingScreen } from "@/src/components/shared/LoadingScreen";
import SearchFilter from "@/src/components/shared/SearchFilter";
import Spacer from "@/src/components/themed-ui/Spacer";
import { ThemedIconButton } from "@/src/components/themed-ui/ThemedIconButton";
import { ThemedSafeArea } from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useSearchListings } from "@/src/hooks/react-query/useSearchListings";
import { useTheme } from "@/src/hooks/theme/useTheme";
import { useUserLocation } from "@/src/hooks/useUserLocation";
import { navigation } from "@/src/lib/navigation";
import {
  countActiveFilters,
  getActiveFilterPills,
  useFilterStore,
} from "@/src/stores/filter";
import { shadows } from "@/src/theme/shadows";
import { sizes } from "@/src/theme/size";
import Toast from "react-native-toast-message";

export default function SearchScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ q?: string }>();

  const [searchLocality, setSearchLocality] = useState<Locality | undefined>(
    params.q
      ? { name: params.q, location: { latitude: 0, longitude: 0 } }
      : undefined,
  );

  const [selectedFiltersIds, setSelectedFiltersIds] = useState<string[]>([]);

  const appliedFilters = useFilterStore((state) => state.appliedFilters);
  const updateAppliedFilters = useFilterStore(
    (state) => state.updateAppliedFilters,
  );
  const resetFilters = useFilterStore((state) => state.resetFilters);

  const activeFilterCount = countActiveFilters(appliedFilters);
  const activeFilterPills = useMemo(
    () => getActiveFilterPills(appliedFilters, updateAppliedFilters),
    [appliedFilters, updateAppliedFilters],
  );

  const { location, city } = useUserLocation();

  useEffect(() => {
    updateAppliedFilters((prev) => ({
      ...prev,
      locality: searchLocality?.name,
    }));
  }, [searchLocality]);

  const {
    data,
    isError: isListingsDataError,
    isLoading: isListingsDataLoading,
    isFetching: isListingsDataFetching,
    isFetchingNextPage: isListingsDataFetchingNextPage,
    refetch: listingsDataRefetch,
    fetchNextPage: listingsDataFetchNextPage,
    hasNextPage: listingsDataHasNextPage,
  } = useSearchListings({
    city: city!,
    latitude: location?.latitude,
    longitude: location?.longitude,
    ...appliedFilters,
    sortBy: "distance",
    sortOrder: "asc",
  });

  const listings = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const toggleChip = (id: string) => {
    setSelectedFiltersIds((current) => {
      if (id === "all") {
        return [];
      }

      if (current.includes(id)) {
        return current.filter((chip) => chip !== id);
      }

      return [...current, id];
    });
  };

  const handleClearAll = () => {
    resetFilters();
    setSelectedFiltersIds([]);
  };

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

  return (
    <ThemedSafeArea variant="primary" edges={["top"]}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.headerBar} gap="md">
          <ThemedIconButton
            variant="secondary"
            icon={<Ionicons name="chevron-back" size={22} />}
            onPress={() => router.back()}
            size="lg"
            accessibilityLabel="Go back"
            style={shadows.lg}
          />

          <ThemedView style={{ flex: 1 }}>
            <SearchFilter
              initialValue={searchLocality}
              onLocalitySelect={setSearchLocality}
              onSearch={() => {
                if (!searchLocality) {
                  Toast.show({
                    type: "error",
                    text1: "Please select a locality to search!",
                  });
                  return;
                }
              }}
              onFilterPress={() =>
                router.push({
                  pathname: navigation.searchFilter.filters,
                  params: { source: "search" },
                })
              }
              activeFilterCount={activeFilterCount}
              placeholder="Search any locality"
            />
          </ThemedView>
        </ThemedView>

        {activeFilterPills.length > 0 && (
          <ThemedView style={styles.activeFiltersContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.activeFiltersScroll}
            >
              {activeFilterPills.map((pill) => (
                <Pressable
                  key={pill.id}
                  onPress={pill.onRemove}
                  style={styles.pillPressable}
                >
                  <ThemedView
                    variant="accent-primary"
                    borderRadius="button"
                    style={styles.pill}
                  >
                    <ThemedText variant="subTitle" color="foreground.white">
                      {pill.label}
                    </ThemedText>
                    <Ionicons
                      name="close"
                      size={15}
                      color={colors.foreground.white}
                    />
                  </ThemedView>
                </Pressable>
              ))}

              <Pressable
                onPress={resetFilters}
                style={styles.clearAllPressable}
              >
                <ThemedView
                  variant="secondary"
                  borderRadius="button"
                  style={styles.clearAllPill}
                >
                  <ThemedText variant="subTitle" color="accent.primary">
                    Clear all
                  </ThemedText>
                </ThemedView>
              </Pressable>
            </ScrollView>
          </ThemedView>
        )}

        <FlatList
          data={listings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isListingsDataFetching}
              onRefresh={listingsDataRefetch}
            />
          }
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (listingsDataHasNextPage && !isListingsDataFetchingNextPage) {
              listingsDataFetchNextPage();
            }
          }}
          ListHeaderComponent={
            <ThemedView style={styles.listHeader}>
              <ThemedView style={styles.resultsInfoRow}>
                <ThemedText variant="title" color="foreground.primary">
                  {listings.length === 1
                    ? "1 Property found"
                    : `${listings.length}${listingsDataHasNextPage ? "+" : ""} Properties found`}
                </ThemedText>
                {city && (
                  <ThemedText variant="caption" color="foreground.tertiary">
                    in {city.charAt(0).toUpperCase() + city.slice(1)}
                  </ThemedText>
                )}
              </ThemedView>
            </ThemedView>
          }
          renderItem={({ item }) => <ListingCard {...item} />}
          ListEmptyComponent={
            <ThemedView style={styles.emptyState}>
              <ThemedView variant="secondary" style={styles.emptyIconCircle}>
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
                style={styles.emptyDescription}
              >
                We couldn't find any homes matching your current filters or
                search criteria.
              </ThemedText>
            </ThemedView>
          }
          ListFooterComponent={
            isListingsDataFetchingNextPage ? (
              <ActivityIndicator
                color={colors.accent.primary}
                style={{ marginVertical: sizes["2xl"] }}
              />
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
    flex: 1,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: sizes.lg,
    paddingVertical: sizes.sm,
  },
  searchWrapper: {
    flex: 1,
  },
  searchInput: {
    minHeight: 48,
  },
  iconButtonWrapper: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 8,
    lineHeight: 9.6,
    fontWeight: "700",
  },
  activeFiltersContainer: {
    paddingVertical: sizes.xs,
  },
  activeFiltersScroll: {
    paddingHorizontal: sizes.lg,
    gap: sizes.sm,
    flexDirection: "row",
    alignItems: "center",
  },
  pillPressable: {
    alignSelf: "center",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: sizes.xs,
    paddingHorizontal: sizes.md,
    paddingVertical: sizes.xs,
  },
  clearAllPressable: {
    alignSelf: "center",
  },
  clearAllPill: {
    paddingHorizontal: sizes.md,
    paddingVertical: sizes.xs,
  },
  listContent: {
    padding: sizes.lg,
    paddingBottom: sizes["6xl"],
    gap: sizes.lg,
  },
  listHeader: {
    gap: sizes.sm,
  },
  resultsInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingVertical: sizes.xs,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: sizes["5xl"],
    paddingHorizontal: sizes["2xl"],
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyDescription: {
    textAlign: "center",
  },
  emptyActions: {
    width: "100%",
    maxWidth: 280,
  },
  emptyButton: {
    width: "100%",
  },
});
