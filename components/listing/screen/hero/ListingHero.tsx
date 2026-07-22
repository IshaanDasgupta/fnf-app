import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ThemedView } from "@/components/themed-ui/ThemedView";
import { ThemedIconButton } from "@/components/themed-ui/ThemedIconButton";

import { spacing } from "@/theme/spacing";
import { ListingHeroProps } from "@/types/listing/screen/hero";
import ImageCarousel from "@/components/listing/screen/hero/ImageCarousel";

export default function ListingHero({
  images,
  favorite = false,
}: ListingHeroProps) {
  return (
    <ThemedView style={styles.container}>
      <ImageCarousel images={images} />

      <ThemedView
        variant="transparent"
        flexDirection="row"
        justifyContent="space-between"
        style={styles.topBar}
      >
        <ThemedIconButton
          variant="fav"
          size="xl"
          icon={<Ionicons name="chevron-back" />}
        />

        <ThemedView variant="transparent" flexDirection="row" gap="md">
          <ThemedIconButton
            variant="fav"
            size="xl"
            icon={<Ionicons name="share-social-outline" />}
          />

          <ThemedIconButton
            variant="fav"
            selected={favorite}
            size="xl"
            icon={<Ionicons name={favorite ? "heart" : "heart-outline"} />}
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  topBar: {
    position: "absolute",

    top: spacing.xl,

    left: spacing.lg,

    right: spacing.lg,
  },
});
