import { StyleSheet } from "react-native";
import { FlatList } from "react-native";

import { ListingCard } from "@/components/listing/card/ListingCard";

import { Spacer } from "@/components/themed-ui/Spacer";
import { ThemedSafeArea } from "@/components/themed-ui/ThemedSafeArea";
import { ThemedText } from "@/components/themed-ui/ThemedText";

import { Listing } from "@/types/listing/card/card";
import { sizes } from "@/theme/size";

const FAVOURITES: Listing[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
    title: "Sunlit Loft near Indiranagar",
    location: "Indiranagar",
    price: 24500,
    compatibility: 94,
    verified: true,
    favorite: true,
    bedrooms: 3,
    flatmates: 2,
    availableDate: "Aug 12",
    tags: ["Pet-friendly", "Non-smoking", "Early bird"],
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200",
    title: "Modern Studio in Koramangala",
    location: "Koramangala",
    price: 21000,
    compatibility: 89,
    verified: true,
    favorite: true,
    bedrooms: 2,
    flatmates: 1,
    availableDate: "Sep 1",
    tags: ["Balcony", "Furnished", "Near Metro"],
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200",
    title: "Luxury Apartment",
    location: "HSR Layout",
    price: 32000,
    compatibility: 97,
    verified: true,
    favorite: true,
    bedrooms: 4,
    flatmates: 3,
    availableDate: "Aug 20",
    tags: ["Gym", "Pool", "Parking"],
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200",
    title: "Cozy Room near MG Road",
    location: "MG Road",
    price: 18500,
    compatibility: 91,
    verified: false,
    favorite: true,
    bedrooms: 2,
    flatmates: 2,
    availableDate: "Immediately",
    tags: ["WiFi", "AC", "Vegetarian"],
  },
];

export default function SavedScreen() {
  return (
    <ThemedSafeArea>
      <FlatList
        data={FAVOURITES}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <ThemedText variant="display">Saved homes</ThemedText>

            <Spacer size="xs" />

            <ThemedText variant="h3" color="foreground.secondary">
              Homes you've liked appear here.
            </ThemedText>

            <Spacer size="2xl" />
          </>
        }
        ItemSeparatorComponent={() => <Spacer size="xl" />}
        renderItem={({ item }) => <ListingCard listing={item} />}
        ListFooterComponent={<Spacer size="4xl" />}
      />
    </ThemedSafeArea>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: sizes.lg,
    paddingTop: sizes.lg,
    paddingBottom: sizes["6xl"],
  },
});
