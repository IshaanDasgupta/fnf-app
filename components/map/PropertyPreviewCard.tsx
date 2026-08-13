import { Image, Pressable, StyleSheet } from "react-native";

import { ThemedButton } from "@/components/themed-ui/ThemedButton";
import { ThemedIconButton } from "@/components/themed-ui/ThemedIconButton";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";

import { putFavouriteListing } from "@/api/listing";
import { navigation } from "@/lib/navigation";
import { radius } from "@/theme/radius";
import { shadows } from "@/theme/shadows";
import { sizes } from "@/theme/size";
import { ListingPreviewCardProps } from "@/types/map/listing-preview-card";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

export function ListingPreviewCard({
  listingId,
  image,
  title,
  location,
  bhk,
  occupancy,
  rent,
  favourite,
}: ListingPreviewCardProps) {
  const router = useRouter();

  const [favState, setFavState] = useState(favourite);

  const [loading, setLoading] = useState(false);

  const scale = useSharedValue(1);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const toggleFavouriteHandle = async () => {
    console.log("trying to add to fav");
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

  const handleListingRedirection = () => {
    router.push(navigation.property(listingId));
  };

  return (
    <Pressable onPress={handleListingRedirection}>
      <ThemedView variant="inverse" borderRadius="xl" style={styles.container}>
        <ThemedView style={styles.header}>
          <Image source={{ uri: image }} style={styles.image} />

          <ThemedView style={styles.info}>
            <ThemedText variant="h3" color="foreground.inverse">
              {title}
            </ThemedText>

            <ThemedText variant="bodySmall" color="foreground.inverse">
              {location} · {bhk} · {occupancy} occupancy
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
            loading={loading}
            icon={
              <AnimatedIonicons
                style={iconStyle}
                name={favState ? "heart" : "heart-outline"}
              />
            }
            onPress={toggleFavouriteHandle}
          />
        </ThemedView>

        <ThemedButton
          variant="tertiary"
          label="View home"
          onPress={handleListingRedirection}
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
