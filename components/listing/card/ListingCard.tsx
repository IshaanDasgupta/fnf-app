import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

import ListingImage from "./ListingImage";

import { Spacer } from "@/components/themed-ui/Spacer";
import { ThemedChip } from "@/components/themed-ui/ThemedChip";
import { ThemedIconText } from "@/components/themed-ui/ThemedIconText";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";

import { ListingCardResponse } from "@/api/listing";
import { navigation } from "@/lib/navigation";
import { radius } from "@/theme/radius";
import { sizes } from "@/theme/size";
import { useRouter } from "expo-router";

export function ListingCard(listing: ListingCardResponse) {
  const router = useRouter();

  const handleListingRedirect = () => {
    router.push(navigation.property(listing.id));
  };

  return (
    <Pressable onPress={handleListingRedirect}>
      <ThemedView
        variant="tertiary"
        style={[styles.card, { borderRadius: radius.card }]}
      >
        <ListingImage
          source={listing.coverImage}
          favorite={listing.favorite}
          listingId={listing.id}
        />

        <ThemedView style={{ padding: sizes.lg }}>
          <ThemedView style={styles.header}>
            <ThemedText variant="h3" style={{ flex: 1 }} numberOfLines={1}>
              {listing.title}
            </ThemedText>

            <Spacer horizontal size="5xl" />

            <ThemedText variant="h2">
              ₹{listing.rent.toLocaleString()}
            </ThemedText>
          </ThemedView>

          <Spacer size="xs" />

          <ThemedView style={styles.locationRow}>
            <ThemedIconText
              icon={<Ionicons name="location-outline" size={16} />}
              label={listing.address.locality}
              variant="body"
              labelColor="foreground.secondary"
              gap="xs"
            />

            <ThemedText variant="caption" color="foreground.secondary">
              / month · your share
            </ThemedText>
          </ThemedView>

          <Spacer size="sm" />

          <ThemedView gap="lg" style={styles.detailsRow}>
            <ThemedIconText
              icon={<Feather name="home" size={16} />}
              iconColor="foreground.secondary"
              label={listing.bhk}
              labelColor="foreground.secondary"
              variant="bodySmall"
              gap="xs"
            />

            {listing.occupancy && (
              <ThemedIconText
                icon={<Ionicons name="people-outline" size={16} />}
                iconColor="foreground.secondary"
                label={`${listing.occupancy} occupancy`}
                labelColor="foreground.secondary"
                variant="bodySmall"
                gap="xs"
              />
            )}

            {(listing.availableFrom || listing.availableImmediately) && (
              <ThemedIconText
                icon={<Ionicons name="calendar-outline" size={16} />}
                iconColor="foreground.secondary"
                label={
                  listing.availableImmediately
                    ? "Immediate"
                    : listing.availableFrom
                      ? new Date(listing.availableFrom).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "2-digit",
                          },
                        )
                      : ""
                }
                labelColor="foreground.secondary"
                variant="bodySmall"
                gap="xs"
              />
            )}
          </ThemedView>

          <Spacer size="md" />

          <ThemedView gap="sm" style={styles.tags}>
            {listing.tags.map((tag) => (
              <ThemedChip
                key={tag}
                label={tag}
                variant="listing-chip"
                labelVariant="subTitle"
                style={{
                  paddingHorizontal: sizes.lg,
                  paddingVertical: sizes.sm,
                }}
                disabled
              />
            ))}
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default ListingCard;
