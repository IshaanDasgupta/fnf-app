import React from "react";
import { FlatList, StyleSheet } from "react-native";

import { ThemedChip } from "@/src/components/themed-ui/ThemedChip";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { sizes } from "@/src/theme/size";
import { ChipSelectionListProps } from "@/src/types/home/chip-selection-list";

export function ChipSelectionList({
  items,
  selectedChipsIds,
  onSelect,
}: ChipSelectionListProps) {
  return (
    <FlatList
      horizontal
      data={items}
      style={styles.list}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <ThemedView style={styles.separator} />}
      renderItem={({ item }) => (
        <ThemedChip
          variant="secondary"
          shadow="lg"
          selectedVariant="accent-primary"
          label={item.label}
          leftIcon={item.icon}
          labelVariant="subTitle"
          style={styles.chip}
          selected={
            selectedChipsIds.includes(item.id) ||
            (item.id === "all" && selectedChipsIds.length === 0)
          }
          onPress={() => onSelect(item.id)}
          controlled
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    overflow: "visible",
  },

  content: {
    paddingVertical: sizes.lg,
    paddingBottom: sizes["2xl"],
  },

  separator: {
    width: sizes.sm,
  },

  chip: {
    paddingVertical: sizes.md,
    paddingHorizontal: sizes.xl,
    gap: sizes.sm,
  },
});

export default ChipSelectionList;
