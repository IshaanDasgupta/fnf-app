import React from "react";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";

import { radius } from "@/theme/radius";
import { sizes } from "@/theme/size";
import { MatchBadgeProps } from "@/types/listing/card/match-badge";

export function MatchBadge({ percentage }: MatchBadgeProps) {
  return (
    <ThemedView
      variant="accent-primary"
      style={[
        styles.container,
        {
          borderRadius: radius.button,
        },
      ]}
    >
      <ThemedView
        variant="primary"
        style={[
          styles.circle,
          {
            borderRadius: radius.button,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ThemedText variant="subTitle" color="accent.primary">
          {percentage}
        </ThemedText>
      </ThemedView>

      <ThemedView variant="transparent" style={{ margin: sizes.sm }}>
        <ThemedText variant="caption" color="foreground.inverse">
          MATCH
        </ThemedText>

        <ThemedText variant="body" color="foreground.inverse">
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

    paddingHorizontal: sizes.sm,
    paddingVertical: sizes.sm,
  },

  circle: {
    width: 42,
    height: 42,
  },
});

export default MatchBadge;
