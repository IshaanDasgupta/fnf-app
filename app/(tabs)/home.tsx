import React, { useState } from "react";

import { ThemedSafeArea } from "@/components/themed-ui/ThemedSafeArea";
import { ThemedScrollView } from "@/components/themed-ui/ThemedScrollView";
import { ThemedView } from "@/components/themed-ui/ThemedView";

import HomeHeader from "@/components/home/Header";
import SearchFilter from "@/components/home/SearchFilter";
import ChipSelectionList from "@/components/home/ChipSelection";
import { Listing } from "@/types/listing/card/card";
import ListingCard from "@/components/listing/card/ListingCard";
import { sizes } from "@/theme/size";
import Spacer from "@/components/themed-ui/Spacer";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [selectedChip, setSelectedChip] = useState("all");

  const chips = [
    { id: "all", label: "All" },
    { id: "near", label: "Near me" },
    { id: "20k", label: "Under ₹20k" },
    { id: "2bhk", label: "2 BHK" },
    { id: "pet", label: "Pet Friendly" },
  ];

  const listings: Listing[] = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
      title: "Bright Kitchen Flat, HSR Layout",
      location: "HSR Layout",
      price: 21200,
      compatibility: 82,
      verified: true,
      favorite: false,
      bedrooms: 3,
      flatmates: 2,
      availableDate: "Aug 20",
      tags: ["Vegetarian", "Quiet"],
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
      title: "Sunlit Loft near Indiranagar",
      location: "Indiranagar",
      price: 24500,
      compatibility: 94,
      verified: true,
      favorite: true,
      bedrooms: 3,
      flatmates: 2,
      availableDate: "Aug 12",
      tags: ["Pet-friendly", "Non-smoking", "Early bird"],
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200",
      title: "Minimal Studio Apartment",
      location: "Koramangala",
      price: 18500,
      compatibility: 76,
      verified: false,
      favorite: false,
      bedrooms: 1,
      flatmates: 0,
      availableDate: "Sep 01",
      tags: ["Furnished", "WiFi"],
    },
  ];

  return (
    <ThemedSafeArea>
      <ThemedScrollView
        variant="primary"
        padding="lg"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: sizes["6xl"],
        }}
      >
        <HomeHeader name="Ananya" location="Bengaluru · Aug" />

        <SearchFilter
          value={search}
          onChangeText={setSearch}
          onFilterPress={() => {}}
          placeholder='Try "Indiranagar, 3 bhk"'
        />

        <ChipSelectionList
          items={chips}
          selectedId={selectedChip}
          onSelect={setSelectedChip}
        />

        <ThemedView gap="lg">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </ThemedView>
        <Spacer size="4xl" />
      </ThemedScrollView>
    </ThemedSafeArea>
  );
}

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

  workFromHome: "never" | "sometimes" | "often";

  cooking: "never" | "sometimes" | "daily";

  partying: "never" | "sometimes" | "often";
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
