import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ThemedButton } from "@/components/themed-ui/ThemedButton";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";

import { spacing } from "@/theme/spacing";
import { shadows } from "@/theme/shadows";

export default function ListingBottomBar() {
  return (
    <ThemedView
      variant="primary"
      //   borderTopLeftRadius="screen"
      //   borderTopRightRadius="screen"
      padding={spacing.xl}
      style={styles.container}
    >
      <ThemedView flexDirection="row" alignItems="center" gap="xs">
        <ThemedText variant="h3">₹24,500</ThemedText>

        <ThemedText variant="body" color="text.secondary">
          /mo
        </ThemedText>
      </ThemedView>

      <ThemedText
        variant="caption"
        color="text.secondary"
        style={styles.subtitle}
      >
        Move in by Aug 12
      </ThemedText>

      <ThemedButton
        variant="primary"
        style={styles.button}
        leftIcon={<Ionicons name="heart-outline" size={18} color="white" />}
      >
        I'm interested
      </ThemedButton>
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

    ...shadows.lg,
  },

  subtitle: {
    marginTop: spacing.xs,
    flex: 1,
  },

  button: {
    marginLeft: spacing.xl,
    minWidth: 180,
  },
});
