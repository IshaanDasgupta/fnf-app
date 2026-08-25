import { ThemedChip } from "@/src/components/themed-ui/ThemedChip";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { sizes } from "@/src/theme/size";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

export interface FilterChipItem<T extends string = string> {
  id: T;
  label: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  icon?: React.ReactNode;
}

export interface FilterChipGroupProps<T extends string = string> {
  items: FilterChipItem<T>[];
  selected: T[];
  onToggle: (id: T) => void;
  chipStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

export function FilterChipGroup<T extends string = string>({
  items,
  selected,
  onToggle,
  chipStyle,
  style,
}: FilterChipGroupProps<T>) {
  return (
    <ThemedView style={[styles.container, style]}>
      {items.map((item) => {
        const isSelected = selected.includes(item.id);
        const leftIcon = item.iconName ? (
          <Ionicons name={item.iconName} size={16} />
        ) : (
          item.icon
        );

        return (
          <ThemedChip
            key={item.id}
            variant="secondary"
            selectedVariant="accent-primary"
            selected={isSelected}
            label={item.label}
            labelVariant="subTitle"
            leftIcon={leftIcon}
            rightIcon={
              isSelected ? (
                <Ionicons name="checkmark-sharp" size={14} />
              ) : undefined
            }
            borderRadius="button"
            onPress={() => onToggle(item.id)}
            style={[
              styles.chip,
              isSelected && styles.selectedChip,
              chipStyle,
            ]}
          />
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: sizes.sm,
  },
  chip: {
    paddingHorizontal: sizes.lg,
    paddingVertical: sizes.md,
  },
  selectedChip: {
    paddingRight: sizes.md,
  },
});

export default FilterChipGroup;
