import React, { useEffect } from "react";

import Spacer from "@/src/components/themed-ui/Spacer";
import { ThemedSafeArea } from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedScrollView } from "@/src/components/themed-ui/ThemedScrollView";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";

import { sizes } from "@/src/theme/size";

import { getListing } from "@/src/api/listing";
import AddOnsSection from "@/src/components/listing/screen/addons/AddOnsSection";
import AmenitiesSection from "@/src/components/listing/screen/amenities/AmenitySection";
import ListingCostBreakdown from "@/src/components/listing/screen/cost/CostBreakdown";
import ListingHero from "@/src/components/listing/screen/hero/ListingHero";
import HouseRulesSection from "@/src/components/listing/screen/house-rules/HouseRulesSection";
import ServicesSection from "@/src/components/listing/screen/services/ServicesSection";
import ListingBottomBar from "@/src/components/listing/screen/ListingBottomBar";
import ListingHeader from "@/src/components/listing/screen/ListingHeader";
import NeighborhoodSection from "@/src/components/listing/screen/neighborhood/NeighborhoodSection";
import { LoadingErrorScreen } from "@/src/components/shared/LoadingErrorScreen";
import { LoadingScreen } from "@/src/components/shared/LoadingScreen";
import { navigation } from "@/src/lib/navigation";
import { radius } from "@/src/theme/radius";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

export default function ListingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: listing,
    isLoading: isListingLoading,
    refetch: refetchListing,
    isRefetching: isListingRefetching,
  } = useQuery({
    queryKey: ["listing", id],
    queryFn: () => getListing(id),
    select: (response) => response.data,
    enabled: !!id,
  });

  useEffect(() => {
    if (!isListingLoading && !listing) {
      router.replace(navigation.standalone.notFound);
    }
  }, [isListingLoading, listing]);

  if (isListingLoading) {
    return <LoadingScreen />;
  }

  if (!listing) {
    return (
      <LoadingErrorScreen
        title="Could not load listing"
        message={`We couldn’t connect to our servers.\n Please check your internet connection and try again.`}
        retryLabel="Try Again"
        onRetry={refetchListing}
        retryLoading={isListingRefetching}
      />
    );
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
              locality={listing.address.locality}
              address={listing.address.address}
              city={listing.address.city}
              bhk={listing.bhk}
              occupancy={listing.rentalScope.capacity}
              rentalType={listing.rentalScope.type}
              genderPreference={listing.genderPreference}
              floor={listing.floor}
              furnishedStatus={listing.furnishedStatus}
              carpetArea={listing.carpetArea}
              totalOccupancy={listing.rentalScope.totalOccupancy}
              attachedWashroom={listing.attachedWashroom}
              availableImmediately={listing.availableImmediately}
              availableFrom={listing.availableFrom}
            />

            <Spacer size="4xl" />

            <ListingCostBreakdown
              rent={listing.rent}
              deposit={listing.deposit}
              brokerage={listing.brokerage}
              setupCost={listing.setupCost}
              moveInCharges={listing.moveInCharges}
            />

            <Spacer size="4xl" />

            {/* TODO: lister details now only listerId — fetch lister profile separately */}

            {listing.addOns.length > 0 && (
              <>
                <AddOnsSection addOns={listing.addOns} />
                <Spacer size="4xl" />
              </>
            )}

            {listing.amenities.length > 0 && (
              <>
                <AmenitiesSection amenities={listing.amenities} />
                <Spacer size="4xl" />
              </>
            )}

            {listing.houseRules.length > 0 && (
              <>
                <HouseRulesSection houseRules={listing.houseRules} />
                <Spacer size="4xl" />
              </>
            )}

            {(listing.services ?? []).length > 0 && (
              <>
                <ServicesSection services={listing.services ?? []} />
                <Spacer size="4xl" />
              </>
            )}

            <NeighborhoodSection
              latitude={listing.location.latitude}
              longitude={listing.location.longitude}
              nearbyPlaces={listing.nearbyPlaces}
            />
          </ThemedView>
        </ThemedScrollView>

        <ListingBottomBar
          rent={listing.rent}
          availableFrom={listing.availableFrom}
          availableImmediately={listing.availableImmediately}
          url={listing.externalListing?.url}
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
