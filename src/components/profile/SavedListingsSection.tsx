import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";

import SavedListingCard, {
  SavedListing,
} from "@/src/components/profile/SavedListingCard";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useTheme } from "@/src/hooks/theme/useTheme";
import { sizes } from "@/src/theme/size";

type SavedListingsSectionProps = {
  listings: SavedListing[];
};

export default function SavedListingsSection({
  listings,
}: SavedListingsSectionProps) {
  const { colors } = useTheme();

  return (
    <ThemedView>
      {listings.length > 0 ? (
        <>
          <ThemedView marginBottom="md" style={styles.header}>
            <ThemedText variant="h2">Saved listings</ThemedText>
            {!!listings.length && (
              <ThemedText variant="body" color="foreground.secondary">
                {listings.length}
              </ThemedText>
            )}
          </ThemedView>

          <ThemedView gap="md">
            {listings.map((listing) => (
              <SavedListingCard key={listing.id} listing={listing} />
            ))}
          </ThemedView>
        </>
      ) : (
        <ThemedView
          variant="secondary"
          padding="xl"
          borderRadius="card"
          style={styles.emptyState}
        >
          <Ionicons
            name="heart-outline"
            size={sizes.xl}
            color={colors.foreground.tertiary}
          />

          <ThemedText variant="h3" style={styles.emptyTitle}>
            No saved listings
          </ThemedText>

          <ThemedText
            variant="body"
            color="foreground.secondary"
            style={styles.emptyDescription}
          >
            Listings you save will appear here.
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  emptyState: {
    alignItems: "center",
  },

  emptyTitle: {
    marginTop: sizes.md,
  },

  emptyDescription: {
    marginTop: sizes.xs,
    textAlign: "center",
  },
});
