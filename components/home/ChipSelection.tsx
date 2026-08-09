import React from "react";
import { FlatList, StyleSheet } from "react-native";

import { ThemedChip } from "@/components/themed-ui/ThemedChip";
import { ThemedView } from "@/components/themed-ui/ThemedView";
import { sizes } from "@/theme/size";
import { ChipSelectionListProps } from "@/types/home/chip-selection-list";

export function ChipSelectionList({
  items,
  selectedChipsIds,
  onSelect,
}: ChipSelectionListProps) {
  return (
    <ThemedView>
      <FlatList
        horizontal={true}
        data={items}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={() => <ThemedView style={styles.separator} />}
        renderItem={({ item }) => (
          <ThemedChip
            variant="tertiary"
            selectedVariant="accent-primary"
            label={item.label}
            leftIcon={item.icon}
            labelVariant="subTitle"
            style={{
              paddingVertical: sizes.md,
              paddingHorizontal: sizes.xl,
            }}
            selected={
              selectedChipsIds.includes(item.id) ||
              (item.id === "all" && selectedChipsIds.length === 0)
            }
            onPress={() => onSelect(item.id)}
          />
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: sizes.lg,
  },

  separator: {
    width: sizes.sm,
  },
});

export default ChipSelectionList;
