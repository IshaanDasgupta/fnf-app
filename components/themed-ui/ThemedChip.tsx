import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  View,
} from "react-native";

import { ThemedText } from "./ThemedText";

import { useColors } from "@/hooks/useColors";

import { chipVariants } from "@/theme/chip-variant";
import { radius } from "@/theme/radius";
import { spacing } from "@/theme/spacing";
import { shadows } from "@/theme/shadows";

import { resolveThemeColor } from "@/utils/resolve-theme-color";

import { ThemedChipProps } from "@/types/ui/themed-chip";
import { resolveToken } from "@/utils/resolve-token";

export function ThemedChip({
  variant = "primary",

  selected = false,

  loading = false,

  leftIcon,
  rightIcon,

  label,

  textVariant = "caption",

  borderRadius = "button",

  horizontalPadding = "lg",
  verticalPadding = "sm",

  style,

  ...rest
}: ThemedChipProps) {
  const colors = useColors();

  const config = chipVariants[variant];

  const chipStyle = (state: PressableStateCallbackType) => {
    const backgroundColor = resolveThemeColor(
      colors,
      selected
        ? (config.selectedBackground ?? config.background)
        : state.pressed
          ? (config.pressedBackground ?? config.background)
          : config.background,
    );

    const borderColor = resolveThemeColor(
      colors,
      selected ? (config.selectedBorder ?? config.border) : config.border,
    );

    return [
      styles.base,

      {
        backgroundColor,

        borderColor,

        borderWidth: config.border ? (config.borderWidth ?? 1) : 0,

        borderRadius: resolveToken(borderRadius, radius),

        paddingHorizontal: resolveToken(horizontalPadding, spacing),

        paddingVertical: resolveToken(verticalPadding, spacing),

        ...(config.shadow ? shadows[config.shadow] : {}),
      },

      style,
    ];
  };

  const textColor = selected
    ? (config.selectedText ?? config.text)
    : config.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{
        selected,
        busy: loading,
      }}
      disabled={loading}
      style={chipStyle}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={resolveThemeColor(colors, textColor)} />
      ) : (
        <>
          {leftIcon && <View>{leftIcon}</View>}

          <ThemedText variant={textVariant} color={textColor}>
            {label}
          </ThemedText>

          {rightIcon && <View>{rightIcon}</View>}
        </>
      )}
    </Pressable>
  );
}

export default ThemedChip;

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: spacing.sm,

    alignSelf: "flex-start",
  },
});
