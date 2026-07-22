import React, { useState } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MatchBadge from "../MatchBadge";

import { ThemedView } from "@/components/themed-ui/ThemedView";
import { useColors } from "@/hooks/useColors";
import { radius } from "@/theme/radius";
import { ListingImageProps } from "@/types/listing/card/image";
import ThemedIconButton from "@/components/themed-ui/ThemedIconButton";
import { spacing } from "@/theme/spacing";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export function ListingImage({
  source,
  compatibility,
  favorite,
  verified,
}: ListingImageProps) {
  const colors = useColors();

  const [favState, setFavState] = useState(favorite);

  const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

  const scale = useSharedValue(1);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPress = () => {
    setFavState((prev) => !prev);

    scale.value = withSequence(
      withTiming(1.15),
      withSpring(1, {
        damping: 8,
        stiffness: 150,
      }),
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Image source={{ uri: source }} style={styles.image} />

      {verified && (
        <ThemedView
          variant="primary"
          borderRadius="button"
          padding="sm"
          style={styles.verified}
        >
          <Ionicons name="shield-checkmark" size={14} color={colors.primary} />
        </ThemedView>
      )}

      <ThemedIconButton
        variant="fav"
        size="xl"
        selected={favState}
        onPress={onPress}
        style={styles.favorite}
        icon={
          <AnimatedIonicons
            style={iconStyle}
            name={favState ? "heart" : "heart-outline"}
          />
        }
      />

      {/* <ThemedView variant="transparent" style={styles.match}>
        <MatchBadge percentage={compatibility} />
      </ThemedView> */}
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

    width: 46,
    height: 46,

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
