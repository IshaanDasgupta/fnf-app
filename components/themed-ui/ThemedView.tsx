import React from "react";
import { View } from "react-native";

import { useColors } from "@/hooks/useColors";
import { radius } from "@/theme/radius";
import { spacing } from "@/theme/spacing";
import { BackgroundColorToken } from "@/types/theme-color";
import { ThemedViewProps, ThemedViewVariant } from "@/types/ui/themed-view";
import { resolveThemeColor } from "@/utils/resolve-theme-color";
import { resolveToken } from "@/utils/resolve-token";

const variantBackgroundMap: Record<
  Exclude<ThemedViewVariant, "transparent">,
  BackgroundColorToken
> = {
  primary: "background.primary",
  secondary: "background.secondary",
  tertiary: "background.tertiary",
  elevated: "background.elevated",
  black: "black",
};

export function ThemedView({
  variant = "primary",
  backgroundColor,
  borderColor,
  borderRadius,
  padding,
  margin,
  gap,
  flex,
  flexGrow,
  flexShrink,
  flexDirection,
  alignSelf,
  justifyContent,
  alignItems,
  style,
  children,
  ...rest
}: ThemedViewProps) {
  const colors = useColors();

  const resolvedBackgroundColor = backgroundColor
    ? resolveThemeColor(colors, backgroundColor)
    : variant === "transparent"
      ? "transparent"
      : resolveThemeColor(colors, variantBackgroundMap[variant]);

  return (
    <View
      style={[
        {
          backgroundColor: resolvedBackgroundColor,

          borderColor: resolveThemeColor(colors, borderColor),

          borderRadius: resolveToken(borderRadius, radius),

          padding: resolveToken(padding, spacing),
          margin: resolveToken(margin, spacing),
          gap: resolveToken(gap, spacing),

          flex,
          flexGrow,
          flexShrink,

          flexDirection,

          alignSelf,
          justifyContent,
          alignItems,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

export default ThemedView;
