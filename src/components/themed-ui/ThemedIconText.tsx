import React from "react";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useResolveThemeColor } from "@/src/hooks/theme/useResolveThemeColor";
import { renderIcon } from "@/src/lib/utils/iconUtils";
import { sizes } from "@/src/theme/size";
import { ThemedIconTextProps } from "@/src/types/ui/themed-icon-text";

export function ThemedIconText({
  icon,
  label,

  iconColor = "foreground.primary",
  iconSize,

  labelColor = "foreground.primary",
  variant = "body",

  gap = "sm",

  style,

  ...props
}: ThemedIconTextProps) {
  const resolvedIconColor = useResolveThemeColor(iconColor);

  return (
    <ThemedView
      {...props}
      style={[
        styles.base,
        {
          gap: sizes[gap],
        },
        style,
      ]}
    >
      {renderIcon(icon, resolvedIconColor, iconSize)}

      <ThemedText variant={variant} color={labelColor}>
        {label}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
  },
});
