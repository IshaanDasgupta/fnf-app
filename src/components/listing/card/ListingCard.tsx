import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

import ListingImage from "./ListingImage";

import { ListingCardResponse } from "@/src/api/listing";
import SeparatedText from "@/src/components/shared/SeperatedText";
import { Spacer } from "@/src/components/themed-ui/Spacer";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useTheme } from "@/src/hooks/theme/useTheme";
import { navigation } from "@/src/lib/navigation";
import { radius } from "@/src/theme/radius";
import { sizes } from "@/src/theme/size";
import { Ionicons } from "@expo/vector-icons";

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export function ListingCard(listing: ListingCardResponse) {
  const { colors } = useTheme();
  const router = useRouter();

  const handleListingRedirect = () => {
    router.push(navigation.property(listing.id));
  };

  const details = [
    capitalize(listing.genderPreference),
    listing.totalOccupancy ? `${listing.totalOccupancy} Roomates` : undefined,
    listing.furnishedStatus ? capitalize(listing.furnishedStatus) : undefined,
  ].filter((item): item is string => Boolean(item));

  return (
    <Pressable onPress={handleListingRedirect}>
      <ThemedView variant="secondary" shadow="lg" style={styles.card}>
        <ListingImage
          source={listing.coverImage}
          favourite={listing.favorite}
          listingId={listing.id}
          occupancy={listing.occupancy}
        />

        <ThemedView style={styles.content}>
          <ThemedView
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ThemedText variant="h3">{`${listing.bhk[0]} ${listing.bhk.slice(1)} in ${listing.address.locality}`}</ThemedText>
            <ThemedText variant="bodySmall">
              {listing.availableFrom
                ? `${new Date(listing.availableFrom!).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "2-digit",
                    },
                  )}`
                : listing.availableImmediately && "Immediate"}
            </ThemedText>
          </ThemedView>
          <SeparatedText
            items={details}
            variant="bodySmall"
            color="foreground.secondary"
          />

          <Spacer size="sm" />
          <ThemedView variant="tertiary" style={{ width: "100%", height: 2 }} />
          <Spacer size="sm" />

          <ThemedView style={styles.rentRow}>
            <ThemedView style={styles.rent}>
              <ThemedText variant="h2">
                ₹ {listing.rent?.toLocaleString() ?? 0}
              </ThemedText>

              <ThemedText variant="body" color="foreground.secondary">
                / month
              </ThemedText>
            </ThemedView>
            <Ionicons
              name="chevron-forward"
              size={sizes.xl}
              color={colors.foreground.primary}
            />
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    borderRadius: radius.card,
  },

  content: {
    padding: sizes.lg,
  },

  rentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rent: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: sizes.sm,
  },
});

export default ListingCard;
