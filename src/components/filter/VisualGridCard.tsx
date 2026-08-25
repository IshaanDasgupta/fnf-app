import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { radius } from "@/src/theme/radius";
import { sizes } from "@/src/theme/size";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

export interface VisualOptionItem<T extends string = string> {
  id: T;
  title: string;
  subtitle?: string;
  iconName: keyof typeof Ionicons.glyphMap;
  tintBg?: string;
  tintColor?: string;
}

export interface VisualGridCardProps<T extends string = string> {
  items: VisualOptionItem<T>[];
  selected: T[];
  onToggle: (id: T) => void;
  columns?: 2 | 3 | 4;
  style?: StyleProp<ViewStyle>;
}

export function VisualGridCard<T extends string = string>({
  items,
  selected,
  onToggle,
  columns = 3,
  style,
}: VisualGridCardProps<T>) {
  return (
    <ThemedView style={[styles.container, style]}>
      {items.map((item) => {
        const isSelected = selected.includes(item.id);

        return (
          <Pressable
            key={item.id}
            onPress={() => onToggle(item.id)}
            style={[
              styles.cardPressable,
              {
                width:
                  columns === 4
                    ? "23%"
                    : columns === 2
                      ? "48%"
                      : "31%",
              },
            ]}
          >
            <ThemedView
              variant={isSelected ? "accent-primary" : "secondary"}
              style={[
                styles.card,
                { borderRadius: radius.lg },
                isSelected ? styles.cardSelected : styles.cardUnselected,
              ]}
            >
              {/* Top checkmark badge if selected */}
              {isSelected && (
                <ThemedView style={styles.checkBadge}>
                  <Ionicons name="checkmark-circle" size={16} color="#161B24" />
                </ThemedView>
              )}

              {/* Icon in tinted circle */}
              <ThemedView
                style={[
                  styles.iconCircle,
                  {
                    backgroundColor: isSelected
                      ? "rgba(22, 27, 36, 0.12)"
                      : item.tintBg ?? "rgba(77, 164, 232, 0.12)",
                  },
                ]}
              >
                <Ionicons
                  name={item.iconName}
                  size={20}
                  color={
                    isSelected
                      ? "#161B24"
                      : item.tintColor ?? "#4DA4E8"
                  }
                />
              </ThemedView>

              {/* Title & Subtitle */}
              <ThemedText
                variant="subTitle"
                color={isSelected ? "foreground.black" : "foreground.primary"}
                style={styles.title}
                numberOfLines={1}
              >
                {item.title}
              </ThemedText>

              {item.subtitle ? (
                <ThemedText
                  variant="caption"
                  color={
                    isSelected
                      ? "foreground.black"
                      : "foreground.secondary"
                  }
                  style={styles.subtitle}
                  numberOfLines={1}
                >
                  {item.subtitle}
                </ThemedText>
              ) : null}
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
    gap: sizes.sm,
  },
  cardPressable: {
    marginBottom: sizes.xs,
  },
  card: {
    padding: sizes.md,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    minHeight: 90,
  },
  cardUnselected: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.04)",
  },
  cardSelected: {
    borderWidth: 1.5,
    borderColor: "#161B24",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  checkBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    zIndex: 2,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: sizes.xs,
  },
  title: {
    fontWeight: "700",
    fontSize: 13,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 10,
    marginTop: 2,
    textAlign: "center",
    opacity: 0.85,
  },
});

export default VisualGridCard;
