import { ThemedButton } from "@/src/components/themed-ui/ThemedButton";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { sizes } from "@/src/theme/size";
import React from "react";
import { StyleSheet } from "react-native";

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
  return (
    <ThemedView style={styles.buttonContainer} paddingVertical="xl">
      <ThemedButton
        variant="accent-secondary"
        labelVariant="h3"
        label="Clear all"
        disabled={activeCount === 0}
        onPress={onClear}
        style={styles.backButton}
      />

      <ThemedButton
        label="Show Results"
        labelVariant="h3"
        onPress={onApply}
        style={styles.saveButton}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: "auto",
    flexDirection: "row",
    gap: sizes.md,
  },

  backButton: {
    flex: 1,
  },

  saveButton: {
    flex: 2,
  },
});

export default FilterBottomBar;
