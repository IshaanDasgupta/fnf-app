import React, { useEffect, useState } from "react";

import Spacer from "@/components/themed-ui/Spacer";
import { ThemedSafeArea } from "@/components/themed-ui/ThemedSafeArea";
import { ThemedScrollView } from "@/components/themed-ui/ThemedScrollView";
import { ThemedView } from "@/components/themed-ui/ThemedView";

import { sizes } from "@/theme/size";

import { getListing, ListingResponse } from "@/api/listing";
import AddOnsSection from "@/components/listing/screen/addons/AddOnsSection";
import AmenitiesSection from "@/components/listing/screen/amenities/AmenitySection";
import CompatibilityCard from "@/components/listing/screen/compatibility-card/CompatabilityCard";
import ListingHero from "@/components/listing/screen/hero/ListingHero";
import HouseRulesSection from "@/components/listing/screen/house-rules/HouseRulesSection";
import ListingBottomBar from "@/components/listing/screen/ListingBottomBar";
import ListingHeader from "@/components/listing/screen/ListingHeader";
import NeighborhoodSection from "@/components/listing/screen/neighborhood/NeighborhoodSection";
import OwnerCard from "@/components/listing/screen/OwnerCard";
import { navigation } from "@/lib/navigation";
import { radius } from "@/theme/radius";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet } from "react-native";

export default function ListingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [listing, setListing] = useState<ListingResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchListing = async () => {
      try {
        setLoading(true);

        const response = await getListing(id);

        setListing(response.data);
      } catch (error) {
        console.error("Failed to fetch listing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  useEffect(() => {
    if (!loading && !listing) {
      //TODO replace with 404 page
      router.replace(navigation.tabs.home);
    }
  }, [loading, listing]);

  if (loading) {
    return (
      <ThemedSafeArea variant="primary">
        <ThemedView style={styles.loading}>
          <ActivityIndicator />
        </ThemedView>
      </ThemedSafeArea>
    );
  }

  if (!listing) {
    return;
  }

  return (
    <ThemedSafeArea variant="primary" edges={["top"]}>
      <ThemedView style={styles.container}>
        <ThemedScrollView
          variant="primary"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ListingHero
            listingId={listing.id}
            favorite={listing.favorite}
            images={listing.images}
          />

          <ThemedView variant="primary" padding="xl" style={styles.content}>
            <ListingHeader
              title={listing.title}
              locality={listing.address.locality}
              city={listing.address.city}
            />

            <Spacer size="xl" />

            <CompatibilityCard />

            <Spacer size="2xl" />

            {listing.lister && (
              <OwnerCard
                name={listing.lister.name}
                age={listing.lister.age}
                image={listing.lister.profilePic}
              />
            )}
            <Spacer size="2xl" />

            {listing.addOns.length > 0 && (
              <ThemedView>
                <AddOnsSection addOns={listing.addOns} />
                <Spacer size="2xl" />
              </ThemedView>
            )}

            {listing.amenities.length > 0 && (
              <ThemedView>
                <AmenitiesSection amenities={listing.amenities} />
                <Spacer size="2xl" />
              </ThemedView>
            )}

            {listing.houseRules.length > 0 && (
              <ThemedView>
                <HouseRulesSection houseRules={listing.houseRules} />
                <Spacer size="2xl" />
              </ThemedView>
            )}

            <NeighborhoodSection
              latitude={listing.location.latitude}
              longitude={listing.location.longitude}
              neighborhood={listing.neighborhood}
            />
          </ThemedView>
        </ThemedScrollView>

        <ListingBottomBar
          rent={listing.rent}
          availableFrom={listing.availableFrom}
          availableImmediately={listing.availableImmediately}
        />
      </ThemedView>
    </ThemedSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 140,
  },

  content: {
    marginTop: -sizes["5xl"],
    borderTopLeftRadius: radius.screen,
    borderTopRightRadius: radius.screen,
  },

  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
