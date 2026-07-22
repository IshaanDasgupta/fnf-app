import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-ui/ThemedText";
import { useColors } from "@/hooks/useColors";
import { buttonVariants } from "@/theme/button-variant";
import { radius } from "@/theme/radius";
import { shadows } from "@/theme/shadows";
import { spacing } from "@/theme/spacing";
import { ThemedButtonProps } from "@/types/ui/themed-button";
import { resolveThemeColor } from "@/utils/resolve-theme-color";

export function ThemedButton({
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  style,
  ...rest
}: ThemedButtonProps) {
  const colors = useColors();

  const config = buttonVariants[variant];

  const resolvedStyle = (state: PressableStateCallbackType) => {
    const backgroundColor = disabled
      ? resolveThemeColor(colors, "background.tertiary")
      : resolveThemeColor(
          colors,
          state.pressed
            ? (config.pressedBackground ?? config.background)
            : config.background,
        );

    return [
      styles.base,

      {
        backgroundColor,
        borderColor: resolveThemeColor(colors, config.border),
        borderWidth: config.border ? (config.borderWidth ?? 1) : 0,

        opacity: disabled ? 0.7 : 1,

        ...(config.shadow ? shadows.sm : {}),

        ...(config.compact && {
          paddingHorizontal: spacing.md,
        }),
      },

      fullWidth && styles.fullWidth,

      typeof style === "function" ? style(state) : style,
    ];
  };

  const textColor = disabled ? "text.tertiary" : config.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{
        disabled,
        busy: loading,
      }}
      disabled={disabled || loading}
      style={resolvedStyle}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={resolveThemeColor(colors, textColor)} />
      ) : (
        <>
          {leftIcon && <View>{leftIcon}</View>}

          <ThemedText variant="body" color={textColor}>
            {children}
          </ThemedText>

          {rightIcon && <View>{rightIcon}</View>}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,

    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,

    borderRadius: radius.button,

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    gap: spacing.sm,

    borderColor: "transparent",
  },

  fullWidth: {
    width: "100%",
  },
});

export default ThemedButton;
