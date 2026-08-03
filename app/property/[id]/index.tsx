import React from "react";

import { ThemedSafeArea } from "@/components/themed-ui/ThemedSafeArea";
import { ThemedScrollView } from "@/components/themed-ui/ThemedScrollView";
import { ThemedView } from "@/components/themed-ui/ThemedView";
import Spacer from "@/components/themed-ui/Spacer";

import { sizes } from "@/theme/size";

import ListingHero from "@/components/listing/screen/hero/ListingHero";
import ListingHeader from "@/components/listing/screen/ListingHeader";
import CompatibilityCard from "@/components/listing/screen/compatibility-card/CompatabilityCard";
import OwnerCard from "@/components/listing/screen/OwnerCard";
import AmenitiesSection from "@/components/listing/screen/amenities/AmenitySection";
import HouseRulesSection from "@/components/listing/screen/house-rules/HouseRulesSection";
import ListingBottomBar from "@/components/listing/screen/ListingBottomBar";
import NeighborhoodSection from "@/components/listing/screen/neighborhood/NeighborhoodSection";
import { radius } from "@/theme/radius";

export default function ListingScreen() {
  return (
    <ThemedSafeArea variant="primary" edges={["top"]}>
      <ThemedView style={{ flex: 1 }}>
        <ThemedScrollView
          variant="primary"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 140,
          }}
        >
          <ListingHero
            favorite={false}
            images={[
              "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
              "https://images.unsplash.com/photo-1484154218962-a197022b5858",
              "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
            ]}
          />

          <ThemedView
            variant="primary"
            padding="xl"
            style={{
              marginTop: -sizes["5xl"],
              borderTopLeftRadius: radius.screen,
              borderTopRightRadius: radius.screen,
            }}
          >
            <ListingHeader />

            <Spacer size="xl" />

            <CompatibilityCard />

            <Spacer size="2xl" />

            <OwnerCard
              name="ishaan"
              age={18}
              subtitle="temp subtitle"
              image="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
            />

            <Spacer size="2xl" />

            <AmenitiesSection />

            <Spacer size="2xl" />

            <HouseRulesSection />

            <Spacer size="2xl" />

            <NeighborhoodSection />
          </ThemedView>
        </ThemedScrollView>

        <ListingBottomBar />
      </ThemedView>
    </ThemedSafeArea>
  );
}
