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

export function ListingCard({ listing }: ListingCardProps) {
  const router = useRouter();

  const handleListingRedirect = () => {
    router.push(navigation.property(listing.id));
  };

  return (
    <Pressable onPress={handleListingRedirect}>
      <ThemedView variant="tertiary" borderRadius="card" style={styles.card}>
        <ListingImage
          source={listing.image}
          verified={listing.verified}
          favorite={listing.favorite}
          compatibility={listing.compatibility}
        />

        <ThemedView variant="transparent" padding="lg">
          <ThemedView
            variant="transparent"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <ThemedText variant="h3" style={{ flex: 1 }} numberOfLines={1}>
              {listing.title}
            </ThemedText>

            <Spacer horizontal size="5xl" />

            <ThemedText variant="h2">
              ₹{listing.price.toLocaleString()}
            </ThemedText>
          </ThemedView>

          <Spacer size="xs" />

          <ThemedView
            variant="transparent"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <ThemedIconText
              icon={<Ionicons name="location-outline" size={16} />}
              text={listing.location}
              variant="body"
              color="text.secondary"
              gap="xs"
            />

            <ThemedText variant="caption" color="text.secondary">
              / month · your share
            </ThemedText>
          </ThemedView>

          <Spacer size="sm" />

          <ThemedView variant="transparent" flexDirection="row" gap="lg">
            <ThemedIconText
              icon={<Feather name="home" size={16} />}
              text={`${listing.bedrooms} BR`}
              variant="bodySmall"
              gap="xs"
            />

            <ThemedIconText
              icon={<Ionicons name="people-outline" size={16} />}
              text={`${listing.flatmates} flatmates`}
              variant="bodySmall"
              gap="xs"
            />

            <ThemedIconText
              icon={<Ionicons name="calendar-outline" size={16} />}
              text={listing.availableDate}
              variant="bodySmall"
              gap="xs"
            />
          </ThemedView>

          <Spacer size="md" />

          <ThemedView
            variant="transparent"
            flexDirection="row"
            gap="sm"
            style={styles.tags}
          >
            {listing.tags.map((tag) => (
              <ThemedChip
                key={tag}
                label={tag}
                variant="secondary"
                textVariant="bodySmall"
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

  tags: {
    flexWrap: "wrap",
  },
});

export default ListingCard;
