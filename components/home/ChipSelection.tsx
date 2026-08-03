import React from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";

import { ThemedChip } from "@/components/themed-ui/ThemedChip";
import { ThemedView } from "@/components/themed-ui/ThemedView";
import { sizes } from "@/theme/size";
import { ChipSelectionListProps } from "@/types/home/chip-selection-list";

export function ChipSelectionList({
  items,
  selectedId,
  onSelect,
}: ChipSelectionListProps) {
  return (
    <ThemedView variant="transparent">
      <FlatList
        horizontal={true}
        data={items}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={() => <ThemedView style={styles.separator} />}
        renderItem={({ item }) => (
          <Pressable onPress={() => onSelect?.(item.id)}>
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
            />
          </Pressable>
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
