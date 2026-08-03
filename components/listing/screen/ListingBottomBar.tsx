import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ThemedButton } from "@/components/themed-ui/ThemedButton";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";

import { shadows } from "@/theme/shadows";
import { sizes } from "@/theme/size";

export default function ListingBottomBar() {
  return (
    <ThemedView
      variant="tertiary"
      //   borderTopLeftRadius="screen"
      //   borderTopRightRadius="screen"
      padding="xl"
      style={styles.container}
    >
      <ThemedView gap="xs" style={{ flexDirection: "column" }}>
        <ThemedView
          gap="xs"
          style={{ flexDirection: "row", alignItems: "baseline" }}
        >
          <ThemedText variant="h2">₹24,500</ThemedText>
          <ThemedText variant="body" color="foreground.secondary">
            /mo
          </ThemedText>
        </ThemedView>

        <ThemedText variant="caption" color="foreground.secondary">
          Move in by Aug 12
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

  button: {
    // marginLeft: sizes.xl,
    width: "auto",
    paddingHorizontal: sizes["3xl"],
    paddingVertical: sizes["xl"],
  },
});
