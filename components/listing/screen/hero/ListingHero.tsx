import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { putFavouriteListing } from "@/api/listing";

import { ThemedIconButton } from "@/components/themed-ui/ThemedIconButton";
import { ThemedView } from "@/components/themed-ui/ThemedView";

import ImageCarousel from "@/components/listing/screen/hero/ImageCarousel";
import { sizes } from "@/theme/size";
import { ListingHeroProps } from "@/types/listing/screen/hero";

export default function ListingHero({
  listingId,
  images,
  favorite = false,
}: ListingHeroProps) {
  const router = useRouter();

  const [fav, setFav] = useState(favorite);
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleFavToggle = async () => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);

      const response = await putFavouriteListing(listingId, !fav);

      setFav(response.data.favorite);
    } catch (error) {
      console.error("Failed to toggle favourite:", error);
    } finally {
      setLoading(false);
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
            loading={loading}
            icon={<Ionicons name={fav ? "heart" : "heart-outline"} />}
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
