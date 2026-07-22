import React from "react";
import { StyleSheet } from "react-native";

import { ThemedIconButton } from "@/components/themed-ui/ThemedIconButton";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";

import { spacing } from "@/theme/spacing";
import { radius } from "@/theme/radius";
import { HomeHeaderProps } from "@/types/home/header";

export function HomeHeader({ location, name, avatar }: HomeHeaderProps) {
  return (
    <ThemedView
      style={styles.container}
      justifyContent="space-between"
      alignItems="center"
    >
      <ThemedView flex={1}>
        <ThemedText variant="title" color="text.secondary">
          {location}
        </ThemedText>

        <ThemedView style={styles.titleContainer}>
          <ThemedText variant="display" color="text.primary">
            {`Hi ${name}, `}
          </ThemedText>
          <ThemedText variant="display" color="primary">
            welcome home.
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedIconButton
        variant="secondary"
        size="lg"
        style={styles.avatar}
        icon={avatar}
        disabled
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: spacing.xl,
  },

  titleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: spacing.xs,
    paddingRight: spacing.md,
  },

  avatar: {
    borderRadius: radius.phone,
  },
});

export default HomeHeader;
