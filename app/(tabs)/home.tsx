import React, { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";

import ChipSelectionList from "@/components/home/ChipSelection";
import HomeHeader from "@/components/home/Header";
import SearchFilter from "@/components/home/SearchFilter";
import ListingCard from "@/components/listing/card/ListingCard";
import Spacer from "@/components/themed-ui/Spacer";
import { ThemedSafeArea } from "@/components/themed-ui/ThemedSafeArea";
import { ThemedView } from "@/components/themed-ui/ThemedView";
import { QUICK_FILTERS } from "@/constants/quick-filters";
import { useListings } from "@/hooks/useListings";
import { useUserLocation } from "@/hooks/useUserLocation";
import { sizes } from "@/theme/size";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [selectedFiltersIds, setSelectedFiltersIds] = useState<string[]>([]);

  const { location } = useUserLocation();

  const {
    data,
    isLoading,
    isRefetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useListings({
    city: "mumbai",
    latitude: location?.coords.latitude,
    longitude: location?.coords.longitude,
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
            <HomeHeader location="Bengaluru · Aug" />

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

type Listing = {
  _id: string;
  external_source?: Source;
  external_listing_url?: string;

  listing: {
    title: string;
    images?: string[];
    cover_image?: string;
    carpet_area?: number;

    status: "active" | "rented" | "draft" | "expired";

    city: City;
    locality: string;
    address: string;

    location: {
      latitude: number;
      longitude: number;
    };

    gender_preferance: "male" | "female";

    bhk?: "1RK" | "1BHK" | "2BHK" | "3BHK";
    occupency?: "single" | "double" | "triple";
    total_occupency?: number;

    furnised_status: "unfurnished" | "semi-furnished" | "fully-furnished";

    attached_bathroom: boolean;
    balcony: boolean;
    floor: number;

    wifi?: "included" | "split";
    cook?: "included" | "split";
    maid?: "included" | "split";

    parking?: {
      bike: boolean;
      car: boolean;
    };

    ammenites?: [Ammenites];
    house_rules: [HouseRule];

    pets_present?: boolean;

    rent: number;
    deposit?: number;
    brokerage?: number;
    setup_cost?: number;

    available_from?: Date;
    available_immediately: boolean;

    neighborhood?: [NeighborhoodItem];
  };

  external_lister?: {
    name: string;
    age?: number;
    profile_pic?: string;
    contanct_number?: string;
    life_style: [string];
  };
  lister_id?: string;

  views: number;
  favorites: number;
};

type Source = "app" | "facebook" | "reddit";
type City = "mumbai" | "pune" | "banglore" | "hyderabad";

type Ammenites = {
  type: AmmenityType;
  desc: string;
};

type AmmenityType =
  | "Kitchen"
  | "AC"
  | "Maid"
  | "Washroom"
  | "Water"
  | "Parking"
  | "Utility";

type HouseRule = {
  type: HouseRuleType;
  desc: string;
};

type HouseRuleType = "Smoking" | "Food" | "Pets";

type NeighborhoodItem = {
  type: NeighborhoodItemType;
  distance: number;
};

type NeighborhoodItemType = "Railway Station" | "Metro";

interface User {
  name: string;
  age: number;
  gender?: "male" | "female";

  occupation: "student" | "working" | "freelancer" | "business" | "other";

  company?: string;
  college?: string;

  bio: string;

  lifestyle?: LivingPreferences;
  traits: Trait[];
  dealbreakers?: DealBreakers;
}
enum Acceptance {
  Yes,
  Okay,
  No,
}

interface LivingPreferences {
  smoking: Acceptance;
  drinking: Acceptance;
  pets: Acceptance;

  diet: "vegetarian" | "non-vegetarian" | "vegan" | "eggetarian";

  cleanliness: 1 | 2 | 3 | 4 | 5;

  guests: 1 | 2 | 3 | 4 | 5;

  noiseLevel: 1 | 2 | 3 | 4 | 5;

  sleepSchedule: "early-bird" | "night-owl" | "flexible";

  workFromHome: 1 | 2 | 3 | 4 | 5;

  cooking: 1 | 2 | 3 | 4 | 5;

  partying: 1 | 2 | 3 | 4 | 5;
}

interface DealBreakers {
  smoking: boolean;
  pets: boolean;
  drinking: boolean;
  loudMusic: boolean;
  overnightGuests: boolean;
}

enum Trait {
  Gym,
  Cooking,
  Gaming,
  Reading,
  Movies,
  Music,
  Travel,
  Trekking,
  Photography,
  Anime,
  Cricket,
  Football,
  Cycling,
  Yoga,
  Coding,
  Coffee,
  Tea,
  Nightlife,
  EarlyBird,
  Quiet,
  Social,
  Clean,
  Hosting,
  Spiritual,
}
