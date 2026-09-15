import { ProfileListingResponse } from "@/src/api/user";
import SeparatedText from "@/src/components/shared/SeperatedText";
import Spacer from "@/src/components/themed-ui/Spacer";
import { ThemedIconButton } from "@/src/components/themed-ui/ThemedIconButton";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useToggleFavourite } from "@/src/hooks/react-query/useToggleFavourite";
import { navigation } from "@/src/lib/navigation";
import { shadows } from "@/src/theme/shadows";
import { sizes } from "@/src/theme/size";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet } from "react-native";

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export default function SavedListingCard(listing: ProfileListingResponse) {
  const { mutateAsync: toggleFavourite, isPending } = useToggleFavourite();

  const handleListingRedirect = () => {
    router.push(navigation.property(listing.id));
  };

  const handleFavouritePress = async () => {
    try {
      await toggleFavourite({
        listingId: listing.id,
        value: false,
      });
    } catch (error) {
      console.error("Failed to remove favourite:", error);
    }
  };

  const details = [
    capitalize(listing.genderPreference),
    listing.furnishedStatus ? capitalize(listing.furnishedStatus) : undefined,
    listing.availableImmediately
      ? "Immediate"
      : new Date(listing.availableFrom!).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "2-digit",
        }),
  ].filter((item): item is string => Boolean(item));

  return (
    <Pressable onPress={handleListingRedirect}>
      <ThemedView
        variant="secondary"
        borderRadius="card"
        shadow="lg"
        style={styles.card}
      >
        <ThemedView style={styles.imageContainer}>
          <Image
            source={{ uri: listing.coverImage }}
            style={styles.image}
            resizeMode="cover"
          />

          <ThemedView style={styles.favouriteContainer}>
            <ThemedIconButton
              variant="fav"
              loading={isPending}
              onPress={handleFavouritePress}
              size="md"
              icon={<Ionicons name="heart" />}
            />
          </ThemedView>

          {listing.occupancy && (
            <ThemedView
              variant="secondary"
              borderRadius="button"
              style={styles.occupancyBadge}
              paddingHorizontal="md"
              paddingVertical="sm"
            >
              <ThemedText variant="caption">
                {capitalize(listing.occupancy)} Occupancy
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>

        <ThemedView padding="lg">
          <ThemedView style={styles.titleRow}>
            <ThemedText
              numberOfLines={1}
              ellipsizeMode="tail"
              variant="h3"
            >{`${listing.bhk} in ${listing.address.locality}`}</ThemedText>

            <ThemedText
              variant="h3"
              color="foreground.primary"
              numberOfLines={1}
              style={styles.rent}
            >
              ₹{listing.rent.toLocaleString("en-IN")}
              <ThemedText variant="caption" color="foreground.secondary">
                /mo
              </ThemedText>
            </ThemedText>
          </ThemedView>

          <Spacer size="xs" />

          <SeparatedText
            items={details}
            variant="body"
            color="foreground.secondary"
          />
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    ...shadows.lg,
  },

  imageContainer: {
    width: "100%",
    aspectRatio: 1.85,
    position: "relative",
  },

  image: {
    ...StyleSheet.absoluteFillObject,
  },

  favouriteContainer: {
    position: "absolute",
    top: sizes.md,
    right: sizes.md,
  },

  occupancyBadge: {
    position: "absolute",
    left: sizes.md,
    bottom: sizes.md,
  },

  titleRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: sizes.md,
  },

  title: {
    flex: 1,
    minWidth: 0,
  },

  rent: {
    flexShrink: 0,
  },

  subtitle: {
    marginTop: sizes.xs,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    width: "100%",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: sizes.md,
  },

  messageButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});
