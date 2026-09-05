import React, { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";

import ChipSelectionList from "@/src/components/home/ChipSelection";
import HomeHeader from "@/src/components/home/Header";
import ListingCard from "@/src/components/listing/card/ListingCard";
import SearchFilter from "@/src/components/shared/SearchFilter";
import Spacer from "@/src/components/themed-ui/Spacer";
import { ThemedSafeArea } from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { QUICK_FILTERS } from "@/src/constants/quick-filters";
import { useListings } from "@/src/hooks/react-query/useListings";
import { useUserLocation } from "@/src/hooks/useUserLocation";
import { navigation } from "@/src/lib/navigation";
import { countActiveFilters, useFilterStore } from "@/src/stores/filter";
import { sizes } from "@/src/theme/size";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedFiltersIds, setSelectedFiltersIds] = useState<string[]>([]);

  const appliedFilters = useFilterStore((state) => state.appliedFilters);
  const activeFilterCount = countActiveFilters(appliedFilters);

  const { location, city } = useUserLocation();

  if (!city) {
    return (
      <ThemedSafeArea padding="lg">
        <ThemedView style={{ flex: 1 }}>
          <HomeHeader />

          <ThemedView
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ThemedText variant="h3">
              Please select a city to browse listings
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedSafeArea>
    );
  }

  const {
    data,
    isLoading,
    isFetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useListings({
    city: city!,
    latitude: location!.latitude,
    longitude: location!.longitude,
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

  if (isLoading && !data) {
    return (
      <ThemedSafeArea padding="lg">
        <ThemedView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator />
        </ThemedView>
      </ThemedSafeArea>
    );
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
            refreshing={isFetching && !isFetchingNextPage}
            onRefresh={refetch}
          />
        }
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        ListHeaderComponent={
          <>
            <HomeHeader />

            <SearchFilter
              value={search}
              onChangeText={setSearch}
              onSearch={() => {
                if (search.trim()) {
                  router.push(navigation.searchWithQuery(search.trim()));
                } else {
                  router.push(navigation.search);
                }
              }}
              onFilterPress={() => router.push(navigation.filters)}
              activeFilterCount={activeFilterCount}
              placeholder='Try "Indiranagar, 3 bhk"'
            />

            <ChipSelectionList
              items={QUICK_FILTERS}
              selectedChipsIds={selectedFiltersIds}
              onSelect={toggleChip}
            />

            <Spacer size="lg" />
          </>
        }
        renderItem={({ item }) => <ListingCard {...item} />}
        ListEmptyComponent={
          !isLoading ? (
            <ThemedView
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: sizes["4xl"],
              }}
            >
              <ThemedText variant="title" color="foreground.secondary">
                No listings found
              </ThemedText>
              <Spacer size="xs" />
              <ThemedText variant="bodySmall" color="foreground.tertiary">
                Try adjusting your filters or search criteria.
              </ThemedText>
            </ThemedView>
          ) : null
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={{ marginVertical: 24 }} />
          ) : (
            <Spacer size="2xl" />
          )
        }
      />
    </ThemedSafeArea>
  );
}
