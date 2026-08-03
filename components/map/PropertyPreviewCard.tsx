import { Image, Pressable, StyleSheet } from "react-native";

import { ThemedButton } from "@/components/themed-ui/ThemedButton";
import { ThemedIconButton } from "@/components/themed-ui/ThemedIconButton";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";

import { radius } from "@/theme/radius";
import { sizes } from "@/theme/size";
import { ListingPreviewCardProps } from "@/types/map/listing-preview-card";
import { shadows } from "@/theme/shadows";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

export function ListingPreviewCard({
  image,
  match,
  title,
  location,
  bedrooms,
  flatmates,
  rent,
  liked = false,
  onPress,
  onMessage,
  onFavourite,
}: ListingPreviewCardProps) {
  const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

  return (
    <Pressable onPress={onPress}>
      <ThemedView variant="inverse" borderRadius="xl" style={styles.container}>
        <ThemedView style={styles.header}>
          <Image source={{ uri: image }} style={styles.image} />

          <ThemedView style={styles.info}>
            {match && (
              <ThemedText variant="caption" color="accent.primary">
                {match}% MATCH
              </ThemedText>
            )}

            <ThemedText variant="h3" color="foreground.inverse">
              {title}
            </ThemedText>

            <ThemedText variant="bodySmall" color="foreground.inverse">
              {location} · {bedrooms} BR · {flatmates} flatmates
            </ThemedText>

            <ThemedView style={styles.priceRow}>
              <ThemedText variant="subTitle" color="foreground.secondary">
                ₹{rent.toLocaleString()}
              </ThemedText>

              <ThemedText variant="bodySmall" color="foreground.secondary">
                /mo
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedIconButton
            variant="tertiary"
            icon={
              <AnimatedIonicons
                // style={iconStyle}
                name={liked ? "heart" : "heart-outline"}
              />
            }
            onPress={onFavourite}
          />
        </ThemedView>

        <ThemedButton
          variant="tertiary"
          label="View home"
          onPress={onPress}
          style={{ marginTop: sizes.lg }}
        />
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: sizes.lg,
    ...shadows.lg,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  image: {
    width: 92,
    height: 92,
    borderRadius: radius.lg,
  },

  info: {
    flex: 1,
    marginHorizontal: sizes.md,
    justifyContent: "space-between",
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
});
