import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Share, StyleSheet } from "react-native";

import { ThemedIconButton } from "@/src/components/themed-ui/ThemedIconButton";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";

import ImageCarousel from "@/src/components/listing/screen/hero/ImageCarousel";
import { API_BASE_URL, ENDPOINTS } from "@/src/constants/endpoints";
import { useToggleFavourite } from "@/src/hooks/react-query/useToggleFavourite";
import { sizes } from "@/src/theme/size";
import { ListingHeroProps } from "@/src/types/listing/screen/hero";
import Toast from "react-native-toast-message";

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

  const handleShare = async () => {
    try {
      const url = `${API_BASE_URL}${ENDPOINTS.REDIRECT}/${listingId}`;

      await Share.share({
        message: `Check out this listing on Friendly Floors:\n${url}`,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Couldn't share listing",
        text2: "Please try again.",
      });

      console.error("Failed to share listing:", error);
    }
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

      <ThemedView style={styles.topBar}>
        <ThemedIconButton
          variant="tertiary"
          size="lg"
          icon={<Ionicons name="chevron-back" />}
          onPress={handleBack}
        />

        <ThemedView style={styles.actions} gap="md">
          <ThemedIconButton
            variant="tertiary"
            size="lg"
            icon={<Ionicons name="share-social-outline" />}
            onPress={handleShare}
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
