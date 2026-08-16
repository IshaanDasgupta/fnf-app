import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet } from "react-native";

import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { radius } from "@/src/theme/radius";
import { ListingImageProps } from "@/src/types/listing/card/image";

import { ThemedIconButton } from "@/src/components/themed-ui/ThemedIconButton";
import { useToggleFavourite } from "@/src/hooks/react-query/useToggleFavourite";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

export function ListingImage({
  source,
  favourite,
  listingId,
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
        size="lg"
        onPress={toggleFavouriteHandle}
        style={styles.favorite}
        loading={isPending}
        icon={
          <AnimatedIonicons
            style={iconStyle}
            name={favourite ? "heart" : "heart-outline"}
          />
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: 270,
    borderTopLeftRadius: radius.card,
    borderTopRightRadius: radius.card,
  },

  verified: {
    position: "absolute",
    top: 16,
    left: 16,
  },

  favorite: {
    position: "absolute",
    top: 16,
    right: 16,

    borderRadius: 999,

    alignItems: "center",
    justifyContent: "center",
  },

  match: {
    position: "absolute",
    left: 18,
    bottom: 18,
  },
});

export default ListingImage;
