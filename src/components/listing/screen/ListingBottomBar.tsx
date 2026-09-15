import React from "react";
import { Linking, StyleSheet } from "react-native";

import { ThemedButton } from "@/src/components/themed-ui/ThemedButton";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";

import { shadows } from "@/src/theme/shadows";
import { sizes } from "@/src/theme/size";

interface ListingBottomBarProps {
  rent: number;
  availableFrom?: string;
  availableImmediately: boolean;
  url?: string;
}

export default function ListingBottomBar({
  rent,
  availableFrom,
  availableImmediately,
  url,
}: ListingBottomBarProps) {
  const moveInText = availableImmediately
    ? "Available immediately"
    : availableFrom
      ? `Move in by ${new Date(availableFrom).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        })}`
      : "Move-in date not specified";

  const handleInterested = async () => {
    try {
      if (url) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error("Failed to open listing URL:", error);
    }
  };

  return (
    <ThemedView
      variant="tertiary"
      paddingHorizontal="xl"
      paddingVertical="lg"
      style={styles.container}
    >
      <ThemedView gap="xs">
        <ThemedView gap="xs" style={styles.priceRow}>
          <ThemedText variant="h2">₹{rent.toLocaleString("en-IN")}</ThemedText>

          <ThemedText variant="body" color="foreground.secondary">
            /mo
          </ThemedText>
        </ThemedView>

        <ThemedText variant="caption" color="foreground.secondary">
          {moveInText}
        </ThemedText>
      </ThemedView>

      <ThemedButton
        onPress={handleInterested}
        variant="accent-secondary"
        style={styles.button}
        label="Contact Lister"
        labelVariant="h3"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    ...shadows.lg,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  button: {
    width: "auto",
    paddingHorizontal: sizes["3xl"],
  },
});
