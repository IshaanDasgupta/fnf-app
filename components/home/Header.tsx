import React from "react";
import { StyleSheet } from "react-native";

import { ThemedIconButton } from "@/components/themed-ui/ThemedIconButton";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";

import { useAuth } from "@/hooks/useAuth";
import { radius } from "@/theme/radius";
import { sizes } from "@/theme/size";
import { HomeHeaderProps } from "@/types/home/header";

export function HomeHeader({ location }: HomeHeaderProps) {
  const { user } = useAuth();

  const firstName = user?.name?.trim().split(/\s+/)[0] ?? "";
  const displayName =
    firstName.length > 14 ? `${firstName.slice(0, 14)}…` : firstName;

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={{ flex: 1 }}>
        <ThemedText variant="title" color="foreground.secondary">
          {location}
        </ThemedText>

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
        icon={user?.avatar}
        disabled
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: sizes.xl,
    justifyContent: "space-between",
    alignItems: "center",
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
