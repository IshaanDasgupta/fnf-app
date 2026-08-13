import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";

import { ThemedView } from "@/components/themed-ui/ThemedView";
import { radius } from "@/theme/radius";
import { ListingImageProps } from "@/types/listing/card/image";

import { putFavouriteListing } from "@/api/listing";
import { ThemedIconButton } from "@/components/themed-ui/ThemedIconButton";
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
  const [favState, setFavState] = useState(favourite);
  const [loading, setLoading] = useState(false);

  const scale = useSharedValue(1);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const toggleFavouriteHandle = async () => {
    try {
      setLoading(true);
      await putFavouriteListing(listingId, favState);
      setFavState((prev) => !prev);

      scale.value = withSequence(
        withTiming(1.15),
        withSpring(1, {
          damping: 8,
          stiffness: 150,
        }),
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
        loading={loading}
        icon={
          <AnimatedIonicons
            style={iconStyle}
            name={favState ? "heart" : "heart-outline"}
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
