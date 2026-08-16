import Spacer from "@/src/components/themed-ui/Spacer";
import { ThemedIconButton } from "@/src/components/themed-ui/ThemedIconButton";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useToggleFavourite } from "@/src/hooks/react-query/useToggleFavourite";
import { navigation } from "@/src/lib/navigation";
import { sizes } from "@/src/theme/size";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet } from "react-native";

export interface SavedListing {
  id: string;
  title: string;
  locality: string;
  city: string;
  rent: number;
  coverImage: string;
}

interface SavedListingCardProps {
  listing: SavedListing;
}

export default function SavedListingCard({ listing }: SavedListingCardProps) {
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

  return (
    <Pressable onPress={handleListingRedirect}>
      <ThemedView
        variant="primary"
        borderRadius="card"
        style={styles.listingCard}
      >
        <Image
          source={{ uri: listing.coverImage }}
          style={styles.listingImage}
          resizeMode="cover"
        />

        <ThemedView
          variant="primary"
          padding="md"
          style={styles.listingContent}
        >
          <ThemedView style={styles.headerRow}>
            <ThemedView style={styles.titleLocation}>
              <ThemedText variant="h3" numberOfLines={1} ellipsizeMode="tail">
                {listing.title}
              </ThemedText>

              <ThemedText
                variant="caption"
                color="foreground.secondary"
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.listingLocation}
              >
                {listing.locality}, {listing.city}
              </ThemedText>
            </ThemedView>

            <ThemedIconButton
              variant="fav"
              loading={isPending}
              onPress={handleFavouritePress}
              size="sm"
              icon={<Ionicons name="heart" />}
            />
          </ThemedView>

          <Spacer />

          <ThemedText variant="h3" color="accent.primary" numberOfLines={1}>
            ₹{listing.rent.toLocaleString("en-IN")}
            <ThemedText variant="caption" color="foreground.secondary">
              {" "}
              / month
            </ThemedText>
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  listingCard: {
    flexDirection: "row",
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
  },

  listingImage: {
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  listingContent: {
    flex: 1,
    minWidth: 0,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: sizes.sm,
  },

  titleLocation: {
    flex: 1,
    minWidth: 0,
  },

  listingLocation: {
    marginTop: sizes.xs,
  },
});
