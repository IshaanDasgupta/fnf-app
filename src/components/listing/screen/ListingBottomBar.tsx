import React from "react";
import { StyleSheet } from "react-native";

import { ThemedButton } from "@/src/components/themed-ui/ThemedButton";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";

import { shadows } from "@/src/theme/shadows";
import { sizes } from "@/src/theme/size";

interface ListingBottomBarProps {
  rent: number;
  availableFrom?: string;
  availableImmediately: boolean;
}

export default function ListingBottomBar({
  rent,
  availableFrom,
  availableImmediately,
}: ListingBottomBarProps) {
  const moveInText = availableImmediately
    ? "Available immediately"
    : availableFrom
      ? `Move in by ${new Date(availableFrom).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        })}`
      : "Move-in date not specified";

  return (
    <ThemedView variant="tertiary" padding="xl" style={styles.container}>
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
        variant="accent-secondary"
        style={styles.button}
        label="I'm interested"
        labelVariant="title"
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
    paddingVertical: sizes["xl"],
  },
});
