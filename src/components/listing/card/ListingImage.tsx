import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet } from "react-native";

import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { radius } from "@/src/theme/radius";
import { ListingImageProps } from "@/src/types/listing/card/image";

import { ThemedIconButton } from "@/src/components/themed-ui/ThemedIconButton";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { useToggleFavourite } from "@/src/hooks/react-query/useToggleFavourite";
import { sizes } from "@/src/theme/size";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export function ListingImage({
  source,
  favourite,
  listingId,
  occupancy,
}: ListingImageProps) {
  const { mutateAsync: toggleFavourite, isPending } = useToggleFavourite();

  const scale = useSharedValue(1);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const toggleFavouriteHandle = async () => {
    try {
      await toggleFavourite({
        listingId,
        value: !favourite,
      });

      scale.value = withSequence(
        withTiming(1.15),
        withSpring(1, {
          damping: 8,
          stiffness: 150,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Image source={{ uri: source }} style={styles.image} />

      <ThemedIconButton
        variant="fav"
        size="md"
        onPress={toggleFavouriteHandle}
        style={styles.favorite}
        loading={isPending}
        icon={
          <AnimatedIonicons
            style={iconStyle}
            name={favourite ? "heart" : "heart-outline"}
            size={20}
          />
        }
      />

      {occupancy && (
        <ThemedView
          variant="secondary"
          borderRadius="button"
          style={styles.occupancyBadge}
          paddingHorizontal="md"
          paddingVertical="sm"
        >
          <ThemedText variant="caption">
            {capitalize(occupancy)} Occupancy
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: radius.card,
  },

  favorite: {
    position: "absolute",
    top: sizes.md,
    right: sizes.md,

    alignItems: "center",
    justifyContent: "center",
  },

  occupancyBadge: {
    position: "absolute",
    left: sizes.md,
    bottom: sizes.md,
  },
});

export default ListingImage;
