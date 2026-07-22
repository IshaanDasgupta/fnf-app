import React from "react";
import { StyleSheet } from "react-native";

import { ThemedView } from "@/components/themed-ui/ThemedView";
import { ThemedText } from "@/components/themed-ui/ThemedText";

import { spacing } from "@/theme/spacing";
import { MatchBadgeProps } from "@/types/listing/card/match-badge";

export function MatchBadge({ percentage }: MatchBadgeProps) {
  return (
    <ThemedView
      backgroundColor="primary"
      borderRadius="button"
      style={styles.container}
    >
      <ThemedView
        variant="primary"
        borderRadius="button"
        style={styles.circle}
        justifyContent="center"
        alignItems="center"
      >
        <ThemedText variant="subTitle" color="primary">
          {percentage}
        </ThemedText>
      </ThemedView>

      <ThemedView variant="transparent" margin="sm">
        <ThemedText variant="caption" color="text.inverse">
          MATCH
        </ThemedText>

        <ThemedText variant="body" color="text.inverse">
          {percentage}% compatible
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },

  circle: {
    width: 42,
    height: 42,
  },
});

export default MatchBadge;
