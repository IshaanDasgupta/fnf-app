import React from "react";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";
import { useResolveThemeColor } from "@/hooks/useResolveThemeColor";
import { renderIcon } from "@/lib/utils/iconUtils";
import { sizes } from "@/theme/size";
import { ThemedIconTextProps } from "@/types/ui/themed-icon-text";

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
