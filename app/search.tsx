import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

import ChipSelectionList from "@/src/components/home/ChipSelection";
import ListingCard from "@/src/components/listing/card/ListingCard";
import Spacer from "@/src/components/themed-ui/Spacer";
import { ThemedButton } from "@/src/components/themed-ui/ThemedButton";
import { ThemedIconButton } from "@/src/components/themed-ui/ThemedIconButton";
import { ThemedSafeArea } from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedTextInput } from "@/src/components/themed-ui/ThemedTextInput";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { QUICK_FILTERS } from "@/src/constants/quick-filters";
import { useListings } from "@/src/hooks/react-query/useListings";
import { useUserLocation } from "@/src/hooks/useUserLocation";
import { navigation } from "@/src/lib/navigation";
import {
  countActiveFilters,
  getActiveFilterPills,
  useFilterStore,
} from "@/src/stores/filter";
import { sizes } from "@/src/theme/size";

export default function SearchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ q?: string }>();

  const [search, setSearch] = useState(params.q ?? "");
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

  const {
    data,
    isLoading,
    isRefetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useListings({
    city: city!,
    latitude: location?.latitude,
    longitude: location?.longitude,
    quickFilters: selectedFiltersIds,
  });

  const listings = useMemo(() => {
    let list = data?.pages.flatMap((page) => page.data) ?? [];

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.address.locality.toLowerCase().includes(q),
      );
    }

    if (appliedFilters.bhk.length > 0) {
      list = list.filter((item) => appliedFilters.bhk.includes(item.bhk));
    }

    if (appliedFilters.occupancy.length > 0) {
      list = list.filter((item) =>
        appliedFilters.occupancy.includes(item.occupancy),
      );
    }

    if (appliedFilters.minRent !== undefined) {
      list = list.filter((item) => item.rent >= appliedFilters.minRent!);
    }

    if (appliedFilters.maxRent !== undefined) {
      list = list.filter((item) => item.rent <= appliedFilters.maxRent!);
    }

    if (appliedFilters.availableImmediately) {
      list = list.filter((item) => item.availableImmediately);
    }

    return list;
  }, [data, search, appliedFilters]);

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
    setSearch("");
  };

  return (
    <ThemedSafeArea variant="primary" edges={["top"]}>
      <ThemedView style={styles.container}>
        {/* Top Search & Filter Bar */}
        <ThemedView style={styles.headerBar} gap="md">
          <ThemedIconButton
            variant="secondary"
            icon={<Ionicons name="chevron-back" size={22} />}
            onPress={() => router.back()}
            size="lg"
            accessibilityLabel="Go back"
          />

          <ThemedView style={styles.searchWrapper}>
            <ThemedTextInput
              variant="tertiary"
              value={search}
              onChangeText={setSearch}
              placeholder='Try "Indiranagar, 3 BHK"'
              returnKeyType="search"
              leftIcon={<Ionicons name="search-outline" size={20} />}
              rightIcon={
                search.length > 0 ? (
                  <Pressable
                    onPress={() => setSearch("")}
                    hitSlop={8}
                    accessibilityLabel="Clear search"
                  >
                    <Ionicons name="close-circle" size={18} />
                  </Pressable>
                ) : undefined
              }
              paddingHorizontal="md"
              containerStyle={styles.searchInput}
            />
          </ThemedView>

          <ThemedView style={styles.iconButtonWrapper}>
            <ThemedIconButton
              variant={activeFilterCount > 0 ? "accentPrimary" : "black"}
              icon={<Ionicons name="options-outline" size={20} />}
              onPress={() => router.push(navigation.filters)}
              size="lg"
              accessibilityLabel="Open filters"
            />

            {activeFilterCount > 0 && (
              <ThemedView
                variant="accent-primary"
                borderRadius="button"
                style={styles.badge}
              >
                <ThemedText
                  variant="caption"
                  color="foreground.white"
                  style={styles.badgeText}
                >
                  {activeFilterCount}
                </ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        </ThemedView>

        {/* Applied Filter Tags */}
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
                    <ThemedText variant="subTitle" color="foreground.black">
                      {pill.label}
                    </ThemedText>
                    <Ionicons name="close" size={15} color="#000" />
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

        {/* Listings List */}
        {isLoading ? (
          <ThemedView style={styles.centered}>
            <ActivityIndicator size="large" />
          </ThemedView>
        ) : (
          <FlatList
            data={listings}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
            }
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            ListHeaderComponent={
              <ThemedView style={styles.listHeader}>
                <ChipSelectionList
                  items={QUICK_FILTERS}
                  selectedChipsIds={selectedFiltersIds}
                  onSelect={toggleChip}
                />

                <ThemedView style={styles.resultsInfoRow}>
                  <ThemedText variant="title" color="foreground.primary">
                    {listings.length === 1
                      ? "1 Property found"
                      : `${listings.length} Properties found`}
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
                <ThemedView
                  variant="secondary"
                  style={styles.emptyIconCircle}
                >
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

                <Spacer size="xl" />

                <ThemedView style={styles.emptyActions} gap="md">
                  <ThemedButton
                    variant="accent-primary"
                    label="Clear All Filters"
                    onPress={handleClearAll}
                    style={styles.emptyButton}
                  />

                  <ThemedButton
                    variant="secondary"
                    label="Adjust Filters"
                    onPress={() => router.push(navigation.filters)}
                    style={styles.emptyButton}
                  />
                </ThemedView>
              </ThemedView>
            }
            ListFooterComponent={
              isFetchingNextPage ? (
                <ActivityIndicator style={{ marginVertical: sizes["2xl"] }} />
              ) : (
                <Spacer size="2xl" />
              )
            }
          />
        )}
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
    fontSize: 10,
    lineHeight: 12,
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
