import React from "react";
import { FlatList, StyleSheet } from "react-native";

import { ThemedChip } from "@/src/components/themed-ui/ThemedChip";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { sizes } from "@/src/theme/size";

export type MapFilterItem = {
  id: string;
  label: string;
  icon?: React.ComponentProps<typeof ThemedChip>["leftIcon"];
};

type MapFilterBarProps = {
  items: MapFilterItem[];
  selectedChipsIds: string[];
  onSelect(id: string): void;
};

export function MapFilterBar({
  items,
  selectedChipsIds,
  onSelect,
}: MapFilterBarProps) {
  return (
    <ThemedView>
      <FlatList
        horizontal
        data={items}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <ThemedView style={styles.separator} />}
        renderItem={({ item }) => (
          <ThemedChip
            variant="tertiary"
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
          />
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  separator: {
    width: sizes.sm,
  },

  chip: {
    paddingHorizontal: sizes.xl,
    paddingVertical: sizes.md,
  },
});

export default MapFilterBar;
