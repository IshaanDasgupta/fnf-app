import { Image, Pressable, StyleSheet } from "react-native";

import SeparatedText from "@/src/components/shared/SeperatedText";
import Spacer from "@/src/components/themed-ui/Spacer";
import { ThemedIconButton } from "@/src/components/themed-ui/ThemedIconButton";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useToggleFavourite } from "@/src/hooks/react-query/useToggleFavourite";
import { useTheme } from "@/src/hooks/theme/useTheme";
import { navigation } from "@/src/lib/navigation";
import { radius } from "@/src/theme/radius";
import { shadows } from "@/src/theme/shadows";
import { sizes } from "@/src/theme/size";
import { ListingPreviewCardProps } from "@/src/types/map/listing-preview-card";
import { formatOccupancy, formatRentalType } from "@/src/utils/occupancy";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

export function ListingPreviewCard({
  listingId,
  image,
  location,
  bhk,
  capacity,
  rentalType,
  furnishedStatus,
  genderPreference,
  rent,
  favourite,
}: ListingPreviewCardProps) {
  const { colors } = useTheme();
  const router = useRouter();
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

  const handleListingRedirection = () => {
    router.push(navigation.property(listingId));
  };

  const details = [
    genderPreference ? capitalize(genderPreference) : undefined,
    `${formatOccupancy(capacity)} ${formatRentalType(rentalType)}`,
    bhk,
  ].filter((item): item is string => Boolean(item));

  return (
    <Pressable onPress={handleListingRedirection}>
      <ThemedView variant="primary" borderRadius="xl" style={styles.container}>
        <ThemedView style={styles.header}>
          <Image source={{ uri: image }} style={styles.image} />

          <ThemedView style={styles.info}>
            <ThemedView style={{ flexDirection: "row" }} gap="md">
              <ThemedView style={{ flex: 1 }}>
                <ThemedText
                  variant="h3"
                  color="foreground.primary"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {location}
                </ThemedText>

                <SeparatedText
                  items={details}
                  variant="bodySmall"
                  color="foreground.primary"
                />
              </ThemedView>

              <ThemedIconButton
                variant="fav"
                loading={isPending}
                size="sm"
                icon={
                  <AnimatedIonicons
                    style={iconStyle}
                    name={favourite ? "heart" : "heart-outline"}
                    size={20}
                  />
                }
                onPress={toggleFavouriteHandle}
              />
            </ThemedView>
            <Spacer size="xs" />
            <ThemedView style={{ marginTop: "auto" }}>
              <ThemedView
                variant="tertiary"
                style={{ width: "100%", height: 2 }}
              />
              <Spacer size="xs" />
              <ThemedView
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <ThemedView style={styles.priceRow}>
                  <ThemedText variant="h3" color="foreground.primary">
                    ₹{rent.toLocaleString("en-IN")}
                  </ThemedText>

                  <ThemedText variant="bodySmall" color="foreground.primary">
                    /mo
                  </ThemedText>
                </ThemedView>
                <Ionicons
                  name="chevron-forward"
                  color={colors.foreground.primary}
                  size={sizes.xl}
                />
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: sizes.md,
    ...shadows.lg,
  },

  header: {
    flexDirection: "row",
  },

  image: {
    width: 92,
    height: 92,
    borderRadius: radius.lg,
  },

  info: {
    flex: 1,
    marginHorizontal: sizes.md,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  viewButton: {
    marginTop: sizes.lg,
  },
});
