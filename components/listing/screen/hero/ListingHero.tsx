import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ThemedView } from "@/components/themed-ui/ThemedView";
import { ThemedIconButton } from "@/components/themed-ui/ThemedIconButton";

import { sizes } from "@/theme/size";
import { ListingHeroProps } from "@/types/listing/screen/hero";
import ImageCarousel from "@/components/listing/screen/hero/ImageCarousel";
import { useRouter } from "expo-router";

export default function ListingHero({
  images,
  favorite = false,
}: ListingHeroProps) {
  const router = useRouter();
  const [fav, setFav] = useState(favorite);

  const handleBack = () => {
    router.back();
  };

  const handleFavToggle = () => {
    setFav((prev) => !prev);
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

        <ThemedView
          variant="transparent"
          style={{ flexDirection: "row" }}
          gap="md"
        >
          <ThemedIconButton
            variant="tertiary"
            size="lg"
            icon={<Ionicons name="share-social-outline" />}
          />

          <ThemedIconButton
            variant="fav"
            size="lg"
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
});
