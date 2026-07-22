import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { useColors } from "@/hooks/useColors";
import { spacing } from "@/theme/spacing";
import { BackgroundColorToken } from "@/types/theme-color";
import {
  ThemedScrollViewProps,
  ThemedScrollViewVariant,
} from "@/types/ui/themed-scroll-view";
import { resolveThemeColor } from "@/utils/resolve-theme-color";
import { resolveToken } from "@/utils/resolve-token";

const variantBackgroundMap: Record<
  Exclude<ThemedScrollViewVariant, "transparent">,
  BackgroundColorToken
> = {
  primary: "background.primary",
  secondary: "background.secondary",
  tertiary: "background.tertiary",
  elevated: "background.elevated",
};

export function ThemedScrollView({
  variant = "primary",
  backgroundColor,
  padding,
  style,
  contentContainerStyle,
  keyboardShouldPersistTaps = "handled",
  showsVerticalScrollIndicator = true,
  showsHorizontalScrollIndicator = false,
  children,
  ...rest
}: ThemedScrollViewProps) {
  const colors = useColors();

  const resolvedBackgroundColor = backgroundColor
    ? resolveThemeColor(colors, backgroundColor)
    : variant === "transparent"
      ? "transparent"
      : resolveThemeColor(colors, variantBackgroundMap[variant]);

  const resolvedPadding = resolveToken(padding, spacing);

  return (
    <ScrollView
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      style={[
        styles.base,
        {
          backgroundColor: resolvedBackgroundColor,
        },
        style,
      ]}
      contentContainerStyle={[
        resolvedPadding !== undefined && {
          padding: resolvedPadding,
        },
        contentContainerStyle,
      ]}
      {...rest}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
});

export default ThemedScrollView;
