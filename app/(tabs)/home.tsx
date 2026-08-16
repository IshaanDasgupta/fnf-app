import React, { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";

import ChipSelectionList from "@/src/components/home/ChipSelection";
import HomeHeader from "@/src/components/home/Header";
import SearchFilter from "@/src/components/home/SearchFilter";
import ListingCard from "@/src/components/listing/card/ListingCard";
import Spacer from "@/src/components/themed-ui/Spacer";
import { ThemedSafeArea } from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { QUICK_FILTERS } from "@/src/constants/quick-filters";
import { useListings } from "@/src/hooks/react-query/useListings";
import { useUserLocation } from "@/src/hooks/useUserLocation";
import { sizes } from "@/src/theme/size";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [selectedFiltersIds, setSelectedFiltersIds] = useState<string[]>([]);

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
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
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
              onFilterPress={() => {}}
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
