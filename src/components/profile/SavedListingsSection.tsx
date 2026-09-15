import React from "react";
import { StyleSheet } from "react-native";

import { ProfileListingResponse } from "@/src/api/user";
import SavedListingCard from "@/src/components/profile/SavedListingCard";
import Spacer from "@/src/components/themed-ui/Spacer";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useTheme } from "@/src/hooks/theme/useTheme";
import { sizes } from "@/src/theme/size";
import { Ionicons } from "@expo/vector-icons";

type SavedListingsSectionProps = {
  listings: ProfileListingResponse[];
};

export default function SavedListingsSection({
  listings,
}: SavedListingsSectionProps) {
  const { colors } = useTheme();

  return (
    <ThemedView variant="primary" borderRadius="card" style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText variant="h2">Saved Listings</ThemedText>

        <ThemedView borderRadius="button" style={styles.countBadge}>
          <ThemedText variant="body" color="foreground.secondary">
            {listings.length}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <Spacer size="lg" />

      {listings.length > 0 ? (
        <ThemedView gap="md">
          {listings.map((listing) => (
            <SavedListingCard key={listing.id} {...listing} />
          ))}
        </ThemedView>
      ) : (
        <ThemedView
          variant="primary"
          borderRadius="card"
          style={styles.emptyState}
        >
          <ThemedView variant="secondary" style={styles.iconCircle}>
            <Ionicons name="heart-outline" size={34} color="#666" />
          </ThemedView>

          <Spacer size="lg" />

          <ThemedText variant="title" color="foreground.primary">
            No saved listings yet
          </ThemedText>

          <Spacer size="xs" />

          <ThemedText
            variant="bodySmall"
            color="foreground.secondary"
            style={styles.emptyDescription}
          >
            Explore homes in your favorite localities and
            {"\n"}
            tap the heart icon to save them here.
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    // Keeps the section visually separated from the profile background.
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  countBadge: {
    minWidth: 30,
    height: 30,
    paddingHorizontal: sizes.sm,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyState: {
    minHeight: 276,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: sizes.lg,
    paddingVertical: sizes["2xl"],
  },

  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyDescription: {
    textAlign: "center",
    lineHeight: 17.6,
  },
});
