import React from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";

import { ThemedChip } from "@/components/themed-ui/ThemedChip";
import { ThemedView } from "@/components/themed-ui/ThemedView";
import { spacing } from "@/theme/spacing";
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
              label={item.label}
              textVariant="subTitle"
              leftIcon={item.icon}
              variant={selectedId === item.id ? "black" : "tertiary"}
              verticalPadding={spacing.md}
              horizontalPadding={spacing.xl}
            />
          </Pressable>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: spacing.lg,
  },

  separator: {
    width: spacing.sm,
  },
});

export default ChipSelectionList;
