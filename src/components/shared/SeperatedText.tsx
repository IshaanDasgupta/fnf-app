import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useResolveThemeColor } from "@/src/hooks/theme/useResolveThemeColor";
import { ThemedColorToken } from "@/src/types/theme-color";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
interface SeparatedTextProps {
  items: string[];
  variant?: React.ComponentProps<typeof ThemedText>["variant"];
  color?: ThemedColorToken;
}
export function SeparatedText({
  items,
  variant = "body",
  color = "foreground.primary",
}: SeparatedTextProps) {
  return (
    <ThemedView style={styles.container}>
      {items.map((item, index) => (
        <React.Fragment key={`${item}-${index}`}>
          {index > 0 && (
            <Ionicons
              name="ellipse"
              size={4}
              color={useResolveThemeColor(color)}
              style={styles.separator}
            />
          )}
          <ThemedText variant={variant} color={color}>
            {item}
          </ThemedText>
        </React.Fragment>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    minWidth: 0,
  },

  separator: {
    marginHorizontal: 6,
  },
});

export default SeparatedText;
