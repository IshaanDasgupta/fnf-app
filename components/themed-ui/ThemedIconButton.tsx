import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  View,
} from "react-native";

import { useColors } from "@/hooks/useColors";
import { radius } from "@/theme/radius";
import { iconButtonVariants } from "@/theme/icon-button-variant";
import { resolveThemeColor } from "@/utils/resolve-theme-color";
import {
  iconButtonSizes,
  ThemedIconButtonProps,
} from "@/types/ui/themed-icon-button";
import { shadows } from "@/theme/shadows";

function cloneIcon(icon: React.ReactNode, color: string, size: number) {
  if (!React.isValidElement(icon)) {
    return icon;
  }

  return React.cloneElement(
    icon as React.ReactElement<{
      color?: string;
      size?: number;
    }>,
    {
      color,
      size,
    },
  );
}

export function ThemedIconButton({
  variant = "primary",
  size = "md",
  icon,
  loading = false,
  disabled = false,
  selected = false,
  fullWidth = false,
  style,
  accessibilityHint,
  accessibilityLabel,
  ...rest
}: ThemedIconButtonProps) {
  const colors = useColors();

  const config = iconButtonVariants[variant];
  const sizes = iconButtonSizes[size];

  const iconColor = disabled
    ? resolveThemeColor(colors, "text.tertiary")
    : resolveThemeColor(
        colors,
        selected ? (config.selectedIcon ?? config.icon) : config.icon,
      );

  const resolvedStyle = (state: PressableStateCallbackType) => {
    const backgroundColor = disabled
      ? resolveThemeColor(colors, "background.tertiary")
      : resolveThemeColor(
          colors,
          state.pressed
            ? (config.pressedBackground ?? config.background)
            : selected
              ? (config.selectedBackground ?? config.background)
              : config.background,
        );

    return [
      styles.base,

      {
        width: sizes.button,
        height: sizes.button,

        backgroundColor,

        borderColor: resolveThemeColor(
          colors,
          selected ? (config.selectedBorder ?? config.border) : config.border,
        ),

        borderWidth: config.borderWidth ?? 1,

        opacity: disabled ? 0.7 : 1,

        ...(config.shadow ? shadows[config.shadow] : {}),
      },

      fullWidth && styles.fullWidth,

      typeof style === "function" ? style(state) : style,
    ];
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{
        disabled,
        busy: loading,
        selected,
      }}
      disabled={disabled || loading}
      style={resolvedStyle}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={iconColor} size="small" />
      ) : (
        <View style={styles.iconWrapper}>
          {cloneIcon(icon, iconColor, sizes.icon)}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.button,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "transparent",
  },

  fullWidth: {
    width: "100%",
  },

  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ThemedIconButton;
