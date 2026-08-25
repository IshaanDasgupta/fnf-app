import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { radius } from "@/src/theme/radius";
import { sizes } from "@/src/theme/size";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

export interface FilterTileItem<T extends string = string> {
  id: T;
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  categoryTint?: string;
  categoryIconColor?: string;
}

export interface FilterTileGridProps<T extends string = string> {
  items: FilterTileItem<T>[];
  selected: T[];
  onToggle: (id: T) => void;
  columns?: 2 | 3;
  style?: StyleProp<ViewStyle>;
}

export function FilterTileGrid<T extends string = string>({
  items,
  selected,
  onToggle,
  columns = 2,
  style,
}: FilterTileGridProps<T>) {
  return (
    <ThemedView style={[styles.container, style]}>
      {items.map((item) => {
        const isSelected = selected.includes(item.id);

        return (
          <Pressable
            key={item.id}
            onPress={() => onToggle(item.id)}
            style={[
              styles.tilePressable,
              { width: columns === 2 ? "48.5%" : "31%" },
            ]}
          >
            <ThemedView
              variant={isSelected ? "accent-primary" : "secondary"}
              style={[
                styles.tile,
                { borderRadius: radius.md },
                isSelected ? styles.tileSelected : styles.tileUnselected,
              ]}
            >
              <ThemedView
                style={[
                  styles.iconCircle,
                  {
                    backgroundColor: isSelected
                      ? "rgba(22, 27, 36, 0.15)"
                      : item.categoryTint ?? "rgba(77, 164, 232, 0.12)",
                  },
                ]}
              >
                <Ionicons
                  name={item.iconName}
                  size={16}
                  color={
                    isSelected
                      ? "#161B24"
                      : item.categoryIconColor ?? "#4DA4E8"
                  }
                />
              </ThemedView>

              <ThemedText
                variant="subTitle"
                color={isSelected ? "foreground.black" : "foreground.primary"}
                style={styles.label}
                numberOfLines={1}
              >
                {item.label}
              </ThemedText>

              <ThemedView
                style={[
                  styles.checkbox,
                  isSelected ? styles.checkboxSelected : styles.checkboxUnselected,
                ]}
              >
                {isSelected ? (
                  <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                ) : null}
              </ThemedView>
            </ThemedView>
          </Pressable>
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: sizes.xs,
  },
  tilePressable: {
    marginBottom: sizes.xs,
  },
  tile: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: sizes.sm,
    paddingHorizontal: sizes.md,
    gap: sizes.sm,
    minHeight: 46,
  },
  tileUnselected: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.04)",
  },
  tileSelected: {
    borderWidth: 1.5,
    borderColor: "#161B24",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxUnselected: {
    borderWidth: 1.5,
    borderColor: "rgba(0, 0, 0, 0.15)",
  },
  checkboxSelected: {
    backgroundColor: "#161B24",
  },
});

export default FilterTileGrid;
