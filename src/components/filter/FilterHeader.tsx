import { ThemedIconButton } from "@/src/components/themed-ui/ThemedIconButton";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { shadows } from "@/src/theme/shadows";
import { sizes } from "@/src/theme/size";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

export interface FilterHeaderProps {
  title?: string;
  onBack: () => void;
  onReset?: () => void;
  canReset?: boolean;
  activeCount?: number;
}

export function FilterHeader({
  title = "Filters",
  onBack,
  onReset,
  canReset = false,
  activeCount = 0,
}: FilterHeaderProps) {
  return (
    <ThemedView style={styles.container} paddingBottom="sm">
      <ThemedIconButton
        variant="secondary"
        size="md"
        icon={<Ionicons name="close" size={20} />}
        onPress={onBack}
        accessibilityLabel="Close filters"
        style={{ ...shadows.md }}
      />

      <ThemedView style={styles.titleContainer}>
        <ThemedText variant="h2" style={styles.title}>
          {title}
        </ThemedText>

        {activeCount > 0 && (
          <ThemedView
            variant="accent-primary"
            borderRadius="button"
            style={styles.activeBadge}
          >
            <ThemedText
              variant="caption"
              color="foreground.white"
              style={styles.badgeText}
            >
              {activeCount} active
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>

      <ThemedView style={styles.resetWrapper}>
        {canReset && onReset ? (
          <Pressable
            onPress={onReset}
            hitSlop={12}
            style={styles.resetPressable}
          >
            <ThemedText variant="subTitle" color="accent.primary">
              Reset
            </ThemedText>
          </Pressable>
        ) : (
          <ThemedView style={styles.placeholder} />
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: sizes.sm,
  },
  title: {
    fontSize: 17.6,
    lineHeight: 22.4,
  },
  activeBadge: {
    paddingHorizontal: sizes.sm,
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 8.8,
    fontWeight: "700",
  },
  resetWrapper: {
    minWidth: 44,
    alignItems: "flex-end",
  },
  resetPressable: {
    paddingHorizontal: sizes.xs,
    paddingVertical: sizes.xs,
  },
  placeholder: {
    width: 44,
  },
});

export default FilterHeader;
