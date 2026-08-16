import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

import { ThemedIconButton } from "@/src/components/themed-ui/ThemedIconButton";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";

import ImageCarousel from "@/src/components/listing/screen/hero/ImageCarousel";
import { useToggleFavourite } from "@/src/hooks/react-query/useToggleFavourite";
import { sizes } from "@/src/theme/size";
import { ListingHeroProps } from "@/src/types/listing/screen/hero";

export default function ListingHero({
  listingId,
  images,
  favorite,
}: ListingHeroProps) {
  const router = useRouter();

  const { mutateAsync: toggleFavourite, isPending } = useToggleFavourite();

  const handleBack = () => {
    router.back();
  };

  const handleFavToggle = async () => {
    try {
      await toggleFavourite({
        listingId,
        value: !favorite,
      });
    } catch (error) {
      console.error("Failed to toggle favourite:", error);
    }
  };
  return (
    <ThemedView style={styles.container}>
      <ImageCarousel images={images} />

      <ThemedView variant="transparent" style={styles.topBar}>
        <ThemedIconButton
          variant="tertiary"
          size="lg"
          icon={<Ionicons name="chevron-back" />}
          onPress={handleBack}
        />

        <ThemedView variant="transparent" style={styles.actions} gap="md">
          <ThemedIconButton
            variant="tertiary"
            size="lg"
            icon={<Ionicons name="share-social-outline" />}
          />

          <ThemedIconButton
            variant="fav"
            size="lg"
            loading={isPending}
            icon={<Ionicons name={favorite ? "heart" : "heart-outline"} />}
            onPress={handleFavToggle}
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
    top: sizes.xl,
    left: sizes.lg,
    right: sizes.lg,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  actions: {
    flexDirection: "row",
  },
});
