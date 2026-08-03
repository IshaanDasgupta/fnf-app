import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

import ListingImage from "./ListingImage";

import { Spacer } from "@/components/themed-ui/Spacer";
import { ThemedChip } from "@/components/themed-ui/ThemedChip";
import { ThemedIconText } from "@/components/themed-ui/ThemedIconText";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";

import { ListingCardProps } from "@/types/listing/card/card";
import { useRouter } from "expo-router";
import { navigation } from "@/lib/navigation";
import { radius } from "@/theme/radius";
import { sizes } from "@/theme/size";

export function ListingCard({ listing }: ListingCardProps) {
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
          source={listing.image}
          verified={listing.verified}
          favorite={listing.favorite}
          compatibility={listing.compatibility}
        />

        <ThemedView style={{ padding: sizes.lg }}>
          <ThemedView style={styles.header}>
            <ThemedText variant="h3" style={{ flex: 1 }} numberOfLines={1}>
              {listing.title}
            </ThemedText>

            <Spacer horizontal size="5xl" />

            <ThemedText variant="h2">
              ₹{listing.price.toLocaleString()}
            </ThemedText>
          </ThemedView>

          <Spacer size="xs" />

          <ThemedView style={styles.locationRow}>
            <ThemedIconText
              icon={<Ionicons name="location-outline" size={16} />}
              label={listing.location}
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
              label={`${listing.bedrooms} BR`}
              labelColor="foreground.secondary"
              variant="bodySmall"
              gap="xs"
            />

            <ThemedIconText
              icon={<Ionicons name="people-outline" size={16} />}
              iconColor="foreground.secondary"
              label={`${listing.flatmates} flatmates`}
              labelColor="foreground.secondary"
              variant="bodySmall"
              gap="xs"
            />

            <ThemedIconText
              icon={<Ionicons name="calendar-outline" size={16} />}
              iconColor="foreground.secondary"
              label={listing.availableDate}
              labelColor="foreground.secondary"
              variant="bodySmall"
              gap="xs"
            />
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
