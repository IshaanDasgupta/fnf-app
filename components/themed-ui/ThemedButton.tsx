import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

import { radius } from "@/theme/radius";
import { shadows } from "@/theme/shadows";
import { sizes } from "@/theme/size";
import { ThemedButtonProps } from "@/types/ui/themed-button";
import { buttonVariants } from "@/theme/variants";
import { useResolveThemeColor } from "@/hooks/useResolveThemeColor";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import { renderIcon } from "@/utils/iconUtils";

export function ThemedButton({
  variant = "accent-primary",
  label,
  labelVariant = "body",
  leftIcon,
  rightIcon,
  loading,
  loadingPlaceholder,

  gap = "sm",
  radius: borderRadius = "button",

  style,
  disabled,

  ...props
}: ThemedButtonProps) {
  const config = buttonVariants[variant];

  const backgroundColor = useResolveThemeColor(config.background);
  const borderColor = config.borderColor
    ? useResolveThemeColor(config.borderColor)
    : undefined;
  const foregroundColor = useResolveThemeColor(config.foregroundColor);

  return (
    <Pressable
      disabled={disabled || loading}
      {...props}
      style={[
        styles.base,

        {
          backgroundColor: backgroundColor,
          borderColor,
          borderWidth: config.borderColor ? 1 : undefined,

          borderRadius: radius[borderRadius],
          gap: sizes[gap],

          ...(config.shadow ? shadows[config.shadow] : {}),
        },

        style,
      ]}
    >
      {loading ? (
        (loadingPlaceholder ?? <ActivityIndicator color={foregroundColor} />)
      ) : (
        <>
          {leftIcon && renderIcon(leftIcon, foregroundColor)}

          {label && (
            <ThemedText variant={labelVariant} color={config.foregroundColor}>
              {label}
            </ThemedText>
          )}

          {rightIcon && renderIcon(rightIcon, foregroundColor)}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: "100%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: sizes.lg,
    paddingVertical: sizes.lg,
  },
});
