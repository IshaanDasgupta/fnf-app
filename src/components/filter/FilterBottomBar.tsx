import { ThemedButton } from "@/src/components/themed-ui/ThemedButton";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { radius } from "@/src/theme/radius";
import { shadows } from "@/src/theme/shadows";
import { sizes } from "@/src/theme/size";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface FilterBottomBarProps {
  onClear: () => void;
  onApply: () => void;
  activeCount: number;
}

export function FilterBottomBar({
  onClear,
  onApply,
  activeCount,
}: FilterBottomBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView
      variant="primary"
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, sizes.lg),
        },
      ]}
    >
      <ThemedView style={styles.clearWrapper}>
        <ThemedButton
          variant="secondary"
          label="Clear all"
          labelVariant="subTitle"
          radius="button"
          disabled={activeCount === 0}
          onPress={onClear}
          style={styles.clearButton}
        />
      </ThemedView>

      <ThemedView style={styles.applyWrapper}>
        <ThemedButton
          variant="accent-primary"
          label={
            activeCount > 0
              ? `Show Results (${activeCount})`
              : "Show Results"
          }
          labelVariant="title"
          rightIcon={<Ionicons name="arrow-forward" size={18} color="#161B24" />}
          radius="button"
          onPress={onApply}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: sizes.md,
    paddingHorizontal: sizes.lg,
    paddingTop: sizes.md,
    borderTopLeftRadius: radius.screen,
    borderTopRightRadius: radius.screen,
    ...shadows.lg,
  },
  clearWrapper: {
    flex: 1,
  },
  clearButton: {
    width: "100%",
  },
  applyWrapper: {
    flex: 2,
  },
});

export default FilterBottomBar;
