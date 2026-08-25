import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ThemedIconButton } from "@/src/components/themed-ui/ThemedIconButton";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";

import CitySelectionInput from "@/src/components/shared/CitySelectionInput";
import { useAuth } from "@/src/hooks/useAuth";
import { useLocationStore } from "@/src/stores/location";
import { radius } from "@/src/theme/radius";
import { sizes } from "@/src/theme/size";

export function HomeHeader() {
  const { user } = useAuth();

  const city = useLocationStore((state) => state.city);

  const [showCitySelection, setShowCitySelection] = useState(false);

  const firstName = user?.name?.trim().split(/\s+/)[0] ?? "";
  const displayName =
    firstName.length > 14 ? `${firstName.slice(0, 14)}…` : firstName;

  const cityLabel = city
    ? city.charAt(0).toUpperCase() + city.slice(1)
    : "Select city";

  return (
    <ThemedView style={styles.container} gap="md">
      {showCitySelection && (
        <CitySelectionInput
          onSelect={() => {
            setShowCitySelection(false);
          }}
        />
      )}
      <ThemedView style={styles.headerContainer}>
        <ThemedView style={styles.leftContent}>
          {!showCitySelection && (
            <Pressable
              onPress={() => setShowCitySelection(true)}
              style={styles.cityButton}
            >
              <ThemedText variant="title" color="foreground.secondary">
                {cityLabel}
              </ThemedText>

              <ThemedText variant="caption" color="accent.primary">
                Change
              </ThemedText>
            </Pressable>
          )}

          <ThemedView style={styles.titleContainer}>
            <ThemedText variant="display" color="foreground.primary">
              {`Hi ${displayName}, `}
            </ThemedText>

            <ThemedText variant="display" color="accent.primary">
              welcome home.
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedIconButton
          variant="secondary"
          size="lg"
          style={styles.avatar}
          icon={<Ionicons name="person-outline" size={20} />}
          disabled
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  headerContainer: {
    flexDirection: "row",
    marginBottom: sizes.xl,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  leftContent: {
    flex: 1,
  },

  cityButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: sizes.sm,
  },

  titleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: sizes.xs,
    paddingRight: sizes.md,
  },

  avatar: {
    borderRadius: radius.phone,
  },
});

export default HomeHeader;
