import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import { BackgroundColorToken } from "@/types/theme-color";
import {
  ThemedSafeAreaProps,
  ThemedSafeAreaVariant,
} from "@/types/ui/themed-safe-area";
import { resolveThemeColor } from "@/utils/resolve-theme-color";

const variantBackgroundMap: Record<
  Exclude<ThemedSafeAreaVariant, "transparent">,
  BackgroundColorToken
> = {
  primary: "background.primary",
  secondary: "background.secondary",
  tertiary: "background.tertiary",
  elevated: "background.elevated",
};

export function ThemedSafeArea({
  variant = "primary",
  backgroundColor,
  style,
  children,
  ...rest
}: ThemedSafeAreaProps) {
  const colors = useColors();

  const resolvedBackgroundColor = backgroundColor
    ? resolveThemeColor(colors, backgroundColor)
    : variant === "transparent"
      ? "transparent"
      : resolveThemeColor(colors, variantBackgroundMap[variant]);

  return (
    <SafeAreaView
      style={[
        styles.base,
        {
          backgroundColor: resolvedBackgroundColor,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
});

export default ThemedSafeArea;
